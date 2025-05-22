function parse(input) {
  return input.split("\n").map((i) => i.split(""));
}

function countOf(grid, x, y, type) {
  let count = 0;
  for (let i = y - 1; i <= y + 1; i++) {
    for (let j = x - 1; j <= x + 1; j++) {
      if (i === y && j === x) continue;
      if (i >= grid.length || i < 0 || j >= grid[0].length || j < 0) continue;
      if (grid[i][j] === type) count++;
    }
  }
  return count;
}

function part1(input) {
  let grid = parse(input);
  for (let i = 0; i < 10; i++) {
    const nextGrid = Array(grid.length)
      .fill()
      .map(() => Array(grid[0].length));
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
        let next = grid[y][x];
        if (grid[y][x] === ".") {
          if (countOf(grid, x, y, "|") >= 3) next = "|";
        } else if (grid[y][x] === "|") {
          if (countOf(grid, x, y, "#") >= 3) next = "#";
        } else {
          next =
            countOf(grid, x, y, "|") >= 1 && countOf(grid, x, y, "#") >= 1
              ? "#"
              : ".";
        }
        nextGrid[y][x] = next;
      }
    }

    grid = nextGrid;
  }

  const flat = grid.flat();
  return (
    flat.reduce((a, b) => a + (b === "|" ? 1 : 0), 0) *
    flat.reduce((a, b) => a + (b === "#" ? 1 : 0), 0)
  );
}

function part2(input) {
  let grid = parse(input);
  const map = new Map();
  for (let i = 0; i < 1e9; i++) {
    const nextGrid = Array(grid.length)
      .fill()
      .map(() => Array(grid[0].length));
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
        let next = grid[y][x];
        if (grid[y][x] === ".") {
          if (countOf(grid, x, y, "|") >= 3) next = "|";
        } else if (grid[y][x] === "|") {
          if (countOf(grid, x, y, "#") >= 3) next = "#";
        } else {
          next =
            countOf(grid, x, y, "|") >= 1 && countOf(grid, x, y, "#") >= 1
              ? "#"
              : ".";
        }
        nextGrid[y][x] = next;
      }
    }

    grid = nextGrid;
    const str = grid.map((i) => i.join("")).join("\n");
    if (map.has(str)) {
      const diff = i - map.get(str);
      i += Math.floor((1e9 - i) / diff) * diff;
    } else map.set(str, i);
  }

  const flat = grid.flat();
  return (
    flat.reduce((a, b) => a + (b === "|" ? 1 : 0), 0) *
    flat.reduce((a, b) => a + (b === "#" ? 1 : 0), 0)
  );
}

export default [part1, part2];
