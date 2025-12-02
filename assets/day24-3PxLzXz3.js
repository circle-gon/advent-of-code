import{c as t}from"./emwasm-DjeWl2j3.js";import{m as o}from"./index-Btdp0kZ0.js";const f=`
input = import js.raw(memory<u8>(1))
// todo swap
export parsed = memory<bool>(1)
hash = memory<u32>(1)
const BEGIN_INDEX = u32(500)

fn update()(i: u32, j: u32, bcount: u32) {
  for (; i < 5; i++) {
    for (j = 0; j < 5; j++) {
      bcount = 0
      if (i != 0) { bcount += input[(i - 1) * 6 + j] == 35 }
      if (i < 4) { bcount += input[(i + 1) * 6 + j] == 35 }
      if (j != 0) { bcount += input[i * 6 + j - 1] == 35 }
      if (j < 4) { bcount += input[i * 6 + j + 1] == 35 }
      input[i * 6 + j + 30] = 
        bcount == 1 | (input[i * 6 + j] != 35 & bcount == 2) ? 35 : 46
    }
    input[i * 6 + 35] = 10
  }
  memory.copy(input, input, 0, 30, 30)
}

fn boardHash()(i: u32, j: u32, hash: u32) -> u32 {
  for (; i < 5; i++) {
    for (j = 0; j < 5; j++) {
      if (input[i * 6 + j] == 35) {
        hash += 1 << (i * 5 + j)
      }
    }
  }
  return hash
}

export fn part1()(idx: u32, i: u32, code: u32) -> u32 {
  while (true) {
    code = boardHash()
    for (i = 0; i < idx; i++) {
      if (hash[i] == code) { return code }
    }
    hash[idx] = code
    idx++
    update()
  }
  unreachable()
}

export fn part2(example: u32)(
  _: u32, i: u32, j: u32, k: u32, sum: u32, low: u32, high: u32,
  checked: u32, arg: u32, bcount: u32, checked2: u32
) -> u32 {
  memory.clear(parsed)
  for (; i < 5; i++) {
    for (j = 0; j < 5; j++) {
      parsed[BEGIN_INDEX * 64 + i * 5 + j] = input[i * 6 + j] == 35
    }
  }

  low = BEGIN_INDEX
  high = BEGIN_INDEX
  for (; _ < (example ? 10 : 200); _++) {
    checked2 = false
    // Check if the board needs to be expanded in the low direction
    if (
      parsed[low * 64 + 7] | parsed[low * 64 + 11] |
      parsed[low * 64 + 13] | parsed[low * 64 + 17]
    ) {
      if (low == 0) { unreachable() }
      checked2 = true
      if (parsed[low * 64 + 7]) {
        for (i = 0; i < 5; i++) {
          parsed[(low - 1) * 64 + i + 32] = 1
        }
      }
      if (parsed[low * 64 + 11]) {
        for (i = 0; i < 5; i++) {
          parsed[(low - 1) * 64 + i * 5 + 32] = 1
        }
      }
      if (parsed[low * 64 + 13]) {
        for (i = 0; i < 5; i++) {
          parsed[(low - 1) * 64 + i * 5 + 4 + 32] = 1
        }
      }
      if (parsed[low * 64 + 17]) {
        for (i = 0; i < 5; i++) {
          parsed[(low - 1) * 64 + 20 + i + 32] = 1
        }
      }
    }
    // And check high
    checked = false
    sum = 0
    for (i = 0; i < 5; i++) {
      if (parsed[high * 64 + i]) { sum++ }
    }
    if (sum == 1 | sum == 2) {
      parsed[(high + 1) * 64 + 7 + 32] = 1
      checked = true
    }
    sum = 0
    for (i = 0; i < 5; i++) {
      if (parsed[high * 64 + 5 * i]) { sum++ }
    }
    if (sum == 1 | sum == 2) {
      parsed[(high + 1) * 64 + 11 + 32] = 1
      checked = true
    }
    sum = 0
    for (i = 0; i < 5; i++) {
      if (parsed[high * 64 + 5 * i + 4]) { sum++ }
    }
    if (sum == 1 | sum == 2) {
      parsed[(high + 1) * 64 + 13 + 32] = 1
      checked = true
    }
    sum = 0
    for (i = 0; i < 5; i++) {
      if (parsed[high * 64 + 20 + i]) { sum++ }
    }
    if (sum == 1 | sum == 2) {
      parsed[(high + 1) * 64 + 17 + 32] = 1
      checked = true
    }
    for (arg = low; arg <= high; arg++) {
      for (i = 0; i < 5; i++) {
        for (j = 0; j < 5; j++) {
          // This spot is reserved for the recursiveness
          if (i == 2 & j == 2) { continue }
          bcount = 0
          if (i != 0) {
            if (i == 3 & j == 2) {
              if (arg != low) {
                for (k = 0; k < 5; k++) {
                  if (parsed[(arg - 1) * 64 + 20 + k]) { bcount++ }
                }
              }
            } else {
              bcount += parsed[arg * 64 + (i - 1) * 5 + j]
            }
          } else if (arg != high) {
              bcount += parsed[(arg + 1) * 64 + 7] 
          }
          if (i < 4) {
            if (i == 1 & j == 2) {
              if (arg != low) {
                for (k = 0; k < 5; k++) {
                  if (parsed[(arg - 1) * 64 + k]) { bcount++ }
                }
              }
            } else {
              bcount += parsed[arg * 64 + (i + 1) * 5 + j]
            }
          } else if (arg != high) {
            bcount += parsed[(arg + 1) * 64 + 17] 
          }
          if (j != 0) {
            if (j == 3 & i == 2) {
              if (arg != low) {
                for (k = 0; k < 5; k++) {
                  if (parsed[(arg - 1) * 64 + k * 5 + 4]) { bcount++ }
                }
              }
            } else {
              bcount += parsed[arg * 64 + i * 5 + j - 1]
            }
          } else if (arg != high) {
            bcount += parsed[(arg + 1) * 64 + 11] 
          }
          if (j < 4) {
            if (j == 1 & i == 2) {
              if (arg != low) {
                for (k = 0; k < 5; k++) {
                  if (parsed[(arg - 1) * 64 + k * 5]) { bcount++ }
                } 
              }
            } else {
              bcount += parsed[arg * 64 + i * 5 + j + 1]
            }
          } else if (arg != high) {
            bcount += parsed[(arg + 1) * 64 + 13] 
          }
          parsed[arg * 64 + i * 5 + j + 32] = bcount == 1 | (!parsed[arg * 64 + i * 5 + j] & bcount == 2)
        }
      }
    }
    // The new layers should be changed but shouldn't affect the current transform process
    if (checked2) { low-- }
    if (checked) { high++ }
    for (arg = low; arg <= high; arg++) {
      memory.copy(parsed, parsed, arg * 8, arg * 8 + 4, 4)
    }
  }
  sum = 0
  for (arg = low; arg <= high; arg++) {
    for (i = 0; i < 25; i++) {
      if (parsed[arg * 64 + i]) { sum++ }
    }
  }
  return sum
}
`,a=t(f,{},{});async function c(i){const{module:e,memory:r}=await a;return o(i,r),e.part1()}async function d(i,e,r){const{module:u,memory:s}=await a;return o(i,s),u.part2(r)}const n=[c,d];export{n as default};
