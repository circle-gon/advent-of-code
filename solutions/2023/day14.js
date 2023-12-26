function mapToColumns(table) {
  const newTable = [];
  for (let i = 0; i < table[0].length; i++) {
    const row = [];
    for (let j = 0; j < table.length; j++) {
      row.push(table[j][i]);
    }
    newTable.push(row);
  }

  return newTable;
}

function makeClone(table) {
  const f = [];
  for (const row of table) f.push([...row]);
  return f;
}

function* getPoints(dir, fun) {
  let point = dir ? 1 : fun - 2;
  const increment = dir ? 1 : -1;
  const keepGoing = () => {
    return dir ? point < fun : point >= 0;
  };

  while (keepGoing()) {
    yield point;
    point += increment;
  }
}

// dir true: up/left
// dir false: down/right
// up true: go up/down
// up false: go left/right
function rotate(t, up, dir) {
  // the table goes down instead of up here
  const table = up ? makeClone(t) : mapToColumns(t);
  //console.log(stringer(table))
  const increment = dir ? -1 : 1;
  for (const i of getPoints(dir, table.length)) {
    for (let j = 0; j < table[i].length; j++) {
      if (table[i][j] !== "O") continue;

      let f = i;
      while (
        ((!dir && f < table.length - 1) || (dir && f > 0)) &&
        table[f + increment][j] === "."
      ) {
        table[f][j] = ".";
        table[f + increment][j] = "O";
        f += increment;
      }
    }
  }

  return up ? table : mapToColumns(table);
}

function parse(input) {
  const table = [];
  for (const line of input.split("\n")) {
    const row = [];
    for (const char of line) {
      row.push(char);
    }
    table.push(row);
  }

  return table;
}

function part1(input) {
  const table = parse(input);

  // Go on each row and push up
  // Start at 1 because 0 is already at the top
  const result = rotate(table, true, true);

  let sum = 0;

  for (const [row, line] of result.entries()) {
    for (const char of line) {
      if (char === "O") sum += result.length - row;
    }
  }

  return sum;
}

function stringer(t) {
  return t.map((i) => i.join("")).join("\n");
}

function getSum(table) {
  let sum = 0;
  for (const [row, line] of table.entries()) {
    for (const char of line) {
      if (char === "O") sum += table.length - row;
    }
  }
  return sum;
}

const cache = new Map();

function part2(input) {
  const table = parse(input);

  let r = table;
  const cache = new Map();

  for (let i = 0; i < 1e9; i++) {
    r = rotate(r, true, true);
    r = rotate(r, false, true);
    r = rotate(r, true, false);
    r = rotate(r, false, false);

    const key = JSON.stringify(r);
    if (cache.has(key)) {
      // get the repetition
      const num = i - cache.get(key);
      // then repeatedly add it to i until we can't
      i += Math.floor((1e9 - 1 - i) / num) * num;
    }
    cache.set(key, i);
  }

  // Cache miss
  return getSum(r);
}

export default [part1, part2]