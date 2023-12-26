function quadSolve(time, distance) {
  // two solutions
  const root = Math.sqrt(time ** 2 - 4 * distance);
  // lower, upper
  return [(1 / 2) * (time - root), (1 / 2) * (time + root)];
}

function parse(input) {
  const lines = input.split("\n");
  const times = lines[0]
    .slice(lines[0].indexOf(":") + 1)
    .trim()
    .split(/\s+/g)
    .map((i) => Number(i));
  const distances = lines[1]
    .slice(lines[1].indexOf(":") + 1)
    .trim()
    .split(/\s+/g)
    .map((i) => Number(i));

  return [times, distances];
}

function part1(input) {
  const [times, distances] = parse(input);

  let result = 1;
  for (let i = 0; i < times.length; i++) {
    const time = times[i],
      distance = distances[i];
    // distance formula is n*(t-n), n ms holding button
    // t-n time to complete
    const sols = quadSolve(time, distance);
    // take the upper and lower bound
    const nums = Math.ceil(sols[1]) - Math.floor(sols[0]) - 1;
    result *= nums;
  }
  return result;
}

function part2(input) {
  const [times, distances] = parse(input);

  const time = Number(times.map((i) => i.toString()).join(""));
  const distance = Number(distances.map((i) => i.toString()).join(""));

  // distance formula is n*(t-n), n ms holding button
  // t-n time to complete
  const sols = quadSolve(time, distance);
  // take the upper and lower bound
  return Math.ceil(sols[1]) - Math.floor(sols[0]) - 1;
}

export default [part1, part2]