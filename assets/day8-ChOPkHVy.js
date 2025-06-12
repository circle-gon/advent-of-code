import{c as n}from"./emwasm-Dw92gTPk.js";import{m as i}from"./index-gvt7MWwt.js";const m=`
input = import js.raw(memory<u8>(1))
clean = memory<u8>(1)
export out = memory<u8>(1)
let len = u32(0)
fn parse()(idx: u32) {
  while (input[idx] != 0) {
    clean[idx] = input[idx] - 48
    idx++
  }
  len = idx / 150 // 25 by 6
}

export fn part1()(min: u32, mul: u32, count: u32, val: u32, idx: u32, zsum: u32, tsum: u32, osum: u32) -> u32 {
  parse()
  min = u32.max
  for (; count < len; count++) {
    for (idx = 0; idx < 150; idx++) {
      val = clean[idx + count * 150]
      if (val == 0) { zsum++ }
      else if (val == 1) { osum++ }
      else if (val == 2) { tsum++ }
    }
    if (zsum < min) {
      min = zsum
      mul = osum * tsum
    }
    zsum = 0
    osum = 0
    tsum = 0
  }
  return mul
}

export fn part2()(count: u32, row: u32, idx: u32, val: u32) {
  parse()
  memory.fill(out, 0, 2, i32.size * 26 * 6)
  for (; count < len; count++) {
    for (row = 0; row < 6; row++) {
      for (idx = 0; idx < 25; idx++) {
        if (out[row * 26 + idx] == 2) {
          out[row * 26 + idx] = clean[row * 25 + idx + count * 150]
        }
      }
    }
  }
  for (idx = 0; idx < 26 * 6; idx++) {
    val = out[idx]
    if (val == 0) { out[idx] = 32 } // " "
    else if (val == 1) { out[idx] = 35 } // "#"
    else if (val == 2) { out[idx] = 10 } // newline
    else { unreachable() }
  }
}
`,r=n(m,{},{});async function a(e){const{module:u,memory:o}=await r;return i(e,o),u.part1()}async function l(e){const{module:u,memory:o}=await r;i(e,o),u.part2();const t=document.createElement("pre");return t.textContent=new TextDecoder().decode(new Uint8Array(u.out.buffer).subarray(0,26*6)),[t]}const x=[a,l];export{x as default};
