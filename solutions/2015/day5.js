function parse(input) {
  return input.split("\n");
}

const VOWELS = "aeiou";
function isNice(string) {
  let prev = string[0];
  let vowels = VOWELS.includes(prev) ? 1 : 0;
  let twice = false;

  for (let i = 1; i < string.length; i++) {
    const curr = string[i];
    if (prev === "a" && curr === "b") return false;
    if (prev === "c" && curr === "d") return false;
    if (prev === "p" && curr === "q") return false;
    if (prev === "x" && curr === "y") return false;
    if (prev === curr) twice = true;
    if (VOWELS.includes(curr)) vowels++;
    prev = curr;
  }
  return twice && vowels >= 3;
}

function isNice2(string) {
  const pairs = new Map();
  let good = false;
  let paired = false;
  for (let i = 1; i < string.length; i++) {
    const pair = string.slice(i - 1, i + 1);
    const num = pairs.get(pair);
    if (num !== undefined) {
      if (i >= num + 2) good = true;
    } else pairs.set(pair, i);
    if (string[i] === string[i - 2]) paired = true;
  }
  return good && paired;
}

function count(input, part2) {
  const words = parse(input);
  const func = part2 ? isNice2 : isNice;
  let nice = 0;
  for (const word of words) {
    if (func(word)) nice++;
  }
  return nice;
}

function part1(input) {
  return count(input, false);
}

function part2(input) {
  return count(input, true);
}

export default [part1, part2];
