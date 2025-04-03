function parse(input) {
  const instrs = [];
  for (const instr of input.split("\n")) {
    const parts = instr.split(" ");
    instrs.push([
      parts[0],
      parts[1],
      Number(parts[2]),
      parts[4],
      parts[5],
      Number(parts[6]),
    ]);
  }
  return instrs;
}

function part1(input) {
  const instrs = parse(input);
  const registers = new Map();
  for (const instr of instrs) {
    const regVal = registers.get(instr[3]) ?? 0;
    let works = false;
    switch (instr[4]) {
      case "==":
        works = regVal === instr[5];
        break;
      case "!=":
        works = regVal !== instr[5];
        break;
      case ">":
        works = regVal > instr[5];
        break;
      case ">=":
        works = regVal >= instr[5];
        break;
      case "<":
        works = regVal < instr[5];
        break;
      case "<=":
        works = regVal <= instr[5];
        break;
      default:
        throw new Error("What?");
    }
    if (works) {
      registers.set(
        instr[0],
        (registers.get(instr[0]) ?? 0) +
          (instr[1] === "inc" ? 1 : -1) * instr[2]
      );
    }
  }
  return Math.max(...registers.values());
}

function part2(input) {
  const instrs = parse(input);
  const registers = new Map();
  let max = 0;
  for (const instr of instrs) {
    const regVal = registers.get(instr[3]) ?? 0;
    let works = false;
    switch (instr[4]) {
      case "==":
        works = regVal === instr[5];
        break;
      case "!=":
        works = regVal !== instr[5];
        break;
      case ">":
        works = regVal > instr[5];
        break;
      case ">=":
        works = regVal >= instr[5];
        break;
      case "<":
        works = regVal < instr[5];
        break;
      case "<=":
        works = regVal <= instr[5];
        break;
      default:
        throw new Error("What?");
    }
    if (works) {
      const val =
        (registers.get(instr[0]) ?? 0) +
        (instr[1] === "inc" ? 1 : -1) * instr[2];
      max = Math.max(max, val);
      registers.set(instr[0], val);
    }
  }
  return max;
}

export default [part1, part2];
