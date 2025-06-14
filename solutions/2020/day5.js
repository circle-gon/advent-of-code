function parse(input) {
  return input
    .split("\n")
    .map((i) => i.split("").map((j) => j === "B" || j === "R"));
}

function binSearch(low, high, range) {
  for (const ra of range) {
    const middle = Math.floor((low + high) / 2);
    if (ra) low = middle + 1;
    else high = middle;
  }
  return high;
}

function part1(input) {
  const passes = parse(input);
  let id = 0;
  for (const pass of passes) {
    const row = binSearch(0, 127, pass.slice(0, 7));
    const col = binSearch(0, 7, pass.slice(7, 10));
    const cid = row * 8 + col;
    if (cid > id) id = cid;
  }
  return id;
}

function part2(input) {
  const passes = parse(input);
  const ids = [];
  for (const pass of passes) {
    const row = binSearch(0, 127, pass.slice(0, 7));
    const col = binSearch(0, 7, pass.slice(7, 10));
    const cid = row * 8 + col;
    ids.push(cid);
  }
  ids.sort((a, b) => a - b);
  for (let i = 1; i < ids.length; i++) {
    const next = ids[i - 1] + 1;
    if (next !== ids[i]) return next;
  }
  return "Is your input malformed?";
}

export default [part1, part2];
