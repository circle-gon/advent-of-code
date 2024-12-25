function parse(input) {
  return input.split("").map((i) => Number(i));
}

function part1(input) {
  const drive = parse(input);
  let idx = 0;
  let pos = 0;
  let lastIdx = drive.length - 1;
  if (lastIdx % 2 === 1) lastIdx--;
  let sum = 0;

  while (idx <= lastIdx) {
    const num = drive[idx];
    if (idx % 2 === 0) {
      for (let i = 0; i < num; i++) {
        sum += (idx / 2) * pos;
        pos++;
      }
    } else {
      // Move some from the back
      for (let i = 0; i < num && idx <= lastIdx; i++) {
        drive[lastIdx]--;
        sum += (lastIdx / 2) * pos;
        pos++;
        if (drive[lastIdx] === 0) lastIdx -= 2;
      }
    }
    idx++;
  }

  return sum;
}

function part2(input) {
  const drive = parse(input);
  const effSize = [...drive]
  let sum = 0;

  let lastIdx = drive.length - 1;
  if (lastIdx % 2 === 1) lastIdx--;

  while (lastIdx >= 0) {
    // Find the earliest free space
    const size = drive[lastIdx];
    let pos = 0;
    let n = -1;
    for (let idx = 0; idx < lastIdx; idx++) {
      const num = drive[idx]
      pos += effSize[idx] - num;
      if (idx % 2 === 1 && size <= num) {
        n = idx;
        break;
      }
      pos += num;
    }
    // Add sum
    if (n !== -1) drive[n] -= size;
    for (let i = 0; i < size; i++) {
      sum += (lastIdx / 2) * pos;
      pos++;
    }
    lastIdx -= 2;
  }

  return sum;
}

export default [part1, part2];
