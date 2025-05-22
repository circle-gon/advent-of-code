const NAME = "me.";
function parse(input, part2) {
  const happy = new Map();

  function add(start, target, cost) {
    if (!happy.has(start)) happy.set(start, new Map());
    happy.get(start).set(target, cost);
  }

  for (const line of input.split("\n")) {
    const details = line.slice(0, -1).split(" ");
    const first = details[0];
    const last = details[10];
    const type = details[2] === "gain" ? 1 : -1;
    const amount = Number(details[3]);
    add(first, last, type * amount);
  }

  if (part2) {
    const memap = new Map();
    for (const [name, map] of happy.entries()) {
      map.set(NAME, 0);
      memap.set(name, 0);
    }
    happy.set(NAME, memap);
  }

  return happy;
}

function maxHappy(happy, arrangement, curr) {
  const last = arrangement.at(-1);
  let hap = 0;
  for (const name of happy.get(last).keys()) {
    if (arrangement.includes(name)) continue;
    const nextCurr =
      curr + happy.get(name).get(last) + happy.get(last).get(name);
    if (arrangement.length === happy.size - 1) {
      // Add circular
      hap = Math.max(
        hap,
        nextCurr +
          happy.get(name).get(arrangement[0]) +
          happy.get(arrangement[0]).get(name),
      );
    } else {
      hap = Math.max(hap, maxHappy(happy, [...arrangement, name], nextCurr));
    }
  }
  return hap;
}

function run(input, part2) {
  const happy = parse(input, part2);
  const first = [...happy.keys()][0];
  return maxHappy(happy, [first], 0);
}

function part1(input) {
  return run(input, false);
}
function part2(input) {
  return run(input, true);
}

export default [part1, part2];
