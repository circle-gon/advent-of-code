import{c as m}from"./emwasm-Ctrcd4uU.js";import{m as a}from"./index-GwZZPAxQ.js";import{i as n}from"./intcode-BuwA_ZA0.js";const p=`
${n}
temp = memory(1)
let range = u32(0)

fn get()() -> s64 {
  unreachable()
}

fn set(a: s64)() -> u32 {
  unreachable()
}

export fn part1()() -> u32 {
  parse()
  program[1] = 12
  program[2] = 2
  evalIntcode(0, 0, get, set)
  return u32(program[0])
}

export fn part2()(i: u64, j: u64) -> u32 {
  range = parse() * i64.size
  
  memory.copy(temp, program, 0, 0, range)
  for (; i <= 99; i++) {
    for (j = 0; j <= 99; j++) {
      memory.copy(program, temp, 0, 0, range)
      program[1] = sint(i)
      program[2] = sint(j)
      evalIntcode(0, 0, get, set)
      if (program[0] == 19690720) {
        return i32(100 * i + j)
      }
    }
  }
  unreachable()
}
`,o=m(p,{},{});async function i(r){const{module:e,memory:t}=await o;return a(r,t),e.part1()}async function s(r){const{module:e,memory:t}=await o;return a(r,t),e.part2()}const f=[i,s];export{f as default};
