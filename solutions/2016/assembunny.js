function parse(input) {
  const instrs = [];
  for (const line of input.split("\n")) {
    const [name, ...others] = line.split(" ");
    const out = [];
    for (const o of others) {
      const num = Number(o);
      if (isNaN(num)) out.push(o);
      else out.push(num);
    }
    instrs.push([name, ...out]);
  }
  return instrs;
}

function optimize(instrs) {
  for (let i = 0; i < instrs.length; i++) {
    const instr = instrs.slice(i, i + 5).map((i) => [...i]);
    if (
      instr[0][0] === "inc" &&
      instr[1][0] === "dec" &&
      instr[2][0] === "jnz" &&
      instr[2][2] === -2 &&
      instr[2][1] === instr[1][1]
    ) {
      if (
        instr[3][0] === "dec" &&
        instr[4][0] === "jnz" &&
        instr[4][2] === -5 &&
        instr[4][1] === instr[3][1]
      ) {
        // Multiplication
        instrs[i] = ["mul", instr[1][1], instr[3][1]];
        instrs[i + 1] = ["add", instr[0][1], instr[1][1]];
        instrs[i + 2] = ["cpy", 0, instr[1][1]];
        instrs[i + 3] = ["cpy", 0, instr[3][1]];
        instrs[i + 4] = ["nop"];
      } else {
        // Addition
        instrs[i] = ["add", instr[0][1], instr[1][1]];
        instrs[i + 1] = ["cpy", 0, instr[1][1]];
        instrs[i + 2] = ["nop"];
      }
    }
  }
  return instrs;
}

function toNumber(registers, place) {
  return typeof place === "number" ? place : registers[place];
}

export function run(input, registers, look) {
  const instrs = optimize(parse(input));
  let ip = 0;

  while (ip < instrs.length) {
    const instr = instrs[ip];
    switch (instr[0]) {
      case "cpy":
        if (typeof instr[2] === "string")
          registers[instr[2]] = toNumber(registers, instr[1]);
        break;

      case "add":
        if (typeof instr[1] === "string")
          registers[instr[1]] += toNumber(registers, instr[2]);
        break;

      case "mul":
        if (typeof instr[1] === "string")
          registers[instr[1]] *= toNumber(registers, instr[2]);
        break;

      case "out":
        if (look(toNumber(registers, instr[1]))) return;
        break;

      case "nop":
        break;

      case "inc":
        if (typeof instr[1] === "string") registers[instr[1]]++;
        break;

      case "dec":
        if (typeof instr[1] === "string") registers[instr[1]]--;
        break;

      case "jnz":
        if (toNumber(registers, instr[1]) !== 0)
          ip += toNumber(registers, instr[2]) - 1;
        break;

      case "tgl": {
        const val = ip + toNumber(registers, instr[1]);
        if (val >= 0 && val < instrs.length) {
          const instr = instrs[val];
          if (instr.length === 2) instr[0] = instr[0] === "inc" ? "dec" : "inc";
          else if (instr.length === 3)
            instr[0] = instr[0] === "jnz" ? "cpy" : "jnz";
        }
        break;
      }

      default:
        throw new Error("what");
    }
    ip++;
  }
  return registers.a;
}
