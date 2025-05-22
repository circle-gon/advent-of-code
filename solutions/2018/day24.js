function parse(input) {
  const system = input.split("\n\n").map((i) => i.split("\n").slice(1));
  const units = [[], []];
  for (const [idx, lines] of system.entries()) {
    for (const line of lines) {
      const point = line.indexOf("points");
      const preamble = line.slice(0, point + 6).split(" ");
      const post = line.slice(point + 7);
      const end = post.indexOf(")");
      const info = (end !== -1 ? post.slice(1, end) : "").split("; ");
      const postamble = (end !== -1 ? post.slice(end + 2) : post).split(" ");

      const count = Number(preamble[0]);
      const points = Number(preamble[4]);
      const types = {
        immune: [],
        weak: [],
      };

      for (const type of info) {
        if (type === "") continue;
        const id = type.split(" ");
        const t = id[0];
        const options = id.slice(2).join(" ").split(", ");
        types[t].push(...options);
      }

      const attack = Number(postamble[5]);
      const type = postamble[6];
      const initiative = Number(postamble[10]);
      units[idx].push({
        count,
        points,
        ...types,
        type,
        attack,
        initiative,
        group: idx,
        target: null,
        chosen: false,
      });
    }
  }
  return units;
}

function getEffDamage(unit, attack, type) {
  if (unit.immune.includes(type)) return 0;
  if (unit.weak.includes(type)) return attack * 2;
  return attack;
}

function effPower(unit) {
  return unit.count * unit.attack;
}

function runCombat(units) {
  while (units.every((i) => i.length > 0)) {
    const order = units.flat().sort((a, b) => {
      const powdiff = effPower(b) - effPower(a);
      if (powdiff !== 0) return powdiff;
      return b.initiative - a.initiative;
    });
    const order2 = units.flat().sort((a, b) => b.initiative - a.initiative);

    for (const unit of order) {
      const targets = units[(unit.group + 1) % 2];
      const dmg = effPower(unit);
      let cho = null;

      for (const target of targets) {
        if (target.chosen) continue;

        const attacked = getEffDamage(target, dmg, unit.type);
        const prev = cho === null ? 0 : getEffDamage(cho, dmg, unit.type);
        const powA = effPower(target);
        const powB = cho === null ? 0 : effPower(cho);

        if (
          attacked > 0 &&
          (cho === null ||
            attacked > prev ||
            (attacked === prev && powA > powB) ||
            (attacked === prev &&
              powA === powB &&
              target.initiative > cho.initative))
        ) {
          cho = target;
        }
      }

      if (cho) {
        unit.target = cho;
        cho.chosen = true;
      } else unit.target = null;
    }

    let attacked = false;
    for (const unit of order2) {
      if (unit.count <= 0) continue;

      if (unit.target !== null) {
        const attack = effPower(unit);
        const dmg = getEffDamage(unit.target, attack, unit.type);
        const lostUnits = Math.floor(dmg / unit.target.points);
        unit.target.count -= lostUnits;
        if (lostUnits > 0) attacked = true;
      }
    }

    for (let i = 0; i < units.length; i++) {
      const out = [];
      for (const unit of units[i]) {
        if (unit.count > 0) {
          unit.chosen = false;
          out.push(unit);
        }
      }
      units[i] = out;
    }

    if (!attacked) return [0, 0];
  }

  return [units[0].length, units.flat().reduce((a, b) => a + b.count, 0)];
}

function clone(units, attackBoost) {
  const out = [];
  for (const unit of units) {
    const dir = [];
    for (const thing of unit) {
      const obj = { ...thing };
      if (thing.group === 0) obj.attack += attackBoost;
      dir.push(obj);
    }
    out.push(dir);
  }
  return out;
}

function part1(input) {
  return runCombat(parse(input))[1];
}

function part2(input) {
  const units = parse(input);
  let first = 1,
    last = 10000;

  while (first <= last) {
    const boost = Math.floor((first + last) / 2);
    const test = runCombat(clone(units, boost));
    if (test[0] > 0) last = boost - 1;
    else first = boost + 1;
  }

  return runCombat(clone(units, first))[1];
}

export default [part1, part2];
