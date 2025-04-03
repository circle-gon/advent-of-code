import { Queue } from "/externals.js"

function parse(input) {
  const num = Number(input)
  const squares = []
  for (let i = 0; i < 60; i++) {
    const row = []
    for (let j = 0; j < 60; j++) {
      const bits = count(j * j + 3 * j + 2 * i * j + i + i * i + num)
      row.push(bits % 2 === 0)
    }
    squares.push(row)
  }

  return squares
}

function count(num) {
  let count = 0
  while (num > 0) {
    if (num & 1) count++
    num >>= 1
  }
  return count
}

const TO_CHECK = [
  [1, 0],
  [-1, 0],
  [0, -1],
  [0, 1],
];

function getNext(map, x, y, score) {
  const possible = [];
  for (const [xInc, yInc] of TO_CHECK) {
    const nX = x + xInc;
    const nY = y + yInc;
    if (
      nX >= 0 &&
      nY >= 0 &&
      nX < map[0].length &&
      nY < map.length &&
      map[nY][nX]
    ) {
      const arr = [nX, nY, score + 1];
      possible.push(arr);
    }
  }
  return possible;
}

function hash(x, y) {
  return `${x},${y}`
}

function part1(input, _, example) {
  const squares = parse(input)
  const set = new Set([hash(1, 1)])
  const queue = new Queue()
  const reqX = example ? 7 : 31
  const reqY = example ? 4 : 39
  
  queue.push([1, 1, 0])
  while (queue.length > 0) {
    const [x, y, dist] = queue.pop()
  
    if (x === reqX && y === reqY) return dist
    
    for (const next of getNext(squares, x, y, dist)) {
      const h = hash(next[0], next[1])
      if (!set.has(h)) {
        set.add(h)
        queue.push(next)
      }
    }
  }
  
  return "Is your input malformed?"
}

function part2(input) {
  const squares = parse(input)
  const set = new Set([hash(1, 1)])
  const queue = new Queue()
  
  queue.push([1, 1, 0])
  while (queue.length > 0) {
    const [x, y, dist] = queue.pop()
    
    if (dist === 50) continue
    
    for (const next of getNext(squares, x, y, dist)) {
      const h = hash(next[0], next[1])
      if (!set.has(h)) {
        set.add(h)
        queue.push(next)
      }
    }
  }
  
  return set.size
}

export default [part1, part2]