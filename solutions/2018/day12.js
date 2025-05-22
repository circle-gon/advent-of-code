function parse(input) {
  const lines = input.split("\n");
  const state = lines[0].slice(15);
  const map = new Map();
  for (const line of lines.slice(2)) {
    const [from, to] = line.split(" => ");
    map.set(from, to);
  }
  return { state, map };
}

function solve(input, part1) {
  let { state, map } = parse(input);
  let off = 0;

  for (let i = 0; i < (part1 ? 20 : 100); i++) {
    let next = "";
    for (let j = -2; j < state.length + 2; j++) {
      let current = "";
      for (let k = j - 2; k <= j + 2; k++) {
        current += k < 0 || k >= state.length ? "." : state[k];
      }
      const val = map.get(current);
      if ((j >= 0 && j < state.length) || val !== ".") {
        next += map.get(current);
        if (j < 0) off++;
      }
    }

    if (next === "." + state) {
      let sum = 0;
      let count = 0;

      for (let i = 0; i < state.length; i++) {
        if (state[i] === "#") {
          sum += i - off;
          count++;
        }
      }
      return sum + (5e10 - i) * count;
    }
    state = next;
  }

  let sum = 0;
  for (let i = 0; i < state.length; i++) {
    if (state[i] === "#") sum += i - off;
  }
  return sum;
}

function part1(input) {
  return solve(input, true)
}

function part2(input) {
  return solve(input, false)
}

export default [part1, part2];
