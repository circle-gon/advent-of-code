import { compile } from "/emwasm.js";
import { memstr } from "/utils.js";

const code = `
input = import js.raw(memory<u8>(1))
instrs = memory<s16>(1)
let instrsLen = u32(0)

fn parse()(idx: u32, sign: u32, num: u32, out: u32) {
  while (input[idx] != 0) {
    if (input[idx] == 76) { sign = 0 }
    else if (input[idx] == 82) { sign = 1 }
    else if (input[idx] == 10) {
      instrs[out] = (sign == 0 ? -1 : 1) * sint(num)
      out++
      num = 0
    }
    else {
      num = 10 * num + (input[idx] - 48)
    }
    idx++
  }
  instrs[out] = (sign == 0 ? -1 : 1) * sint(num)
  instrsLen = out + 1
}

export fn part1()(num: s32, cnt: u32, out: u32) -> u32 {
  parse()
  num = 50
  for (; cnt < instrsLen; cnt++) {
    num += instrs[cnt]
    num = num % 100
    if (num < 0) { num += 100 }
    if (num == 0) { out++ }
  }
  return out
}

export fn part2()(num: s32, cnt: u32, out: u32, start: s32, start2: s32) -> u32 {
  parse()
  num = 50
  for (; cnt < instrsLen; cnt++) {
    start = num
    num += instrs[cnt]
    start2 = num
    out += abs(num / 100)
    num = num % 100
    if (num < 0) { num += 100 }
    if (start2 <= 0 & start != 0) { out++ }
  }
  return out
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
