function solve(input, part1) {
  const serial = Number(input);
  const grid = Array(300)
    .fill()
    .map(() => Array(300));
  const prefix = Array(300)
    .fill()
    .map(() => Array(300));
  for (let y = 0; y < 300; y++) {
    for (let x = 0; x < 300; x++) {
      const rack = x + 11;
      const power =
        Math.floor((((rack * (y + 1) + serial) * rack) % 1000) / 100) - 5;
      grid[y][x] = power;
    }
  }
  
  for (let y = 0; y < 300; y++) {
    for (let x = 0; x < 300; x++) {
      const a = y > 0 ? prefix[y - 1][x] : 0
      const b = x > 0 ? prefix[y][x - 1] : 0
      const c = y > 0 && x > 0 ? prefix[y - 1][x - 1] : 0
      prefix[y][x] = a + b - c + grid[y][x]
    }
  }

  let max = 0,
    coord = "";
  for (let y = 0; y < 297; y++) {
    for (let x = 0; x < 297; x++) {
      const dims = part1 ? 3 : 300 - Math.max(x, y);
      for (let d = (part1 ? 2 : 0); d < dims; d++) {
        const a = y > 0 ? prefix[y - 1][x + d] : 0
        const b = x > 0 ? prefix[y + d][x - 1] : 0
        const c = y > 0 && x > 0 ? prefix[y - 1][x - 1] : 0
        const total = prefix[y + d][x + d] - a - b + c
        if (total > max) {
          max = total;
          coord = `${x + 1},${y + 1}`;
          if (!part1) coord += `,${d + 1}`
        }
      }
    }
  }
  return coord;
}

function part1(input) {
  return solve(input, true)
}

function part2(input) {
  return solve(input, false)
}

export default [part1, part2];
