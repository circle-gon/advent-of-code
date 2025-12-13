import{c as u}from"./emwasm-CgbW5bdp.js";import{m as n}from"./index-Cn1uEpnO.js";const o=`
input = import js.raw(memory<u8>(1))
machines = memory<u16>(1)
let top = u32(0)
goalStack = memory<u16>(1)
parityTable = memory<u8>(4)
const maxParityCount = u32(20)

fn parse()(idx: u32, outIdx: u32, num: u32, count: u32, i: u32) {
  while (input[idx] != 0) {
    if (input[idx] == 10) { idx++ }
    idx++
    i = 0
    while (input[idx] != 93) {
      if (input[idx] == 35) { num += 1 << i }
      i++
      idx++
    }
    machines[outIdx] = num
    num = 0
    outIdx += 2
    idx += 2
    while (input[idx] == 40) {
      idx++
      while (input[idx] != 41) {
        if (input[idx] != 44) {
          num |= 1 << (input[idx] - 48)
        }
        idx++
      }
      machines[outIdx] = num
      outIdx++
      num = 0
      idx += 2
      count++
    }
    machines[outIdx - count - 1] = count
    outIdx++
    count = 0
    idx++
      while (input[idx] != 125) {
        if (input[idx] == 44) {
          machines[outIdx] = num
          outIdx++
          num = 0
          count++
        } else {
          num = 10 * num + input[idx] - 48
        }
        idx++
      }
    machines[outIdx] = num
    machines[outIdx - count - 1] = count + 1
    count = 0
    outIdx++
    num = 0
    idx++
  }
  machines[outIdx] = 0
}

export fn part1()(tries: u32, idx: u32, target: u32, len: u32, i: u32, j: u32, num: u32, need: u32) -> u32 {
  parse()
  while (machines[idx] != 0) {
    target = machines[idx]
    len = machines[idx + 1]
    need = 100
    for (i = 0; i < (1 << len); i++) {
      num = 0
      for (j = 0; j < len; j++) {
        if (i & (1 << j)) {
          num ^= machines[idx + 2 + j]
        }
      }
      if (num == target & i32.popcnt(i) < need) {
        need = i32.popcnt(i)
      }
    }
    tries += need
    idx += 2 + len
    idx += 1 + machines[idx]
  }
    
  return tries
}

// https://www.reddit.com/r/adventofcode/comments/1pk87hl/2025_day_10_part_2_bifurcate_your_way_to_victory/
fn genParityTable(idx: u32)(length: u32, buttonCount: u32, i: u32, j: u32, k: u32, btn: u32, parity: u32, len: u32) {
  buttonCount = machines[idx]
  length = machines[idx + 1 + buttonCount]
  for (; i < (1 << length); i++) {
    parityTable[i * (maxParityCount * (length + 1) + 1)] = 0
  }
  for (i = 0; i < (1 << buttonCount); i++) {
    for (j = 0; j < buttonCount; j++) {
      if (i & (1 << j)) {
        btn = machines[idx + 1 + j]
        for (k = 0; k < length; k++) {
          if (btn & (1 << k)) {
            parityTable[230000 + k]++
          }
        }
      }
    }
    // Get parity
    for (j = 0; j < length; j++) {
      if (parityTable[230000 + j] % 2 == 1) {
        parity += 1 << j
      }
    }
    len = parityTable[parity * (maxParityCount * (length + 1) + 1)]
    if (len == maxParityCount) { unreachable() }
    parityTable[parity * (maxParityCount * (length + 1) + 1) + 1 + len * (length + 1)] = i32.popcnt(i)
    memory.copy(parityTable, parityTable, parity * (maxParityCount * (length + 1) + 1) + len * (length + 1) + 1 + 1, 230000, length)
    parityTable[parity * (maxParityCount * (length + 1) + 1)]++
    memory.fill(parityTable, 230000, 0, length)
    parity = 0
  }
}

fn solveMin(idx: u32)(length: u32, isZero: u32, num: u32, t: u32, h: u32, max: u32, offset: u32, j: u32, works: u32, attempt: u32, i: u32, curr: u32) -> u32 {
  isZero = true
  t = machines[idx]
  length = machines[idx + 1 + t]
  for (i = 0; i < length; i++) {
    curr = goalStack[(top - 1) * length + i]
    if (curr % 2 != 0) {
      num += 1 << i
    } 
    if (curr != 0) {
      isZero = false
    }
  }
  if (isZero) {
    top--
    return 0
  }
  max = 100000
  offset = num * (maxParityCount * (length + 1) + 1)
  for (i = 0; i < parityTable[offset]; i++) {
    works = true
    for (j = 0; j < length; j++) {
      if (goalStack[(top - 1) * length + j] < parityTable[offset + 1 + (length + 1) * i + j + 1]) {
        works = false
      }
    }
    if (works) {
      // It works!
      for (j = 0; j < length; j++) {
        goalStack[top * length + j] = (goalStack[(top - 1) * length + j] - parityTable[offset + 1 + (length + 1) * i + j + 1]) / 2
      }
      top++
      attempt = parityTable[offset + 1 + (length + 1) * i] + 2 * solveMin(idx)
      if (attempt < max) { max = attempt }
    }
  }
  top--
  return max
}

export fn part2()(tries: u32, idx: u32, targetIdx: u32) -> u32 {
  parse()
  while (machines[idx] != 0) {
    targetIdx = idx + 2 + machines[idx + 1]
    genParityTable(idx + 1)
    memory.copy(goalStack, machines, 0, 2 * (targetIdx + 1), 2 * machines[targetIdx])

    top++
    tries += solveMin(idx + 1)
    idx = targetIdx + 1 + machines[targetIdx]
  }
  return tries
}
`,a=u(o,{},{});async function r(t){const{module:i,memory:e}=await a;return n(t,e),i.part1()}async function m(t){const{module:i,memory:e}=await a;return n(t,e),i.part2()}const d=[r,m];export{d as default};
