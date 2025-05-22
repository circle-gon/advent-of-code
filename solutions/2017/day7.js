function parse(input) {
  const tower = new Map();
  for (const line of input.split("\n")) {
    const [program, balance] = line.split(" -> ");
    const [name, weight] = program.split(" (");
    tower.set(name, {
      weight: Number(weight.slice(0, -1)),
      programs: balance ? balance.split(", ") : [],
    });
  }
  return tower;
}

function findParent(tower) {
  for (const [program, status] of tower.entries()) {
    if (status.programs.length === 0) continue;
    let has = true;
    for (const others of tower.values()) {
      if (others.programs.includes(program)) has = false;
    }
    if (has) return program;
  }
  throw new Error("Is your input malformed?");
}

function getWeights(weights, tower, program) {
  if (weights.has(program)) return weights.get(program);

  let weight = tower.get(program).weight;
  for (const sub of tower.get(program).programs) {
    weight += getWeights(weights, tower, sub);
  }

  weights.set(program, weight);
  return weight;
}

function getBad(weights, tower, program) {
  const children = tower.get(program).programs;
  const arr = Object.entries(
    Object.groupBy(children, (o) => weights.get(o))
  ).sort((x, y) => y[1].length - x[1].length);
  if (arr.length > 1) {
    const badProgram = getBad(weights, tower, arr[1][1][0], program);

    // Already found cause
    if (typeof badProgram === "number") return badProgram;

    const diff = Number(arr[0][0]) - Number(arr[1][0]);
    return tower.get(badProgram).weight + diff;
  }

  return program;
}

function part1(input) {
  return findParent(parse(input));
}

function part2(input) {
  const tower = parse(input);
  const weights = new Map();

  for (const program of tower.keys()) getWeights(weights, tower, program);

  const parent = findParent(tower);
  return getBad(weights, tower, parent, parent);
}

export default [part1, part2];
