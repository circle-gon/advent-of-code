function parse(input) {
  const lines = [];
  for (const line of input.split("\n")) {
    const [foods, allergens] = line.split(" (");
    const left = new Set(foods.split(" "));
    const right = new Set(allergens.slice(9, -1).split(", "));
    lines.push([left, right]);
  }
  return lines;
}

function part1(input) {
  const lines = parse(input);
  const seenIngredients = new Set();
  let allAllergens = new Set();
  for (const [, allergen] of lines) {
    allAllergens = allAllergens.union(allergen);
  }
  while (true) {
    const toRemove = new Set();
    for (const allergen of allAllergens) {
      let choose = null;
      for (const [ingred, aller] of lines) {
        if (aller.has(allergen)) {
          if (choose === null) choose = ingred.difference(seenIngredients);
          else choose = choose.intersection(ingred.difference(seenIngredients));
        }
      }
      if (choose !== null && choose.size === 1) {
        seenIngredients.add([...choose][0]);
        toRemove.add(allergen);
      }
    }
    allAllergens = allAllergens.difference(toRemove);
    if (toRemove.size === 0) break;
  }
  let count = 0;
  for (const line of lines) {
    count += line[0].difference(seenIngredients).size;
  }
  return count;
}

function part2(input) {
  const lines = parse(input);
  const seenIngredients = new Set();
  let allAllergens = new Set();
  for (const [, allergen] of lines) {
    allAllergens = allAllergens.union(allergen);
  }
  const ingredientMappings = [];
  while (true) {
    const toRemove = new Set();
    for (const allergen of allAllergens) {
      let choose = null;
      for (const [ingred, aller] of lines) {
        if (aller.has(allergen)) {
          if (choose === null) choose = ingred.difference(seenIngredients);
          else choose = choose.intersection(ingred.difference(seenIngredients));
        }
      }
      if (choose !== null && choose.size === 1) {
        const ingred = [...choose][0];
        seenIngredients.add(ingred);
        toRemove.add(allergen);
        ingredientMappings.push([ingred, allergen]);
      }
    }
    allAllergens = allAllergens.difference(toRemove);
    if (toRemove.size === 0) break;
  }
  return ingredientMappings
    .sort((a, b) => a[1].localeCompare(b[1]))
    .map((i) => i[0])
    .join(",");
}

export default [part1, part2];
