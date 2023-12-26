function part1(input) {
  let sum = 0;
  for (const game of input.split("\n")) {
    const g = game.match(/Game (\d+): /);
    // Game <number> :
    const toSkip = String(g[1]).length + 7;
    const left = game.slice(toSkip);

    let gameImpossible = false;
    for (const part of left.split(";")) {
      for (const thing of part.split(",")) {
        // ; could leave a space
        const f = thing.trim().split(" ");
        const num = Number(f[0]);
        const type = f[1];
        switch (type) {
          case "red":
            if (num > 12) gameImpossible = true;
            break;
          case "green":
            if (num > 13) gameImpossible = true;
            break;
          case "blue":
            if (num > 14) gameImpossible = true;
            break;
        }
        if (gameImpossible) break;
      }
      if (gameImpossible) break;
    }
    if (!gameImpossible) sum += Number(g[1]);
  }
  return sum;
}

function part2(input) {
  let sum = 0;
  for (const game of input.split("\n")) {
    let red = 0,
      green = 0,
      blue = 0;
    const g = game.match(/Game (\d+): /);
    // Game <number> :
    const toSkip = String(g[1]).length + 7;
    const left = game.slice(toSkip);

    for (const part of left.split(";")) {
      for (const thing of part.split(",")) {
        // ; could leave a space
        const f = thing.trim().split(" ");
        const num = Number(f[0]);
        const type = f[1];
        switch (type) {
          case "red":
            red = Math.max(num, red);
            break;
          case "green":
            green = Math.max(num, green);
            break;
          case "blue":
            blue = Math.max(num, blue);
            break;
        }
      }
    }
    sum += red * green * blue;
  }
  return sum;
}

export default [part1, part2]