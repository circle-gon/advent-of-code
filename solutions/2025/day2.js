import { compile } from "/emwasm.js";
import { memstr } from "/utils.js";

const code = `
input = import js.raw(memory<u8>(1))
table = memory<u64>(1)
nums = memory<u64>(1)
let maxLen = u32(0)
const size = u32(8000)

fn parse()(idx: u32, outIdx: u32, num: u64) {
  while (input[idx] != 0) {
    if (input[idx] == 45 | input[idx] == 44) {
      nums[outIdx] = num
      num = 0
      outIdx++
    } else {
      num = 10 * num + i64.extend_i32_u(input[idx] - 48)  
    }
    idx++
  }
  nums[outIdx] = num
  maxLen = outIdx + 1
}

fn pow10(t: u32)(prod: u64, i: u32) -> u64 {
  prod = 1
  for (; i < t; i++) { prod *= 10 }
  return prod
}

fn log10(num: u64)(idx: u32) -> u32 {
  while (num != 0) {
    num /= 10
    idx++
  }
  return idx
}

export fn part1()(i: u32, j: u64, sum: u64, l10: u32, p10: u64, start: u64, p10_2: u64) -> u64 {
  parse()
  for (; i < maxLen; i += 2) {
    l10 = log10(nums[i])
    if (l10 % 2 == 1) { l10++ }
    p10 = pow10(l10 / 2) + 1
    p10_2 = pow10(l10 - 1)
    start = ((nums[i] > p10_2 ? nums[i] : p10_2) + p10 - 1) / p10 * p10
    for (j = start; j <= nums[i + 1]; j += p10) {
      if (j >= p10_2 * 10) {
        p10 = (p10 - 1) * 10 + 1
        p10_2 *= 100
        j = (j * 10 + p10 - 1) / p10 * p10
        if (j > nums[i + 1]) { break }
      }
      sum += j
    }
  }
  return sum
}

fn hash(key: u64)() -> u32 {
  return i32.wrap_i64(key % i64.extend_i32_u(size))
}

fn get(key: u64)(idx: u32, base: u32, addr: u32) -> u32 {
  base = hash(key)
  for (; idx < size; idx++) {
    addr = (idx + base) % size
    if (table[addr] == key + 1) { return true }
    if (table[addr] == 0) { return false }
  }
  unreachable()
}

fn set(key: u64)(idx: u32, base: u32, addr: u32) {
  base = hash(key)
  for (; idx < size; idx++) {
    addr = (idx + base) % size
    if (table[addr] == key + 1) { unreachable() }
    if (table[addr] == 0) {
      table[addr] = key + 1
      return
    }
  }
  unreachable()
}

fn genNumber(digit: u32, low: u64, high: u64)(d: u32, sum: u64, k: u64, base: u64) -> u64 {
  for (d = 1; d < digit; d++) {
    if (digit % d != 0) { continue }
    for (k = pow10(d - 1); k < pow10(d); k++) {
      base = (pow10(digit) - 1) / (pow10(d) - 1) * k
      if (base >= low & base <= high & !get(base)) {
        set(base)
        sum += base
      }
    }
  }
  return sum
}

export fn part2()(i: u32, j: u32, sum: u64, ll10: u32, hl10: u32) -> u64 {
  memory.clear(table)
  parse()
  for (; i < maxLen; i += 2) {
    ll10 = log10(nums[i])
    hl10 = log10(nums[i + 1])
    for (j = ll10; j <= hl10; j++) {
      sum += genNumber(j, nums[i], nums[i + 1])
    }
  }
  return sum
}
`;

const compilee = compile(code, {}, {});

async function part1(input) {
  const { module, memory } = await compilee;
  memstr(input, memory);
  return module.part1();
}

async function part2(input) {
  const { module, memory } = await compilee;
  memstr(input, memory);
  return module.part2();
}

export default [part1, part2];
