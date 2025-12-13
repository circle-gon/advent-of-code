function parse(input) {
  const out = [];
  for (const line of input.split("\n")) {
    const stack = [[]];
    let idx = 0;
    while (idx < line.length) {
      if (line[idx] === "(") stack.push([]);
      else if (line[idx] === ")") stack.at(-2).push(stack.pop());
      else if (line[idx] === "+") stack.at(-1).push("+");
      else if (line[idx] === "*") stack.at(-1).push("*");
      else if ("0123456789".includes(line[idx]))
        stack.at(-1).push(Number(line[idx]));
      idx++;
    }
    out.push(stack[0]);
  }
  return out;
}

function evalProblem(problem) {
  if (typeof problem === "number") return problem;
  let start = evalProblem(problem[0]);
  for (let i = 1; i < problem.length; i += 2) {
    const op = problem[i];
    const value = evalProblem(problem[i + 1]);
    if (op === "*") start *= value;
    else start += value;
  }
  return start;
}

function evalProblem2(problem) {
  if (typeof problem === "number") return problem;
  const parts = [];
  let current = [evalProblem2(problem[0])];
  for (let i = 1; i < problem.length; i += 2) {
    if (problem[i] === "*") {
      parts.push(current);
      current = [evalProblem2(problem[i + 1])];
    } else {
      current.push(problem[i], evalProblem2(problem[i + 1]));
    }
  }
  parts.push(current);
  return parts.reduce((a, b) => a * evalProblem(b), 1);
}

function part1(input) {
  const problems = parse(input);
  let sum = 0;
  for (const problem of problems) {
    sum += evalProblem(problem);
  }
  return sum;
}

function part2(input) {
  const problems = parse(input);
  let sum = 0;
  for (const problem of problems) {
    sum += evalProblem2(problem);
  }
  return sum;
}

export default [part1, part2];
