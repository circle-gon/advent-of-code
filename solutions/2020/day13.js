function parse(input) {
  const [time, buses] = input.split("\n");
  return [Number(time), buses.split(",")];
}

function part1(input) {
  const [time, buses] = parse(input);
  let wait = Infinity,
    mul = 0;
  for (const bus of buses) {
    if (bus === "x") continue;
    const num = Number(bus);
    const toWait = Math.ceil(time / num) * num - time;
    if (toWait < wait) {
      wait = toWait;
      mul = toWait * bus;
    }
  }
  return mul;
}

function modexp(base, exp, mod) {
  if (mod === 1n) {
    return 0n;
  }
  let r = 1n;
  base = base % mod;
  while (exp > 0) {
    if (exp % 2n === 1n) {
      r = (r * base) % mod;
    }
    base = (base * base) % mod;
    exp >>= 1n;
  }
  return r;
}

function modinverse(num, mod) {
  return modexp(num, mod - 2n, mod);
}

function part2(input) {
  const [, buses] = parse(input);
  const nums = [];
  for (let i = 0; i < buses.length; i++) {
    const bus = Number(buses[i]);
    if (!isNaN(bus)) nums.push([BigInt(bus - (i % bus)), BigInt(bus)]);
  }
  const prod = nums.reduce((a, b) => a * b[1], 1n);
  let sol = 0n;
  for (const [x, mod] of nums) {
    const except = prod / mod;
    sol += x * except * modinverse(except, mod);
  }
  return Number(sol % prod);
}

export default [part1, part2];
