function parse(input) {
  const map = [];
  for (const line of input.split("\n")) {
    const thing = [];
    for (const char of line) {
      thing.push(Number(char));
    }
    map.push(thing);
  }
  return map;
}

function hash(x, y) {
  return `${x},${y}`;
}

function part1(input) {
  const map = parse(input);
  let count = 0;
  for (const [y, line] of map.entries()) {
    for (const [x, num] of line.entries()) {
      if (num === 0) {
        const paths = [[x, y, num]];
        const reachable = new Set();
        while (paths.length > 0) {
          const [x, y, num] = paths.pop();
          if (x < 0 || y < 0 || x >= line.length || y >= map.length) continue;
          if (num !== map[y][x]) continue;
          if (num === 9) {
            reachable.add(hash(x, y));
            continue;
          }
          if (num !== map[y][x]) continue;
          paths.push([x + 1, y, num + 1]);
          paths.push([x - 1, y, num + 1]);
          paths.push([x, y + 1, num + 1]);
          paths.push([x, y - 1, num + 1]);
        }
        count += reachable.size;
      }
    }
  }
  return count;
}

function part2(input) {
  const map = parse(input);
  let count = 0;
  for (const [y, line] of map.entries()) {
    for (const [x, num] of line.entries()) {
      if (num === 0) {
        const paths = [[x, y, num]];
        while (paths.length > 0) {
          const [x, y, num] = paths.pop();
          if (x < 0 || y < 0 || x >= line.length || y >= map.length) continue;
          if (num !== map[y][x]) continue;
          if (num === 9) {
            count++;
            continue;
          }
          if (num !== map[y][x]) continue;
          paths.push([x + 1, y, num + 1]);
          paths.push([x - 1, y, num + 1]);
          paths.push([x, y + 1, num + 1]);
          paths.push([x, y - 1, num + 1]);
        }
      }
    }
  }
  return count;
}

export default [part1, part2];
