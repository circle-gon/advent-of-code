function parse(input) {
  return input.split("\n").map((i) =>
    i
      .trim()
      .split(/ +/)
      .map((i) => Number(i))
  );
}

function part1(input) {
  const triangles = parse(input);
  let possible = 0;
  for (const [a, b, c] of triangles) {
    if (a + b > c && a + c > b && b + c > a) possible++;
  }
  return possible;
}

function part2(input) {
  const triangles = parse(input);
  let possible = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 2; j < triangles.length; j += 3) {
      const a = triangles[j][i]
      const b = triangles[j - 1][i]
      const c = triangles[j - 2][i]
      if (a + b > c && a + c > b && b + c > a) possible++;
    }
  }
  return possible;
}

export default [part1, part2];
