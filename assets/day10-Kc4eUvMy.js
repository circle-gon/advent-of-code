import{c as u}from"./emwasm-DjeWl2j3.js";import{m as a}from"./index-Btdp0kZ0.js";const r=`
input = import js.raw(memory<u8>(1))
clean = memory<u8>(1)
table = memory<bool>(1)
let len = u32(0)
const pi = f32(3.14159265)

fn parse()(idx: u32, outIdx: u32, x: u32, y: u32) {
  while (input[idx] != 0) {
    if (input[idx] == 10) {
      y++
      x = 0
    } else if (input[idx] == 35) {
      clean[outIdx] = x
      clean[outIdx + 1] = y
      clean[outIdx + 2] = 0
      outIdx += 3
      x++
    } else {
      x++
    }
    idx++
  }
  len = outIdx
}

fn see(x: u32, y: u32)(idx: u32, count: u32, an: u32) -> u32 {
  memory.clear(table)
  for (; idx < len; idx += 3) {
    if (clean[idx] == x & clean[idx + 1] == y) { continue }
    // This is definitely a very great hash key
    an = i32.reinterpret_f32(atan2c(x, y, clean[idx], clean[idx + 1])) >> 13
    if (table[an] == 0) {
      count++
      table[an] = 1
    }
  }
  return count
}

fn getOptimal()(idx: u32, max: u32, count: u32, x: u32, y: u32) -> u32, u32 {
  parse()
  for (; idx < len; idx += 3) {
    count = see(clean[idx], clean[idx + 1])
    if (count > max) {
      max = count
      x = clean[idx]
      y = clean[idx + 1]
    }
  }
  return x, y
}

export fn part1()() -> u32 {
  return see(getOptimal())
}

fn dist(x: u32, y: u32, dx: u32, dy: u32)() -> u32 {
  return abs(sint(x - dx)) + abs(sint(y - dy))
}

// atan2 approximation from https://gist.github.com/volkansalma/2972237
// Apparently this is a really bad approximation but it appears to be better???
fn atan2(y: s32, x: s32)(z: f32, atan: f32) -> f32 {
  if (x == 0) {
    if (y > 0) { return pi / 2 }
    if (y == 0) { return 0 }
    return -pi / 2
  }

  z = f32.convert_i32_s(y) / f32.convert_i32_s(x)
  if (generic.abs(z) < 1) {
    atan = z / (1 + 0.28 * z * z)
    if (x < 0) {
      if (y < 0) { return atan - pi }
      return atan + pi
    }
  } else {
    atan = pi / 2 - z / (z * z + 0.28)
    if (y < 0) { return atan - pi } 
  }
  return atan
}

fn atan2c(x: u32, y: u32, dx: u32, dy: u32)() -> f32 {
  return atan2(sint(y - dy), sint(dx - x))
}

fn fangle(x: u32, y: u32, dx: u32, dy: u32)(res: f32) -> f32 {
  res = 0.5 - atan2c(x, y, dx, dy) / pi
  if (res < 0) { res += 2 }
  if (res >= 2) { res -= 2 }
  return res
}

export fn part2()(
  x: u32, y: u32, count: u32, idx: u32,
  angle: f32, curAngle: f32, tempAngle: f32,
  addr: u32, found: u32
) -> u32 {
  x, y = getOptimal()

  angle = -1
  while (count < 200) {
    for (idx = 0; idx < len; idx += 3) {
      if (clean[idx + 2] == 1) { continue }
      tempAngle = fangle(x, y, clean[idx], clean[idx + 1])
      if (tempAngle > angle & (
        (!found | tempAngle < curAngle | (
          tempAngle == curAngle & 
          dist(x, y, clean[idx], clean[idx + 1]) < dist(x, y, clean[addr], clean[addr + 1])
          )
        )
      )) {
        curAngle = tempAngle
        addr = idx
        found = true
      }
    }
    if (found) {
      count++
      clean[addr + 2] = 1
      found = false
      angle = curAngle
    } else {
      angle = -1 
    }
  }
  return clean[addr] * 100 + clean[addr + 1]
}
`,i=u(r,{},{});async function d(e){const{module:n,memory:t}=await i;return a(e,t),n.part1()}async function x(e){const{module:n,memory:t}=await i;return a(e,t),n.part2()}const c=[d,x];export{c as default};
