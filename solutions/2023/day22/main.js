import { spawnWorkerFor, format } from "/utils.js";
import w1 from "./w1.js?worker&url";
import w2 from "./w2.js?worker&url";

function numify(str) {
  return str.split(",").map((i) => Number(i));
}

function parse(input) {
  const blocks = [];
  for (const line of input.split("\n")) {
    const [c1, c2] = line.split("~");
    const [x0, y0, z0] = numify(c1);
    const [x1, y1, z1] = numify(c2);

    // x0 is always less than x1, etc.
    blocks.push([
      [x0, x1],
      [y0, y1],
      [z0, z1],
    ]);
  }

  return blocks;
}

function run(input, u, create) {
  const blocks = parse(input);

  let i = 0;
  const update = () => {
    u(`(${format(10 * i++)}/${format(blocks.length)} cubes done)`);
  };

  update();
  return create(blocks, 0, update);
}

const spawn1 = spawnWorkerFor(w1);
function part1(input, u) {
  return run(input, u, spawn1);
}

const spawn2 = spawnWorkerFor(w2);
function part2(input, u) {
  return run(input, u, spawn2);
}

export default [part1, part2];
