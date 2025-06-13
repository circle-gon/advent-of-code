import { compile } from "/emwasm.js";
import { memstr } from "/utils.js";
import intcode from "./intcode.js";

const code = `
${intcode}
export chars = memory<u8>(1)
export let maxindex = u32(0)
let index = u32(0)
let line = u32(0)
path = memory<u8>(1)
let pathLen = u32(0)
text = memory<u8>(1)
let textIdx = u32(0)
let output = u32(0)
let retval = u32(0)
let ip = u32(0)
let rel = s32(0)

fn get()() -> s64 {
  unreachable()
}

fn set(v: s64)(t: u32) -> u32 {
  if (v < 256) {
    if (index >= 2 & v == 46) {
      if (chars[index - 2] == 10 & chars[index - 1] == 10) {
        index = 0
        t = 1
      }
    }
    chars[index] = u32(v)
  } else {
    output = u32(v)
  }
  index++
  if (index > maxindex) { maxindex = index }
  if (v == 10 & line == 0) { line = index }
  return retval & (t | (index == maxindex & v == 10))
}

export fn part1()(y: u32, x: u32, align: u32) -> u32 {
  parse()
  index = 0
  line = 0
  retval = 0
  evalIntcode(0, 0, get, set)

  for (y = line; y < index - line; y += line) {
    // The very last character is the newline
    for (x = 1; x < line - 2; x++) {
      if (
        chars[y + x - 1] == 35 & chars[y + x + 1] == 35 &
        chars[y + line + x] == 35 & chars[y - line + x] == 35 &
        chars[y + x] == 35
      ) {
        align += (y / line) * x
      }
    }
  }
  return align
}

fn findRobot()(y: u32, x: u32) -> u32, u32 {
  for (y = 0; y < index; y += line) {
    // The very last character is the newline
    for (x = 0; x < line - 1; x++) {
      if (chars[y + x] == 94) {
        return x, y
      }
    }
  }
  unreachable()
}

fn computePath(x: u32, y: u32)(dir: u32, len: u32, out: u32, idx: u32, dn: u32, picked: u32) {
  while (true) {
    picked = false
    if (dir == 0 & y != 0) {
      if (chars[y - line + x] == 35) { y -= line; len++; picked = true }
    }
    else if (dir == 1 & x < line - 2) {
      if (chars[y + x + 1] == 35) { x++; len++; picked = true }
    }
    else if (dir == 2 & y < index - line) {
      if (chars[y + line + x] == 35) { y += line; len++; picked = true }
    }
    else if (dir == 3 & x != 0) {
      if (chars[y + x - 1] == 35) { x--; len++; picked = true }
    }
    if (!picked) {
      if (len != 0) { path[out] = len; len = 0; out++ }
      picked = 4
      for (idx = 1; idx <= 3; idx += 2) {
        dn = dir + idx
        if (dn >= 4) { dn -= 4 }
        if (dn == 0 & y != 0) {
          if (chars[y - line + x] == 35) { picked = dn; break }
        } else if (dn == 1 & x < line - 2) {
          if (chars[y + x + 1] == 35) { picked = dn; break }
        } else if (dn == 2 & y < index - line) {
          if (chars[y + line + x] == 35) { picked = dn; break }
        } else if (dn == 3 & x != 0) {
          if (chars[y + x - 1] == 35) { picked = dn; break }
        }
      }
      if (picked == 4) {
        pathLen = out
        return
      }
      path[out] = picked == (dir + 1) % 4
      dir = picked
      out++
    }
  }
}

fn numLen(num: u32)(count: u32) -> u32 {
  count = 1
  while (num >= 10) {
    num /= 10
    count++
  }
  return count
}

fn doesMatch(a: u32, b: u32, c: u32, d: u32)(idx: u32) -> u32 {
  for (; idx <= b - a; idx++) {
    if (path[a + idx] != path[c + idx]) { return 0 }
  }
  return 1
}

fn insertRange(a: u32, b: u32, out: u32)(idx: u32, num: u32, len: u32, jmp: u32) -> u32 {
  for (idx = a; idx <= b; idx++) {
    if (idx != a) { text[out] = 44; out++ }
    num = path[idx]
    if (num == 0) {
      text[out] = 76
    } else if (num == 1) {
      text[out] = 82 
    } else {
      len = out + numLen(num) - 1
      jmp = 0
      while (num >= 1) {
        text[len - jmp] = (num % 10) + 48
        num /= 10
        jmp++
      }
      out = len
    }
    out++
  }
  text[out] = 10 // add newline
  return out + 1
}

fn couldMatch(a: u32, b: u32, c: u32, d: u32)(
  idx: u32, r1: u32, r2: u32, out: u32, t1: u32, t2: u32
) -> u32 {
  r1 = 0
  r2 = pathLen
  idx = b + 1
  while (idx < c) {
    if (doesMatch(idx, idx + b - a, a, b)) {
      idx += b - a + 1
      if (t2 - t1 < r2 - r1 & t2 > t1) {
        r1 = t1
        r2 = t2
      }
      t1 = idx
      t2 = idx
    } else if (doesMatch(idx, idx + d - c, c, d)) {
      idx += d - c + 1
      if (t2 - t1 < r2 - r1 & t2 > t1) {
        r1 = t1
        r2 = t2
      }
      t1 = idx
      t2 = idx
    } else {
      t2 = idx
      idx++
    }
  }

  idx = 0
  while (idx < pathLen) {
    if (doesMatch(idx, idx + b - a, a, b)) {
      if (out != 0) { text[out] = 44; out++ }
      text[out] = 65
      out++
      idx += b - a + 1
    } else if (doesMatch(idx, idx + d - c, c, d)) {
      if (out != 0) { text[out] = 44; out++ }
      text[out] = 67
      out++
      idx += d - c + 1
    } else if (doesMatch(idx, idx + r2 - r1, r1, r2)) {
      if (out != 0) { text[out] = 44; out++ }
      text[out] = 66
      out++
      idx += r2 - r1 + 1
    } else {
      return 0
    }
  }

  // Matched
  text[out] = 10 // newline
  out = insertRange(a, b, out + 1)
  out = insertRange(r1, r2, out)
  out = insertRange(c, d, out)
  text[out] = retval ? 121 : 110 // continuous video feed
  text[out + 1] = 10
  return 1
}

fn getRoutine()(idx: u32, len: u32, idx2: u32, len2: u32, a: u32, b: u32) {
  while (true) {
    if (idx != 0) {
      len++ // comma
    }
    len += numLen(path[idx])
    if (len > 20) { break }

    idx2 = pathLen - 1
    len2 = 0
    while (true) {
      if (idx2 < pathLen - 1) {
        len2++ // comma
      }
      len2 += numLen(path[idx2])
      if (len2 > 20) { break }

      if (couldMatch(0, idx, idx2, pathLen - 1)) { return }
      idx2--
    }
    idx++
  }
  unreachable()
}

fn get2()() -> s64 {
  if (textIdx == 0) {
    computePath(findRobot())
    getRoutine()
  }
  textIdx++
  return s64(text[textIdx - 1])
}

export fn run()() -> u32 {
  ip, rel = evalIntcode(ip, rel, get2, set)
  if (ip == 1347376211) { return output }
  return 1347376211
}

export fn part2(interactive: u32)() {
  parse()
  index = 0
  line = 0
  textIdx = 0
  ip = 0
  rel = 0
  maxindex = 0
  program[0] = 2
  retval = interactive
}
`;

const compilee = compile(code, {}, {});

async function part1(input) {
  const { module, memory } = await compilee;
  memstr(input, memory);
  return module.part1();
}

async function part2int(module, update) {
  const elem = document.createElement("pre");
  update([elem]);
  while (true) {
    const val = module.run();
    if (val !== 1347376211) return val;
    elem.textContent = new TextDecoder().decode(
      new Uint8Array(module.chars.buffer).subarray(0, module.maxindex.value),
    );
    elem.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    await new Promise((r) => setTimeout(r, 60));
  }
}

async function part2(input, update, _, interactive) {
  const { module, memory } = await compilee;
  memstr(input, memory);
  module.part2(interactive);
  return interactive ? part2int(module, update) : module.run();
}

export default [part1, part2];
