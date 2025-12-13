function parse(input) {
  const out = [];
  for (const line of input.split("\n\n")) {
    const lines = line.split("\n");
    const num = Number(lines[0].split(" ")[1].slice(0, -1));
    const tiles = lines.slice(1).map((i) => i.split(""));
    out.push([num, tiles]);
  }
  return out;
}

function part1(input) {
  const tiles = parse(input);
  const edges = [];
  for (const [, tile] of tiles) {
    const top = tile[0];
    const right = tile.map((i) => i.at(-1));
    const bottom = tile.at(-1);
    const left = tile.map((i) => i[0]);
    edges.push([
      top,
      top.toReversed(),
      right,
      right.toReversed(),
      bottom.toReversed(),
      bottom,
      left.toReversed(),
      left,
    ]);
  }

  const choices = Array(edges.length)
    .fill()
    .map(() => []);
  for (let i = 0; i < edges.length; i++) {
    for (let j = 0; j < edges.length; j++) {
      if (i === j) continue;
      const a = edges[i];
      const b = edges[j];
      let worked = false;
      for (let k = 0; k < 8; k++) {
        for (let l = 0; l < 8; l++) {
          if (a[k].every((m, n) => m === b[l][n])) worked = true;
        }
      }
      if (worked) choices[i].push(j);
    }
  }
  let prod = 1;
  for (let i = 0; i < edges.length; i++) {
    if (choices[i].length === 2) prod *= tiles[i][0];
  }
  return prod;
}

function transpose(arr) {
  const out = [];
  for (let i = 0; i < arr[0].length; i++) {
    out.push(arr.map((j) => j[i]).reverse());
  }
  return out;
}

function getSides(tile) {
  const top = tile[0];
  const right = tile.map((i) => i.at(-1));
  const bottom = tile.at(-1);
  const left = tile.map((i) => i[0]);
  return [top, right, bottom, left];
}

function findRotation(a, b, side) {
  let alteredA = a;
  for (let i = 0; i < 4; i++) {
    let alteredB = b;
    for (let j = 0; j < 4; j++) {
      const sideA = getSides(alteredA)[side];
      const sideB = getSides(alteredB)[side % 2 === 0 ? 2 - side : 4 - side];
      if (sideA.every((i, j) => i === sideB[j])) return alteredA;
      if (sideA.toReversed().every((i, j) => i === sideB[j])) {
        // A needs to be reversed
        return side % 2 === 0
          ? alteredA.map((i) => i.toReversed())
          : alteredA.toReversed();
      }
      alteredB = transpose(alteredB);
    }
    alteredA = transpose(alteredA);
  }
  throw new Error("no rotation found");
}

function findRotation2(a, b, side) {
  let alteredB = b;
  for (let j = 0; j < 4; j++) {
    const sideA = getSides(a)[side];
    const sideB = getSides(alteredB)[side % 2 === 0 ? 2 - side : 4 - side];
    if (sideA.every((i, j) => i === sideB[j])) return alteredB;
    if (sideA.toReversed().every((i, j) => i === sideB[j])) {
      // A needs to be reversed
      return side % 2 === 0
        ? alteredB.map((i) => i.toReversed())
        : alteredB.toReversed();
    }
    alteredB = transpose(alteredB);
  }
  return null;
}

function tryRotation2(a, choices, side) {
  for (const choice of choices) {
    const out = findRotation2(a, choice, side);
    if (out) {
      choices.splice(choices.indexOf(choice), 1);
      return out;
    }
  }
  throw new Error("No rotation found");
}

function joinRows(...args) {
  const out = [];
  for (let i = 0; i < args[0].length; i++) {
    const row = [];
    for (const arg of args) row.push(...arg[i]);
    out.push(row);
  }
  return out;
}

function isSeaMonster(tiles, x, y) {
  return [
    tiles[y][x + 18],
    tiles[y + 1][x],
    tiles[y + 1][x + 5],
    tiles[y + 1][x + 6],
    tiles[y + 1][x + 11],
    tiles[y + 1][x + 12],
    tiles[y + 1][x + 17],
    tiles[y + 1][x + 18],
    tiles[y + 1][x + 19],
    tiles[y + 2][x + 1],
    tiles[y + 2][x + 4],
    tiles[y + 2][x + 7],
    tiles[y + 2][x + 10],
    tiles[y + 2][x + 13],
    tiles[y + 2][x + 16],
  ].every((i) => i === "#");
}

function part2(input) {
  const tiles = parse(input);
  const edges = [];
  for (const [, tile] of tiles) {
    const top = tile[0];
    const right = tile.map((i) => i.at(-1));
    const bottom = tile.at(-1);
    const left = tile.map((i) => i[0]);
    edges.push([
      top,
      top.toReversed(),
      right,
      right.toReversed(),
      bottom.toReversed(),
      bottom,
      left.toReversed(),
      left,
    ]);
  }

  const choices = Array(edges.length)
    .fill()
    .map(() => []);
  for (let i = 0; i < edges.length; i++) {
    for (let j = 0; j < edges.length; j++) {
      if (i === j) continue;
      const a = edges[i];
      const b = edges[j];
      outer: for (let k = 0; k < 8; k++) {
        for (let l = 0; l < 8; l++) {
          if (a[k].every((m, n) => m === b[l][n])) {
            choices[i].push([j, k, l]);
            break outer;
          }
        }
      }
    }
  }

  const corners = choices.filter((i) => i.length === 2);
  const cornersIdx = corners.map((i) => choices.indexOf(i));
  const c1 = findRotation(
    tiles[cornersIdx[0]][1],
    tiles[corners[0][0][0]][1],
    1,
  );
  // If this is removed bad things happen
  c1.reverse();

  const out = [];
  const size = Math.sqrt(choices.length);
  const allTiles = tiles.map((i) => i[1]);
  allTiles.splice(allTiles.indexOf(c1), 1);
  for (let i = 0; i < size; i++) {
    // Get the left from above
    let left = i === 0 ? c1 : tryRotation2(out[i - 1][0], allTiles, 2);
    const row = [left];
    for (let j = 1; j < size; j++) {
      // Get the next by using the previous
      left = tryRotation2(left, allTiles, 1);
      row.push(left);
    }
    out.push(row);
  }

  let outRows = out
    .map((i) =>
      joinRows(...i.map((i) => i.slice(1, -1).map((j) => j.slice(1, -1)))),
    )
    .flat();

  const hashCount = outRows.reduce(
    (a, b) => a + b.reduce((c, d) => c + (d === "#" ? 1 : 0), 0),
    0,
  );

  let roughness = Infinity;
  for (let i = 0; i < 4; i++) {
    for (const possible of [
      outRows,
      outRows.toReversed(),
      outRows.map((i) => i.toReversed()),
      outRows.map((i) => i.toReversed()).toReversed(),
    ]) {
      let seaCount = 0;
      for (let i = 0; i < possible.length - 2; i++) {
        for (let j = 0; j < possible[0].length - 19; j++) {
          if (isSeaMonster(possible, j, i)) seaCount++;
        }
      }
      roughness = Math.min(roughness, hashCount - seaCount * 15);
    }
    outRows = transpose(outRows);
  }
  return roughness;
}

export default [part1, part2];
