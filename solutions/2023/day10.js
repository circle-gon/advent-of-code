// [x offset, y offset]
// [||||||||, <------>]
// Top is (0, 0), going down increases x, going right increases y
function isConnectedTo(l, ol, rel) {
  // . can never be connected to anything
  if (l === "." || ol === ".") return false;
  if (ol === "S") {
    return isConnectedTo(ol, l, [-rel[0], -rel[1]]);
  }

  // S could be anything, so treat it like a wildcard
  // Take a shortcut since we assume that ol can never be a S
  const www = l === "S";
  if ((l === "|" || www) && rel[1] === 0) {
    if (ol === "|") return true;
    if (rel[0] === -1 && ["7", "F"].includes(ol)) return true;
    if (rel[0] === 1 && ["L", "J"].includes(ol)) return true;
  }

  if ((l === "-" || www) && rel[0] === 0) {
    if (ol === "-") return true;
    if (rel[1] === -1 && ["L", "F"].includes(ol)) return true;
    if (rel[1] === 1 && ["J", "7"].includes(ol)) return true;
  }

  if ((l === "L" || www) && anyMatch(rel, [0, 1], [-1, 0])) {
    if (ol === "7") return true;
    if (rel[0] === 0 && ["-", "J"].includes(ol)) return true;
    if (rel[1] === 0 && ["|", "F"].includes(ol)) return true;
  }

  if ((l === "J" || www) && anyMatch(rel, [0, -1], [-1, 0])) {
    if (ol === "F") return true;
    if (rel[0] === 0 && ["-", "L"].includes(ol)) return true;
    if (rel[1] === 0 && ["|", "7"].includes(ol)) return true;
  }

  if ((l === "7" || www) && anyMatch(rel, [0, -1], [1, 0])) {
    if (ol === "L") return true;
    if (rel[0] === 0 && ["-", "F"].includes(ol)) return true;
    if (rel[1] === 0 && ["|", "J"].includes(ol)) return true;
  }

  if ((l === "F" || www) && anyMatch(rel, [0, 1], [1, 0])) {
    if (ol === "J") return true;
    if (rel[0] === 0 && ["-", "7"].includes(ol)) return true;
    if (rel[1] === 0 && ["|", "L"].includes(ol)) return true;
  }

  return false;
}

function anyMatch(a, ...pt) {
  for (const b of pt) {
    if (a[0] === b[0] && a[1] === b[1]) return true;
  }
  return false;
}

function toStr(x, y) {
  return `${x},${y}`;
}

function parse(input) {
  const board = [];
  for (const line of input.split("\n")) {
    const row = [];
    for (const char of line) {
      row.push(char);
    }
    board.push(row);
  }

  return board;
}

function part1(input) {
  const board = parse(input);
  
  const startX = board.findIndex((b) => b.includes("S"));
  const startY = board[startX].indexOf("S");

  // stores the point and the distance
  const matched = new Map();
  const queue = [[startX, startY]];

  while (queue.length > 0) {
    // We need to explore all of the close points
    const current = queue.shift();
    const point = board[current[0]][current[1]];

    // The starting point
    if (point === "S") matched.set(toStr(...current), 0);
    // Find the other points to get the distance

    let smallDistance = Infinity;

    for (const dir of [
      [-1, 0],
      [1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const newX = current[0] + dir[0];
      const newY = current[1] + dir[1];

      // That point won't exist!
      if (newX >= board.length || newX < 0) continue;
      if (newY >= board[0].length || newY < 0) continue;

      if (isConnectedTo(point, board[newX][newY], dir)) {
        if (matched.has(toStr(newX, newY))) {
          smallDistance = Math.min(
            smallDistance,
            matched.get(toStr(newX, newY)) + 1
          );
        } else {
          // If for some reason we don't have the point, add it
          // But make sure we're connected to it
          queue.push([newX, newY]);
        }
      }
    }

    if (smallDistance !== Infinity)
      matched.set(toStr(...current), smallDistance);
  }

  return Math.max(...matched.values());
}

function containsPoint(pipePoints, point, board) {
  let isIn = false;
  const x = point[0];

  for (let i = 0; i < point[1]; i++) {
    // Nothing's gonna happen
    if (!pipePoints.has(toStr(x, i))) continue;

    const oldI = i;
    while (isConnectedTo(board[x][i], board[x][i + 1], [0, 1])) i++;

    const oldPoint = board[x][oldI];
    const newPoint = board[x][i];

    const invert =
      oldI === i ||
      (oldPoint === "L" && newPoint === "7") ||
      (oldPoint === "F" && newPoint === "J");
    if (invert) isIn = !isIn;
  }

  return isIn;
}

function part2(input) {
  const board = parse(input);

  const startX = board.findIndex((b) => b.includes("S"));
  const startY = board[startX].indexOf("S");

  const queue = [[startX, startY]];
  const pipePoints = new Set();

  while (queue.length > 0) {
    // It doesn't matter what order it's in
    const current = queue.pop();
    pipePoints.add(toStr(...current));

    const curr = board[current[0]][current[1]];

    // Go explore
    for (const dir of [
      [-1, 0],
      [1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const newX = current[0] + dir[0];
      const newY = current[1] + dir[1];

      // That point won't exist!
      if (newX >= board.length || newX < 0) continue;
      if (newY >= board[0].length || newY < 0) continue;

      if (
        !pipePoints.has(toStr(newX, newY)) &&
        isConnectedTo(curr, board[newX][newY], dir)
      )
        queue.push([newX, newY]);
    }
  }

  let enclosed = 0;

  for (const [x, line] of board.entries()) {
    for (const [y, point] of line.entries()) {
      // That's a pipe!
      if (pipePoints.has(toStr(x, y))) continue;

      if (containsPoint(pipePoints, [x, y], board)) enclosed++;
    }
  }

  return enclosed;
}

export default [part1, part2]