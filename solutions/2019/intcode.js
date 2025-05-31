export default `
input = import js.raw(memory<u8>(1))
export program = memory<s64>(1)

fn inRange(m: u32)() -> u32 {
  return (m >= 48) & (m <= 57)
}

fn parse()(idx: u32, val: u32, accum: s64, outIdx: u32, neg: u32) -> u32 {
  // Outside items are supposed to be 0 so fill them in
  memory.fill(program, 0, 0, memory.byteSize(program))
  while (input[idx] != 0) {
    val = input[idx]
    if (inRange(val)) {
      accum = 10 * accum + sint(i64.extend_i32_u(val - 48))
    } else if (val == 45) {
      neg = true
    } else {
      if (neg) { program[outIdx] = 0 - accum }
      else { program[outIdx] = accum }
      accum = 0
      neg = false
      outIdx++
    }
    idx++
  }
  if (accum != 0) {
    if (neg) { program[outIdx] = 0 - accum }
    else { program[outIdx] = accum }
    outIdx++
  }
  return outIdx
}

fn exp(b: u32, e: u32)(t: u32, s: u32) -> u32 {
  t = 1
  for (; s < e; s++) { t *= b }
  return t
}

fn getMode(mode: u32, pos: u32)() -> u32 {
  return (mode / exp(10, pos)) % 10
}

fn valFromMode(val: s64, mode: u32, rel: s32)() -> s64 {
  if (mode == 1) { return val }
  if (mode == 2) { return program[uint(i32.wrap_i64(val) + rel)] }
  return program[uint(i32.wrap_i64(val))]
}

fn writeFromMode(addr: s64, val: s64, mode: u32, rel: s32)() {
  if (mode == 1) {
    unreachable()
  }
  if (mode == 2) {
    program[uint(i32.wrap_i64(addr) + rel)] = val
  } else {
    program[uint(i32.wrap_i64(addr))] = val
  }
}

fn evalIntcode(
  ip: u32,
  rel: s32,
  getInput: func<s64>(),
  getOutput: func(s64)
)(
  instr: u32,
  val1: s64,
  val2: s64,
  mode: u32,
  tmp: s64
) -> u32, s32 {
  while (true) {
    instr = i32.wrap_i64(uint(program[ip] % 100))
    mode = i32.wrap_i64(uint(program[ip] / 100))
    if (instr == 1) {
      val1 = valFromMode(program[ip + 1], getMode(mode, 0), rel)
      val2 = valFromMode(program[ip + 2], getMode(mode, 1), rel)
      writeFromMode(program[ip + 3], val1 + val2, getMode(mode, 2), rel)
      ip += 4
    } else if (instr == 2) {
      val1 = valFromMode(program[ip + 1], getMode(mode, 0), rel)
      val2 = valFromMode(program[ip + 2], getMode(mode, 1), rel)
      writeFromMode(program[ip + 3], val1 * val2, getMode(mode, 2), rel)
      ip += 4
    } else if (instr == 3) {
      tmp = getInput()
      // STOP in little-endian binary encoding
      if (tmp == 1347376211) {
        return ip, rel
      }
      writeFromMode(program[ip + 1], tmp, getMode(mode, 0), rel)
      ip += 2
    } else if (instr == 4) {
      getOutput(valFromMode(program[ip + 1], getMode(mode, 0), rel))
      ip += 2
    } else if (instr == 5) {
      if (valFromMode(program[ip + 1], getMode(mode, 0), rel) != 0) {
        ip = i32.wrap_i64(uint(valFromMode(program[ip + 2], getMode(mode, 1), rel)))
      } else {
        ip += 3
      }
    } else if (instr == 6) {
      if (valFromMode(program[ip + 1], getMode(mode, 0), rel) == 0) {
        ip = i32.wrap_i64(uint(valFromMode(program[ip + 2], getMode(mode, 1), rel)))
      } else {
        ip += 3
      }
    } else if (instr == 7) {
      writeFromMode(program[ip + 3],
        valFromMode(program[ip + 1], getMode(mode, 0), rel) < 
        valFromMode(program[ip + 2], getMode(mode, 1), rel) ? 1 : 0,
        getMode(mode, 2),
        rel)
      ip += 4
    } else if (instr == 8) {
      writeFromMode(program[ip + 3],
        valFromMode(program[ip + 1], getMode(mode, 0), rel) == 
        valFromMode(program[ip + 2], getMode(mode, 1), rel) ? 1 : 0,
        getMode(mode, 2),
        rel)
      ip += 4
    } else if (instr == 9) {
      rel += i32.wrap_i64(valFromMode(program[ip + 1], getMode(mode, 0), rel))
      ip += 2
    } else if (instr == 99) { return 1347376211, 1347376211 } // STOP
    else { unreachable() }
  }
  unreachable()
}`;
