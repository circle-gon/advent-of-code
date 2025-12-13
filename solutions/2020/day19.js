function parse(input) {
  const [rules, tests] = input.split("\n\n");
  const outRules = new Map();
  for (const rule of rules.split("\n")) {
    const [first, last] = rule.split(": ");
    if (last.startsWith('"')) outRules.set(Number(first), last[1]);
    else {
      const parts = last
        .split(" | ")
        .map((i) => i.split(" ").map((j) => Number(j)));
      outRules.set(Number(first), parts);
    }
  }
  return {
    rules: outRules,
    tests: tests.split("\n"),
  };
}

function compileString(rules, num) {
  const out = [];
  const rule = rules.get(num);
  if (typeof rule === "string") return rule;
  for (const part of rule) {
    out.push(part.map((i) => compileString(rules, i)).join(""));
  }
  return `(?:${out.join("|")})`;
}

function compileString2(rules, num) {
  if (num === 8) return `${compileString2(rules, 42)}+`;
  if (num === 11) {
    const r42 = compileString2(rules, 42);
    const r31 = compileString2(rules, 31);
    const code = [];
    for (let i = 1; i <= 10; i++) code.push(r42.repeat(i) + r31.repeat(i));
    return `(?:${code.join("|")})`;
  }
  const out = [];
  const rule = rules.get(num);
  if (typeof rule === "string") return rule;
  for (const part of rule) {
    out.push(part.map((i) => compileString2(rules, i)).join(""));
  }
  return `(?:${out.join("|")})`;
}

function solve(input, func) {
  const { rules, tests } = parse(input);
  console.log(func(rules, 0));
  const regex = new RegExp("^" + func(rules, 0) + "$");
  let count = 0;
  for (const test of tests) {
    if (regex.exec(test)) count++;
  }
  return count;
}

function part1(input) {
  return solve(input, compileString);
}

function part2(input) {
  return solve(input, compileString2);
}

export default [part1, part2];
