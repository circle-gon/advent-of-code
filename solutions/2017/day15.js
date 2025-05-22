function parse(input) {
  return input.split("\n").map((i) => Number(i.split(" ")[4]));
}

const BIT_16 = 2 ** 16 - 1;
function part1(input) {
  let [a, b] = parse(input);
  let count = 0;
  for (let i = 0; i < 4e7; i++) {
    a = (a * 16807) % 2147483647;
    b = (b * 48271) % 2147483647;

    if ((a & BIT_16) === (b & BIT_16)) count++;
  }
  return count;
}

function part2(input) {
  let [a, b] = parse(input);
  const chooseA = [];
  const chooseB = [];

  let count = 0;
  let seen = 0;

  while (seen < 5e6) {
    a = (a * 16807) % 2147483647;
    b = (b * 48271) % 2147483647;

    if (a % 4 === 0) chooseA.push(a);
    if (b % 8 === 0) chooseB.push(b);
    if (seen < chooseA.length && seen < chooseB.length) {
      if ((chooseA[seen] & BIT_16) === (chooseB[seen] & BIT_16)) count++;
      seen++;
    }
  }
  return count;
}

export default [part1, part2];
