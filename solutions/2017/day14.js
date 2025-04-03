import { knotHash } from "./day10.js";

function bitCount32(n) {
  n = n - ((n >> 1) & 0x55555555);
  n = (n & 0x33333333) + ((n >> 2) & 0x33333333);
  return (((n + (n >> 4)) & 0xf0f0f0f) * 0x1010101) >> 24;
}

function part1(input) {
  let used = 0;
  for (let i = 0; i < 128; i++) {
    const hash = knotHash(input + "-" + i);
    for (let i = 0; i < hash.length; i += 8) {
      const num = parseInt(hash.slice(i, i + 8), 16);
      used += bitCount32(num);
    }
  }
  return used;
}

function flood(nums, seen, x, y) {
  const stack = [[x, y]];
  while (stack.length > 0) {
    const [x, y] = stack.pop();
    if (
      x < 0 ||
      y < 0 ||
      y >= nums.length ||
      x >= nums[0].length ||
      seen[y][x] ||
      !nums[y][x]
    )
      continue;
    seen[y][x] = true;

    stack.push([x - 1, y]);
    stack.push([x + 1, y]);
    stack.push([x, y + 1]);
    stack.push([x, y - 1]);
  }
}

function part2(input) {
  const nums = [];
  for (let i = 0; i < 128; i++) {
    const hash = knotHash(input + "-" + i);
    const row = [];
    for (let i = 0; i < hash.length; i += 8) {
      const num = parseInt(hash.slice(i, i + 8), 16);
      for (let i = 31; i >= 0; i--) {
        const mask = 1 << i;
        row.push((num & mask) === mask ? 1 : 0);
      }
    }
    nums.push(row);
  }

  const seen = Array(nums.length)
    .fill()
    .map(() => Array(nums[0].length).fill(false));
  let groups = 0;

  for (let x = 0; x < 128; x++) {
    for (let y = 0; y < 128; y++) {
      if (seen[y][x] || !nums[y][x]) continue;
      groups++;
      flood(nums, seen, x, y);
    }
  }

  return groups;
}

export default [part1, part2];
