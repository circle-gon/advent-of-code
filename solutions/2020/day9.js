function parse(input) {
  return input.split("\n").map((i) => Number(i));
}

function getInvalid(numbers, len) {
  const nums = numbers.slice(0, len);
  for (let i = len; i < numbers.length; i++) {
    let works = false;
    for (let j = 0; j < len; j++) {
      for (let k = 0; k < j; k++) {
        if (nums[j] + nums[k] === numbers[i]) works = true;
      }
    }
    if (!works) return i;
    nums.shift();
    nums.push(numbers[i]);
  }
  return "Is your input malformed?";
}

function part1(input, _, example) {
  const numbers = parse(input);
  return numbers[getInvalid(numbers, example ? 5 : 25)];
}

function part2(input, _, example) {
  const numbers = parse(input);
  const idx = getInvalid(numbers, example ? 5 : 25);
  if (typeof idx === "string") return idx;
  for (let i = 0; i < idx; i++) {
    let sum = 0;
    for (let j = i; j < idx; j++) {
      sum += numbers[j];
      if (sum === numbers[idx]) {
        const range = numbers.slice(i, j + 1);
        return Math.min(...range) + Math.max(...range);
      }
    }
  }
  return "Is your input malformed?";
}

export default [part1, part2];
