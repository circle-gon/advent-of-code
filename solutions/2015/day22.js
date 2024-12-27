function parse(input) {
  return input.split("\n").map((i) => Number(i.split(": ")[1]));
}

// This is so spaghetti but who cares
function simulate(
  p2,
  mana,
  spmana,
  mmana,
  health,
  bhealth,
  bdmg,
  turn,
  sturn,
  pturn,
  rturn
) {
  if (spmana > mmana) return mmana;
  if (mana < 0) return Infinity;
  if (p2) health--;
  if (health <= 0) return Infinity;
  if (pturn > 0) {
    pturn--;
    bhealth -= 3;
  }
  if (rturn > 0) {
    mana += 101;
    rturn--;
  }
  if (bhealth <= 0) return spmana;

  if (turn) {
    let min = mmana;
    if (sturn > 0) sturn--;
    if (mana < 53) return Infinity;
    if (mana >= 53)
      min = Math.min(
        min,
        simulate(
          p2,
          mana - 53,
          spmana + 53,
          min,
          health,
          bhealth - 4,
          bdmg,
          false,
          sturn,
          pturn,
          rturn
        )
      );

    if (mana >= 73)
      min = Math.min(
        min,
        simulate(
          p2,
          mana - 73,
          spmana + 73,
          min,
          health + 2,
          bhealth - 2,
          bdmg,
          false,
          sturn,
          pturn,
          rturn
        )
      );

    if (mana >= 113 && sturn === 0)
      min = Math.min(
        min,
        simulate(
          p2,
          mana - 113,
          spmana + 113,
          min,
          health,
          bhealth,
          bdmg,
          false,
          6,
          pturn,
          rturn
        )
      );

    if (mana >= 173 && pturn === 0)
      min = Math.min(
        min,
        simulate(
          p2,
          mana - 173,
          spmana + 173,
          min,
          health,
          bhealth,
          bdmg,
          false,
          sturn,
          6,
          rturn
        )
      );

    if (mana >= 229 && rturn === 0)
      min = Math.min(
        min,
        simulate(
          p2,
          mana - 229,
          spmana + 229,
          min,
          health,
          bhealth,
          bdmg,
          false,
          sturn,
          pturn,
          5
        )
      );

    return min;
  }
  let dmg = bdmg;
  if (sturn > 0) {
    dmg -= 7;
    sturn--;
  }
  return simulate(
    p2,
    mana,
    spmana,
    mmana,
    health - dmg,
    bhealth,
    bdmg,
    true,
    sturn,
    pturn,
    rturn
  );
}

function run(input, part2) {
  const [hp, dmg] = parse(input);
  return simulate(part2, 500, 0, Infinity, 50, hp, dmg, true, 0, 0, 0);
}

function part1(input) {
  return run(input, false);
}

function part2(input) {
  return run(input, true);
}

export default [part1, part2];
