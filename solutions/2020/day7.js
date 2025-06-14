function parse(input) {
  const bags = new Map();
  for (const line of input.split("\n")) {
    const [target, containers] = line.slice(0, -1).split(" bags contain ");
    const targets = new Map();
    if (containers !== "no other bags") {
      for (const container of containers.split(", ")) {
        const num = Number(container[0]);
        const target = container.slice(
          2,
          -4 - (container.endsWith("s") ? 1 : 0),
        );
        targets.set(target, num);
      }
    }
    bags.set(target, targets);
  }
  return bags;
}

function canContainShinyGold(canContain, bags, bag) {
  if (canContain.has(bag)) return canContain.get(bag);
  let could = false;
  for (const newBag of bags.get(bag).keys()) {
    if (
      newBag === "shiny gold" ||
      canContainShinyGold(canContain, bags, newBag)
    ) {
      could = true;
      break;
    }
  }
  canContain.set(bag, could);
  return could;
}

function part1(input) {
  const bags = parse(input);
  const canContain = new Map();
  let sum = 0;
  for (const bag of bags.keys())
    if (canContainShinyGold(canContain, bags, bag)) sum++;
  return sum;
}

function bagRequirementCount(reqs, bags, name) {
  if (reqs.has(name)) return reqs.get(name);
  let count = 1;
  for (const [next, need] of bags.get(name).entries())
    count += need * bagRequirementCount(reqs, bags, next);
  reqs.set(name, count);
  return count;
}

function part2(input) {
  // Don't count the shiny gold bag itself
  return bagRequirementCount(new Map(), parse(input), "shiny gold") - 1;
}

export default [part1, part2];
