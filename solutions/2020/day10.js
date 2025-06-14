function parse(input) {
  const nums = input.split("\n").map((i) => Number(i));
  nums.sort((a, b) => a - b);
  nums.unshift(0);
  nums.push(nums.at(-1) + 3);
  return nums;
}

function part1(input) {
  const nums = parse(input);
  let one = 0,
    three = 0;
  for (let i = 1; i < nums.length; i++) {
    const diff = nums[i] - nums[i - 1];
    if (diff === 1) one++;
    else if (diff === 3) three++;
  }
  return one * three;
}

function part2(input) {
  const nums = parse(input);
  let count = 0;
  let ways = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] + 1 === nums[i]) count++;
    else {
      count = Math.max(count - 1, 0);
      ways *= 2 ** count - (count >= 3 ? 1 : 0);
      count = 0;
    }
  }
  return ways;
}

export default [part1, part2];
