import { spawnWorkerFor, format } from "/utils.js";

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

const reg = "abcdef";
const instructions = {
  addr: (instr) => `${reg[instr[3]]}=${reg[instr[1]]}+${reg[instr[2]]}`,
  addi: (instr) => `${reg[instr[3]]}=${reg[instr[1]]}+${instr[2]}`,
  mulr: (instr) => `${reg[instr[3]]}=${reg[instr[1]]}*${reg[instr[2]]}`,
  muli: (instr) => `${reg[instr[3]]}=${reg[instr[1]]}*${instr[2]}`,
  banr: (instr) => `${reg[instr[3]]}=${reg[instr[1]]}&${reg[instr[2]]}`,
  bani: (instr) => `${reg[instr[3]]}=${reg[instr[1]]}&${instr[2]}`,
  borr: (instr) => `${reg[instr[3]]}=${reg[instr[1]]}|${reg[instr[2]]}`,
  bori: (instr) => `${reg[instr[3]]}=${reg[instr[1]]}|${instr[2]}`,
  setr: (instr) => `${reg[instr[3]]}=${reg[instr[1]]}`,
  seti: (instr) => `${reg[instr[3]]}=${instr[1]}`,
  gtir: (instr) => `${reg[instr[3]]}=${instr[1]}>${reg[instr[2]]}?1:0`,
  gtri: (instr) => `${reg[instr[3]]}=${reg[instr[1]]}>${instr[2]}?1:0`,
  gtrr: (instr) => `${reg[instr[3]]}=${reg[instr[1]]}>${reg[instr[2]]}?1:0`,
  eqir: (instr) => `${reg[instr[3]]}=${instr[1]}===${reg[instr[2]]}?1:0`,
  eqri: (instr) => `${reg[instr[3]]}=${reg[instr[1]]}===${instr[2]}?1:0`,
  eqrr: (instr) => `${reg[instr[3]]}=${reg[instr[1]]}===${reg[instr[2]]}?1:0`,
};

function compile(input, part1) {
  const { ip, instrs } = parse(input);
  const eqstr = instrs.findIndex((i) => i[0] === "eqrr");
  const id = reg[instrs[eqstr][1]];

  const check = part1
    ? `return ${id};`
    : `if (n.has(${id}))return m;m=${id};n.add(${id});if(i++%1e3===0)self.postMessage({type:"msg",data:[echo]});`;
  const header = `let ${[...reg, ...(!part1 ? ["m", "i"] : [])]
    .map((i) => `${i}=0`)
    .join(",")};${!part1 ? "const n=new Set;" : ""}`;
  const body = instrs
    .map(
      (i, j) =>
        `case ${j}:{${instructions[i[0]](i)};${j === eqstr ? check : ""}break}`,
    )
    .join("");
  return `${header}while(${reg[ip]}>=0&&${reg[ip]}<${instrs.length}){switch(${reg[ip]}){${body}}${reg[ip]}++}`;
}

function part1(input) {
  return Function(compile(input, true))();
}

const spawnWorker = spawnWorkerFor(import.meta.resolve("./worker.js"));
function part2(input, u) {
  const code = compile(input, false);
  let i = 0;
  const update = () => {
    u(`(${format(1000 * i++)} iterations done)`);
  };
  update();

  return spawnWorker(code, 0, update);
}

export default [part1, part2];
