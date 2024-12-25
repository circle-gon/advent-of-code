/* globals BigInt */

function parse(input) {
  const [r, p] = input.split("\n\n");
  const registers = r.split("\n").map((i) => BigInt(i.slice(12)));
  const program = p
    .slice(9)
    .split(",")
    .map((i) => Number(i));
  return {
    registers,
    program,
  };
}

function run(registers, program) {
  let ip = 0;
  const out = [];
  while (ip < program.length) {
    const instr = program[ip];
    const op = program[ip + 1];
    let jump = true;

    let combo;
    switch (op) {
      case 0:
      case 1:
      case 2:
      case 3:
        combo = BigInt(op);
        break;
      case 4:
      case 5:
      case 6:
        combo = registers[op - 4];
        break;
      case 7:
        // This can occur in valid programs because the combo may not be used
        combo = -9999999n;
        break;
      default:
        throw new Error("Bad combo operand");
    }

    switch (instr) {
      case 0:
      case 6:
      case 7:
        const outI = instr > 0 ? instr - 5 : 0;
        registers[outI] = registers[0] / 2n ** combo;
        break;
      case 1:
        registers[1] = registers[1] ^ BigInt(op);
        break;
      case 2:
        registers[1] = combo % 8n;
        break;
      case 3:
        if (registers[0] !== 0n) {
          ip = op;
          jump = false;
        }
        break;
      case 4:
        registers[1] = registers[1] ^ registers[2];
        break;
      case 5:
        out.push(combo % 8n);
        break;
      default:
        throw new Error("Bad instruction");
    }
    if (jump) ip += 2;
  }
  return out;
}

function part1(input) {
  const { registers, program } = parse(input);
  return run(registers, program).join(",");
}

function solve(registers, program, subpart, carry) {
  const start = subpart === program.length - 1 ? 1n : 0n;
  for (let i = start; i < 8n; i++) {
    const a = carry + 8n ** BigInt(subpart) * i;
    registers[0] = a;
    const result = run(registers, program).reverse();
    const expected = program.toReversed();
    if (
      result.length === expected.length &&
      result
        .slice(0, program.length - subpart)
        .every((i, x) => i === BigInt(expected[x]))
    ) {
      if (subpart === 0) return a;
      const result = solve(registers, program, subpart - 1, a);
      if (result) return result;
    }
  }
}

function part2(input) {
  const { registers, program } = parse(input);
  return solve(registers, program, program.length - 1, 0n);
}

export default [part1, part2];