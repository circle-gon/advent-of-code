/* 
6: 5 of a kind
5: 4 of a kind
4 full house
3: three of a kind
2: two pair
1: one pair
0: high card
*/
function typeOfHand(a, one) {
  // mletter to occurance
  const letterMap = new Map();
  let jokers = 0;
  for (const char of a) {
    if (!one && char === "J") jokers++;
    else letterMap.set(char, 1 + (letterMap.get(char) ?? 0));
  }

  const n = new Map();
  // occurance to times
  for (const num of letterMap.values()) {
    n.set(num, 1 + (n.get(num) ?? 0));
  }

  if (one) {
    if (n.get(5) === 1) return 6;
    if (n.get(4) === 1) return 5;
    if (n.get(3) === 1 && n.get(2) === 1) return 4;
    if (n.get(3) === 1 && n.get(1) === 2) return 3;
    if (n.get(2) === 2) return 2;
    if (n.get(2) === 1 && n.get(1) === 3) return 1;
    return 0;
  } else {
    function genCopy(m) {
      return new Map(m);
    }
    function hasLeast(number, lim, amt, cpy = genCopy(n)) {
      let jokers = lim;
      for (let i = 0; i < amt; i++) {
        let isFound = false;

        for (let j = 0; j <= jokers; j++) {
          const g = number - j;
          const hasNum = cpy.has(g);

          // 0 means we need no other cards to work
          if (hasNum || g === 0) {
            if (hasNum) {
              if (cpy.get(g) === 1) cpy.delete(g);
              else {
                cpy.set(g, cpy.get(g) - 1);
              }
            }
            jokers -= j;
            isFound = true;
            break;
          }
        }

        // we can't do anything, panic
        if (!isFound) return -1;
      }
      return lim - jokers;
    }

    if (hasLeast(5, jokers, 1) >= 0) return 6;
    if (hasLeast(4, jokers, 1) >= 0) return 5;

    let cpy = genCopy(n);
    let f = hasLeast(3, jokers, 1, cpy);
    if (f >= 0) {
      if (hasLeast(2, jokers - f, 1, genCopy(cpy)) >= 0) return 4;
      return 3;
    }

    if (hasLeast(2, jokers, 2) >= 0) return 2;
    if (hasLeast(2, jokers, 1) >= 0) return 1;

    return 0;
  }
}

const CARDSP1 = "23456789TJQKA".split("");
const CARDSP2 = "J23456789TQKA".split("");

// true if a is stronger than b, false if b is stronger than a
// can't be b === a because that would require the exact same hand
function isStrongerThan(a, b, one) {
  const aStr = typeOfHand(a, one),
    bStr = typeOfHand(b, one);
  const CARDS = one ? CARDSP1 : CARDSP2;
  if (aStr !== bStr) return aStr > bStr;
  for (let i = 0; i < a.length; i++) {
    const acStr = CARDS.indexOf(a[i]),
      bcStr = CARDS.indexOf(b[i]);
    if (acStr !== bcStr) return acStr > bcStr;
  }
  throw new Error("That's the same hand!");
}

function parse(input) {
  return input.split("\n").map((i) => {
    const r = i.split(" ");
    return [r[0], Number(r[1])];
  });
}

function part1(input) {
  const cardBids = parse(input);

  // -1 because we want the good cards last so it's easier
  cardBids.sort((a, b) => (isStrongerThan(a[0], b[0], true) ? 1 : -1));
  return cardBids.reduce((sum, item, idx) => sum + item[1] * (idx + 1), 0);
}

function part2(input) {
  const cardBids = parse(input);

  // -1 because we want the good cards last so it's easier
  cardBids.sort((a, b) => (isStrongerThan(a[0], b[0], false) ? 1 : -1));
  return cardBids.reduce((sum, item, idx) => sum + item[1] * (idx + 1), 0);
}

export default [part1, part2]