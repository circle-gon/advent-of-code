import { compile } from "/emwasm.js";
import { memstr } from "/utils.js";
import intcode from "./intcode.js";

const code = `
${intcode}
let nz = u32(0)
let out = s64(0)

fn get()() -> s64 {
  return 1
}

fn get2()() -> s64 {
  return 5
}

fn set(val: s64)() {
  if (val != 0) { nz++ }
  out = val
}

export fn part1()() -> s64 {
  parse()
  nz = 0
  evalIntcode(0, get, set)
  if (nz != 1) { unreachable() }
  return out
}
export fn part2()() -> s64 {
  parse()
  evalIntcode(0, get2, set)
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
