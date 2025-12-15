import { LinkedListNode } from "/externals.js";

function parse(input) {
  const blank = input.split(" ");
  return [Number(blank[0]), Number(blank[6])];
}

function simulate(players, end) {
  const scores = Array(players).fill(0);
  let current = LinkedListNode.root(0);

  for (let i = 1; i <= end; i++) {
    if (i % 23 !== 0) current = current.after.add(new LinkedListNode(i));
    else {
      const turn = (i - 1) % players;
      const back = current.behind(7);

      scores[turn] += i + back.value;
      current = back.after;
      back.remove();
    }
  }

  return Math.max(...scores);
}

function part1(input) {
  const [players, end] = parse(input);
  return simulate(players, end);
}

function part2(input) {
  const [players, end] = parse(input);
  return simulate(players, end * 100);
}

export default [part1, part2];
