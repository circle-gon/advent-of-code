import{c as r}from"./emwasm-b25LuFOt.js";import{m as d}from"./index-DQLiBMR0.js";const o=`
input = import js.raw(memory<u8>(1))
table = memory<u16>(1)
wires = memory(100)
const size = u32(1000000)

fn parse()(idx: u32, outIdx: u32, val: u32, temp: u32, accum: u32) {
  while (input[idx] != 0) {
    val = input[idx]
    if (val == 76) { temp = 0 } // L
    else if (val == 82) { temp = 1 } // R
    else if (val == 85) { temp = 2 } // U
    else if (val == 68) { temp = 3 } // D
    
    idx++
    accum = 0
    while (input[idx] != 44 & input[idx] != 0 & input[idx] != 10) {
      accum = 10 * accum + input[idx] - 48
      idx++
    }
    temp |= accum << 2
    table[outIdx] = temp
    outIdx++
    if (input[idx] == 10) {
      table[outIdx] = 0
      outIdx++
    }
    if (input[idx] != 0) {
      idx++
    }
  }
  table[outIdx] = 0
}

fn getIndex(x: s32, y: s32)() -> u32 {
  // -15000 to 15000 for both x and y
  return uint((y + 15000) * 30001 + (x + 15000))
}

fn hash(key: u32)() -> u32 {
  return key % size
}

fn get(key: u32)(idx: u32, base: u32, addr: u32) -> u32 {
  base = hash(key)
  for (; idx < size; idx++) {
    addr = 6 * ((idx + base) % size)
    if (i32.load(wires, addr) == key + 1) {
      return i32.load16_u(wires, addr + 4)
    }
    if (i32.load(wires, addr) == 0) { return 0 }
  }
  unreachable()
}

fn set(key: u32, val: u32)(idx: u32, base: u32, addr: u32) {
  base = hash(key)
  for (; idx < size; idx++) {
    addr = 6 * ((idx + base) % size)
    if (i32.load(wires, addr) == key + 1) {
      i32.store16(wires, addr + 4, val)
      return
    }
    if (i32.load(wires, addr) == 0) {
      i32.store(wires, addr, key + 1)
      i32.store16(wires, addr + 4, val)
      return
    }
  }
  unreachable()
}

export fn part1()(
  idx: u32,
  x: s32,
  y: s32,
  instr: u32,
  type: u32,
  count: u32,
  loop: u32,
  distance: u32,
  tmpdst: u32
) -> u32 {
  memory.clear(wires)
  parse()
  // One round around the board
  while (table[idx] != 0) {
    instr = table[idx]
    type = instr % 4
    count = instr >> 2
    for (loop = 0; loop < count; loop++) {
      if (type == 0) { x-- }
      else if (type == 1) { x++ }
      else if (type == 2) { y++ }
      else if (type == 3) { y-- }
      set(getIndex(x, y), 1)
    }
    idx++
  }
  idx++
  x = 0
  y = 0
  distance = u32.max
  
  // Second round around the board
  while (table[idx] != 0) {
    instr = table[idx]
    type = instr % 4
    count = instr >> 2
    for (loop = 0; loop < count; loop++) {
      if (type == 0) { x-- }
      else if (type == 1) { x++ }
      else if (type == 2) { y++ }
      else if (type == 3) { y-- }
      if (get(getIndex(x, y)) == 1) {
        tmpdst = abs(x) + abs(y)
        if (tmpdst < distance) { distance = tmpdst }
      }
    }
    idx++
  }
  return distance
}

export fn part2()(
  idx: u32,
  x: s32,
  y: s32,
  instr: u32,
  type: u32,
  count: u32,
  loop: u32,
  distance: u32,
  tmpdst: u32,
  steps: u32
) -> u32 {
  memory.clear(wires)
  parse()
  // One round around the board
  while (table[idx] != 0) {
    instr = table[idx]
    type = instr % 4
    count = instr >> 2
    for (loop = 0; loop < count; loop++) {
      if (type == 0) { x-- }
      else if (type == 1) { x++ }
      else if (type == 2) { y++ }
      else if (type == 3) { y-- }
      steps++
      if (get(getIndex(x, y)) == 0) {
        set(getIndex(x, y), steps)
      }
    }
    idx++
  }
  idx++
  x = 0
  y = 0
  distance = u32.max
  steps = 0
  
  // Second round around the board
  while (table[idx] != 0) {
    instr = table[idx]
    type = instr % 4
    count = instr >> 2
    for (loop = 0; loop < count; loop++) {
      if (type == 0) { x-- }
      else if (type == 1) { x++ }
      else if (type == 2) { y++ }
      else if (type == 3) { y-- }
      steps++
      if (get(getIndex(x, y)) != 0) {
        tmpdst = get(getIndex(x, y)) + steps
        if (tmpdst < distance) { distance = tmpdst }
      }
    }
    idx++
  }
  return distance
}
`,s=r(o,{},{});async function a(e){const{module:t,memory:i}=await s;return d(e,i),t.part1()}async function u(e){const{module:t,memory:i}=await s;return d(e,i),t.part2()}const x=[a,u];export{x as default};
