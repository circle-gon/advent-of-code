import { Queue } from "/structures.js";

function parse(input, example) {
  const falling = input
    .split("\n")
    .map((i) => i.split(",").map((i) => Number(i)));
  
  const dims = example ? 7 : 71
  const grid = Array(dims)
    .fill()
    .map((i) => Array(dims).fill(0));
  return { falling, grid };
}

const TO_CHECK = [
  [1, 0],
  [-1, 0],
  [0, -1],
  [0, 1],
];
function getNext(map, x, y, score) {
  const possible = [];
  for (const [xInc, yInc] of TO_CHECK) {
    const nX = x + xInc;
    const nY = y + yInc;
    if (
      nX >= 0 &&
      nY >= 0 &&
      nX < map[0].length &&
      nY < map.length &&
      map[nY][nX] !== 1
    ) {
      const arr = [nX, nY, score + 1];
      possible.push(arr);
    }
  }
  return possible;
}

function hash(x, y) {
  return `${x},${y}`;
}

function path(grid) {
  const queue = new Queue();
  const seen = new Set([hash(0, 0)]);

  queue.push([0, 0, 0]);

  while (queue.size() > 0) {
    const [x, y, score] = queue.pop();
    if (x === grid[0].length - 1 && y === grid.length - 1) return score;

    for (const node of getNext(grid, x, y, score)) {
      const [nX, nY] = node;
      const h = hash(nX, nY);
      if (!seen.has(h)) {
        seen.add(h);
        queue.push(node);
      }
    }
  }
  return -1;
}

function part1(input, _, example) {
  const { falling, grid } = parse(input, example);
  for (const [x, y] of falling.slice(0, example ? 12 : 1024)) grid[y][x] = 1;
  return path(grid);
}

function part2(input, _, example) {
  const { falling, grid } = parse(input, example);
  let first = 0,
    last = falling.length - 1;
  while (first <= last) {
    const mid = Math.floor((first + last) / 2);
    for (let i = 0; i <= mid; i++) {
      const [x, y] = falling[i];
      grid[y][x] = 1;
    }
    const works = path(grid) === -1;
    for (let i = 0; i <= mid; i++) {
      const [x, y] = falling[i];
      grid[y][x] = 0;
    }
    if (works) last = mid - 1;
    else first = mid + 1;
  }
  return falling[first].join(",");
}

export default [part1, part2];
