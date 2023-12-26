function hash(x, y) {
  return `${x},${y}`;
}

function unhash(k) {
  return k.split(",");
}

function parse(input) {
  const nodes = new Map();

  function add(from, to) {
    if (!nodes.has(from)) nodes.set(from, []);
    nodes.get(from).push(to);
  }

  for (const line of input.split("\n")) {
    const [from, targets] = line.split(": ");
    const allTargets = targets.split(" ");

    for (const target of allTargets) {
      add(from, target);
      add(target, from);
    }
  }

  return nodes;
}

function findMostUsed(nodes) {
  // Traverse graph and see the most used edge
  const used = new Map();

  for (const key of nodes.keys()) {
    const already = new Set();
    const queue = [key];
    already.add(key)

    while (queue.length > 0) {
      const k = queue.shift();

      for (const next of nodes.get(k)) {
        if (already.has(next)) continue;
        already.add(next)

        queue.push(next);
        const path = k < next ? hash(k, next) : hash(next, k);

        used.set(path, 1 + (used.get(path) ?? 0));
      }
    }
  }

  return unhash([...used.entries()].sort((a, b) => b[1] - a[1])[0][0]);
}

function part1(input) {
  const nodes = parse(input);
  for (let i = 0; i < 3; i++) {
    const [one, two] = findMostUsed(nodes);

    // remove the link from each one
    nodes.set(one, nodes.get(one).filter(i => i !== two))
    nodes.set(two, nodes.get(two).filter(i => i !== one))
  }
  
  // Then find all
  const found = new Set()
  const queue = [[...nodes.keys()][0]]
  
  while (queue.length > 0) {
    const now = queue.pop()
    if (found.has(now)) continue
    found.add(now)
    
    queue.push(...nodes.get(now))
  }
  
  return (nodes.size - found.size) * found.size
}

export default [part1]