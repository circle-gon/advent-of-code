function parse(input) {
  const lines = input.split("\n");
  const ip = Number(lines[0].slice(4));
  const instrs = lines.slice(1).map((i) => {
    const add = i.split(" ");
    return [add[0], ...add.slice(1).map((i) => Number(i))];
  });
  return {
    ip,
    instrs,
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
  const registers = [0, 0, 0, 0, 0, 0];
  const { ip, instrs } = parse(input);
  let ips = 0;
  while (ips >= 0 && ips < instrs.length) {
    registers[ip] = ips;
    const instr = instrs[ips];
    instructions[instr[0]](registers, instr);
    ips = registers[ip] + 1;
  }
  return registers[0];
}

function part2(input) {
  const { instrs } = parse(input);
  let num = 10551236 + instrs[21][2] * 22 + instrs[23][2];
  const primes = new Map();
  let prime = 2;

  while (prime ** 2 <= num) {
    let count = 0;
    while (num % prime === 0) {
      count++;
      num /= prime;
    }
    if (count > 0) primes.set(prime, count);
    prime++;
  }
  if (num > 1) primes.set(num, 1);

  let sum = 1;
  for (const [prime, count] of primes.entries()) {
    sum *= (prime ** (count + 1) - 1) / (prime - 1);
  }
  return sum;
}

export default [part1, part2];
