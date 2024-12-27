function parse(input) {
  return input.split("").map((i) => Number(i));
}

function run(input, times) {
  let seq = parse(input);
  for (let i = 0; i < times; i++) {
    const out = [];
    let count = 1,
      prev = seq[0];
    for (let j = 1; j < seq.length; j++) {
      const a = seq[j];
      if (a === prev) count++;
      else {
        out.push(count, prev);
        prev = a;
        count = 1;
      }
    }
    out.push(count, prev);
    seq = out;
  }
  return seq.length;
}

function part1(input, _, example) {
  return run(input, example ? 1 : 40);
}

function part2(input) {
  return run(input, 50);
}

export default [part1, part2];
