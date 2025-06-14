import{c as s}from"./emwasm-BknXIY8D.js";import{m as e}from"./index-CbGXu4SM.js";import{i as a}from"./intcode-BuwA_ZA0.js";const p=`
${a}
springscript = memory<u8>(1)
script = data<active>(springscript, 0)
script2 = data<active>(springscript, 100)
let idx = u32(0)
let output = u32(0)

fn get()() -> s64 {
  idx++
  return s64(springscript[idx - 1])
}

fn set(v: s64)() -> u32 {
  if (v > 256) {
    output = u32(v)
  }
  return 0
}

fn eval(start: u32)() -> u32 {
  parse()
  idx = start
  output = 0
  evalIntcode(0, 0, get, set)
  return output
}

export fn part1()() -> u32 {
  return eval(0)
}

export fn part2()() -> u32 {
  return eval(100)
}
`,o=s(p,{},{script:new TextEncoder().encode(`NOT A J
NOT B T
OR T J
NOT C T
OR T J
AND D J
WALK
`),script2:new TextEncoder().encode(`NOT A J
NOT B T
OR T J
NOT C T
OR T J
AND D J
NOT H T
NOT T T 
OR E T
AND T J
RUN
`)});async function i(t){const{module:n,memory:r}=await o;return e(t,r),n.part1()}async function c(t){const{module:n,memory:r}=await o;return e(t,r),n.part2()}const d=[i,c];export{d as default};
