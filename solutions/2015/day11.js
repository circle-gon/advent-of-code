const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

function parse(input) {
  return input.split("").map((i) => ALPHABET.indexOf(i));
}

function isGood(pass) {
  let straight = false;
  const pairs = new Set();
  for (const [idx, char] of pass.entries()) {
    const prev = pass[idx - 1];
    if (idx >= 2 && char === prev + 1 && prev === pass[idx - 2] + 1)
      straight = true;
    if (char === prev) pairs.add(char);
  }
  return pairs.size >= 2 && straight;
}

function findNext(input, times) {
  const pass = parse(input);
  let good = 0;
  while (true) {
    pass[pass.length - 1]++;
    for (let i = pass.length - 1; i >= 0; i--) {
      const c = ALPHABET[pass[i]];
      if (c === "i" || c === "o" || c === "l") {
        pass[i]++;
        for (let j = i + 1; j < pass.length; j++) pass[j] = 0;
      }
      if (i > 0 && pass[i] === ALPHABET.length) {
        pass[i - 1]++;
        pass[i] = 0;
      }
    }

    if (isGood(pass)) {
      good++;
      if (good === times) return pass.map((i) => ALPHABET[i]).join("");
    }
  }
}

function part1(input) {
  return findNext(input, 1);
}

function part2(input) {
  return findNext(input, 2);
}

export default [part1, part2];
