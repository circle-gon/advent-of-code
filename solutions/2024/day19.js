function parse(input) {
  cache.clear();

  const [p, n] = input.split("\n\n");
  return {
    patterns: p.split(", "),
    need: n.split("\n"),
  };
}

const cache = new Map();
function check(word, patterns) {
  if (word === "") return 1;
  if (cache.has(word)) return cache.get(word);
  let count = 0;
  for (const pattern of patterns)
    if (word.startsWith(pattern))
      count += check(word.slice(pattern.length), patterns);
  cache.set(word, count);
  return count;
}

function part1(input) {
  const { patterns, need } = parse(input);
  let can = 0;
  for (const n of need) if (check(n, patterns) > 0) can++;
  return can;
}

function part2(input) {
  const { patterns, need } = parse(input);
  let can = 0;
  for (const n of need) can += check(n, patterns);
  return can;
}

export default [part1, part2];
