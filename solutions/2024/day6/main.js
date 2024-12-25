import { valid } from "./shared.js";
import { spawnWorkerFor, format } from "/utils.js";

function parse(input) {
  const out = [];
  for (const line of input.split("\n")) {
    out.push(line.split(""));
  }

  return out;
}

function part1(input) {
  const parsed = parse(input);
  return valid(parsed).length;
}

const spawnWorker = spawnWorkerFor(import.meta.resolve("./worker.js"));

function part2(input, update) {
  const parsed = parse(input)
  let j = 0;
  const size = valid(parsed).length
  const newUpdate = () => {
    update(`(${format(j++ * 1000)} / ${format(size)} obstacles done)`);
  };
  newUpdate();

  return spawnWorker(parsed, 0, newUpdate);
}

export default [part1, part2];
