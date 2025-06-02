import{c as a}from"./emwasm-jdxru8Ro.js";import{m as n}from"./index-DTf0R7fQ.js";import{i as s}from"./intcode-DD3AWPIW.js";const u=`
${s}
let nz = u32(0)
let out = s64(0)

fn get()() -> s64 {
  return 1
}

fn get2()() -> s64 {
  return 5
}

fn set(val: s64)() -> u32 {
  if (val != 0) { nz++ }
  out = val
  return 0
}

export fn part1()() -> s64 {
  parse()
  nz = 0
  evalIntcode(0, 0, get, set)
  if (nz != 1) { unreachable() }
  return out
}
export fn part2()() -> s64 {
  parse()
  evalIntcode(0, 0, get2, set)
  return out
}
`,o=a(u,{},{});async function c(t){const{module:e,memory:r}=await o;return n(t,r),e.part1()}async function m(t){const{module:e,memory:r}=await o;return n(t,r),e.part2()}const l=[c,m];export{l as default};
