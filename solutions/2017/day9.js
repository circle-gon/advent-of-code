function part1(input) {
  let score = 0;
  let group = 0;
  let inGarbage = false;
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === "<") inGarbage = true;
    if (char === ">") inGarbage = false;
    if (inGarbage) {
      if (char === "!") i++;
    } else {
      if (char === "{") group++;
      if (char === "}") {
        score += group;
        group--;
      }
    }
  }
  return score;
}

function part2(input) {
  let score = 0;
  let inGarbage = false;
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === ">") inGarbage = false;
    if (inGarbage) {
      if (char === "!") i++;
      else score++;
    }
    // Don't question the placement
    if (char === "<") inGarbage = true;
  }
  return score;
}

export default [part1, part2];
