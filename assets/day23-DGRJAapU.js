import{c as d}from"./emwasm--tg4IAJG.js";import{m as i}from"./index-vH6bm6Wv.js";import{i as s}from"./intcode-DD3AWPIW.js";const n=`
${s}
temp = memory<s64>(15)
packets = memory<s64>(2)
data = memory<u16>(1)
let range = u32(0)
let output = u32(0)
let id = u32(0)
let begin = u32(0)
let natx = s64(0)
let naty = s64(0)
let prevnaty = s64(0)
let pkgget = u32(0)
const MAX_PACKETS = u32(300)

fn get()() -> s64 {
  // 0: start of new packet
  // 1: end of new packets
  // 2: current destination address
  // 3: whether to suspend waiting for a packet
  // 4: write amount state
  if (data[5 * id] < data[5 * id + 1]) {
    data[5 * id]++
    return packets[id * MAX_PACKETS + data[5 * id] - 1]
  }
  pkgget++
  if (data[5 * id + 3] == 0) {
    data[5 * id + 3] = 1
    // Wait for a possible next packet
    return 1347376211
  }
  // No packet has been received, so just output -1
  data[5 * id + 3] = 0
  return -1
}

fn get2()() -> s64 {
  if (begin) { return 1347376211 }
  begin = true
  return i64.extend_i32_u(id)
}

fn set(val: s64)(i: u32, addr: u32, dst: u32) -> u32 {
  dst = data[5 * id + 2]
  if (dst == 50) {
    data[5 * id + 2] = i32.wrap_i64(val)
    return 0
  }
  data[5 * id + 4]++
  if (dst == 255) {
    if (data[5 * id + 4] == 2) {
      output = i32.wrap_i64(val)
    }
  } else {
    addr = dst * MAX_PACKETS + data[5 * dst + 1]
    packets[addr] = val 
  }
  if (data[5 * id + 4] == 2) {
    data[5 * id + 2] = 50
    data[5 * id + 4] = 0
  }
  data[5 * dst + 1]++
  return 0
}

fn set2(val: s64)(i: u32, addr: u32, dst: u32) -> u32 {
  dst = data[5 * id + 2]
  if (dst == 50) {
    data[5 * id + 2] = i32.wrap_i64(val)
    return 0
  }

  data[5 * id + 4]++
  if (dst == 255) {
    if (data[5 * id + 4] == 2) { naty = val }
    else { natx = val }
  } else {
    addr = dst * MAX_PACKETS + data[5 * dst + 1]
    packets[addr] = val 
  }
  if (data[5 * id + 4] == 2) {
    data[5 * id + 2] = 50
    data[5 * id + 4] = 0
  }
  data[5 * dst + 1]++
  return 0
}

fn run(cid: u32)(base: u32, fake: u32, fake2: s32) -> u32 {
  id = cid
  base = (range + 2) * id
  output = 1347376211
  // Skip ip and rel
  memory.copy(program, temp, 0, (base + 2) * i64.size, range)
  fake, fake2 = evalIntcode(i32.wrap_i64(temp[base]), i32.wrap_i64(temp[base + 1]), get, set)
  memory.copy(temp, program, (base + 2) * i64.size, 0, range)
  temp[base] = i64.extend_i32_u(fake)
  temp[base + 1] = i64.extend_i32_s(fake2)
  return output
}

fn run2(cid: u32)(base: u32, fake: u32, fake2: s32) {
  id = cid
  base = (range + 2) * id
  // Skip ip and rel
  memory.copy(program, temp, 0, (base + 2) * i64.size, range)
  fake, fake2 = evalIntcode(i32.wrap_i64(temp[base]), i32.wrap_i64(temp[base + 1]), get, set2)
  memory.copy(temp, program, (base + 2) * i64.size, 0, range)
  temp[base] = i64.extend_i32_u(fake)
  temp[base + 1] = i64.extend_i32_s(fake2)
}

fn init(cid: u32)(base: u32, fake: u32, fake2: s32) -> u32 {
  id = cid
  base = (range + 2) * id
  begin = false
  // Skip ip and rel
  memory.copy(program, temp, 0, (base + 2) * i64.size, range)
  fake, fake2 = evalIntcode(0, 0, get2, set)
  memory.copy(temp, program, (base + 2) * i64.size, 0, range)
  temp[base] = i64.extend_i32_u(fake)
  temp[base + 1] = i64.extend_i32_s(fake2)
  return output
}

fn start()(i: u32) {
  // Boot up the computer
  range = parse()
  for (; i < 50; i++) {
    memory.copy(
      temp, program,
      ((range + 2) * i + 2) * i64.size, 0, range * i64.size
    )
    data[5 * i + 2] = 50
  }
  for (i = 0; i < 50; i++) { init(i) }
}

export fn part1()(i: u32, res: u32) -> u32 {
  start()
  i = 0
  while (true) {
    res = run(i)
    if (res != 1347376211) { return res }
    i = (i + 1) % 50
  }
  unreachable()
}

export fn part2()(i: u32, res: u32, base: u32, target: u32, idle: u32) -> s64 {
  start()
  prevnaty = 1347376211
  while (true) {
    for (i = 0; i < 50; i++) {
      run2(i)
    }
    base = true
    for (i = 0; i < 50; i++) {
      if (data[5 * i] != data[5 * i + 1]) {
        base = false
        break
      }
    }
    if (pkgget >= 1000) {
      if (naty == prevnaty) { return naty }
      target = data[1]
      packets[target] = natx
      packets[target + 1] = naty
      prevnaty = naty
      data[1] += 2
      pkgget = 0
    }
  }
  unreachable()
}
`,r=d(n,{},{});async function p(e){const{module:a,memory:t}=await r;return i(e,t),a.part1()}async function u(e){const{module:a,memory:t}=await r;return i(e,t),a.part2()}const c=[p,u];export{c as default};
