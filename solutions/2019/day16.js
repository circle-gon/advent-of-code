import { compile } from "/emwasm.js";
import { memstr } from "/utils.js";

const code = `
input = import js.raw(memory<u8>(1))
let len = u32(0)
export clean = memory<u8>(100)

fn parse()(idx: u32) {
  while (input[idx] != 0) {
    clean[idx] = input[idx] - 48
    idx++
  }
  len = idx
}

fn getPattern(idx: u32, elem: u32)(addr: u32) -> s32 {
  addr = ((idx + 1) / (elem + 1)) % 4
  if (addr == 0 | addr == 2) { return 0 }
  else if (addr == 1) { return 1 }
  return -1
}

fn fft()(idx: u32, sum: s32, idx2: u32) {
  for (; idx < len; idx++) {
    for (idx2 = 0; idx2 < len; idx2++) {
      sum += getPattern(idx2, idx) * sint(clean[idx2])
    }
    clean[idx + len] = sum > 0 ? uint(sum % 10) : uint(-sum % 10)
    sum = 0
  }
  memory.copy(clean, clean, 0, len, len)
}

fn fft2(offset: u32)(idx: u32, sum: u32) {
  for (idx = len - 1; idx >= offset; idx--) {
    sum += clean[idx]
    clean[idx] = sum % 10
  }
}

export fn part1()(c: u32) {
  parse()
  for (; c < 100; c++) { fft() }
  for (c = 0; c < 8; c++) { clean[c] += 48 }
}

export fn part2()(c: u32, offset: u32) {
  parse()
  for (; c < 7; c++) { offset = 10 * offset + clean[c] }
  // There already is one copy of the input
  for (c = 1; c < 10000; c++) {
    memory.copy(clean, clean, len * c, 0, len)
  } 
  len *= 10000
  for (c = 0; c < 100; c++) {
    fft2(offset)
  }
  for (c = 0; c < 8; c++) { clean[c + offset] += 48 }
  i32.store(clean, 0, offset)
}
`;

const compilee = compile(code, {}, {});

async function part1(input) {
  const { module, memory } = await compilee;
  memstr(input, memory);
  module.part1();
  return new TextDecoder().decode(
    new Uint8Array(module.clean.buffer).subarray(0, 8),
  );
}

async function part2(input) {
  const { module, memory } = await compilee;
  memstr(input, memory);
  module.part2();
  const offset = new DataView(module.clean.buffer).getUint32(0, true);
  return new TextDecoder().decode(
    new Uint8Array(module.clean.buffer).subarray(offset, offset + 8),
  );
}

export default [part1, part2];
