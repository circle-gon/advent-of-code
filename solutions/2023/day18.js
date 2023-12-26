function hash(a) {
  return `${a[0]},${a[1]}`;
}

// Shoelace formula taken from GeeksForGeeks
function shoelace(points) {
  let x = 0,
    y = 0,
    area = 0,
    perimeter = 0;
  for (const point of points) {
    const [num, dir] = point;
    const last = [x, y];
    if (["D", "U"].includes(dir)) {
      y += num * (dir === "U" ? -1 : 1);
    } else {
      x += num * (dir === "L" ? -1 : 1);
    }

    perimeter += num;
    area += last[0] * y - last[1] * x;
  }

  return Math.abs(area / 2) + perimeter / 2 + 1;
}

function parse(input) {
  const steps = [];
  for (const line of input.split("\n")) {
    const parts = line.split(" ");

    steps.push([Number(parts[1]), parts[0]]);
  }

  return steps;
}

function part1(input) {
  return shoelace(parse(input));
}

function part2(input) {
  const steps = parse(input);

  const points = [];
  for (const step of steps) {
    const num = parseInt(step.slice(0, 5), 16);
    let dir;
    switch (step[5]) {
      case "0":
        dir = "R";
        break;
      case "1":
        dir = "D";
        break;
      case "2":
        dir = "L";
        break;
      case "3":
        dir = "U";
        break;
      default:
        throw new Error("what");
    }
    points.push([num, dir]);
  }

  return shoelace(points);
}

export default [part1, part2]