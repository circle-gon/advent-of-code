import { md5 } from "/externals.js";

function stretch(input, times) {
  let hash = md5(input)
  for (let i = 0; i < times; i++) {
    hash = md5(hash)
  }
  return hash
}

function memoHash(cache, input, idx, times) {
  while (idx >= cache.length) cache.push(stretch(input + cache.length, times))
  return cache[idx]
}

function run(input, times) {
  let hashes = 0;
  let idx = 0;
  const cache = []
  
  while (hashes < 64) {
    const hash = memoHash(cache, input, idx, times);
    let match = "";
    for (let i = 0; i <= hash.length - 3; i++) {
      const str = hash.slice(i, i + 3);
      if (str[0] === str[1] && str[1] === str[2]) {
        match = str[0];
        break;
      }
    }
    if (match !== "") {
      const repeat = match.repeat(5);
      for (let i = idx + 1; i <= idx + 1000; i++) {
        const hash = memoHash(cache, input, i, times);
        if (hash.includes(repeat)) {
          hashes++;
          break;
        }
      }
    }
    idx++;
  }
  return idx - 1;
}

function part1(input) {
  return run(input, 0)
}

function part2(input) {
  return run(input, 2016)
}

export default [part1, part2];
