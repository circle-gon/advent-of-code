function parse(input) {
  const instrs = [];
  for (const line of input.split("\n")) {
    const parts = line.split(" ");
    if (parts[0] === "toggle") {
      const start = parts[1].split(",").map((i) => Number(i));
      const end = parts[3].split(",").map((i) => Number(i));
      instrs.push([0, start, end]);
    } else {
      const type = parts[1] === "on" ? 1 : 2;
      const start = parts[2].split(",").map((i) => Number(i));
      const end = parts[4].split(",").map((i) => Number(i));
      instrs.push([type, start, end]);
    }
  }
  return instrs;
}

function part1(input) {
  const instrs = parse(input);
  const map = Array(1000)
    .fill()
    .map(() => Array(1000).fill(false));
  for (const instr of instrs) {
    const type = instr[0];
    const [sX, sY] = instr[1];
    const [eX, eY] = instr[2];
    for (let i = sX; i <= eX; i++)
      for (let j = sY; j <= eY; j++)
        if (type === 0) map[j][i] = !map[j][i];
        else map[j][i] = type === 1;
  }

  return map.reduce((a, b) => a + b.reduce((c, d) => c + (d ? 1 : 0), 0), 0);
}

function part2(input) {
  const instrs = parse(input);
  const map = Array(1000)
    .fill()
    .map(() => Array(1000).fill(0));
  for (const instr of instrs) {
    const type = instr[0];
    const [sX, sY] = instr[1];
    const [eX, eY] = instr[2];
    for (let i = sX; i <= eX; i++)
      for (let j = sY; j <= eY; j++)
        if (type === 0) map[j][i] += 2;
        else if (type === 1) map[j][i] += 1;
        else map[j][i] = Math.max(map[j][i] - 1, 0);
  }

  return map.reduce((a, b) => a + b.reduce((c, d) => c + d, 0), 0);
}

export default [part1, part2];
