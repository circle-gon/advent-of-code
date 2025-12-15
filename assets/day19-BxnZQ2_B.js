import{c as a}from"./emwasm-Ctrcd4uU.js";import{m as o}from"./index-GwZZPAxQ.js";import{i as y}from"./intcode-BuwA_ZA0.js";const u=`
${y}
let xv = u32(0)
let yv = u32(0)
let ov = u32(0)
let t = u32(0)
temp = memory(1)

fn get()() -> s64 {
  if (t == 0) {
    t = 1
    return s64(xv)
  }
  t = 0
  return s64(yv)
}

fn set(v: s64)() -> u32 {
  ov = u32(v)
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
`,m=a(u,{},{});async function p(r){const{module:e,memory:t}=await m;return o(r,t),e.part1()}async function n(r){const{module:e,memory:t}=await m;return o(r,t),e.part2()}const x=[p,n];export{x as default};
