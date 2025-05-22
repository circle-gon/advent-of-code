function parse(input) {
  const out = [];
  for (const line of input.split("\n")) {
    const [left, right] = line.split(": ");
    const rout = right.split(" ").map((i) => Number(i));
    out.push([Number(left), rout]);
  }
  return out;
}

function part1(input) {
  const parsed = parse(input);
  let sum = 0;
  for (const eq of parsed) {
    const [goal, numbers] = eq;
    let can = false;
    // Bitmasks are _slower_ than this for some reason???????
    const masks = Array(numbers.length - 1).fill(0);
    while (masks[0] < 2) {
      let test = numbers[0];
      for (let j = 1; j < numbers.length; j++) {
        if (masks[j - 1] === 0) test *= numbers[j];
        else test += numbers[j];
      }
      if (test === goal) {
        can = true;
        break;
      }

      // Increment
      masks[numbers.length - 2]++;
      for (let i = numbers.length - 2; i >= 0; i--) {
        if (i > 0 && masks[i] === 2) {
          masks[i - 1]++;
          masks[i] = 0;
        } else break;
      }
    }
    if (can) sum += goal;
  }
  return sum;
}

function part2(input) {
  const parsed = parse(input);
  let sum = 0;
  for (const eq of parsed) {
    const [goal, numbers] = eq;
    let can = false;
    const masks = Array(numbers.length - 1).fill(0);
    while (masks[0] < 3) {
      let test = numbers[0];
      for (let j = 1; j < numbers.length; j++) {
        const mask = masks[j - 1];
        if (mask === 0) {
          const log = Math.floor(Math.log10(numbers[j])) + 1;
          test = test * 10 ** log + numbers[j];
        } else if (mask === 1) test *= numbers[j];
        else test += numbers[j];
      }
      if (test === goal) {
        can = true;
        break;
      }

      // Increment
      masks[numbers.length - 2]++;
      for (let i = numbers.length - 2; i >= 0; i--) {
        if (i > 0 && masks[i] === 3) {
          masks[i - 1]++;
          masks[i] = 0;
        } else break;
      }
    }
    if (can) sum += goal;
  }
  return sum;
}

export default [part1, part2];
