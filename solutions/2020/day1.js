function parse(input) {
  return input.split("\n").map((i) => Number(i));
}

function part1(input) {
  const nums = parse(input);
  for (const num of nums) {
    for (const num2 of nums) {
      if (num + num2 === 2020) return num * num2;
    }
  }
  return "Is your input malformed?";
}

function part2(input) {
  const nums = parse(input);
  for (const num of nums) {
    for (const num2 of nums) {
      for (const num3 of nums) {
        if (num + num2 + num3 === 2020) return num * num2 * num3;
      }
    }
  }
  return "Is your input malformed?";
}

export default [part1, part2];
