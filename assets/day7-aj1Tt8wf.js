import{c as a}from"./emwasm-BAYlZ7aM.js";import{m as i}from"./index-DJW6-bui.js";import{i as g}from"./intcode-BRTvzTo6.js";const r=`
${g}
fives = data<active>(temp, 0)
temp = memory<u8>(1)
state = memory<u32>(1)
let range = u32(0)
let signal = u64(0)
let phase = u64(0)
let time = u32(0)
let out = u64(0)

fn get()() -> s64 {
  if (time == 0) {
    time = 1
    return sint(phase)
  }
  return sint(signal)
}

fn set(v: s64)() {
  out = uint(v)
}

fn getOutput(ph: u32, sig: u64)() -> u64 {
  memory.copy(program, temp, 0, 600, range)
  signal = sig
  phase = i64.extend_i32_u(ph)
  time = 0
  evalIntcode(0, 0, get, set)
  return out
}

export fn part1()(idx: u32, max: u64, out: u64) -> u64 {
  range = parse() * i64.size
  memory.copy(temp, program, 600, 0, range)
  for (; idx < 600; idx += 5) {
    out = getOutput(temp[idx], 0)
    out = getOutput(temp[idx + 1], out)
    out = getOutput(temp[idx + 2], out)
    out = getOutput(temp[idx + 3], out)
    out = getOutput(temp[idx + 4], out)
    if (out > max) { max = out }
  }
  return max
}

fn getSuspend()() -> s64 {
  if (time == 0) {
    time = 1
    return sint(phase)
  }
  return 1347376211 // STOP
}

fn runAmplified(idx: u32, val: u64)(base: u32, fake: u32, fake2: s32) -> u32 {
  phase = val
  time = 0
  base = idx * (range + 1)
  memory.copy(program, state, 0, i64.size * base + i32.size, i64.size * range)
  fake, fake2 = evalIntcode(state[2 * base], 0, getSuspend, set)
  state[2 * base] = fake
  memory.copy(state, program, i64.size * base + i32.size, 0, i64.size * range)
  return state[2 * base]
}

export fn part2()(idx: u32, max: u64, status: u32, i: u32) -> u64 {
  range = parse()
  memory.copy(temp, program, 600, 0, range * i64.size)
  for (; idx < 600; idx += 5) {
    for (i = 0; i < 5; i++) {
      state[2 * i * (range + 1)] = 0
      memory.copy(state, temp, i64.size * i * (range + 1) + i32.size, 600, i64.size * range)
    }
    out = 0
    runAmplified(0, i64.extend_i32_u(temp[idx] + 5))
    runAmplified(1, i64.extend_i32_u(temp[idx + 1] + 5))
    runAmplified(2, i64.extend_i32_u(temp[idx + 2] + 5))
    runAmplified(3, i64.extend_i32_u(temp[idx + 3] + 5))
    runAmplified(4, i64.extend_i32_u(temp[idx + 4] + 5))
    do while (status != 1347376211) {
      for (i = 0; i < 5; i++) {
        status = runAmplified(i, out)
      }
    }
    if (out > max) { max = out }
  }
  return max
}
`,u=a(r,{},{fives:new TextEncoder().encode(atob("AAECAwQAAQIEAwABAwIEAAEDBAIAAQQCAwABBAMCAAIBAwQAAgEEAwACAwEEAAIDBAEAAgQBAwACBAMBAAMBAgQAAwEEAgADAgEEAAMCBAEAAwQBAgADBAIBAAQBAgMABAEDAgAEAgEDAAQCAwEABAMBAgAEAwIBAQACAwQBAAIEAwEAAwIEAQADBAIBAAQCAwEABAMCAQIAAwQBAgAEAwECAwAEAQIDBAABAgQAAwECBAMAAQMAAgQBAwAEAgEDAgAEAQMCBAABAwQAAgEDBAIAAQQAAgMBBAADAgEEAgADAQQCAwABBAMAAgEEAwIAAgABAwQCAAEEAwIAAwEEAgADBAECAAQBAwIABAMBAgEAAwQCAQAEAwIBAwAEAgEDBAACAQQAAwIBBAMAAgMAAQQCAwAEAQIDAQAEAgMBBAACAwQAAQIDBAEAAgQAAQMCBAADAQIEAQADAgQBAwACBAMAAQIEAwEAAwABAgQDAAEEAgMAAgEEAwACBAEDAAQBAgMABAIBAwEAAgQDAQAEAgMBAgAEAwECBAADAQQAAgMBBAIAAwIAAQQDAgAEAQMCAQAEAwIBBAADAgQAAQMCBAEAAwQAAQIDBAACAQMEAQACAwQBAgADBAIAAQMEAgEABAABAgMEAAEDAgQAAgEDBAACAwEEAAMBAgQAAwIBBAEAAgMEAQADAgQBAgADBAECAwAEAQMAAgQBAwIABAIAAQMEAgADAQQCAQADBAIBAwAEAgMAAQQCAwEABAMAAQIEAwACAQQDAQACBAMBAgAEAwIAAQQDAgEA"))});async function E(A){const{module:e,memory:t}=await u;return i(A,t),e.part1()}async function B(A){const{module:e,memory:t}=await u;return i(A,t),e.part2()}const s=[E,B];export{s as default};
