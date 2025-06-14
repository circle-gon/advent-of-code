function parse(input) {
  return input.split("\n\n").map((i) => i.split("\n").map((j) => new Set(j)));
}

function part1(input) {
  const groups = parse(input);
  let count = 0;
  for (const group of groups) {
    let yes = new Set();
    for (const person of group) yes = yes.union(person);
    count += yes.size;
  }
  return count;
}

function part2(input) {
  const groups = parse(input);
  let count = 0;
  for (const group of groups) {
    let yes = new Set("abcdefghijklmnopqrstuvwxyz");
    for (const person of group) yes = yes.intersection(person);
    count += yes.size;
  }
  return count;
}

export default [part1, part2];
