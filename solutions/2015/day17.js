function parse(input) {
  return input.split("\n").map((i) => Number(i));
}

function part1(input, _, example) {
  const req = example ? 25 : 150;
  const jars = parse(input);
  let count = 0;
  for (let i = 0; i < 1 << jars.length; i++) {
    let sum = 0;
    for (const [id, jar] of jars.entries()) {
      const mask = 1 << id;
      if ((i & mask) === mask) sum += jar;
    }
    if (sum === req) count++;
  }
  return count;
}

function part2(input, _, example) {
  const req = example ? 25 : 150;
  const jars = parse(input);
  let min = Infinity,
    count = 0;
  for (let i = 0; i < 1 << jars.length; i++) {
    let sum = 0;
    let used = 0;
    for (const [id, jar] of jars.entries()) {
      const mask = 1 << id;
      if ((i & mask) === mask) {
        used++;
        sum += jar;
      }
    }
    if (sum === req && used <= min) {
      if (used < min) {
        min = used;
        count = 0;
      }
      count++;
    }
  }
  return count;
}

export default [part1, part2];
