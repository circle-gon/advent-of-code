function parse(input) {
  return input.split(",");
}

function dist(x, y) {
  const rX = Math.abs(x);
  const rY = Math.abs(y);
  const together = Math.min(rX, rY);
  const apart = (Math.max(rX, rY) - together) / 2;
  return together + apart;
}

function part1(input) {
  const steps = parse(input);
  let x = 0;
  let y = 0;
  for (const step of steps) {
    switch (step) {
      case "n":
        y += 2;
        break;
      case "ne":
        x++;
        y++;
        break;
      case "se":
        x++;
        y--;
        break;
      case "s":
        y -= 2;
        break;
      case "sw":
        x--;
        y--;
        break;
      case "nw":
        x--;
        y++;
        break;
      default:
        throw new Error("What?");
    }
  }

  return dist(x, y);
}

function part2(input) {
  const steps = parse(input);
  let x = 0;
  let y = 0;
  let max = 0;
  for (const step of steps) {
    switch (step) {
      case "n":
        y += 2;
        break;
      case "ne":
        x++;
        y++;
        break;
      case "se":
        x++;
        y--;
        break;
      case "s":
        y -= 2;
        break;
      case "sw":
        x--;
        y--;
        break;
      case "nw":
        x--;
        y++;
        break;
      default:
        throw new Error("What?");
    }

    max = Math.max(max, dist(x, y));
  }

  return max;
}

export default [part1, part2];
