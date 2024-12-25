function parse(input) {
  return input.split("\n").map((i) => i.split(""));
}

function count(points) {
  let perim = 0;
  points.sort((a, b) => {
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return a[0] - b[0];
  });
  let [pW, pF, pW2] = points[0];
  for (const [w, f, w2] of points) {
    if (Math.abs(w - pW) !== 1 || f !== pF || w2 !== pW2) perim++;
    pW = w;
    pF = f;
    pW2 = w2;
  }
  return perim;
}

const dirs = [
  [0, -1],
  [0, 1],
  [1, 0],
  [-1, 0],
];

function flood(garden, seen, x, y) {
  const type = garden[y][x];
  const next = [[x, y]];
  let area = 0;
  const pointsX = [];
  const pointsY = [];
  while (next.length > 0) {
    const [x, y] = next.pop();
    if (seen[y][x]) continue;
    seen[y][x] = true;
    area++;

    for (const [dirX, dirY] of dirs) {
      const nX = x + dirX;
      const nY = y + dirY;
      const bad =
        nX < 0 || nY < 0 || nX >= garden[0].length || nY >= garden.length;
      if (bad || garden[nY][nX] !== type) {
        if (dirX === 0) pointsX.push([x, y + dirY / 2, y]);
        else pointsY.push([y, x + dirX / 2, x]);
      } else next.push([nX, nY]);
    }
  }
  return [area, pointsX, pointsY];
}

function part1(input) {
  const garden = parse(input);
  const seen = Array(garden.length)
    .fill()
    .map(() => Array(garden[0].length).fill(false));

  let cost = 0;
  for (const [y, row] of garden.entries()) {
    for (const x of row.keys()) {
      if (!seen[y][x]) {
        const thing = flood(garden, seen, x, y);
        cost += thing[0] * (thing[1].length + thing[2].length);
      }
    }
  }
  return cost;
}

function part2(input) {
  const garden = parse(input);
  const seen = Array(garden.length)
    .fill()
    .map(() => Array(garden[0].length).fill(false));

  let cost = 0;
  for (const [y, row] of garden.entries()) {
    for (const x of row.keys()) {
      if (!seen[y][x]) {
        const thing = flood(garden, seen, x, y);
        cost += thing[0] * (count(thing[1]) + count(thing[2]));
      }
    }
  }
  return cost;
}

export default [part1, part2];
