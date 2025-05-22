function hash(x, y) {
  return `${x},${y}`;
}

function parse(input) {
  const areas = new Map();
  for (const line of input.split("\n")) {
    const [l1, v1, l2, v2] = line
      .split(", ")
      .map((i) => i.split("="))
      .flat();
    const vrange = v2.split("..").map((i) => Number(i));
    const vint = Number(v1);
    for (let i = vrange[0]; i <= vrange[1]; i++) {
      const x = l1 === "x" ? vint : i;
      const y = l1 === "x" ? i : vint;
      areas.set(hash(x, y), "#");
    }
  }
  return areas;
}

function isBrick(areas, x, y) {
  const val = areas.get(hash(x, y));
  return val === "#" || val === "~";
}

function performFall(areas, x, y, yMax) {
  if (y > yMax) return
  
  areas.set(hash(x, y), "|")
  if (!isBrick(areas, x, y + 1)) performFall(areas, x, y + 1, yMax)
  if (isBrick(areas, x, y + 1)) {
    if (areas.get(hash(x + 1, y)) === undefined) performFall(areas, x + 1, y, yMax)
    if (areas.get(hash(x - 1, y)) === undefined) performFall(areas, x - 1, y, yMax)
  }
  
  let minX = x;
  let maxX = x;
  let okay = true;
  while (!isBrick(areas, minX - 1, y)) {
    minX--;
    if (!isBrick(areas, minX, y + 1)) return
  }
  while (!isBrick(areas, maxX + 1, y)) {
    maxX++;
    if (!isBrick(areas, maxX, y + 1)) return
  }

  for (let i = minX; i <= maxX; i++) areas.set(hash(i, y), "~");
}

function getResult(input, by) {
  const areas = parse(input);
  const yVal = [...areas.keys()]
    .map((i) => Number(i.split(",")[1]))
    .sort((a, b) => a - b);
  const yMin = yVal[0];
  const yMax = yVal.at(-1);
  performFall(areas, 500, 1, yMax);
  
  let sum = 0
  for (const [key, val] of areas.entries()) {
    const y = Number(key.split(",")[1])
    if (y >= yMin && by.includes(val)) sum++
  }
  return sum
}

function part1(input) {
  return getResult(input, "~|")
}

function part2(input) {
  return getResult(input, "~")
}

export default [part1, part2];
