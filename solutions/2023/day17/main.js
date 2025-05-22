import { spawnWorkerFor, format } from "/utils.js";
import worker from "./worker.js?worker&url";

const spawnWorker = spawnWorkerFor(worker);

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

function spawn(input, min, max, update, idx) {
  return spawnWorker([parse(input), min, max], idx, update);
}

function createUpdater(update) {
  let i = 0;
  const newUpdate = () => {
    update(`(${format(i++ * 1e5)} iterations done)`);
  };
  newUpdate();

  return newUpdate;
}

function part1(input, update) {
  return spawn(input, 0, 3, createUpdater(update), 0);
}

function part2(input, update) {
  return spawn(input, 4, 10, createUpdater(update), 1);
}

export default [part1, part2];
