function parse(input) {
  return input.split("\n").map((i) => Number(i));
}

function* combination(array, n) {
  if (n === 1) {
    for (const a of array) yield [a];
    return;
  }

  for (let i = 0; i <= array.length - n; i++) {
    for (const c of combination(array.slice(i + 1), n - 1))
      yield [array[i], ...c];
  }
}

function* allComb(array) {
  for (let i = 1; i <= array.length; i++) yield* combination(array, i);
}

function subgroups(numbers, target, count, top) {
  for (const comb of allComb(numbers)) {
    const sum = comb.reduce((a, b) => a + b);
    if (sum === target) {
      if (count === 1) return top.reduce((a, b) => a * b);
      const next = subgroups(
        numbers.filter((i) => !comb.includes(i)),
        target,
        count - 1,
        top ?? comb
      );
      if (next) return next;
    }
  }
}

function compute(input, count) {
  const numbers = parse(input);
  const target = numbers.reduce((a, b) => a + b) / count;
  return subgroups(numbers, target, count);
}

function part1(input) {
  return compute(input, 3);
}

function part2(input) {
  return compute(input, 4);
}

export default [part1, part2];
