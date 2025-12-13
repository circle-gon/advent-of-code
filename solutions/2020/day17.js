function hash(x, y, z, w) {
  return `${x},${y},${z},${w}`;
}

function parse(input) {
  const cubes = new Set();
  const lines = input.split("\n");
  for (const [y, line] of lines.entries()) {
    for (const [x, dig] of line.split("").entries()) {
      if (dig === "#") cubes.add(hash(x, y, 0, 0));
    }
  }
  return { cubes, length: lines.length, width: lines[0].length };
}

function solve(input, four) {
  let { cubes, length, width } = parse(input);
  let minx = -1,
    maxx = width,
    miny = -1,
    maxy = length,
    minz = -1,
    maxz = 1,
    minw = -1,
    maxw = 1;

  for (let i = 0; i < 6; i++) {
    const nextState = new Set();
    for (let x = minx; x <= maxx; x++) {
      for (let y = miny; y <= maxy; y++) {
        for (let z = minz; z <= maxz; z++) {
          for (let w = four ? minw : 0; w <= (four ? maxw : 0); w++) {
            const active = cubes.has(hash(x, y, z, w));
            let activeCount = 0;

            for (let xd = -1; xd <= 1; xd++) {
              for (let yd = -1; yd <= 1; yd++) {
                for (let zd = -1; zd <= 1; zd++) {
                  for (let wd = -1; wd <= 1; wd++) {
                    if (xd === 0 && yd === 0 && zd === 0 && wd === 0) continue;
                    if (cubes.has(hash(x + xd, y + yd, z + zd, w + wd)))
                      activeCount++;
                  }
                }
              }
            }

            if (
              (active && (activeCount === 2 || activeCount === 3)) ||
              (!active && activeCount === 3)
            ) {
              nextState.add(hash(x, y, z, w));
              if (x === minx) minx--;
              if (x === maxx) maxx++;
              if (y === miny) miny--;
              if (y === maxy) maxy++;
              if (z === minz) minz--;
              if (z === maxz) maxz++;
              if (w === minw) minw--;
              if (w === maxw) maxw++;
            }
          }
        }
      }
    }
    cubes = nextState;
  }
  return cubes.size;
}

function part1(input) {
  return solve(input, false);
}

function part2(input) {
  return solve(input, true);
}

export default [part1, part2];
