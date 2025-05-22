function parse(input) {
  const steps = new Map();
  for (const line of input.split("\n")) {
    const parts = line.split(" ");
    const before = parts[1];
    const after = parts[7];

    if (!steps.has(after))
      steps.set(after, {
        req: [],
        next: [],
      });
    if (!steps.has(before))
      steps.set(before, {
        req: [],
        next: [],
      });

    steps.get(after).req.push(before);
    steps.get(before).next.push(after);
  }

  return steps;
}

function part1(input) {
  const graph = parse(input);
  const order = [];
  const seen = new Set();
  let out = "";

  for (const [key, val] of graph.entries()) {
    if (val.req.length === 0) order.push(key);
  }

  while (order.length > 0) {
    order.sort();

    const char = order.shift();
    const next = graph.get(char).next;

    out += char;
    seen.add(char);
    order.push(
      ...next.filter((i) => graph.get(i).req.every((j) => seen.has(j)))
    );
  }

  return out;
}

const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function part2(input, _, example) {
  const base = example ? 1 : 61;
  const graph = parse(input);
  const look = [];
  const work = Array(example ? 2 : 5)
    .fill()
    .map(() => [0, ""]);
  const seen = new Set();
  let time = 0;

  for (const [key, val] of graph.entries()) {
    if (val.req.length === 0) look.push(key);
  }

  // The "simple" approach took me way too long to find
  while (look.length > 0 || work.some((i) => i[0] > 0)) {
    look.sort();

    // If one worker is not doing anything, force them to do something
    while (work.some((i) => i[0] === 0) && look.length > 0) {
      const idx = work.find((i) => i[0] === 0);
      const a = look.shift();
      idx[0] = base + alpha.indexOf(a);
      idx[1] = a;
    }

    
    // Finish a task
    let low = [Infinity, ""]
    for (const obj of work)
      if (obj[0] > 0 && obj[0] < low[0]) low = obj;

    const t = low[0];
    for (const obj of work) if (obj[0] > 0) obj[0] -= t;
    time += t;

    // Add the next possible tasks
    const char = low[1];
    const next = graph.get(char).next;

    seen.add(char);
    look.push(
      ...next.filter((i) => graph.get(i).req.every((j) => seen.has(j)))
    );
  }

  return time;
}

export default [part1, part2];
