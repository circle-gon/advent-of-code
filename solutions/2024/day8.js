function parse(input) {
  const nodes = new Map();

  for (const [y, line] of input.split("\n").entries()) {
    for (const [x, point] of line.split("").entries()) {
      if (point !== ".") {
        if (!nodes.has(point)) nodes.set(point, []);
        nodes.get(point).push([x, y]);
      }
    }
  }

  return {
    width: input.indexOf("\n"),
    height: input.split("\n").length,
    nodes,
  };
}

function hash(x, y) {
  return `${x},${y}`;
}

function okay(x, y, width, height) {
  return x >= 0 && x < width && y >= 0 && y < height;
}

function gcd(a, b) {
  let r = 0;
  while (b !== 0) {
    r = a % b;
    a = b;
    b = r;
  }
  return a;
}

function part1(input) {
  const { width, height, nodes } = parse(input);

  const points = new Set();
  for (const nodeGroup of nodes.values()) {
    for (let i = 0; i < nodeGroup.length; i++) {
      for (let j = 0; j < i; j++) {
        // Calculate antinodes
        const x1 = nodeGroup[i][0];
        const y1 = nodeGroup[i][1];
        const x2 = nodeGroup[j][0];
        const y2 = nodeGroup[j][1];

        const p1x = 2 * x1 - x2;
        const p1y = 2 * y1 - y2;
        const p2x = 2 * x2 - x1;
        const p2y = 2 * y2 - y1;

        if (okay(p1x, p1y, width, height)) points.add(hash(p1x, p1y));
        if (okay(p2x, p2y, width, height)) points.add(hash(p2x, p2y));
      }
    }
  }
  return points.size;
}

function part2(input) {
  const { width, height, nodes } = parse(input);
  const h = Math.max(width, height);

  const points = new Set();
  for (const nodeGroup of nodes.values()) {
    for (let i = 0; i < nodeGroup.length; i++) {
      for (let j = 0; j < i; j++) {
        // Calculate antinodes
        const x1 = nodeGroup[i][0];
        const y1 = nodeGroup[i][1];
        const x2 = nodeGroup[j][0];
        const y2 = nodeGroup[j][1];

        const slopeXr = x2 - x1;
        const slopeYr = y2 - y1;
        const g = gcd(slopeXr, slopeYr);
        const slopeX = slopeXr / g;
        const slopeY = slopeYr / g;

        // I'm too lazy to figure out a better solution
        for (let i = -h; i <= h; i++) {
          const x = x1 + slopeX * i;
          const y = y1 + slopeY * i;
          if (okay(x, y, width, height)) points.add(hash(x, y));
        }
      }
    }
  }
  return points.size;
}

export default [part1, part2];
