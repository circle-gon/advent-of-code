const CARTS = ["^", ">", "v", "<"];
function parse(input) {
  const carts = [];
  const track = [];
  for (const [y, line] of input.split("\n").entries()) {
    const curr = [];
    for (const [x, char] of line.split("").entries()) {
      if (CARTS.includes(char)) {
        const idx = CARTS.indexOf(char);
        carts.push([x, y, 0, idx]);
        curr.push(idx === 0 || idx === 2 ? "|" : "-");
      } else curr.push(char);
    }
    track.push(curr);
  }
  return { carts, track };
}

function tick(carts, track) {
  carts.sort((a, b) => {
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return a[0] - b[0];
  });
  const toRemove = new Set();
  for (const cart of carts) {
    if (cart[3] === 0) cart[1]--;
    else if (cart[3] === 1) cart[0]++;
    else if (cart[3] === 2) cart[1]++;
    else cart[0]--;

    const part = track[cart[1]][cart[0]];
    if (part === "/") {
      if (cart[3] % 2 === 0) cart[3]++;
      else cart[3]--;
    } else if (part === "\\") {
      cart[3] = 3 - cart[3];
    } else if (part === "+") {
      if (cart[2] === 0) cart[3] = (cart[3] + 3) % 4;
      else if (cart[2] === 2) cart[3] = (cart[3] + 1) % 4;
      cart[2] = (cart[2] + 1) % 3;
    }

    for (const cart2 of carts) {
      if (cart !== cart2 && cart[0] === cart2[0] && cart[1] === cart2[1]) {
        toRemove.add(cart);
        toRemove.add(cart2);
      }
    }
  }
  for (const item of toRemove) carts.splice(carts.indexOf(item), 1);
  return toRemove;
}

function part1(input) {
  const { carts, track } = parse(input);
  while (true) {
    const removed = tick(carts, track);
    if (removed.size > 0) {
      const cart = [...removed][0];
      return `${cart[0]},${cart[1]}`;
    }
  }
}

function part2(input) {
  let { carts, track } = parse(input);
  while (true) {
    tick(carts, track)
    if (carts.length === 1) return `${carts[0][0]},${carts[0][1]}`;
  }
}

export default [part1, part2];
