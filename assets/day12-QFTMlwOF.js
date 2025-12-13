import{c as d}from"./emwasm-CgbW5bdp.js";import{m as n}from"./index-Cn1uEpnO.js";const a=`
input = import js.raw(memory<u8>(1))
export data = memory<u8>(1)
let nums = u32(0)

fn parse()(idx: u32, outIdx: u32, num: u32, seen: u32) {
  while (input[idx + 2] != 120) {
    while (input[idx] != 10) { idx++ }
    idx++
    while (input[idx - 2] != 10 | input[idx - 1] != 10) {
      if (input[idx] == 35) { num++ }
      idx++
    }
    data[outIdx] = num
    num = 0
    outIdx++
  }
  nums = outIdx
  while (input[idx] != 0) {
    if (input[idx] >= 48 & input[idx] <= 57) {
      num = 10 * num + (input[idx] - 48)
      seen = true
    } else if (seen) {
      data[outIdx] = num
      num = 0
      seen = false
      outIdx++ 
    }
    idx++
  }
  data[outIdx] = num
  data[outIdx + 1] = 0
}

export fn part1()(idx: u32, sum: u32, i: u32, count: u32) -> u32 {
  parse()
  idx = nums
  while (data[idx] != 0) {
    for (i = 0; i < nums; i++) {
      sum += data[i] * data[idx + 2 + i]
    }
    if (sum <= data[idx] * data[idx + 1]) { count++ }
    sum = 0
    idx += nums + 2
  }
  return count
}
`,e=d(a,{},{});async function m(u){const{module:i,memory:t}=await e;return n(u,t),i.part1()}const s=[m];export{s as default};
