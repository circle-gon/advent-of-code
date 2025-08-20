import{c as a}from"./emwasm-b25LuFOt.js";import{m as r}from"./index-DQLiBMR0.js";const u=`
input = import js.raw(memory<u8>(1))
reactions = memory<u8>(1)
items = memory<u64>(1)
items2 = memory<f64>(1)
stack = memory<u8>(1)
keys = memory<u32>(1)

fn getKey(key: u32)(idx: u32) -> u32 {
  // 1-byte keys
  for (; idx < 256; idx++) {
    if (keys[idx] == key) { return idx }
    if (keys[idx] == 0) {
      keys[idx] = key
      return idx
    }
  }
  unreachable()
}

fn parse()(idx: u32, outIdx: u32, tidx: u32, accum: u32, addr: u32, addr2: u32) {
  while (input[idx] != 0) {
    tidx = idx
    while (input[tidx] != 62) { tidx++ }
    tidx += 2
    while (input[tidx] != 32) {
      accum = 10 * accum + (input[tidx] - 48)
      tidx++
    }
    tidx++
    while (input[tidx] != 10 & input[tidx] != 0) {
      addr = 27 * addr + (input[tidx] - 64)
      tidx++
    }

    if (input[tidx] == 10) { tidx++ }

    // each reaction has at most 10 components and 1 number to represent the output
    // each component has two numbers (quantity and type), so there are 21 numbers total
    addr = getKey(addr) * 21
    reactions[addr] = accum
    accum = 0
    addr++

    while (input[idx] != 62) {
      while (input[idx] != 32) {
        accum = 10 * accum + (input[idx] - 48)
        idx++
      }
      idx++
      while (input[idx] != 44 & input[idx] != 32) {
        addr2 = 27 * addr2 + (input[idx] - 64)
        idx++
      }

      reactions[addr] = accum
      reactions[addr + 1] = getKey(addr2)
      addr += 2
      accum = 0
      addr2 = 0
      idx += 2
    }

    idx = tidx
    addr = 0
  }
}

fn computeReq(count: u64)(
  height: u32, top: u32, amt: u64, addr: u32, req: u64, idx: u32, base: u64,
  fuel: u32, ore: u32
) -> u64 {
  memory.clear(items)
  fuel = getKey(133554) // FUEL
  ore = getKey(11426) // ORE

  stack[0] = fuel
  items[2 * fuel] = count
  items[2 * fuel + 1] = 0
  height++
  
  while (height != 0) {
    top = stack[height - 1]
    height--
    amt = items[top * 2] - items[top * 2 + 1]
    if (sint(amt) <= 0 | top == ore) { continue }
    addr = top * 21
    base = i64(reactions[addr])
    req = (amt + base - 1) / base
    for (idx = 1; idx < 21; idx += 2) {
      items[reactions[addr + idx + 1] * 2] += i64(reactions[addr + idx]) * req
      stack[height] = reactions[addr + idx + 1]
      height++
    }
    items[top * 2 + 1] += req * base
  }
  return items[ore * 2]
}

export fn part1()() -> u32 {
  memory.clear(reactions)
  parse()
  return i32(computeReq(1))
}

export fn part2()(low: u64, high: u64, mid: u64) -> u32 {
  memory.clear(reactions)
  parse()
 
  low = 1e18 / computeReq(1e6)
  high = max()

  while (low < high) {
    mid = low + (high - low + 1) / 2
    if (computeReq(mid) <= 1e12) {
      low = mid
    } else {
      high = mid - 1 
    }
  }
  return i32(low)
}

fn max()(
  height: u32, top: u32, amt: f64, addr: u32, req: f64, idx: u32,
  fuel: u32, ore: u32
) -> u64 {
  memory.clear(items2)
  fuel = getKey(133554) // FUEL
  ore = getKey(11426) // ORE

  stack[0] = fuel
  items2[fuel] = 1
  height++
  
  while (height != 0) {
    top = stack[height - 1]
    height--
    amt = items2[top]
    if (amt <= 0 | top == ore) { continue }
    addr = top * 21
    req = amt / f64.convert_i32_u(reactions[addr])
    for (idx = 1; idx < 21; idx += 2) {
      items2[reactions[addr + idx + 1]] += f64.convert_i32_u(reactions[addr + idx]) * req
      stack[height] = reactions[addr + idx + 1]
      height++
    }
    items2[top] = 0
  }
  return i64.trunc_f64_u(generic.floor(1e12 / items2[ore]))
}
`,d=a(u,{},{});async function o(e){const{module:t,memory:i}=await d;return r(e,i),t.part1()}async function m(e){const{module:t,memory:i}=await d;return r(e,i),t.part2()}const s=[o,m];export{s as default};
