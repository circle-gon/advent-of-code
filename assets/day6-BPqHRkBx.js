import{c as n}from"./emwasm-BAYlZ7aM.js";import{m as t}from"./index-DJW6-bui.js";const u=`
input = import js.raw(memory<u8>(1))
chain = memory<u16>(2) // Max hash code is ~46k and each element takes up 2 bytes
revChain = memory<u16>(5)
items = memory<u16>(1)
seen = memory<u8>(1)
queue = memory<u16>(1)
let size = u32(0)
let end = u32(0)
const chainCount = u32(3)

fn code(char: u32)() -> u32 {
  if (char >= 48 & char <= 57) { return char - 48 }
  if (char >= 65 & char <= 90) { return char - 55 }
  unreachable()
}

fn inRange(char: u32)() -> u32 {
  return (char >= 48 & char <= 57) | (char >= 65 & char <= 90)
}

fn addc(idx: u32, val: u32)(i: u32) {
  for (; i < chainCount; i++) {
    if (revChain[chainCount * idx + i] == 0) {
      revChain[chainCount * idx + i] = val
      return
    }
  }
  unreachable()
}

fn parse()(idx: u32, outIdx: u32, accum: u32, pair1: u32, itemIdx: u32) {
  while (input[idx] != 0) {
    if (inRange(input[idx])) {
      accum = 36 * accum + code(input[idx])
    } else if (input[idx] == 41) {
      pair1 = accum
      accum = 0
    } else {
      chain[accum] = pair1
      addc(pair1, accum)
      items[itemIdx] = accum
      accum = 0
      itemIdx++
    }
    idx++
  }
  if (accum != 0) {
    chain[accum] = pair1
    addc(pair1, accum)
    items[itemIdx] = accum
    itemIdx++
  }
  size = itemIdx
}

export fn part1()(idx: u32, count: u32, item: u32) -> u32 {
  memory.fill(chain, 0, 0, memory.byteSize(chain))
  memory.fill(revChain, 0, 0, memory.byteSize(revChain))
  parse()
  for (; idx < size; idx++) {
    item = items[idx]
    // COM
    while (item != 16438) {
      count++
      item = chain[item]
    }
  }
  return count
}

fn add(dest: u32, dist: u32)() {
  if (seen[dest] != 0) { return }
  seen[dest] = 1
  queue[end] = dest
  queue[end + 1] = dist
  end += 2
}

export fn part2()(start: u32, dest: u32, dist: u32, iter: u32) -> u32 {
  memory.fill(chain, 0, 0, memory.byteSize(chain))
  memory.fill(revChain, 0, 0, memory.byteSize(revChain))
  memory.fill(seen, 0, 0, memory.byteSize(seen))
  end = 0
  parse()
  // YOU
  add(chain[44958], 0)
  while (start < end) {
    dest = queue[start]
    dist = queue[start + 1]
    start += 2
    // SAN
    if (dest == chain[36671]) { return dist }
    if (chain[dest] != 0) { add(chain[dest], dist + 1) }
    for (iter = 0; iter < chainCount; iter++) {
      if (revChain[dest * chainCount + iter] != 0) {
        add(revChain[dest * chainCount + iter], dist + 1)
      }
      else { break }
    }
  }
  unreachable()
}
`,r=n(u,{},{});async function c(e){const{module:i,memory:a}=await r;return t(e,a),i.part1()}async function m(e){const{module:i,memory:a}=await r;return t(e,a),i.part2()}const o=[c,m];export{o as default};
