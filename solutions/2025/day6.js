import { compile } from "/emwasm.js";
import { memstr } from "/utils.js";

const code = `
input = import js.raw(memory<u8>(1))
data = memory<u16>(1)
let width = u32(0)
let strwidth = u32(0)
let height = u32(0)

fn parse()(idx: u32, outIdx: u32, num: u32) {
  width = 0
  height = 0
  while (input[idx] != 42 & input[idx] != 43) {
    if (input[idx] != 10 & input[idx] != 32) {
      num = 10 * num + input[idx] - 48
    } else if (num != 0) {
      data[outIdx] = num
      outIdx++
      num = 0
    }
    if (input[idx] == 10) {
      if (width == 0) {
        width = outIdx
      }
      height++
    }
    idx++
  }

  while (input[idx] != 0) {
    if (input[idx] != 32) {
      data[outIdx] = input[idx] == 42
      outIdx++
    }
    idx++
  }
}

fn parse2()(idx: u32, outIdx: u32, num: u32, hasDigit: u32, i: u32, j: u32, height: u32) {
  width = 0
  while (input[idx] != 42 & input[idx] != 43) {
    if (input[idx] != 10 & input[idx] != 32) {
      hasDigit = true
    } else if (hasDigit) {
      outIdx++
      hasDigit = false
    }
    if (input[idx] == 10) {
      if (width == 0) {
        width = outIdx
        strwidth = idx + 1
      }
      height++
    }
    idx++
  }

  outIdx = 0
  while (input[idx] != 0) {
    if (input[idx] != 32) {
      data[strwidth + outIdx] = input[idx] == 42
      outIdx++
    }
    idx++
  }

  for (; i < strwidth - 1; i++) {
    num = 0
    for (j = 0; j < height; j++) {
      if (input[j * strwidth + i] != 32) {
        num = 10 * num + input[j * strwidth + i] - 48
      }
    }
    data[i] = num
  }
  data[strwidth - 1] = 0
}

export fn part1()(sum: u64, i: u32, j: u32, total: u64, op: u32) -> u64 {
  parse()
  for (; i < width; i++) {
    op = data[width * height + i]
    total = op == 1 ? 1 : 0
    for (j = 0; j < height; j++) {
      if (op == 1) {
        total *= i64.extend_i32_u(data[width * j + i])
      } else {
        total += i64.extend_i32_u(data[width * j + i])
      }
    }
    sum += total
  }
  return sum
}

export fn part2()(idx: u32, oidx: u32, sum: u64, total: u64, op: u32, num: u32) -> u64 {
  parse2()
  op = data[strwidth]
  total = op == 1 ? 1 : 0
  while (idx < width) {
    num = data[oidx]
    if (num == 0) {
      sum += total
      idx++
      op = data[strwidth + idx]
      total = op == 1 ? 1 : 0
    } else if (op == 1) {
      total *= i64.extend_i32_u(num)
    } else {
      total += i64.extend_i32_u(num)
    }
    oidx++
  }
  return sum
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
