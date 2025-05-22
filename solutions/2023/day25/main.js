import { spawnWorkerFor } from "/utils.js";

const spawnWorker = spawnWorkerFor(import.meta.resolve("./worker.js"));

function part1(input, u) {
  let i = 0;
  const update = () => {
    i++;
    if (i <= 3) u(`(Finding used edge ${i})`);
    else u("Finding result...");
  };

  return spawnWorker(input, 0, update);
}

export default [part1];
