import{c as i}from"./emwasm-DmxTmHdw.js";import{m as u}from"./index-C_urV7hb.js";const a=`
input = import js.raw(memory<u8>(1))
portals = memory<u8>(1)
queue = memory<u16>(70)
seen = memory<bool>(5)
let len = u32(0)

fn isLetter(v: u32)() -> u32 {
  return v >= 65 & v <= 90
}

fn getPortals()(
  r: u32, x: u32, y: u32, s: u32, ix: s32, iy: s32, nx: u32, ny: u32,
  hash: u32
) {
  len = 0
  for (; r < memory.byteSize(input); r++) {
    if (input[r] == 10 & len == 0) { len = r + 1 }
    else if (input[r] == 0) {
      memory.fill(input, r, 0, memory.byteSize(input) - r)
    }
  }
  if (len == 0) { unreachable() }

  memory.clear(portals)
  while (true) {
    if (input[y * len] == 0) { break }
    for (x = 0; x < len - 1; x++) {
      if (isLetter(input[y * len + x])) {
        for (s = 0; s < 4; s++) {
          ix = sint(s < 2 ? 0 : 2 * (s - 2) - 1)
          iy = sint(s >= 2 ? 0 : 2 * s - 1)
          nx = x + uint(ix)
          ny = y + uint(iy)
          if (
            (ix < 0 & x == 0) |
            (ix > 0 & x == len - 2) |
            (iy < 0 & y == 0)
          ) { continue }
          if (iy > 0 & input[ny * len + nx] == 0) { continue }

          if (isLetter(input[ny * len + nx])) {
            if (
              (ix < 0 & nx == 0) |
              (ix > 0 & nx == len - 2) |
              (iy < 0 & ny == 0)
            ) { continue }
            if (input[(ny + uint(iy)) * len + nx + uint(ix)] != 46) { continue }

            if (ix < 0 | iy < 0) {
              hash = 6 * ((input[ny * len + nx] - 65) * 26 + input[y * len + x] - 65)
            } else {
              hash = 6 * ((input[y * len + x] - 65) * 26 + input[ny * len + nx] - 65)
            }
            if (portals[hash] != 0) { hash += 3 }
            portals[hash] = nx + uint(ix)
            portals[hash + 1] = ny + uint(iy)
            portals[hash + 2] = x != 0 & x < len - 2 & nx != 0 & nx < len - 2 & y != 0 & ny != 0
            if (portals[hash + 2]) {
              portals[hash + 2] &= input[(y + 1) * len + x] != 0 & input[(ny + 1) * len + nx] != 0 
            }
          }
        }
      }
    }

    y++
  }
}

fn bfs()(
  start: u32, end: u32, s: u32, nx: u32, ny: u32, av: u32, hash: u32,
  ix: u32, iy: u32
) -> u32 {
  memory.clear(seen)
  queue[0] = portals[0]
  queue[1] = portals[1]
  queue[2] = 0
  end += 3
  while (start < end) {
    for (s = 0; s < 4; s++) {
      ix = s < 2 ? 0 : 2 * (s - 2) - 1
      iy = s >= 2 ? 0 : 2 * s - 1
      nx = queue[start] + ix
      ny = queue[start + 1] + iy
      av = input[ny * len + nx]
      if (av == 46) {
        if (seen[ny * len + nx] == 0) {
          seen[ny * len + nx] = 1
          // Add
          queue[end] = nx
          queue[end + 1] = ny
          queue[end + 2] = queue[start + 2] + 1
          end += 3
        }
      } else if (isLetter(av)) {
        if (sint(ix) < 0 | sint(iy) < 0) {
          hash = 6 * ((input[(ny + iy) * len + nx + ix] - 65) * 26 + input[ny * len + nx] - 65)
        } else {
          hash = 6 * ((input[ny * len + nx] - 65) * 26 + input[(ny + iy) * len + nx + ix] - 65)
        }
        if (hash == 0) { continue }
        if (hash == 4050) { return queue[start + 2] }
        if (portals[hash] == queue[start] & portals[hash + 1] == queue[start + 1]) { hash += 3 }
        if (seen[portals[hash + 1] * len + portals[hash]] == 0) {
          seen[portals[hash + 1] * len + portals[hash]] = 1
          // Add
          queue[end] = portals[hash]
          queue[end + 1] = portals[hash + 1]
          queue[end + 2] = queue[start + 2] + 1
          end += 3
        }
      }
    }

    start += 3
  }
  unreachable()
}

fn bfs2()(
  start: u32, end: u32, s: u32, nx: u32, ny: u32, av: u32, hash: u32,
  ix: u32, iy: u32, d: u32
) -> u32 {
  memory.clear(seen)
  queue[0] = portals[0]
  queue[1] = portals[1]
  queue[2] = 0
  queue[3] = 0
  end += 4
  while (start < end) {
    for (s = 0; s < 4; s++) {
      ix = s < 2 ? 0 : 2 * (s - 2) - 1
      iy = s >= 2 ? 0 : 2 * s - 1
      nx = queue[start] + ix
      ny = queue[start + 1] + iy
      av = input[ny * len + nx]
      if (av == 46) {
        if (seen[(ny * len + nx) + 20000 * queue[start + 3]] == 0) {
          seen[(ny * len + nx) + 20000 * queue[start + 3]] = 1
          // Add
          queue[end] = nx
          queue[end + 1] = ny
          queue[end + 2] = queue[start + 2] + 1
          queue[end + 3] = queue[start + 3]
          end += 4
        }
      } else if (isLetter(av)) {
        if (sint(ix) < 0 | sint(iy) < 0) {
          hash = 6 * ((input[(ny + iy) * len + nx + ix] - 65) * 26 + input[ny * len + nx] - 65)
        } else {
          hash = 6 * ((input[ny * len + nx] - 65) * 26 + input[(ny + iy) * len + nx + ix] - 65)
        }
        if (hash == 0) { continue }
        if (hash == 4050) {
          if (queue[start + 3] == 0) { return queue[start + 2] }
          continue
        }
        if (portals[hash] == queue[start] & portals[hash + 1] == queue[start + 1]) { hash += 3 }
        if (queue[start + 3] == 0 & portals[hash + 2] == 1) { continue }
        d = queue[start + 3] + uint(portals[hash + 2] ? -1 : 1)
        if (seen[portals[hash + 1] * len + portals[hash] + 20000 * d] == 0) {
          seen[portals[hash + 1] * len + portals[hash] + 20000 * d] = 1
          // Add 
          queue[end] = portals[hash]
          queue[end + 1] = portals[hash + 1]
          queue[end + 2] = queue[start + 2] + 1
          queue[end + 3] = d
          end += 4
        }
      }
    }

    start += 4
  }
  unreachable()
}

export fn part1()() -> u32 {
  getPortals()
  return bfs()
}

export fn part2()() -> u32 {
  getPortals()
  return bfs2()
}
`,s=i(a,{},{});async function r(e){const{module:n,memory:t}=await s;return u(e,t),n.part1()}async function l(e){const{module:n,memory:t}=await s;return u(e,t),n.part2()}const y=[r,l];export{y as default};
