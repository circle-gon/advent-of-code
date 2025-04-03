function hash(x, y) {
  return `${x},${y}`;
}

function parse(input) {
  const grid = input.split("\n").map((i) => i.split(""));
  const centerY = (grid.length - 1) / 2;
  const centerX = (grid[0].length - 1) / 2;
  const out = new Map();
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      out.set(hash(j - centerX, i - centerY), grid[i][j] === "#" ? 2 : 0);
    }
  }
  return out;
}

function run(input, part1) {
  const grid = parse(input);
  let x = 0;
  let y = 0;
  let dir = 0;
  let count = 0;

  for (let i = 0; i < (part1 ? 10000 : 1e7); i++) {
    const h = hash(x, y);
    const status = grid.get(h) ?? 0;

    if (status === 0) {
      dir = (dir + 3) % 4;
      if (part1) count++;
    } else if (status === 1) count++;
    else if (status === 2) dir = (dir + 1) % 4;
    else if (status === 3) dir = (dir + 2) % 4;

    grid.set(h, (status + (part1 ? 2 : 1)) % 4);

    switch (dir) {
      case 0:
        y--;
        break;
      case 1:
        x++;
        break;
      case 2:
        y++;
        break;
      case 3:
        x--;
        break;
      default:
        throw new Error("What?");
    }
  }

  return count;
}

function part1(input) {
  return run(input, true);
}

function part2(input) {
  return run(input, false);
}

export default [part1, part2];
