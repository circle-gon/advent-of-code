import { spawnWorkerFor, format } from "/utils.js";

const spawnWorker = spawnWorkerFor("solutions/sol17/worker.js");

function parse(input) {
  const map = [];
  for (const line of input.split("\n")) {
    const row = [];
    for (const c of line) {
      row.push(Number(c));
    }
    map.push(row);
  }

  return map;
}

function spawn(input, min, max, update) {
  return spawnWorker([parse(input), min, max], 0, update);
}

function createUpdater(update) {
  let i = 0;
  const newUpdate = () => {
    update(`(${format(i++ * 10000)} iterations done)`);
  };
  newUpdate();

  return newUpdate;
}

function part1(input, update) {
  return spawn(input, 0, 3, createUpdater(update));
}

function part2(input, update) {
  return spawn(input, 4, 10, createUpdater(update));
}

export default [part1, part2]