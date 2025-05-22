function parse(input) {
  return input.replaceAll("\n", "");
}

function part1(input) {
  const parsed = parse(input);
  let len = 0;
  let i = 0;
  while (i < parsed.length) {
    if (parsed[i] !== "(") {
      len++;
      i++;
    } else {
      const next = parsed.indexOf(")", i);
      const str = parsed.slice(i + 1, next);
      const [a, b] = str.split("x").map((i) => Number(i));
      len += a * b;
      i = next + a + 1;
    }
  }
  return len;
}

function decompress(parsed, i) {
  const next = parsed.indexOf(")", i);
  const str = parsed.slice(i + 1, next);
  const [a, b] = str.split("x").map((i) => Number(i));

  let len = 0;
  const n = next + a + 1;
  let t = next + 1;
  while (true) {
    const find = parsed.indexOf("(", t);
    if (find >= n || find === -1) break;
    len += find - t;
    const [l, e] = decompress(parsed, find);
    len += l;
    t = e;
  }
  len += n - t;
  return [len * b, n];
}

function part2(input) {
  const parsed = parse(input);
  let len = 0;
  let i = 0;
  while (i < parsed.length) {
    if (parsed[i] !== "(") {
      len++;
      i++;
    } else {
      const [l, j] = decompress(parsed, i);
      len += l;
      i = j;
    }
  }
  return len;
}

export default [part1, part2];
