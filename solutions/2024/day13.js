function parse(input) {
  const games = [];
  for (const game of input.split("\n\n")) {
    const xs = [...game.matchAll(/X\+(\d+)/g)];
    const ys = [...game.matchAll(/Y\+(\d+)/g)];
    const tx = game.match(/X=(\d+)/);
    const ty = game.match(/Y=(\d+)/);
    games.push([
      Number(xs[0][1]),
      Number(ys[0][1]),
      Number(xs[1][1]),
      Number(ys[1][1]),
      Number(tx[1]),
      Number(ty[1]),
    ]);
  }
  return games;
}

function gen(input, offset) {
  const games = parse(input);
  let cost = 0;
  for (const [x1, y1, x2, y2, txp, typ] of games) {
    const tx = txp + offset;
    const ty = typ + offset;
    const first = (ty * x2 - tx * y2) / (x2 * y1 - x1 * y2);
    const second = (ty * x1 - tx * y1) / (x1 * y2 - x2 * y1);
    if (
      Number.isInteger(first) &&
      Number.isInteger(second) &&
      // Somehow this isn't necessary on the inputs but this is safer anyway
      first >= 0 &&
      second >= 0
    ) {
      cost += first * 3 + second;
    }
  }
  return cost;
}

function part1(input) {
  return gen(input, 0);
}

function part2(input) {
  return gen(input, 1e13);
}

export default [part1, part2];
