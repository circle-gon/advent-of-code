function parse(input) {
  return input.split("\n").map((i) => i.split(""));
}

function valid(x, y, map) {
  return x >= 0 && y >= 0 && x < map[0].length && y < map.length;
}

const TO_CHECK = [
  [1, 0],
  [-1, 0],
  [0, -1],
  [0, 1],
];
function getNext(map, node, path) {
  const [cX, cY, x, y, score] = node;
  for (const [xInc, yInc] of TO_CHECK) {
    const nX = x + xInc;
    const nY = y + yInc;
    if (valid(nX, nY, map) && map[nY][nX] !== "#" && (cX !== nX || cY !== nY)) {
      const h = hash(nX, nY);
      path.set(h, score + 1);
      return [x, y, nX, nY, score + 1];
    }
  }
  throw new Error("Bad");
}

function hash(x, y) {
  return `${x},${y}`;
}

function unhash(p) {
  return p.split(",").map((i) => Number(i));
}

function path(grid) {
  const startY = grid.findIndex((i) => i.includes("S"));
  const startX = grid[startY].indexOf("S");
  const path = new Map([[hash(startX, startY), 0]]);
  let node = [startX, startY, startX, startY, 0];

  while (true) {
    if (grid[node[3]][node[2]] === "E") return path;
    node = getNext(grid, node, path);
  }
}

function cheats(input, size, example) {
  const map = parse(input);
  const paths = path(map);

  let good = 0;
  const req = example ? 50 : 100
  for (const [idx, val] of paths.entries()) {
    const [x, y] = unhash(idx);
    for (let i = -size; i <= size; i++) {
      const absi = Math.abs(i);
      for (let j = absi - size; j <= size - absi; j++) {
        const nX = x + i;
        const nY = y + j;
        if (valid(nX, nY, map) && map[nY][nX] !== "#") {
          // Index is always defined because it is always on a path
          const skipped = paths.get(hash(nX, nY)) - (absi + Math.abs(j)) - val;
          if (skipped >= req) good++;
        }
      }
    }
  }
  return good;
}

function part1(input, _, example) {
  return cheats(input, 2, example);
}

function part2(input, _, example) {
  return cheats(input, 20, example);
}

export default [part1, part2];
