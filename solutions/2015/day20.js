// Thank you https://www.reddit.com/r/adventofcode/comments/3xjpp2/comment/cy59zd9/
function find(num, part2) {
  const times = part2 ? 11 : 10;
  const need = Math.ceil(num / times);
  const presents = Array(need).fill(10);
  for (let i = 2; i < need; i++) {
    const def = Math.ceil(need / i);
    const go = part2 ? Math.min(def, 50) : def;
    for (let j = 1; j < go; j++) presents[i * j] += times * i;
  }

  for (let i = 0; i < need; i++) if (presents[i] >= num) return i;
  return "Bad input";
}

function part1(input) {
  const num = Number(input);
  return find(num, false);
}

function part2(input) {
  const num = Number(input);
  return find(num, true);
}

export default [part1, part2];
