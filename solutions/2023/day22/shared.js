export function hash(blocks) {
  return JSON.stringify(blocks);
}

function doesIntersect(A, B) {
  return !(
    B[0][0] > A[0][1] ||
    B[0][1] < A[0][0] ||
    B[1][0] > A[1][1] ||
    B[1][1] < A[1][0] ||
    B[2][0] > A[2][1] ||
    B[2][1] < A[2][0]
  );
}

export function fall(blocks) {
  while (true) {
    const prev = hash(blocks);
    // try every block and see if it can fall
    for (const block of blocks) {
      if (block[2][0] <= 1) continue;

      block[2][0]--;
      block[2][1]--;

      for (const test of blocks) {
        if (block === test) continue;
        if (doesIntersect(block, test)) {
          block[2][0]++;
          block[2][1]++;
          break;
        }
      }
    }

    // Nothing changed
    if (hash(blocks) === prev) break;
  }
}