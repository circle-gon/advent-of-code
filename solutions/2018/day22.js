import { Heap } from "/externals.js";

function parse(input) {
  const [depth, target] = input.split("\n");
  const d = Number(depth.slice(7));
  const [tx, ty] = target
    .slice(8)
    .split(",")
    .map((i) => Number(i));
  return [d, tx, ty];
}

function hash(x, y, m) {
  return `${x},${y},${m}`;
}

function getErosion(erosion, x, y, targetX, targetY, depth) {
  const h = hash(x, y, 0);
  if (erosion.has(h)) return erosion.get(h);

  let gi = 0;
  if (x === 0 && y === 0) gi = 0;
  else if (x === targetX && y === targetY) gi = 0;
  else if (x === 0) gi = y * 48271;
  else if (y === 0) gi = x * 16807;
  else
    gi =
      getErosion(erosion, x - 1, y, targetX, targetY, depth) *
      getErosion(erosion, x, y - 1, targetX, targetY, depth);

  const erode = (gi + depth) % 20183;
  erosion.set(h, erode);
  return erode;
}

function part1(input) {
  const [d, tx, ty] = parse(input);
  const map = new Map();
  let sum = 0;

  for (let i = 0; i <= tx; i++) {
    for (let j = 0; j <= ty; j++) {
      const erode = getErosion(map, i, j, tx, ty, d);
      if (erode % 3 === 1) sum++;
      else if (erode % 3 === 2) sum += 2;
    }
  }

  return sum;
}

const TO_LOOK = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function getNext(erosion, x, y, tx, ty, depth, items, time) {
  const actions = [];
  const level = getErosion(erosion, x, y, tx, ty, depth) % 3;
  for (const [xi, yi] of TO_LOOK) {
    const nx = x + xi;
    const ny = y + yi;
    if (nx >= 0 && ny >= 0 && nx <= tx * 4 && ny <= ty * 4) {
      const level2 = getErosion(erosion, nx, ny, tx, ty, depth) % 3;
      let nextItem = items;
      if (items === level2) {
        // Switch to approved item
        for (let i = 0; i < 3; i++)
          if (i !== level && i !== level2) nextItem = i;
      }

      actions.push([
        nx,
        ny,
        nextItem,
        time +
          1 +
          (nextItem !== items ? 7 : 0) +
          (nextItem !== 1 && nx === tx && ny === ty ? 7 : 0),
      ]);
    }
  }
  return actions;
}

function isPossiblyOptimal(paths, cost) {
  let d = Infinity;
  for (const path of paths) d = Math.min(d, path[3]);
  return paths.length === 0 || cost < d + 7;
}

function part2(input) {
  const [d, tx, ty] = parse(input);
  const queue = new Heap((a, b) => a[3] - b[3]);
  const seen = new Set();
  const erosion = new Map();
  queue.push([0, 0, 1, 0]);

  while (queue.length > 0) {
    const [x, y, items, time] = queue.pop();
    if (x === tx && y === ty) return time;

    seen.add(hash(x, y, items));
    for (const node of getNext(erosion, x, y, tx, ty, d, items, time)) {
      const [nx, ny, nitem, ntime] = node;
      const h = hash(nx, ny, nitem);
      const frontier = queue.findAll(
        (t) => t !== null && t[0] === nx && t[1] === ny,
      );
      const point = frontier.find((i) => i[2] === nitem);

      if (isPossiblyOptimal(frontier, ntime)) {
        if (!seen.has(h) && point === undefined) queue.push(node);
        else if (point !== undefined && ntime < point[3]) {
          point[3] = ntime;
          queue.heapify();
        }
      }
    }
  }
}

export default [part1, part2];
