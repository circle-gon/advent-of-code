function parse(input) {
  const lines = input.split("\n").slice(2);
  const fs = new Map();
  for (const line of lines) {
    const [name, ...others] = line.split(/ +/);
    const [, x, y] = name.split("-").map((i) => i.slice(1));
    const stats = others.map((i) => Number(i.slice(0, -1)));

    fs.set(`${x},${y}`, stats);
  }
  return fs;
}

function part1(input) {
  const fs = parse(input);
  let count = 0;
  for (const node1 of fs.values()) {
    for (const node2 of fs.values()) {
      if (node1 === node2) continue;
      if (node1[1] > 0 && node1[1] <= node2[2]) count++;
    }
  }
  return count;
}

function part2(input) {
  const fs = parse(input);
  let freeX = -1, freeY = - 1
  let openX = Infinity
  
  for (const [name, node] of fs.entries()) {
    const [x, y] = name.split(",").map(i => Number(i))
    if (node[1] === 0) {
      freeX = x
      freeY = y
    } else if (node[0] > 100) openX = Math.min(openX, x - 1)
  }
  if (freeX === -1 || freeY === -1 || openX === Infinity) return "Is your input malformed?"
  
  let dist = 0
  // Add distance to get free to the top
  // Need a detour: get to (x, y) first, then (x, 0), then (34, 0)
  dist += Math.abs(freeX - openX) + freeY + Math.abs(34 - openX)
  // Add distance to get goal to start
  // It takes one move to swap
  // Then it takes 4 moves to get back to swapping position
  // 1 1 move, then 34 more 1+4 moves to get to (0, 0)
  dist += 1 + 5 * 34
  return dist
}

export default [part1, part2];
