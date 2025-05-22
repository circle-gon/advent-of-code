function parse(input) {
  return input.split("\n").map((i) => Number(i));
}

function part1(input) {
  return parse(input).reduce((a, b) => a + b, 0);
}

function part2(input) {
  const dups = new Set([0]);
  const nums = parse(input);
  let freq = 0;
  let idx = 0;
  while (true) {
    freq += nums[idx % nums.length];
    if (dups.has(freq)) return freq;
    dups.add(freq);
    idx++;
  }
}

export default [part1, part2];
