function parse(input) {
  const particles = [];
  for (const line of input.split("\n")) {
    const parts = line.split(", ");
    const each = parts.map((i) =>
      i
        .slice(3, -1)
        .split(",")
        .map((i) => Number(i))
    );
    particles.push(each);
  }
  return particles;
}

function part1(input) {
  const particles = parse(input);
  for (let i = 0; i < 1000; i++) {
    for (const particle of particles) {
      for (let i = 0; i < 3; i++) {
        particle[1][i] += particle[2][i];
        particle[0][i] += particle[1][i];
      }
    }
  }
  const times = particles.map((a, i) => [
    a[0].map((i) => Math.abs(i)).reduce((a, b) => a + b, 0),
    i,
  ]);
  return times.sort((a, b) => a[0] - b[0])[0][1];
}

function part2(input) {
  let particles = parse(input);
  for (let i = 0; i < 50; i++) {
    for (const particle of particles) {
      for (let i = 0; i < 3; i++) {
        particle[1][i] += particle[2][i];
        particle[0][i] += particle[1][i];
      }
    }

    const out = [];
    const group = Object.groupBy(particles, (a) => a[0].join(","));
    for (const value of Object.values(group))
      if (value.length === 1) out.push(value[0]);
    particles = out;
  }
  return particles.length;
}

export default [part1, part2];
