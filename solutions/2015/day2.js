function parse(input) {
  const boxes = [];
  for (const line of input.split("\n")) {
    boxes.push(line.split("x").map((i) => Number(i)));
  }
  return boxes;
}

function part1(input) {
  const boxes = parse(input);
  let req = 0;
  for (const [l, w, h] of boxes) {
    const areas = [l * w, l * h, w * h];
    const slack = Math.min(...areas);
    const need = 2 * areas.reduce((a, b) => a + b);
    req += need + slack;
  }
  return req;
}

function part2(input) {
  const boxes = parse(input);
  let req = 0;
  for (const [l, w, h] of boxes) {
    const perims = 2 * Math.min(l + w, l + h, w + h);
    const bow = l * w * h;
    req += perims + bow;
  }
  return req;
}

export default [part1, part2];
