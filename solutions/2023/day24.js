function parse(input) {
  const hailstones = [];
  for (const line of input.split("\n")) {
    const [loc, vel] = line.split(" @ ");
    const locations = loc.split(", ").map((i) => Number(i));
    const velocities = vel.split(", ").map((i) => Number(i));

    hailstones.push([...locations, ...velocities]);
  }

  return hailstones;
}

// x: hailstone A
// y: hailstone B
// x-axis: A + Cx = E + Gy
// y-axis: B + Dx = F + Hy
function solve(a, b, c, d, e, f, g, h) {
  const x = (e * h + b * g - a * h - f * g) / (c * h - d * g);
  const y = (a * d + c * f - b * c - d * e) / (d * g - c * h);

  return [x, y];
}

function part1(input) {
  const hailstones = parse(input);

  let intersects = 0;
  for (let i = 1; i < hailstones.length; i++) {
    for (let j = 0; j < i; j++) {
      const i1 = hailstones[i],
        j1 = hailstones[j];

      const [t0, t1] = solve(
        i1[0],
        i1[1],
        i1[3],
        i1[4],
        j1[0],
        j1[1],
        j1[3],
        j1[4]
      );

      if (!Number.isFinite(t0) || !Number.isFinite(t1) || t0 <= 0 || t1 <= 0)
        continue;

      const newX = i1[0] + i1[3] * t0;
      const newY = i1[1] + i1[4] * t0;
      if (newX < 2e14 || newX > 4e14 || newY < 2e14 || newY > 4e14) continue;

      intersects++;
    }
  }

  return intersects;
}

// Makes a pair of velocities and starting positions
function pairUp(hailstones, id) {
  const velocities = new Map();
  for (const hailstone of hailstones) {
    const p = hailstone[id],
      v = hailstone[id + 3];

    if (!velocities.has(v)) velocities.set(v, []);
    velocities.get(v).push(p);
  }

  return velocities;
}

// Get the most-likely rock velocity
function rockVelocity(hailstones, id) {
  let possible = Array(2001)
    .fill()
    .map((_, i) => i - 1000);
  const velocities = pairUp(hailstones, id);

  for (const [velocity, pairs] of velocities.entries()) {
    if (pairs.length < 2) continue;

    possible = possible.filter(
      (i) => (pairs[0] - pairs[1]) % (i - velocity) === 0
    );
  }

  return possible[0];
}

// With help from https://gist.githubusercontent.com/daninoz/8bf8981766e29476b317c9b75eebe8cb/raw/e77622a278d89bb34699897837eab80fb128072f/b.js
function part2(input) {
  const hailstones = parse(input);

  const rvx = rockVelocity(hailstones, 0);
  const rvy = rockVelocity(hailstones, 1);
  const rvz = rockVelocity(hailstones, 2);

  const results = new Map();
  for (let i = 0; i < hailstones.length; i++) {
    for (let j = 0; j < i; j++) {
      const stoneA = hailstones[i];
      const stoneB = hailstones[j];

      const ma = (stoneA[4] - rvy) / (stoneA[3] - rvx);
      const mb = (stoneB[4] - rvy) / (stoneB[3] - rvx);

      const ca = stoneA[1] - ma * stoneA[0];
      const cb = stoneB[1] - mb * stoneB[0];

      const rpx = Math.floor((cb - ca) / (ma - mb));
      const rpy = Math.floor(ma * rpx + ca);

      const time = Math.round((rpx - stoneA[0]) / (stoneA[3] - rvx));
      const rpz = stoneA[2] + (stoneA[5] - rvz) * time;

      const result = rpx + rpy + rpz;
      results.set(result, (results.get(result) ?? 0) + 1);
    }
  }

  return [...results.entries()].sort((a, b) => b[1] - a[1])[0][0];
}

export default [part1, part2]