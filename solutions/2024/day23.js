function parse(input) {
  const nodes = new Map();

  function add(from, to) {
    if (!nodes.has(from)) nodes.set(from, new Set());
    nodes.get(from).add(to);
  }

  for (const line of input.split("\n")) {
    const [from, to] = line.split("-");

    add(from, to);
    add(to, from);
  }

  return nodes;
}

function hash(a, b, c) {
  return [a, b, c].sort().join(",");
}

function part1(input) {
  const nodes = parse(input);
  const t = new Set();
  for (const node of nodes.keys()) {
    if (!node.startsWith("t")) continue;
    const one = nodes.get(node);
    for (const item of one) {
      // See if node and item have a common element
      const common = one.intersection(nodes.get(item));
      for (const c of common) t.add(hash(node, item, c));
    }
  }
  return t.size;
}

function part2(input) {
  const nodes = parse(input);
  let parties = [];
  // Create the 2-party one
  for (const node of nodes.keys()) {
    for (const item of nodes.get(node)) {
      // Compare by lexiographic order
      if (item > node) parties.push([node, item]);
    }
  }

  while (parties.length > 1) {
    const nextParty = [];
    // Create a bigger party
    for (const group of parties) {
      let inter;
      for (const [i, g] of group.entries()) {
        if (i === 0) inter = nodes.get(g);
        else inter = inter.intersection(nodes.get(g));
      }

      // Refine
      const last = group.at(-1);
      const out = [];
      for (const i of inter) {
        const t = nodes.get(i);
        // Check that every one in the group is in it
        if (i > last && t.isSupersetOf(new Set(group))) out.push(i);
      }

      for (const t of out) nextParty.push([...group, t]);
    }
    parties = nextParty;
  }

  return parties[0].join(",");
}

export default [part1, part2];
