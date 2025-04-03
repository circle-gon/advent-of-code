function parse(input) {
  const rooms = [];
  for (const line of input.split("\n")) {
    const letters = line.split("-");
    const name = letters.slice(0, -1);
    const meta = letters.at(-1);
    const [id, checksum] = meta.slice(0, -1).split("[");
    rooms.push([name, Number(id), checksum]);
  }
  return rooms;
}

function add(map, num) {
  map.set(num, (map.get(num) ?? 0) + 1);
}

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

function part1(input) {
  const rooms = parse(input);
  let ids = 0;
  for (const [names, id, checksum] of rooms) {
    const map = new Map();
    for (const name of names) {
      for (const char of name) add(map, char);
    }
    const entries = [...map.entries()]
      .sort((a, b) => {
        if (a[1] > b[1]) return -1;
        if (a[1] < b[1]) return 1;
        return a[0].charCodeAt(0) - b[0].charCodeAt(0);
      })
      .slice(0, 5)
      .map((i) => i[0])
      .join("");
    if (entries === checksum) ids += id;
  }
  return ids;
}

function part2(input) {
  const rooms = parse(input);
  for (const [names, id, checksum] of rooms) {
    const map = new Map();
    for (const name of names) {
      for (const char of name) add(map, char);
    }
    const entries = [...map.entries()]
      .sort((a, b) => {
        if (a[1] > b[1]) return -1;
        if (a[1] < b[1]) return 1;
        return a[0].charCodeAt(0) - b[0].charCodeAt(0);
      })
      .slice(0, 5)
      .map((i) => i[0])
      .join("");
    if (entries === checksum) {
      let out = "";
      for (const name of names) {
        for (const char of name)
          out += ALPHABET[(ALPHABET.indexOf(char) + id) % ALPHABET.length];
      }
      if (out.includes("northpole")) return id;
    }
  }
  return "Is your input malformed?";
}

export default [part1, part2];
