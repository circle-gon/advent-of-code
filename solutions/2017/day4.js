function parse(input) {
  return input.split("\n").map((i) => i.split(" "));
}

function part1(input) {
  const phrases = parse(input);
  let valid = 0;
  for (const pass of phrases) {
    if (pass.length === new Set(pass).size) valid++;
  }
  return valid;
}

function part2(input) {
  const phrases = parse(input);
  let valid = 0;
  for (const pass of phrases) {
    const realPass = pass.map((i) => i.split("").sort().join(""));
    if (realPass.length === new Set(realPass).size) valid++;
  }
  return valid;
}

export default [part1, part2];
