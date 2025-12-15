import{c as r}from"./emwasm-Ctrcd4uU.js";import{m as s}from"./index-GwZZPAxQ.js";const l=`
input = import js.raw(memory<u8>(1))
nums = memory<u32>(1)
coords = memory<u32>(1)
let len = u32(0)
let xlen = u32(0)
let ylen = u32(0)
possible = memory<bool>(1)
seen = memory<bool>(1)
stack = memory<u16>(20)

fn parse()(idx: u32, outIdx: u32, num: u32) {
  while (input[idx] != 0) {
    if (input[idx] == 44 | input[idx] == 10) {
      if (num != 0) {
        nums[outIdx] = num
        outIdx++
        num = 0
      }
    } else {
      num = 10 * num + input[idx] - 48
    }
    idx++
  }
  nums[outIdx] = num
  len = (outIdx + 1) / 2
}

export fn part1()(i: u32, j: u32, area: u64, length: u64, width: u64) -> u64 {
  parse()
  for (; i < len; i++) {
    for (j = i + 1; j < len; j++) {
      length = i64.extend_i32_u(abs(sint(nums[2 * i]) - sint(nums[2 * j])) + 1)
      width = i64.extend_i32_u(abs(sint(nums[2 * i + 1]) - sint(nums[2 * j + 1])) + 1)
      if (length * width > area) { area = length * width }
    }
  }
  return area
}

fn binsearch(low: u32, high: u32, value: u32)(mid: u32) -> u32 {
  while (low <= high) {
    mid = low + (high - low) / 2
    if (value == coords[mid]) { return mid }
    if (value > coords[mid]) { low = mid + 1 }
    else { high = mid - 1 }
  }
  unreachable()
}

fn searchx(value: u32)() -> u32 {
  return binsearch(0, xlen - 1, value)
}

fn searchy(value: u32)() -> u32 {
  return binsearch(xlen, xlen + ylen - 1, value) - xlen
}

fn flood(x: u32, y: u32)(len: u32) {
  stack[0] = x
  stack[1] = y
  len = 1
  while (len != 0) {
    len--
    x = stack[2 * len]
    y = stack[2 * len + 1]

    if (possible[y * (2 * xlen - 1) + x]) { continue }
    possible[y * (2 * xlen - 1) + x] = true
    stack[2 * len] = x - 1
    stack[2 * len + 1] = y
    stack[2 * len + 2] = x + 1
    stack[2 * len + 3] = y
    stack[2 * len + 4] = x
    stack[2 * len + 5] = y - 1
    stack[2 * len + 6] = x
    stack[2 * len + 7] = y + 1
    len += 4
  }
}

fn floodZero(x: u32, y: u32)(len: u32) -> u32 {
  stack[0] = x
  stack[1] = y
  len = 1
  while (len != 0) {
    len--
    x = stack[2 * len]
    y = stack[2 * len + 1]

    if (possible[y * (2 * xlen - 1) + x] | seen[y * (2 * xlen - 1) + x]) { continue }
    if (x == 0 | y == 0 | x == 2 * xlen - 1 | y == 2 * ylen - 1) { return true }
    seen[y * (2 * xlen - 1) + x] = true
    stack[2 * len] = x - 1
    stack[2 * len + 1] = y
    stack[2 * len + 2] = x + 1
    stack[2 * len + 3] = y
    stack[2 * len + 4] = x
    stack[2 * len + 5] = y - 1
    stack[2 * len + 6] = x
    stack[2 * len + 7] = y + 1
    len += 4
  }
  return false
}

fn min(a: u32, b: u32)() -> u32 {
  return a > b ? b : a
}

fn max(a: u32, b: u32)() -> u32 {
  return a < b ? b : a
}

fn isValid(x1: u32, y1: u32, x2: u32, y2: u32)(x: u32, y: u32) -> u32 {
  // This is not true in the general case but apparently it works for the inputs
  for (x = min(x1, x2); x <= max(x1, x2); x++) {
    if (!possible[y1 * (2 * xlen - 1) + x]) { return false }
  }
  for (x = min(x1, x2); x <= max(x1, x2); x++) {
    if (!possible[y2 * (2 * xlen - 1) + x]) { return false }
  }
  for (y = min(y1, y2); y <= max(y1, y2); y++) {
    if (!possible[y * (2 * xlen - 1) + x1]) { return false }
  }
  for (y = min(y1, y2); y <= max(y1, y2); y++) {
    if (!possible[y * (2 * xlen - 1) + x2]) { return false }
  }
  return true
}

fn insertionsort(start: u32, length: u32)(i: u32, j: u32, temp: u32) {
  i = 1
  while (i < length) {
    j = start + i
    while (coords[j - 1] > coords[j]) {
      temp = coords[j - 1]
      coords[j - 1] = coords[j]
      coords[j] = temp
      j--
      if (j == start) { break }
    }
    i++
  }
}

fn sort()(outPos: u32, i: u32) {
  insertionsort(0, len)
  insertionsort(len, len)
  for (i = 1; i < len; i++) {
    if (coords[i] != coords[outPos]) {
      outPos++
      coords[outPos] = coords[i]
    }
  }
  outPos++
  xlen = outPos
  coords[outPos] = coords[len]
  for (i = len + 1; i < 2 * len; i++) {
    if (coords[i] != coords[outPos]) {
      outPos++
      coords[outPos] = coords[i]
    }
  }
  ylen = outPos + 1 - xlen
}

export fn part2()(i: u32, x1: u32, y1: u32, x2: u32, y2: u32, j: u32, k: u32, length: u64, width: u64, area: u64) -> u64 {
  parse()
  for (; i < len; i++) {
    coords[i] = nums[2 * i]
    coords[len + i] = nums[2 * i + 1]
  }
  sort()
  memory.clear(possible)
  for (i = 1; i <= len; i++) {
    x1 = 2 * searchx(nums[2 * i - 2])
    y1 = 2 * searchy(nums[2 * i - 1])
    x2 = 2 * searchx(nums[2 * (i % len)])
    y2 = 2 * searchy(nums[2 * (i % len) + 1])
    for (j = min(x1, x2); j <= max(x1, x2); j++) {
      for (k = min(y1, y2); k <= max(y1, y2); k++) {
        possible[k * (2 * xlen - 1) + j] = true
      }
    }
  }
  for (i = 0; i < 2 * xlen - 1; i++) top {
    for (j = 0; j < 2 * ylen - 1; j++) {
      memory.clear(seen)
      if (!possible[j * (2 * xlen - 1) + i] & !floodZero(i, j)) {
        flood(i, j)
        break top
      }
    }
  }
  for (i = 0; i < len; i++) {
    for (j = i + 1; j < len; j++) {
      x1 = nums[2 * i]
      y1 = nums[2 * i + 1]
      x2 = nums[2 * j]
      y2 = nums[2 * j + 1]
      if (isValid(2 * searchx(x1), 2 * searchy(y1), 2 * searchx(x2), 2 * searchy(y2))) {
        length = i64.extend_i32_u(abs(sint(x1) - sint(x2)) + 1)
        width = i64.extend_i32_u(abs(sint(y1) - sint(y2)) + 1)
        if (length * width > area) { area = length * width }
      }
    }
  }
  return area
}
`,o=r(l,{},{});async function a(e,i,n){const{module:t,memory:u}=await o;return s(e,u),t.part1(n)}async function x(e){const{module:i,memory:n}=await o;return s(e,n),i.part2()}const c=[a,x];export{c as default};
