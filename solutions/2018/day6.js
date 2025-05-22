function parse(input) {
  return input.split("\n").map((i) => i.split(", ").map((i) => Number(i)));
}

function checkBad(i, j, nums) {
  const dists = nums
    .map(([x, y], k) => [Math.abs(x - i) + Math.abs(y - j), k])
    .sort((a, b) => a[0] - b[0]);
  const first = dists[0];
  return first[0] < dists[1][0] ? first[1] : -1;
}

function part1(input) {
  const nums = parse(input);
  const bad = new Set();
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

  for (const [x, y] of nums) {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }

  for (let i = minX; i <= maxX; i++) bad.add(checkBad(i, minY, nums));
  for (let i = minX; i <= maxX; i++) bad.add(checkBad(i, maxY, nums));
  for (let i = minY + 1; i < maxY; i++) bad.add(checkBad(minX, i, nums));
  for (let i = minY + 1; i < maxY; i++) bad.add(checkBad(maxX, i, nums));

  const count = Array(nums.length).fill(0);

  for (let i = minX; i <= maxX; i++) {
    for (let j = minY; j <= maxY; j++) {
      const dists = nums
        .map(([x, y], k) => [Math.abs(x - i) + Math.abs(y - j), k])
        .sort((a, b) => a[0] - b[0]);
      const first = dists[0];
      if (first[0] < dists[1][0] && !bad.has(first[1])) count[first[1]]++;
    }
  }

  return Math.max(...count);
}

function part2(input, _, example) {
  const req = example ? 32 : 10000;
  const nums = parse(input);
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

  for (const [x, y] of nums) {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }

  let count = 0;
  for (let i = minX - 200; i <= maxX + 200; i++) {
    for (let j = minY - 200; j <= maxY + 200; j++) {
      const dists = nums
        .map(([x, y]) => Math.abs(x - i) + Math.abs(y - j))
        .reduce((a, b) => a + b, 0);
      if (dists < req) count++;
    }
  }

  return count;
}

export default [part1, part2];
