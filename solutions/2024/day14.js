function parse(input) {
  const robots = [];
  for (const line of input.split("\n")) {
    const data = line.split(" ");
    robots.push(
      data.map((i) =>
        i
          .slice(2)
          .split(",")
          .map((i) => Number(i)),
      ),
    );
  }
  return robots;
}

function constants(example) {
  const SIDES = example ? [11, 7] : [101, 103];
  const HALF_SIDES = SIDES.map((i) => (i - 1) / 2);
  return {
    SIDES,
    HALF_SIDES,
  };
}

function part1(input, _, example) {
  const robots = parse(input);
  const { SIDES, HALF_SIDES } = constants(example);
  const quadrant = [0, 0, 0, 0];
  for (const [p, v] of robots) {
    const newXp = p[0] + v[0] * 100;
    const newYp = p[1] + v[1] * 100;
    const newX =
      newXp >= 0
        ? newXp % SIDES[0]
        : (SIDES[0] - (-newXp % SIDES[0])) % SIDES[0];
    const newY =
      newYp >= 0
        ? newYp % SIDES[1]
        : (SIDES[1] - (-newYp % SIDES[1])) % SIDES[1];

    if (newX !== HALF_SIDES[0] && newY !== HALF_SIDES[1]) {
      const xInc = newX > HALF_SIDES[0] ? 1 : 0;
      const yInc = newY > HALF_SIDES[1] ? 2 : 0;
      quadrant[xInc + yInc]++;
    }
  }

  return quadrant.reduce((a, b) => a * b);
}

function part2(input, _, example) {
  const robots = parse(input);
  const { SIDES } = constants(example);
  let iter = 0;
  while (true) {
    for (const [p, [vx, vy]] of robots) {
      const newX = p[0] + vx;
      p[0] = newX >= 0 ? newX % SIDES[0] : SIDES[0] + newX;
      const newY = p[1] + vy;
      p[1] = newY >= 0 ? newY % SIDES[1] : SIDES[1] + newY;
    }
    iter++;

    // Check for tree
    const sorted = robots
      .map((i) => i[0])
      .sort((a, b) => {
        if (a[1] < b[1]) return -1;
        if (a[1] > b[1]) return 1;
        return a[0] - b[0];
      });
    let [xSeq, ySeq] = sorted[0];
    let count = 1;
    for (const [x, y] of sorted) {
      if (x === xSeq + 1 && y === ySeq) {
        count++;
        // For my input I needed at least 8, your mileage may vary
        if (count === 15) {
          // Generate the output (looks cool)
          const nums = Array(SIDES[1])
            .fill()
            .map(() => Array(SIDES[0]).fill(" "));
          for (const [x, y] of sorted) nums[y][x] = "*";
          console.log(nums.map((i) => i.join("")).join("\n"));
          return iter;
        }
      } else {
        ySeq = y;
        count = 1;
      }
      xSeq = x;
    }
  }
}

export default [part1, part2];
