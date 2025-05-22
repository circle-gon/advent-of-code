function parse(input) {
  const out = [];
  for (const line of input.split("\n")) {
    const parts = line.split(" ");
    const [year, month, day] = parts[0]
      .slice(1)
      .split("-")
      .map((i) => Number(i));
    const [hour, minute] = parts[1]
      .slice(0, -1)
      .split(":")
      .map((i) => Number(i));
    let val;
    if (parts[2] === "Guard") val = Number(parts[3].slice(1));
    else val = parts[2];

    out.push([year, month, day, hour, minute, val]);
  }
  return out;
}

function simulate(logs) {
  const guards = new Map();
  logs.sort((a, b) => {
    for (let i = 0; i <= 4; i++) {
      const diff = a[i] - b[i];
      if (diff !== 0) return diff;
    }
    return 0;
  });

  let guard = -1;
  let sleep = 0;
  for (const [, , , , minute, val] of logs) {
    if (typeof val === "number") {
      guard = val;
      if (!guards.has(guard)) guards.set(guard, Array(60).fill(0));
    } else if (val === "wakes")
      for (let i = sleep; i < minute; i++) guards.get(guard)[i]++;
    else sleep = minute;
  }
  return guards;
}

function part1(input) {
  const guards = simulate(parse(input));

  const guardMin = [...guards.entries()].sort(
    (a, b) => b[1].reduce((a, b) => a + b) - a[1].reduce((a, b) => a + b),
  )[0][0];
  const guardMax = guards
    .get(guardMin)
    .map((i, j) => [i, j])
    .sort((a, b) => b[0] - a[0])[0][1];
  return guardMin * guardMax;
}

function part2(input) {
  const guards = simulate(parse(input));

  let guard = -1,
    min = -1,
    count = -1;
  for (const [g, m] of guards.entries()) {
    for (const [mm, c] of m.entries()) {
      if (c > count) {
        guard = g;
        min = mm;
        count = c;
      }
    }
  }
  return guard * min;
}

export default [part1, part2];
