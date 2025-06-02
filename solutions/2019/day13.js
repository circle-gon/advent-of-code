import { compile } from "/emwasm.js";
import { memstr, format } from "/utils.js";
import intcode from "./intcode.js";

const code = `
${intcode}
let stage = u32(0)
let stage2 = u32(0)
let count = u32(0)
export let score = u32(0)
export let val = s32(0)
let ip = u32(0)
let rel = s32(0)
let x = s32(0)
let y = s32(0)
let px = s32(0)
let rx = s32(0)
export let my = s32(0)
export output = memory<u8>(1)

fn get()() -> s64 {
  unreachable()
}

fn set(v: s64)() -> u32 {
  if (stage == 0 | stage == 1) {
    stage++
  } else {
    if (v == 2) { count++ }
    stage = 0 
  }
  return 0
}

fn get2()() -> s64 {
  if (stage == 0) {
    stage = 1
    return i64.extend_i32_s(val)
  }
  stage = 0
  return 1347376211 // STOP
}

fn get3()() -> s64 {
  if (px < rx) {
    return 1
  }
  if (px > rx) {
    return -1
  }
  return 0
}

fn set2(v: s64)() -> u32 {
  if (stage2 == 0) { x = i32.wrap_i64(v); stage2 = 1 }
  else if (stage2 == 1) { y = i32.wrap_i64(v); stage2 = 2 }
  else {
    if (x == -1 & y == 0) { score = i32.wrap_i64(v) }
    else {
      if (y > my) { my = y }
      output[uint(y * 50 + x)] =
        v == 0 ? 32 :
          v == 1 ? 35 :
            v == 2 ? 61 :
              v == 3 ? 45 :
                64
      output[uint(y * 50 + 49)] = 10
      if (v == 4) { rx = x }
      if (v == 3) { px = x }
    }
    stage2 = 0
  }
  return 0
}

export fn part1()() -> u32 {
  count = 0
  parse()
  evalIntcode(0, 0, get, set)
  return count
}

export fn part2fun()() {
  parse()
  ip = 0
  rel = 0
  my = 0
  memory.fill(output, 0, 0, memory.byteSize(output))
  program[0] = 2
}

export fn part2boring()(res: u32) -> u32 {
  part2fun()
  evalIntcode(0, 0, get3, set2)
  return score
}

export fn run()() -> u32 {
  ip, rel = evalIntcode(ip, rel, get2, set2)
  if (ip == 1347376211) { return score }
  return 1347376211
}
`;

const compilee = compile(code, {}, {});

async function part1(input) {
  const { module, memory } = await compilee;
  memstr(input, memory);
  return module.part1();
}

async function part2fun(module, update) {
  let promise, resolve;
  const score = document.createElement("span");
  const board = document.createElement("pre");
  const left = document.createElement("button");
  const neutral = document.createElement("button");
  const right = document.createElement("button");
  update([
    "Score: ",
    score,
    document.createElement("br"),
    board,
    document.createElement("br"),
    left,
    neutral,
    right,
  ]);
  left.addEventListener("click", () => resolve(-1));
  neutral.addEventListener("click", () => resolve(0));
  right.addEventListener("click", () => resolve(1));
  left.textContent = "Left";
  neutral.textContent = "Nothing";
  right.textContent = "Right";
  const listener = (e) => {
    if (e.key === "ArrowLeft") resolve(-1);
    else if (e.key === "ArrowDown") resolve(0);
    else if (e.key === "ArrowRight") resolve(1);
  };
  window.addEventListener("keydown", listener);
  module.part2fun();

  while (true) {
    const val = module.run();
    if (val !== 1347376211) {
      window.removeEventListener("keydown", listener);
      return val;
    }

    score.textContent = format(module.score.value);
    board.textContent = new TextDecoder().decode(
      new Uint8Array(module.output.buffer).subarray(0, module.my.value * 50),
    );
    ({ promise, resolve } = Promise.withResolvers());
    module.val.value = await promise;
  }
}

async function part2(input, update, _, interactive) {
  const { module, memory } = await compilee;
  memstr(input, memory);
  return interactive ? part2fun(module, update) : module.part2boring();
}

export default [part1, part2];
