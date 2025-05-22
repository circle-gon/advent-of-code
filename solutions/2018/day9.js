import { LinkedList } from "/externals.js";

function parse(input) {
  const blank = input.split(" ");
  return [Number(blank[0]), Number(blank[6])];
}

function simulate(players, end) {
  const board = new LinkedList([0]);
  const scores = Array(players).fill(0);
  let current = board.root;

  for (let i = 1; i <= end; i++) {
    if (i % 23 !== 0) current = board.insert(i, current.after);
    else {
      const turn = (i - 1) % players;
      const back = current.behind(7);

      scores[turn] += i + back.value;
      board.remove(back);
      current = back.after;
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
