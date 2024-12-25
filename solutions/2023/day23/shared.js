export const DS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

export function key(p) {
  return p[0] + "_" + p[1];
}

export function addVect(a, b) {
  return a.map((v, c) => v + b[c]);
}

export function validPos(map, p) {
  return (
    map[p[1]] !== undefined &&
    map[p[1]][p[0]] !== undefined &&
    map[p[1]][p[0]] !== "#"
  );
}

export function parse(input) {
  return input.split("\n").map((line) => line.split(""));
}