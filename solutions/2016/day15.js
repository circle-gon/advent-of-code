function parse(input) {
  const slots = [];
  for (const line of input.split("\n")) {
    const places = line.split(" ");
    slots.push([Number(places[3]), Number(places[11].slice(0, -1))]);
  }
  return slots;
}

function run(disks) {
  for (let i = 0; i < 5e6; i++) {
    let works = true;
    for (const [num, [pos, startPos]] of disks.entries()) {
      const at = (i + num + 1 + startPos) % pos;
      if (at !== 0) works = false;
    }
    if (works) return i;
  }
  return "What";
}

function part1(input) {
  return run(parse(input));
}

function part2(input) {
  const disks = parse(input);
  disks.push([11, 0]);
  return run(disks);
}

export default [part1, part2];
