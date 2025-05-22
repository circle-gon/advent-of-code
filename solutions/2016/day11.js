import { Queue } from "/externals.js";

function parse(input) {
  const things = [];
  for (const line of input.split("\n")) {
    const items = {
      gen: new Set(),
      mc: new Set(),
    };
    let entries = line.slice(line.indexOf("contains") + 9, -1).split(", ");
    if (entries.length === 1) entries = entries[0].split(" and ");
    if (entries[0] !== "nothing relevant") {
      for (const entry of entries) {
        let name, type;
        const e = entry.split(" ");
        if (e.length === 4) {
          name = e[2];
          type = e[3];
        } else {
          name = e[1];
          type = e[2];
        }
        if (type === "generator") items.gen.add(name);
        else items.mc.add(name.split("-")[0]);
      }
    }
    things.push(items);
  }
  return things;
}

function hash(floors, floor) {
  let h = "";
  for (const floor of floors) {
    const same = floor.gen.intersection(floor.mc);
    const one = floor.gen.difference(same).size;
    const two = floor.mc.difference(same).size;
    h += `${same.size}s${one}g${two}mc,`;
  }
  return h + ";" + floor;
}

function clone(floors) {
  const out = [];
  for (const floor of floors) {
    out.push({
      gen: new Set(floor.gen),
      mc: new Set(floor.mc),
    });
  }
  return out;
}

function prepareNext(floors, currentFloor, nextFloor, item, item2) {
  const next = clone(floors);
  next[nextFloor][item.type].add(item.name);
  next[nextFloor][item2.type].add(item2.name);
  next[currentFloor][item.type].delete(item.name);
  next[currentFloor][item2.type].delete(item2.name);
  return next;
}

function run(floors) {
  const choices = new Queue();
  const cache = new Set();

  choices.push([floors, 0, 0]);
  while (choices.length > 0) {
    const [floors, floor, dist] = choices.pop();

    if (
      !floors.every(
        (floor) => floor.gen.size === 0 || floor.mc.isSubsetOf(floor.gen),
      )
    )
      continue;

    if (floors.slice(0, -1).every((i) => i.gen.size === 0 && i.mc.size === 0)) {
      return dist;
    }

    const h = hash(floors, floor);
    if (cache.has(h)) continue;
    cache.add(h);

    // Choose an item
    const allItems = [
      ...[...floors[floor].gen].map((i) => ({
        name: i,
        type: "gen",
      })),
      ...[...floors[floor].mc].map((i) => ({
        name: i,
        type: "mc",
      })),
    ];
    for (const item of allItems) {
      for (const item2 of allItems) {
        // Choose a destination
        if (floor > 0) {
          const next = prepareNext(floors, floor, floor - 1, item, item2);
          choices.push([next, floor - 1, dist + 1]);
        }
        if (floor < floors.length - 1) {
          const next = prepareNext(floors, floor, floor + 1, item, item2);
          choices.push([next, floor + 1, dist + 1]);
        }
      }
    }
  }
  return "Is your input malformed?";
}

function part1(input) {
  return run(parse(input));
}

function part2(input) {
  const stuff = parse(input);
  stuff[0].gen.add("elerium");
  stuff[0].gen.add("dilithium");
  stuff[0].mc.add("elerium");
  stuff[0].mc.add("dilithium");
  return run(stuff);
}

export default [part1, part2];
