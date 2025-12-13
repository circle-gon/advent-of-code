import { compile } from "/emwasm.js";
import { memstr } from "/utils.js";

const code = `
input = import js.raw(memory<u8>(1))
set = memory<u64>(2)
let width = u32(0)
let height = u32(0)
let S = u32(0)
const size = u32(8000)

fn parse()(idx: u32) {
  // Get the width, height, and location of S
  width = 0
  height = 0
  while (input[idx] != 0) {
    if (input[idx] == 10) {
      if (width == 0) { width = idx + 1 }
      height++
    }
    if (input[idx] == 83) { S = idx }
    idx++
  }
}

fn getkey(x: u32, y: u32)() -> u32 {
  return x + y * 200
}

fn getk(x: u32, y: u32)(key: u32, idx: u32, addr: u32) -> u64 {
  key = getkey(x, y)
  for (; idx < size; idx++) {
    addr = (idx + key) % size
    if (set[2 * addr] == i64.extend_i32_u(key + 1)) { return set[2 * addr + 1] }
    if (set[2 * addr] == 0) { return 0 }
  }
  unreachable()
}

fn setk(x: u32, y: u32, v: u64)(key: u32, idx: u32, addr: u32) {
  key = getkey(x, y)
  for (; idx < size; idx++) {
    addr = (idx + key) % size
    if (set[2 * addr] == i64.extend_i32_u(key + 1)) {
      set[2 * addr + 1] = v
      return
    }
    if (set[2 * addr] == 0) {
      set[2 * addr] = i64.extend_i32_u(key + 1)
      set[2 * addr + 1] = v
      return
    }
  }
  unreachable()
}

fn find(x: u32, y: u32)(res: u32) -> u32 {
  while (y < height & input[y * width + x] != 94) { y++ }
  if (y >= height) { return 0 }
  if (getk(x, y) != 0) { return 0 }
  setk(x, y, 1)
  return 1 + find(x - 1, y) + find(x + 1, y)
}

export fn part1()(res: u32) -> u32 {
  parse()
  memory.clear(set)
  return find(S, 0)
}

fn find2(x: u32, y: u32)(res: u64, g: u64) -> u64 {
  while (y < height & input[y * width + x] != 94) { y++ }
  if (y >= height) { return 1 }
  g = getk(x, y)
  if (g != 0) { return g }
  res = find2(x - 1, y) + find2(x + 1, y)
  setk(x, y, res)
  return res
}

export fn part2()() -> u64 {
  parse()
  memory.clear(set)
  return find2(S, 0)
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
