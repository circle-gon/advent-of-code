import { compile } from "/emwasm.js";
import { memstr } from "/utils.js";
import intcode from "./intcode.js";

const code = `
${intcode}
let xv = u32(0)
let yv = u32(0)
let ov = u32(0)
let t = u32(0)
temp = memory(1)

fn get()() -> s64 {
  if (t == 0) {
    t = 1
    return i64.extend_i32_u(xv)
  }
  t = 0
  return i64.extend_i32_u(yv)
}

fn set(v: s64)() -> u32 {
  ov = i32.wrap_i64(v)
  return 0
}

fn isDragged(x: u32, y: u32)() -> u32 {
  memory.copy(program, temp, 0, 0, memory.byteSize(program))
  xv = x
  yv = y
  evalIntcode(0, 0, get, set)
  return ov
}

export fn part1()(x: u32, y: u32, s: u32) -> u32 {
  parse()
  memory.copy(temp, program, 0, 0, memory.byteSize(program))
  for (; y < 50; y++) {
    for (x = 0; x < 50; x++) {
      s += isDragged(x, y)
    }
  }
  return s
}

export fn part2()(x: u32, y: u32) -> u32 {
  parse()
  memory.copy(temp, program, 0, 0, memory.byteSize(program))
  while (true) {
    while (!isDragged(x, y + 99)) {
      x++
    }
    if (isDragged(x + 99, y)) {
      return 10000 * x + y
    }
    y++
  }
  unreachable()
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
