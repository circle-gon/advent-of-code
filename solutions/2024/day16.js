import { Heap } from "/externals.js";

function parse(input) {
  const map = [];
  for (const row of input.split("\n")) {
    map.push(row.split(""));
  }
  return map;
}

function hash(x, y, path) {
  return `${x},${y},${path}`;
}

function cost(curDir, nextDir) {
  const cost = Math.abs(nextDir - curDir);
  return cost > 2 ? cost - 2 : cost;
}

const TO_CHECK = [
  [1, 0, 0],
  [-1, 0, 2],
  [0, -1, 1],
  [0, 1, 3],
];
function getNext(map, x, y, score, currDir, path) {
  const possible = [];
  for (const [xInc, yInc, dir] of TO_CHECK)
    if (map[y + yInc][x + xInc] !== "#") {
      const arr = [
        x + xInc,
        y + yInc,
        dir,
        score + 1000 * cost(currDir, dir) + 1,
      ];
      if (path) arr.push([...path, [arr[0], arr[1]]]);
      possible.push(arr);
    }
  return possible;
}

// I love Wikipedia so much
// https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Practical_optimizations_and_infinite_graphs
function part1(input) {
  const map = parse(input);
  const startY = map.findIndex((i) => i.includes("S"));
  const startX = map[startY].indexOf("S");
  const queue = new Heap((a, b) => a[3] - b[3]);
  const seen = new Set();
  const paths = new Map();

  queue.push([startX, startY, 0, 0]);
  paths.set(hash(startX, startY, 0), 0);

  while (queue.length > 0) {
    const [x, y, dir, score] = queue.pop();
    if (map[y][x] === "E") return score;

    seen.add(hash(x, y, dir));
    for (const node of getNext(map, x, y, score, dir)) {
      const [nX, nY, nDir, nScore] = node;
      const h = hash(nX, nY, nDir);
      if (!seen.has(h) || nScore < paths.get(h)) {
        paths.set(h, nScore);
        queue.push(node);
      }
    }
  }
  return "There is no path from S to E, which means your input is malformed.";
}

function part2(input) {
  const map = parse(input);
  const startY = map.findIndex((i) => i.includes("S"));
  const startX = map[startY].indexOf("S");
  const queue = new Heap((a, b) => a[3] - b[3]);
  const seen = new Set();
  const paths = new Map();
  const visited = new Set();
  let max = Infinity;

  queue.push([startX, startY, 0, 0, [[startX, startY]]]);
  paths.set(hash(startX, startY, 0), 0);

  while (queue.length > 0) {
    const [x, y, dir, score, path] = queue.pop();
    if (map[y][x] === "E") {
      // Less optimized solutions can be included, so check
      if (max === Infinity) max = score;
      if (score === max) for (const [x, y] of path) visited.add(hash(x, y, ""));
      continue;
    }

    seen.add(hash(x, y, dir));
    for (const node of getNext(map, x, y, score, dir, path)) {
      const [nX, nY, nDir, nScore] = node;
      const h = hash(nX, nY, nDir);
      if (!seen.has(h) || nScore <= paths.get(h)) {
        paths.set(h, nScore);
        queue.push(node);
      }
    }
  }
  return visited.size;
}

export default [part1, part2];
