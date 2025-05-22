function parse(input) {
  const out = [];
  for (const line of input.split("\n")) {
    out.push(
      line
        .split("")
        .map((i) =>
          i === " " ? false : ["+", "-", "|"].includes(i) ? true : i,
        ),
    );
  }
  return out;
}

function part1(input) {
  const route = parse(input);
  let x = route[0].indexOf(true);
  let y = 0;
  let dir = 2;
  let path = "";
  while (true) {
    let moved = false;
    switch (dir) {
      case 0:
        if (route[y - 1][x]) {
          y--;
          moved = true;
        }
        break;
      case 1:
        if (route[y][x + 1]) {
          x++;
          moved = true;
        }
        break;
      case 2:
        if (route[y + 1][x]) {
          y++;
          moved = true;
        }
        break;
      case 3:
        if (route[y][x - 1]) {
          x--;
          moved = true;
        }
        break;
      default:
        throw new Error("What?");
    }
    if (moved) {
      if (route[y][x] !== true) path += route[y][x];
    } else {
      // Find new directions
      if (dir !== 2 && route[y - 1][x]) dir = 0;
      else if (dir !== 3 && route[y][x + 1]) dir = 1;
      else if (dir !== 0 && route[y + 1][x]) dir = 2;
      else if (dir !== 1 && route[y][x - 1]) dir = 3;
      else break;
    }
  }
  return path;
}

function part2(input) {
  const route = parse(input);
  let x = route[0].indexOf(true);
  let y = 0;
  let dir = 2;
  let steps = 1;
  while (true) {
    let moved = false;
    switch (dir) {
      case 0:
        if (route[y - 1][x]) {
          y--;
          moved = true;
        }
        break;
      case 1:
        if (route[y][x + 1]) {
          x++;
          moved = true;
        }
        break;
      case 2:
        if (route[y + 1][x]) {
          y++;
          moved = true;
        }
        break;
      case 3:
        if (route[y][x - 1]) {
          x--;
          moved = true;
        }
        break;
      default:
        throw new Error("What?");
    }
    if (moved) {
      steps++;
    } else {
      // Find new directions
      if (dir !== 2 && route[y - 1][x]) dir = 0;
      else if (dir !== 3 && route[y][x + 1]) dir = 1;
      else if (dir !== 0 && route[y + 1][x]) dir = 2;
      else if (dir !== 1 && route[y][x - 1]) dir = 3;
      else break;
    }
  }
  return steps;
}

export default [part1, part2];
