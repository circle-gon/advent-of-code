function parse(input) {
  return [...input.matchAll(/\d+/g)].map((i) => Number(i[0]));
}

function part1(input) {
  const [grow, gcol] = parse(input);
  let row = 1,
    col = 1,
    code = 20151125;
  while (true) {
    if (row === grow && col === gcol) return code;
    code = (code * 252533) % 33554393;
    if (row > 1) {
      row--;
      col++;
    } else {
      row = col + 1;
      col = 1;
    }
  }
}

export default [part1];
