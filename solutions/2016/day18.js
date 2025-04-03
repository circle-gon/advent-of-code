function isSafe(left, middle, right) {
  return !(
    (!left && !middle && right) ||
    (left && !middle && !right) ||
    (!left && middle && right) ||
    (left && middle && !right)
  );
}

function check(input, size) {
  let prevRow = input.split("").map((i) => i === ".");
  let safe = prevRow.reduce((a, b) => a + (b ? 1 : 0), 0);

  for (let i = 1; i < size; i++) {
    const nextRow = []
    for (let j = 0; j < input.length; j++) {
      const left = prevRow[j - 1] ?? true;
      const middle = prevRow[j];
      const right = prevRow[j + 1] ?? true;
      const good = isSafe(left, middle, right)
      if (good) safe++
      nextRow.push(good)
    }
    prevRow = nextRow
  }
  return safe;
}

function part1(input, _, example) {
  return check(input, example ? 10 : 40)
}

function part2(input) {
  return check(input, 400000)
}

export default [part1, part2]