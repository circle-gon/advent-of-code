function parse(input) {
  return input.split("\n").map((i) => Number(i.split(": ")[1]));
}

function wins(hit, dmg, armor, ohit, odmg, oarmor) {
  const turns = Math.ceil(hit / Math.max(odmg - armor, 1));
  const dealt = turns * Math.max(dmg - oarmor, 1);
  return dealt >= ohit;
}

const WEAPON = [
  [4, 8],
  [5, 10],
  [6, 25],
  [7, 40],
  [8, 74],
];
const ARMOR = [
  [0, 0],
  [1, 13],
  [2, 31],
  [3, 53],
  [4, 75],
  [5, 102],
];
const RING = [
  [0, 0],
  [1, 25],
  [2, 50],
  [3, 100],
  [1, 20],
  [2, 40],
  [3, 80],
];

function statsFor(w, a, ring1, ring2) {
  const r1 = RING[ring1];
  const r2 = RING[ring2];
  return [
    w[0] + (ring1 <= 3 ? r1[0] : 0) + (ring2 <= 3 ? r2[0] : 0),
    a[0] + (ring1 > 3 ? r1[0] : 0) + (ring2 > 3 ? r2[0] : 0),
    w[1] + a[1] + r1[1] + r2[1],
  ];
}

function part1(input) {
  const [bhit, bdmg, barmor] = parse(input);
  let min = Infinity;
  for (const weapon of WEAPON) {
    for (const armor of ARMOR) {
      for (let i = 0; i < RING.length; i++) {
        const cap = i > 0 ? i : 1;
        for (let j = 0; j < cap; j++) {
          const [dmg, arm, cost] = statsFor(weapon, armor, i, j);
          if (wins(100, dmg, arm, bhit, bdmg, barmor))
            min = Math.min(min, cost);
        }
      }
    }
  }
  return min;
}

function part2(input) {
  const [bhit, bdmg, barmor] = parse(input);
  let min = 0;
  for (const weapon of WEAPON) {
    for (const armor of ARMOR) {
      for (let i = 0; i < RING.length; i++) {
        const cap = i > 0 ? i : 1;
        for (let j = 0; j < cap; j++) {
          const [dmg, arm, cost] = statsFor(weapon, armor, i, j);
          if (!wins(100, dmg, arm, bhit, bdmg, barmor))
            min = Math.max(min, cost);
        }
      }
    }
  }
  return min;
}

export default [part1, part2];
