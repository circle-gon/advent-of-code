function parse(input) {
  return input.split(/ |\t/).map((i) => Number(i));
}

function hash(blocks) {
  return blocks.join(",");
}

function part1(input) {
  const nums = parse(input);
  let counter = 0;
  const seen = new Set();
  while (true) {
    let highIdx = 0;
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] > nums[highIdx]) highIdx = i;
    }

    let count = nums[highIdx];
    let idx = (highIdx + 1) % nums.length;
    nums[highIdx] = 0;

    while (count > 0) {
      nums[idx]++;
      count--;
      idx = (idx + 1) % nums.length;
    }

    counter++;
    const h = hash(nums);
    if (seen.has(h)) return counter;
    seen.add(h);
  }
}

function part2(input) {
  const nums = parse(input);
  let counter = 0;
  let find = undefined;
  const seen = new Set();

  while (true) {
    let highIdx = 0;
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] > nums[highIdx]) highIdx = i;
    }

    let count = nums[highIdx];
    let idx = (highIdx + 1) % nums.length;
    nums[highIdx] = 0;

    while (count > 0) {
      nums[idx]++;
      count--;
      idx = (idx + 1) % nums.length;
    }

    const h = hash(nums);
    if (find) {
      counter++;
      if (h === find) return counter;
    } else {
      if (seen.has(h)) find = h;
      else seen.add(h);
    }
  }
}

export default [part1, part2];
