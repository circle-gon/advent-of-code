function parse(input) {
  return input.split("\n").map((i) => i.split(""));
}

function part1(input) {
  let grid = parse(input);
  while (true) {
    const nextGrid = Array(grid.length)
      .fill()
      .map(() => Array(grid[0].length).fill(""));
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        let occupied = 0;
        for (let k = -1; k <= 1; k++) {
          for (let l = -1; l <= 1; l++) {
            if (k === 0 && l === 0) continue;
            const ni = i + k;
            const nj = j + l;
            if (
              ni >= 0 &&
              nj >= 0 &&
              ni < grid.length &&
              nj < grid[0].length &&
              grid[ni][nj] === "#"
            )
              occupied++;
          }
        }
        if (grid[i][j] === "L" && occupied === 0) nextGrid[i][j] = "#";
        else if (grid[i][j] === "#" && occupied >= 4) nextGrid[i][j] = "L";
        else nextGrid[i][j] = grid[i][j];
      }
    }
    if (nextGrid.every((i, j) => i.every((k, l) => k === grid[j][l])))
      return grid.reduce(
        (a, b) => a + b.reduce((c, d) => c + (d === "#" ? 1 : 0), 0),
        0,
      );
    grid = nextGrid;
  }
}

function part2(input) {
  let grid = parse(input);
  while (true) {
    const nextGrid = Array(grid.length)
      .fill()
      .map(() => Array(grid[0].length).fill(""));
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        let occupied = 0;
        for (let k = -1; k <= 1; k++) {
          for (let l = -1; l <= 1; l++) {
            if (k === 0 && l === 0) continue;
            let ni = i + k;
            let nj = j + l;
            while (
              ni >= 0 &&
              nj >= 0 &&
              ni < grid.length &&
              nj < grid[0].length
            ) {
              if (grid[ni][nj] !== ".") {
                if (grid[ni][nj] === "#") occupied++;
                break;
              }
              ni += k;
              nj += l;
            }
          }
        }
        if (grid[i][j] === "L" && occupied === 0) nextGrid[i][j] = "#";
        else if (grid[i][j] === "#" && occupied >= 5) nextGrid[i][j] = "L";
        else nextGrid[i][j] = grid[i][j];
      }
    }
    if (nextGrid.every((i, j) => i.every((k, l) => k === grid[j][l])))
      return grid.reduce(
        (a, b) => a + b.reduce((c, d) => c + (d === "#" ? 1 : 0), 0),
        0,
      );
    grid = nextGrid;
  }
}

export default [part1, part2];
