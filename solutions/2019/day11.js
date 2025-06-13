import { compile } from "/emwasm.js";
import { memstr } from "/utils.js";
import intcode from "./intcode.js";

const code = `
${intcode}
drawn = memory<u8>(1)
export output = memory<u8>(1)
let instr = u32(0)
let x = s32(0)
let y = s32(0)
let dir = s32(0)
let count = u32(0)
export let len = s32(0)

fn hash(x: s32, y: s32)() -> u32 {
  // -100 to 100
  return uint((y + 100) * 201 + (x + 100))
}

fn get()() -> s64 {
  return s64(drawn[hash(x, y)] & 1)
}

fn set(v: s64)() -> u32 {
  if (instr == 0) {
    if ((drawn[hash(x, y)] & 2) == 0) { count++ }
    drawn[hash(x, y)] = 2 | u32(v)
    instr = 1
  } else {
    if (v == 1) { dir++ }
    else { dir-- }
    if (dir >= 4) { dir -= 4 }
    if (dir < 0) { dir += 4 }
    instr = 0
    if (dir == 0) { y-- }
    else if (dir == 1) { x++ }
    else if (dir == 2) { y++ }
    else if (dir == 3) { x-- }
    else { unreachable() }
  }
  return 0
}

fn resolveOutput()(minx: s32, maxx: s32, miny: s32, maxy: s32, x: s32, y: s32, size: s32) {
  minx = 101
  miny = 101
  maxx = -101
  maxy = -101
  for (x = -100; x <= 100; x++) {
    for (y = -100; y <= 100; y++) {
      if ((drawn[hash(x, y)] & 1) == 1) {
        if (x < minx) { minx = x }
        if (x > maxx) { maxx = x }
        if (y < miny) { miny = y }
        if (y > maxy) { maxy = y }
      }
    }
  }

  size = maxx - minx + 2
  for (y = miny; y <= maxy; y++) {
    for (x = minx; x <= maxx; x++) {
      output[uint((y - miny) * size + (x - minx))] = (drawn[hash(x, y)] & 1) == 1 ? 35 : 32
    }
    output[uint((y - miny + 1) * size - 1)] = 10
  }
  len = size * (maxy - miny + 1)
}

export fn part1()() -> u32 {
  memory.clear(drawn)
  x = 0
  y = 0
  dir = 0
  count = 0
  parse()
  evalIntcode(0, 0, get, set)
  return count
}

export fn part2()() {
  memory.clear(drawn)
  x = 0
  y = 0
  dir = 0
  count = 0
  parse()
  drawn[hash(0, 0)] = 3
  evalIntcode(0, 0, get, set)
  resolveOutput()
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
  module.part2();
  const el = document.createElement("pre");
  el.textContent = new TextDecoder().decode(
    new Uint8Array(module.output.buffer).subarray(0, module.len.value),
  );
  return [el];
}

export default [part1, part2];
