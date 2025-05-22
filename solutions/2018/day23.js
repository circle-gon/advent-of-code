function parse(input) {
  const robots = [];
  for (const line of input.split("\n")) {
    const [a, b] = line.split(", ");
    const pos = a
      .slice(5, -1)
      .split(",")
      .map((i) => Number(i));
    const rad = Number(b.slice(2));
    robots.push([...pos, rad]);
  }
  return robots;
}

function distance(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
}

function part1(input) {
  const robots = parse(input);
  const large = robots.sort((a, b) => b[3] - a[3])[0];
  let count = 0;
  for (const robot of robots) {
    const dist = distance(robot, large);
    if (dist <= large[3]) count++;
  }
  return count;
}

function optimalPoint(robots, point, factor) {
  let optimal = [0, 0, 0],
    count = -1;
  for (let i = -3; i <= 3; i++) {
    for (let j = -3; j <= 3; j++) {
      for (let k = -3; k <= 3; k++) {
        const grid = [
          i * factor + point[0],
          j * factor + point[1],
          k * factor + point[2],
        ];

        let reach = 0;
        for (const robot of robots)
          if (distance(robot, grid) <= robot[3]) reach++;

        if (
          reach > count ||
          (reach === count &&
            distance(grid, [0, 0, 0]) < distance(optimal, [0, 0, 0]))
        ) {
          count = reach;
          optimal = grid;
        }
      }
    }
  }
  return optimal;
}

function part2(input) {
  const robots = parse(input);
  let point = [0, 0, 0];
  for (let i = 25; i >= 0; i--) point = optimalPoint(robots, point, 2 ** i);
  return distance(point, [0, 0, 0]);
}

export default [part1, part2];
