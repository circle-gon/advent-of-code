import { Queue } from "/externals.js";

function parse(input) {
  const grid = [];
  for (const line of input.split("\n")) {
    grid.push(line.split(""));
  }
  return grid;
}

const TO_CHECK = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

function getNext(map, x, y, dist) {
  const possible = [];
  for (const [xInc, yInc] of TO_CHECK.values()) {
    const nX = x + xInc;
    const nY = y + yInc;
    if (
      nX >= 0 &&
      nY >= 0 &&
      nX < map[0].length &&
      nY < map.length &&
      map[nY][nX] !== "#"
    ) {
      const arr = [nX, nY, dist + 1];
      possible.push(arr);
    }
  }
  return possible;
}

function hash(x, y) {
  return `${x},${y}`;
}

function distance(grid, pointA, pointB) {
  const paths = new Queue();
  const set = new Set([hash(...pointA)]);
  paths.push([...pointA, 0]);

  while (paths.length > 0) {
    const [x, y, dist] = paths.pop();
    if (x === pointB[0] && y === pointB[1]) return dist;
    for (const path of getNext(grid, x, y, dist)) {
      const h = hash(path[0], path[1]);
      if (!set.has(h)) {
        paths.push(path);
        set.add(h);
      }
    }
  }

  return Infinity;
}

function* permutation(array) {
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    const rest = [...array.slice(0, i), ...array.slice(i + 1)];
    if (rest.length > 0)
      for (const perm of permutation(rest)) yield [item, ...perm];
    else yield [item];
  }
}

function run(input, back) {
  const grid = parse(input);
  const nums = [];
  for (const [y, row] of grid.entries()) {
    for (const [x, thing] of row.entries()) {
      if (thing !== "." && thing !== "#") {
        nums[thing] = [x, y];
      }
    }
  }

  const dists = Array(nums.length)
    .fill()
    .map(() => Array(nums.length).fill(undefined));
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      const dist = distance(grid, nums[i], nums[j]);
      dists[i][j] = dist;
      dists[j][i] = dist;
    }
  }

  const arr = Array(nums.length - 1)
    .fill()
    .map((_, i) => i + 1);
  let max = Infinity;
  for (const set of permutation(arr)) {
    let cost = dists[0][set[0]];
    for (let i = 1; i < set.length; i++) cost += dists[set[i - 1]][set[i]];
    if (back) cost += dists[set[set.length - 1]][0];
    max = Math.min(max, cost);
  }
  return max;
}

function part1(input) {
  return run(input, false);
}

function part2(input) {
  return run(input, true);
}

export default [part1, part2];
