function part1(input) {
  const num = Number(input);
  const ring = Math.ceil((Math.sqrt(num) - 1) / 2);
  const edgedist = Math.min(
    ...Array(4)
      .fill()
      .map((_, i) => Math.abs(num - (2 * ring + 1) ** 2 + 2 * i * ring + ring)),
  );
  return ring + edgedist;
}

function hash(x, y) {
  return `${x},${y}`;
}

function getSum(maps, x, y) {
  let sum = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const dir = hash(x + i, y + j);
      if (maps.has(dir)) sum += maps.get(dir);
    }
  }
  return sum;
}

function makeTable(size) {
  const maps = new Map([[hash(0, 0), 1]]);
  let x = 1,
    y = 0;
  for (let i = 1; i < size; i++) {
    while (y <= i) {
      maps.set(hash(x, y), getSum(maps, x, y));
      y++;
    }
    y--;
    while (x >= -i) {
      maps.set(hash(x, y), getSum(maps, x, y));
      x--;
    }
    x++;
    while (y >= -i) {
      maps.set(hash(x, y), getSum(maps, x, y));
      y--;
    }
    y++;
    while (x <= i) {
      maps.set(hash(x, y), getSum(maps, x, y));
      x++;
    }
  }
  return maps;
}

function part2(input) {
  const num = Number(input);
  return [...makeTable(5).values()].find((i) => i > num);
}

export default [part1, part2];
