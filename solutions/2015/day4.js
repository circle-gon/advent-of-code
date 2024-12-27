import { md5 } from "/externals.js";

function find(input, count) {
  const req = "0".repeat(count);
  let idx = 0;
  while (true) {
    if (md5(input + idx.toString()).startsWith(req)) return idx;
    idx++;
  }
}

function part1(input) {
  return find(input, 5);
}

function part2(input) {
  return find(input, 6);
}

export default [part1, part2];
