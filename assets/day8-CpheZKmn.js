import{c as n}from"./emwasm-CgbW5bdp.js";import{m as o}from"./index-Cn1uEpnO.js";const m=`
input = import js.raw(memory<u8>(1))
boxes = memory<u32>(1)
let count = u32(0)
dsu = memory<u16>(1)
mergeorder = memory(100)
let mergelen = u32(0)

fn parse()(idx: u32, outIdx: u32, num: u32) {
  while (input[idx] != 0) {
    if (input[idx] == 44 | input[idx] == 10) {
      if (num != 0) {
        boxes[outIdx] = num
        num = 0
        outIdx++
      }
    } else {
      num = 10 * num + input[idx] - 48  
    }
    idx++
  }
  boxes[outIdx] = num
  count = (outIdx + 1) / 3
}

fn initdsu()(i: u32) {
  for (; i < count; i++) {
    dsu[2 * i] = i
    dsu[2 * i + 1] = 1
  }
}

fn find(x: u32)() -> u32 {
  if (dsu[2 * x] != x) {
    dsu[2 * x] = find(dsu[2 * x])
    return dsu[2 * x]
  }
  return x
}

fn union(x: u32, y: u32)(temp: u32) {
  x = find(x)
  y = find(y)

  if (x == y) { return }

  if (dsu[2 * x + 1] < dsu[2 * y + 1]) {
    temp = x
    x = y
    y = temp
  }

  dsu[2 * y] = x
  dsu[2 * x + 1] += dsu[2 * y + 1]
}

fn findmindist()(i: u32, j: u32, d1: u64, d2: u64, d3: u64, k: u32) {
  for (; i < count; i++) {
    for (j = i + 1; j < count; j++) {
      d1 = i64.extend_i32_u(abs(sint(boxes[3 * i]) - sint(boxes[3 * j])))
      d2 = i64.extend_i32_u(abs(sint(boxes[3 * i + 1]) - sint(boxes[3 * j + 1])))
      d3 = i64.extend_i32_u(abs(sint(boxes[3 * i + 2]) - sint(boxes[3 * j + 2])))
      i32.store16(mergeorder, 12 * k, i)
      i32.store16(mergeorder, 12 * k + 2, j)
      i64.store(mergeorder, 12 * k + 4, d1 * d1 + d2 * d2 + d3 * d3)
      k++
    }
  }
  mergelen = k
}

fn partition(low: u32, high: u32)(pivot: u64, a: u32, b: u32, c: u64) -> u32 {
  pivot = i64.load(mergeorder, 12 * low + 4)
  low--
  high++
  while (true) {
    do while (i64.load(mergeorder, 12 * low + 4) < pivot) { low++ }
    do while (i64.load(mergeorder, 12 * high + 4) > pivot) { high-- }
    if (low >= high) { return high }
    a = i32.load16_u(mergeorder, 12 * low)
    b = i32.load16_u(mergeorder, 12 * low + 2)
    c = i64.load(mergeorder, 12 * low + 4)
    i32.store16(mergeorder, 12 * low, i32.load16_u(mergeorder, 12 * high))
    i32.store16(mergeorder, 12 * low + 2, i32.load16_u(mergeorder, 12 * high + 2))
    i64.store(mergeorder, 12 * low + 4, i64.load(mergeorder, 12 * high + 4))
    i32.store16(mergeorder, 12 * high, a)
    i32.store16(mergeorder, 12 * high + 2, b)
    i64.store(mergeorder, 12 * high + 4, c)
  }
  unreachable()
}

fn sort2(low: u32, high: u32)(p: u32) {
  if (low >= high) { return }
  p = partition(low, high)
  sort2(low, p)
  return sort2(p + 1, high)
}

export fn part1(example: u32)(i: u32, m1: u32, m2: u32, m3: u32, s: u32) -> u32 {
  parse()
  initdsu()
  findmindist()
  sort2(0, mergelen - 1)
  for (; i < (example ? 10 : 1000); i++) {
    union(i32.load16_u(mergeorder, 12 * i), i32.load16_u(mergeorder, 12 * i + 2))
  }
  for (i = 0; i < count; i++) {
    s = dsu[2 * i + 1]
    if (s > m1) {
      m3 = m2
      m2 = m1
      m1 = s
    } else if (s > m2) {
      m3 = m2
      m2 = s 
    } else if (s > m3) {
      m3 = s  
    }
  }
  return m1 * m2 * m3
}

export fn part2()(iter: u32) -> u64 {
  parse()
  initdsu()
  findmindist()
  sort2(0, mergelen - 1)
  while (dsu[2 * find(0) + 1] < count) {
    union(i32.load16_u(mergeorder, 12 * iter), i32.load16_u(mergeorder, 12 * iter + 2))
    iter++
  }
  return i64.extend_i32_u(boxes[3 * i32.load16_u(mergeorder, 12 * iter - 12)]) *
    i64.extend_i32_u(boxes[3 * i32.load16_u(mergeorder, 12 * iter - 12 + 2)])
}
`,u=n(m,{},{});async function s(e,i,r){const{module:d,memory:t}=await u;return o(e,t),d.part1(r)}async function l(e){const{module:i,memory:r}=await u;return o(e,r),i.part2()}const g=[s,l];export{g as default};
