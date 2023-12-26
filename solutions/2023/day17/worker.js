// With help from https://github.com/pvainio/adventofcode/blob/main/2023/js/day17.js

const next = { R: [1, 0], L: [-1, 0], U: [0, -1], D: [0, 1], "": [0, 0] };
function nextXY(x, y, dir) {
  return [x + next[dir][0], y + next[dir][1]];
}

const opposite = { R: "L", L: "R", U: "D", D: "U" };
function getPossibleDirs(dir) {
  return ["R", "D", "U", "L"].filter((d) => d !== opposite[dir]);
}

function hash(x, y, dir, dirSteps) {
  return `${x},${y},${dir},${dirSteps}`;
}

function shortestPath(map, minSteps, maxSteps) {
  const visited = new Map();
  const queue = [{ x: 0, y: 0, dir: "", dirSteps: minSteps, temp: -map[0][0] }];
  let min = Infinity;

  let iters = 0;

  while (queue.length > 0) {
    const { x: ox, y: oy, dir, dirSteps, temp: prevTemp } = queue.pop();

    iters++;

    if (iters % 10000 === 0) self.postMessage({ type: "msg" });

    const [x, y] = nextXY(ox, oy, dir);

    if (x < 0 || y < 0 || x >= map[0].length || y >= map.length) continue;
    if (dirSteps > maxSteps) continue;

    const temp = prevTemp + map[y][x];
    if (temp >= min) continue;

    const h = hash(x, y, dir, dirSteps);
    const prev = visited.get(h);
    if (prev && prev <= temp) continue;
    visited.set(h, temp);

    if (
      dirSteps >= minSteps &&
      x === map[0].length - 1 &&
      y === map.length - 1
    ) {
      min = Math.min(min, temp); // We're there!
    } else {
      const possibleDirs = dirSteps < minSteps ? [dir] : getPossibleDirs(dir);
      const nextSteps = possibleDirs.map((n) => ({
        x,
        y,
        dir: n,
        dirSteps: dir === n ? dirSteps + 1 : 1,
        temp,
      }));
      queue.push(...nextSteps);
      queue.sort((a, b) => b.temp - a.temp);
    }
  }
  return min;
}

self.addEventListener("message", (e) => {
  self.postMessage({
    type: "done",
    data: shortestPath(...e.data),
  });
});
