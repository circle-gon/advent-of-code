import { run } from "./assembunny.js";

function part1(input) {
  for (let a = 0; a < 1000; a++) {
    let next = 0;
    let times = 0;
    run(input, { a, b: 0, c: 0, d: 0 }, (v) => {
      if (v === next) {
        times++;
        next = next === 1 ? 0 : 1;
        return times >= 20;
      }
      return true;
    });
    if (times >= 20) return a;
  }
  return "Is your input malformed?";
}

export default [part1];
