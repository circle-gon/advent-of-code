function tryConv(n) {
  return isNaN(n) ? n : Number(n);
}

function negate(num, digits) {
  return ~num & ((1 << digits) - 1);
}

function parse(input) {
  const values = new Map();
  for (const line of input.split("\n")) {
    const [left, right] = line.split(" -> ");
    const [b1, op, b2] = left.split(" ");
    if (b1 === "NOT") values.set(right, [b1, tryConv(op)]);
    else if (op === undefined) values.set(right, tryConv(b1));
    else values.set(right, [op, tryConv(b1), tryConv(b2)]);
  }

  return values;
}

function calc(values, name) {
  if (typeof name === "number") return name;
  const val = values.get(name);
  if (typeof val === "number") return val;

  let result;
  if (typeof val === "string") result = calc(values, val);
  else if (val[0] === "NOT") result = negate(calc(values, val[1]), 16);
  else {
    const first = calc(values, val[1]);
    const second = calc(values, val[2]);
    switch (val[0]) {
      case "AND":
        result = first & second;
        break;
      case "LSHIFT":
        result = first << second;
        break;
      case "RSHIFT":
        result = first >> second;
        break;
      case "OR":
        result = first | second;
        break;
      default:
        throw new Error("what?");
    }
  }
  values.set(name, result);
  return result;
}

function part1(input) {
  const values = parse(input);
  return calc(values, "a");
}

function part2(input) {
  const values = parse(input);
  const out = calc(new Map(values), "a");
  values.set("b", out);
  return calc(values, "a");
}

export default [part1, part2];
