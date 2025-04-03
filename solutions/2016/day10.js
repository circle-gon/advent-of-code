function parse(input) {
  const out = new Map();
  for (const line of input.split("\n")) {
    const data = line.split(" ");
    if (data[0] === "value") {
      const bot = Number(data[5]);
      const value = Number(data[1]);
      const obj = out.get(bot) ?? {
        values: [],
        compared: [NaN, NaN],
      };
      obj.values.push(value);
      out.set(bot, obj);
    } else {
      const bot = Number(data[1]);
      const low = Number(data[6]);
      const high = Number(data[11]);
      const obj = out.get(bot) ?? {
        values: [],
        compared: [NaN, NaN],
      };
      obj.choose = [
        [data[5], low],
        [data[10], high],
      ];
      out.set(bot, obj);
    }
  }
  return out;
}

function run(input) {
  const map = parse(input);
  const queue = [];
  const out = new Map();
  for (const [b, m] of map.entries()) {
    if (m.values.length === 2) queue.push(b);
  }

  while (queue.length > 0) {
    const b = queue.pop();
    const { choose, values, compared } = map.get(b);
    const real = values.sort((a, b) => a - b);
    for (let i = 0; i < 2; i++) {
      const num = real[i];
      const [type, place] = choose[i];
      if (type === "output") out.set(place, num);
      else {
        const next = map.get(place).values.push(num);
        if (next === 2) queue.push(place);
      }
      compared[i] = num;
    }
  }
  return [map, out];
}

function part1(input, _, example) {
  const [map] = run(input);
  const comp1 = example ? 2 : 17;
  const comp2 = example ? 5 : 61;
  for (const [id, { compared }] of map.entries()) {
    if (compared[0] === comp1 && compared[1] === comp2) return id;
  }
  return "Is your input malformed?";
}

function part2(input) {
  const [, out] = run(input);
  return out.get(0) * out.get(1) * out.get(2);
}

export default [part1, part2];
