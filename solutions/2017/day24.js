function parse(input) {
  return input.split("\n").map((i) => i.split("/").map((i) => Number(i)));
}

function getMax(comps, end, currScore, used) {
  let score = currScore;
  for (const comp of comps) {
    let other = -1;
    if (comp[0] === end) {
      other = comp[1];
    }
    if (comp[1] === end) {
      other = comp[0];
    }
    if (other !== -1 && !used.has(comp))
      score = Math.max(
        score,
        getMax(
          comps,
          other,
          currScore + comp[0] + comp[1],
          new Set(used).add(comp)
        )
      );
  }
  return score;
}

function part1(input) {
  const comps = parse(input);
  let score = 0;
  for (const comp of comps) {
    let other = -1;
    if (comp[0] === 0) {
      other = comp[1];
    }
    if (comp[1] === 0) {
      other = comp[0];
    }
    if (other !== -1)
      score = Math.max(score, getMax(comps, other, other, new Set([comp])));
  }
  return score;
}

function getMax2(comps, end, currScore, used) {
  let score = currScore;
  let width = used.size;
  for (const comp of comps) {
    let other = -1;
    if (comp[0] === end) {
      other = comp[1];
    }
    if (comp[1] === end) {
      other = comp[0];
    }
    if (other !== -1 && !used.has(comp)) {
      const [newScore, newWidth] = getMax2(
        comps,
        other,
        currScore + comp[0] + comp[1],
        new Set(used).add(comp)
      );
      if (newWidth > width || (newWidth === width && newScore > score)) {
        width = newWidth;
        score = newScore;
      }
    }
  }
  return [score, width];
}

function part2(input) {
  const comps = parse(input);
  let score = 0;
  let width = 0;
  for (const comp of comps) {
    let other = -1;
    if (comp[0] === 0) {
      other = comp[1];
    }
    if (comp[1] === 0) {
      other = comp[0];
    }
    if (other !== -1) {
      const [newScore, newWidth] = getMax2(comps, other, other, new Set([comp]));
      if (newWidth > width || (newWidth === width && newScore > score)) {
        width = newWidth;
        score = newScore;
      }
    }
  }
  return score;
}

export default [part1, part2];
