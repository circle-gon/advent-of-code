function parse(input) {
  const lines = input.split("\n");
  const freqs = Array(lines[0].length)
    .fill()
    .map(() => new Map());
  for (const line of lines) {
    for (const [idx, char] of line.split("").entries()) {
      add(freqs[idx], char);
    }
  }
  return freqs;
}

function add(map, letter) {
  map.set(letter, (map.get(letter) ?? 0) + 1);
}

function solve(input, part2) {
  const freqs = parse(input);
  const factor = part2 ? -1 : 1;
  let out = "";
  for (const freq of freqs) {
    out += [...freq.entries()].sort((i, j) => factor * (j[1] - i[1]))[0][0];
  }
  return out;
}

function part1(input) {
  return solve(input, false);
}

function part2(input) {
  return solve(input, true);
}

export default [part1, part2];
