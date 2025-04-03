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

function toNumber(registers, place) {
  return typeof place === "number" ? place : registers.get(place) ?? 0;
}

function runOnce(instrs, registers, ip, queueIn, queueOut, part1) {
  if (ip >= instrs.length) return [ip];

  const instr = instrs[ip];
  switch (instr[0]) {
    case "snd":
      queueOut.push(toNumber(registers, instr[1]));
      break;
    case "set":
      registers.set(instr[1], toNumber(registers, instr[2]));
      break;
    case "add":
      registers.set(
        instr[1],
        toNumber(registers, instr[1]) + toNumber(registers, instr[2])
      );
      break;
    case "mul":
      registers.set(
        instr[1],
        toNumber(registers, instr[1]) * toNumber(registers, instr[2])
      );
      break;
    case "mod":
      registers.set(
        instr[1],
        toNumber(registers, instr[1]) % toNumber(registers, instr[2])
      );
      break;
    case "rcv":
      if (part1) return queueIn.pop();
      if (queueIn.length === 0) return false;
      registers.set(instr[1], queueIn.shift());
      break;
    case "jgz":
      if (toNumber(registers, instr[1]) > 0)
        ip += toNumber(registers, instr[2]) - 1;
      break;
    default:
      throw new Error("what");
  }
  ip++;
  return [ip];
}

function part1(input) {
  const instrs = parse(input);
  const registers = new Map();
  const queue = [];
  let ip = 0;

  while (ip < instrs.length) {
    const result = runOnce(instrs, registers, ip, queue, queue, true);
    if (typeof result === "number") return result;
    ip = result[0];
  }
  return "Is your input malformed?";
}

function part2(input) {
  const instrs = parse(input);
  const registersA = new Map([["p", 0]]);
  const registersB = new Map([["p", 1]]);
  const queueA = [];
  const queueB = [];
  let ipA = 0;
  let ipB = 0;
  let count = 0;

  while (true) {
    const resultA = runOnce(instrs, registersA, ipA, queueA, queueB, false);
    const sizeBefore = queueA.length;
    const resultB = runOnce(instrs, registersB, ipB, queueB, queueA, false);
    const sizeChange = Math.max(queueA.length - sizeBefore, 0)
    
    if (
      (resultA === false && resultB === false) ||
      (ipA >= instrs.length && ipB >= instrs.length)
    )
      break;
    
    if (resultA) ipA = resultA[0];
    if (resultB) ipB = resultB[0];
    
    count += sizeChange;
  }
  return count;
}

export default [part1, part2];
