function hash(text) {
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h += text.charCodeAt(i);
    h *= 17;
    h %= 256;
  }
  return h;
}

function part1(input) {
  const instructions = input.split(",");
  let sum = 0;
  for (const i of instructions) sum += hash(i);
  return sum;
}

function part2(input) {
  const instructions = input.split(",");
  const boxes = new Map();
  for (const i of instructions) {
    // Remove the label
    if (i.includes("-")) {
      const label = i.slice(0, -1);
      const h = hash(label);
      // Find the label in the boxes
      const box = boxes.get(h);
      if (!box) continue;
      const place = box.findIndex((b) => b[0] === label);
      if (place === -1) continue;
      box.splice(place, 1);
      if (box.length === 0) boxes.delete(h);
    } else {
      const parts = i.split("=");
      const label = parts[0],
        str = Number(parts[1]);
      const h = hash(label);
      if (!boxes.has(h)) boxes.set(h, []);
      const box = boxes.get(h);
      const idx = box.findIndex((b) => b[0] === label);
      if (idx !== -1) {
        box[idx] = [label, str];
      } else {
        box.push([label, str]);
      }
    }
  }

  let sum = 0;
  for (const [boxNumber, box] of boxes.entries()) {
    for (const [slot, lens] of box.entries()) {
      sum += (boxNumber + 1) * (slot + 1) * lens[1];
    }
  }

  return sum;
}

export default [part1, part2]