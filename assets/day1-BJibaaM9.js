import{c as r}from"./emwasm-jdxru8Ro.js";import{m as o}from"./index-DTf0R7fQ.js";const a=`
export input = import js.raw(memory<u8>(1))
clean = memory<u32>(1)
let count = u32(0)

fn inRange(m: u32)() -> u32 {
  return m >= 48 & m <= 57
}

fn parse()(idx: u32, val: u32, accum: u32, outIdx: u32) {
  while (input[idx] != 0) {
    val = input[idx]
    if (inRange(val)) {
      accum = 10 * accum + (val - 48)
    } else {
      clean[outIdx] = accum
      accum = 0
      outIdx++
    }
    idx++
  }
  if (accum != 0) { clean[outIdx] = accum; outIdx++ }
  count = outIdx
}

fn getResult()(out: u32, i: u32) -> u32 {
  for (; i < count; i++) {
    out += clean[i] / 3 - 2
  }
  return out
}

fn getResult2()(out: u32, fuel: s32, i: u32) -> u32 {
  for (; i < count; i++) {
    fuel = sint(clean[i] / 3 - 2)
    while (fuel > 0) {
      out += uint(fuel)
      fuel = fuel / 3 - 2
    }
  }
  return out
}

export fn part1()() -> u32 {
  parse()
  return getResult()
}

export fn part2()() -> u32 {
  parse()
  return getResult2()
}
`,n=r(a,{},{});async function c(u){const{module:t,memory:e}=await n;return o(u,e),t.part1()}async function i(u){const{module:t,memory:e}=await n;return o(u,e),t.part2()}const s=[c,i];export{s as default};
