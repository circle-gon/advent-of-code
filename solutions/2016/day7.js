function parse(input) {
  return input.split("\n");
}

function part1(input) {
  let count = 0;
  const lines = parse(input);
  for (const line of lines) {
    let inBracket = false;
    let works = false,
      bad = false;
    for (let i = 3; i < line.length; i++) {
      const a = line[i - 3],
        b = line[i - 2],
        c = line[i - 1],
        d = line[i];
      if (a !== b && a === d && b === c) {
        if (inBracket) bad = true;
        else works = true;
      }
      if (d === "[") inBracket = true;
      else if (d === "]") inBracket = false;
    }
    if (works && !bad) count++;
  }
  return count;
}

function part2(input) {
  let count = 0;
  const lines = parse(input);
  for (const line of lines) {
    let inBracket = false;
    const seen = new Set();
    const matched = new Set();
    for (let i = 2; i < line.length; i++) {
      const a = line[i - 2],
        b = line[i - 1],
        c = line[i];
      if (a === c && b !== a) {
        if (inBracket) matched.add(a + b + c);
        else seen.add(b + a + b);
      }
      if (c === "[") inBracket = true;
      else if (c === "]") inBracket = false;
    }
    if (!seen.isDisjointFrom(matched)) count++;
  }
  return count;
}

export default [part1, part2];
