import{c as r}from"./emwasm-BknXIY8D.js";import{m as n}from"./index-CbGXu4SM.js";const m=`
input = import js.raw(memory<u8>(1))
let begin = u32(0)
let end = u32(0)

fn parse()(idx: u32, accum: u32) {
  while (input[idx] != 45) {
    accum = 10 * accum + (input[idx] - 48)
    idx++
  }
  begin = accum
  accum = 0
  idx++
  while (input[idx] != 0) {
    accum = 10 * accum + (input[idx] - 48)
    idx++
  }
  end = accum
}

fn valid(num: u32)(prev: u32, same: u32, digit: u32) -> u32 {
  prev = num % 10
  num /= 10
  while (num != 0) {
    digit = num % 10
    num /= 10

    if (digit == prev) { same = 1 }
    if (prev < digit) { return 0 }
    prev = digit
  }
  return same
}

fn valid2(num: u32)(prev: u32, same: u32, digit: u32, len: u32) -> u32 {
  prev = num % 10
  num /= 10
  while (num != 0) {
    digit = num % 10
    num /= 10

    if (digit == prev) { len++ }
    else {
      if (len == 1) { same = 1 }
      len = 0
    }
    if (prev < digit) { return 0 }
    prev = digit
  }
  // It is always off by 1 because it counts consecutive groups, which is one less
  // than the matching digit count
  return same | len == 1
}

export fn part1()(i: u32, count: u32) -> u32 {
  parse()

  for (i = begin; i <= end; i++) {
    if (valid(i)) { count++ }
  }
  return count
}

export fn part2()(i: u32, count: u32) -> u32 {
  parse()

  for (i = begin; i <= end; i++) {
    if (valid2(i)) { count++ }
  }
  return count
}
`,t=r(m,{},{});async function a(i){const{module:u,memory:e}=await t;return n(i,e),u.part1()}async function c(i){const{module:u,memory:e}=await t;return n(i,e),u.part2()}const d=[a,c];export{d as default};
