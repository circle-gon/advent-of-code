function hash(x, y) {
  return `${x},${y}`;
}

const TO_CHECK = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function advance(map, x, y, item) {
  if (item === "E") {
    map.set(hash(x + 1, y), "|");
    map.set(hash(x + 2, y), ".");
    x += 2;
  } else if (item === "N") {
    map.set(hash(x, y - 1), "|");
    map.set(hash(x, y - 2), ".");
    y -= 2;
  } else if (item === "W") {
    map.set(hash(x - 1, y), "|");
    map.set(hash(x - 2, y), ".");
    x -= 2;
  } else if (item === "S") {
    map.set(hash(x, y + 1), "|");
    map.set(hash(x, y + 2), ".");
    y += 2;
  }
  return hash(x, y);
}

function parseBranch(regex, idx) {
  const out = [];
  idx++; // skip (
  while (idx < regex.length && regex[idx] !== ")") {
    const [a, b] = parseUnit(regex, idx);
    out.push(a);
    idx = b;
    if (regex[idx] === "|") {
      idx++;
      if (regex[idx] === ")") out.push([""]);
    }
  }
  idx++; // skip )
  return [out, idx];
}

function parseUnit(regex, idx) {
  const out = [];
  while (idx < regex.length && regex[idx] !== ")" && regex[idx] !== "|") {
    if (regex[idx] === "(") {
      const [a, b] = parseBranch(regex, idx);
      out.push(a);
      idx = b;
    } else {
      out.push(regex[idx]);
      idx++;
    }
  }
  return [out, idx];
}

function generateMap(map, tree, c) {
  let coords = c;
  for (const item of tree) {
    let next = new Set();
    if (Array.isArray(item)) {
      for (const choices of item)
        next = next.union(generateMap(map, choices, coords));
    } else {
      const iter = [...coords].map((i) => i.split(",").map((i) => Number(i)));
      for (const c of iter) next.add(advance(map, c[0], c[1], item));
    }
    coords = next;
  }
  return coords;
}

function getPossible(map, x, y, doors) {
  const routes = [];
  for (const [xi, yi] of TO_CHECK) {
    const xa = x + 2 * xi;
    const ya = y + 2 * yi;

    const xb = x + xi;
    const yb = y + yi;

    if (map.get(hash(xa, ya)) === "." && map.get(hash(xb, yb)) === "|")
      routes.push([xa, ya, doors + 1]);
  }
  return routes;
}

function maxDistance(map) {
  const distances = new Map()
  const queue = [[0, 0, 0]];
  const seen = new Set([hash(0, 0)]);

  while (queue.length > 0) {
    const [x, y, dist] = queue.shift();
    distances.set(hash(x, y), dist)
    for (const paths of getPossible(map, x, y, dist)) {
      if (!seen.has(hash(paths[0], paths[1]))) {
        seen.add(hash(paths[0], paths[1]));
        queue.push(paths);
      }
    }
  }

  return distances;
}

function genResult(input) {
  const map = new Map();
  const tree = parseUnit(input.slice(1, -1), 0)[0];
  generateMap(map, tree, new Set([hash(0, 0)]));
  return maxDistance(map);
}

function part1(input) {
  const map = genResult(input)
  return [...map.values()].sort((a, b) => b - a)[0]
}

function part2(input) {
  const map = genResult(input)
  return [...map.values()].reduce((a, b) => a + (b >= 1000 ? 1 : 0), 0)
}

export default [part1, part2];
