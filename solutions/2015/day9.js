function parse(input) {
  const costs = new Map();

  function add(start, target, cost) {
    if (!costs.has(start)) costs.set(start, new Map());
    costs.get(start).set(target, cost);
  }

  for (const line of input.split("\n")) {
    const [left, right] = line.split(" = ");
    const [one, two] = left.split(" to ");
    const cost = Number(right);
    add(one, two, cost);
    add(two, one, cost);
  }

  return costs;
}

function minPath(part2, costs, at, visited, cost) {
  if (visited.length === costs.size - 1) return cost;

  const path = [...visited, at];
  let min = part2 ? 0 : Infinity;
  for (const [option, c] of costs.get(at).entries()) {
    if (path.includes(option)) continue;
    const m = minPath(part2, costs, option, path, cost + c);
    min = (part2 ? Math.max : Math.min)(m, min);
  }

  return min;
}

function answer(input, part2) {
  const costs = parse(input);
  let min = part2 ? 0 : Infinity;
  for (const option of costs.keys()) {
    const opt = minPath(part2, costs, option, [], 0);
    min = (part2 ? Math.max : Math.min)(opt, min);
  }
  return min;
}

function part1(input) {
  return answer(input, false);
}

function part2(input) {
  return answer(input, true);
}

export default [part1, part2];
