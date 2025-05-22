function parse(input) {
  const claims = [];
  for (const line of input.split("\n")) {
    const l = line.split(" ");
    const offset = l[2].slice(0, -1).split(",");
    const dims = l[3].split("x");
    claims.push([
      Number(offset[0]),
      Number(offset[1]),
      Number(dims[0]),
      Number(dims[1]),
    ]);
  }
  return claims;
}

function hash(x, y) {
  return `${x},${y}`;
}

function part1(input) {
  const claims = parse(input);
  const mat = new Map();
  for (const [left, top, width, height] of claims) {
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const h = hash(left + i, top + j);
        mat.set(h, (mat.get(h) ?? 0) + 1);
      }
    }
  }
  return [...mat.values()].reduce((a, b) => a + (b >= 2 ? 1 : 0), 0);
}

function part2(input) {
  const claims = parse(input);
  const mat = new Map();
  const bad = new Set();
  for (const [idx, [left, top, width, height]] of claims.entries()) {
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const h = hash(left + i, top + j);
        if (mat.has(h)) {
          bad.add(idx);
          bad.add(mat.get(h));
        } else mat.set(h, idx);
      }
    }
  }

  for (let i = 0; i < claims.length; i++) {
    if (!bad.has(i)) return i + 1;
  }
  return "Is your input malformed?";
}

export default [part1, part2];
