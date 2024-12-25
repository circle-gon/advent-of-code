const LOOKUP_CHAR = {
  "#": "##",
  O: "[]",
  ".": "..",
  "@": "@.",
};

function parse(input, part2) {
  const [mapC, moves] = input.split("\n\n");
  const map = [];
  for (const row of mapC.split("\n")) {
    const arr = [];
    for (const char of row) {
      const newChar = part2 ? LOOKUP_CHAR[char] : char;
      arr.push(...newChar.split(""));
    }
    map.push(arr);
  }
  return {
    map,
    moves: moves.replaceAll("\n", ""),
  };
}

const DIRECTIONS = {
  "^": [0, -1],
  ">": [1, 0],
  v: [0, 1],
  "<": [-1, 0],
};
function part1(input) {
  const { map, moves } = parse(input);
  let y = map.findIndex((i) => i.includes("@"));
  let x = map[y].indexOf("@");

  map[y][x] = ".";
  for (const move of moves) {
    const [moveX, moveY] = DIRECTIONS[move];
    // Find all boxes
    let iter = 0;
    let canMove = true;
    while (true) {
      const next = map[y + (iter + 1) * moveY][x + (iter + 1) * moveX];
      // Can't be moved (this always works because the edges have #)
      if (next === "#") {
        iter = 0;
        canMove = false;
        break;
      } else if (next === ".") break;
      iter++;
    }
    for (let i = iter; i > 0; i--) {
      map[y + (i + 1) * moveY][x + (i + 1) * moveX] = "O";
      map[y + i * moveY][x + i * moveX] = ".";
    }
    if (canMove) {
      y += moveY;
      x += moveX;
    }
  }

  let sum = 0;
  for (const [y, row] of map.entries()) {
    for (const [x, cell] of row.entries()) {
      if (cell === "O") sum += x + 100 * y;
    }
  }
  return sum;
}

function part2(input) {
  const { map, moves } = parse(input, true);
  let y = map.findIndex((i) => i.includes("@"));
  let x = map[y].indexOf("@");

  map[y][x] = ".";
  for (const move of moves) {
    const [moveX, moveY] = DIRECTIONS[move];
    // Find all boxes
    if (moveY === 0) {
      let iter = 0;
      let canMove = true;
      while (true) {
        const next = map[y][x + (iter + 1) * moveX];
        // Can't be moved (this always works because the edges have #)
        if (next === "#") {
          iter = 0;
          canMove = false;
          break;
        } else if (next === ".") break;
        iter++;
      }
      for (let i = iter; i > 0; i -= 2) {
        map[y][x + (i + 1) * moveX] = moveX === 1 ? "]" : "[";
        map[y][x + i * moveX] = moveX === 1 ? "[" : "]";
      }
      if (canMove) {
        x += moveX;
        map[y][x] = ".";
      }
    } else {
      // It's possible to move multiple, so iter doesn't help in this case
      const next = map[y + moveY][x];
      if (next === "[" || next === "]") {
        const toMove = [[next === "[" ? x : x - 1, y + moveY]];
        const toWrite = [];
        const toClear = [];
        let bad = false;
        while (toMove.length > 0) {
          const [x, y] = toMove.pop();
          // Check ahead
          const next = map[y + moveY][x];
          const next2 = map[y + moveY][x + 1];
          if (next === "#" || next2 === "#") {
            bad = true;
            break;
          } else {
            if (next !== ".")
              toMove.push([next === "[" ? x : x - 1, y + moveY]);
            // If it's ] it was already caught by the previous if statemnet
            if (next2 === "[") toMove.push([x + 1, y + moveY]);
          }
          toWrite.push([x, y + moveY]);
          toClear.push([x, y]);
        }
        if (!bad) {
          for (const [x, y] of toClear) {
            map[y][x] = ".";
            map[y][x + 1] = ".";
          }
          for (const [x, y] of toWrite) {
            map[y][x] = "[";
            map[y][x + 1] = "]";
          }
          y += moveY;
        }
      } else if (next !== "#") {
        y += moveY;
      }
    }
  }

  let sum = 0;
  for (const [y, row] of map.entries()) {
    for (const [x, cell] of row.entries()) {
      if (cell === "[") sum += x + 100 * y;
    }
  }
  return sum;
}

export default [part1, part2];
