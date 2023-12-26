function parse(input) {
  const galaxies = [];
  for (const [x, line] of input.split("\n").entries()) {
    for (const [y, char] of line.split("").entries()) {
      if (char === "#") galaxies.push([x, y]);
    }
  }

  return galaxies;
}

function expand(input, expansion) {
  const galaxies = parse(input);

  const insertX = [],
    insertY = [];
  const maxX = Math.max(...galaxies.map((i) => i[0])),
    maxY = Math.max(...galaxies.map((i) => i[1]));

  // check for blank rows
  for (let i = 0; i <= maxX; i++) {
    if (galaxies.every((j) => j[0] !== i)) insertX.push(i);
  }

  for (let i = 0; i <= maxY; i++) {
    if (galaxies.every((j) => j[1] !== i)) insertY.push(i);
  }

  for (let i = 0; i < insertX.length; i++) {
    for (const glxy of galaxies) {
      if (glxy[0] > insertX[i] + i * expansion) glxy[0] += expansion;
    }
  }

  for (let i = 0; i < insertY.length; i++) {
    for (const glxy of galaxies) {
      if (glxy[1] > insertY[i] + i * expansion) glxy[1] += expansion;
    }
  }

  let distance = 0;

  for (let i = 0; i < galaxies.length; i++) {
    for (let j = 0; j < i; j++) {
      const glxyA = galaxies[i],
        glxyB = galaxies[j];
      distance += Math.abs(glxyA[0] - glxyB[0]) + Math.abs(glxyA[1] - glxyB[1]);
    }
  }
  return distance;
}

function part1(input) {
  return expand(input, 1);
}

function part2(input) {
  return expand(input, 1e6 - 1);
}

export default [part1, part2]