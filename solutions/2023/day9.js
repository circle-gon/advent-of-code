function part1(input) {
  let sum = 0;
  for (const line of input.split("\n")) {
    let numbers = line.split(" ").map((i) => Number(i));
    const differences = [numbers.at(-1)];
    // map each number onto its difference
    while (!numbers.every((i) => i === 0)) {
      const diffMap = [];
      for (let i = 1; i < numbers.length; i++) {
        diffMap.push(numbers[i] - numbers[i - 1]);
      }
      differences.push(diffMap.at(-1));
      numbers = diffMap;
    }

    sum += differences.reduce((a, b) => a + b);
  }
  return sum;
}

function part2(input) {
  let sum = 0;
  for (const line of input.split("\n")) {
    let numbers = line.split(" ").map((i) => Number(i));
    const differences = [numbers[0]];
    // map each number onto its difference
    while (!numbers.every((i) => i === 0)) {
      const diffMap = [];
      for (let i = 1; i < numbers.length; i++) {
        diffMap.push(numbers[i] - numbers[i - 1]);
      }
      differences.push(diffMap[0]);
      numbers = diffMap;
    }

    sum += differences.reduce(
      (sum, number, idx) => sum + number * (-1) ** idx,
      0
    );
  }
  return sum;
}

export default [part1, part2]