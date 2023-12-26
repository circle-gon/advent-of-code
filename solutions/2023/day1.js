const NUMS = "0123456789".split("");
const DIGITS = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const P = [...NUMS, ...DIGITS];

function part1(input) {
  let sum = 0;
  for (const inp of input.split("\n")) {
    const nums = inp.split("").filter((i) => NUMS.includes(i));
    // take the first and the last and string them together
    const number = nums.at(0) + nums.at(-1);
    sum += Number(number);
  }
  return sum;
}

function convert(f) {
  const n = DIGITS.indexOf(f);
  return n !== -1 ? String(n + 1) : f;
}

function part2(input) {
  let sum = 0;
  for (const inp of input.split("\n")) {
    let start, end;
    let startInd = Infinity,
      endInd = -Infinity;
    for (const f of P) {
      // could be matched multiple times
      const ind = inp.matchAll(f);
      const r = ind.next();
      // doesn't exist
      if (r.done) continue;
      const first = r.value.index;

      // last could also be the first when only one number
      // is specified
      let last = first;
      while (true) {
        const v = ind.next();
        if (v.done) break;
        last = v.value.index;
      }

      if (first < startInd) {
        startInd = first;
        start = convert(f);
      }
      if (last > endInd) {
        endInd = last;
        end = convert(f);
      }
    }
    // take the first and the last and string them together
    const number = Number(start + end);
    sum += number;
  }
  return sum;
}

export default [part1, part2]