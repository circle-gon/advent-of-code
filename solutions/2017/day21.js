function rotateLeft(rowCol) {
  const out = Array(rowCol.length)
    .fill()
    .map(() => Array(rowCol[0].length).fill(""));
  for (let i = 0; i < rowCol.length; i++) {
    for (let j = 0; j < rowCol[i].length; j++) {
      const char = rowCol[i][j];
      // x, y -> y, r - 1 - x
      out[rowCol[i].length - 1 - j][i] = char;
    }
  }
  return out;
}

function flipHori(pattern) {
  return pattern.map((i) => i.toReversed());
}

function flipVert(pattern) {
  return pattern.toReversed();
}

function toString(pattern) {
  return pattern.map((i) => i.join("")).join("/");
}

function parse(input) {
  const map = new Map();
  for (const line of input.split("\n")) {
    const [from, toX] = line.split(" => ");
    const to = toX.split("/")
    let pattern = from.split("/").map((i) => i.split(""));
    for (let i = 0; i < 4; i++) {
      map.set(toString(pattern), to);
      map.set(toString(flipHori(pattern)), to);
      map.set(toString(flipVert(pattern)), to);
      map.set(toString(flipHori(flipVert(pattern))), to);
      pattern = rotateLeft(pattern);
    }
  }
  return map;
}

function run(input, size) {
  const map = parse(input);
  let rowCol = [".#.", "..#", "###"].map((i) => i.split(""));
  for (let i = 0; i < size; i++) {
    // Split as pattern
    const chunks = rowCol.length % 2 === 0 ? 2 : 3;
    const factor = 1 + 1 / chunks;
    const out = Array(rowCol.length * factor)
      .fill()
      .map(() => Array(rowCol[0].length * factor).fill(""));

    for (let i = 0; i < rowCol.length; i += chunks) {
      for (let j = 0; j < rowCol[0].length; j += chunks) {
        const parts = [];
        for (let k = 0; k < chunks; k++)
          parts.push(rowCol[i + k].slice(j, j + chunks).join(""));

        const result = map.get(parts.join("/"))
        for (let k = 0; k <= chunks; k++) {
          for (let l = 0; l <= chunks; l++) {
            out[factor * i + k][factor * j + l] = result[k][l];
          }
        }
      }
    }

    rowCol = out;
  }
  return rowCol.reduce(
    (a, b) => a + b.reduce((c, d) => c + (d === "#" ? 1 : 0), 0),
    0
  );
}

function part1(input, _, example) {
  return run(input, example ? 2 : 5);
}

function part2(input) {
  return run(input, 18);
}

export default [part1, part2];
