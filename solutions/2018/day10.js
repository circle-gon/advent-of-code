function parse(input) {
  const coords = [];
  for (const line of input.split("\n")) {
    coords.push([...line.matchAll(/-?\d+/g)].map((i) => Number(i[0])));
  }
  return coords;
}

function run(input, part2) {
  const coords = parse(input);
  for (let i = 0; i < 1e5; i++) {
    for (const coord of coords) {
      coord[0] += coord[2];
      coord[1] += coord[3];
    }

    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

    for (const [x, y] of coords) {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }

    const distY = maxY - minY + 1;
    const distX = maxX - minX + 1;

    if (distY < 20 && distX < 100) {
      if (part2) return i + 1;

      const image = Array(distY)
        .fill()
        .map(() => Array(distX).fill(" "));
      for (const [x, y] of coords) image[y - minY][x - minX] = "#";

      const out = [];
      for (let i = 0; i < distX; i += 8) {
        const result = image.map((f) => f.slice(i, i + 6).join("")).join("\n");
        const ele = document.createElement("pre");
        ele.textContent = result;
        out.push(ele);
      }

      return out;
    }
  }
}

function part1(input) {
  return run(input, false);
}

function part2(input) {
  return run(input, true);
}

export default [part1, part2];
