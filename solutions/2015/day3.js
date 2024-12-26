function hash(x, y) {
  return `${x},${y}`;
}

function part1(input) {
  const visit = new Set();

  let x = 0,
    y = 0;
  visit.add(hash(0, 0));

  for (const dir of input) {
    if (dir === ">") x++;
    if (dir === "<") x--;
    if (dir === "^") y--;
    if (dir === "v") y++;
    visit.add(hash(x, y));
  }

  return visit.size;
}

function part2(input) {
  const visit = new Set();

  let x = 0,
    y = 0,
    rx = 0,
    ry = 0;
  visit.add(hash(0, 0));

  for (let i = 0; i < input.length; i += 2) {
    let dir = input[i];
    let rdir = input[i + 1];
    if (dir === ">") x++;
    if (dir === "<") x--;
    if (dir === "^") y--;
    if (dir === "v") y++;
    if (rdir === ">") rx++;
    if (rdir === "<") rx--;
    if (rdir === "^") ry--;
    if (rdir === "v") ry++;
    visit.add(hash(x, y));
    visit.add(hash(rx, ry));
  }

  return visit.size;
}

export default [part1, part2];
