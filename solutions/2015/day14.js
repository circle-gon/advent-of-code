function parse(input) {
  const reindeer = [];
  for (const line of input.split("\n")) {
    const parts = line.split(" ");
    reindeer.push([Number(parts[3]), Number(parts[6]), Number(parts[13])]);
  }
  return reindeer;
}

function part1(input, _, example) {
  const time = example ? 1000 : 2503;
  const reindeer = parse(input);
  let max = 0;
  for (const [speed, dur, rest] of reindeer) {
    const group = dur + rest;
    const sprints = Math.floor(time / group);
    const leftover = Math.min(time - group * sprints, dur);
    max = Math.max(max, speed * (sprints * dur + leftover));
  }
  return max;
}

function part2(input, _, example) {
  const time = example ? 1000 : 2503;
  const reindeer = parse(input);
  const status = Array(reindeer.length)
    .fill()
    .map((_, i) => [0, reindeer[i][1], true, 0]);
  for (let i = 0; i < time; i++) {
    const maxwin = new Set();
    let maxdist = 0;
    for (const [i, [speed, dur, rest]] of reindeer.entries()) {
      const obj = status[i];
      obj[1]--;
      if (obj[2]) obj[0] += speed;
      if (obj[1] === 0) {
        if (obj[2]) {
          obj[1] = rest;
          obj[2] = false;
        } else {
          obj[1] = dur;
          obj[2] = true;
        }
      }

      const dist = obj[0];
      if (dist >= maxdist) {
        if (dist > maxdist) {
          maxwin.clear();
          maxdist = dist;
        }
        maxwin.add(i);
      }
    }
    for (const win of maxwin) status[win][3]++;
  }
  return status.sort((a, b) => b[3] - a[3])[0][3];
}

export default [part1, part2];
