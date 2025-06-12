import { compileWasm } from "/utils.js";

/*
Unimplemented features
- Tables & elements
- Vectors + Relaxed SIMD
- References + Garbage collection

Typed function reference goodies
- Type aliases

- Store the utils (open addressing hash table, atan2, GCD, priority queue, modular exponentation)

Unimplemented semanatics (easier)
- Branch hinting
- min/max/abs functions for integers
- easy conversion from i32 to i64 and vice versa
- better code references in error messages
- multiple error messages at one time
- Start functions
- Compile-time constants
- Large number notation
- Optimization of memory.size / memory.byteSize with non-grown memories
- JS-like let/const variables that basically automagically create a local with initializer
- Structs (possibly only memory, possibly others)

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
  TILDE: 46,
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
  "~": TOKENS.TILDE,
});
const MAX_SIZE = Object.keys(CHARACTER_TABLE)
  .map((i) => i.length)
  .sort((a, b) => b - a)[0];

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
    for (let i = MAX_SIZE; i > 0; i--) {
      const t = text.slice(idx, idx + i);
      const entry = CHARACTER_TABLE[t];
      if (entry !== undefined) {
        tokens.push({
          token: entry,
          newline,
          start: idx,
          end: idx + i,
        });
        idx += i;
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
const MEMORY_TYPES = Object.freeze([
  ...VALUE_TYPES,
  "u8",
  "s8",
  "u16",
  "s16",
  "bool",
]);
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
      opcode: 0x3f,
      params: ["memory"],
      output: ["i32"],
    },
    clear: {
      opcode: 0xfc,
      params: ["memory"],
      output: [],
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
    init: {
      opcode: 0xfc,
      params: ["memory", "data-segment", "i32", "i32", "i32"],
      output: [],
    },
  },
  data: {
    __proto__: null,
    drop: {
      opcode: 0xfc,
      params: ["data-segment"],
      output: [],
    },
  },
  select: {
    __proto__: null,
    opcode: null,
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
  i8: {
    size: 1,
  },
  i16: {
    size: 2,
  },
  i32: {
    size: 4,
  },
  i64: {
    size: 8,
  },
  u32: {
    min: 0,
    max: 2 ** 32 - 1,
  },
  u64: {
    min: 0,
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
  // https://en.wikipedia.org/wiki/IEEE_754
  // https://math.stackexchange.com/questions/2607697/the-upper-and-lower-limits-of-ieee-754-standard
  f32: {
    min: 2 ** -149,
    max: (1 - 2 ** -24) * 2 ** 128,
  },
  f64: {
    min: 2 ** -1074,
    // Not 2 ** 1024 because that would turn into Infinity
    max: (1 - 2 ** -53) * 2 * 2 ** 1023,
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
  NEGATION: 15, // special unary operator that works on floats
  BINARY_SIGNED: 16, // same as BINARY, but the compiled operators depend on the signedness of the operands
  BINARY_INTEGER_SIGNED: 17, // same as BINARY_INTEGER, but the compiled operators depend on the signedness of the operands
  BLOCK: 18,
  MEMORY_INDEX: 19,
  ASSIGN_MEMORY_INDEX: 20,
  ASSIGN_MANY: 21,
  FULL_NOT: 22,
});

function looseInteger(val) {
  if (val === null) return val;
  return Number(val.integer);
}

function getOpcode(level1, level2) {
  if (level1.node !== AST.IDENTIFIER) return undefined;
  const base = OPCODES[level1.literal];
  return level2 !== null ? base?.[level2] : base;
}

function toLongType(token) {
  const size = token === "bool" ? 1 : Number(token.slice(1));
  if (token[0] === "f") {
    return {
      type: "float",
      size,
    };
  }

  return {
    type: "int",
    signed: token[0] === "s" ? 1 : 0,
    size,
  };
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
    const msg = message ?? `Expected one of ${payloads.join(", ")}`;
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
    return toLongType(token.identifier);
  }

  getValueType() {
    const tkn = this.expect(TOKENS.IDENTIFIER);
    if (tkn.identifier === "func") {
      const output = [];
      if (this.match(TOKENS.LEFT_ARROW)) {
        output.push(this.getValueType());
        while (!this.match(TOKENS.RIGHT_ARROW)) {
          this.expect(TOKENS.COMMA);
          output.push(this.getValueType());
        }
      }

      this.expect(TOKENS.LEFT_PAREN);

      const params = [];
      if (!this.match(TOKENS.RIGHT_PAREN)) {
        params.push(this.getValueType());
        while (!this.match(TOKENS.RIGHT_PAREN)) {
          this.expect(TOKENS.COMMA);
          params.push(this.getValueType());
        }
      }

      return {
        type: "func",
        params,
        output,
        ref: true,
      };
    }

    return this.assertValueType(tkn);
  }

  assertMemoryType(token) {
    if (!MEMORY_TYPES.includes(token.identifier))
      this.errorToken(
        token,
        "Expected u8, s8, u16, s16, u32, s32, u64, s64, f32, f64, or bool",
      );
    return toLongType(token.identifier);
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
      const type = this.getValueType();
      const end = this.expect(TOKENS.RIGHT_PAREN);
      return {
        node: AST.GLOBAL,
        name: name.identifier,
        exported,
        writable,
        imported: {
          level1,
          level2,
        },
        type,
        ...toStartEnd(name, end),
      };
    } else {
      if (type.identifier === "ref") {
        const a = this.expect(TOKENS.LEFT_ARROW);
        const type = this.getValueType();
        const b = this.expect(TOKENS.RIGHT_ARROW);
        if (type.type !== "func")
          this.errorToken(
            toStartEnd(a, b),
            "Expected a reference, not a number",
          );
        this.expect(TOKENS.LEFT_PAREN);
        const val = this.expect(
          TOKENS.IDENTIFIER,
          "Expected an initializer value",
        );
        const end = this.expect(TOKENS.RIGHT_PAREN);
        return {
          node: AST.GLOBAL,
          name: name.identifier,
          exported,
          imported: false,
          writable,
          type,
          val,
          ...toStartEnd(name, end),
        };
      }

      const t = this.assertValueType(type);
      this.expect(TOKENS.LEFT_PAREN);
      const val = this.expect(
        TOKENS.NUMBER,
        "Expected a value for a global initializer",
      );
      if (type.type === "int") this.assertInteger(val, type.signed === 0);
      const end = this.expect(TOKENS.RIGHT_PAREN);
      return {
        node: AST.GLOBAL,
        name: name.identifier,
        exported,
        writable,
        imported: false,
        type: t,
        integer: val.integer,
        fractional: val.fractional,
        ...toStartEnd(name, end),
      };
    }
  }

  topLevelRef(name, exported) {
    this.expect(TOKENS.EQUAL);
    const choose = this.expectOneOf(
      "Expected either 'memory', 'import', or 'data' for a top level reference",
      "memory",
      "import",
      "data",
    );
    if (choose === "memory") {
      let index = null;
      if (this.match(TOKENS.LEFT_ARROW)) {
        const tmp = this.expect(TOKENS.IDENTIFIER, "Expected a memory index");
        index = this.assertMemoryType(tmp);
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
        imported: false,
        type: {
          type: "memory",
        },
        index,
        min: looseInteger(min),
        max: looseInteger(max),
        ...toStartEnd(name, end),
      };
    } else if (choose === "data") {
      this.expect(TOKENS.LEFT_ARROW);
      const type = this.expectOneOf(
        "Expected either an active or passive data segment",
        "active",
        "passive",
      );
      this.expect(TOKENS.RIGHT_ARROW);
      this.expect(TOKENS.LEFT_PAREN);
      if (type === "active") {
        const mem = this.expect(TOKENS.IDENTIFIER, "Expected a memory name");
        this.expect(TOKENS.COMMA);
        const offset = this.expect(
          TOKENS.NUMBER,
          "Expected an offset into a memory",
        );
        this.assertInteger(offset, true);
        const right = this.expect(TOKENS.RIGHT_PAREN);
        if (exported) this.errorToken(name, "Can't export a data segment");
        return {
          node: AST.REF,
          name: name.identifier,
          exported: false,
          imported: false,
          type: {
            type: "data-segment",
            active: true,
          },
          mem,
          offset: looseInteger(offset),
          ...toStartEnd(name, right),
        };
      }

      const right = this.expect(TOKENS.RIGHT_PAREN);
      return {
        node: AST.REF,
        name: name.identifier,
        exported: false,
        imported: false,
        type: {
          type: "data-segment",
          active: false,
        },
        ...toStartEnd(name, right),
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
        output.push(this.getValueType());
        while (!this.match(TOKENS.RIGHT_ARROW)) {
          this.expect(TOKENS.COMMA);
          output.push(this.getValueType());
        }
      }

      this.expect(TOKENS.LEFT_PAREN);

      const params = [];
      if (!this.match(TOKENS.RIGHT_PAREN)) {
        params.push(this.getValueType());
        while (!this.match(TOKENS.RIGHT_PAREN)) {
          this.expect(TOKENS.COMMA);
          params.push(this.getValueType());
        }
      }

      const end = this.expect(TOKENS.RIGHT_PAREN);

      return {
        node: AST.REF,
        name: name.identifier,
        exported,
        imported: {
          level1,
          level2,
        },
        type: {
          type: "func",
          output,
          params,
          ref: false,
        },
        ...toStartEnd(name, end),
      };
    }

    let index = null;
    if (this.match(TOKENS.LEFT_ARROW)) {
      const tmp = this.expect(TOKENS.IDENTIFIER, "Expected a memory index");
      index = this.assertMemoryType(tmp);
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
      imported: {
        level1,
        level2,
      },
      type: {
        type: "memory",
      },
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
    const type = this.getValueType();
    const end = this.was();
    return {
      name: name.identifier,
      type,
      ...toStartEnd(name, end),
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

  topLevelFunc(exported) {
    const name = this.expect(TOKENS.IDENTIFIER, "Expected a function name");

    const params = this.getNames();
    const paramTypes = params.map((i) => i.type);

    const locals = this.getNames();
    const output = [];
    if (this.match(TOKENS.ARROW)) {
      output.push(this.getValueType());
      while (!this.match(TOKENS.LEFT_BRACE)) {
        this.expect(TOKENS.COMMA);
        output.push(this.getValueType());
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
      imported: false,
      type: {
        type: "func",
        params: paramTypes,
        output,
        ref: false,
      },
      params,
      locals,
      body,
      ...toStartEnd(name, end),
    };
  }

  assertAssignment(node) {
    if (node.node !== AST.IDENTIFIER && node.node !== AST.MEMORY_INDEX)
      this.errorToken(node, "invalid assignment target");
  }

  compactAssignmentRaw(name, type, node, expr) {
    this.assertAssignment(name);
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

  compactAssignment(name, type, node) {
    return this.compactAssignmentRaw(name, type, node, this.expression());
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
          return this.compactAssignment(left, "add", AST.BINARY);
        }
        if (this.match(TOKENS.DASH_EQUAL)) {
          return this.compactAssignment(left, "sub", AST.BINARY);
        }
        ``;
        if (this.match(TOKENS.ASTERISK_EQUAL)) {
          return this.compactAssignment(left, "mul", AST.BINARY);
        }
        if (this.match(TOKENS.SLASH_EQUAL)) {
          return this.compactAssignment(left, "div", AST.BINARY_SIGNED);
        }
        if (this.match(TOKENS.PERCENT_EQUAL)) {
          return this.compactAssignment(left, "rem", AST.BINARY_INTEGER_SIGNED);
        }
        if (this.match(TOKENS.LEFT_ARROW_ARROW_EQUAL)) {
          return this.compactAssignment(left, "shl", AST.BINARY_INTEGER);
        }
        if (this.match(TOKENS.RIGHT_ARROW_ARROW_EQUAL)) {
          return this.compactAssignment(left, "shr", AST.BINARY_INTEGER_SIGNED);
        }
        if (this.match(TOKENS.AMPERSAND_EQUAL)) {
          return this.compactAssignment(left, "and", AST.BINARY_INTEGER);
        }
        if (this.match(TOKENS.CARET_EQUAL)) {
          return this.compactAssignment(left, "xor", AST.BINARY_INTEGER);
        }
        if (this.match(TOKENS.PIPE_EQUAL)) {
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
            level1: {
              node: AST.IDENTIFIER,
              literal: "select",
              ...toStartEnd(cond, right),
            },
            level2: null,
            params: [left, right, cond],
            ...toStartEnd(cond, right),
          };
        }
        return cond;
      }
      case 2: {
        let body = this.expr(3);
        while (true) {
          const find = this.match(TOKENS.AMPERSAND) ?? this.match(TOKENS.PIPE);
          if (!find) break;
          const expr = this.expr(3);
          body = {
            node: AST.BINARY_INTEGER,
            type: find.token === TOKENS.AMPERSAND ? "and" : "or",
            left: body,
            right: expr,
            ...toStartEnd(body, expr),
          };
        }
        return body;
      }
      case 3: {
        const left = this.expr(4);
        if (this.match(TOKENS.EQUAL_EQUAL)) {
          const right = this.expr(4);
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
          const right = this.expr(4);
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
          const right = this.expr(4);
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
          const right = this.expr(4);
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
          const right = this.expr(4);
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
          const right = this.expr(4);
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
      case 4: {
        let body = this.expr(5);
        while (true) {
          const find = this.match(TOKENS.PLUS) ?? this.match(TOKENS.DASH);
          if (!find) break;
          const expr = this.expr(5);
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
      case 5: {
        let body = this.expr(6);
        while (true) {
          const find =
            this.match(TOKENS.ASTERISK) ??
            this.match(TOKENS.SLASH) ??
            this.match(TOKENS.PERCENT);
          if (!find) break;
          const expr = this.expr(6);
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
      case 6: {
        let body = this.expr(7);
        while (true) {
          const find =
            this.match(TOKENS.CARET) ??
            this.match(TOKENS.LEFT_ARROW_ARROW) ??
            this.match(TOKENS.RIGHT_ARROW_ARROW);
          if (!find) break;
          const expr = this.expr(7);
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
              type: find.token === TOKENS.CARET ? "xor" : "shl",
              left: body,
              right: expr,
              ...toStartEnd(body, expr),
            };
          }
        }
        return body;
      }
      case 7: {
        const tk1 = this.match(TOKENS.BANG);
        if (tk1) {
          const expr = this.expr(7);
          return {
            node: AST.NOT,
            body: expr,
            ...toStartEnd(tk1, expr),
          };
        }
        const tk2 = this.match(TOKENS.DASH);
        if (tk2) {
          const expr = this.expr(7);
          return {
            node: AST.NEGATION,
            body: expr,
            ...toStartEnd(tk2, expr),
          };
        }
        const tk3 = this.match(TOKENS.TILDE);
        if (tk3) {
          const expr = this.expr(7);
          return {
            node: AST.FULL_NOT,
            body: expr,
            ...toStartEnd(tk3, expr),
          };
        }
        return this.expr(8);
      }
      case 8: {
        const ident = this.expr(9);
        const tk1 = this.match(TOKENS.PLUS_PLUS);
        if (tk1) {
          return this.compactAssignmentRaw(ident, "add", AST.BINARY, {
            node: AST.NUMBER,
            integer: "1",
            fractional: "",
            negative: false,
            ...toStartEnd(ident, tk1),
          });
        }
        const tk2 = this.match(TOKENS.DASH_DASH);
        if (tk2) {
          return this.compactAssignmentRaw(ident, "sub", AST.BINARY, {
            node: AST.NUMBER,
            integer: "1",
            fractional: "",
            negative: false,
            ...toStartEnd(ident, tk2),
          });
        }
        return ident;
      }
      case 9: {
        const left = this.expr(10);
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
      case 10: {
        let level1 = this.expr(11);
        while (this.is(TOKENS.DOT) || this.is(TOKENS.LEFT_PAREN)) {
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
            if (level2 && opcode === undefined)
              this.errorToken(toStartEnd(level1, parenToken), "Invalid opcode");

            level1 = {
              node: AST.EXPRESSION,
              level1,
              level2,
              params,
              ...toStartEnd(level1, parenToken),
            };
          } else {
            if (level1.node !== AST.IDENTIFIER)
              this.errorToken(level1, "Invalid constant");
            if (level2 === null) this.errorToken(level1, "Invalid constant");
            const constant = CONSTANTS[level1.literal]?.[level2];
            if (constant === undefined)
              this.errorToken(toStartEnd(level1, level2t), "Invalid constant");
            const cs = constant.toString();
            const negative = cs.startsWith("-");
            level1 = {
              node: AST.NUMBER,
              integer: negative ? cs.slice(1) : cs,
              fractional: "",
              negative,
              ...toStartEnd(level1, level2t),
            };
          }
        }
        return level1;
      }
      case 11: {
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
            negative: number.negative,
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
              negative: false,
              ...toStartEnd(identifier, identifier),
            };
          if (id === "false")
            return {
              node: AST.NUMBER,
              integer: "0",
              fractional: "",
              negative: false,
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
      const exported = this.matchLiteral("export") !== null;
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
  // BigInt's don't automatically sign integers like regular Numbers do,
  // so this conversion is required to encode integers that exceed the 64-bit
  // signed integer limit correctly
  num = BigInt.asIntN(64, num);
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

function encodevecnoflat(vec) {
  return [...leb128u32(vec.length), ...vec];
}

function encodesection(section, id) {
  return encodesection2(encodevec(section), id);
}

function encodesection2(section, id) {
  return [id, ...leb128u32(section.length), ...section];
}

const TRUNC_SAT_ORDER = Object.freeze([
  "trunc_sat_f32_s",
  "trunc_sat_f32_u",
  "trunc_sat_f64_s",
  "trunc_sat_f64_u",
]);

function toRawType(type) {
  if (type.type === "int") return "i" + type.size;
  if (type.type === "float") return "f" + type.size;
  throw new Error("bad code");
}

function isSameType(a, b) {
  if (a.type !== b.type) return false;
  if (a.type === "func") {
    return (
      a.params.length === b.params.length &&
      a.output.length === b.output.length &&
      a.params.every((i, j) => isSameType(i, b.params[j])) &&
      a.output.every((i, j) => isSameType(i, b.output[j]))
    );
  }
  // Signed vs unsigned doesn't matter for compiled output
  if (a.type === "int" || a.type === "float") return a.size === b.size;
  throw new Error("missing type?");
}

function toBigType(type) {
  if (type.type === "int")
    return {
      ...type,
      size: Math.max(type.size, 32),
    };
  if (type.type === "float") return type;
  throw new Error("bad type");
}

function moreSpecific(a, b) {
  if (a.type === "number") return b;
  return a;
}

function matchesType(expected, val) {
  if (expected.type === "number" && val.type !== "number")
    return matchesType(val, expected);

  if (val.type === "number") {
    if (expected.type === "number") return true;
    if (expected.type !== "int" && expected.type !== "float") return false;
    const kind =
      (expected.type === "float" ? "f" : expected.signed === 0 ? "u" : "s") +
      expected.size;
    const minSize = CONSTANTS[kind].min;
    const maxSize = CONSTANTS[kind].max;
    const valReal = formatToReal(val, toRawType(expected));
    // Not Math.abs here because that doesn't work on BigInts
    const val2 = valReal < 0 ? -valReal : valReal;
    return (
      (expected.type === "float" || !val.isDecimal) &&
      (expected.type === "float" || expected.signed !== 0 || !val.isNegative) &&
      // Bounds are inclusive
      ((val2 >= minSize && val2 <= maxSize) || val2 === 0)
    );
  }

  if (expected.type !== val.type) return false;
  if (expected.type === "int")
    return (
      val.size === expected.size &&
      (expected.signed === val.signed ||
        expected.signed === 2 ||
        val.signed === 2)
    );
  if (expected.type === "float") return val.size === expected.size;
  if (expected.type === "func")
    return (
      expected.params.length === val.params.length &&
      expected.output.length === val.output.length &&
      expected.params.every((i, j) => matchesType(i, val.params[j])) &&
      expected.output.every((i, j) => matchesType(i, val.output[j]))
    );
  throw new Error("missing type check?");
}

function typeToString(type) {
  if (type.type === "int")
    return `${type.signed === 2 ? "i" : type.signed === 1 ? "s" : "u"}${type.size}`;
  if (type.type === "float") return "f" + type.size;
  if (type.type === "number" || type.type === "memory" || type.type === "void")
    return type.type;
  if (type.type === "func")
    return `func${type.output.length > 0 ? `<${type.output.map((i) => typeToString(i)).join(", ")}>` : ""}(${type.params.map((i) => typeToString(i)).join(", ")})`;
  throw new Error("missing type ? " + type.type);
}

function skipSame(a, b, check) {
  const ac = check(a);
  const bc = check(b);
  if (ac && !bc) return -1;
  if (bc && !ac) return 1;
  return 0;
}

class VerifyCompiler {
  constructor(ast, text, dataMap) {
    this.text = text;
    this.ast = ast;
    this.globals = new Map();
    this.locals = new Map();
    this.labelTypes = [];
    this.dataMap = dataMap;
    Object.setPrototypeOf(this.dataMap, null);

    this.typeIdx = 0;
    this.boolRegisterIndex = 0;
    this.boolFunctionIndex = 0;
    this.labels = [];
    this.types = [];
    this.imports = [];
    this.functions = [];
    this.memories = [];
    this.globalArr = [];
    this.exports = [];
    this.code = [];
    this.elements = [];
    this.data = [];
  }
  errorToken(tkn, message) {
    error(this.text, tkn.start, tkn.end, message);
  }
  get(node, name) {
    if (this.locals.has(name)) return this.locals.get(name);
    if (this.globals.has(name)) return this.globals.get(name);
    this.errorToken(node, "Variable does not exist");
  }

  defineType(type) {
    if (type.type !== "func") return [NUM_OPCODE[toRawType(type)]];
    this.types.push([
      0x60,
      ...encodevec(type.params.map((i) => this.defineType(i))),
      ...encodevec(type.output.map((i) => this.defineType(i))),
    ]);
    this.typeIdx++;
    return [0x64, ...leb128s32(this.typeIdx - 1)];
  }

  locateGlobals() {
    let globalIdx = 0;
    let memoryIdx = 0;
    let functionIdx = 0;
    let dataIdx = 0;

    const astSorted = this.ast.toSorted((a, b) => {
      const importStatus = skipSame(a, b, (r) => r.imported !== false);
      if (importStatus !== 0) return importStatus;
      const globalStatus = -skipSame(a, b, (r) => r.node === AST.GLOBAL);
      if (globalStatus !== 0) return globalStatus;
      return -skipSame(a, b, (r) => r.type.type === "data-segment");
    });

    for (const node of astSorted) {
      const name = node.name;
      if (this.globals.has(name))
        this.errorToken(node, "Variable was already declared");
      switch (node.node) {
        case AST.GLOBAL: {
          if (node.exported) {
            this.exports.push([...utf8(node.name), 0x03, globalIdx]);
          }

          const obj = {
            ref: globalIdx,
            type: node.type,
            writable: node.writable,
            relative: "global",
            ...toStartEnd(node, node),
          };

          if (node.imported) {
            this.imports.push([
              ...utf8(node.imported.level1),
              ...utf8(node.imported.level2),
              0x03,
              NUM_OPCODE[toRawType(node.type)],
              node.writable ? 1 : 0,
            ]);
          } else {
            if (node.type.type === "func") {
              const code = this.defineType(node.type);
              obj.typeRef = obj.type.typeRef = this.typeIdx - 1;
              // This is fine because globals are hoisted last
              const funcref = this.get(node.val, node.val.identifier);
              this.shouldMatchTypes(
                [node.type],
                [
                  {
                    ...funcref.type,
                    ...toStartEnd(node, node),
                  },
                ],
              );
              this.globalArr.push([
                ...code,
                node.writable ? 1 : 0,
                0xd2,
                funcref.ref,
                0x0b,
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
          }

          this.globals.set(name, obj);
          globalIdx++;
          break;
        }
        case AST.REF: {
          const obj = {
            type: node.type,
            writable: false,
            ...toStartEnd(node, node),
          };
          if (node.type.type === "memory") {
            if (node.max !== null && node.max < node.min)
              this.errorToken(
                node,
                "Memory maximum size must be at least memory minimum size",
              );
            obj.min = node.min;
            obj.max = node.max;
            obj.ref = memoryIdx;
            obj.index = node.index;
          } else if (node.type.type === "func") {
            obj.ref = functionIdx;
          } else {
            obj.ref = dataIdx;
          }
          this.globals.set(name, obj);

          if (node.type.type === "memory") {
            if (node.imported) {
              const out = [
                ...utf8(node.imported.level1),
                ...utf8(node.imported.level2),
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
            } else {
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
            }
            memoryIdx++;
          } else if (node.type.type === "func") {
            this.defineType(node.type);
            this.imports.push([
              ...utf8(node.imported.level1),
              ...utf8(node.imported.level2),
              0x00,
              ...leb128u32(this.typeIdx - 1),
            ]);

            if (node.exported) {
              this.exports.push([
                ...utf8(node.name),
                0x00,
                ...leb128u32(functionIdx),
              ]);
            }
            functionIdx++;
          } else {
            const bytevecdata = this.dataMap[name];
            if (!bytevecdata)
              this.errorToken(
                node,
                "No data was present for this data segment",
              );
            const bytevec = encodevecnoflat(bytevecdata);
            if (node.type.active) {
              this.data.push([
                ...leb128u32(2),
                ...leb128u32(this.get(node.mem, node.mem.identifier).ref),
                NUM_CONST.i32,
                ...leb128s32(node.offset),
                0x0b,
                ...bytevec,
              ]);
            } else {
              this.data.push([...leb128u32(1), ...bytevec]);
            }
            dataIdx++;
          }
          break;
        }
        case AST.FUNCTION:
          this.globals.set(name, {
            type: node.type,
            params: node.params,
            ref: functionIdx,
            writable: false,
            ...toStartEnd(node, node),
          });

          if (node.exported) {
            this.exports.push([
              ...utf8(node.name),
              0x00,
              ...leb128u32(functionIdx),
            ]);
          }

          this.defineType(node.type);
          this.functions.push(leb128u32(this.typeIdx - 1));
          functionIdx++;
          break;
        default:
          throw new Error("bad code");
      }
    }

    this.defineType({
      type: "func",
      params: [
        // index value
        {
          type: "int",
          signed: 0,
          size: 32,
        },
        // bitmask
        {
          type: "int",
          signed: 0,
          size: 32,
        },
      ],
      output: [
        // output value
        {
          type: "int",
          signed: 0,
          size: 32,
        },
      ],
    });
    this.boolFunctionIndex = this.typeIdx - 1;
  }

  shouldMatchTypes(expected, val) {
    if (expected.length !== val.length)
      this.errorToken(
        toStartEnd(val[0], val[val.length - 1]),
        `Got ${val.length} values but expected ${expected.length} values`,
      );
    for (let i = 0; i < expected.length; i++) {
      const was = val[i];
      const should = expected[i];
      if (!matchesType(should, was)) {
        if (should.type === "number" || was.type === "number") {
          if (
            should.type === "int" ||
            should.type === "float" ||
            was.type === "int" ||
            was.type === "float"
          ) {
            const num = should.type === "number" ? should : was;
            const other = should.type !== "number" ? should : was;
            this.errorToken(
              toStartEnd(num, num),
              `Number does not fit in a ${typeToString(other)}`,
            );
          }
        }
        this.errorToken(
          toStartEnd(was, was),
          `Got types ${typeToString(was)} but expected ${typeToString(should)}`,
        );
      }
    }
  }

  resolveVariable(node) {
    const out = [];
    for (const n of node) {
      if (n.type === "variable")
        out.push({
          ...this.get(n, n.name).type,
          ...toStartEnd(n, n),
        });
      else out.push(n);
    }
    return out;
  }

  flatValues(output) {
    const next = [];
    for (const member of output) {
      for (const o of this.resolveVariable(this.getType(member))) {
        if (o.type !== "void")
          next.push({
            ...o,
            ...toStartEnd(member, member),
          });
      }
    }
    return next;
  }

  flatValuesResolvable(output) {
    const next = [];
    for (const member of output) {
      for (const o of this.getType(member)) {
        if (o.type !== "void")
          next.push({
            ...o,
            ...toStartEnd(o, o),
          });
      }
    }
    return next;
  }

  typeIsIntegerLike(types) {
    if (types.length !== 1)
      this.errorToken(
        toStartEnd(types[0], types.at(-1)),
        "Expected 1 value, but got 0 values",
      );
    const type = types[0];
    if ((type.type !== "number" || type.isDecimal) && type.type !== "int")
      this.errorToken(
        type,
        `Expected a number or int but got ${typeToString(type)}`,
      );
  }

  typeIsFloatLike(types) {
    if (types.length !== 1)
      this.errorToken(
        toStartEnd(types[0], types.at(-1)),
        "Expected 1 value, but got 0 values",
      );
    const type = types[0];
    if (type.type !== "number" && type.type !== "float")
      this.errorToken(
        type,
        `Expected an number or float but got ${typeToString(type)}`,
      );
  }

  typeIsNumberLike(types) {
    if (types.length !== 1)
      this.errorToken(
        toStartEnd(types[0], types.at(-1)),
        "Expected 1 value, but got 0 values",
      );
    const type = types[0];
    if (type.type !== "number" && type.type !== "int" && type.type !== "float")
      this.errorToken(
        type,
        `Expected a number, float, or int but got ${typeToString(type)}`,
      );
  }

  validInstructionCall(node) {
    const opt = getOpcode(node.level1, node.level2);
    if (opt === undefined) {
      const attrs = this.resolveVariable(this.getType(node.level1));
      const attr = attrs[0];
      const params = this.flatValues(node.params);
      if (attrs.length !== 1)
        this.errorToken(node, "Only one value can be called");
      if (attr.type !== "func") this.errorToken(node, "Not a function");
      if (attr.params.length !== params.length)
        this.errorToken(
          node,
          `Expected ${attr.params.length} parameters, but got ${params.length}`,
        );

      this.shouldMatchTypes(attr.params, params);
      return attr.output;
    }

    const params = this.flatValuesResolvable(node.params);
    if (opt.params.length !== params.length)
      this.errorToken(
        node,
        `Expected ${opt.params.length} parameters, but got ${params.length}`,
      );
    for (let i = 0; i < opt.params.length; i++) {
      const expected = opt.params[i];
      const given = params[i];

      if (expected === null) continue;

      switch (expected) {
        case "variable": {
          if (given.type !== "variable")
            this.errorToken(given, "Expected a variable reference");
          const val = this.get(given, given.name).type;
          if (val.type === "memory" || (val.type === "func" && !val.type.ref))
            this.errorToken(given, "Expected a global reference");
          break;
        }
        case "memory": {
          if (given.type !== "variable")
            this.errorToken(given, "Expected a variable reference");
          const val = this.get(given, given.name).type;
          if (val.type !== "memory")
            this.errorToken(given, "Expected a memory reference");
          break;
        }
        case "data-segment": {
          if (given.type !== "variable")
            this.errorToken(given, "Expected a variable reference");
          const val = this.get(given, given.name).type;
          if (val.type !== "data-segment")
            this.errorToken(given, "Expected a data segment reference");
          if (val.active)
            this.errorToken(given, "Expected a passive data segment");
          break;
        }
        default: {
          const val = this.resolveVariable([given]);
          this.shouldMatchTypes(
            [
              {
                ...toLongType(expected),
                signed: 2,
              },
            ],
            val,
          );
          break;
        }
      }
    }

    return opt.output.map((i) =>
      i !== null
        ? {
            ...toLongType(i),
            signed: 2,
          }
        : null,
    );
  }

  getType(node) {
    switch (node.node) {
      case AST.NUMBER:
        return [
          {
            type: "number",
            isDecimal: node.fractional.length > 0,
            isNegative: node.negative,
            integer: node.integer,
            fractional: node.fractional,
            ...toStartEnd(node, node),
          },
        ];
      case AST.IDENTIFIER:
        return [
          {
            type: "variable",
            name: node.literal,
            ...toStartEnd(node, node),
          },
        ];
      case AST.ASSIGN: {
        const left = this.get(node, node.name);
        if (
          left.type.type === "memory" ||
          (left.type.type === "func" && !left.type.ref)
        )
          this.errorToken(
            node,
            "Cannot assign to a memory index or a function",
          );
        if (!left.writable)
          this.errorToken(node, "Cannot set read-only variable");
        this.shouldMatchTypes(
          [left.type],
          this.resolveVariable(this.getType(node.body)),
        );
        if (left.relative !== "local")
          return [
            {
              type: "void",
              ...toStartEnd(node, node),
            },
          ];
        return [
          {
            ...left.type,
            ...toStartEnd(node, node),
          },
        ];
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
          if (left.type.type === "memory" || left.type.type === "func")
            this.errorToken(
              val,
              "Cannot assign to a memory index or a function",
            );
          if (!left.writable)
            this.errorToken(val, "Cannot set read-only variable");
          this.shouldMatchTypes([left.type], [values[idx]]);
          if (left.relative === "local")
            out.push({
              ...left.type,
              ...toStartEnd(node, node),
            });
        }
        return out.length === 0
          ? [
              {
                type: "void",
                ...toStartEnd(node, node),
              },
            ]
          : out;
      }
      case AST.MEMORY_INDEX: {
        const mem = this.get(node, node.memory);
        if (mem.type.type !== "memory")
          this.errorToken(node, "Can only index memories");
        if (mem.index === null)
          this.errorToken(node, "Memory is not indexable");
        this.shouldMatchTypes(
          [{ type: "int", signed: 0, size: 32 }],
          this.resolveVariable(this.getType(node.index)),
        );
        return [
          {
            ...toBigType(mem.index),
            ...toStartEnd(node, node),
          },
        ];
      }
      case AST.ASSIGN_MEMORY_INDEX: {
        const mem = this.get(node, node.memory);
        if (mem.type.type !== "memory")
          this.errorToken(node, "Can only index memories");
        if (mem.index === null)
          this.errorToken(node, "Memory is not indexable");
        this.shouldMatchTypes(
          [{ type: "int", signed: 0, size: 32 }],
          this.resolveVariable(this.getType(node.index)),
        );
        this.shouldMatchTypes(
          [toBigType(mem.index)],
          this.resolveVariable(this.getType(node.body)),
        );
        return [
          {
            type: "void",
            ...toStartEnd(node, node),
          },
        ];
      }
      case AST.BINARY_INTEGER_SIGNED:
      case AST.BINARY_INTEGER: {
        const a = this.resolveVariable(this.getType(node.left));
        const b = this.resolveVariable(this.getType(node.right));
        this.typeIsIntegerLike(a);
        this.typeIsIntegerLike(b);
        if (node.type === "shl" || node.type === "shr") {
          this.shouldMatchTypes(
            [
              {
                ...a[0],
                signed: 0,
              },
            ],
            b,
          );
        } else this.shouldMatchTypes(a, b);
        // This is fine because typeIsIntegerLike already checks that there is one value
        const specific = moreSpecific(a[0], b[0]);
        if (specific.type === "number") {
          return [
            {
              type: "number",
              integer: "3",
              fractional: "",
              isDecimal: false,
              ...toStartEnd(node, node),
            },
          ];
        }
        return [
          {
            ...specific,
            ...toStartEnd(node, node),
          },
        ];
      }
      case AST.BINARY_SIGNED:
      case AST.BINARY: {
        const a = this.resolveVariable(this.getType(node.left));
        const b = this.resolveVariable(this.getType(node.right));
        this.typeIsNumberLike(a);
        this.typeIsNumberLike(b);
        this.shouldMatchTypes(a, b);
        if (node.comparison) {
          let aa = a[0];
          let bb = b[0];
          if (
            ((aa.type === "number" &&
              aa.integer === "0" &&
              !aa.isDecimal &&
              bb.type === "int" &&
              bb.signed === 0) ||
              (bb.type === "number" &&
                bb.integer === "0" &&
                !bb.isDecimal &&
                aa.type === "int" &&
                aa.signed === 0)) &&
            node.type !== "ne" &&
            node.type !== "eq"
          ) {
            let type = node.type;
            if (aa.type === "number") {
              if (node.type === "lt") type = "gt";
              else if (node.type === "le") type = "ge";
              else if (node.type === "gt") type = "lt";
              else if (node.type === "ge") type = "le";
            }
            // x < 0
            if (type === "lt")
              this.errorToken(
                toStartEnd(node, node),
                "Comparison is always false",
              );
            // x <= 0
            else if (type === "le")
              this.errorToken(
                toStartEnd(node, node),
                "Comparison can be replaced with ==",
              );
            // x > 0
            else if (type === "gt")
              this.errorToken(
                toStartEnd(node, node),
                "Comparison can be replaced with !=",
              );
            // x >= 0
            else if (type === "ge")
              this.errorToken(
                toStartEnd(node, node),
                "Comparison is always true",
              );
          }
          return [
            { type: "int", signed: 2, size: 32, ...toStartEnd(node, node) },
          ];
        }
        const specific = moreSpecific(a[0], b[0]);
        if (specific.type === "number") {
          return [
            {
              type: "number",
              integer: "3",
              fractional: "",
              isDecimal: a[0].isDecimal || b[0].isDecimal,
              ...toStartEnd(node, node),
            },
          ];
        }
        return [
          {
            ...specific,
            ...toStartEnd(node, node),
          },
        ];
      }
      case AST.NOT: {
        const type = this.resolveVariable(this.getType(node.body));
        this.typeIsIntegerLike(type);
        return [
          {
            type: "int",
            signed: 2,
            size: 32, // NOT uses eqz which always returns i32
            ...toStartEnd(node, node),
          },
        ];
      }
      case AST.FULL_NOT: {
        const type = this.resolveVariable(this.getType(node.body));
        this.typeIsIntegerLike(type);
        return [
          {
            type: "int",
            signed: 2,
            size: type[0].size,
            ...toStartEnd(node, node),
          },
        ];
      }
      case AST.NEGATION: {
        const type = this.resolveVariable(this.getType(node.body));
        this.typeIsNumberLike(type);
        if (type[0].type === "number") {
          return [
            {
              type: "number",
              integer: type[0].integer,
              fractional: type[0].fractional,
              isDecimal: type[0].isDecimal,
              ...toStartEnd(node, node),
            },
          ];
        }
        return [
          {
            ...type[0],
            ...toStartEnd(node, node),
          },
        ];
      }
      case AST.EXPRESSION: {
        const ret = this.validInstructionCall(node);

        if (
          node.level1.literal === "global" ||
          node.level1.literal === "local"
        ) {
          const param = this.get(node.params[0], node.params[0].literal);
          if (param.relative === "local" && node.level1.literal === "global") {
            this.errorToken(
              node,
              "global operations can only be done on globals",
            );
          }
          if (param.relative === "global" && node.level1.literal === "local")
            this.errorToken(
              node,
              "local operations can only be done on locals",
            );
        }
        if (node.level2 === "get")
          return [
            {
              ...this.get(node.params[0], node.params[0].literal).type,
              ...toStartEnd(node, node),
            },
          ];
        if (node.level2 === "set" || node.level2 === "tee") {
          const rvar = this.get(node.params[0], node.params[0].literal);
          if (!rvar.writable)
            this.errorToken(node.params[0], "Cannot set read-only variable");
          const retType = this.resolveVariable(this.getType(node.params[1]));
          this.shouldMatchTypes([rvar.type], retType);

          if (node.level2 === "tee")
            return [
              {
                ...rvar.type,
                ...toStartEnd(node, node),
              },
            ];
        }
        if (node.level1.literal === "select") {
          // This is valid because validInstructionCall already checks that there is two parameters
          const [a, b] = this.flatValues(node.params);

          if (a.type === "memory")
            this.errorToken(node.params[0], "Not a variable");
          if (b.type === "memory")
            this.errorToken(node.params[1], "Not a variable");
          this.shouldMatchTypes([a], [b]);

          const specific = moreSpecific(a, b);
          if (specific.type === "number")
            return [
              {
                type: "number",
                integer: "3",
                fractional: "",
                isDecimal: a.isDecimal || b.isDecimal,
                ...toStartEnd(node, node),
              },
            ];
          return [
            {
              ...specific,
              ...toStartEnd(node, node),
            },
          ];
        }
        if (node.level1.literal === "generic") {
          const opcode = OPCODES.generic[node.level2];
          const hasDouble = opcode.params.length === 2;
          const [a, b] = this.flatValues(node.params);

          let left;
          if (hasDouble) {
            left = moreSpecific(a, b);
            if (node.level2 !== "rotl" && node.level2 !== "rotr")
              this.shouldMatchTypes([a], [b]);
          } else {
            left = a;
          }
          if (opcode.type) {
            // int
            this.typeIsIntegerLike([a]);
            if (hasDouble) {
              if (node.level2 === "rotl" || node.level2 === "rotr")
                this.shouldMatchTypes(
                  [
                    {
                      ...a,
                      signed: 0,
                    },
                  ],
                  [b],
                );
              this.typeIsIntegerLike(b);
            }
            if (left.type === "number")
              return [
                {
                  type: "number",
                  integer: "3",
                  fractional: "",
                  isDecimal: false,
                  ...toStartEnd(node, node),
                },
              ];
            if (
              node.level2 === "clz" ||
              node.level2 === "ctz" ||
              node.level2 === "popcnt"
            )
              return [
                {
                  ...a,
                  ...toStartEnd(node, node),
                },
              ];
            return [
              {
                ...left,
                ...toStartEnd(node, node),
              },
            ];
          }

          // float
          this.typeIsNumberLike([a]);
          if (hasDouble) {
            this.typeIsNumberLike([b]);
          }
          if (left.type === "number")
            return [
              {
                type: "number",
                integer: "3",
                fractional: "",
                isDecimal: true,
                ...toStartEnd(node, node),
              },
            ];
          return [
            {
              ...left,
              ...toStartEnd(node, node),
            },
          ];
        }

        if (node.level1.literal === "uint" || node.level1.literal === "sint") {
          const tot = node.level1.literal[0];
          const to = tot === "u" ? 0 : 1;
          const want = to === 0 ? 1 : 0;

          const type = this.resolveVariable(this.getType(node.params[0]))[0];
          this.shouldMatchTypes(
            [
              {
                type: "int",
                size: type.size ?? 64,
                signed: want,
              },
            ],
            [type],
          );
          if (type.type === "number")
            return [
              {
                ...type,
                isNegative: to === 1,
              },
            ];
          return [
            {
              type: "int",
              size: type.size,
              signed: to,
              ...toStartEnd(node, node),
            },
          ];
        }

        return ret.length === 0
          ? [
              {
                type: "void",
                ...toStartEnd(node, node),
              },
            ]
          : ret.map((i) => ({
              ...i,
              ...toStartEnd(node, node),
            }));
      }
      default:
        throw new Error("bad code");
    }
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
        this.shouldMatchTypes(func.output, retval);
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
          this.shouldMatchTypes([{ type: "int", signed: 2, size: 32 }], expr);
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
        this.shouldMatchTypes(
          [{ type: "int", signed: 2, size: 32 }],
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

  // Returns a tuple: [hasReturn, causedByBreakContinue]
  hasReturn(body) {
    for (const line of body) {
      if (line.node === AST.RETURN) return [true, false];
      // Unreachable immediately halts execution, so it technically returns
      if (line.node === AST.EXPRESSION && line.level1.literal === "unreachable")
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

  verifyLocalInitialization(body, init) {
    for (const line of body) {
      switch (line.node) {
        case AST.NUMBER:
        case AST.BREAK:
        case AST.CONTINUE:
          break;
        case AST.RETURN:
          this.verifyLocalInitialization(line.values, init);
          break;
        case AST.BLOCK:
          this.verifyLocalInitialization(line.body, init);
          break;
        case AST.IF: {
          // The first condition counts as being in the same block
          init = this.verifyLocalInitialization([line.bodies[0].cond], init);
          this.verifyLocalInitialization(line.bodies[0].body, init);
          if (line.bodies.length > 1) {
            // When compiled, each inner body counts as being in the same block as the previous one
            this.verifyLocalInitialization(
              [
                {
                  node: AST.IF,
                  bodies: line.bodies.slice(1),
                  elseb: line.elseb,
                  // Label and text marker don't matter here
                },
              ],
              init,
            );
          } else if (line.elseb !== null) {
            this.verifyLocalInitialization(line.elseb, init);
          }
          break;
        }
        case AST.WHILE: {
          // Non-do loops have the conditional be in the same block as the current one
          if (!line.isDo)
            init = this.verifyLocalInitialization([line.cond], init);
          // The body is internally put inside a block so it doesn't contribute to line.update and line.cond
          // This is not true if the body is not put inside a block (eg. binaryen optimizes it out) but then
          // the handling gets weirder
          this.verifyLocalInitialization(line.body, init);
          const arr = [];
          if (line.update !== null) arr.push(line.update);
          arr.push(line.cond);
          this.verifyLocalInitialization(arr, init);
          break;
        }
        case AST.IDENTIFIER: {
          const val = this.get(line, line.literal);
          if (val.relative === "local" && !init.has(line.literal))
            this.errorToken(line, "Local must be initialized in order to use");
          break;
        }
        case AST.ASSIGN:
          init = this.verifyLocalInitialization([line.body], init);
          init = new Set(init).add(line.name);
          break;
        case AST.ASSIGN_MANY:
          init = this.verifyLocalInitialization([line.body], init);
          init = new Set(init);
          for (const target of line.targets) init.add(target.literal);
          break;
        case AST.MEMORY_INDEX:
          init = this.verifyLocalInitialization([line.index], init);
          break;
        case AST.ASSIGN_MEMORY_INDEX:
          init = this.verifyLocalInitialization([line.index, line.body], init);
          break;
        case AST.BINARY_INTEGER_SIGNED:
        case AST.BINARY_INTEGER:
        case AST.BINARY_SIGNED:
        case AST.BINARY:
          init = this.verifyLocalInitialization([line.left, line.right], init);
          break;
        case AST.NOT:
        case AST.NEGATION:
          init = this.verifyLocalInitialization([line.body], init);
          break;
        case AST.EXPRESSION: {
          const opt = getOpcode(line.level1, line.level2);
          if (opt === undefined) {
            if (line.level1.node === AST.IDENTIFIER) {
              const val = this.get(line, line.level1.literal);
              if (val.relative === "local" && !init.has(line.level1.literal))
                this.errorToken(
                  line,
                  "Local must be initialized in order to use",
                );
              init = this.verifyLocalInitialization(line.params, init);
            } else {
              init = this.verifyLocalInitialization(line.params, init);
              this.verifyLocalInitialization([line.level1], init);
            }
          } else {
            const params = this.flatValuesResolvable(line.params);
            for (let i = 0; i < opt.params.length; i++) {
              const expected = opt.params[i];
              const given = params[i];

              if (expected === null) continue;

              switch (expected) {
                case "variable": {
                  const val = this.get(given, given.name);
                  if (val.relative === "local") {
                    if (
                      line.level2.literal === "set" ||
                      line.level2.literal === "tee"
                    ) {
                      init = new Set(init).add(given.name);
                    } else if (!init.has(given.name))
                      this.errorToken(
                        given,
                        "Local must be initialized in order to use",
                      );
                  }
                  break;
                }
                case "memory":
                  break;
                default: {
                  init = this.verifyLocalInitialization([given], init);
                  break;
                }
              }
            }
          }
        }
      }
    }

    return init;
  }

  compileFunctionParams(node) {
    const out = [];
    const funcs = this.resolveVariable(this.getType(node.level1));
    if (funcs.length !== 1) this.errorToken(node, "Can only call one function");
    let funcIdx = 0;
    for (let i = 0; i < node.params.length; i++) {
      const arg = node.params[i];
      const type = funcs[0].params[funcIdx];
      const res = this.compileExpression(arg, type);
      funcIdx += res.len;
      out.push(...res.code);
    }
    return out;
  }

  compileExpression(node, hint) {
    switch (node.node) {
      case AST.NUMBER: {
        // A top level number can't actually be used anywhere
        if (hint.type === "void")
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
        if (ref.type.type === "func" && !ref.type.ref) {
          this.elements.push([
            ...leb128u32(3),
            0x00,
            ...encodevec(leb128u32(ref.ref)),
          ]);
          return {
            code: [0xd2, ...leb128u32(ref.ref)],
            len: 1,
          };
        }
        return {
          code: [
            ref.relative === "local"
              ? OPCODES.local.get.opcode
              : OPCODES.global.get.opcode,
            ...leb128u32(ref.ref),
          ],
          len: 1,
        };
      }
      case AST.ASSIGN: {
        const ref = this.get(node, node.name);
        const expr = this.compileExpression(node.body, ref.type).code;
        return {
          code: [
            ...expr,
            ref.relative === "local"
              ? hint.type === "void"
                ? OPCODES.local.set.opcode
                : OPCODES.local.tee.opcode
              : OPCODES.global.set.opcode,
            ...leb128u32(ref.ref),
          ],
          len: ref.relative === "local" && hint.type !== "void" ? 1 : 0,
        };
      }
      case AST.ASSIGN_MANY: {
        const code = [
          ...this.compileExpression(node.body, { type: "void" }).code,
        ];
        let len = 0;
        // Values need to be popped in reverse
        for (const target of node.targets.toReversed()) {
          const ref = this.get(node, target.literal);
          code.push(
            ref.relative === "local"
              ? hint.type === "void"
                ? OPCODES.local.set.opcode
                : OPCODES.local.tee.opcode
              : OPCODES.global.set.opcode,
            ...leb128u32(ref.ref),
          );
          if (ref.relative === "local" && hint.type !== "void") len++;
        }
        return {
          code,
          len,
        };
      }
      case AST.MEMORY_INDEX: {
        const ref = this.get(node, node.memory);
        const type = toRawType(toBigType(ref.index));
        const size = ref.index.size;
        const loadop =
          size === 32 || size === 64
            ? "load"
            : `load${Math.max(size, 8)}_${ref.index.signed === 1 ? "s" : "u"}`;
        const opcodeLoad = OPCODES[type][loadop].opcode;
        const byteSize = Math.log2(size / 8);
        const code = [
          ...this.compileExpression(node.index, {
            type: "int",
            signed: 0,
            size: 32,
          }).code,
          OPCODES.local.tee.opcode,
          ...leb128u32(this.boolRegisterIndex),
          NUM_CONST.i32,
        ];
        if (byteSize >= 0)
          code.push(...leb128s32(byteSize), OPCODES.i32.shl.opcode);
        else code.push(...leb128s32(-byteSize), OPCODES.i32.shr_u.opcode);
        code.push(
          opcodeLoad,
          // This alignment optimization is valid here but not in general load/store
          // because MEMORY_INDEX is always size-aligned, but general load/store is only byte-aligned
          ...leb128u32(64 + Math.max(byteSize, 0)),
          ...leb128u32(ref.ref),
          ...leb128u32(0),
        );
        // arr[x] -> arr[x >> 3] & (1 << (x & 7))
        if (byteSize < 0)
          code.push(
            NUM_CONST.i32,
            ...leb128s32(1),
            OPCODES.local.get.opcode,
            ...leb128u32(this.boolRegisterIndex),
            NUM_CONST.i32,
            ...leb128s32(7),
            OPCODES.i32.and.opcode,
            OPCODES.i32.shl.opcode,
            OPCODES.i32.and.opcode,
            NUM_CONST.i32,
            ...leb128s32(0),
            OPCODES.i32.ne.opcode,
          );
        return {
          code,
          len: 1,
        };
      }
      case AST.ASSIGN_MEMORY_INDEX: {
        const ref = this.get(node, node.memory);
        const type = toRawType(toBigType(ref.index));
        const size = ref.index.size;
        const storeop =
          size === 32 || size === 64 ? "store" : `store${Math.max(size, 8)}`;
        const opcodeStore = OPCODES[type][storeop].opcode;
        const byteSize = Math.log2(size / 8);
        const code = [
          ...this.compileExpression(node.index, {
            type: "int",
            signed: 0,
            size: 32,
          }).code,
          OPCODES.local.tee.opcode,
          ...leb128u32(this.boolRegisterIndex),
          NUM_CONST.i32,
        ];
        if (byteSize >= 0)
          code.push(...leb128s32(byteSize), OPCODES.i32.shl.opcode);
        else code.push(...leb128s32(-byteSize), OPCODES.i32.shr_u.opcode);
        if (byteSize >= 0)
          code.push(
            ...this.compileExpression(node.body, toBigType(ref.index)).code,
            opcodeStore,
            // This alignment optimization is valid here but not in general load/store
            // because MEMORY_INDEX is always size-aligned, but general load/store is only byte-aligned
            ...leb128u32(64 + byteSize),
            ...leb128u32(ref.ref),
            ...leb128u32(0),
          );
        else {
          const loadop =
            size === 32 || size === 64
              ? "load"
              : `load${Math.max(size, 8)}_${ref.index.signed === 1 ? "s" : "u"}`;
          const opcodeLoad = OPCODES[type][loadop].opcode;
          // arr[x] = 1 -> arr[x >> 3] |= 1 << (x & 7)
          // arr[x] = 0 -> arr[x >> 3] &= ~(1 << (x & 7))
          code.push(
            // index value
            OPCODES.local.get.opcode,
            ...leb128u32(this.boolRegisterIndex),
            NUM_CONST.i32,
            ...leb128s32(-byteSize),
            OPCODES.i32.shr_u.opcode,
            opcodeLoad,
            ...leb128u32(64),
            ...leb128u32(ref.ref),
            ...leb128u32(0),
            // bitmask
            NUM_CONST.i32,
            ...leb128s32(1),
            OPCODES.local.get.opcode,
            ...leb128u32(this.boolRegisterIndex),
            NUM_CONST.i32,
            ...leb128s32(7),
            OPCODES.i32.and.opcode,
            OPCODES.i32.shl.opcode,
            ...this.compileExpression(node.body, toBigType(ref.index)).code,
            OPCODES.i32.eqz.opcode,
            0x04,
            ...leb128s32(this.boolFunctionIndex),
            NUM_CONST.i32,
            ...leb128s32(-1),
            OPCODES.i32.xor.opcode,
            OPCODES.i32.and.opcode,
            0x05,
            OPCODES.i32.or.opcode,
            0x0b,
            OPCODES.i32.store8.opcode,
            ...leb128u32(64),
            ...leb128u32(ref.ref),
            ...leb128u32(0),
          );
        }
        return {
          code,
          len: 0,
        };
      }
      case AST.BINARY_INTEGER:
      case AST.BINARY: {
        const ta = this.resolveVariable(this.getType(node.left));
        const tb = this.resolveVariable(this.getType(node.right));
        const tOutA = moreSpecific(ta[0], tb[0]);
        const tOut = tOutA.type === "number" ? hint : tOutA;
        if (tOut.type === "void") return { code: [], len: 0 };
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
        const tOutA = moreSpecific(ta[0], tb[0]);
        const tOut = tOutA.type === "number" ? hint : tOutA;
        if (tOut.type === "void") return { code: [], len: 0 };
        const op =
          node.type +
          (tOut.type === "int" ? "_" + (tOut.signed === 1 ? "s" : "u") : "");
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
        const typep = this.resolveVariable(this.getType(node.body))[0];
        // i32.eqz/i64.eqz can't ever return i64, so i32 is more explicit
        const type =
          typep.type === "number"
            ? { type: "int", signed: 2, size: 32 }
            : typep;
        return {
          code: [
            ...this.compileExpression(node.body, type).code,
            OPCODES[toRawType(type)].eqz.opcode,
          ],
          len: 1,
        };
      }
      case AST.FULL_NOT: {
        const typep = this.resolveVariable(this.getType(node.body))[0];
        // i32.eqz/i64.eqz can't ever return i64, so i32 is more explicit
        const type =
          typep.type === "number"
            ? { type: "int", signed: 2, size: 64 }
            : typep;
        const raw = toRawType(type);
        return {
          code: [
            ...this.compileExpression(node.body, type).code,
            NUM_CONST[raw],
            ...encode(raw, type.size === 64 ? -1n : -1),
            OPCODES[raw].xor.opcode,
          ],
          len: 1,
        };
      }
      case AST.NEGATION: {
        const typep = this.resolveVariable(this.getType(node.body))[0];
        const type = typep.type === "number" ? hint : typep;
        if (type.type === "void") return { code: [], len: 0 };
        const raw = toRawType(type);
        return {
          code:
            type.type === "int"
              ? [
                  NUM_CONST[raw],
                  ...encode(raw, type.size === 64 ? 0n : 0),
                  ...this.compileExpression(node.body, type).code,
                  OPCODES[raw].sub.opcode,
                ]
              : [
                  ...this.compileExpression(node.body, type).code,
                  OPCODES[raw].neg.opcode,
                ],
          len: 1,
        };
      }
      case AST.EXPRESSION: {
        if (node.level2 === "get") {
          const opcode = OPCODES[node.level1.literal].get;
          return {
            code: [
              opcode.opcode,
              ...leb128u32(
                this[node.level1.literal + "s"].get(node.params[0].literal).ref,
              ),
            ],
            len: 1,
          };
        } else if (node.level2 === "set" || node.level2 === "tee") {
          const opcode = OPCODES[node.level1.literal][node.level2].opcode;
          return {
            code: [
              ...this.compileExpression(
                node.params[1],
                this[node.level1.literal + "s"].get(node.params[0].literal),
              ).code,
              opcode,
              ...leb128u32(
                this[node.level1.literal + "s"].get(node.params[0].literal).ref,
              ),
            ],
            // tee could be optimized with set but this optimization is already done
            // as AST.ASSIGN and if you use native wasm primitives it should stay that way
            len: node.level2 === "tee" ? 1 : 0,
          };
        }
        if (node.level1.literal === "select") {
          const types = this.flatValues(node.params);
          const tOutA = moreSpecific(types[0], types[1]);
          const tOut = tOutA.type === "number" ? hint : tOutA;
          // This means that select is top-level with two number arguments
          // which can be dropped
          if (tOut.type === "void") return { code: [], len: 0 };
          const paramTypes = [
            tOut,
            tOut,
            {
              type: "int",
              signed: 2,
              size: 32,
            },
          ];
          const code = [];
          let idx = 0;
          for (const param of node.params) {
            const res = this.compileExpression(param, paramTypes[idx]);
            idx += res.len;
            code.push(...res.code);
          }
          if (tOut.type === "func") {
            this.defineType(tOut);
            code.push(0x1c, ...encodevec([this.typeIdx - 1]));
          } else {
            code.push(0x1b);
          }
          return {
            code,
            len: 1,
          };
        }
        if (node.level1.literal === "generic") {
          const paramA = node.params[0];
          const typeA = this.resolveVariable(this.getType(paramA))[0];
          const tOutA =
            node.params.length === 2
              ? moreSpecific(
                  typeA,
                  this.resolveVariable(this.getType(node.params[1]))[0],
                )
              : typeA;
          const tOut = tOutA.type === "number" ? hint : tOutA;
          if (tOut.type === "void") return { code: [], len: 0 };

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
        if (node.level1.literal === "memory") {
          const memidx = this.globals.get(node.params[0].literal).ref;
          const opcode = OPCODES.memory[node.level2];
          const out = [];
          const base = node.level2 === "copy" || node.level2 === "init" ? 2 : 1;
          for (let i = base; i < opcode.params.length; i++) {
            const type = toLongType(opcode.params[i]);
            const arg = node.params[i];
            out.push(...this.compileExpression(arg, type).code);
          }
          if (node.level2 === "clear") {
            out.push(
              // start
              NUM_CONST.i32,
              ...leb128s32(0),
              // value
              NUM_CONST.i32,
              ...leb128s32(0),
              // size
              OPCODES.memory.size.opcode,
              ...leb128u32(memidx),
              NUM_CONST.i32,
              ...leb128s32(65536),
              OPCODES.i32.mul.opcode,
            );
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
          else if (node.level2 === "fill" || node.level2 === "clear")
            out.push(...leb128u32(11), ...leb128u32(memidx));
          else if (node.level2 === "byteSize")
            out.push(
              NUM_CONST.i32,
              ...leb128s32(65536),
              OPCODES.i32.mul.opcode,
            );
          else if (node.level2 === "init")
            out.push(
              ...leb128u32(8),
              ...leb128u32(
                this.get(node.params[1], node.params[1].literal).ref,
              ),
              ...leb128u32(memidx),
            );
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
          const opcode = OPCODES[node.level1.literal][node.level2];
          for (let i = 1; i < opcode.params.length; i++) {
            const type = toLongType(opcode.params[i]);
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

        if (node.level1.literal === "data") {
          return {
            code: [
              0xfc,
              ...leb128u32(9),
              ...leb128u32(
                this.get(node.params[0], node.params[0].literal).ref,
              ),
            ],
            len: 0,
          };
        }

        if (node.level1.literal === "uint" || node.level1.literal === "sint") {
          return this.compileExpression(node.params[0], hint);
        }

        const out = [];
        const opcode = getOpcode(node.level1, node.level2);
        if (opcode === undefined) {
          if (node.level1.node === AST.IDENTIFIER) {
            const f = this.get(node, node.level1.literal);
            const func = f.type;
            const out = this.compileFunctionParams(node);
            if (func.ref) {
              out.push(
                f.relative === "local"
                  ? OPCODES.local.get.opcode
                  : OPCODES.global.get.opcode,
                ...leb128u32(f.ref),
                0x14,
                ...leb128u32(f.typeRef),
              );
            } else out.push(0x10, ...leb128u32(f.ref));

            return {
              code: out,
              len: func.output.length,
            };
          } else {
            const functype = this.resolveVariable(this.getType(node.level1))[0];
            return {
              code: [
                ...this.compileFunctionParams(node),
                ...this.compileExpression(node.level1, functype).code,
                0x14,
                ...leb128u32(functype.typeRef),
              ],
              len: functype.output.length,
            };
          }
        }

        let funcIdx = 0;
        for (let i = 0; i < node.params.length; i++) {
          const arg = node.params[i];
          const type = toLongType(opcode.params[funcIdx]);
          const expr = this.compileExpression(arg, type);
          funcIdx += expr.len;
          out.push(...expr.code);
        }
        out.push(opcode.opcode);
        if (node.level2 !== null && node.level2.startsWith("trunc_sat_"))
          out.push(
            ...leb128u32(
              (node.level1.literal === "i64" ? 4 : 0) +
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
            if (val.level1.node === AST.IDENTIFIER) {
              const func = this.get(val, val.level1.literal).ref;
              return [
                ...this.compileFunctionParams(val),
                0x12,
                ...leb128u32(func),
              ];
            } else {
              const func = this.resolveVariable(this.getType(val.level1))[0];
              return [
                ...this.compileFunctionParams(val),
                ...this.compileExpression(val.level1, func).code,
                0x15,
                ...leb128u32(func.typeRef),
              ];
            }
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
            ...this.compileExpression(state.cond, {
              type: "int",
              signed: 2,
              size: 32,
            }).code,
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
          body.push(
            ...this.compileExpression(node.init, { type: "void" }).code,
          );
        if (!node.isDo) {
          body.push(
            ...this.compileExpression(node.cond, {
              type: "int",
              signed: 2,
              size: 32,
            }).code,
            0x04,
          );
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
          body.push(
            ...this.compileExpression(node.update, { type: "void" }).code,
          );
        body.push(
          ...this.compileExpression(node.cond, {
            type: "int",
            signed: 2,
            size: 32,
          }).code,
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
        const res = this.compileExpression(node, { type: "void" });
        for (let i = 0; i < res.len; i++) res.code.push(0x1a);
        return res.code;
      }
    }
  }

  validateAndCompileFunction(node) {
    this.locals.clear();

    const code = [];
    const locals = [];
    let localIdx = 0;
    let currentParam = { type: "fake" },
      currentLen = 0;

    for (const arg of [...node.params, ...node.locals]) {
      if (this.locals.has(arg.name))
        this.errorToken(arg, "This local was already declared");
      const obj = {
        type: arg.type,
        writable: true,
        relative: "local",
        ref: localIdx++,
        ...toStartEnd(arg, arg),
      };
      // This has to be a ref but check just to be safe
      if (arg.type.type === "func" && arg.type.ref) {
        this.defineType(arg.type);
        obj.typeRef = obj.type.typeRef = this.typeIdx - 1;
      }
      this.locals.set(arg.name, obj);
    }

    for (const param of [
      ...node.locals,
      // This is a register used for boolean memories
      { type: { type: "int", signed: 0, size: 32 } },
    ]) {
      if (isSameType(currentParam, param.type)) {
        currentLen++;
      } else {
        if (currentParam.type !== "fake") {
          locals.push([
            leb128u32(currentLen),
            ...this.defineType(currentParam),
          ]);
        }
        currentParam = param.type;
        currentLen = 1;
      }
    }
    if (currentParam.type !== "fake") {
      locals.push([leb128u32(currentLen), ...this.defineType(currentParam)]);
    }
    code.push(...encodevec(locals));
    this.boolRegisterIndex = localIdx;

    for (const line of node.body) {
      this.verifyStatement(line, node.type);
      code.push(...this.compileStatement(line, node.type));
    }

    this.verifyLocalInitialization(
      node.body,
      new Set(
        [
          ...node.params,
          ...node.locals.filter(
            (i) => i.type.type === "int" || i.type.type === "float",
          ),
        ].map((i) => i.name),
      ),
    );

    if (node.type.output.length > 0) {
      if (!this.hasReturn(node.body)[0])
        this.errorToken(node, "Expected a return statement");
      // Always insert unreachable because it's just easier
      code.push(0x00);
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
      ...encodesection(this.elements, 9),
      ...encodesection2(leb128u32(this.data.length), 12),
      ...encodesection(this.code, 10),
      ...encodesection(this.data, 11),
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

function compileRaw(text, map) {
  const tokens = lex(text);
  const ast = new Parser(tokens, text).parse();
  return new VerifyCompiler(ast, text, map).verifyCompile();
}

async function optimize(wasm) {
  const binaryen = (
    await import("https://cdn.jsdelivr.net/npm/binaryen@123.0.0")
  ).default;
  const module = binaryen.readBinary(wasm);
  module.setFeatures(binaryen.Features.All);
  module.optimize();
  const binary = module.emitBinary();
  module.dispose();
  return binary;
}

function compileCode(text, map) {
  return optimize(compileRaw(text, map));
}

export async function compile(emwasm, deps, map) {
  return compileWasm(await compileCode(emwasm, map), deps);
}
