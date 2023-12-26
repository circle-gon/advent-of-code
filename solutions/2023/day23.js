// With help from from https://github.com/surgi1/adventofcode/blob/main/2023/day23/script.js

const DS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];
const D = { ">": 0, v: 1, "<": 2, "^": 3 };

function key(p) {
  return p[0] + "_" + p[1];
}

function addVect(a, b) {
  return a.map((v, c) => v + b[c]);
}

function validPos(map, p) {
  return (
    map[p[1]] !== undefined &&
    map[p[1]][p[0]] !== undefined &&
    map[p[1]][p[0]] !== "#"
  );
}

function parse(input) {
  return input.split("\n").map((line) => line.split(""));
}

function getGraph(input) {
  const map = parse(input);
  const startPos = [1, 0];
  const endPos = [map[0].length - 2, map.length - 1];

  function addConnectNode(cur) {
    // try to locate existing one
    let newJuncId = nodes.findIndex(
      (n) => n.p[0] === cur.p[0] && n.p[1] === cur.p[1]
    );

    if (newJuncId === cur.lastJuncId) return newJuncId;

    if (newJuncId === -1)
      newJuncId = nodes.push({ p: [...cur.p], connections: [] }) - 1;

    // we need to connect cur.lastJuncId and newJuncId
    if (
      nodes[cur.lastJuncId].connections.findIndex(
        (conn) => conn.id === newJuncId
      ) === -1
    )
      nodes[cur.lastJuncId].connections.push({
        id: newJuncId,
        distance: cur.steps - cur.stepsToLastJunc,
      });

    if (
      nodes[newJuncId].connections.findIndex(
        (conn) => conn.id === cur.lastJuncId
      ) === -1
    )
      nodes[newJuncId].connections.push({
        id: cur.lastJuncId,
        distance: cur.steps - cur.stepsToLastJunc,
      });

    return newJuncId;
  }

  const stack = [
      { p: [...startPos], steps: 0, lastJuncId: 0, stepsToLastJunc: 0 },
    ],
    nodes = [{ p: [1, 0], connections: [] }],
    seen = {};

  while (stack.length > 0) {
    const cur = stack.pop(),
      k = key(cur.p),
      moves = DS.map((d) => addVect(cur.p, d)).filter((item) =>
        validPos(map, item)
      );

    if (moves.length > 2) {
      cur.lastJuncId = addConnectNode(cur);
      cur.stepsToLastJunc = cur.steps;
    }

    if (seen[k] !== undefined) continue;
    seen[k] = 1;

    if (cur.p[0] === endPos[0] && cur.p[1] === endPos[1]) {
      addConnectNode(cur);
      continue;
    }

    for (const np of moves) {
      stack.push({
        p: np,
        steps: cur.steps + 1,
        lastJuncId: cur.lastJuncId,
        stepsToLastJunc: cur.stepsToLastJunc,
      });
    }
  }

  return nodes;
}

function part1(input) {
  const map = parse(input);
  const startPos = [1, 0];
  const endPos = [map[0].length - 2, map.length - 1];

  function getMoves(cur) {
    const moves = [],
      v = map[cur.p[1]][cur.p[0]];

    if (D[v] !== undefined) moves.push(addVect(cur.p, DS[D[v]]));
    else {
      for (const d of DS) {
        moves.push(addVect(cur.p, d));
      }
    }

    return moves.filter(
      (p) => validPos(map, p) && cur.seen[key(p)] === undefined
    );
  }

  const stack = [{ p: startPos.slice(), steps: 0, seen: {} }];

  let maxSteps = 0;

  while (stack.length > 0) {
    const cur = stack.pop();

    const k = key(cur.p);
    cur.seen[k] = 1;

    let moves = getMoves(cur);
    while (moves.length === 1) {
      cur.seen[key(moves[0])] = 1;
      cur.steps++;
      cur.p = moves[0];
      moves = getMoves(cur);
    }

    if (cur.p[0] === endPos[0] && cur.p[1] === endPos[1]) {
      maxSteps = Math.max(maxSteps, cur.steps);
      continue;
    }

    for (const np of moves) {
      stack.push({
        p: np,
        steps: cur.steps + 1,
        seen: { ...cur.seen },
      });
    }
  }

  return maxSteps;
}

function part2(input) {
  const nodes = getGraph(input);

  const stack = [{ p: 0, steps: 0, seen: {} }],
    endNodeId = nodes.length - 1;

  let maxSteps = 0;

  while (stack.length > 0) {
    const cur = stack.pop();

    const k = cur.p;
    cur.seen[k] = 1;

    if (cur.p === endNodeId) {
      maxSteps = Math.max(cur.steps, maxSteps);
      continue;
    }

    for (const node of nodes[k].connections.filter(
      (n) => cur.seen[n.id] === undefined
    )) {
      stack.push({
        p: node.id,
        steps: cur.steps + node.distance,
        seen: { ...cur.seen },
      });
    }
  }

  return maxSteps;
}

export default [part1, part2];
