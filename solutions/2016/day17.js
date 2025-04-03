import { md5, Queue } from "/externals.js"

const TO_CHECK = [
  [0, -1, "U"],
  [0, 1, "D"],
  [-1, 0, "L"],
  [1, 0, "R"],
];

function getNext(hash, x, y, path) {
  const possible = [];
  for (const [idx, [xInc, yInc, move]] of TO_CHECK.entries()) {
    const nX = x + xInc;
    const nY = y + yInc;
    if (
      nX >= 0 &&
      nY >= 0 &&
      nX < 4 &&
      nY < 4 &&
      ["b", "c", "d", "e", "f"].includes(hash[idx])
    ) {
      const arr = [nX, nY, path + move];
      possible.push(arr);
    }
  }
  return possible;
}

function part1(input) {
  const paths = new Queue()
  
  paths.push([0, 0, ""])
  while (paths.length > 0) {
    const [x, y, str] = paths.pop()
    if (x === 3 && y === 3) return str
    for (const path of getNext(md5(input + str), x, y, str)) paths.push(path)
  }
  
  return "Is your input malformed?"
}

function part2(input) {
  const paths = [[0, 0, ""]]
  let len = 0
  
  while (paths.length > 0) {
    const [x, y, str] = paths.pop()
    if (x === 3 && y === 3) {
      len = Math.max(len, str.length)
      continue
    }
    paths.push(...getNext(md5(input + str), x, y, str))
  }
  
  return len
}

export default [part1, part2]