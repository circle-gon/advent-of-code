function parse(input) {
  return input.split("\n").map((i) => i.split(""));
}

function count(grid, stepX, stepY) {
  let trees = 0;
  for (let i = 0; i < grid.length / stepY; i++) {
    if (grid[i * stepY][(i * stepX) % grid[0].length] === "#") trees++;
  }
  return trees;
}

function part1(input) {
  const grid = parse(input);
  return count(grid, 3, 1);
}

function part2(input) {
  const grid = parse(input);
  let treeCount = 1;
  for (const step of [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ])
    treeCount *= count(grid, ...step);
  return treeCount;
}

export default [part1, part2];
