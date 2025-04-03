function parse(input) {
  const states = new Map();
  for (const line of input.split("\n")) {
    const [num, range] = line.split(": ").map((i) => Number(i));
    states.set(num, range - 1);
  }
  return states;
}

function severity(states, delay, part2) {
  let score = 0;
  for (const [i, range] of states.entries()) {
    const actual = (i + delay) % (2 * range);
    const current = actual > range ? 2 * range - actual : actual;
    if (current === 0) {
      if (part2) return true;
      score += i * (range + 1);
    }
  }
  return part2 ? false : score;
}

function part1(input) {
  const states = parse(input);
  return severity(states, 0, false);
}

function part2(input) {
  const states = parse(input);
  let delay = 0;
  while (true) {
    if (!severity(states, delay, true)) return delay;
    delay++;
  }
}

export default [part1, part2];
