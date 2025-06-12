import { compile } from "/emwasm.js";
import { memstr } from "/utils.js";

const code = `
input = import js.raw(memory<u8>(1))
seen = memory<u8>(1)
queue = memory<u32>(20)
let len = u32(0)
dist = memory<u32>(1)
wires = memory(10)
const size = u32(50000)
robots = memory<u32>(1)
let heapsize = u32(0)

fn isDoor(v: u32)() -> u32 {
  return v >= 65 & v <= 90
}

fn isKey(v: u32)() -> u32 {
  return v >= 97 & v <= 122
}

fn parse()(idx: u32, val: u32) {
  len = 0
  for (; idx < memory.byteSize(input); idx++) {
    val = input[idx]
    if (val == 10 & len == 0) { len = idx + 1 }
    else if (val == 0) {
      // Lazy fix until I can figure out why this is needed
      memory.fill(input, idx, 0, memory.byteSize(input) - idx)
    }
  }
  if (len == 0) { unreachable() }
}

fn bfs(x: u32, y: u32, k: u32)(
  start: u32, end: u32, s: u32, nx: u32, ny: u32, key: u32, in: u32,
  bmask: u32
) -> u32 {
  memory.fill(seen, 0, 0, memory.byteSize(seen))
  queue[0] = x
  queue[1] = y
  queue[2] = 0
  queue[3] = 0
  seen[y * len + x] = 1
  end += 4 // x, y, distance, and keys required
  while (start < end) {
    for (s = 0; s < 4; s++) {
      nx = queue[start] + (s < 2 ? 0 : 2 * (s - 2) - 1)
      ny = queue[start + 1] + (s >= 2 ? 0 : 2 * s - 1)
      if (seen[ny * len + nx] == 1) { continue }
      seen[ny * len + nx] = 1
      in = input[ny * len + nx]
      if (isDoor(in)) {
        queue[end] = nx
        queue[end + 1] = ny
        queue[end + 2] = queue[start + 2] + 1
        queue[end + 3] = queue[start + 3] | (1 << (in - 65))
        end += 4
      } else if (isKey(in)) {
        bmask |= 1 << (in - 97)
        key = (k * 26 + in - 97) * 2
        dist[key] = queue[start + 2] + 1
        dist[key + 1] = queue[start + 3]
        // Keep going
        queue[end] = nx
        queue[end + 1] = ny
        queue[end + 2] = queue[start + 2] + 1
        queue[end + 3] = queue[start + 3]
        end += 4
      } else if (in != 35) {
        queue[end] = nx
        queue[end + 1] = ny
        queue[end + 2] = queue[start + 2] + 1
        queue[end + 3] = queue[start + 3]
        end += 4
      }
    }
    start += 4
  }
  return bmask
}

fn gkey(node: u32, map: u32)() -> u32 {
  return (map << 5) | node
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

fn cmp(a: u32, b: u32)() -> u32 {
  return queue[3 * a + 1] > queue[3 * b + 1]
}

fn hlc(idx: u32)() -> u32 {
  return (idx * 2 + 1) < heapsize
}

fn hrc(idx: u32)() -> u32 {
  return (idx * 2 + 2) < heapsize
}

fn sswap(pi: u32, ci: u32)() -> u32 {
  if (pi >= heapsize | ci >= heapsize) { return false }
  return cmp(pi, ci)
}

fn swap(a: u32, b: u32)(t1: u32, t2: u32, t3: u32) {
  t1 = queue[3 * a]
  t2 = queue[3 * a + 1]
  t3 = queue[3 * a + 2]
  memory.copy(queue, queue, a * 12, b * 12, 12)
  queue[3 * b] = t1
  queue[3 * b + 1] = t2
  queue[3 * b + 2] = t3
}

fn compare(idx: u32)(lc: u32, rc: u32) -> u32 {
  if (!hlc(idx) & !hrc(idx)) { return heapsize }
  lc = idx * 2 + 1
  rc = idx * 2 + 2
  if (!hlc(idx)) { return rc }
  if (!hrc(idx)) { return lc }
  return cmp(lc, rc) ? rc : lc
}

fn popTop()(pi: u32, ci: u32) {
  heapsize--
  memory.copy(queue, queue, 0, heapsize * 12, 12)
  ci = compare(pi)

  while (sswap(pi, ci)) {
    swap(pi, ci)
    pi = ci
    ci = compare(pi)
  }
}

fn push()(pi: u32, ci: u32) {
  ci = heapsize
  pi = (ci - 1) / 2
  heapsize++

  while (sswap(pi, ci)) {
    swap(pi, ci)
    ci = pi
    pi = (ci - 1) / 2
  }
}

fn dijkstra(target: u32, keystart: u32, begin: u32)(
  base: u32, k: u32, bitmask: u32, bitmask2: u32, bkey: u32, bm: u32, tdist: u32
) -> u32 {
  memory.fill(queue, 0, 0, memory.byteSize(queue))
  memory.fill(wires, 0, 0, memory.byteSize(wires))
  heapsize = 0
  for (; base < 26; base++) {
    k = (begin * 26 + base) * 2
    if (dist[k] != 0 & (keystart & dist[k + 1]) == dist[k + 1]) {
      queue[heapsize * 3] = base + 1
      queue[heapsize * 3 + 1] = dist[k]
      queue[heapsize * 3 + 2] = (1 << base) | keystart
      push()
    }
  }
  while (heapsize != 0) {
    bkey = queue[0] - 1
    bitmask = queue[2]
    tdist = queue[1]
    popTop()
    if (bitmask == target) { return tdist }
    for (base = 0; base < 26; base++) {
      k = (bkey * 26 + base) * 2
      if (dist[k] == 0 | (bitmask & dist[k + 1]) != dist[k + 1]) { continue }
      bitmask2 = bitmask | (1 << base)
      if (bitmask == bitmask2) { continue }
      bm = get(gkey(base, bitmask2))
      if ((tdist + dist[k]) < bm | bm == 0) {
        set(gkey(base, bitmask2), tdist + dist[k])
        queue[heapsize * 3] = base + 1
        queue[heapsize * 3 + 1] = tdist + dist[k]
        queue[heapsize * 3 + 2] = bitmask2
        push()
      }
    }
  }
  unreachable()
}

export fn part1()(x: u32, y: u32, target: u32) -> u32 {
  memory.fill(dist, 0, 0, memory.byteSize(dist))
  parse()
  while (true) {
    // The last character is a newline
    if (input[y * len] == 0) { break }
    for (x = 0; x < len - 1; x++) {
      if (isKey(input[y * len + x])) {
        bfs(x, y, input[y * len + x] - 97)
      } else if (input[y * len + x] == 64) {
        // @, 26 is the maximum number of possible grid keys
        target = bfs(x, y, 26)
      }
    }
    y++
  }
  return dijkstra(target, 0, 26)
}

export fn part2()(x: u32, y: u32, a: u32, j: u32, out: u32, r: u32) -> u32 {
  memory.fill(dist, 0, 0, memory.byteSize(dist))
  parse()

  while (true) t {
    for (x = 0; x < len - 1; x++) {
      if (input[y * len + x] == 64) {
        // Split
        input[(y - 1) * len + (x - 1)] = 64
        input[(y - 1) * len + (x + 1)] = 64
        input[(y + 1) * len + (x - 1)] = 64
        input[(y + 1) * len + (x + 1)] = 64
        input[(y - 1) * len + x] = 35
        input[(y + 1) * len + x] = 35
        input[y * len + (x - 1)] = 35
        input[y * len + (x + 1)] = 35
        input[y * len + x] = 35
        break t
      }
    }
    y++
  }

  y = 0
  while (true) {
    // The last character is a newline
    if (input[y * len] == 0) { break }
    for (x = 0; x < len - 1; x++) {
      if (isKey(input[y * len + x])) {
        bfs(x, y, input[y * len + x] - 97)
      } else if (input[y * len + x] == 64) {
        // @, 26 is the maximum number of possible grid keys
        robots[a] = bfs(x, y, 26 + a)
        a++
      }
    }
    y++
  }

  r = robots[0] | robots[1] | robots[2] | robots[3]
  for (; j < 4; j++) {
    out += dijkstra(r, r & (robots[j] ^ uint(-1)), 26 + j)
  }
  return out
}
`;

const compilee = compile(code, {}, {});

async function part1(input) {
  const { module, memory } = await compilee;
  memstr(input, memory);
  return module.part1();
}

async function part2(input) {
  const { module, memory } = await compilee;
  memstr(input, memory);
  return module.part2();
}

export default [part1, part2];
