function parse(input) {
  return input.split("\n").map((i) => BigInt(i));
}

function mix(sec, next) {
  return sec ^ next;
}

function prune(sec) {
  return sec % 16777216n;
}

function part1(input) {
  const secrets = parse(input);
  let sum = 0;
  for (const secret of secrets) {
    let sec = secret;
    for (let i = 0; i < 2000; i++) {
      sec = prune(mix(sec, sec * 64n));
      sec = prune(mix(sec, sec / 32n));
      sec = prune(mix(sec, sec * 2048n));
    }
    sum += Number(sec);
  }
  return sum;
}

function hash(a, b, c, d) {
  // Base 19, since combinations go from -9 to 9 (19 numbers)
  return 19 ** 3 * (a + 9) + 19 ** 2 * (b + 9) + 19 * (c + 9) + (d + 9);
}

function addNum(map, num, count) {
  map[num] = (map[num] ?? 0) + count;
}

function part2(input) {
  const secrets = parse(input);
  const prices = [];
  const keys = [];
  const gains = Array(19 ** 4);
  for (const secret of secrets) {
    let sec = secret;
    const group = [];

    for (let i = 0; i < 1999; i++) {
      let curr = sec;
      sec = prune(mix(sec, sec * 64n));
      sec = prune(mix(sec, sec / 32n));
      sec = prune(mix(sec, sec * 2048n));

      const price = Number(sec % 10n);
      group.push([price, price - Number(curr % 10n)]);
    }
    prices.push(group);
  }

  const seen = Array(19 ** 4);
  for (const price of prices) {
    const newKeys = [];
    for (let i = 0; i < 1995; i++) {
      const group = price.slice(i, i + 4);
      const h = hash(...group.map((i) => i[1]));
      if (seen[h] === undefined) {
        if (gains[h] === undefined) keys.push(h);
        addNum(gains, h, group[3][0]);
      }
      seen[h] = true;
      newKeys.push(h);
    }
    for (const key of newKeys) {
      seen[key] = undefined;
    }
  }

  let max = 0;
  for (const key of keys) {
    max = Math.max(gains[key] ?? 0, max);
  }
  return max;
}

export default [part1, part2];
