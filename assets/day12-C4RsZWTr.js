import{c as t}from"./emwasm-CgbW5bdp.js";import{m as u}from"./index-Cn1uEpnO.js";const m=`
input = import js.raw(memory<u8>(1))
moons = memory<s16>(1)
copy = memory<s16>(1)
let len = u32(0)

fn inRange(m: u32)() -> u32 {
  return (m >= 48) & (m <= 57)
}

fn parse()(idx: u32, outIdx: u32, accum: s32, neg: u32, checked: u32) {
  while (input[idx] != 0) {
    if (input[idx] == 45) {
      neg = true
    } else if (inRange(input[idx])) {
      accum = 10 * accum + sint(input[idx] - 48) 
      checked = true
    } else if (checked) {
      if (neg) { moons[outIdx] = -accum }
      else { moons[outIdx] = accum }
      accum = 0
      neg = false
      checked = false
      outIdx++
      if ((outIdx % 3) == 0) {
        moons[outIdx] = 0
        moons[outIdx + 1] = 0
        moons[outIdx + 2] = 0
        outIdx += 3
      }
    }
    idx++
  }
  if (accum != 0) {
    if (neg) { moons[outIdx] = -accum }
    else { moons[outIdx] = accum }
    outIdx++
    if ((outIdx % 3) == 0) {
      moons[outIdx] = 0
      moons[outIdx + 1] = 0
      moons[outIdx + 2] = 0
      outIdx += 3
    }
  }
  len = outIdx
}

fn simulateOne(j: u32)(idx: u32, idx2: u32) {
  for (idx = 0; idx < len; idx += 6) {
    for (idx2 = 0; idx2 < idx; idx2 += 6) {
      if (moons[idx + j] < moons[idx2 + j]) {
        moons[idx + 3 + j]++
        moons[idx2 + 3 + j]--
      }
      else if (moons[idx + j] > moons[idx2 + j]) {
        moons[idx + 3 + j]--
        moons[idx2 + 3 + j]++
      }
    }
  }
  for (idx = 0; idx < len; idx += 6) {
    moons[idx + j] += moons[idx + j + 3]
  }
}

export fn part1()(t: u32, idx: u32, j: u32, sum: u32, f1: u32, f2: u32) -> u32 {
  parse()
  for (; t < 1000; t++) {
    for (j = 0; j < 3; j++) {
      simulateOne(j)
    }
  }
  for (idx = 0; idx < len; idx += 6) {
    f1 = 0
    f2 = 0
    for (j = 0; j < 3; j++) {
      f1 += abs(moons[idx + j])
      f2 += abs(moons[idx + j + 3])
    }
    sum += f1 * f2
  }
  return sum
}

// Binary GCD algorithm from https://en.wikipedia.org/wiki/Binary_GCD_algorithm#Implementation
fn gcd(a: u64, b: u64)(i: u64, j: u64, k: u64, tmp: u64) -> u64 {
  if (b == 0) { return a }
  if (a == 0) { return b }

  i = i64.ctz(a)
  j = i64.ctz(b)
  k = i < j ? i : j
  a >>= i
  b >>= j

  while (true) {
    if (a > b) {
      tmp = a
      a = b
      b = tmp
    }

    b -= a
    if (b == 0) {
      return a << k
    }

    b >>= i64.ctz(b)
  }

  unreachable()
}

fn lcm(a: u64, b: u64)() -> u64 {
  return a * b / gcd(a, b)
}

fn lcm3(a: u64, b: u64, c: u64)() -> u64 {
  return lcm(lcm(a, b), c)
}

fn findRepeat(j: u32)(t: u64, idx: u32, same: u32) -> u64 {
  while (true) {
    simulateOne(j)
    t++
    same = true
    for (idx = 0; idx < len; idx += 6) {
      if (copy[idx + j] != moons[idx + j] | copy[idx + j + 3] != moons[idx + j + 3]) {
        same = false
      }
    }
    if (same) { return t }
  }

  unreachable()
}

export fn part2()() -> u64 {
  parse()
  memory.copy(copy, moons, 0, 0, memory.byteSize(moons))
  return lcm3(findRepeat(0), findRepeat(1), findRepeat(2))
}
`,n=t(m,{},{});async function d(o){const{module:i,memory:e}=await n;return u(o,e),i.part1()}async function a(o){const{module:i,memory:e}=await n;return u(o,e),i.part2()}const x=[d,a];export{x as default};
