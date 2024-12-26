function parse(input) {
  return input.split("\n");
}

function count(str) {
  let idx = 0;
  let count = 0;
  while (idx < str.length) {
    const prev = str[idx - 1];
    const char = str[idx];
    const skip =
      (char === "\\" && prev === "\\") || (char === '"' && prev === "\\");
    const skipSpecial = char === "x" && prev === "\\";
    if (skip) {
      idx += 2;
      count++;
    } else if (skipSpecial) idx += 3;
    else {
      count++;
      idx++;
    }
  }
  return count - 2;
}

function encode(str) {
  let count = 0;
  for (const char of str) {
    if (char === "\\" || char === '"') count += 2;
    else count++;
  }
  return count + 2;
}

function part1(input) {
  const strings = parse(input);
  let diff = 0;
  for (const str of strings) {
    const code = str.length;
    const mem = count(str);
    diff += code - mem;
  }
  return diff;
}

function part2(input) {
  const strings = parse(input);
  let diff = 0;
  for (const str of strings) {
    const code = str.length;
    const enc = encode(str);
    console.log(enc, code);
    diff += enc - code;
  }
  return diff;
}

export default [part1, part2];
