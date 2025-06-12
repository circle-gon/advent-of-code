import{c as a}from"./emwasm-Dw92gTPk.js";import{m as u}from"./index-gvt7MWwt.js";import{i as r}from"./intcode-YJkym2R9.js";const d=`
${r}
let ip = u32(0)
let rel = s32(0)
let output = u32(0)
let stage = u32(0)
let in = u32(0)
let end = u32(0)
let x = s32(0)
let y = s32(0)
queue = memory<s8>(1)
queue2 = memory<s8>(1)
seen = memory<bool>(1)
seen3 = memory<bool>(1)
seen2 = memory<u16>(1)

fn get()() -> s64 {
  if (stage == 0) {
    stage = 1
    return i64.extend_i32_u(in)
  }
  stage = 0
  return 1347376211 // STOP
}

fn set(v: s64)() -> u32 {
  output = i32.wrap_i64(v)
  return 0
}

fn performStep(num: u32)() -> u32 {
  in = num
  ip, rel = evalIntcode(ip, rel, get, set)
  if (output != 0) {
    if (num == 1) { y-- }
    else if (num == 2) { y++ }
    else if (num == 3) { x-- }
    else if (num == 4) { x++ }
    else { unreachable() }
  }
  return output
}

fn alwaysStep(num: u32)() {
  if (performStep(num) != 1) { unreachable() }
}

fn hash(x: s32, y: s32)() -> u32 {
  return uint((y + 100) * 201 + (x + 100))
}

fn unhash(h: u32)() -> s32, s32 {
  return sint(h % 201 - 100), sint(h / 201 - 100)
}

fn poke(dist: u32)(idx: u32, status: u32) -> s32, s32 {
  for (idx = 1; idx <= 4; idx++) {
    status = performStep(idx)
    if (status == 2) {
      return x, y
    }
    else if (status == 1) {
      if (seen[hash(x, y)] == 0) {
        // x, y, and distance
        queue[end] = x
        queue[end + 1] = y
        i32.store8(queue, end + 2, dist + 1)
        seen[hash(x, y)] = 1
        end += 3
      }
      if (idx == 1) { alwaysStep(2) }
      else if (idx == 2) { alwaysStep(1) }
      else if (idx == 3) { alwaysStep(4) }
      else if (idx == 4) { alwaysStep(3) }
      else { unreachable() }
    }
  }
  return 0, 0
}

fn moveTo(xd: s32, yd: s32)(
  start: u32, end: u32, s: u32, nx: s32, ny: s32, h: u32, dx: s32, dy: s32,
  ox: s32, oy: s32, idx: u32, ix: s32, iy: s32
) {
  memory.clear(seen2)
  queue2[0] = x
  queue2[1] = y
  ox = x
  oy = y
  end += 2
  while (start < end) {
    if (queue2[start] == xd & queue2[start + 1] == yd) { break }
    for (s = 0; s < 4; s++) {
      nx = queue2[start] + sint(s < 2 ? 0 : 2 * (s - 2) - 1)
      ny = queue2[start + 1] + sint(s >= 2 ? 0 : 2 * s - 1)
      // Traversable and we have not already seen it
      if (seen[hash(nx, ny)] == 1 & seen2[hash(nx, ny)] == 0) {
        // add
        queue2[end] = nx
        queue2[end + 1] = ny
        end += 2
        seen2[hash(nx, ny)] = hash(queue2[start], queue2[start + 1]) + 1
      }
    }
    start += 2
  }
  if (start >= end) { unreachable() }

  h = hash(xd, yd)
  queue2[0] = xd
  queue2[1] = yd
  end = 2
  while ((h = seen2[h] - 1) != hash(ox, oy)) {
    xd, yd = unhash(h)
    queue2[end] = xd
    queue2[end + 1] = yd
    end += 2
  }

  for (idx = end - 2; sint(idx) >= 0; idx -= 2) {
    dx = queue2[idx]
    dy = queue2[idx + 1]
    if (dx < x) { alwaysStep(3) }
    else if (dx > x) { alwaysStep(4) }
    else if (dy > y) { alwaysStep(2) }
    else if (dy < y) { alwaysStep(1) }
    else { unreachable() }
    h = hash(dx, dy)
  }
}

fn solve()(start: u32, tmp: s32, tmp2: s32, ox: s32, oy: s32) -> s32, s32 {
  parse()
  x = 0
  y = 0
  ip = 0
  rel = 0
  end = 0
  memory.clear(seen)

  poke(0)
  while (start < end) {
    moveTo(queue[start], queue[start + 1])
    tmp, tmp2 = poke(i32.load8_u(queue, start + 2))
    if (tmp != 0) { ox = tmp; oy = tmp2 }
    start += 3
  }
  return ox, oy
}

export fn part1()(x: s32, y: s32, start: u32, end: u32, nx: s32, ny: s32, s: u32, dist: u32) -> u32 {
  x, y = solve()
  memory.clear(seen3)
  queue[0] = x
  queue[1] = y
  i32.store8(queue, 2, 0)
  end = 3

  while (start < end) {
    dist = i32.load8_u(queue, start + 2)
    if (queue[start] == 0 & queue[start + 1] == 0) { return dist }
    for (s = 0; s < 4; s++) {
      nx = queue[start] + sint(s < 2 ? 0 : 2 * (s - 2) - 1)
      ny = queue[start + 1] + sint(s >= 2 ? 0 : 2 * s - 1)
      if (seen3[hash(nx, ny)] == 0 & seen[hash(nx, ny)] == 1) {
        // add
        queue[end] = nx
        queue[end + 1] = ny
        i32.store8(queue, end + 2, dist + 1)
        end += 3
        seen3[hash(nx, ny)] = 1
      }
    }
    start += 3
  }

  unreachable()
}

export fn part2()(x: s32, y: s32, start: u32, end: u32, nx: s32, ny: s32, s: u32, dist: u32, dn: u32) -> u32 {
  x, y = solve()
  memory.clear(seen3)
  queue[0] = x
  queue[1] = y
  i32.store16(queue, 2, 0)
  end = 4

  while (start < end) {
    dn = i32.load16_u(queue, start + 2)
    if (dn > dist) { dist = dn }
    for (s = 0; s < 4; s++) {
      nx = queue[start] + sint(s < 2 ? 0 : 2 * (s - 2) - 1)
      ny = queue[start + 1] + sint(s >= 2 ? 0 : 2 * s - 1)
      if (seen3[hash(nx, ny)] == 0 & seen[hash(nx, ny)] == 1) {
        // add
        queue[end] = nx
        queue[end + 1] = ny
        i32.store16(queue, end + 2, dn + 1)
        end += 4
        seen3[hash(nx, ny)] = 1
      }
    }
    start += 4
  }

  return dist
}
`,n=a(d,{},{});async function i(e){const{module:s,memory:t}=await n;return u(e,t),s.part1()}async function o(e){const{module:s,memory:t}=await n;return u(e,t),s.part2()}const h=[i,o];export{h as default};
