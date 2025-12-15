import{c as h}from"./emwasm-Ctrcd4uU.js";import{m as i}from"./index-GwZZPAxQ.js";const s=`
input = import js.raw(memory<u8>(1))
papers = memory<bool>(1)
let width = u32(0)
let height = u32(0)

fn parse()(idx: u32, outIdx: u32) {
  width = 0
  while (input[idx] != 0) {
    if (input[idx] == 10) {
      if (width == 0) {
        width = idx
      }
    } else {
      papers[outIdx] = input[idx] != 46
      outIdx++
    }
    idx++
  }
  height = idx / width
}

fn max(a: u32, b: u32)() -> u32 {
  return a > b ? a: b
}

fn min(a: u32, b: u32)() -> u32 {
  return a < b ? a: b
}

fn isAccessible(w: u32, h: u32)(sw: u32, ew: u32, sh: u32, eh: u32, tw: u32, th: u32, count: u32) -> u32 {
  sw = max(w, 1) - 1
  ew = min(w + 1, width - 1)
  sh = max(h, 1) - 1
  eh = min(h + 1, height - 1)
  for (tw = sw; tw <= ew; tw++) {
    for (th = sh; th <= eh; th++) {
      if (papers[th * width + tw]) { count++ }
    }
  }
  return count < 5
}

export fn part1()(sum: u32, w: u32, h: u32) -> u32 {
  parse()
  for (; h < height; h++) {
    for (w = 0; w < width; w++) {
      if (papers[h * width + w] & isAccessible(w, h)) { sum++ }
    }
  }
  return sum
}

export fn part2()(sum: u32, w: u32, h: u32, count: u32) -> u32 {
  parse()
  while (true) {
    for (h = 0; h < height; h++) {
      for (w = 0; w < width; w++) {
        if (papers[h * width + w] & isAccessible(w, h)) {
          sum++
          papers[h * width + w] = false
        }
      }
    }
    if (sum == 0) { break }
    count += sum
    sum = 0
  }
  return count
}
`,r=h(s,{},{});async function w(t){const{module:u,memory:e}=await r;return i(t,e),u.part1()}async function o(t){const{module:u,memory:e}=await r;return i(t,e),u.part2()}const m=[w,o];export{m as default};
