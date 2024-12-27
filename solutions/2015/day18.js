function parse(input) {
  const lights = [];
  for (const line of input.split("\n")) {
    const row = [];
    for (const char of line) {
      row.push(char === "#");
    }
    lights.push(row);
  }
  return lights;
}

function part1(input, _, example) {
  let config = parse(input);
  const req = example ? 4 : 100;
  for (let i = 0; i < req; i++) {
    const next = Array(config.length)
      .fill()
      .map((_, i) => Array(config[i].length));
    for (let y = 0; y < config.length; y++) {
      for (let x = 0; x < config[y].length; x++) {
        let count = 0;
        const curr = config[y][x];
        for (let j = -1; j <= 1; j++) {
          for (let k = -1; k <= 1; k++) {
            if (j === 0 && k === 0) continue;
            const item = config[y + j]?.[x + k];
            if (item) count++;
          }
        }
        const state =
          (curr && (count === 2 || count === 3)) || (!curr && count === 3);
        next[y][x] = state;
      }
    }
    config = next;
  }
  return config.reduce((a, b) => a + b.reduce((c, d) => c + (d ? 1 : 0), 0), 0);
}

function part2(input, _, example) {
  let config = parse(input);
  config[0][0] = true;
  config[0][config[0].length - 1] = true;
  config[config.length - 1][0] = true;
  config[config.length - 1][config[0].length - 1] = true;

  const req = example ? 5 : 100;
  for (let i = 0; i < req; i++) {
    const next = Array(config.length)
      .fill()
      .map((_, i) => Array(config[i].length));
    for (let y = 0; y < config.length; y++) {
      for (let x = 0; x < config[y].length; x++) {
        if (
          (x === 0 || x === config[y].length - 1) &&
          (y === 0 || y === config.length - 1)
        ) {
          next[y][x] = true;
          continue;
        }
        let count = 0;
        const curr = config[y][x];
        for (let j = -1; j <= 1; j++) {
          for (let k = -1; k <= 1; k++) {
            if (j === 0 && k === 0) continue;
            const item = config[y + j]?.[x + k];
            if (item) count++;
          }
        }
        const state =
          (curr && (count === 2 || count === 3)) || (!curr && count === 3);
        next[y][x] = state;
      }
    }
    config = next;
  }
  return config.reduce((a, b) => a + b.reduce((c, d) => c + (d ? 1 : 0), 0), 0);
}

export default [part1, part2];
