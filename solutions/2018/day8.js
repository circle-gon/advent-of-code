function parse(input) {
  return input.split(" ").map((i) => Number(i));
}

function makeTree(chart, idx) {
  const count = chart[idx];
  const metadata = chart[idx + 1];
  const children = [];
  let length = 2;

  for (let i = 0; i < count; i++) {
    const tree = makeTree(chart, idx + length);
    length += tree.length;
    children.push(tree);
  }

  return {
    children,
    metadata: chart.slice(idx + length, idx + length + metadata),
    length: length + metadata,
  };
}

function getSum(tree) {
  let sum = tree.metadata.reduce((a, b) => a + b, 0);
  for (const child of tree.children) sum += getSum(child);
  return sum;
}

function getValue(tree) {
  if (tree === undefined) return 0;
  if (tree.children.length === 0)
    return tree.metadata.reduce((a, b) => a + b, 0);
  return tree.metadata
    .map((i) => getValue(tree.children[i - 1]))
    .reduce((a, b) => a + b, 0);
}

function part1(input) {
  return getSum(makeTree(parse(input), 0));
}

function part2(input) {
  return getValue(makeTree(parse(input), 0));
}

export default [part1, part2];
