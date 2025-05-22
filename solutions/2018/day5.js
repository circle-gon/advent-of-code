function isPair(a, b) {
  const pol1 = a.toLowerCase() === a;
  const pol2 = b.toLowerCase() === b;
  return pol1 !== pol2 && a.toLowerCase() === b.toLowerCase();
}

function react(str, ignore) {
  let next = "";
  for (let i = 0; i < str.length; i++) {
    if (next.length > 0 && isPair(next[next.length - 1], str[i]))
      next = next.slice(0, -1);
    else next += str[i];
  }
  return next;
}

function part1(input) {
  return react(input, "").length;
}

function part2(input) {
  const core = react(input);
  const letters = new Set(core.toLowerCase());
  let len = Infinity;
  for (const letter of letters)
    len = Math.min(
      len,
      react(core.replaceAll(new RegExp(letter, "ig"), "")).length
    );

  return len;
}

export default [part1, part2];
