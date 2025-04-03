function floorLog(num, base) {
  return base ** Math.floor(Math.log(num) / Math.log(base));
}

// Magic????
function part1(input) {
  const num = Number(input);
  return 2 * (num - floorLog(num, 2)) + 1;
}

function part2(input) {
  const num = Number(input);
  return num - floorLog(num, 3);
}

export default [part1, part2];
