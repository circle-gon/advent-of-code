function part1(input) {
  let points = 0;
  for (const line of input.split("\n")) {
    const part = line.slice(line.indexOf(":") + 1);
    const correctAnswers = [];
    const parts = part.split("|");
    let correctNums = 0;
    for (const f of parts[0].split(" ")) {
      if (f === "") continue;
      correctAnswers.push(f);
    }
    for (const g of parts[1].split(" ")) {
      if (g === "") continue;
      if (correctAnswers.includes(g)) correctNums++;
    }
    if (correctNums > 0) points += 2 ** (correctNums - 1);
  }
  return points;
}

function part2(input) {
  let points = 0;
  const cardCount = new Map();

  function giveSome(x, y) {
    cardCount.set(x, y + (cardCount.get(x) ?? 0));
  }

  let idx = 0;
  for (const line of input.split("\n")) {
    // The original
    giveSome(idx, 1);

    const part = line.slice(line.indexOf(":") + 1);
    const correctAnswers = [];
    const parts = part.split("|");
    let correctNums = 0;
    for (const f of parts[0].split(" ")) {
      if (f === "") continue;
      correctAnswers.push(f);
    }
    for (const g of parts[1].split(" ")) {
      if (g === "") continue;
      if (correctAnswers.includes(g)) correctNums++;
    }

    const cards = cardCount.get(idx);

    // for each of the correct numbers, we get one card of the next for each card
    for (let i = 1; i <= correctNums; i++) {
      giveSome(idx + i, cards);
    }

    idx++;
  }
  return [...cardCount.values()].reduce((a, b) => a + b);
}

export default [part1, part2]