export function valid(parsed) {
  const visited = Array(parsed.length)
    .fill()
    .map(() =>
      Array(parsed[0].length)
        .fill()
        .map(() => [])
    );
  const locs = []
  
  const startY = parsed.findIndex((i) => i.includes("^"));
  const startX = parsed[startY].indexOf("^");

  let x = startX,
    y = startY,
    dir = 0;
  while (x >= 0 && y >= 0 && x < parsed[0].length && y < parsed.length) {
    const h = visited[y][x]
    if (h.includes(dir)) return 0;
    else {
      if (h.length === 0) locs.push([x, y])
      h.push(dir)
    }

    if (dir === 0) {
      if (y >= 1 && parsed[y - 1][x] === "#") {
        dir = (dir + 1) % 4;
      } else {
        y--;
      }
    } else if (dir === 1) {
      if (x <= parsed[0].length - 2 && parsed[y][x + 1] === "#") {
        dir = (dir + 1) % 4;
      } else {
        x++;
      }
    } else if (dir === 2) {
      if (y <= parsed.length - 2 && parsed[y + 1][x] === "#") {
        dir = (dir + 1) % 4;
      } else {
        y++;
      }
    } else {
      if (x >= 1 && parsed[y][x - 1] === "#") {
        dir = (dir + 1) % 4;
      } else {
        x--;
      }
    }
  }

  return locs;
}
