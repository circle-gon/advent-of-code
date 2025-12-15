function parse(input) {
  const players = [];
  for (const player of input.split("\n\n")) {
    const cards = player
      .split("\n")
      .slice(1)
      .map((i) => Number(i))
      .reverse();
    players.push(cards);
  }
  return players;
}

function part1(input) {
  const [a, b] = parse(input);
  while (a.length !== 0 && b.length !== 0) {
    const topA = a.pop();
    const topB = b.pop();
    if (topA > topB) {
      // A wins!
      a.unshift(topB, topA);
    } else {
      b.unshift(topA, topB);
    }
  }
  return (a.length === 0 ? b : a).reduce((a, b, i) => a + b * (i + 1));
}

function playGame(a, b) {
  const gameSet = new Set();
  while (a.length !== 0 && b.length !== 0) {
    const hash = `${a.join(",")} ${b.join(", ")}`;
    if (gameSet.has(hash)) return true;
    gameSet.add(hash);
    const topA = a.pop();
    const topB = b.pop();
    const winner =
      a.length >= topA && b.length >= topB
        ? playGame(a.slice(-topA), b.slice(-topB))
        : topA > topB;
    if (winner) {
      a.unshift(topB, topA);
    } else {
      b.unshift(topA, topB);
    }
  }
  return b.length === 0;
}

function part2(input) {
  const [a, b] = parse(input);
  const winner = playGame(a, b);
  return [a, b][1 - winner].reduce((a, b, i) => a + b * (i + 1));
}

export default [part1, part2];
