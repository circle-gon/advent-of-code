import{c as a}from"./emwasm-WyPGHS4b.js";import{m as n}from"./index-DDLFNhiI.js";import{i as s}from"./intcode-CHldCGIl.js";const c=`
${s}
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
`,o=a(c,{},{});async function m(t){const{module:e,memory:r}=await o;return n(t,r),e.part1()}async function u(t){const{module:e,memory:r}=await o;return n(t,r),e.part2()}const l=[m,u];export{l as default};
