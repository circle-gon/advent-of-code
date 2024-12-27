function parse(input) {
  const aunts = [];
  for (const line of input.split("\n")) {
    const effline = line.replace(/Sue \d+: /, "");
    const parts = effline.split(", ");
    const mem = new Map();
    for (const part of parts) {
      const [name, num] = part.split(": ");
      mem.set(name, Number(num));
    }
    aunts.push(mem);
  }
  return aunts;
}

const WANT = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

function part1(input) {
  const aunts = parse(input);
  for (const [id, mem] of aunts.entries()) {
    let works = true;
    for (const [k, v] of mem.entries()) {
      if (WANT[k] !== v) works = false;
    }
    if (works) return id + 1;
  }
  return "Bad input";
}

function part2(input) {
  const aunts = parse(input);
  for (const [id, mem] of aunts.entries()) {
    let works = true;
    for (const [k, v] of mem.entries()) {
      if (k === "cats" || k === "trees") {
        if (v <= WANT[k]) works = false;
      } else if (k === "pomeranians" || k === "goldfish") {
        if (v >= WANT[k]) works = false;
      } else if (WANT[k] !== v) works = false;
    }
    if (works) return id + 1;
  }
  return "Bad input";
}

export default [part1, part2];
