import { gridSteps } from "./shared.js";

function expand(cells) {
  const startX = cells.findIndex((i) => i.includes("S"));
  const startY = cells[startX].indexOf("S");
  const rows = cells.length;
  const cols = cells[0].length;

  // Remove the S
  cells[startX][startY] = ".";

  // Expand 5x wide
  for (const line of cells) {
    const copy = [...line];
    for (let i = 0; i < 4; i++) line.push(...copy);
  }

  // Expand 5x down
  const entire = [...cells];
  for (let i = 0; i < 4; i++) cells.push(...structuredClone(entire));

  // Put the S back in
  cells[rows * 2 + startX][cols * 2 + startY] = "S";
}

function neville(points, x) {
  const n = points.length - 1;

  function p(i, j, x) {
    if (i === j) {
      return points[i][1];
    }

    return (
      ((points[j][0] - x) * p(i, j - 1, x) +
        (x - points[i][0]) * p(i + 1, j, x)) /
      (points[j][0] - points[i][0])
    );
  }

  if (points.length === 0) {
    return 0;
  }
  return p(0, n, x);
}

// Apparently the resulting value is quadratic with f(x)
// f(x) = cells for 65 + 131*x
function solve(cells) {
  // expand it by 5 (big enough)
  expand(cells);

  // Find the steps for f(0), f(1), and f(2)
  const set = new Set();
  const f = Array(3)
    .fill()
    .map((_, i) => {
      self.postMessage({
        type: "msg",
      });
      
      const v = [i, gridSteps(cells, i === 0 ? 65 : 131, set)];

      return v;
    });

  return neville(f, (26501365 - 65) / 131);
}

self.addEventListener("message", (e) => {
  self.postMessage({
    type: "done",
    data: solve(e.data),
  });
});
