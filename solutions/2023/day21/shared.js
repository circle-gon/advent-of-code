function hash(x, y) {
  return `${x},${y}`;
}

function unhash(h) {
  return h.split(",").map((i) => Number(i));
}

export function gridSteps(cells, steps, visited = new Set()) {
  const startX = cells.findIndex((i) => i.includes("S"));
  const startY = cells[startX].indexOf("S");

  if (visited.size === 0) visited.add(hash(startX, startY));

  for (let i = 0; i < steps; i++) {
    // pop all
    const current = [...visited.values()];
    visited.clear();

    for (const curr of current) {
      const [x, y] = unhash(curr);
      for (const dir of [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const newX = x + dir[0],
          newY = y + dir[1];

        if (
          newX < 0 ||
          newX >= cells.length ||
          newY < 0 ||
          newY >= cells[0].length
        )
          continue;
        if (cells[newX][newY] === "#") continue;
        visited.add(hash(newX, newY));
      }
    }
  }

  return visited.size;
}