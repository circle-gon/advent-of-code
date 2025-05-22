import { compileWasm } from "/utils.js";

/*
Unimplemented features
- Tables & elements
- Vectors + Relaxed SIMD
- References + Typed function references + Garbage collection
- Data segments

Unimplemented semanatics (difficult)
- Hash tables

Unimplemented semanatics (easier)
- Branch hinting
- min/max/abs functions for integers
- u32/u64 max constants and s32/s64 min/max constants

Optimizations separate from binaryen
- Tail call optimization
- Memory alignment
- (Some) unused expression dropping (can't be dropped because no way to generate code)

Maybe useful
- Reconsider the order of operations?
- Short circuiting tenary?
- Named exports
- If / Loop / Block block types
- Stack variables (variables that don't take up registers and use the stack)
- Return typechecking for constant conditions

Stuff that will probably be useless
- JS string builtins
- Threads
- Extended constant expressions
- Memory64
- Exception handling
*/

const TOKENS = Object.freeze({
  DOT: 0,
  LEFT_ARROW: 1,
  RIGHT_ARROW: 2,
  LEFT_PAREN: 3,
  RIGHT_PAREN: 4,
  COLON: 5,
  COMMA: 6,
  LEFT_BRACE: 7,
  RIGHT_BRACE: 8,
  SEMICOLON: 9,
  ARROW: 10,
  NEWLINE: 11,
  IDENTIFIER: 12,
  NUMBER: 13,
  EQUAL: 14,
  EOF: 15,
  QUESTION_MARK: 16,
  PLUS: 17,
  DASH: 18,
  ASTERISK: 19,
  EQUAL_EQUAL: 20,
  BANG: 21,
  BANG_EQUAL: 22,
  AMPERSAND: 23,
  PIPE: 24,
  CARET: 25,
  PLUS_PLUS: 26,
  DASH_DASH: 27,
  LEFT_ARROW_ARROW: 28,
  SLASH: 29,
  RIGHT_ARROW_ARROW: 30,
  PERCENT: 31,
  LEFT_ARROW_EQUAL: 32,
  RIGHT_ARROW_EQUAL: 33,
  PLUS_EQUAL: 34,
  DASH_EQUAL: 35,
  ASTERISK_EQUAL: 36,
  SLASH_EQUAL: 37,
  PERCENT_EQUAL: 38,
  LEFT_ARROW_ARROW_EQUAL: 39,
  RIGHT_ARROW_ARROW_EQUAL: 40,
  AMPERSAND_EQUAL: 41,
  CARET_EQUAL: 42,
  PIPE_EQUAL: 43,
  LEFT_BRACKET: 44,
  RIGHT_BRACKET: 45,
});

const DIGITS = "0123456789";
const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_";

const CHARACTER_TABLE = Object.freeze({
  __proto__: null,
  "(": TOKENS.LEFT_PAREN,
  ")": TOKENS.RIGHT_PAREN,
  ":": TOKENS.COLON,
  ",": TOKENS.COMMA,
  "{": TOKENS.LEFT_BRACE,
  "}": TOKENS.RIGHT_BRACE,
  ";": TOKENS.SEMICOLON,
  "==": TOKENS.EQUAL_EQUAL,
  "+=": TOKENS.PLUS_EQUAL,
  "-=": TOKENS.DASH_EQUAL,
  "*=": TOKENS.ASTERISK_EQUAL,
  "/=": TOKENS.SLASH_EQUAL,
  "%=": TOKENS.PERCENT_EQUAL,
  "<<=": TOKENS.LEFT_ARROW_ARROW_EQUAL,
  ">>=": TOKENS.RIGHT_ARROW_ARROW_EQUAL,
  "&=": TOKENS.AMPERSAND_EQUAL,
  "^=": TOKENS.CARET_EQUAL,
  "|=": TOKENS.PIPE_EQUAL,
  "<<": TOKENS.LEFT_ARROW_ARROW,
  "<=": TOKENS.LEFT_ARROW_EQUAL,
  "<": TOKENS.LEFT_ARROW,
  ">>": TOKENS.RIGHT_ARROW_ARROW,
  ">=": TOKENS.RIGHT_ARROW_EQUAL,
  ">": TOKENS.RIGHT_ARROW,
  "=": TOKENS.EQUAL,
  "?": TOKENS.QUESTION_MARK,
  "++": TOKENS.PLUS_PLUS,
  "+": TOKENS.PLUS,
  "&": TOKENS.AMPERSAND,
  "*": TOKENS.ASTERISK,
  "|": TOKENS.PIPE,
  "^": TOKENS.CARET,
  "%": TOKENS.PERCENT,
  "!=": TOKENS.BANG_EQUAL,
  "!": TOKENS.BANG,
  "->": TOKENS.ARROW,
  "--": TOKENS.DASH_DASH,
  "[": TOKENS.LEFT_BRACKET,
  "]": TOKENS.RIGHT_BRACKET,
});

function mapTokenToChar(token) {
  for (const [k, v] of Object.entries(CHARACTER_TABLE)) {
    if (v === token) return k;
  }
  throw new Error("Invalid token");
}

function error(text, start, end, message) {
  const lines = text.split("\n");
  let lineStart = 0;
  let lineCount = 0;
  let lineCountBegin = -1;
  let lineCountEnd = -1;
  let lineStartBegin = -1;
  for (const line of lines) {
    if (start < lineStart + line.length + 1 && lineCountBegin === -1) {
      lineCountBegin = lineCount;
      lineStartBegin = lineStart;
    }
    if (end < lineStart + line.length + 1) {
      lineCountEnd = lineCount;
      break;
    }
    lineStart += line.length + 1;
    lineCount++;
  }

  let msg = `Failed to parse code: ${message}.`;
  for (let i = lineCountBegin; i <= lineCountEnd; i++) {
    const line = lines[i];
    const lineEnd = lineStartBegin + line.length;
    const trueStart = Math.max(start, lineStartBegin);

    const padCount = trueStart - lineStartBegin;
    const pointerCount = Math.min(end, lineEnd) - trueStart;
    msg += `\n${line}\n${" ".repeat(padCount)}${"^".repeat(pointerCount)}`;
    lineStartBegin += line.length + 1;
  }
  msg += `\nAt ${
    lineCountBegin === lineCountEnd
      ? `line ${lineCountBegin + 1}`
      : `lines ${lineCountBegin + 1}-${lineCountEnd + 1}`
  }`;
  throw new Error(msg);
}

function lex(text) {
  const tokens = [];
  let idx = 0;
  let newline = false;
  while (idx < text.length) {
    const char = text[idx];
    let found = false;
    for (const [key, val] of Object.entries(CHARACTER_TABLE)) {
      if (text.startsWith(key, idx)) {
        tokens.push({
          token: val,
          newline,
          start: idx,
          end: idx + key.length,
        });
        idx += key.length;
        found = true;
        break;
      }
    }

    if (!found) {
      switch (char) {
        case "\t":
        case " ":
          break;
        case "\n":
          newline = true;
          break;
        case "/":
          if (text[idx + 1] === "/") {
            while (idx < text.length && text[idx] !== "\n") idx++;
            idx--;
          } else if (text[idx + 1] === "*") {
            const start = idx;
            idx += 2; // Don't let /*/ be valid by skipping past it
            while (
              idx < text.length &&
              (text[idx] !== "/" || text[idx - 1] !== "*")
            )
              idx++;
            if (idx >= text.length)
              error(text, start, start + 2, "Expected end of comment");
          } else {
            tokens.push({
              token: TOKENS.SLASH,
              newline,
              start: idx,
              end: idx + 1,
            });
          }
          break;
        default:
          if (DIGITS.includes(char) || char === "." || char === "-") {
            if (char === "." && !DIGITS.includes(text[idx + 1])) {
              tokens.push({
                token: TOKENS.DOT,
                newline,
                start: idx,
                end: idx + 1,
              });
            } else if (
              char === "-" &&
              (text[idx + 1] !== "." || !DIGITS.includes(text[idx + 2])) &&
              !DIGITS.includes(text[idx + 1])
            ) {
              tokens.push({
                token: TOKENS.DASH,
                newline,
                start: idx,
                end: idx + 1,
              });
            } else {
              const start = idx;
              let integer = "";
              let fractional = "";
              let decimal = false;
              const negative = char === "-";
              if (negative) idx++;
              while (DIGITS.includes(text[idx]) || text[idx] === ".") {
                const char = text[idx];
                if (char === ".") {
                  if (decimal)
                    error(text, idx, idx + 1, "Unexpected character");
                  decimal = true;
                } else if (decimal) fractional += text[idx];
                else integer += text[idx];
                idx++;
              }
              tokens.push({
                token: TOKENS.NUMBER,
                newline,
                integer,
                fractional,
                negative,
                start,
                end: idx,
              });
              idx--;
            }
          } else if (LETTERS.includes(char)) {
            const start = idx;
            let identifier = "";
            while (LETTERS.includes(text[idx]) || DIGITS.includes(text[idx])) {
              identifier += text[idx];
              idx++;
            }
            tokens.push({
              token: TOKENS.IDENTIFIER,
              newline,
              identifier,
              start,
              end: idx,
            });
            idx--;
          } else error(text, idx, idx + 1, "Unknown character");
          break;
      }
      idx++;
    }
    if (char !== "\n" && char !== "\t" && char !== " ") newline = false;
  }
  tokens.push({
    token: TOKENS.EOF,
    newline: false,
    start: idx,
    end: idx + 1,
  });
  return tokens;
}

const VALUE_TYPES = Object.freeze(["u32", "s32", "u64", "s64", "f32", "f64"]);
const MEMORY_TYPES = Object.freeze([...VALUE_TYPES, "u8", "s8", "u16", "s16"]);
// eslint-disable-next-line no-unused-vars
const RESERVED = Object.freeze([
  ...VALUE_TYPES,
  "import",
  "memory",
  "func",
  "fn",
  "let",
  "const",
]);

function load(opcode, output) {
  return {
    opcode,
    params: ["memory", "i32"],
    output: [output],
  };
}
function store(opcode, type) {
  return {
    opcode,
    params: ["memory", "i32", type],
    output: [],
  };
}
function binop(opcode, type) {
  return {
    opcode,
    params: [type, type],
    output: [type],
  };
}
function unop(opcode, input, output) {
  return {
    opcode,
    params: [input],
    output: [output],
  };
}
function unopsingle(opcode, input) {
  return {
    opcode,
    params: [input],
    output: [input],
  };
}
function compare(opcode, type) {
  return {
    opcode,
    params: [type, type],
    output: ["i32"],
  };
}

const OPCODES = Object.freeze({
  __proto__: null,
  i32: {
    __proto__: null,
    // Memory load/store
    load: load(0x28, "i32"),
    load8_s: load(0x2c, "i32"),
    load8_u: load(0x2d, "i32"),
    load16_s: load(0x2e, "i32"),
    load16_u: load(0x2f, "i32"),
    store: store(0x36, "i32"),
    store8: store(0x3a, "i32"),
    store16: store(0x3b, "i32"),

    // Two arguments
    eq: compare(0x46, "i32"),
    ne: compare(0x47, "i32"),
    lt_s: compare(0x48, "i32"),
    lt_u: compare(0x49, "i32"),
    gt_s: compare(0x4a, "i32"),
    gt_u: compare(0x4b, "i32"),
    le_s: compare(0x4c, "i32"),
    le_u: compare(0x4d, "i32"),
    ge_s: compare(0x4e, "i32"),
    ge_u: compare(0x4f, "i32"),
    add: binop(0x6a, "i32"),
    sub: binop(0x6b, "i32"),
    mul: binop(0x6c, "i32"),
    div_s: binop(0x6d, "i32"),
    div_u: binop(0x6e, "i32"),
    rem_s: binop(0x6f, "i32"),
    rem_u: binop(0x70, "i32"),
    and: binop(0x71, "i32"),
    or: binop(0x72, "i32"),
    xor: binop(0x73, "i32"),
    shl: binop(0x74, "i32"),
    shr_s: binop(0x75, "i32"),
    shr_u: binop(0x76, "i32"),
    rotl: binop(0x77, "i32"),
    rotr: binop(0x78, "i32"),

    // Single argument
    wrap_i64: unop(0xa7, "i64", "i32"),
    trunc_f32_s: unop(0xa8, "f32", "i32"),
    trunc_f32_u: unop(0xa9, "f32", "i32"),
    trunc_f64_s: unop(0xaa, "f64", "i32"),
    trunc_f64_u: unop(0xab, "f64", "i32"),
    reinterpret_f32: unop(0xbc, "f32", "i32"),
    extend8_s: unop(0xc0, "i32", "i32"),
    extend16_s: unop(0xc1, "i32", "i32"),
    trunc_sat_f32_s: unop(0xfc, "f32", "i32"),
    trunc_sat_f32_u: unop(0xfc, "f32", "i32"),
    trunc_sat_f64_s: unop(0xfc, "f64", "i32"),
    trunc_sat_f64_u: unop(0xfc, "f64", "i32"),
    clz: unop(0x67, "i32", "i32"),
    ctz: unop(0x68, "i32", "i32"),
    popcnt: unop(0x69, "i32", "i32"),
    eqz: unop(0x45, "i32", "i32"),
  },
  i64: {
    __proto__: null,
    // Memory load/store
    load: load(0x29, "i64"),
    load8_s: load(0x30, "i64"),
    load8_u: load(0x31, "i64"),
    load16_s: load(0x32, "i64"),
    load16_u: load(0x33, "i64"),
    load32_s: load(0x34, "i64"),
    load32_u: load(0x35, "i64"),
    store: store(0x37, "i64"),
    store8: store(0x3c, "i64"),
    store16: store(0x3d, "i64"),
    store32: store(0x3e, "i64"),

    // Two arguments
    eq: compare(0x51, "i64"),
    ne: compare(0x52, "i64"),
    lt_s: compare(0x53, "i64"),
    lt_u: compare(0x54, "i64"),
    gt_s: compare(0x55, "i64"),
    gt_u: compare(0x56, "i64"),
    le_s: compare(0x57, "i64"),
    le_u: compare(0x58, "i64"),
    ge_s: compare(0x59, "i64"),
    ge_u: compare(0x5a, "i64"),
    add: binop(0x7c, "i64"),
    sub: binop(0x7d, "i64"),
    mul: binop(0x7e, "i64"),
    div_s: binop(0x7f, "i64"),
    div_u: binop(0x80, "i64"),
    rem_s: binop(0x81, "i64"),
    rem_u: binop(0x82, "i64"),
    and: binop(0x83, "i64"),
    or: binop(0x84, "i64"),
    xor: binop(0x85, "i64"),
    shl: binop(0x86, "i64"),
    shr_s: binop(0x87, "i64"),
    shr_u: binop(0x88, "i64"),
    rotl: binop(0x89, "i64"),
    rotr: binop(0x8a, "i64"),

    // One argument
    extend8_s: unop(0xc2, "i32", "i64"),
    extend16_s: unop(0xc3, "i32", "i64"),
    extend32_s: unop(0xc4, "i32", "i64"),
    extend_i32_s: unop(0xac, "i32", "i64"),
    extend_i32_u: unop(0xad, "i32", "i64"),
    trunc_f32_s: unop(0xae, "f32", "i64"),
    trunc_f32_u: unop(0xaf, "f32", "i64"),
    trunc_f64_s: unop(0xb0, "f64", "i64"),
    trunc_f64_u: unop(0xb1, "f64", "i64"),
    reinterpret_f64: unop(0xbd, "f64", "i64"),
    trunc_sat_f32_s: unop(0xfc, "f32", "i64"),
    trunc_sat_f32_u: unop(0xfc, "f32", "i64"),
    trunc_sat_f64_s: unop(0xfc, "f64", "i64"),
    trunc_sat_f64_u: unop(0xfc, "f64", "i64"),
    clz: unop(0x79, "i64", "i64"),
    ctz: unop(0x7a, "i64", "i64"),
    popcnt: unop(0x7b, "i64", "i64"),
    eqz: unop(0x50, "i64", "i32"),
  },
  f32: {
    __proto__: null,
    // Memory load/store
    load: load(0x2a, "f32"),
    store: store(0x38, "f32"),

    // Two arguments
    eq: compare(0x5b, "f32"),
    ne: compare(0x5c, "f32"),
    lt: compare(0x5d, "f32"),
    gt: compare(0x5e, "f32"),
    le: compare(0x5f, "f32"),
    ge: compare(0x60, "f32"),
    add: binop(0x92, "f32"),
    sub: binop(0x93, "f32"),
    mul: binop(0x94, "f32"),
    div: binop(0x95, "f32"),
    min: binop(0x96, "f32"),
    max: binop(0x97, "f32"),
    copysign: binop(0x98, "f32"),

    // One argument
    abs: unopsingle(0x8b, "f32"),
    neg: unopsingle(0x8c, "f32"),
    ceil: unopsingle(0x8d, "f32"),
    floor: unopsingle(0x8e, "f32"),
    trunc: unopsingle(0x8f, "f32"),
    nearest: unopsingle(0x90, "f32"),
    sqrt: unopsingle(0x91, "f32"),
    convert_i32_s: unop(0xb2, "i32", "f32"),
    convert_i32_u: unop(0xb3, "i32", "f32"),
    convert_i64_s: unop(0xb4, "i64", "f32"),
    convert_i64_u: unop(0xb5, "i64", "f32"),
    demote_f64: unop(0xb6, "f64", "f32"),
    reinterpret_i32: unop(0xbe, "i32", "f32"),
  },
  f64: {
    __proto__: null,
    // Memory load/store
    load: load(0x2b, "f64"),
    store: store(0x39, "f64"),

    // Two arguments
    eq: compare(0x61, "f64"),
    ne: compare(0x62, "f64"),
    lt: compare(0x63, "f64"),
    gt: compare(0x64, "f64"),
    le: compare(0x65, "f64"),
    ge: compare(0x66, "f64"),
    add: binop(0xa0, "f64"),
    sub: binop(0xa1, "f64"),
    mul: binop(0xa2, "f64"),
    div: binop(0xa3, "f64"),
    min: binop(0xa4, "f64"),
    max: binop(0xa5, "f64"),
    copysign: binop(0xa6, "f64"),

    // One argument
    abs: unopsingle(0x99, "f64"),
    neg: unopsingle(0x9a, "f64"),
    ceil: unopsingle(0x9b, "f64"),
    floor: unopsingle(0x9c, "f64"),
    trunc: unopsingle(0x9d, "f64"),
    nearest: unopsingle(0x9e, "f64"),
    sqrt: unopsingle(0x9f, "f64"),
    convert_i32_s: unop(0xb7, "i32", "f64"),
    convert_i32_u: unop(0xb8, "i32", "f64"),
    convert_i64_s: unop(0xb9, "i64", "f64"),
    convert_i64_u: unop(0xba, "i64", "f64"),
    promote_f32: unop(0xbb, "f32", "f64"),
    reinterpret_i64: unop(0xbf, "i64", "f64"),
  },
  local: {
    __proto__: null,
    get: {
      opcode: 0x20,
      params: ["variable"],
      output: [null],
    },
    set: {
      opcode: 0x21,
      params: ["variable", null],
      output: [],
    },
    tee: {
      opcode: 0x22,
      params: ["variable", null],
      output: [null],
    },
  },
  global: {
    __proto__: null,
    get: {
      opcode: 0x23,
      params: ["variable"],
      output: [null],
    },
    set: {
      opcode: 0x24,
      params: ["variable", null],
      output: [],
    },
  },
  memory: {
    __proto__: null,
    size: {
      opcode: 0x3f,
      params: ["memory"],
      output: ["i32"],
    },
    byteSize: {
      opcode: null,
      params: ["memory"],
      output: ["i32"],
    },
    grow: {
      opcode: 0x40,
      params: ["memory"],
      output: ["i32"],
    },
    copy: {
      opcode: 0xfc,
      params: ["memory", "memory", "i32", "i32", "i32"],
      output: [],
    },
    fill: {
      opcode: 0xfc,
      params: ["memory", "i32", "i32", "i32"],
      output: [],
    },
  },
  select: {
    __proto__: null,
    opcode: 0x1b,
    params: [null, null, "i32"],
    output: [null],
  },
  unreachable: {
    __proto__: null,
    opcode: 0x00,
    params: [],
    output: [],
  },
  nop: {
    __proto__: null,
    opcode: 0x01,
    params: [],
    output: [],
  },
  generic: {
    __proto__: null,
    rotl: {
      type: true,
      opcode: null,
      params: [null, null],
      output: [null],
    },
    rotr: {
      type: true,
      opcode: null,
      params: [null, null],
      output: [null],
    },
    clz: {
      type: true,
      opcode: null,
      params: [null],
      output: [null],
    },
    ctz: {
      type: true,
      opcode: null,
      params: [null],
      output: [null],
    },
    popcnt: {
      type: true,
      opcode: null,
      params: [null],
      output: [null],
    },
    min: {
      type: false,
      opcode: null,
      params: [null, null],
      output: [null],
    },
    max: {
      type: false,
      opcode: null,
      params: [null, null],
      output: [null],
    },
    copysign: {
      type: false,
      opcode: null,
      params: [null, null],
      output: [null],
    },
    abs: {
      type: false,
      opcode: null,
      params: [null],
      output: [null],
    },
    ceil: {
      type: false,
      opcode: null,
      params: [null],
      output: [null],
    },
    floor: {
      type: false,
      opcode: null,
      params: [null],
      output: [null],
    },
    trunc: {
      type: false,
      opcode: null,
      params: [null],
      output: [null],
    },
    nearest: {
      type: false,
      opcode: null,
      params: [null],
      output: [null],
    },
    sqrt: {
      type: false,
      opcode: null,
      params: [null],
      output: [null],
    },
  },
  uint: {
    __proto__: null,
    opcode: null,
    params: [null],
    output: [null],
  },
  sint: {
    __proto__: null,
    opcode: null,
    params: [null],
    output: [null],
  },
});
const CONSTANTS = Object.freeze({
  __proto__: null,
  u32: {
    max: 2 ** 32 - 1,
  },
  u64: {
    max: 2n ** 64n - 1n,
  },
  s32: {
    min: -(2 ** 31),
    max: 2 ** 31 - 1,
  },
  s64: {
    min: -(2n ** 63n),
    max: 2n ** 63n - 1n,
  },
});
const AST = Object.freeze({
  GLOBAL: 0,
  REF: 1,
  NUMBER: 2,
  IDENTIFIER: 3,
  EXPRESSION: 4,
  FUNCTION: 5,
  RETURN: 6,
  IF: 7,
  WHILE: 8,
  CONTINUE: 9,
  BREAK: 10,
  ASSIGN: 11,
  BINARY: 12, // a binary operator that acts on two values of the same type and returns a value of that type
  NOT: 13, // special unary operator that works on ints
  BINARY_INTEGER: 14, // a binary operator that acts on two integers of the same type and returns a value of that type
  POSTFIX_VARIABLE: 15, // special postfix operators that work on variables
  NEGATION: 16, // special unary operator that works on floats
  BINARY_SIGNED: 17, // same as BINARY, but the compiled operators depend on the signedness of the operands
  BINARY_INTEGER_SIGNED: 18, // same as BINARY_INTEGER, but the compiled operators depend on the signedness of the operands
  BLOCK: 19,
  MEMORY_INDEX: 20,
  ASSIGN_MEMORY_INDEX: 21,
  ASSIGN_MANY: 22,
});

function looseInteger(val) {
  if (val === null) return val;
  return Number(val.integer);
}

function toStartEnd(tokenStart, tokenEnd) {
  return {
    start: tokenStart.start,
    end: tokenEnd.end,
  };
}

class Parser {
  constructor(tokens, text) {
    this.text = text;
    this.tokens = tokens;
    this.idx = 0;
  }

  peek() {
    return this.tokens[this.idx];
  }

  was() {
    return this.tokens[this.idx - 1];
  }

  is(type) {
    const tkn = this.peek();
    if (tkn.token === type) return tkn;
    return null;
  }

  isLiteral(name) {
    const tkn = this.peek();
    if (tkn.token === TOKENS.IDENTIFIER && tkn.identifier === name) return true;
    return false;
  }

  errorToken(tkn, message) {
    error(this.text, tkn.start, tkn.end, message);
  }

  expect(type, message) {
    const tkn = this.peek();
    if (tkn.token !== type) {
      const msg = message ?? `Expected a ${mapTokenToChar(type)}`;
      this.errorToken(tkn, msg);
    }
    this.idx++;
    return tkn;
  }

  match(type) {
    const tkn = this.peek();
    if (tkn.token !== type) return null;
    this.idx++;
    return tkn;
  }

  expectOneOf(message, ...payloads) {
    const tkn = this.peek();
    for (const payload of payloads) {
      if (tkn.token === TOKENS.IDENTIFIER && tkn.identifier === payload) {
        this.idx++;
        return tkn.identifier;
      }
    }
    const msg =
      message ??
      `Expected one of ${payloads.map((i) => mapTokenToChar(i)).join(", ")}`;
    this.errorToken(tkn, msg);
  }

  matchLiteral(payload) {
    const tkn = this.peek();
    if (tkn.token === TOKENS.IDENTIFIER && tkn.identifier === payload) {
      this.idx++;
      return tkn;
    }
    return null;
  }

  assertInteger(token, unsigned) {
    if (token.fractional.length > 0)
      this.errorToken(token, "Integer literals can not have decimals");
    if (unsigned && token.negative)
      this.errorToken(token, "Unsigned integers can not be negative");
  }

  assertValueType(token) {
    if (!VALUE_TYPES.includes(token.identifier))
      this.errorToken(token, "Expected u32, s32, u64, s64, f32, or f64");
  }

  topLevelGlobal(name, exported, writable) {
    this.expect(TOKENS.EQUAL);
    const type = this.expect(
      TOKENS.IDENTIFIER,
      "Expected an import declaration or an initializer",
    );
    if (type.identifier === "import") {
      const level1 = this.expect(
        TOKENS.IDENTIFIER,
        "Expected the first level of import",
      ).identifier;
      this.expect(TOKENS.DOT);
      const level2 = this.expect(
        TOKENS.IDENTIFIER,
        "Expected the second level of import",
      ).identifier;
      this.expect(TOKENS.LEFT_PAREN);
      const ref = this.expect(
        TOKENS.IDENTIFIER,
        "Expected a value type",
      ).identifier;
      this.assertValueType(ref);
      const end = this.expect(TOKENS.RIGHT_PAREN);
      return {
        node: AST.GLOBAL,
        name: name.identifier,
        exported,
        writable,
        type: type.identifier,
        level1,
        level2,
        ref,
        ...toStartEnd(name, end),
      };
    } else {
      this.assertValueType(type);
      this.expect(TOKENS.LEFT_PAREN);
      const val = this.expect(
        TOKENS.NUMBER,
        "Expected a value for a global initializer",
      );
      if (type[0] === "s" || type[0] === "u")
        this.assertInteger(val, type[0] === "u");
      const end = this.expect(TOKENS.RIGHT_PAREN);
      return {
        node: AST.GLOBAL,
        name: name.identifier,
        exported,
        writable,
        type: type.identifier,
        integer: val.integer,
        fractional: val.fractional,
        ...toStartEnd(name, end),
      };
    }
  }

  topLevelRef(name, exported) {
    this.expect(TOKENS.EQUAL);
    const choose = this.expectOneOf(
      "Expected either 'memory' or 'import' for a top level reference",
      "memory",
      "import",
    );
    if (choose === "memory") {
      let index = null;
      if (this.match(TOKENS.LEFT_ARROW)) {
        const tmp = this.expect(TOKENS.IDENTIFIER, "Expected a memory index");
        index = tmp.identifier;
        if (!MEMORY_TYPES.includes(index))
          this.errorToken(tmp, "Invalid index");
        this.expect(TOKENS.RIGHT_ARROW);
      }
      this.expect(TOKENS.LEFT_PAREN);
      const min = this.expect(
        TOKENS.NUMBER,
        "Expected a memory minimum parameter",
      );
      this.assertInteger(min, true);

      let max = null;
      if (this.match(TOKENS.COMMA)) {
        max = this.expect(TOKENS.NUMBER, "Expected a memory maximum parameter");
        this.assertInteger(max, true);
      }
      const end = this.expect(TOKENS.RIGHT_PAREN);

      return {
        node: AST.REF,
        name: name.identifier,
        exported,
        type: choose,
        index,
        min: looseInteger(min),
        max: looseInteger(max),
        ...toStartEnd(name, end),
      };
    }

    const level1 = this.expect(
      TOKENS.IDENTIFIER,
      "Expected the first level of import",
    ).identifier;
    this.expect(TOKENS.DOT);
    const level2 = this.expect(
      TOKENS.IDENTIFIER,
      "Expected the second level of import",
    ).identifier;
    this.expect(TOKENS.LEFT_PAREN);
    const branch = this.expectOneOf(
      "Expected either 'func' or 'memory' for an import declaration",
      "func",
      "memory",
    );

    if (branch === "func") {
      const output = [];
      if (this.match(TOKENS.LEFT_ARROW)) {
        const v = this.expect(
          TOKENS.IDENTIFIER,
          "Expected a function return type",
        );
        output.push({
          type: v.identifier,
        });
        this.assertValueType(v);
        while (!this.match(TOKENS.RIGHT_ARROW)) {
          this.expect(TOKENS.COMMA);
          const v = this.expect(
            TOKENS.IDENTIFIER,
            "Expected a function return type",
          );
          output.push({
            type: v.identifier,
          });
          this.assertValueType(v);
        }
      }

      this.expect(TOKENS.LEFT_PAREN);

      const params = [];
      if (!this.match(TOKENS.RIGHT_PAREN)) {
        const arg = this.expect(
          TOKENS.IDENTIFIER,
          "Expected a function parameter type",
        );
        this.assertValueType(arg);
        params.push({
          type: arg.identifier,
        });
        while (!this.match(TOKENS.RIGHT_PAREN)) {
          this.expect(TOKENS.COMMA);
          const arg = this.expect(
            TOKENS.IDENTIFIER,
            "Expected a function parameter type",
          );
          this.assertValueType(arg);
          params.push({
            type: arg.identifier,
          });
        }
      }

      const end = this.expect(TOKENS.RIGHT_PAREN);

      return {
        node: AST.REF,
        name: name.identifier,
        exported,
        type: "import-func",
        level1,
        level2,
        output,
        params,
        ...toStartEnd(name, end),
      };
    }

    let index = null;
    if (this.match(TOKENS.LEFT_ARROW)) {
      const tmp = this.expect(TOKENS.IDENTIFIER, "Expected a memory index");
      index = tmp.identifier;
      if (!MEMORY_TYPES.includes(index)) this.errorToken(tmp, "Invalid index");
      this.expect(TOKENS.RIGHT_ARROW);
    }

    this.expect(TOKENS.LEFT_PAREN);
    const min = this.expect(TOKENS.NUMBER, "Expected a memory minimum value");
    this.assertInteger(min, true);
    let max = null;
    if (this.match(TOKENS.COMMA)) {
      max = this.expect(TOKENS.NUMBER, "Expected a memory maximum value");
      this.assertInteger(max, true);
    }
    this.expect(TOKENS.RIGHT_PAREN);
    const end = this.expect(TOKENS.RIGHT_PAREN);
    return {
      node: AST.REF,
      name: name.identifier,
      exported,
      type: "import-memory",
      level1,
      level2,
      index,
      min: looseInteger(min),
      max: looseInteger(max),
      ...toStartEnd(name, end),
    };
  }

  matchArg() {
    const name = this.expect(
      TOKENS.IDENTIFIER,
      "Expected the name of a function argument",
    );
    this.expect(TOKENS.COLON);
    const type = this.expect(
      TOKENS.IDENTIFIER,
      "Expected the type of a function argument",
    );
    this.assertValueType(type);
    return {
      name: name.identifier,
      type: type.identifier,
      ...toStartEnd(name, type),
    };
  }

  getNames() {
    this.expect(TOKENS.LEFT_PAREN);
    const params = [];
    if (!this.match(TOKENS.RIGHT_PAREN)) {
      params.push(this.matchArg());
      while (!this.match(TOKENS.RIGHT_PAREN)) {
        this.expect(TOKENS.COMMA);
        params.push(this.matchArg());
      }
    }
    return params;
  }

  assertAssignment(node) {
    if (node.node !== AST.IDENTIFIER && node.node !== AST.MEMORY_INDEX)
      this.errorToken(node, "invalid assignment target");
  }

  compactAssignment(name, type, node) {
    const expr = this.expression();
    const se = toStartEnd(name, expr);
    if (name.node === AST.MEMORY_INDEX)
      return {
        node: AST.ASSIGN_MEMORY_INDEX,
        memory: name.memory,
        index: name.index,
        body: {
          node,
          type,
          left: name,
          right: expr,
          ...se,
        },
        ...se,
      };
    return {
      node: AST.ASSIGN,
      name: name.literal,
      body: {
        node,
        type,
        left: name,
        right: expr,
        ...se,
      },
      ...se,
    };
  }

  matchTargets() {
    const start = this.peek();
    const targets = [this.expr(1)];
    const idx = this.idx;
    while (this.match(TOKENS.COMMA)) targets.push(this.expr(1));
    const end = this.was();
    return {
      targets,
      idx,
      ...toStartEnd(start, end),
    };
  }

  expr(level) {
    switch (level) {
      case 0: {
        let left = this.matchTargets();
        if (this.match(TOKENS.EQUAL)) {
          const expr = this.expression();
          const se = toStartEnd(left, expr);
          if (left.targets.length === 1) {
            left = left.targets[0];
            this.assertAssignment(left);

            if (left.node === AST.MEMORY_INDEX)
              return {
                node: AST.ASSIGN_MEMORY_INDEX,
                memory: left.memory,
                index: left.index,
                body: expr,
                ...se,
              };
            return {
              node: AST.ASSIGN,
              name: left.literal,
              body: expr,
              ...se,
            };
          }

          for (const node of left.targets) {
            if (node.node !== AST.IDENTIFIER)
              this.errorToken(node, "Invalid multi-assignment target");
          }

          return {
            node: AST.ASSIGN_MANY,
            targets: left.targets,
            body: expr,
            ...se,
          };
        }
        this.idx = left.idx;
        left = left.targets[0];
        if (this.match(TOKENS.PLUS_EQUAL)) {
          this.assertAssignment(left);
          return this.compactAssignment(left, "add", AST.BINARY);
        }
        if (this.match(TOKENS.DASH_EQUAL)) {
          this.assertAssignment(left);
          return this.compactAssignment(left, "sub", AST.BINARY);
        }
        if (this.match(TOKENS.ASTERISK_EQUAL)) {
          this.assertAssignment(left);
          return this.compactAssignment(left, "mul", AST.BINARY);
        }
        if (this.match(TOKENS.SLASH_EQUAL)) {
          this.assertAssignment(left);
          return this.compactAssignment(left, "div", AST.BINARY_SIGNED);
        }
        if (this.match(TOKENS.PERCENT_EQUAL)) {
          this.assertAssignment(left);
          return this.compactAssignment(left, "rem", AST.BINARY_INTEGER_SIGNED);
        }
        if (this.match(TOKENS.LEFT_ARROW_ARROW_EQUAL)) {
          this.assertAssignment(left);
          return this.compactAssignment(left, "shl", AST.BINARY_INTEGER);
        }
        if (this.match(TOKENS.RIGHT_ARROW_ARROW_EQUAL)) {
          this.assertAssignment(left);
          return this.compactAssignment(left, "shr", AST.BINARY_INTEGER_SIGNED);
        }
        if (this.match(TOKENS.AMPERSAND_EQUAL)) {
          this.assertAssignment(left);
          return this.compactAssignment(left, "and", AST.BINARY_INTEGER);
        }
        if (this.match(TOKENS.CARET_EQUAL)) {
          this.assertAssignment(left);
          return this.compactAssignment(left, "xor", AST.BINARY_INTEGER);
        }
        if (this.match(TOKENS.PIPE_EQUAL)) {
          this.assertAssignment(left);
          return this.compactAssignment(left, "or", AST.BINARY_INTEGER);
        }
        return left;
      }
      case 1: {
        const cond = this.expr(2);
        if (this.match(TOKENS.QUESTION_MARK)) {
          const left = this.expression();
          this.expect(TOKENS.COLON);
          const right = this.expression();

          return {
            node: AST.EXPRESSION,
            level1: "select",
            level2: null,
            params: [left, right, cond],
            ...toStartEnd(cond, right),
          };
        }
        return cond;
      }
      case 2: {
        const left = this.expr(3);
        if (this.match(TOKENS.EQUAL_EQUAL)) {
          const right = this.expr(3);
          return {
            node: AST.BINARY,
            type: "eq",
            left,
            right,
            comparison: true,
            ...toStartEnd(left, right),
          };
        }
        if (this.match(TOKENS.BANG_EQUAL)) {
          const right = this.expr(3);
          return {
            node: AST.BINARY,
            type: "ne",
            left,
            right,
            comparison: true,
            ...toStartEnd(left, right),
          };
        }
        if (this.match(TOKENS.LEFT_ARROW)) {
          const right = this.expr(3);
          return {
            node: AST.BINARY_SIGNED,
            type: "lt",
            left,
            right,
            comparison: true,
            ...toStartEnd(left, right),
          };
        }
        if (this.match(TOKENS.LEFT_ARROW_EQUAL)) {
          const right = this.expr(3);
          return {
            node: AST.BINARY_SIGNED,
            type: "le",
            left,
            right,
            comparison: true,
            ...toStartEnd(left, right),
          };
        }
        if (this.match(TOKENS.RIGHT_ARROW)) {
          const right = this.expr(3);
          return {
            node: AST.BINARY_SIGNED,
            type: "gt",
            left,
            right,
            comparison: true,
            ...toStartEnd(left, right),
          };
        }
        if (this.match(TOKENS.RIGHT_ARROW_EQUAL)) {
          const right = this.expr(3);
          return {
            node: AST.BINARY_SIGNED,
            type: "ge",
            left,
            right,
            comparison: true,
            ...toStartEnd(left, right),
          };
        }
        return left;
      }
      case 3: {
        let body = this.expr(4);
        while (true) {
          const find = this.match(TOKENS.PLUS) ?? this.match(TOKENS.DASH);
          if (!find) break;
          const expr = this.expr(4);
          body = {
            node: AST.BINARY,
            type: find.token === TOKENS.PLUS ? "add" : "sub",
            left: body,
            right: expr,
            ...toStartEnd(body, expr),
          };
        }
        return body;
      }
      case 4: {
        let body = this.expr(5);
        while (true) {
          const find =
            this.match(TOKENS.ASTERISK) ??
            this.match(TOKENS.SLASH) ??
            this.match(TOKENS.PERCENT);
          if (!find) break;
          const expr = this.expr(5);
          if (find.token === TOKENS.ASTERISK) {
            body = {
              node: AST.BINARY,
              type: "mul",
              left: body,
              right: expr,
              ...toStartEnd(body, expr),
            };
          } else if (find.token === TOKENS.SLASH) {
            body = {
              node: AST.BINARY_SIGNED,
              type: "div",
              left: body,
              right: expr,
              ...toStartEnd(body, expr),
            };
          } else {
            body = {
              node: AST.BINARY_INTEGER_SIGNED,
              type: "rem",
              left: body,
              right: expr,
              ...toStartEnd(body, expr),
            };
          }
        }
        return body;
      }
      case 5: {
        let body = this.expr(6);
        while (true) {
          const find =
            this.match(TOKENS.AMPERSAND) ??
            this.match(TOKENS.PIPE) ??
            this.match(TOKENS.CARET) ??
            this.match(TOKENS.LEFT_ARROW_ARROW) ??
            this.match(TOKENS.RIGHT_ARROW_ARROW);
          if (!find) break;
          const expr = this.expr(6);
          if (find.token === TOKENS.RIGHT_ARROW_ARROW) {
            body = {
              node: AST.BINARY_INTEGER_SIGNED,
              type: "shr",
              left: body,
              right: expr,
              ...toStartEnd(body, expr),
            };
          } else {
            body = {
              node: AST.BINARY_INTEGER,
              type:
                find.token === TOKENS.AMPERSAND
                  ? "and"
                  : find.token === TOKENS.CARET
                    ? "xor"
                    : find.token === TOKENS.LEFT_ARROW_ARROW
                      ? "shl"
                      : "or",
              left: body,
              right: expr,
              ...toStartEnd(body, expr),
            };
          }
        }
        return body;
      }
      case 6: {
        const tk1 = this.match(TOKENS.BANG);
        if (tk1) {
          const expr = this.expr(6);
          return {
            node: AST.NOT,
            body: expr,
            ...toStartEnd(tk1, expr),
          };
        }
        const tk2 = this.match(TOKENS.DASH);
        if (tk2) {
          const expr = this.expr(6);
          return {
            node: AST.NEGATION,
            body: expr,
            ...toStartEnd(tk2, expr),
          };
        }
        return this.expr(7);
      }
      case 7: {
        const ident = this.expr(8);
        const tk1 = this.match(TOKENS.PLUS_PLUS);
        if (tk1) {
          this.assertAssignment(ident);
          return {
            node: AST.POSTFIX_VARIABLE,
            ident: ident.literal,
            type: "add",
            ...toStartEnd(ident, tk1),
          };
        }
        const tk2 = this.match(TOKENS.DASH_DASH);
        if (tk2) {
          this.assertAssignment(ident);
          return {
            node: AST.POSTFIX_VARIABLE,
            ident: ident.literal,
            type: "sub",
            ...toStartEnd(ident, tk2),
          };
        }
        return ident;
      }
      case 8: {
        const left = this.expr(9);
        if (this.match(TOKENS.LEFT_BRACKET)) {
          this.assertAssignment(left);
          const index = this.expression();
          const end = this.expect(TOKENS.RIGHT_BRACKET);
          return {
            node: AST.MEMORY_INDEX,
            memory: left.literal,
            index,
            ...toStartEnd(left, end),
          };
        }
        return left;
      }
      case 9: {
        const level1t = this.expr(10);
        if (
          level1t.node !== AST.IDENTIFIER ||
          (!this.is(TOKENS.DOT) && !this.is(TOKENS.LEFT_PAREN))
        )
          return level1t;

        const level1 = level1t.literal;
        let level2 = null;
        let level2t = null;
        if (this.match(TOKENS.DOT)) {
          level2t = this.expect(
            TOKENS.IDENTIFIER,
            "Expected the level 2 of a function or constant reference",
          );
          level2 = level2t.identifier;
        }

        const opcode = getOpcode(level1, level2);
        const params = [];
        if (this.match(TOKENS.LEFT_PAREN)) {
          if (!this.match(TOKENS.RIGHT_PAREN)) {
            params.push(this.expression());
            while (!this.match(TOKENS.RIGHT_PAREN)) {
              this.expect(TOKENS.COMMA);
              params.push(this.expression());
            }
          }
          // This is kind of cheating but whatever
          const parenToken = this.was();
          if (level2 && !opcode)
            this.errorToken(toStartEnd(level1t, parenToken), "Invalid opcode");

          return {
            node: AST.EXPRESSION,
            level1,
            level2,
            params,
            ...toStartEnd(level1t, parenToken),
          };
        }

        if (level2 === null) this.errorToken(level1t, "Invalid constant");
        const constant = CONSTANTS[level1]?.[level2];
        if (constant === undefined)
          this.errorToken(toStartEnd(level1t, level2), "Invalid constant");
        return {
          node: AST.NUMBER,
          integer: constant.toString(),
          fractional: "",
          ...toStartEnd(level1t, level2t),
        };
      }
      case 10: {
        const tk1 = this.match(TOKENS.LEFT_PAREN);
        if (tk1) {
          const body = this.expression();
          const tk2 = this.expect(TOKENS.RIGHT_PAREN);
          return {
            ...body,
            // Need to include the parentheses
            ...toStartEnd(tk1, tk2),
          };
        }

        const number = this.match(TOKENS.NUMBER);
        if (number) {
          return {
            node: AST.NUMBER,
            integer: number.integer,
            fractional: number.fractional,
            ...toStartEnd(number, number),
          };
        }

        const identifier = this.match(TOKENS.IDENTIFIER);
        if (identifier) {
          const id = identifier.identifier;
          if (id === "true")
            return {
              node: AST.NUMBER,
              integer: "1",
              fractional: "",
              ...toStartEnd(identifier, identifier),
            };
          if (id === "false")
            return {
              node: AST.NUMBER,
              integer: "0",
              fractional: "",
              ...toStartEnd(identifier, identifier),
            };
          return {
            node: AST.IDENTIFIER,
            literal: id,
            ...toStartEnd(identifier, identifier),
          };
        }
        this.errorToken(this.peek(), "Expected a token");
      }
      // eslint-disable-next-line no-fallthrough
      default:
        throw new Error("invalid code");
    }
  }

  expression() {
    return this.expr(0);
  }

  findLabel() {
    const tkn = this.match(TOKENS.IDENTIFIER);
    return tkn ? tkn.identifier : null;
  }

  getBlock() {
    const left = this.expect(TOKENS.LEFT_BRACE);
    const body = [];
    while (!this.match(TOKENS.RIGHT_BRACE)) {
      body.push(this.statement());
    }
    const paren = this.was(); // kind of cheating but whatever
    return {
      body,
      ...toStartEnd(left, paren),
    };
  }

  matchConditional(needLabel) {
    const start = this.expect(TOKENS.LEFT_PAREN);
    const cond = this.expression();
    this.expect(TOKENS.RIGHT_PAREN);
    const label = needLabel ? this.findLabel() : null;
    const body = this.getBlock();

    if (needLabel)
      return {
        cond,
        body: body.body,
        label,
        ...toStartEnd(start, body),
      };
    return {
      cond,
      body: body.body,
      ...toStartEnd(start, body),
    };
  }

  statement() {
    const bk1 = this.matchLiteral("block");
    if (bk1) {
      const label = this.findLabel();
      const body = this.getBlock();

      return {
        node: AST.BLOCK,
        body: body.body,
        label,
        ...toStartEnd(bk1, body),
      };
    }

    const isDo = this.matchLiteral("do");
    const bk2 = this.matchLiteral("while");
    if (bk2) {
      const { cond, body, label } = this.matchConditional(true);
      return {
        node: AST.WHILE,
        cond,
        body,
        label,
        isDo,
        init: null,
        update: null,
        ...toStartEnd(isDo ?? bk2, body),
      };
    }
    const bk3 = this.matchLiteral("for");
    if (bk3) {
      this.expect(TOKENS.LEFT_PAREN);
      const init = !this.is(TOKENS.SEMICOLON) ? this.expression() : null;
      this.expect(TOKENS.SEMICOLON);
      const req = this.expression();
      this.expect(TOKENS.SEMICOLON);
      const cont = this.expression();
      this.expect(TOKENS.RIGHT_PAREN);
      const label = this.findLabel();
      const body = this.getBlock();

      return {
        // Compiles down to a while loop internally
        node: AST.WHILE,
        cond: req,
        body: body.body,
        label,
        isDo,
        init,
        update: cont,
        ...toStartEnd(isDo ?? bk3, body),
      };
    }
    if (isDo) this.errorToken(isDo, "do should be followed with while or for");

    const bk4 = this.matchLiteral("continue");
    if (bk4)
      return {
        node: AST.CONTINUE,
        label: this.findLabel(),
        ...toStartEnd(bk4, bk4),
      };

    const bk5 = this.matchLiteral("break");
    if (bk5)
      return {
        node: AST.BREAK,
        label: this.findLabel(),
        ...toStartEnd(bk5, bk5),
      };

    const bk6 = this.matchLiteral("if");
    if (bk6) {
      const block = this.matchConditional(true);
      const bodies = [
        {
          cond: block.cond,
          body: block.body,
          ...toStartEnd(block, block),
        },
      ];
      let elseb = null;

      while (this.matchLiteral("else")) {
        if (this.matchLiteral("if")) {
          bodies.push(this.matchConditional(false));
        } else {
          elseb = this.getBlock().body;
          break;
        }
      }

      const end = this.was();
      return {
        node: AST.IF,
        bodies,
        elseb,
        label: block.label,
        ...toStartEnd(bk6, end),
      };
    }

    const isReturn = this.matchLiteral("return");
    if (isReturn) {
      const values = [];
      if (!this.hasEnd()) {
        values.push(this.expression());
        while (this.match(TOKENS.COMMA)) {
          values.push(this.expression());
        }
      }
      const last = this.was();
      this.end();
      return {
        node: AST.RETURN,
        values,
        ...toStartEnd(isReturn, last),
      };
    }

    const val = this.expression();
    this.end();
    return val;
  }

  topLevelFunc(exported) {
    const name = this.expect(TOKENS.IDENTIFIER, "Expected a function name");
    const params = this.getNames();
    const locals = this.getNames();
    const output = [];
    if (this.match(TOKENS.ARROW)) {
      const v = this.expect(
        TOKENS.IDENTIFIER,
        "Expected a function return type",
      );
      this.assertValueType(v);
      output.push(v.identifier);
      while (!this.match(TOKENS.LEFT_BRACE)) {
        this.expect(TOKENS.COMMA);
        const v = this.expect(
          TOKENS.IDENTIFIER,
          "Expected a function return type",
        );
        this.assertValueType(v);
        output.push(v.identifier);
      }
    } else this.expect(TOKENS.LEFT_BRACE);

    const body = [];
    while (!this.match(TOKENS.RIGHT_BRACE)) {
      body.push(this.statement());
    }

    const end = this.was();
    return {
      node: AST.FUNCTION,
      name: name.identifier,
      exported,
      params,
      locals,
      output,
      body,
      ...toStartEnd(name, end),
    };
  }

  hasEnd() {
    const tkn = this.peek();
    return (
      tkn.token === TOKENS.SEMICOLON ||
      tkn.token === TOKENS.EOF ||
      tkn.token === TOKENS.RIGHT_BRACE ||
      tkn.newline
    );
  }

  end() {
    const tkn = this.peek();
    if (
      this.match(TOKENS.SEMICOLON) ||
      tkn.token === TOKENS.EOF ||
      tkn.token === TOKENS.RIGHT_BRACE ||
      tkn.newline
    )
      return;
    this.errorToken(tkn, "Expected end of statement");
  }

  parse() {
    const ast = [];

    while (this.peek().token !== TOKENS.EOF) {
      const exported = this.matchLiteral("export");
      if (this.matchLiteral("fn")) ast.push(this.topLevelFunc(exported));
      else {
        let writable = null;
        if (this.matchLiteral("let")) writable = true;
        else if (this.matchLiteral("const")) writable = false;
        const name = this.expect(
          TOKENS.IDENTIFIER,
          "Expected a global or reference name",
        );

        if (writable !== null)
          ast.push(this.topLevelGlobal(name, exported, writable));
        else ast.push(this.topLevelRef(name, exported));
      }
      this.end();
    }
    return ast;
  }
}

const NUM_OPCODE = Object.freeze({
  i32: 0x7f,
  i64: 0x7e,
  f32: 0x7d,
  f64: 0x7c,
});
const NUM_CONST = Object.freeze({
  i32: 0x41,
  i64: 0x42,
  f32: 0x43,
  f64: 0x44,
});

function leb128u32(num) {
  const bytes = [];
  do {
    let val = num & 127;
    num >>>= 7;
    if (num !== 0) val |= 128;
    bytes.push(val);
  } while (num !== 0);
  return bytes;
}

/*function leb128u64(num) {
    const bytes = [];
    do {
      let val = Number(num & 127n);
      num >>>= 7n;
      if (num !== 0n) val |= 128;
      bytes.push(val);
    } while (num !== 0n);
    return bytes;
  }*/

function leb128s32(num) {
  const bytes = [];
  while (true) {
    let val = num & 127;
    num >>= 7;
    if (
      (num === 0 && (val & 0x40) === 0) ||
      (num === -1 && (val & 0x40) !== 0)
    ) {
      bytes.push(val);
      return bytes;
    }

    bytes.push(val | 128);
  }
}

function leb128s64(num) {
  const bytes = [];
  while (true) {
    let val = Number(num & 127n);
    num >>= 7n;
    if (
      (num === 0n && (val & 0x40) === 0) ||
      (num === -1n && (val & 0x40) !== 0)
    ) {
      bytes.push(val);
      return bytes;
    }

    bytes.push(val | 128);
  }
}

function float32(num) {
  const buffer = new ArrayBuffer(4);
  new DataView(buffer).setFloat32(0, num, true);
  return new Uint8Array(buffer);
}

function float64(num) {
  const buffer = new ArrayBuffer(8);
  new DataView(buffer).setFloat64(0, num, true);
  return new Uint8Array(buffer);
}

function encode(type, num) {
  switch (type) {
    case "i32":
      return leb128s32(num);
    case "i64":
      return leb128s64(num);
    case "f32":
      return float32(num);
    case "f64":
      return float64(num);
    default:
      throw new Error("what?");
  }
}

function formatToReal(val, hint) {
  const text = val.integer + (val.fractional ? "." + val.fractional : "");
  let v = hint === "i64" ? BigInt(text) : Number(text);
  if (val.negative) v = -v;
  return v;
}

function utf8(str) {
  const r = new TextEncoder().encode(str);
  return [...leb128u32(r.length), ...r];
}

function encodevec(vec) {
  return [...leb128u32(vec.length), ...vec.flat()];
}

function encodesection(section, id) {
  const vec = encodevec(section);
  return [id, ...leb128u32(vec.length), ...vec];
}

const TRUNC_SAT_ORDER = Object.freeze([
  "trunc_sat_f32_s",
  "trunc_sat_f32_u",
  "trunc_sat_f64_s",
  "trunc_sat_f64_u",
]);

function typeNotNumbers(a, b) {
  if (a.type === "number") return [b, a];
  return [a, b];
}

function toRawType(type) {
  switch (type) {
    case "u32":
    case "s32":
    case "i32":
      return "i32";
    case "u64":
    case "s64":
    case "i64":
      return "i64";
    case "f32":
    case "f64":
      return type;
    default:
      throw new Error("bad code");
  }
}

function toBigType(type) {
  switch (type) {
    case "u8":
    case "u16":
      return "u32";
    case "s8":
    case "s16":
      return "s32";
    case "u32":
    case "s32":
    case "u64":
    case "s64":
    case "f32":
    case "f64":
      return type;
    default:
      throw new Error("bad code");
  }
}

function getOpcode(level1, level2) {
  const base = OPCODES[level1];
  return level2 !== null ? base?.[level2] : base;
}

class VerifyCompiler {
  constructor(ast, text) {
    this.text = text;
    this.ast = ast;
    this.globals = new Map();
    this.locals = new Map();
    this.labelTypes = [];

    this.labels = [];
    this.types = [];
    this.imports = [];
    this.functions = [];
    this.memories = [];
    this.globalArr = [];
    this.exports = [];
    this.code = [];
  }
  errorToken(tkn, message) {
    error(this.text, tkn.start, tkn.end, message);
  }
  get(node, name) {
    if (this.locals.has(name)) return this.locals.get(name);
    if (this.globals.has(name)) return this.globals.get(name);
    this.errorToken(node, "Variable does not exist");
  }
  locateGlobals() {
    let globalIdx = 0;
    let memoryIdx = 0;
    let functionIdx = 0;

    const astSorted = this.ast.toSorted((a, b) => {
      const aImport =
        a.type === "import" ||
        a.type === "import-func" ||
        a.type === "import-memory";
      const bImport =
        b.type === "import" ||
        b.type === "import-func" ||
        b.type === "import-memory";
      if (aImport && !bImport) return -1;
      if (bImport && !aImport) return 1;
      return 0;
    });

    for (const node of astSorted) {
      const name = node.name;
      if (this.globals.has(name))
        this.errorToken(node, "Variable was already declared");
      switch (node.node) {
        case AST.GLOBAL:
          this.globals.set(name, {
            ref: globalIdx,
            type: node.type === "import" ? node.ref : node.type,
            writable: node.writable,
            relative: "global",
            ...toStartEnd(node, node),
          });

          if (node.exported) {
            this.exports.push([...utf8(node.name), 0x03, globalIdx]);
          }

          if (node.type === "import") {
            this.imports.push([
              ...utf8(node.level1),
              ...utf8(node.level2),
              0x03,
              NUM_OPCODE[toRawType(node.ref)],
              node.writable ? 1 : 0,
            ]);
          } else {
            const utype = toRawType(node.type);
            this.globalArr.push([
              NUM_OPCODE[utype],
              node.writable ? 1 : 0,
              NUM_CONST[utype],
              ...encode(utype, formatToReal(node, utype)),
              0x0b,
            ]);
          }

          globalIdx++;
          break;
        case AST.REF: {
          const type = node.type.startsWith("import-")
            ? node.type.slice(7)
            : node.type;
          const obj = {
            type,
            ...toStartEnd(node, node),
          };
          if (type === "memory") {
            if (node.max !== null && node.max < node.min)
              this.errorToken(
                node,
                "Memory maximum size must be at least memory minimum size",
              );
            obj.min = node.min;
            obj.max = node.max;
            obj.ref = memoryIdx;
            obj.index = node.index;
          } else {
            obj.params = node.params;
            obj.output = node.output;
            obj.ref = functionIdx;
          }
          this.globals.set(name, obj);

          if (node.type === "memory") {
            const out = [node.max !== null ? 1 : 0, ...leb128u32(node.min)];
            if (node.max !== null) out.push(...leb128u32(node.max));

            if (node.exported) {
              this.exports.push([
                ...utf8(node.name),
                0x02,
                ...leb128u32(memoryIdx),
              ]);
            }
            this.memories.push(out);
            memoryIdx++;
          } else if (node.type === "import-memory") {
            const out = [
              ...utf8(node.level1),
              ...utf8(node.level2),
              0x02,
              node.max !== null ? 1 : 0,
              ...leb128u32(node.min),
            ];
            if (node.max !== null) out.push(...leb128u32(node.max));

            if (node.exported) {
              this.exports.push([
                ...utf8(node.name),
                0x02,
                ...leb128u32(memoryIdx),
              ]);
            }

            this.imports.push(out);
            memoryIdx++;
          } else if (node.type === "import-func") {
            this.imports.push([
              ...utf8(node.level1),
              ...utf8(node.level2),
              0x00,
              ...leb128u32(functionIdx),
            ]);

            if (node.exported) {
              this.exports.push([
                ...utf8(node.name),
                0x00,
                ...leb128u32(functionIdx),
              ]);
            }

            this.types.push([
              0x60,
              ...encodevec(
                node.params.map((i) => NUM_OPCODE[toRawType(i.type)]),
              ),
              ...encodevec(node.output.map((i) => NUM_OPCODE[toRawType(i)])),
            ]);
            functionIdx++;
          }
          break;
        }
        case AST.FUNCTION:
          this.globals.set(name, {
            type: "func",
            params: node.params,
            output: node.output,
            ref: functionIdx,
            ...toStartEnd(node, node),
          });

          if (node.exported) {
            this.exports.push([
              ...utf8(node.name),
              0x00,
              ...leb128u32(functionIdx),
            ]);
          }

          this.functions.push(leb128u32(functionIdx));
          this.types.push([
            0x60,
            ...encodevec(node.params.map((i) => NUM_OPCODE[toRawType(i.type)])),
            ...encodevec(node.output.map((i) => NUM_OPCODE[toRawType(i)])),
          ]);
          functionIdx++;
          break;
        default:
          throw new Error("bad code");
      }
    }
  }

  typeIsInteger(type) {
    return type[0] === "u" || type[0] === "s" || type[0] === "i";
  }

  nodeIsInteger(node) {
    return (
      this.typeIsInteger(node.type) ||
      (node.type === "number" && !node.isDecimal)
    );
  }

  typeIsNumberLike(type) {
    return type === "number" || this.typeIsInteger(type) || type[0] === "f";
  }

  toTypeSize(type) {
    return Number(type.slice(1));
  }

  matchesType(expected, val) {
    const type = Array.isArray(val.type) ? val.type[0] : val.type;
    if (Array.isArray(val.type) && val.type.length > 1) return false;
    const just =
      type === expected ||
      (this.toTypeSize(type) === this.toTypeSize(expected) &&
        ((type[0] === "i" && this.typeIsInteger(expected)) ||
          (expected[0] === "i" && this.typeIsInteger(type))));
    const numbercast =
      type === "number" &&
      ((this.typeIsInteger(expected) && !val.isDecimal) ||
        expected[0] === "f") &&
      (expected[0] !== "u" || !val.isNegative);
    return just || numbercast;
  }

  shouldMatchType(expected, val) {
    if (!this.matchesType(expected, val))
      this.errorToken(
        val,
        `Got type ${val.type} but expected type ${expected}`,
      );
  }

  shouldMatchAnyType(val, ...expectations) {
    for (const expected of expectations) {
      if (this.matchesType(expected, val)) return;
    }
    this.errorToken(
      val,
      `Got type ${val.type} but expected one of ${expectations.join(", ")}`,
    );
  }

  resolveVariable(node) {
    if (node.type === "variable") {
      const attr = this.get(node, node.name);
      return {
        ...attr,
        // The location of the node should still be preserved
        ...toStartEnd(node, node),
      };
    }
    return node;
  }

  validInstructionCall(node) {
    const opt = getOpcode(node.level1, node.level2);
    if (opt === undefined) {
      const attr = this.get(node, node.level1);
      const params = this.flatValues(node.params);
      if (attr.type !== "func") this.errorToken(node, "Not a function");
      if (attr.params.length !== params.length)
        this.errorToken(node, "Wrong parameter count");

      for (let i = 0; i < attr.params.length; i++) {
        const expected = attr.params[i].type;
        this.shouldMatchType(expected, params[i]);
      }

      return attr.output;
    }

    const params = this.flatValuesResolvable(node.params);
    if (opt.params.length !== params.length)
      this.errorToken(node, "Wrong parameter count");
    for (let i = 0; i < opt.params.length; i++) {
      const expected = opt.params[i];
      const given = params[i];

      if (expected === null) continue;

      switch (expected) {
        case "variable": {
          if (given.type !== "variable")
            this.errorToken(given, "Expected a variable reference");
          const val = this.get(given, given.name);
          if (val.type === "memory" || val.type === "func")
            this.errorToken(given, "Expected a global reference");
          break;
        }
        case "memory": {
          if (given.type !== "variable")
            this.errorToken(given, "Expected a variable reference");
          const val = this.get(given, given.name);
          if (val.type !== "memory")
            this.errorToken(given, "Expected a memory reference");
          break;
        }
        default: {
          const val = this.resolveVariable(given);
          this.shouldMatchType(expected, val);
          break;
        }
      }
    }

    return opt.output;
  }

  getType(node) {
    switch (node.node) {
      case AST.NUMBER:
        return {
          type: "number",
          isDecimal: node.fractional.length > 0,
          isNegative: node.negative,
          ...toStartEnd(node, node),
        };
      case AST.IDENTIFIER:
        return {
          type: "variable",
          name: node.literal,
          ...toStartEnd(node, node),
        };
      case AST.ASSIGN: {
        const left = this.get(node, node.name);
        if (left.type === "memory" || left.type === "func")
          this.errorToken(
            node,
            "Cannot assign to a memory index or a function",
          );
        if (!left.writable)
          this.errorToken(node, "Cannot set read-only variable");
        this.shouldMatchType(
          left.type,
          this.resolveVariable(this.getType(node.body)),
        );
        return {
          type: left.relative === "local" ? left.type : "void",
          ...toStartEnd(node, node),
        };
      }
      case AST.ASSIGN_MANY: {
        const values = this.flatValues([node.body]);
        if (values.length !== node.targets.length)
          this.errorToken(
            node,
            `Expected ${node.targets.length} values but got ${values.length} values`,
          );

        const out = [];
        for (const [idx, val] of node.targets.entries()) {
          const left = this.get(node, val.literal);
          if (left.type === "memory" || left.type === "func")
            this.errorToken(
              val,
              "Cannot assign to a memory index or a function",
            );
          if (!left.writable)
            this.errorToken(val, "Cannot set read-only variable");
          this.shouldMatchType(left.type, values[idx]);
          out.push(left.relative === "local" ? left.type : "void");
        }
        return {
          type: out,
          ...toStartEnd(node, node),
        };
      }
      case AST.MEMORY_INDEX: {
        const mem = this.get(node, node.memory);
        if (mem.type !== "memory")
          this.errorToken(node, "Can only index memories");
        if (mem.index === null)
          this.errorToken(node, "Memory is not indexable");
        this.shouldMatchType(
          "u32",
          this.resolveVariable(this.getType(node.index)),
        );
        return {
          type: toBigType(mem.index),
          ...toStartEnd(node, node),
        };
      }
      case AST.ASSIGN_MEMORY_INDEX: {
        const mem = this.get(node, node.memory);
        if (mem.type !== "memory")
          this.errorToken(node, "Can only index memories");
        if (mem.index === null)
          this.errorToken(node, "Memory is not indexable");
        this.shouldMatchType(
          "u32",
          this.resolveVariable(this.getType(node.index)),
        );
        this.shouldMatchType(
          toBigType(mem.index),
          this.resolveVariable(this.getType(node.body)),
        );
        return {
          type: "void",
          ...toStartEnd(node, node),
        };
      }
      case AST.POSTFIX_VARIABLE: {
        const ident = this.get(node, node.ident);
        return {
          type: ident.relative === "local" ? ident.type : "void",
          ...toStartEnd(node, node),
        };
      }
      case AST.BINARY_INTEGER_SIGNED:
      case AST.BINARY_INTEGER: {
        const a = this.resolveVariable(this.getType(node.left));
        const b = this.resolveVariable(this.getType(node.right));
        if (!this.nodeIsInteger(a))
          this.errorToken(
            node.left,
            "Integer operators should have integer values",
          );
        if (!this.nodeIsInteger(b))
          this.errorToken(
            node.right,
            "Integer operators should have integer values",
          );
        const [left, right] = typeNotNumbers(a, b);
        if (node.type === "shl" || node.type === "shr") {
          this.shouldMatchType(a.type.replace("s", "u"), b);
        } else this.shouldMatchType(left.type, right);
        if (left.type === "number") {
          return {
            type: "number",
            isDecimal: false,
            ...toStartEnd(node, node),
          };
        }
        return {
          type: left.type,
          ...toStartEnd(node, node),
        };
      }
      case AST.BINARY_SIGNED:
      case AST.BINARY: {
        const a = this.resolveVariable(this.getType(node.left));
        const b = this.resolveVariable(this.getType(node.right));
        const [left, right] = typeNotNumbers(a, b);
        if (!this.typeIsNumberLike(a.type))
          this.errorToken(
            node.left,
            "Binary operators should have number values",
          );
        if (!this.typeIsNumberLike(b.type))
          this.errorToken(
            node.right,
            "Binary operators should have number values",
          );
        this.shouldMatchType(left.type, right);
        if (node.comparison) return { type: "i32", ...toStartEnd(node, node) };
        if (left.type === "number") {
          return {
            type: "number",
            isDecimal: a.isDecimal || b.isDecimal,
            ...toStartEnd(node, node),
          };
        }
        return {
          type: left.type,
          ...toStartEnd(node, node),
        };
      }
      case AST.NOT: {
        const type = this.resolveVariable(this.getType(node.body));
        this.shouldMatchAnyType(type, "i32", "i64");
        return {
          ...toStartEnd(node, node),
          type: "i32", // NOT uses eqz which always returns i32
        };
      }
      case AST.NEGATION: {
        const type = this.resolveVariable(this.getType(node.body));
        this.shouldMatchAnyType(type, "f32", "f64");
        if (type.type === "number") {
          return {
            type: "number",
            // technically it should be float but having isDecimal be true
            // is good enough to satisfy the invariant that negation can't return ints
            isDecimal: true,
            ...toStartEnd(node, node),
          };
        }
        return {
          type: type.type,
          ...toStartEnd(node, node),
        };
      }
      case AST.EXPRESSION: {
        const ret = this.validInstructionCall(node);

        if (node.level1 === "global" || node.level1 === "local") {
          const param = this.get(node.params[0], node.params[0].literal);
          if (param.relative === "local" && node.level1 === "global") {
            this.errorToken(
              node,
              "global operations can only be done on globals",
            );
          }
          if (param.relative === "global" && node.level1 === "local")
            this.errorToken(
              node,
              "local operations can only be done on locals",
            );
        }
        if (node.level2 === "get")
          return {
            type: this.get(node.params[0], node.params[0].literal).type,
            ...toStartEnd(node, node),
          };
        if (node.level2 === "set" || node.level2 === "tee") {
          const rvar = this.get(node.params[0], node.params[0].literal);
          if (!rvar.writable)
            this.errorToken(node.params[0], "Cannot set read-only variable");
          const retVar = rvar.type;
          const retType = this.resolveVariable(this.getType(node.params[1]));
          this.shouldMatchType(retVar, retType);

          if (node.level2 === "tee")
            return {
              type: retVar,
              ...toStartEnd(node, node),
            };
        }
        if (node.level1 === "select") {
          const a = this.resolveVariable(this.getType(node.params[0]));
          const b = this.resolveVariable(this.getType(node.params[1]));
          const [rt1, rt2] = typeNotNumbers(a, b);

          if (a.type === "memory" || a.type === "func")
            this.errorToken(node.params[0], "Not a variable");
          if (b.type === "memory" || b.type === "func")
            this.errorToken(node.params[1], "Not a variable");
          this.shouldMatchType(rt1.type, rt2);
          if (rt1.type === "number")
            return {
              type: "number",
              isDecimal: a.isDecimal || b.isDecimal,
              ...toStartEnd(node, node),
            };
          return {
            type: rt1.type,
            ...toStartEnd(node, node),
          };
        }
        if (node.level1 === "generic") {
          const opcode = OPCODES.generic[node.level2];
          const hasDouble = node.params.length === 2;
          const a = this.resolveVariable(this.getType(node.params[0]));
          const b = hasDouble
            ? this.resolveVariable(this.getType(node.params[1]))
            : null;

          let left;
          if (hasDouble) {
            const ret = typeNotNumbers(a, b);
            left = ret[0];
            if (node.level2 !== "rotl" && node.level2 !== "rotr")
              this.shouldMatchType(left.type, ret[1]);
          } else {
            left = a;
          }
          if (opcode.type) {
            // int
            if (!this.nodeIsInteger(a))
              this.errorToken(node.params[0], "Should be an integer");
            if (hasDouble) {
              if (node.level2 === "rotl" || node.level2 === "rotr")
                this.shouldMatchType(a.type.replace("s", "u"), b);
              else if (!this.nodeIsInteger(b))
                this.errorToken(node.params[1], "Should be an integer");
            }
            if (left.type === "number")
              return {
                type: "number",
                isDecimal: false,
                ...toStartEnd(node, node),
              };
            if (
              node.level2 === "clz" ||
              node.level2 === "ctz" ||
              node.level2 === "popcnt"
            )
              return {
                type: a.type.replace("s", "u"),
                ...toStartEnd(node, node),
              };
            return {
              type: left.type,
              ...toStartEnd(node, node),
            };
          }

          // float
          if (!this.typeIsNumberLike(a.type))
            this.errorToken(node.params[0], "Should be a number");
          if (hasDouble && !this.typeIsNumberLike(b.type))
            this.errorToken(node.params[1], "Should be a number");
          if (left.type === "number")
            return {
              type: "number",
              isDecimal: true,
              ...toStartEnd(node, node),
            };
          return {
            type: left.type,
            ...toStartEnd(node, node),
          };
        }

        if (node.level1 === "uint" || node.level1 === "sint") {
          const to = node.level1[0];
          const want = to === "u" ? "s" : "u";
          const type = this.resolveVariable(this.getType(node.params[0])).type;
          if (Array.isArray(type) && type.length > 1)
            this.errorToken(node.params[0], "uint/sint expects 1 parameter");
          const resolvedType = Array.isArray(type) ? type[0] : type;
          if (want[0] !== resolvedType[0])
            this.errorToken(
              node.params[0],
              `expected ${want[0]}, got ${resolvedType}`,
            );
          const arity = this.toTypeSize(resolvedType);
          return {
            type: `${to}${arity}`,
            ...toStartEnd(node, node),
          };
        }

        return {
          type: ret,
          ...toStartEnd(node, node),
        };
      }
      default:
        throw new Error("bad code");
    }
  }

  flatValuesResolvable(output) {
    const next = [];
    for (const member of output) {
      const t = this.getType(member);
      if (Array.isArray(t.type))
        for (const o of t.type)
          next.push({
            type: o,
            ...toStartEnd(t, t),
          });
      else next.push(t);
    }
    return next;
  }

  flatValues(output) {
    const next = [];
    for (const member of output) {
      const t = this.resolveVariable(this.getType(member));
      if (Array.isArray(t.type))
        for (const o of t.type)
          next.push({
            type: o,
            ...toStartEnd(t, t),
          });
      else next.push(t);
    }
    return next;
  }

  verifyStatement(node, func) {
    switch (node.node) {
      case AST.BREAK:
        if (node.label === null) {
          // no label: can only break out of loops
          if (!this.labelTypes.some((i) => i.continue))
            this.errorToken(node, "unlabeled break can only be used on a loop");
        } else {
          if (!this.labelTypes.some((i) => i.label === node.label))
            this.errorToken(node, "cannot break out of unknown label");
        }
        break;
      case AST.CONTINUE:
        if (node.label === null) {
          if (!this.labelTypes.some((i) => i.continue))
            this.errorToken(node, "continue can only be used in a loop");
        } else {
          const item = this.labelTypes.find((i) => i.label === node.label);
          if (!item) this.errorToken(node, "cannot continue unknown label");
          if (!item.continue)
            this.errorToken(node, "cannot continue if / block");
        }
        break;
      case AST.RETURN: {
        const retval = this.flatValues(node.values);
        if (func.output.length !== retval.length)
          this.errorToken(
            node,
            `Expected ${func.output.length} return values, but got ${retval.length} values`,
          );
        for (let i = 0; i < retval.length; i++) {
          const out = retval[i];
          this.shouldMatchType(func.output[i], out);
        }
        break;
      }
      case AST.BLOCK:
        this.labelTypes.push({
          label: node.label,
          continue: false,
        });
        for (const line of node.body) {
          this.verifyStatement(line, func);
        }
        this.labelTypes.pop();
        break;
      case AST.IF:
        this.labelTypes.push({
          label: node.label,
          continue: false,
        });
        for (const line of node.bodies) {
          const expr = this.resolveVariable(this.getType(line.cond));
          this.shouldMatchType("i32", expr);
          for (const node of line.body) this.verifyStatement(node, func);
        }
        if (node.elseb) {
          for (const line of node.elseb) this.verifyStatement(line, func);
        }
        this.labelTypes.pop();
        break;
      case AST.WHILE:
        this.labelTypes.push({
          label: node.label,
          continue: true,
        });
        this.isLoop++;
        this.shouldMatchType(
          "i32",
          this.resolveVariable(this.getType(node.cond)),
        );
        // Just verify that it's valid, but it also doesn't need to match a type since it gets discarded
        if (node.update !== null) this.getType(node.update);
        for (const line of node.body) this.verifyStatement(line, func);
        this.labelTypes.pop();
        break;
      default:
        this.getType(node);
        break;
    }
  }

  compileFunctionParams(node) {
    const out = [];
    const func = this.get(node, node.level1);
    let funcIdx = 0;
    for (let i = 0; i < node.params.length; i++) {
      const arg = node.params[i];
      const argType = this.getType(arg);
      const type = func.params[funcIdx].type;
      if (Array.isArray(argType.type)) funcIdx += argType.type.length;
      else funcIdx++;
      out.push(...this.compileExpression(arg, type).code);
    }
    return out;
  }

  compileExpression(node, hint) {
    switch (node.node) {
      case AST.NUMBER: {
        // A top level number can't actually be used anywhere
        if (hint === "")
          return {
            code: [],
            len: 0,
          };
        const uhint = toRawType(hint);
        return {
          code: [NUM_CONST[uhint], ...encode(uhint, formatToReal(node, uhint))],
          len: 1,
        };
      }
      case AST.IDENTIFIER: {
        const ref = this.get(node, node.literal);
        return {
          code: [ref.relative === "local" ? 0x20 : 0x23, ...leb128u32(ref.ref)],
          len: 1,
        };
      }
      case AST.ASSIGN: {
        const ref = this.get(node, node.name);
        const expr = this.compileExpression(node.body, ref.type).code;
        return {
          code: [
            ...expr,
            ref.relative === "local" ? (hint === "" ? 0x21 : 0x22) : 0x24,
            ...leb128u32(ref.ref),
          ],
          len: ref.relative === "local" && hint !== "" ? 1 : 0,
        };
      }
      case AST.ASSIGN_MANY: {
        const code = [...this.compileExpression(node.body, "").code];
        let len = 0;
        // Values need to be popped in reverse
        for (const target of node.targets.toReversed()) {
          const ref = this.get(node, target.literal);
          code.push(
            ref.relative === "local" ? (hint === "" ? 0x21 : 0x22) : 0x24,
            ...leb128u32(ref.ref),
          );
          if (ref.relative === "local" && hint !== "") len++;
        }
        return {
          code,
          len,
        };
      }
      case AST.MEMORY_INDEX: {
        const ref = this.get(node, node.memory);
        const type = toRawType(toBigType(ref.index));
        const size = this.toTypeSize(ref.index);
        const loadop =
          size === 32 || size === 64 ? "load" : `load${size}_${ref.index[0]}`;
        const opcodeLoad = OPCODES[type][loadop].opcode;
        const byteSize = Math.log2(size / 8);
        return {
          code: [
            ...this.compileExpression(node.index, "u32").code,
            // 8 does not need a multiplier since it's 1 byte
            NUM_CONST.i32,
            ...encode("i32", 2 ** byteSize),
            OPCODES.i32.mul.opcode,
            opcodeLoad,
            // This alignment optimization is valid here but not in general load/store
            // because MEMORY_INDEX is always size-aligned, but general load/store is only byte-aligned
            ...leb128u32(64 + byteSize),
            ...leb128u32(ref.ref),
            ...leb128u32(0),
          ],
          len: 1,
        };
      }
      case AST.ASSIGN_MEMORY_INDEX: {
        const ref = this.get(node, node.memory);
        const type = toRawType(toBigType(ref.index));
        const size = this.toTypeSize(ref.index);
        const storeop = size === 32 || size === 64 ? "store" : `store${size}`;
        const opcodeStore = OPCODES[type][storeop].opcode;
        const byteSize = Math.log2(size / 8);
        return {
          code: [
            ...this.compileExpression(node.index, "u32").code,
            // 8 does not need a multiplier since it's 1 byte
            NUM_CONST.i32,
            ...encode("i32", 2 ** byteSize),
            OPCODES.i32.mul.opcode,
            ...this.compileExpression(node.body, toBigType(ref.index)).code,
            opcodeStore,
            // This alignment optimization is valid here but not in general load/store
            // because MEMORY_INDEX is always size-aligned, but general load/store is only byte-aligned
            ...leb128u32(64 + byteSize),
            ...leb128u32(ref.ref),
            ...leb128u32(0),
          ],
          len: 0,
        };
      }
      case AST.POSTFIX_VARIABLE: {
        const ref = this.get(node, node.ident);
        const uhint = toRawType(ref.type);
        return {
          code: [
            ref.relative === "local" ? 0x20 : 0x23,
            ...leb128u32(ref.ref),
            NUM_CONST[uhint],
            ...encode(uhint, 1),
            OPCODES[uhint][node.type].opcode,
            ref.relative === "local" ? (hint === "" ? 0x21 : 0x22) : 0x24,
            ...leb128u32(ref.ref),
          ],
          len: ref.relative === "local" && hint !== "" ? 1 : 0,
        };
      }
      case AST.BINARY_INTEGER:
      case AST.BINARY: {
        const ta = this.resolveVariable(this.getType(node.left));
        const tb = this.resolveVariable(this.getType(node.right));
        const tOutA = typeNotNumbers(ta, tb)[0].type;
        const tOut = tOutA === "number" ? hint : tOutA;
        if (tOut === "") return { code: [], len: 0 };
        return {
          code: [
            ...this.compileExpression(node.left, tOut).code,
            ...this.compileExpression(node.right, tOut).code,
            OPCODES[toRawType(tOut)][node.type].opcode,
          ],
          len: 1,
        };
      }
      case AST.BINARY_INTEGER_SIGNED:
      case AST.BINARY_SIGNED: {
        const ta = this.resolveVariable(this.getType(node.left));
        const tb = this.resolveVariable(this.getType(node.right));
        const tOutA = typeNotNumbers(ta, tb)[0].type;
        const tOut = tOutA === "number" ? hint : tOutA;
        if (tOut === "") return { code: [], len: 0 };
        const op = node.type + (tOut[0] !== "f" ? "_" + tOut[0] : "");
        return {
          code: [
            ...this.compileExpression(node.left, tOut).code,
            ...this.compileExpression(node.right, tOut).code,
            OPCODES[toRawType(tOut)][op].opcode,
          ],
          len: 1,
        };
      }
      case AST.NOT: {
        const typep = this.resolveVariable(this.getType(node.body)).type;
        // i32.eqz/i64.eqz can't ever return i64, so i32 is more explicit
        const type = typep === "number" ? "i32" : typep;
        return {
          code: [
            ...this.compileExpression(node.body, type).code,
            OPCODES[toRawType(type)].eqz.opcode,
          ],
          len: 1,
        };
      }
      case AST.NEGATION: {
        const typep = this.resolveVariable(this.getType(node.body)).type;
        const type = typep === "number" ? hint : typep;
        if (type === "") return { code: [], len: 0 };
        return {
          code: [
            ...this.compileExpression(node.body, type).code,
            OPCODES[toRawType(type)].neg.opcode,
          ],
          len: 1,
        };
      }
      case AST.EXPRESSION: {
        if (node.level2 === "get") {
          const opcode = OPCODES[node.level1].get;
          return {
            code: [
              opcode.opcode,
              ...leb128u32(
                this[node.level1 + "s"].get(node.params[0].literal).ref,
              ),
            ],
            len: 1,
          };
        } else if (node.level2 === "set" || node.level2 === "tee") {
          const opcode = OPCODES[node.level1][node.level2].opcode;
          return {
            code: [
              ...this.compileExpression(
                node.params[1],
                this[node.level1 + "s"].get(node.params[0].literal).type,
              ).code,
              opcode,
              ...leb128u32(
                this[node.level1 + "s"].get(node.params[0].literal).ref,
              ),
            ],
            // tee could be optimized with set but this optimization is already done
            // as AST.ASSIGN and if you use native wasm primitives it should stay that way
            len: node.level2 === "tee" ? 1 : 0,
          };
        }
        if (node.level1 === "select") {
          const opcode = OPCODES.select.opcode;
          const [paramA, paramB] = node.params;
          const typeA = this.resolveVariable(this.getType(paramA));
          const typeB = this.resolveVariable(this.getType(paramB));
          const tOutA = typeNotNumbers(typeA, typeB)[0].type;
          const tOut = tOutA === "number" ? hint : tOutA;
          // This means that select is top-level with two number arguments
          // which can be dropped
          if (tOut === "") return { code: [], len: 0 };
          return {
            code: [
              ...this.compileExpression(paramA, tOut).code,
              ...this.compileExpression(paramB, tOut).code,
              ...this.compileExpression(node.params[2], "i32").code,
              opcode,
            ],
            len: 1,
          };
        }
        if (node.level1 === "generic") {
          const paramA = node.params[0];
          const typeA = this.resolveVariable(this.getType(paramA));
          const tOutA = (
            node.params.length === 2
              ? typeNotNumbers(
                  typeA,
                  this.resolveVariable(this.getType(node.params[1])),
                )[0]
              : typeA
          ).type;
          const tOut = tOutA === "number" ? hint : tOutA;
          if (hint === "") return { code: [], len: 0 };

          const opcode = OPCODES[toRawType(tOut)][node.level2].opcode;
          const code = [...this.compileExpression(paramA, tOut).code];
          if (node.params.length === 2)
            code.push(...this.compileExpression(node.params[1], tOut).code);
          code.push(opcode);
          return {
            code,
            len: 1,
          };
        }
        if (node.level1 === "memory") {
          const memidx = this.globals.get(node.params[0].literal).ref;
          const opcode =
            OPCODES.memory[node.level2 === "byteSize" ? "size" : node.level2];
          const out = [];
          const base = node.level2 === "copy" ? 2 : 1;
          for (let i = base; i < opcode.params.length; i++) {
            const type = opcode.params[i];
            const arg = node.params[i];
            out.push(...this.compileExpression(arg, type).code);
          }
          out.push(opcode.opcode);
          if (
            node.level2 === "size" ||
            node.level2 === "grow" ||
            node.level2 === "byteSize"
          )
            out.push(...leb128u32(memidx));
          if (node.level2 === "copy")
            out.push(
              ...leb128u32(10),
              ...leb128u32(memidx),
              ...leb128u32(this.globals.get(node.params[1].literal).ref),
            );
          else if (node.level2 === "fill") out.push(...leb128u32(11), memidx);
          else if (node.level2 === "byteSize")
            out.push(NUM_CONST.i32, ...leb128s32(16), OPCODES.i32.shl.opcode);
          return {
            code: out,
            len: node.level2 === "size" || node.level2 === "grow" ? 1 : 0,
          };
        }
        if (
          node.level2 !== null &&
          (node.level2.startsWith("load") || node.level2.startsWith("store"))
        ) {
          const out = [];
          const opcode = OPCODES[node.level1][node.level2];
          for (let i = 1; i < opcode.params.length; i++) {
            const type = opcode.params[i];
            const arg = node.params[i];
            out.push(...this.compileExpression(arg, type).code);
          }
          out.push(
            opcode.opcode,
            ...leb128u32(64),
            ...leb128u32(this.globals.get(node.params[0].literal).ref),
            ...leb128u32(0),
          );
          return {
            code: out,
            len: node.level2.startsWith("load") ? 1 : 0,
          };
        }

        if (node.level1 === "uint" || node.level1 === "sint")
          return this.compileExpression(node.params[0]);

        const out = [];
        const opcode = getOpcode(node.level1, node.level2);
        if (opcode === undefined) {
          const func = this.get(node, node.level1);
          const out = this.compileFunctionParams(node);
          out.push(0x10, ...leb128u32(this.globals.get(node.level1).ref));
          return {
            code: out,
            len: func.output.length,
          };
        }

        let funcIdx = 0;
        for (let i = 0; i < node.params.length; i++) {
          const arg = node.params[i];
          const argType = this.getType(arg);
          const type = opcode.params[funcIdx];
          if (Array.isArray(argType.type)) funcIdx += argType.type.length;
          else funcIdx++;
          out.push(...this.compileExpression(arg, type).code);
        }
        out.push(opcode.opcode);
        if (node.level2 !== null && node.level2.startsWith("trunc_sat_"))
          out.push(
            ...leb128u32(
              (node.level1 === "i64" ? 4 : 0) +
                TRUNC_SAT_ORDER.indexOf(node.level2),
            ),
          );

        return {
          code: out,
          len: opcode.output.length,
        };
      }
      default:
        throw new Error("bad code");
    }
  }

  compileStatement(node, func) {
    switch (node.node) {
      case AST.BREAK: {
        const index = this.labels.findLastIndex(
          (i) =>
            (node.label === null && i.continue === true) ||
            (node.label !== null &&
              node.label === i.label &&
              i.continue !== null),
        );
        const idx =
          this.labels.length - index - (this.labels[index].continue ? 0 : 1);
        return [0x0c, ...leb128u32(idx)];
      }
      case AST.CONTINUE: {
        const idx =
          this.labels.length -
          this.labels.findLastIndex(
            (i) =>
              i.continue === true &&
              (node.label === null || node.label === i.label),
          ) -
          2;
        return [0x0c, ...leb128u32(idx)];
      }
      case AST.RETURN: {
        if (node.values.length === 1) {
          const val = node.values[0];
          if (
            val.node === AST.EXPRESSION &&
            getOpcode(val.level1, val.level2) === undefined
          ) {
            const func = this.get(val, val.level1).ref;
            return [
              ...this.compileFunctionParams(val),
              0x12,
              ...leb128u32(func),
            ];
          }
        }

        const code = [];
        for (let i = 0; i < node.values.length; i++) {
          code.push(
            ...this.compileExpression(node.values[i], func.output[i]).code,
          );
        }
        code.push(0x0f);
        return code;
      }
      case AST.IF: {
        const body = [];
        this.labels.push({
          label: node.label,
          continue: false,
        });
        for (const [idx, state] of node.bodies.entries()) {
          if (idx > 0)
            this.labels.push({
              label: null,
              continue: null,
            });

          body.push(
            ...this.compileExpression(state.cond, "i32").code,
            0x04,
            0x40,
          );
          for (const line of state.body)
            body.push(...this.compileStatement(line, func));
          body.push(0x05);
        }
        if (node.elseb) {
          for (const line of node.elseb)
            body.push(...this.compileStatement(line, func));
        } else body.pop(); // There is a trailing 0x05 so it needs to be popped
        for (let i = 0; i < node.bodies.length; i++) {
          body.push(0x0b);
          this.labels.pop();
        }
        return body;
      }
      case AST.WHILE: {
        const body = [];
        if (node.init !== null)
          body.push(...this.compileExpression(node.init, "").code);
        if (!node.isDo) {
          body.push(...this.compileExpression(node.cond, "i32").code, 0x04);
        } else {
          body.push(0x02);
        }
        body.push(0x40, 0x03, 0x40, 0x02, 0x40);
        this.labels.push(
          {
            label: null, // to break
            continue: null,
          },
          {
            label: node.label,
            continue: true,
          },
          {
            label: null, // to continue
            continue: null,
          },
        );
        for (const line of node.body)
          body.push(...this.compileStatement(line, func));
        body.push(0x0b);
        if (node.update !== null)
          body.push(...this.compileExpression(node.update, "").code);
        body.push(
          ...this.compileExpression(node.cond, "i32").code,
          0x0d,
          ...leb128u32(0),
          0x0b,
          0x0b,
        );
        this.labels.pop();
        this.labels.pop();
        this.labels.pop();
        return body;
      }
      case AST.BLOCK: {
        this.labels.push({
          label: node.label,
          continue: false,
        });
        const body = [0x02, 0x40];
        for (const block of node.body) {
          body.push(...this.compileStatement(block, func));
        }
        body.push(0x0b);
        this.labels.pop();
        return body;
      }
      default: {
        const res = this.compileExpression(node, "");
        for (let i = 0; i < res.len; i++) res.code.push(0x1a);
        return res.code;
      }
    }
  }

  // Returns a tuple: [hasReturn, causedByBreakContinue]
  hasReturn(body) {
    for (const line of body) {
      if (line.node === AST.RETURN) return [true, false];
      // Unreachable immediately halts execution, so it technically returns
      if (line.node === AST.EXPRESSION && line.level1 === "unreachable")
        return [true, false];
      if (line.node === AST.BREAK || line.node === AST.CONTINUE)
        return [false, true];
      if (line.node === AST.BLOCK) {
        const res = this.hasReturn(line.body);
        if (res[0]) return [true, false];
        if (res[1]) return [false, true];
      }
      if (line.node === AST.IF) {
        // If there is no else all the if conditions could be false
        let possible = line.elseb !== null;
        for (const body of line.bodies) {
          const res = this.hasReturn(body.body);
          if (!res[0]) possible = false;
          if (res[1]) return [false, true];
        }
        if (line.elseb) {
          const res = this.hasReturn(line.elseb);
          if (!res[0]) possible = false;
          if (res[1]) return [false, true];
        }
        if (possible) return [true, false];
      }
      // If isDo is false assume the condition is always false, so the loop never runs
      if (line.node === AST.WHILE && line.isDo) {
        const res = this.hasReturn(line.body);
        if (res[0]) return [true, false];
        if (res[1]) return [false, true];
      }
    }

    return [false, false];
  }

  validateAndCompileFunction(node) {
    this.locals.clear();

    const code = [];
    const locals = [];
    let localIdx = 0;
    let currentParam = "",
      currentLen = 0;

    for (const arg of [...node.params, ...node.locals]) {
      if (this.locals.has(arg.name))
        this.errorToken(arg, "This local was already declared");
      this.locals.set(arg.name, {
        type: arg.type,
        writable: true,
        relative: "local",
        ref: localIdx++,
        ...toStartEnd(arg, arg),
      });
    }

    for (const param of node.locals) {
      if (currentParam === toRawType(param.type)) {
        currentLen++;
      } else {
        if (currentParam !== "") {
          locals.push([leb128u32(currentLen), NUM_OPCODE[currentParam]]);
        }
        currentParam = toRawType(param.type);
        currentLen = 1;
      }
    }
    if (currentParam !== "") {
      locals.push([leb128u32(currentLen), NUM_OPCODE[currentParam]]);
    }
    code.push(...encodevec(locals));

    for (const line of node.body) {
      this.verifyStatement(line, node);
      code.push(...this.compileStatement(line, node));
    }

    if (node.output.length > 0) {
      if (!this.hasReturn(node.body)[0])
        this.errorToken(node, "Expected a return statement");
      const last = code.at(-1);
      // Since there always is a return but there isn't one at the end of the code insert unreachable
      if (last !== 0x12 && last !== 0x0f) code.push(0x00);
    }

    code.push(0x0b);
    this.code.push(encodevec(code));
  }

  concat() {
    return Uint8Array.from([
      0x00,
      0x61,
      0x73,
      0x6d, // magic
      0x01,
      0x00,
      0x00,
      0x00, // version
      ...encodesection(this.types, 1),
      ...encodesection(this.imports, 2),
      ...encodesection(this.functions, 3),
      ...encodesection(this.memories, 5),
      ...encodesection(this.globalArr, 6),
      ...encodesection(this.exports, 7),
      ...encodesection(this.code, 10),
    ]);
  }

  verifyCompile() {
    this.locateGlobals();
    for (const node of this.ast) {
      if (node.node === AST.FUNCTION) this.validateAndCompileFunction(node);
    }
    return this.concat();
  }
}

function compileRaw(text) {
  const tokens = lex(text);
  const ast = new Parser(tokens, text).parse();
  return new VerifyCompiler(ast, text).verifyCompile();
}

async function optimize(wasm) {
  const binaryen = (
    await import("https://cdn.jsdelivr.net/npm/binaryen@123.0.0")
  ).default;
  const module = binaryen.readBinary(wasm);
  module.setFeatures(binaryen.Features.BulkMemoryOpt);
  module.optimize();
  const binary = module.emitBinary();
  module.dispose();
  return binary;
}

function compileCode(text) {
  return optimize(compileRaw(text));
}

export async function compile(emwasm, deps) {
  return compileWasm(await compileCode(emwasm), deps);
}
