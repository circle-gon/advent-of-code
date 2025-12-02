function parse(input) {
  const instrs = [];
  for (const line of input.split("\n")) {
    const [left, right] = line.split(" = ");
    if (left === "mask")
      instrs.push([
        "mask",
        right.split("").map((i) => (i === "X" ? "X" : Number(i))),
      ]);
    else {
      const addr = Number(left.slice(4, -1));
      instrs.push(["mem", addr, Number(right)]);
    }
  }
  return instrs;
}

function toRaw(num, mask) {
  let out = 0n;
  for (let i = 0; i < 36; i++) {
    const addr = mask[35 - i];
    const val = addr === "X" ? num & 1 : addr;
    out |= BigInt(val) << BigInt(i);
    num >>= 1;
  }
  return out;
}

function part1(input) {
  const instrs = parse(input);
  let mask = Array(36).fill("X");
  const values = new Map();
  for (const instr of instrs) {
    if (instr[0] === "mask") mask = instr[1];
    else values.set(instr[1], toRaw(instr[2], mask));
  }
  return [...values.values()].reduce((a, b) => a + b, 0n);
}

function getAddresses(addr, mask) {
  let resolved = 0n;
  const floats = [];
  for (let i = 0; i < 36; i++) {
    const add = mask[35 - i];
    if (add === "X") floats.push(i);

    const val = add === 1 ? 1 : add === "X" ? 0 : addr & 1;
    resolved |= BigInt(val) << BigInt(i);
    addr >>= 1;
  }

  const out = [];
  for (let i = 0; i < 1 << floats.length; i++) {
    let num = resolved;
    for (let j = 0; j < floats.length; j++) {
      const mask = 1 << j;
      if ((i & mask) === mask) num |= 1n << BigInt(floats[j]);
      // do nothing since it is already 0
    }
    out.push(num);
  }
  return out;
}

function part2(input) {
  const instrs = parse(input);
  let mask = Array(36).fill("X");
  const values = new Map();
  for (const instr of instrs) {
    if (instr[0] === "mask") mask = instr[1];
    else
      for (const addr of getAddresses(instr[1], mask))
        values.set(addr, instr[2]);
  }
  return [...values.values()].reduce((a, b) => a + b, 0);
}

export default [part1, part2];
