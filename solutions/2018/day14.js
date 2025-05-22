function part1(input) {
  const trials = Number(input);
  const recipes = [3, 7];
  let first = 0;
  let second = 1;
  while (recipes.length < trials + 10) {
    const sum = recipes[first] + recipes[second];
    if (sum >= 10) recipes.push(Math.floor(sum / 10));
    recipes.push(sum % 10);

    first = (first + recipes[first] + 1) % recipes.length;
    second = (second + recipes[second] + 1) % recipes.length;
  }

  return recipes.slice(trials, trials + 10).join("");
}

function part2(input) {
  const nums = input.split("").map((i) => Number(i));
  const recipes = [3, 7];
  let first = 0;
  let second = 1;
  let start = -1;
  let state = 0;
  let out = -1;

  function check(offset) {
    const idx = recipes.length - 1 - offset;
    const num = recipes[idx];
    if (num !== nums[state]) state = 0;
    if (num === nums[state]) {
      if (state === 0) start = idx;
      state++;
      if (state === nums.length) out = start
    }
  }

  while (out === -1) {
    const sum = recipes[first] + recipes[second];
    if (sum >= 10) recipes.push(Math.floor(sum / 10));
    recipes.push(sum % 10);

    first = (first + recipes[first] + 1) % recipes.length;
    second = (second + recipes[second] + 1) % recipes.length;

    if (sum >= 10) check(1);
    check(0);
  }

  return out;
}

export default [part1, part2];
