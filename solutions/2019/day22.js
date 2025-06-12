import { compile } from "/emwasm.js";
import { memstr } from "/utils.js";

const code = `
input = import js.raw(memory<u8>(1))
instrs = memory<s16>(1)

fn parse()(idx: u32, outIdx: u32, accum: u32, neg: u32) {
  while (true) {
    if (input[idx] == 99) { // c
      idx += 4
      accum = 0
      neg = false
      while (input[idx] != 10 & input[idx] != 0) { // newline
        if (input[idx] == 45) { // -
          neg = true
        } else {
          accum = 10 * accum + input[idx] - 48 
        }
        idx++
      }
      instrs[outIdx] = 0
      instrs[outIdx + 1] = sint(neg ? -accum : accum)
      outIdx += 2
      if (input[idx] == 10) { idx++ }
    } else if (input[idx] == 100) { // d
      idx += 5
      if (input[idx] == 119) { // w
        idx += 15
        accum = 0
        while (input[idx] != 10 & input[idx] != 0) { // newline
          accum = 10 * accum + input[idx] - 48   
          idx++
        }
        instrs[outIdx] = 1
        instrs[outIdx + 1] = sint(accum)
        outIdx += 2
        if (input[idx] == 10) { idx++ }
      } else {
        idx += 14
        instrs[outIdx] = 2
        outIdx += 2
        if (input[idx] == 10) { idx++ }
      }
    } else if (input[idx] == 0) { break }
    else { unreachable() }
  }
  instrs[outIdx] = 3
}

// This computes the result (a * b) % c without causing 64bit integer overflow
// From https://en.wikipedia.org/wiki/Ancient_Egyptian_multiplication
fn mulmod(a: u64, b: u64, c: u64)(r: u64) -> u64 {
  while (b != 0) {
    if ((b & 1) == 1) {
      r = (r + a) % c
    }
    a = (a << 1) % c
    b >>= 1
  }
  return r
}

/*
#include <stdint.h>

uint64_t mulmod_barrett(uint64_t a, uint64_t b, uint64_t m, uint64_t m_inv) {
    // Break a and b into 32-bit halves
    uint64_t a_hi = a >> 32, a_lo = a & 0xFFFFFFFF;
    uint64_t b_hi = b >> 32, b_lo = b & 0xFFFFFFFF;

    // Compute full 128-bit product manually
    uint64_t p0 = a_lo * b_lo;              // low * low
    uint64_t p1 = a_lo * b_hi;              // low * high
    uint64_t p2 = a_hi * b_lo;              // high * low
    uint64_t p3 = a_hi * b_hi;              // high * high

    // Combine to form full 128-bit product
    uint64_t mid1 = p1 + (p0 >> 32);
    uint64_t mid2 = p2 + (mid1 & 0xFFFFFFFF);
    uint64_t hi = p3 + (mid1 >> 32) + (mid2 >> 32);
    uint64_t lo = (mid2 << 32) | (p0 & 0xFFFFFFFF);

    // Now we have a 128-bit result as hi:lo

    // Estimate q = (hi * m_inv) >> 32 (Barrett approximation)
    // m_inv ≈ floor(2^64 / m)
    uint64_t q = (hi * m_inv);

    // q * m may overflow, so we do full reduction carefully
    uint64_t r = lo - q * m;
    if (r >= m) r -= m;
    if ((int64_t)r < 0) r += m;

    return r;
}
*/

// Modular exponentiation algorithm from https://en.wikipedia.org/wiki/Modular_exponentiation#Pseudocode
fn modexp(base: u64, exp: u64, mod: u64)(r: u64) -> u64 {
  if (mod == 1) { return 0 }
  r = 1
  base = base % mod
  while (exp != 0) {
    if ((exp & 1) == 1) {
      r = mulmod(r, base, mod)
    }
    base = mulmod(base, base, mod)
    exp >>= 1
  }
  return r
}

fn inv(n: u64, mod: u64)() -> u64 {
  return modexp(n, mod - 2, mod)
}

fn solve(count: u64, ccount: u64)(offset: u64, increment: u64, idx: u32, v: u64, dincrement: u64) -> u64, u64 {
  parse()
  increment = 1
  while (true) {
    if (instrs[idx] == 0) {
      v = i64.extend_i32_s(instrs[idx + 1])
      offset = (offset + mulmod(increment, sint(v) < 0 ? v + ccount : v, ccount)) % ccount
    } else if (instrs[idx] == 1) {
      increment = mulmod(increment, inv(i64.extend_i32_u(instrs[idx + 1]), ccount), ccount)
    } else if (instrs[idx] == 2) {
      increment = ccount - increment
      offset = (offset + increment) % ccount
    } else if (instrs[idx] == 3) { break }
    else { unreachable() }
    idx += 2
  }
  dincrement = modexp(increment, count, ccount)
  offset = mulmod(offset, mulmod(dincrement - 1, inv(increment - 1, ccount), ccount), ccount)
  return offset, dincrement
}

export fn part1()(a: u64, b: u64, c: u32) -> u32 {
  a, b = solve(1, 10007)
  for (; c < 10007; c++) {
    if (a == 2019) { return c }
    a = (a + b) % 10007
  }
  unreachable()
}

export fn part2()(a: u64, b: u64) -> u64 {
  a, b = solve(101741582076661, 119315717514047)
  return (a + 2020 * b) % 119315717514047
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
