function parse(input) {
  const instrs = [];
  for (const words of input.split(",")) {
    const word = words[0];
    const rest = words.slice(1).split("/");

    if (word === "s") instrs.push([word, Number(rest[0])]);
    else if (word === "x")
      instrs.push([word, Number(rest[0]), Number(rest[1])]);
    else if (word === "p") instrs.push([word, rest[0], rest[1]]);
  }
  return instrs;
}

function runDance(dance, instrs) {
  for (const instr of instrs) {
    if (instr[0] === "s")
      dance = [...dance.slice(-instr[1]), ...dance.slice(0, -instr[1])];
    else if (instr[0] === "x")
      [dance[instr[1]], dance[instr[2]]] = [dance[instr[2]], dance[instr[1]]];
    else if (instr[0] === "p") {
      const locA = dance.indexOf(instr[1]);
      const locB = dance.indexOf(instr[2]);
      [dance[locA], dance[locB]] = [dance[locB], dance[locA]];
    }
  }
  return dance;
}

function part1(input, _, example) {
  const instrs = parse(input);
  let dance = (example ? "abcde" : "abcdefghijklmnop").split("");
  return runDance(dance, instrs).join("");
}

function hash(arr) {
  return arr.join(",");
}

function part2(input) {
  const instrs = parse(input);
  let dance = "abcdefghijklmnop".split("");
  const map = new Map();

  for (let i = 0; i < 1e9; i++) {
    dance = runDance(dance, instrs);
    const result = hash(dance);
    if (map.has(result)) {
      const loop = i - map.get(result);
      i += Math.floor((1e9 - i) / loop) * loop;
    } else map.set(result, i);
  }

  return dance.join("");
}

export default [part1, part2];
