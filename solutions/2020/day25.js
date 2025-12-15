function part1(input) {
  const [key1, key2] = input.split("\n").map((i) => Number(i));
  let base = 1;
  let iter = 0;
  while (base !== key1) {
    base = (base * 7) % 20201227;
    iter++;
  }

  let outKey = 1;
  for (let i = 0; i < iter; i++) outKey = (outKey * key2) % 20201227;
  return outKey;
}

export default [part1];
