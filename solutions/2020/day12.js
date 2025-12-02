function parse(input) {
  const instrs = [];
  for (const line of input.split("\n")) {
    const cmd = line[0];
    const num = Number(line.slice(1));
    instrs.push([cmd, num]);
  }
  return instrs;
}

function part1(input) {
  const instrs = parse(input);
  let x = 0;
  let y = 0;
  let dir = 0;
  for (const [cmd, num] of instrs) {
    switch (cmd) {
      case "N":
        y += num;
        break;
      case "S":
        y -= num;
        break;
      case "E":
        x += num;
        break;
      case "W":
        x -= num;
        break;
      case "L":
        dir = (dir - num / 90 + 4) % 4;
        break;
      case "R":
        dir = (dir + num / 90) % 4;
        break;
      case "F":
        switch (dir) {
          case 0:
            x += num;
            break;
          case 1:
            y -= num;
            break;
          case 2:
            x -= num;
            break;
          case 3:
            y += num;
            break;
        }
    }
  }
  return Math.abs(x) + Math.abs(y);
}

function rotate(x, y, deg) {
  const mx = Math.cos((deg * Math.PI) / 180);
  const my = Math.sin((deg * Math.PI) / 180);
  return [x * mx - y * my, x * my + y * mx];
}

function part2(input) {
  const instrs = parse(input);
  let x = 0;
  let y = 0;
  let wx = 10;
  let wy = 1;
  for (const [cmd, num] of instrs) {
    switch (cmd) {
      case "N":
        wy += num;
        break;
      case "S":
        wy -= num;
        break;
      case "E":
        wx += num;
        break;
      case "W":
        wx -= num;
        break;
      case "L":
        [wx, wy] = rotate(wx, wy, num);
        break;
      case "R":
        [wx, wy] = rotate(wx, wy, -num);
        break;
      case "F":
        x += wx * num;
        y += wy * num;
        break;
    }
  }
  return Math.round(Math.abs(x) + Math.abs(y));
}

export default [part1, part2];
