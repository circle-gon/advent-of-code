// With help from from https://github.com/surgi1/adventofcode/blob/main/2023/day23/script.jsimport { spawnWorkerFor, format } from "/utils.js";
import { spawnWorkerFor, format } from "/utils.js";
import { parse, DS, addVect, validPos, key } from "./shared.js";
import worker from "./worker.js?worker&url";

const D = { ">": 0, v: 1, "<": 2, "^": 3 };
function part1(input) {
  const map = parse(input);
  const startPos = [1, 0];
  const endPos = [map[0].length - 2, map.length - 1];

  function getMoves(cur) {
    const moves = [],
      v = map[cur.p[1]][cur.p[0]];

    if (D[v] !== undefined) moves.push(addVect(cur.p, DS[D[v]]));
    else DS.forEach((d) => moves.push(addVect(cur.p, d)));

    return moves.filter(
      (p) => validPos(map, p) && cur.seen[key(p)] === undefined,
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

const spawn = spawnWorkerFor(worker);
function part2(input, u) {
  let i = 0;
  const update = () => {
    u(`(${format(1e6 * i++)} iterations done)`);
  };
  update();

  return spawn(input, 0, update);
}

export default [part1, part2];
