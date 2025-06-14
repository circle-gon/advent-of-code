function parse(input) {
  const out = [];
  for (const line of input.split("\n")) {
    const [counts, letters, password] = line.split(" ");
    const [num1, num2] = counts.split("-").map((i) => Number(i));
    out.push([num1, num2, letters[0], password]);
  }
  return out;
}

function countOccurrence(password, thing) {
  let count = 0;
  for (const char of password) {
    if (char === thing) count++;
  }
  return count;
}

function part1(input) {
  const passwords = parse(input);
  let correct = 0;
  for (const [min, max, letter, pass] of passwords) {
    const times = countOccurrence(pass, letter);
    if (times >= min && times <= max) correct++;
  }
  return correct;
}

function part2(input) {
  const passwords = parse(input);
  let correct = 0;
  for (const [min, max, letter, pass] of passwords) {
    const idx1 = pass[min - 1] === letter;
    const idx2 = pass[max - 1] === letter;
    if (idx1 ^ idx2) correct++;
  }
  return correct;
}

export default [part1, part2];
