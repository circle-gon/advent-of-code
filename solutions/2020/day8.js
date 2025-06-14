function parse(input) {
  const out = [];
  for (const line of input.split("\n")) {
    const [instr, num] = line.split(" ");
    out.push([instr, Number(num)]);
  }
  return out;
}

function run(code) {
  let ip = 0;
  let accum = 0;
  const seen = new Set();
  while (ip < code.length) {
    if (seen.has(ip)) return [0, accum];
    seen.add(ip);
    if (code[ip][0] === "jmp") {
      ip += code[ip][1];
    } else {
      if (code[ip][0] === "acc") {
        accum += code[ip][1];
      }
      ip++;
    }
  }
  return [1, accum];
}

function part1(input) {
  const code = parse(input);
  return run(code)[1];
}

function part2(input) {
  const code = parse(input);
  for (const line of code) {
    if (line[0] === "jmp") {
      line[0] = "nop";
      const res = run(code);
      if (res[0]) return res[1];
      line[0] = "jmp";
    }
    if (line[0] === "nop") {
      line[0] = "jmp";
      const res = run(code);
      if (res[0]) return res[1];
      line[0] = "nop";
    }
  }
  return "Is your input malformed?";
}

export default [part1, part2];
