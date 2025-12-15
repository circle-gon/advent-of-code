import{c as d}from"./emwasm-Ctrcd4uU.js";import"./index-GwZZPAxQ.js";function i(e){return e.split(",").map(r=>Number(r))}const o=`
export cache = memory<u32>(200)
cache2 = memory<u32>(400)
let max = u32(0)
const size = u32(3e6)

fn hash(key: u32)() -> u32 {
  return key % size
}

fn get(key: u32)(idx: u32, base: u32, addr: u32) -> u32 {
  base = hash(key)
  for (; idx < size; idx++) {
    addr = 2 * ((idx + base) % size)
    if (cache2[addr] == key + 1) {
      return cache2[addr + 1]
    }
    if (cache2[addr] == 0) { return 0 }
  }
  unreachable()
}

fn set(key: u32, val: u32)(idx: u32, base: u32, addr: u32) {
  base = hash(key)
  for (; idx < size; idx++) {
    addr = 2 * ((idx + base) % size)
    if (cache2[addr] == key + 1) {
      cache2[addr + 1] = val
      return
    }
    if (cache2[addr] == 0) {
      cache2[addr] = key + 1
      cache2[addr + 1] = val
      return
    }
  }
  unreachable()
}

fn getc(key: u32)() -> u32 {
  if (key < max) { return cache[key] }
  return get(key)
}

fn setc(key: u32, val: u32)() {
  if (key < max) { cache[key] = val }
  else { set(key, val) }
}

export fn solve(turn: u32, reqTurns: u32)(next: u32, last: u32) -> u32 {
  memory.clear(cache2)
  max = (reqTurns + 1) / 10
  do while (turn < reqTurns) {
    last = getc(next)
    last = last == 0 ? turn : last - 1
    setc(next, turn + 1)
    next = turn - last
    turn++
  }
  return next
}
`,l=d(o,{},{});async function u(e,r){const{module:a}=await l,t=i(e),n=new DataView(a.cache.buffer);new Uint8Array(a.cache.buffer).fill(0);for(const[c,s]of t.entries())n.setUint32(4*s,c+1,!0);return a.solve(t.length,r-1)}function f(e){return u(e,2020)}function h(e){return u(e,3e7)}const x=[f,h];export{x as default};
