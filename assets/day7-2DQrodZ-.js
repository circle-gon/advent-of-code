import{c as u}from"./emwasm-Ctrcd4uU.js";import{m as i}from"./index-GwZZPAxQ.js";import{i as r}from"./intcode-BuwA_ZA0.js";const g=`
${r}
fives = data<active>(temp, 0)
temp = memory<u8>(1)
state = memory<u32>(1)
let range = u32(0)
let signal = u64(0)
let phase = u64(0)
let time = u32(0)
let out = u32(0)

fn get()() -> s64 {
  if (time == 0) {
    time = 1
    return sint(phase)
  }
  return sint(signal)
}

fn set(v: s64)() -> u32 {
  out = u32(v)
  return 0
}

fn getOutput(ph: u32, sig: u32)() -> u32 {
  memory.copy(program, temp, 0, 600, range)
  // Part 2 also uses time
  time = 0
  signal = i64(sig)
  phase = i64(ph)
  evalIntcode(0, 0, get, set)
  return out
}

export fn part1()(idx: u32, max: u32, out: u32) -> u32 {
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

fn runAmplified(idx: u32, val: u32)(base: u32, fake: u32, fake2: s32) -> u32 {
  phase = i64(val)
  time = 0
  base = idx * (range + 1)
  memory.copy(program, state, 0, i64.size * base + i32.size, i64.size * range)
  fake, fake2 = evalIntcode(state[2 * base], 0, getSuspend, set)
  state[2 * base] = fake
  memory.copy(state, program, i64.size * base + i32.size, 0, i64.size * range)
  return state[2 * base]
}

export fn part2()(idx: u32, max: u32, status: u32, i: u32) -> u32 {
  range = parse()
  memory.copy(temp, program, 600, 0, range * i64.size)
  for (; idx < 600; idx += 5) {
    for (i = 0; i < 5; i++) {
      state[2 * i * (range + 1)] = 0
      memory.copy(state, temp, i64.size * i * (range + 1) + i32.size, 600, i64.size * range)
    }
    out = 0
    runAmplified(0, temp[idx] + 5)
    runAmplified(1, temp[idx + 1] + 5)
    runAmplified(2, temp[idx + 2] + 5)
    runAmplified(3, temp[idx + 3] + 5)
    runAmplified(4, temp[idx + 4] + 5)
    do while (status != 1347376211) {
      for (i = 0; i < 5; i++) {
        status = runAmplified(i, out)
      }
    }
    if (out > max) { max = out }
  }
  return max
}
`,a=u(g,{},{fives:new TextEncoder().encode(atob("AAECAwQAAQIEAwABAwIEAAEDBAIAAQQCAwABBAMCAAIBAwQAAgEEAwACAwEEAAIDBAEAAgQBAwACBAMBAAMBAgQAAwEEAgADAgEEAAMCBAEAAwQBAgADBAIBAAQBAgMABAEDAgAEAgEDAAQCAwEABAMBAgAEAwIBAQACAwQBAAIEAwEAAwIEAQADBAIBAAQCAwEABAMCAQIAAwQBAgAEAwECAwAEAQIDBAABAgQAAwECBAMAAQMAAgQBAwAEAgEDAgAEAQMCBAABAwQAAgEDBAIAAQQAAgMBBAADAgEEAgADAQQCAwABBAMAAgEEAwIAAgABAwQCAAEEAwIAAwEEAgADBAECAAQBAwIABAMBAgEAAwQCAQAEAwIBAwAEAgEDBAACAQQAAwIBBAMAAgMAAQQCAwAEAQIDAQAEAgMBBAACAwQAAQIDBAEAAgQAAQMCBAADAQIEAQADAgQBAwACBAMAAQIEAwEAAwABAgQDAAEEAgMAAgEEAwACBAEDAAQBAgMABAIBAwEAAgQDAQAEAgMBAgAEAwECBAADAQQAAgMBBAIAAwIAAQQDAgAEAQMCAQAEAwIBBAADAgQAAQMCBAEAAwQAAQIDBAACAQMEAQACAwQBAgADBAIAAQMEAgEABAABAgMEAAEDAgQAAgEDBAACAwEEAAMBAgQAAwIBBAEAAgMEAQADAgQBAgADBAECAwAEAQMAAgQBAwIABAIAAQMEAgADAQQCAQADBAIBAwAEAgMAAQQCAwEABAMAAQIEAwACAQQDAQACBAMBAgAEAwIAAQQDAgEA"))});async function E(A){const{module:e,memory:t}=await a;return i(A,t),e.part1()}async function B(A){const{module:e,memory:t}=await a;return i(A,t),e.part2()}const s=[E,B];export{s as default};
