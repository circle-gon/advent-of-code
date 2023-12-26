import { spawnWorkerFor } from "/utils.js";
import { mapTo } from "./shared.js";

function parse(input) {
  const lines = input.split("\n");
  const seeds = lines[0]
    .slice(7)
    .split(" ")
    .map((i) => Number(i));
  const headers = lines
    .map((_, i) => i)
    .filter((i) => lines[i].includes("map:"));
  const data = [];
  for (const ind of headers.keys()) {
    data.push(
      lines
        .slice(headers[ind] + 1, (headers[ind + 1] ?? lines.length + 1) - 1)
        .map((i) => i.split(" ").map((j) => Number(j)))
    );
  }

  return [seeds, data];
}

function part1(input) {
  const [seeds, data] = parse(input);

  let lowestLoc = Infinity;
  for (const seed of seeds) {
    const loc = data.reduce((num, replacer) => mapTo(num, replacer), seed);
    lowestLoc = Math.min(lowestLoc, loc);
  }
  return lowestLoc;
}

const spawnWorker = spawnWorkerFor("solutions/sol5/worker.js");

async function part2(input, update) {
  const lines = input.split("\n");
  const [seedRanges, data] = parse(input);

  let lowestLoc = Infinity;

  const bulk = [];
  for (let i = 0; i < seedRanges.length / 2; i++) {
    bulk.push([seedRanges[2 * i], seedRanges[2 * i + 1]]);
  }

  // spawn a bunch of workers
  let j = 0;
  const newUpdate = () => {
    update(`(${j++} / ${bulk.length} seed ranges done)`);
  };
  newUpdate();

  // find the lowest of them all
  return (
    await Promise.all(
      bulk.map((i, idx) => spawnWorker([...i, data], idx, newUpdate))
    )
  ).reduce((a, b) => Math.min(a, b));
}

export default [part1, part2]