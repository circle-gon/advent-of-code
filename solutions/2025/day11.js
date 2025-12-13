import { compile } from "/emwasm.js";
import { memstr } from "/utils.js";

const code = `
input = import js.raw(memory<u8>(1))
const maxOutput = u32(20)
mappings = memory<u16>(15)
table = memory<u64>(10)

fn parse()(idx: u32, num: u32, out: u32, k: u32) {
  memory.clear(mappings)
  memory.clear(table)
  while (input[idx] != 0) {
    while (input[idx] != 58) {
      out = 26 * out + (input[idx] - 97)
      idx++
    }
    out *= maxOutput
    idx += 2
    while (true) {
      while (input[idx] != 32 & input[idx] != 10 & input[idx] != 0) {
        num = 26 * num + (input[idx] - 97)
        idx++
      }
      mappings[out + k] = num + 1
      num = 0
      k++
      if (input[idx] == 32) { idx++ }
      else { break }
    }
    out = 0
    k = 0
    if (input[idx] == 10) { idx++ }
  }
}

fn getPaths(path: u32)(sum: u32, s: u32, num: u32) -> u32 {
  if (path == 10003) { return 1 }
  for (s = maxOutput * path; s < maxOutput * (path + 1); s++) {
    num = mappings[s]
    if (num != 0) { sum += getPaths(num - 1) }
  }
  return sum
}

fn getPaths2(path: u32, dac: u32, fft: u32)(sum: u64, s: u32, num: u32, idx: u32) -> u64 {
  if (path == 10003) { return i64.extend_i32_u(dac & fft) }
  idx = 4 * path + 2 * dac + fft
  if (table[idx] != 0) {
    return table[idx] - 1
  }
  if (path == 2030) { dac = true }
  if (path == 3529) { fft = true }
  for (s = maxOutput * path; s < maxOutput * (path + 1); s++) {
    num = mappings[s]
    if (num != 0) { sum += getPaths2(num - 1, dac, fft) }
  }
  table[idx] = sum + 1
  return sum
}

export fn part1()() -> u32 {
  parse()
  return getPaths(16608)
}

export fn part2()() -> u64 {
  parse()
  return getPaths2(12731, false, false)
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
