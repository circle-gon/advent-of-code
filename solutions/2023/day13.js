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

function getSum(table, avoidSum) {
  let patternResult = 0;

  // Find horizontal reflection first
  for (let i = 1; i < table.length; i++) {
    const upDown = Math.min(i, table.length - i);
    // check if it's a pattern
    let isPattern = true;
    const up = table.slice(i - upDown, i),
      down = table.slice(i, upDown + i);

    for (let j = 0; j < upDown; j++) {
      const left = up[j];
      const right = down[down.length - 1 - j];
      if (left.some((f, idx) => f !== right[idx])) {
        isPattern = false;
        break;
      }
    }

    const v = 100 * i;
    if (isPattern && avoidSum !== v) patternResult = v;
  }

  // Find horizontal reflection first
  const horizSize = table[0].length;
  for (let i = 1; i < horizSize; i++) {
    const upDown = Math.min(i, horizSize - i);
    // check if it's a pattern
    let isPattern = true;
    const up = mapToColumns(table).slice(i - upDown, i),
      down = mapToColumns(table).slice(i, upDown + i);

    for (let j = 0; j < upDown; j++) {
      const left = up[j];
      const right = down[down.length - 1 - j];
      if (left.some((f, idx) => f !== right[idx])) {
        isPattern = false;
        break;
      }
    }

    if (isPattern && avoidSum !== i) patternResult = i;
  }

  return patternResult;
}

function makeClone(table) {
  const f = [];
  for (const row of table) f.push([...row]);
  return f;
}

function parse(pattern) {
  const table = [];
  for (const line of pattern.split("\n")) {
    const r = [];
    for (const cell of line) r.push(cell);
    table.push(r);
  }

  return pattern;
}

function part1(input) {
  return input.split("\n\n").map((pattern) => getSum(parse(pattern), -1));
}

function part2(input) {
  const patterns = input.split("\n\n");
  let sum = 0;

  for (const pattern of patterns) {
    const table = parse(pattern);

    let done = false;
    const current = getSum(table, -1);

    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < table[i].length; j++) {
        const c = makeClone(table);
        c[i][j] = c[i][j] === "#" ? "." : "#";

        const s = getSum(c, current);

        if (s > 0) {
          sum += s;
          done = true;
          break;
        }
      }

      if (done) break;
    }
  }

  return sum;
}

export default [part1, part2]