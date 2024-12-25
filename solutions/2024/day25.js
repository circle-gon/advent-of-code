function parse(input) {
  const combs = input.split("\n\n");
  const keys = [];
  const locks = [];

  for (const comb of combs) {
    const rows = comb.split("\n");
    const heights = [];
    // Measure height
    for (let i = 0; i < rows[0].length; i++) {
      let height = 0;
      for (let j = 0; j < rows.length; j++) {
        if (rows[j][i] === "#") height++;
      }
      heights.push(height);
    }

    if (rows[0] === "#####") locks.push(heights);
    else keys.push(heights);
  }
  return {
    keys,
    locks,
  };
}

function part1(input) {
  const { keys, locks } = parse(input);
  let can = 0;
  for (const lock of locks) {
    for (const key of keys) {
      let works = true;
      for (let i = 0; i < key.length; i++) {
        if (lock[i] + key[i] > 7) works = false;
      }
      if (works) can++;
    }
  }
  return can;
}

export default [part1];
