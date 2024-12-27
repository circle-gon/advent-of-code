function parse(input) {
  return input.split("\n").map((i) => i.split(/ |, /));
}

function offsetNum(off) {
  const sign = off[0] === "+" ? 1 : -1;
  return sign * Number(off.slice(1));
}

function run(input, a, example) {
  const instrs = parse(input);
  const registers = { a, b: 0 };
  let ip = 0;
  while (ip < instrs.length) {
    const [name, arg, arg2] = instrs[ip];
    switch (name) {
      case "hlf":
        registers[arg] /= 2;
        ip++;
        break;
      case "tpl":
        registers[arg] *= 3;
        ip++;
        break;
      case "inc":
        registers[arg]++;
        ip++;
        break;
      case "jmp":
        ip += offsetNum(arg);
        break;
      case "jie":
        if (registers[arg] % 2 === 0) {
          ip += offsetNum(arg2);
        } else ip++;
        break;
      case "jio":
        if (registers[arg] === 1) {
          ip += offsetNum(arg2);
        } else ip++;
        break;
      default:
        throw new Error("What?");
    }
  }
  return example ? registers.a : registers.b;
}

function part1(input, _, example) {
  return run(input, 0, example);
}

function part2(input) {
  return run(input, 1, false);
}

export default [part1, part2];
