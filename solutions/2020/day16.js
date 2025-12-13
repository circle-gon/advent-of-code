function parse(input) {
  const [data, mine, yours] = input.split("\n\n");
  const info = new Map();
  for (const line of data.split("\n")) {
    const [name, parts] = line.split(": ");
    const fields = parts
      .split(" or ")
      .map((i) => i.split("-").map((j) => Number(j)))
      .flat();
    info.set(name, fields);
  }
  const myticket = mine
    .split("\n")[1]
    .split(",")
    .map((i) => Number(i));
  const yourtickets = yours
    .split("\n")
    .slice(1)
    .map((i) => i.split(",").map((j) => Number(j)));
  return {
    info,
    myticket,
    yourtickets,
  };
}

function part1(input) {
  const { info, yourtickets } = parse(input);
  let error = 0;
  for (const ticket of yourtickets) {
    for (const num of ticket) {
      let valid = false;
      for (const field of info.values()) {
        if (
          (num >= field[0] && num <= field[1]) ||
          (num >= field[2] && num <= field[3])
        )
          valid = true;
      }
      if (!valid) error += num;
    }
  }
  return error;
}

function isValid(num, field) {
  return (
    (num >= field[0] && num <= field[1]) || (num >= field[2] && num <= field[3])
  );
}

function part2(input) {
  const { info, myticket, yourtickets } = parse(input);
  const goodtickets = [myticket];
  for (const ticket of yourtickets) {
    let valid = true;
    for (const num of ticket) {
      let anyvalid = false;
      for (const field of info.values())
        if (isValid(num, field)) anyvalid = true;
      if (!anyvalid) valid = false;
    }
    if (valid) goodtickets.push(ticket);
  }

  const fields = new Map();
  while (fields.size < info.size) {
    for (let i = 0; i < info.size; i++) {
      let working = [...info.keys()].filter((i) => !fields.has(i));
      for (const ticket of goodtickets) {
        working = working.filter((name) => isValid(ticket[i], info.get(name)));
      }
      if (working.length === 1) fields.set(working[0], i);
    }
  }
  let prod = 1;
  for (const [field, idx] of fields) {
    if (field.startsWith("departure")) prod *= myticket[idx];
  }
  return prod;
}

export default [part1, part2];
