import{c as a}from"./emwasm-DmxTmHdw.js";import{m as n}from"./index-C_urV7hb.js";import{i as u}from"./intcode-BuwA_ZA0.js";const c=`
${u}
let c = u32(0)
let out = u64(0)

fn get()() -> s64 {
  return 1
}

fn get2()() -> s64 {
  return 2
}

fn set(v: s64)() -> u32 {
  c++
  out = uint(v)
  return 0
}

export fn part1()() -> u64 {
  c = 0
  parse()
  evalIntcode(0, 0, get, set)
  if (c != 1) { unreachable() }
  // wrap doesn't work here because it ends up turning it into a negative number
  return out
}

export fn part2()() -> u32 {
  c = 0
  parse()
  evalIntcode(0, 0, get2, set)
  if (c != 1) { unreachable() }
  return i32(out)
}
`,o=a(c,{},{});async function s(t){const{module:e,memory:r}=await o;return n(t,r),e.part1()}async function i(t){const{module:e,memory:r}=await o;return n(t,r),e.part2()}const l=[s,i];export{l as default};
