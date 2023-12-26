function parse(input) {
  const lines = input.split("\n");
  const instructions = lines[0];
  const nodes = {};
  for (const node of lines.slice(2)) {
    const parts = node.split(" = ");
    const name = parts[0];
    const parts2 = parts[1].split(", ");
    const left = parts2[0].slice(1);
    const right = parts2[1].slice(0, -1);

    nodes[name] = [left, right];
  }

  return [nodes, instructions];
}

function part1(input) {
  const [nodes, instructions] = parse(input);

  let atNode = "AAA";
  let steps = 0;
  while (atNode !== "ZZZ") {
    const toStep = instructions[steps % instructions.length];
    atNode = nodes[atNode][toStep === "L" ? 0 : 1];
    steps++;
  }

  return steps;
}

function gcd(a, b) {
  let r = 0;
  while (b !== 0) {
    r = a % b;
    a = b;
    b = r;
  }
  return a;
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function part2(input) {
  const [nodes, instructions] = parse(input);

  const atNodes = Object.keys(nodes).filter((i) => i.endsWith("A"));

  const steps = [];
  for (const atNode of atNodes) {
    let step = 0;
    let node = atNode;
    while (!node.endsWith("Z")) {
      const toStep = instructions[step % instructions.length];
      node = nodes[node][toStep === "L" ? 0 : 1];
      step++;
    }
    steps.push(step);
  }

  return steps.reduce(lcm);
}

export default [part1, part2];
