import{c as p}from"./emwasm-DwTE8Fc6.js";import{m}from"./index-DPLSfBBi.js";const t=`
input = import js.raw(memory<u8>(1))
program = memory<u32>(1)
temp = memory<u32>(1)
let range = u32(0)

fn inRange(m: u32)() -> u32 {
  return (m >= 48) & (m <= 57)
}

fn parse()(idx: u32, val: u32, accum: u32, outIdx: u32) {
  while (input[idx] != 0) {
    val = input[idx]
    if (inRange(val)) {
      accum = 10 * accum + (val - 48)
    } else {
      program[outIdx] = accum
      accum = 0
      outIdx++
    }
    idx++
  }
  if (accum != 0) { program[outIdx] = accum; outIdx++ }
  range = outIdx * 4
}

fn evalIntcode()(ip: u32, instr: u32, val1: u32, val2: u32) {
  while (true) {
    instr = program[ip]
    if (instr == 1) {
      val1 = program[program[ip + 1]]
      val2 = program[program[ip + 2]]
      program[program[ip + 3]] = val1 + val2
    } else if (instr == 2) {
      val1 = program[program[ip + 1]]
      val2 = program[program[ip + 2]]
      program[program[ip + 3]] = val1 * val2
    } else if (instr == 99) { return }
    else { unreachable() }
    ip += 4
  }
}

export fn part1()() -> u32 {
  parse()
  program[1] = 12
  program[2] = 2
  evalIntcode()
  return program[0]
}

export fn part2()(i: u32, j: u32) -> u32 {
  parse()
  
  memory.copy(temp, program, 0, 0, range)
  for (; i <= 99; i++) {
    for (j = 0; j <= 99; j++) {
      memory.copy(program, temp, 0, 0, range)
      program[1] = i
      program[2] = j
      evalIntcode()
      if (program[0] == 19690720) {
        return 100 * i + j
      }
    }
  }
  unreachable()
}
`,e=p(t,{});async function u(r){const{module:a,memory:o}=await e;return m(r,o),a.part1()}async function i(r){const{module:a,memory:o}=await e;return m(r,o),a.part2()}const l=[u,i];export{l as default};
