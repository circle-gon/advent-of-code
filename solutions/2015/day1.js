function part1(input) {
  let floor = 0;
  for (const char of input) {
    if (char === "(") floor++;
    else floor--;
  }
  return floor;
}

function part2(input) {
  let floor = 0;
  let count = 0;
  for (const char of input) {
    count++;
    if (char === "(") floor++;
    else {
      floor--;
      if (floor === -1) return count;
    }
  }
  return "Bad input - Santa should hit the basement eventually.";
}

export default [part1, part2];
