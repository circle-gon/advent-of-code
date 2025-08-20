import{c as a}from"./emwasm-b25LuFOt.js";import{m as n}from"./index-DQLiBMR0.js";import{i as u}from"./intcode-BuwA_ZA0.js";const s=`
${u}
let nz = u32(0)
let out = u32(0)

fn get()() -> s64 {
  return 1
}

fn get2()() -> s64 {
  return 5
}

fn set(val: s64)() -> u32 {
  if (val != 0) { nz++ }
  out = u32(val)
  return 0
}

export fn part1()() -> u32 {
  parse()
  nz = 0
  evalIntcode(0, 0, get, set)
  if (nz != 1) { unreachable() }
  return out
}
export fn part2()() -> u32 {
  parse()
  evalIntcode(0, 0, get2, set)
  return out
}
`,o=a(s,{},{});async function c(t){const{module:e,memory:r}=await o;return n(t,r),e.part1()}async function m(t){const{module:e,memory:r}=await o;return n(t,r),e.part2()}const l=[c,m];export{l as default};
