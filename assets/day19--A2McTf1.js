import{c as a}from"./emwasm--tg4IAJG.js";import{m as o}from"./index-vH6bm6Wv.js";import{i as u}from"./intcode-DD3AWPIW.js";const y=`
${u}
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
`,m=a(y,{},{});async function p(e){const{module:r,memory:t}=await m;return o(e,t),r.part1()}async function n(e){const{module:r,memory:t}=await m;return o(e,t),r.part2()}const c=[p,n];export{c as default};
