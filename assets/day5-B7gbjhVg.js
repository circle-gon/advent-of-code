import{c as o}from"./emwasm-CgbW5bdp.js";import{m as i}from"./index-Cn1uEpnO.js";const r=`
input = import js.raw(memory<u8>(1))
fresh = memory<u64>(1)
total = memory<u64>(1)
let freshLen = u32(0)
let totalLen = u32(0)

fn parse()(idx: u32, outIdx: u32, num: u64, nl: u32) {
  while (input[idx] != 10 | !nl) {
    if (input[idx] != 10 & input[idx] != 45) {
      num = 10 * num + i64.extend_i32_u(input[idx] - 48)
    } else {
      fresh[outIdx] = num
      num = 0
      outIdx++  
    }
    nl = input[idx] == 10
    idx++
  }
  freshLen = outIdx
  idx++

  outIdx = 0
  while (input[idx] != 0) {
    if (input[idx] != 10) {
      num = 10 * num + i64.extend_i32_u(input[idx] - 48)
    } else {
      total[outIdx] = num
      num = 0
      outIdx++  
    }
    idx++
  }
  total[outIdx] = num
  totalLen = outIdx + 1
}

export fn part1()(idx: u32, outIdx: u32, fcount: u32, num: u64) -> u32 {
  parse()
  for (; idx < totalLen; idx++) count {
    num = total[idx]
    for (outIdx = 0; outIdx < freshLen; outIdx += 2) {
      if (num >= fresh[outIdx] & num <= fresh[outIdx + 1]) { fcount++; continue count }
    }
  }
  return fcount
}

fn insertionsort()(i: u32, j: u32, a: u64, b: u64) {
  i = 2
  while (i < freshLen) {
    j = i
    while (fresh[j - 2] > fresh[j]) {
      a = fresh[j - 2]
      b = fresh[j - 1]
      fresh[j - 2] = fresh[j]
      fresh[j - 1] = fresh[j + 1]
      fresh[j] = a
      fresh[j + 1] = b
      j -= 2
      if (j == 0) { break }
    }
    i += 2
  }
}

export fn part2()(i: u32, low: u64, high: u64, count: u64) -> u64 {
  parse()
  insertionsort()
  for (; i < freshLen; i += 2) {
    if (fresh[i] <= high) {
      if (fresh[i + 1] > high) { high = fresh[i + 1] }
    } else {
      count += high - low + 1
      low = fresh[i]
      high = fresh[i + 1]
    }
  }
  count += high - low + 1
  return count - 1
}
`,n=o(r,{},{});async function s(t){const{module:u,memory:e}=await n;return i(t,e),u.part1()}async function f(t){const{module:u,memory:e}=await n;return i(t,e),u.part2()}const m=[s,f];export{m as default};
