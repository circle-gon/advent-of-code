function parse(input) {
  return input.split("\n");
}

const KEYPAD = ["123", "456", "789"];
function part1(input) {
  const instructions = parse(input);
  let code = "";
  let x = 1,
    y = 1;

  for (const line of instructions) {
    for (const instr of line) {
      if (instr === "U" && y > 0) y--;
      else if (instr === "D" && y < 2) y++;
      else if (instr === "L" && x > 0) x--;
      else if (instr === "R" && x < 2) x++;
    }
    code += KEYPAD[y][x];
  }
  return code;
}

const KEYPAD2 = ["  1  ", " 234 ", "56789", " ABC ", "  D  "];
function can(x, y) {
  return Math.abs(x - 2) + Math.abs(y - 2) <= 2;
}

function part2(input) {
  const instructions = parse(input);
  let code = "";
  let x = 0,
    y = 2;

  for (const line of instructions) {
    for (const instr of line) {
      if (instr === "U" && can(x, y - 1)) y--;
      else if (instr === "D" && can(x, y + 1)) y++;
      else if (instr === "L" && can(x - 1, y)) x--;
      else if (instr === "R" && can(x + 1, y)) x++;
    }
    code += KEYPAD2[y][x];
  }
  return code;
}

export default [part1, part2];
