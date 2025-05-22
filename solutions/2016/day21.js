function parse(input) {
  const instrs = [];
  for (const line of input.split("\n")) {
    const body = line.split(" ");
    if (body[0] === "swap") {
      if (body[1] === "position")
        instrs.push(["swappos", Number(body[2]), Number(body[5])]);
      else instrs.push(["swaplet", body[2], body[5]]);
    } else if (body[0] === "rotate") {
      if (body[1] === "based") instrs.push(["rotbase", body[6]]);
      else instrs.push(["rot", body[1], Number(body[2])]);
    } else if (body[0] === "reverse") {
      instrs.push(["rev", Number(body[2]), Number(body[4])]);
    } else if (body[0] === "move") {
      instrs.push(["move", Number(body[2]), Number(body[5])]);
    }
  }
  return instrs;
}

function part1(input, _, example) {
  const instrs = parse(input);
  let str = (example ? "abcde" : "abcdefgh").split("");
  for (const instr of instrs) {
    switch (instr[0]) {
      case "swappos":
        [str[instr[1]], str[instr[2]]] = [str[instr[2]], str[instr[1]]];
        break;
      case "swaplet":
        str = str.map((i) =>
          i === instr[1] ? instr[2] : i === instr[2] ? instr[1] : i,
        );
        break;
      case "rot":
        if (instr[1] === "right")
          str = [...str.slice(-instr[2]), ...str.slice(0, -instr[2])];
        else str = [...str.slice(instr[2]), ...str.slice(0, instr[2])];
        break;
      case "rotbase": {
        const idx = str.indexOf(instr[1]);
        const rot = (1 + idx + (idx >= 4 ? 1 : 0)) % str.length;
        str = [...str.slice(-rot), ...str.slice(0, -rot)];
        break;
      }
      case "rev":
        str = [
          ...str.slice(0, instr[1]),
          ...str.slice(instr[1], instr[2] + 1).reverse(),
          ...str.slice(instr[2] + 1),
        ];
        break;
      case "move": {
        const letter = str.splice(instr[1], 1)[0];
        str.splice(instr[2], 0, letter);
        break;
      }
    }
  }
  return str.join("");
}

function part2(input, _, example) {
  const instrs = parse(input).reverse();
  let str = (example ? "decab" : "fbgdceah").split("");
  for (const instr of instrs) {
    switch (instr[0]) {
      case "swappos":
        [str[instr[1]], str[instr[2]]] = [str[instr[2]], str[instr[1]]];
        break;
      case "swaplet":
        str = str.map((i) =>
          i === instr[1] ? instr[2] : i === instr[2] ? instr[1] : i,
        );
        break;
      case "rot":
        if (instr[1] === "left")
          str = [...str.slice(-instr[2]), ...str.slice(0, -instr[2])];
        else str = [...str.slice(instr[2]), ...str.slice(0, instr[2])];
        break;
      case "rotbase": {
        // Guess the rotation
        let works = false;
        for (let rot = 0; rot < str.length; rot++) {
          const see = [...str.slice(rot), ...str.slice(0, rot)];
          // Check if this is correct
          const idx = see.indexOf(instr[1]);
          const rotNext = (1 + idx + (idx >= 4 ? 1 : 0)) % str.length;
          // Scramble it out
          const result = [...see.slice(-rotNext), ...see.slice(0, -rotNext)];
          if (result.every((i, j) => i === str[j])) {
            str = see;
            works = true;
            break;
          }
        }
        if (!works) throw new Error("Something bad happened?");
        break;
      }
      case "rev":
        str = [
          ...str.slice(0, instr[1]),
          ...str.slice(instr[1], instr[2] + 1).reverse(),
          ...str.slice(instr[2] + 1),
        ];
        break;
      case "move": {
        const letter = str.splice(instr[2], 1)[0];
        str.splice(instr[1], 0, letter);
        break;
      }
    }
  }
  return str.join("");
}

export default [part1, part2];
