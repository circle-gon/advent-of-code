function parse(input) {
  const items = [];
  for (const line of input.split("\n")) {
    const parts = line.split(/ |, /);
    items.push([
      Number(parts[2]),
      Number(parts[4]),
      Number(parts[6]),
      Number(parts[8]),
      Number(parts[10]),
    ]);
  }
  return items;
}

// Thank you https://stackoverflow.com/questions/7748442/generate-all-possible-lists-of-length-n-that-sum-to-s-in-python#7748851
function* genSeq(length, sum) {
  if (length === 1) yield [sum];
  else {
    for (let i = 0; i <= sum; i++) {
      for (const comb of genSeq(length - 1, sum - i)) yield [i, ...comb];
    }
  }
}

function part1(input) {
  const items = parse(input);
  let score = 0;
  for (const nums of genSeq(items.length, 100)) {
    const stats = Array(4).fill(0);
    for (let i = 0; i < nums.length; i++) {
      for (let j = 0; j < 4; j++) stats[j] += items[i][j] * nums[i];
    }
    score = Math.max(
      score,
      stats.reduce((a, b) => a * Math.max(b, 0), 1),
    );
  }
  return score;
}

function part2(input) {
  const items = parse(input);
  let score = 0;
  for (const nums of genSeq(items.length, 100)) {
    const stats = Array(5).fill(0);
    for (let i = 0; i < nums.length; i++) {
      for (let j = 0; j < 5; j++) stats[j] += items[i][j] * nums[i];
    }
    if (stats[4] === 500)
      score = Math.max(
        score,
        stats.slice(0, -1).reduce((a, b) => a * Math.max(b, 0), 1),
      );
  }
  return score;
}

export default [part1, part2];
