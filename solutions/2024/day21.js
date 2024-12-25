function parse(input) {
  return input.split("\n");
}

// Thank you https://www.reddit.com/r/adventofcode/comments/1hj7f89/2024_day_21_part_1_found_a_rule_to_make_it_work/
const GRID = ["789", "456", "123", " 0A"];
const KEYPAD = [" ^A", "<v>"];
function fromCode(from, to) {
  const fromY = GRID.findIndex((i) => i.includes(from));
  const toY = GRID.findIndex((i) => i.includes(to));
  const fromX = GRID[fromY].indexOf(from);
  const toX = GRID[toY].indexOf(to);
  const moveX = toX - fromX;
  const moveY = toY - fromY;
  const possible = [];

  if (moveX < 0) possible.push("<".repeat(-moveX));
  else possible.push(">".repeat(moveX));
  if (moveY < 0) possible.push("^".repeat(-moveY));
  else possible.push("v".repeat(moveY));

  const rev = possible.toReversed().join("");
  const fo = possible.join("");
  if ((toX === 0 && fromY === 3) || rev === fo) return [rev];
  if (fromX === 0 && toY === 3) return [fo];
  return [rev, fo];
}
function fromKeypad(from, to) {
  const fromY = KEYPAD.findIndex((i) => i.includes(from));
  const toY = KEYPAD.findIndex((i) => i.includes(to));
  const fromX = KEYPAD[fromY].indexOf(from);
  const toX = KEYPAD[toY].indexOf(to);
  const moveX = toX - fromX;
  const moveY = toY - fromY;
  const possible = [];

  if (moveX < 0) possible.push("<".repeat(-moveX));
  else possible.push(">".repeat(moveX));
  if (moveY < 0) possible.push("^".repeat(-moveY));
  else possible.push("v".repeat(moveY));

  const rev = possible.toReversed().join("");
  const fo = possible.join("");
  if (toX === 0 && fromY === 0) return rev;
  if (fromX === 0 && toY === 0) return fo;
  if (moveX < 0) return fo;
  else return rev;
}

function hash(from, to) {
  return `${from},${to}`;
}

function unhash(thing) {
  return thing.split(",");
}

function addNum(map, num, count) {
  map.set(num, (map.get(num) ?? 0) + count);
}

function pathTrans(path, count, trans) {
  if (trans.hanging) addNum(trans.map, hash(trans.hanging, path[0]), count);
  for (let i = 0; i < path.length - 1; i++) {
    addNum(trans.map, hash(path[i], path[i + 1]), count);
  }
  trans.hanging = path[path.length - 1];
}

function count(map) {
  return (
    [...map.map.values()].reduce((a, b) => a + b, 0) + (map.hanging ? 1 : 0)
  );
}

function deepCode(code) {
  let seqs = fromCode("A", code[0]).map((i) => i + "A");
  for (let i = 0; i < code.length - 1; i++) {
    const nextWay = fromCode(code[i], code[i + 1]);
    const next = [];
    for (const seq of seqs)
      for (const way of nextWay) next.push(seq + way + "A");
    seqs = next;
  }
  return seqs;
}

// Move a robot from from to to that is depth away
function deepKeypad(from, to, depth) {
  const first = fromKeypad(from, to) + "A";
  let trans = {
    map: new Map(),
    first: first[0],
    hanging: undefined,
  };
  pathTrans(first, 1, trans);

  for (let i = 0; i < depth - 1; i++) {
    const first = fromKeypad("A", trans.first) + "A";
    const nextTrans = {
      map: new Map(),
      first: first[0],
      hanging: undefined,
    };
    pathTrans(first, 1, nextTrans);
    for (const [path, count] of trans.map.entries())
      pathTrans(fromKeypad(...unhash(path)) + "A", count, nextTrans);
    trans = nextTrans;
  }
  return trans;
}

function fullKeypad(seqs, depth) {
  let s = count(deepKeypad("A", seqs[0], depth));
  for (let i = 0; i < seqs.length - 1; i++)
    s += count(deepKeypad(seqs[i], seqs[i + 1], depth));
  return s;
}

function run(input, size) {
  const codes = parse(input);
  let count = 0;
  for (const code of codes) {
    const out = deepCode(code);
    let min = Infinity;
    for (const seq of out) min = Math.min(min, fullKeypad(seq, size));
    count += min * Number(code.slice(0, -1));
  }
  return count;
}

function part1(input) {
  return run(input, 2);
}

function part2(input) {
  return run(input, 25);
}

export default [part1, part2];
