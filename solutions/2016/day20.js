function parse(input) {
  const nums = [];
  for (const line of input.split("\n")) {
    nums.push(line.split("-").map((i) => Number(i)));
  }
  return nums.sort((a, b) => a[0] - b[0]);
}

function part1(input) {
  const nums = parse(input);
  let lowClear = 0;
  for (const num of nums) {
    if (lowClear < num[0]) return lowClear;
    lowClear = Math.max(lowClear, num[1] + 1);
  }

  return "Is your input malformed?";
}

function part2(input, _, example) {
  const nums = parse(input);
  const max = example ? 9 : 2 ** 32 - 1;
  let lowClear = 0;
  let count = 0;
  for (const num of nums) {
    if (lowClear < num[0]) count += num[0] - lowClear;
    lowClear = Math.max(lowClear, num[1] + 1);
  }

  count += max - lowClear + 1;

  return count;
}

export default [part1, part2];
