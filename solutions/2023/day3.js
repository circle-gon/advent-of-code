const NUMS = "0123456789".split("");

function hash(x, y) {
  // for instant Set matching
  return `${x},${y}`;
}

function unhash(h) {
  return h.split(",").map((i) => Number(i));
}

function parse(input) {
  const data = [];
  for (const f of input.split("\n")) {
    const arr = [];
    for (const j of f) {
      arr.push(j);
    }
    data.push(arr);
  }
  return data;
}

function part1(input) {
  // 1. get data
  const data = parse(input);

  // 2. find nums
  // we don't want to find duplicates if two symbols are right next to each other
  const had = new Set();
  let sum = 0;

  for (const [x, arr] of data.entries()) {
    for (const [y, thing] of arr.entries()) {
      if (!NUMS.includes(thing) && thing !== ".") {
        // find the numbers
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            // that's the point we're at
            if (i === 0 && j === 0) continue;
            const newx = x + i;
            const newy = y + j;
            if (newx < 0 || newx >= data.length) continue;
            if (newy < 0 || newy >= arr.length) continue;
            const row = data[newx];

            // not a number so we don't care
            if (!NUMS.includes(row[newy])) continue;

            // glob the number
            let low = newy,
              high = newy;

            // set low
            while (low > 0 && NUMS.includes(row[low - 1])) {
              low--;
            }

            // set high
            while (high < arr.length - 1 && NUMS.includes(row[high + 1])) {
              high++;
            }

            // already counted
            if (had.has(hash(newx, low))) continue;
            had.add(hash(newx, low));

            const num = Number(row.slice(low, high + 1).join(""));
            sum += num;
          }
        }
      }
    }
  }
  return sum;
}

function part2(input) {
  // 1. get data
  const data = parse(input);

  // 2. find nums
  let sum = 0;
  for (const [x, arr] of data.entries()) {
    for (const [y, thing] of arr.entries()) {
      if (thing === "*") {
        // find the gears
        const gears = [];
        const gotIt = new Set();
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            // that's the point we're at
            if (i === 0 && j === 0) continue;
            const newx = x + i;
            const newy = y + j;
            if (newx < 0 || newx >= data.length) continue;
            if (newy < 0 || newy >= arr.length) continue;
            const row = data[newx];

            // not a number so we don't care
            if (!NUMS.includes(row[newy])) continue;

            // glob the number
            let low = newy,
              high = newy;

            // set low
            while (low > 0 && NUMS.includes(row[low - 1])) {
              low--;
            }

            // set high
            while (high < arr.length - 1 && NUMS.includes(row[high + 1])) {
              high++;
            }

            // already counted
            if (gotIt.has(hash(newx, low))) continue;
            gotIt.add(hash(newx, low));

            const num = Number(row.slice(low, high + 1).join(""));
            gears.push(num);
          }
        }

        if (gears.length === 2) {
          sum += gears[0] * gears[1];
        }
      }
    }
  }
  return sum;
}

export default [part1, part2]