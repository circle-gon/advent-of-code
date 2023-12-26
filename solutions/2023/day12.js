const f = new Map();
function hash(chars, nums) {
  // should be good enough
  return `${chars}:${nums.join(",")}`;
}

function sol(input) {
  let things = 0;

  for (const line of input.split("\n")) {
    const f = line.split(" ");
    const chars = f[0];
    const nums = f[1].split(",").map((i) => Number(i));

    things += solForLine(chars, nums);
  }

  return things;
}

// the one that does hashing
function solForLine(chars, nums) {
  const h = hash(chars, nums);
  if (!f.has(h)) f.set(h, lineReal(chars, nums));

  return f.get(h);
}

// the real one
function lineReal(chars, nums) {
  if (chars.length === 0) return 0;

  switch (chars[0]) {
    case "#":
      // Guaranteed #
      let hadGet = 0;
      while (chars[hadGet] === "#") hadGet++;

      // Could get # (through ? and #)
      let couldGet = 0;
      while (["?", "#"].includes(chars[couldGet])) couldGet++;

      // Impossible to get now
      if (hadGet > nums[0]) return 0;
      if (couldGet < nums[0]) return 0;

      // We got it!
      if (hadGet === nums[0]) {
        const safeSlice = nums.length === 1 ? [0] : nums.slice(1);
        // The next character has to be a ., otherwise it won't seperate
        return solForLine("." + chars.slice(nums[0] + 1), safeSlice);
      }

      // Only valid when the very next character is #
      return solForLine("#" + chars.slice(2), [nums[0] - 1, ...nums.slice(1)]);

    case ".":
      // This is the last character, but it works
      if (chars.length === 1 && nums[0] === 0) return 1;

      // just like who cares
      return solForLine(chars.slice(1), nums);
    case "?":
      return (
        solForLine("#" + chars.slice(1), nums) +
        solForLine("." + chars.slice(1), nums)
      );
  }
}

function part1(input) {
  return sol(input);
}

function part2(input) {
  const processed = [];
  for (const line of input.split("\n")) {
    const parts = line.split(" ");
    const a = Array(5).fill(parts[0]).join("?");
    const b = Array(5).fill(parts[1]).join(",");
    processed.push(a + " " + b);
  }

  return sol(processed.join("\n"));
}

export default [part1, part2]