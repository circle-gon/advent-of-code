function run(initCups, iter, maxValue) {
  const map = Array(maxValue + 1).fill(0);
  for (let i = 0; i < maxValue; i++) {
    map[initCups[i]] = initCups[(i + 1) % maxValue];
  }

  let currentNode = initCups[0];
  for (let i = 0; i < iter; i++) {
    const a = map[currentNode];
    const b = map[a];
    const c = map[b];
    let value = currentNode - 1;
    if (value === 0) value = maxValue;
    while (a === value || b === value || c === value) {
      value--;
      if (value === 0) value = maxValue;
    }
    map[currentNode] = map[c];
    map[c] = map[value];
    map[value] = a;
    currentNode = map[currentNode];
  }
  return map;
}

function part1(input) {
  const initCups = input.split("").map((i) => Number(i));
  const nodes = run(initCups, 100, 9);
  let node = nodes[1];
  let str = "";
  while (node !== 1) {
    str += node;
    node = nodes[node];
  }
  return str;
}

function part2(input) {
  const initCups = input.split("").map((i) => Number(i));
  for (let i = 10; i <= 1e6; i++) initCups.push(i);
  const nodes = run(initCups, 1e7, 1e6);
  return nodes[1] * nodes[nodes[1]];
}

export default [part1, part2];
