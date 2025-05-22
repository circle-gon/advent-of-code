function parse(input) {
  const values = new Map();
  const [inputs, instrs] = input.split("\n\n");
  for (const line of inputs.split("\n")) {
    const [name, val] = line.split(": ");
    values.set(name, Number(val));
  }

  for (const line of instrs.split("\n")) {
    const [left, right] = line.split(" -> ");
    const [b1, op, b2] = left.split(" ");
    values.set(right, [op, b1, b2]);
  }

  return values;
}

function calc(values, name) {
  const val = values.get(name);
  if (typeof val === "number") return val;
  const first = calc(values, val[1]);
  const second = calc(values, val[2]);
  const result =
    val[0] === "AND"
      ? first & second
      : val[0] === "OR"
        ? first | second
        : first ^ second;
  values.set(name, result);
  return result;
}

function part1(input) {
  const values = parse(input);
  let sum = 0;
  for (const key of values.keys()) {
    if (!key.startsWith("z")) continue;
    const count = Number(key.slice(1));
    sum += 2 ** count * calc(values, key);
  }
  return sum;
}

function find(values, func) {
  for (const [k, v] of values.entries()) if (func(k, v)) return k;
}

function isInput(v) {
  return (
    (v[1].startsWith("x") && v[2].startsWith("y")) ||
    (v[2].startsWith("x") && v[1].startsWith("y"))
  );
}

function isOutput(k) {
  return k.startsWith("z");
}

function matchesOne(arr, a) {
  return arr[1] === a || arr[2] === a;
}

// See https://en.wikipedia.org/wiki/Adder_(electronics)#Ripple-carry_adder
// I love you Wikipeedia
function part2(input) {
  const values = parse(input);
  const bad = [];

  for (const [k, v] of values.entries()) {
    if (v[0] === "XOR") {
      if (isInput(v)) {
        // Check the XOR on the input
        if (matchesOne(v, "x00") && matchesOne(v, "y00")) {
          if (k !== "z00") bad.push(k);
        } else if (isOutput(k)) bad.push(k);
        // Check the XOR on zNN
      } else if (!isOutput(k)) bad.push(k);
      // Check the AND
    } else if (v[0] === "AND") {
      if (isOutput(k)) bad.push(k);
    } else if (isOutput(k)) {
      if (k === "z45") {
        // Last one is an OR
        if (v[0] !== "OR") bad.push(k);
        // Rest are XOR
      } else if (v[0] !== "XOR") bad.push(k);
    }
  }

  // Check that the result of xNN XOR yNN is in a wire that goes to zNN
  const see = [];
  for (const [k, v] of values.entries()) {
    if (v[0] !== "XOR" || !isInput(v) || k === "z00" || bad.includes(k))
      continue;
    const exists = find(
      values,
      (_, v) => v[0] === "XOR" && matchesOne(v, k) && !isInput(v),
    );
    if (!exists) {
      bad.push(k);
      see.push([k, v]);
    }
  }

  // Are some not? Find the wrong pair
  for (const check of see) {
    const [, [, one]] = check;
    const ok = values.get(
      // zNN out
      find(
        values,
        (k, v) => v[0] === "XOR" && !isInput(v) && k === `z${one.slice(1)}`,
      ),
    );
    // OR pair
    const match = find(values, (k, v) => v[0] === "OR" && matchesOne(ok, k));
    bad.push(ok[1] !== match ? ok[1] : ok[2]);
  }

  return bad.sort().join(",");
}

export default [part1, part2];
