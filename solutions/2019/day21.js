import { compile } from "/emwasm.js";
import { memstr } from "/utils.js";
import intcode from "./intcode.js";

const code = `
${intcode}
springscript = memory<u8>(1)
script = data<active>(springscript, 0)
script2 = data<active>(springscript, 100)
let idx = u32(0)
let output = u32(0)

fn get()() -> s64 {
  idx++
  return i64.extend_i32_u(springscript[idx - 1])
}

fn set(v: s64)() -> u32 {
  if (v > 256) {
    output = i32.wrap_i64(v)
  }
  return 0
}

fn eval(start: u32)() -> u32 {
  parse()
  idx = start
  output = 0
  evalIntcode(0, 0, get, set)
  return output
}

export fn part1()() -> u32 {
  return eval(0)
}

export fn part2()() -> u32 {
  return eval(100)
}
`;

const compilee = compile(
  code,
  {},
  {
    script: new TextEncoder().encode(
      "NOT A J\nNOT B T\nOR T J\nNOT C T\nOR T J\nAND D J\nWALK\n",
    ),
    script2: new TextEncoder().encode(
      "NOT A J\nNOT B T\nOR T J\nNOT C T\nOR T J\nAND D J\nNOT H T\nNOT T T \nOR E T\nAND T J\nRUN\n",
    ),
  },
);

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
