function resultForWorkflow(part, workflow) {
  const last = workflow.at(-1);
  const toParse = workflow.slice(0, -1);

  for (const work of toParse) {
    const [letter, op, num, result] = work;

    const score = part[letter];

    const works = op === ">" ? score > num : score < num;

    if (works) return result;
  }

  return last;
}

function isPartValid(part, workflows) {
  let flow = "in";
  while (true) {
    const workflow = workflows.get(flow);

    const result = resultForWorkflow(part, workflow);

    if (result === "A") return true;
    if (result === "R") return false;

    flow = result;
  }
}

function parse(input) {
  const [_workflows, _parts] = input.split("\n\n");

  const workflows = new Map();
  for (const line of _workflows.split("\n")) {
    const idx = line.indexOf("{");
    const name = line.slice(0, idx);
    const body = line.slice(idx + 1, -1);

    // Parse the body
    const parts = body.split(",");

    // This is always true
    const last = parts.pop();

    const chains = [];
    for (const part of parts) {
      const [comparison, result] = part.split(":");
      // Parse the comparison
      const operator = comparison.includes(">") ? ">" : "<";

      const [letter, num] = comparison.split(operator);

      chains.push([letter, operator, Number(num), result]);
    }

    chains.push(last);

    workflows.set(name, chains);
  }
  
  const parts = [];
  for (const line of _parts.split("\n")) {
    const r = line.slice(1, -1);
    const myPart = {};
    for (const p of r.split(",")) {
      const [name, rating] = p.split("=");
      myPart[name] = Number(rating);
    }
    parts.push(myPart);
  }

  return [workflows, parts];
}

function part1(input) {
  const [workflows, parts] = parse(input);

  let sum = 0;
  for (const part of parts) {
    if (isPartValid(part, workflows))
      sum += Object.values(part).reduce((a, b) => a + b);
  }

  return sum;
}

function intersect(a, b) {
  return [Math.max(a[0], b[0]), Math.min(a[1], b[1])];
}

function isValid(a) {
  return a[0] <= a[1];
}

function part2(input) {
  const [workflows] = parse(input);

  // Array<[workflowName, possible]>
  const possibles = [
    [
      "in",
      {
        x: [1, 4000],
        m: [1, 4000],
        a: [1, 4000],
        s: [1, 4000],
      },
    ],
  ];

  const finalRanges = [];

  while (possibles.length > 0) {
    const [name, data] = possibles.pop();
    const workflow = workflows.get(name);

    const last = workflow.at(-1);

    // Go through each part!
    for (const part of workflow.slice(0, -1)) {
      const [letter, op, num, result] = part;
      const letterData = data[letter];

      if (result !== "R") {
        const willBeTrue = op === ">" ? [num + 1, 4000] : [1, num - 1];
        const trued = intersect(letterData, willBeTrue);

        // It's possible that it is impossible to do so
        if (isValid(trued)) {
          const newPossibles = {
            ...data,
            [letter]: trued,
          };

          if (result === "A") {
            // This is a success
            finalRanges.push(newPossibles);
          } else {
            // Prepare for the next workflow
            possibles.push([result, newPossibles]);
          }
        }
      }

      // Then look for the next one
      const willBeFalse = op === ">" ? [1, num] : [num, 4000];
      const falsed = intersect(letterData, willBeFalse);

      if (isValid(falsed)) data[letter] = falsed;
    }

    if (last !== "R") {
      // At this point, "data" will have everything that avoids them
      if (last === "A") {
        finalRanges.push(data);
      } else {
        possibles.push([last, data]);
      }
    }
  }

  let sum = 0;
  for (const final of finalRanges) {
    sum += Object.values(final).reduce(
      (sum, arr) => sum * (arr[1] - arr[0] + 1),
      1
    );
  }

  return sum;
}

export default [part1, part2]