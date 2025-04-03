import { run } from "./assembunny.js";

function part1(input, _, example) {
  return run(input, { a: example ? 0 : 7, b: 0, c: 0, d: 0 });
}

function part2(input) {
  return run(input, { a: 12, b: 0, c: 0, d: 0 });
}

export default [part1, part2];
