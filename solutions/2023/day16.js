const DIRECTIONS = Object.freeze({
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3,
});

function hash(s) {
  return `${s[0]},${s[1]}`;
}

function move(beam) {
  switch (beam[2]) {
    case DIRECTIONS.LEFT:
      beam[1]--;
      break;
    case DIRECTIONS.RIGHT:
      beam[1]++;
      break;
    case DIRECTIONS.UP:
      beam[0]--;
      break;
    case DIRECTIONS.DOWN:
      beam[0]++;
      break;
    default:
      throw new Error("What direction did you input");
  }
}

function energizeFor(instruct, start) {
  const beams = [start];

  // key: <tile>, value: [<directions>]
  const energized = new Map();

  while (beams.length > 0) {
    const beam = beams.at(-1);

    // Where are we?
    const [x, y, dir] = beam;

    // Invalid position!
    if (x < 0 || x >= instruct.length || y < 0 || y >= instruct[0].length) {
      beams.pop();
      continue;
    }

    const instruction = instruct[x][y];
    const key = hash(beam);
    const items = energized.get(key);

    // We already did this before
    if (items && items.includes(dir)) {
      beams.pop();
      continue;
    } else {
      energized.set(key, [...(items ?? []), dir]);
    }

    switch (instruction) {
      case ".":
        move(beam);
        break;
      case "/":
      case "\\":
        if (instruction === "/") {
          if (dir === DIRECTIONS.RIGHT) {
            beam[0]--;
            beam[2] = DIRECTIONS.UP;
          } else if (dir === DIRECTIONS.LEFT) {
            beam[0]++;
            beam[2] = DIRECTIONS.DOWN;
          } else if (dir === DIRECTIONS.UP) {
            beam[1]++;
            beam[2] = DIRECTIONS.RIGHT;
          } else {
            beam[1]--;
            beam[2] = DIRECTIONS.LEFT;
          }
        } else {
          if (dir === DIRECTIONS.RIGHT) {
            beam[0]++;
            beam[2] = DIRECTIONS.DOWN;
          } else if (dir === DIRECTIONS.LEFT) {
            beam[0]--;
            beam[2] = DIRECTIONS.UP;
          } else if (dir === DIRECTIONS.UP) {
            beam[1]--;
            beam[2] = DIRECTIONS.LEFT;
          } else {
            beam[1]++;
            beam[2] = DIRECTIONS.RIGHT;
          }
        }
        break;
      case "-":
      case "|":
        if (instruction === "|") {
          if ([DIRECTIONS.UP, DIRECTIONS.DOWN].includes(dir)) {
            move(beam);
            continue;
          }

          beams.pop();
          beams.push([x - 1, y, DIRECTIONS.UP]);
          beams.push([x + 1, y, DIRECTIONS.DOWN]);
        } else {
          if ([DIRECTIONS.LEFT, DIRECTIONS.RIGHT].includes(dir)) {
            move(beam);
            continue;
          }

          beams.pop();
          beams.push([x, y - 1, DIRECTIONS.LEFT]);
          beams.push([x, y + 1, DIRECTIONS.RIGHT]);
        }
        break;
    }
  }

  return energized.size;
}

function parse(input) {
  const instruct = [];
  for (const i of input.split("\n")) {
    const r = [];
    for (const c of i) {
      r.push(c);
    }
    instruct.push(r);
  }

  return instruct;
}

function part1(input) {
  return energizeFor(parse(input), [0, 0, DIRECTIONS.RIGHT]);
}

function part2(input) {
  const instruct = parse(input);

  // Try them all!!!!
  const width = instruct[0].length;
  const possiblePlaces = [];

  let max = 0;
  for (let i = 0; i < instruct.length; i++) {
    max = Math.max(max, energizeFor(instruct, [i, 0, DIRECTIONS.RIGHT]));
  }

  for (let i = 0; i < instruct.length; i++) {
    max = Math.max(max, energizeFor(instruct, [i, width - 1, DIRECTIONS.LEFT]));
  }

  for (let i = 0; i < width; i++) {
    max = Math.max(max, energizeFor(instruct, [0, i, DIRECTIONS.DOWN]));
  }

  for (let i = 0; i < width; i++) {
    max = Math.max(
      max,
      energizeFor(instruct, [instruct.length - 1, i, DIRECTIONS.DOWN])
    );
  }

  return max;
}

export default [part1, part2]