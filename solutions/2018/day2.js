function parse(input) {
  return input.split("\n");
}

function part1(input) {
  const letters = parse(input);
  let double = 0;
  let triple = 0;
  for (const group of letters) {
    const arr = Object.values(Object.groupBy(group, (x) => x));
    const d = arr.some((i) => i.length === 2);
    const t = arr.some((i) => i.length === 3);
    if (d) double++;
    if (t) triple++;
  }
  return double * triple;
}

function close(a, b) {
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) mismatch++;
  }
  return mismatch === 1;
}

function part2(input) {
  const letters = parse(input);
  for (const group of letters) {
    for (const otherGroup of letters) {
      if (close(group, otherGroup))
        return group
          .split("")
          .filter((i, j) => otherGroup[j] === i)
          .join("");
    }
  }
  return "Is your input malformed?";
}

export default [part1, part2];
