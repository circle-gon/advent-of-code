import { compile } from "/emwasm.js";

function parse(input) {
  return input.split(",").map((i) => Number(i));
}

const code = `
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
`;
const compilee = compile(code, {}, {});

async function calc(input, turns) {
  const { module } = await compilee;
  const nums = parse(input);
  const view = new DataView(module.cache.buffer);
  new Uint8Array(module.cache.buffer).fill(0);
  for (const [id, num] of nums.entries()) view.setUint32(4 * num, id + 1, true);
  return module.solve(nums.length, turns - 1);
}

function part1(input) {
  return calc(input, 2020);
}

function part2(input) {
  return calc(input, 3e7);
}

export default [part1, part2];
