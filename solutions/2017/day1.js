function parse(input) {
  return input.split("").map((i) => Number(i));
}

function part1(input) {
  const nums = parse(input);
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i];
    const next = nums[(i + 1) % nums.length];
    if (curr === next) sum += curr;
  }
  return sum;
}

function part2(input) {
  const nums = parse(input);
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i];
    const next = nums[(i + nums.length / 2) % nums.length];
    if (curr === next) sum += curr;
  }
  return sum;
}

export default [part1, part2];
