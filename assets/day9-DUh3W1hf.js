import{c as a}from"./emwasm-WyPGHS4b.js";import{m as o}from"./index-DDLFNhiI.js";import{i as c}from"./intcode-CHldCGIl.js";const s=`
${c}
let c = u32(0)
let out = s64(0)

fn get()() -> s64 {
  return 1
}

fn get2()() -> s64 {
  return 2
}

fn set(v: s64)() {
  c++
  out = v
}

export fn part1()() -> s64 {
  c = 0
  parse()
  evalIntcode(0, get, set)
  if (c != 1) { unreachable() }
  return out
}

export fn part2()() -> s64 {
  c = 0
  parse()
  evalIntcode(0, get2, set)
  if (c != 1) { unreachable() }
  return out
}
`,n=a(s,{},{});async function u(t){const{module:e,memory:r}=await n;return o(t,r),e.part1()}async function m(t){const{module:e,memory:r}=await n;return o(t,r),e.part2()}const l=[u,m];export{l as default};
