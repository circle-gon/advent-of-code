import { Queue } from "/externals.js";

function parse(input) {
  const grid = [];
  for (const line of input.split("\n")) {
    const row = [];
    for (const char of line.split("").values()) {
      if (char === "G") {
        row.push([200, "G"]);
      } else if (char === "E") {
        row.push([200, "E"]);
      } else {
        row.push(char);
      }
    }
    grid.push(row);
  }
  return grid;
}

function hash(x, y) {
  return `${x},${y}`;
}

const TO_CHECK = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

function readingSort(a, b) {
  if (a[1] < b[1]) return -1;
  if (a[1] > b[1]) return 1;
  return a[0] - b[0];
}

function isAdjacentTo(grid, i, j, type) {
  const out = [];
  for (const [xInc, yInc] of TO_CHECK) {
    const val = grid[j + yInc][i + xInc];
    if (typeof val !== "string" && val[1] === type)
      out.push([i + xInc, j + yInc, val]);
  }
  return out;
}

function getNext(x, y, dist, grid) {
  const possible = [];
  for (const [xInc, yInc] of TO_CHECK) {
    const nX = x + xInc;
    const nY = y + yInc;
    if (grid[nY][nX] === ".") {
      const arr = [nX, nY, dist + 1];
      possible.push(arr);
    }
  }
  return possible;
}

function getSpots(x, y, type, grid) {
  const distances = Array(grid.length)
    .fill()
    .map(() => Array(grid[0].length).fill(-1));
  const nearest = [];
  const paths = new Queue();
  const seen = new Set([hash(x, y)]);

  paths.push([x, y, 0]);
  while (paths.length > 0) {
    const [x, y, dist] = paths.pop();

    distances[y][x] = dist;
    if (
      isAdjacentTo(grid, x, y, type).length > 0 &&
      (nearest.length === 0 || dist <= nearest[0][2])
    ) {
      if (nearest.length > 0 && dist < nearest[0][2]) nearest.length = 0;
      nearest.push([x, y, dist]);
    }

    const next = getNext(x, y, dist, grid);
    for (const path of next) {
      const h = hash(path[0], path[1]);
      if (!seen.has(h)) {
        seen.add(h);
        paths.push(path);
      }
    }
  }

  const target = nearest.sort(readingSort)[0];
  if (target === undefined) return target;
  return getAllPaths(target[0], target[1], distances).sort(readingSort)[0];
}

function getAllPaths(x, y, distances) {
  let paths = [[x, y]];
  let dist = distances[y][x];
  const seen = new Set([hash(x, y)]);

  while (dist > 1) {
    dist--;
    const next = [];
    for (const [x, y] of paths) {
      for (const [xInc, yInc] of TO_CHECK) {
        const nX = x + xInc;
        const nY = y + yInc;
        const h = hash(nX, nY);
        if (distances[nY][nX] === dist && !seen.has(h)) {
          seen.add(h);
          next.push([nX, nY]);
        }
      }
    }
    paths = next;
  }

  return paths;
}

function toUnitIndex(grid) {
  const out = [];
  for (const [y, row] of grid.entries()) {
    for (const [x, item] of row.entries()) {
      if (typeof item !== "string") out.push([x, y, item]);
    }
  }
  return out;
}

function getOutput(grid, elveAttack) {
  let iter = 0;
  let eCount = grid
    .flat()
    .filter((i) => typeof i !== "string" && i[1] === "E").length;
  let gCount = grid
    .flat()
    .filter((i) => typeof i !== "string" && i[1] === "G").length;

  iter: while (true) {
    const removable = new Set();
    const units = toUnitIndex(grid).sort(readingSort);

    for (const [x, y, unit] of units) {
      if (removable.has(unit)) continue;
      if (unit[1] === "G" && eCount === 0) break iter;
      if (unit[1] === "E" && gCount === 0) break iter;

      const opp = unit[1] === "G" ? "E" : "G";
      const spots = getSpots(x, y, opp, grid);
      if (spots !== undefined) {
        grid[y][x] = ".";
        grid[spots[1]][spots[0]] = unit;
      }

      const nX = spots ? spots[0] : x;
      const nY = spots ? spots[1] : y;
      const inRange = isAdjacentTo(grid, nX, nY, opp);

      if (inRange.length > 0) {
        const least = inRange.sort((a, b) => {
          const diff = a[2][0] - b[2][0];
          if (diff !== 0) return diff;
          return readingSort(a, b);
        })[0];

        const target = least[2];
        target[0] = Math.max(
          target[0] - (target[1] === "G" ? elveAttack : 3),
          0
        );
        if (target[0] <= 0) {
          grid[least[1]][least[0]] = ".";
          if (target[1] === "G") gCount--;
          else eCount--;
          removable.add(target);
        }
      }
    }

    iter++;
  }

  return [
    eCount,
    iter *
      grid
        .flat()
        .filter((i) => typeof i !== "string")
        .reduce((a, b) => a + b[0], 0),
  ];
}

function part1(input) {
  return getOutput(parse(input), 3)[1];
}

function clone(obj) {
  const out = [];
  for (const row of obj) {
    const next = [];
    for (const item of row) {
      next.push(Array.isArray(item) ? [...item] : item);
    }
    out.push(next);
  }
  return out;
}

function part2(input) {
  const grid = parse(input);
  let min = 4,
    max = 1e5;
  const eCount = grid
    .flat()
    .filter((i) => typeof i !== "string" && i[1] === "E").length;

  while (min <= max) {
    const power = Math.floor((min + max) / 2);
    const [count] = getOutput(clone(grid), power);
    if (count === eCount) max = power - 1;
    else min = power + 1;
  }

  return getOutput(clone(grid), min)[1];
}

export default [part1, part2];
