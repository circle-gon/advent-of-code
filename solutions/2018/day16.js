function parse(input) {
  const [info, program] = input.split("\n\n\n\n");
  const data = [];
  for (const lines of info.split("\n\n")) {
    const [before, instr, after] = lines.split("\n");
    const binf = before
      .slice(9, -1)
      .split(", ")
      .map((i) => Number(i));
    const inst = instr.split(" ").map((i) => Number(i));
    const ainf = after
      .slice(9, -1)
      .split(", ")
      .map((i) => Number(i));
    data.push({
      before: binf,
      instr: inst,
      after: ainf,
    });
  }

  return {
    data,
    program: program.split("\n").map((i) => i.split(" ").map((i) => Number(i))),
  };
}

const instructions = {
  addr: (reg, instr) => (reg[instr[3]] = reg[instr[1]] + reg[instr[2]]),
  addi: (reg, instr) => (reg[instr[3]] = reg[instr[1]] + instr[2]),
  mulr: (reg, instr) => (reg[instr[3]] = reg[instr[1]] * reg[instr[2]]),
  muli: (reg, instr) => (reg[instr[3]] = reg[instr[1]] * instr[2]),
  banr: (reg, instr) => (reg[instr[3]] = reg[instr[1]] & reg[instr[2]]),
  bani: (reg, instr) => (reg[instr[3]] = reg[instr[1]] & instr[2]),
  borr: (reg, instr) => (reg[instr[3]] = reg[instr[1]] | reg[instr[2]]),
  bori: (reg, instr) => (reg[instr[3]] = reg[instr[1]] | instr[2]),
  setr: (reg, instr) => (reg[instr[3]] = reg[instr[1]]),
  seti: (reg, instr) => (reg[instr[3]] = instr[1]),
  gtir: (reg, instr) => (reg[instr[3]] = instr[1] > reg[instr[2]] ? 1 : 0),
  gtri: (reg, instr) => (reg[instr[3]] = reg[instr[1]] > instr[2] ? 1 : 0),
  gtrr: (reg, instr) => (reg[instr[3]] = reg[instr[1]] > reg[instr[2]] ? 1 : 0),
  eqir: (reg, instr) => (reg[instr[3]] = instr[1] === reg[instr[2]] ? 1 : 0),
  eqri: (reg, instr) => (reg[instr[3]] = reg[instr[1]] === instr[2] ? 1 : 0),
  eqrr: (reg, instr) =>
    (reg[instr[3]] = reg[instr[1]] === reg[instr[2]] ? 1 : 0),
};

function part1(input) {
  const { data } = parse(input);
  let count = 0;
  for (const { before, instr, after } of data) {
    let like = 0;
    for (const func of Object.values(instructions)) {
      const nums = [...before];
      func(nums, instr);
      if (nums.every((i, j) => i === after[j])) like++;
    }
    if (like >= 3) count++;
  }
  return count;
}

function part2(input) {
  const { data, program } = parse(input);
  const all = Object.keys(instructions);
  const opcodes = Array(16)
    .fill()
    .map(() => new Set(all));
  const valid = Array(16).fill();

  for (const { before, instr, after } of data) {
    const like = new Set();
    for (const [name, func] of Object.entries(instructions)) {
      const nums = [...before];
      func(nums, instr);
      if (nums.every((i, j) => i === after[j])) like.add(name);
    }
    opcodes[instr[0]] = opcodes[instr[0]].intersection(like);
  }

  while (valid.some((i) => i === undefined)) {
    const gone = new Set();
    for (const [index, opcode] of opcodes.entries()) {
      if (opcode.size === 1) {
        const o = [...opcode][0];
        valid[index] = o;
        gone.add(o);
      }
    }
    for (const [i, opcode] of opcodes.entries())
      opcodes[i] = opcode.difference(gone);
  }

  const registers = [0, 0, 0, 0];
  for (const line of program) {
    const entry = valid[line[0]];
    instructions[entry](registers, line);
  }

  return registers[0];
}

export default [part1, part2];
