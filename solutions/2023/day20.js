function initialFor(prefix) {
  if (prefix === "") return {};
  if (prefix === "%") return { state: false };
  if (prefix === "&") return { pulseState: {} };
  throw new Error("WHAT");
}

function parse(input) {
  const modules = new Map();
  for (const line of input.split("\n")) {
    const [name, output] = line.split(" -> ");
    const outputTargets = output.split(", ");
    const prefix = name === "broadcaster" ? "" : name[0];
    const realName = name === "broadcaster" ? name : name.slice(1);
    modules.set(realName, {
      type: prefix,
      dest: outputTargets,
      ...initialFor(prefix),
    });
  }

  // Find the connected input modules
  for (const [name, module] of modules.entries()) {
    if (module.type !== "&") continue;
    // Find the outputs that connect to it
    for (const [outputName, outputModule] of modules.entries()) {
      if (outputModule.dest.includes(name))
        module.pulseState[outputName] = false;
    }
  }

  return modules;
}

function part1(input) {
  const modules = parse(input);

  let low = 0,
    high = 0;
  for (let i = 0; i < 1000; i++) {
    // Array<pulseSent, low/high, whoSentIt>
    const pulses = [["broadcaster", false, ""]];

    // 1 because the one sent to the broadcaster matters
    low += 1;

    function add(type) {
      if (type) high++;
      else low++;
    }

    while (pulses.length > 0) {
      const [name, type, sent] = pulses.shift();
      const module = modules.get(name);

      if (!module) continue;

      switch (module.type) {
        case "":
          // Send to all others
          for (const d of module.dest) {
            add(type);
            pulses.push([d, type, name]);
          }
          break;
        case "%":
          if (type === false) {
            for (const d of module.dest) {
              const h = !module.state;
              add(h);

              pulses.push([d, h, name]);
            }
            module.state = !module.state;
          }
          break;
        case "&":
          module.pulseState[sent] = type;
          const e = Object.values(module.pulseState).some((i) => i === false);
          for (const d of module.dest) {
            add(e);
            pulses.push([d, e, name]);
          }
          break;
      }
    }
  }

  return low * high;
}

function gcd(a, b) {
  let r = 0;
  while (b !== 0) {
    r = a % b;
    a = b;
    b = r;
  }
  return a;
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function sendsTo(modules, name) {
  return [...modules.entries()]
    .filter(([, md]) => md.dest.includes(name))
    .map(([name]) => name);
}

function part2(input) {
  const modules = parse(input);
  const emitter = sendsTo(modules, "rx")[0]

  // This only works because the final one that sends to rx is &
  // All the inputs for it are also &
  // So we take when they each send a high pulse and then take the LCM
  const requirements = sendsTo(modules, emitter)

  const times = Array(requirements.length).fill(0);

  let pushed = 0;

  while (times.some((i) => i === 0)) {
    pushed++;
    // Array<pulseSent, low/high, whoSentIt>
    const pulses = [["broadcaster", false, ""]];

    while (pulses.length > 0) {
      const [name, type, sent] = pulses.shift();
      const module = modules.get(name);

      if (!module) continue;

      switch (module.type) {
        case "":
          // Send to all others
          for (const d of module.dest) {
            pulses.push([d, type, name]);
          }
          break;
        case "%":
          if (type === false) {
            for (const d of module.dest) {
              const h = !module.state;
              pulses.push([d, h, name]);
            }
            module.state = !module.state;
          }
          break;
        case "&":
          module.pulseState[sent] = type;
          const e = Object.values(module.pulseState).some((i) => i === false);

          const idx = requirements.indexOf(name);
          if (idx !== -1 && e === true && times[idx] === 0) times[idx] = pushed;

          for (const d of module.dest) {
            pulses.push([d, e, name]);
          }
          break;
      }
    }
  }
  return times.reduce((a, b) => lcm(a, b));
}

export default [part1, part2]