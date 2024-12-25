function addNum(map, num, count) {
  map.set(num, (map.get(num) ?? 0) + count);
}

function parse(input) {
  const map = new Map();
  const nums = input.split(" ").map((i) => Number(i));
  // There can be duplicates in the input
  for (const num of nums) addNum(map, num, 1);
  return map;
}

function compute(input, times) {
  let stones = parse(input);
  for (let i = 0; i < times; i++) {
    const out = new Map();
    for (const [stone, count] of stones.entries()) {
      const digits = Math.floor(Math.log10(stone)) + 1;
      if (stone === 0) {
        addNum(out, 1, count);
      } else if (digits % 2 === 0) {
        const div = 10 ** (digits / 2);
        addNum(out, stone % div, count);
        addNum(out, Math.floor(stone / div), count);
      } else {
        addNum(out, stone * 2024, count);
      }
    }
    stones = out;
  }
  return [...stones.values()].reduce((a, b) => a + b);
}

function part1(input) {
  return compute(input, 25);
}

function part2(input) {
  return compute(input, 75);
}

export default [part1, part2];
