import { gridSteps } from "./shared.js";
import { spawnWorkerFor } from "/utils.js";

function parse(input) {
  const cells = [];
  for (const line of input.split("\n")) {
    const row = [];
    for (const cell of line) {
      row.push(cell);
    }
    cells.push(row);
  }

  return cells;
}

function part1(input) {
  return gridSteps(parse(input), 64);
}

const spawnWorker = spawnWorkerFor("solutions/sol21/worker.js");

function part2(input, u) {
  let i = 0;
  const update = () => {
    u(`(f(${i++}) started)`);
  };

  return spawnWorker(parse(input), 0, update);
}

export default [part1, part2]