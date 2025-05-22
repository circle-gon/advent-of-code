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
  return typeof place === "number" ? place : (registers.get(place) ?? 0);
}

function part1(input) {
  const instrs = parse(input);
  let count = 0;
  let ip = 0;
  const registers = new Map("abcdefgh".split("").map((i) => [i, 0]));

  while (ip < instrs.length) {
    const instr = instrs[ip];
    switch (instr[0]) {
      case "set":
        registers.set(instr[1], toNumber(registers, instr[2]));
        break;
      case "sub":
        registers.set(
          instr[1],
          toNumber(registers, instr[1]) - toNumber(registers, instr[2]),
        );
        break;
      case "mul":
        registers.set(
          instr[1],
          toNumber(registers, instr[1]) * toNumber(registers, instr[2]),
        );
        count++;
        break;
      case "jnz":
        if (toNumber(registers, instr[1]) !== 0)
          ip += toNumber(registers, instr[2]) - 1;
        break;
      default:
        throw new Error("what");
    }

    ip++;
  }
  return count;
}

function part2(input) {
  // Take b
  const b = parse(input)[0][2];
  const base = b * 100 + 100000;
  let count = 0;

  for (let i = 0; i <= 1000; i++) {
    const num = base + 17 * i;
    let isPrime = true;
    for (let j = 2; j <= Math.sqrt(num); j++) {
      if (num % j === 0) isPrime = false;
    }
    if (!isPrime) count++;
  }
  return count;
}

export default [part1, part2];
