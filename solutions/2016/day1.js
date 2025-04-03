function parse(input) {
  const lines = input.split(", ");
  const out = [];
  for (const line of lines) {
    out.push([line[0], Number(line.slice(1))]);
  }
  return out;
}

function part1(input) {
  const dirs = parse(input);
  let curr = 0;
  let x = 0,
    y = 0;
  for (const [dir, num] of dirs) {
    curr = (curr + (dir === "R" ? 1 : -1) + 4) % 4;
    if (curr === 0) y += num;
    else if (curr === 1) x += num;
    else if (curr === 2) y -= num;
    else x -= num;
  }
  return Math.abs(x) + Math.abs(y);
}

function hash(x, y) {
  return `${x},${y}`;
}

function part2(input) {
  const dirs = parse(input);
  let curr = 0;
  let x = 0,
    y = 0;
  const pos = new Set([hash(0, 0)]);

  for (const [dir, num] of dirs) {
    curr = (curr + (dir === "R" ? 1 : -1) + 4) % 4;
    for (let i = 0; i < num; i++) {
      if (curr === 0) y++;
      else if (curr === 1) x++;
      else if (curr === 2) y--;
      else x--;
      const h = hash(x, y);
      if (pos.has(h)) return Math.abs(x) + Math.abs(y);
      pos.add(h);
    }
  }
  return "Malformed input?";
}

export default [part1, part2];
