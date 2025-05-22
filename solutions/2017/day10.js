function hash(cpI, ssI, nums, lengths) {
  let cp = cpI;
  let ss = ssI;
  for (const length of lengths) {
    for (let i = 0; i < length / 2; i++) {
      const A = (cp + i) % nums.length;
      const B = (cp + length - 1 - i) % nums.length;
      [nums[A], nums[B]] = [nums[B], nums[A]];
    }

    cp += length + ss;
    ss++;
  }
  return [cp, ss];
}

export function knotHash(input) {
  const lengths = [
    ...Array(input.length)
      .fill()
      .map((_, i) => input.charCodeAt(i)),
    17,
    31,
    73,
    47,
    23,
  ];
  let cp = 0;
  let ss = 0;
  const nums = Array(256)
    .fill()
    .map((_, i) => i);

  for (let i = 0; i < 64; i++) [cp, ss] = hash(cp, ss, nums, lengths);

  let out = "";
  for (let i = 0; i < nums.length; i += 16) {
    let h = nums[i];
    for (let j = i + 1; j < i + 16; j++) h ^= nums[j];
    out += h.toString(16).padStart(2, "0");
  }
  return out;
}

function part1(input, _, example) {
  const nums = Array(example ? 5 : 256)
    .fill()
    .map((_, i) => i);
  hash(
    0,
    0,
    nums,
    input.split(",").map((i) => Number(i)),
  );
  return nums[0] * nums[1];
}

function part2(input) {
  return knotHash(input);
}

export default [part1, part2];
