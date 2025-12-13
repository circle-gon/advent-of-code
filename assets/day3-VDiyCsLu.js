import{c as t}from"./emwasm-CgbW5bdp.js";import{m as o}from"./index-Cn1uEpnO.js";const i=`
input = import js.raw(memory<u8>(1))
numbers = memory<u8>(1)

fn parse()(idx: u32, outIdx: u32) {
  while (input[idx] != 0) {
    if (input[idx] == 10) {
      numbers[outIdx] = 0
      outIdx++
    } else {
      numbers[outIdx] = input[idx] - 48
      outIdx++
    }
    idx++
  }
  numbers[outIdx] = 0
  numbers[outIdx + 1] = 10
}

fn pow10(t: u32)(prod: u64, i: u32) -> u64 {
  prod = 1
  for (; i < t; i++) { prod *= 10 }
  return prod
}

fn solve(len: u32)(idx: u32, sum: u64, num: u32, maxidx: u32, count: u32, prod: u64) -> u64 {
  parse()
  while (numbers[idx] != 10) {
    prod = pow10(len - 1)
    for (count = 0; count < len; count++) {
      while (numbers[idx + len - 1 - count] != 0) {
        if (numbers[idx] > num) {
          num = numbers[idx]
          maxidx = idx
        }
        idx++
      }
      sum += prod * i64.extend_i32_u(num)
      if (count == len - 1) {
        idx++
      } else {
        idx = maxidx + 1
      }
      num = 0
      prod /= 10
    }
  }
  return sum
}

export fn part1()() -> u64 {
  return solve(2)
}

export fn part2()() -> u64 {
  return solve(12)
}
`,e=t(i,{},{});async function m(u){const{module:r,memory:n}=await e;return o(u,n),r.part1()}async function d(u){const{module:r,memory:n}=await e;return o(u,n),r.part2()}const p=[m,d];export{p as default};
