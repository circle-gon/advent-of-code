function parse(input) {
  return input.split("\n").map((i) => i.split(""));
}

function part1(input) {
  const lines = parse(input);
  const tiles = new Set();
  for (const line of lines) {
    let x = 0,
      y = 0;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      switch (char) {
        case "e":
          x += 2;
          break;
        case "w":
          x -= 2;
          break;
        case "s":
          i++;
          y--;
          x += line[i] === "e" ? 1 : -1;
          break;
        case "n":
          i++;
          y++;
          x += line[i] === "e" ? 1 : -1;
          break;
        default:
          throw new Error("what");
      }
    }
    const key = `${x},${y}`;
    if (tiles.has(key)) tiles.delete(key);
    else tiles.add(key);
  }
  return tiles.size;
}

const ADJACENT = [
  [-2, 0],
  [-1, 1],
  [-1, -1],
  [2, 0],
  [1, 1],
  [1, -1],
];

function part2(input) {
  const lines = parse(input);
  let tiles = new Set();
  for (const line of lines) {
    let x = 0,
      y = 0;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      switch (char) {
        case "e":
          x += 2;
          break;
        case "w":
          x -= 2;
          break;
        case "s":
          i++;
          y--;
          x += line[i] === "e" ? 1 : -1;
          break;
        case "n":
          i++;
          y++;
          x += line[i] === "e" ? 1 : -1;
          break;
        default:
          throw new Error("what");
      }
    }
    const key = `${x},${y}`;
    if (tiles.has(key)) tiles.delete(key);
    else tiles.add(key);
  }
  for (let i = 0; i < 100; i++) {
    const nextSet = new Set();
    const toCheck = new Set();
    for (const tile of tiles) {
      const [x, y] = tile.split(",").map((i) => Number(i));
      toCheck.add(tile);
      for (const [xloc, yloc] of ADJACENT) {
        toCheck.add(`${x + xloc},${y + yloc}`);
      }
    }
    for (const check of toCheck) {
      const [x, y] = check.split(",").map((i) => Number(i));
      let count = 0;
      for (const [xloc, yloc] of ADJACENT) {
        if (tiles.has(`${x + xloc},${y + yloc}`)) count++;
      }
      if (count === 2 || (tiles.has(check) && count === 1)) nextSet.add(check);
    }
    tiles = nextSet;
  }
  return tiles.size;
}

export default [part1, part2];
