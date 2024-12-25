import { parse, key, DS, addVect, validPos } from "./shared.js";

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

function solve(echo, input) {
  const nodes = getGraph(input);

  const stack = [{ p: 0, steps: 0, seen: {} }],
    endNodeId = nodes.length - 1;

  let maxSteps = 0;

  let iter = 0
  while (stack.length > 0) {
    const cur = stack.pop();
    iter++
    if (iter % 1e6 === 0) self.postMessage({
      type: "msg",
      data: [echo]
    })

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

  return [echo, maxSteps];
}

self.addEventListener("message", e => {
  self.postMessage({
    type: "done",
    data: solve(...e.data)
  })
})