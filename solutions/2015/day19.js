function parse(input, rev) {
  const [g, trial] = input.split("\n\n");
  const groups = new Map();

  function add(start, target) {
    if (!groups.has(start)) groups.set(start, []);
    groups.get(start).push(target);
  }

  for (const line of g.split("\n")) {
    const [left, right] = line.split(" => ");
    if (rev) add(right, left);
    else add(left, right);
  }

  return {
    groups,
    trial,
  };
}

function part1(input) {
  const { groups, trial } = parse(input);
  const choice = new Set();
  for (const [replace, options] of groups.entries()) {
    const matches = trial.split(replace);
    const eff = [matches[0]];
    for (const match of matches.slice(1)) {
      eff.push(replace);
      eff.push(match);
    }
    for (let i = 1; i < eff.length; i += 2) {
      for (const option of options) {
        eff[i] = option;
        choice.add(eff.join(""));
      }
      eff[i] = replace;
    }
  }
  return choice.size;
}

function count(str, other) {
  return str.split(other).length - 1;
}

function part2(input) {
  const { groups, trial } = parse(input, true);
  let c = 0;
  let t = trial;
  while (true) {
    const prev = t;
    for (const [long, [short]] of groups) {
      const after = t.replaceAll(long, short);
      c += count(t, long);
      t = after;
    }
    // This is the break condition instead of t !== "e" because otherwise it wouldn't work on the example
    if (prev === t) break;
  }
  return c;
}

export default [part1, part2];
