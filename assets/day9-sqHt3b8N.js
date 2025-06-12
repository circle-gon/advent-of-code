import{c as a}from"./emwasm-Dw92gTPk.js";import{m as o}from"./index-gvt7MWwt.js";import{i as c}from"./intcode-YJkym2R9.js";const s=`
${c}
let c = u32(0)
let out = s64(0)

fn get()() -> s64 {
  return 1
}

fn get2()() -> s64 {
  return 2
}

fn set(v: s64)() -> u32 {
  c++
  out = v
  return 0
}

export fn part1()() -> s64 {
  c = 0
  parse()
  evalIntcode(0, 0, get, set)
  if (c != 1) { unreachable() }
  return out
}

export fn part2()() -> u32 {
  c = 0
  parse()
  evalIntcode(0, 0, get2, set)
  if (c != 1) { unreachable() }
  return i32.wrap_i64(out)
}
`,n=a(s,{},{});async function u(t){const{module:e,memory:r}=await n;return o(t,r),e.part1()}async function m(t){const{module:e,memory:r}=await n;return o(t,r),e.part2()}const l=[u,m];export{l as default};
