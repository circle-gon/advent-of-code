import { spawnWorkerFor, format } from "/utils.js";
import { run } from "./shared.js";
import worker from "./worker.js?worker&url";

const spawnWorker = spawnWorkerFor(worker);

function part1(input) {
  return run(input, 0, () => {});
}

function part2(input, updater) {
  function update([idx, hashes]) {
    updater(`(found key ${hashes}/64 at index ${format(idx)})`);
  }
  update([0, 0]);

  return spawnWorker(input, 0, update);
}

export default [part1, part2];
