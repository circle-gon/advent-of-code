function parse(input) {
  return JSON.parse(input);
}

function traverse(obj, part2) {
  const props = Object.values(obj);
  if (part2 && !Array.isArray(obj) && props.includes("red")) return 0;

  let sum = 0;
  for (const prop of props) {
    if (typeof prop === "number") sum += prop;
    else if (typeof prop === "object" && prop !== null)
      sum += traverse(prop, part2);
  }
  return sum;
}

function part1(input) {
  const obj = parse(input);
  return traverse(obj, false);
}

function part2(input) {
  const obj = parse(input);
  return traverse(obj, true);
}

export default [part1, part2];
