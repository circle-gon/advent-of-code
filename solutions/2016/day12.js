import { run } from "./assembunny.js";

function part1(input) {
  return run(input, { a: 0, b: 0, c: 0, d: 0 });
}

function part2(input) {
  return run(input, { a: 0, b: 0, c: 1, d: 0 });
}

export default [part1, part2];
