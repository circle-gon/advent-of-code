/* global WabtModule */

const WORKERS = {};
function createWorkerFor(type, ind) {
  const w = WORKERS[type] ?? (WORKERS[type] = []);
  while (ind >= w.length)
    w.push(
      new Worker(type, {
        type: "module",
      })
    );
  return w[ind];
}

export function getWorkerFor(type) {
  return (ind) => [buster++, createWorkerFor(type, ind)];
}

let buster = 0;
export function spawnWorkerFor(type) {
  return (msg, ind, update) => {
    return new Promise((r) => {
      const [echo, f] = getWorkerFor(type)(ind);
      f.postMessage([echo, msg]);

      // this is the RESULT!
      const fn = (e) => {
        const data = e.data;
        if (data.data[0] !== echo) return;
        switch (data.type) {
          case "done":
            f.removeEventListener("message", fn);
            r(data.data[1]);
            break;
          case "msg":
            update(data.data[1]);
            break;
        }
      };
      f.addEventListener("message", fn);
    });
  };
}

export function format(num) {
  return num.toLocaleString("en-US");
}

export function formatTime(offset) {
  const duration = (performance.now() - offset) / 1000;
  return duration >= 1
    ? `${duration.toFixed(2)}s`
    : `${(duration * 1000).toFixed(2)}ms`;
}

export const AOC = Object.freeze({
  days: 25,
  parts: 2,
});

export const wabt = WabtModule();
export async function compile(wat, deps) {
  const buffer = (await wabt)
    .parseWat("", wat, {
      multi_memory: true,
    })
    .toBinary({}).buffer;
  const memory = new WebAssembly.Memory({
    initial: 1,
  });
  const depsFinal = {
    js: {
      raw: memory,
      ...deps,
    },
  };

  return {
    module: (await WebAssembly.instantiate(buffer, depsFinal)).instance.exports,
    memory,
  };
}

export function memstr(str, mem) {
  const zeroed = str + "\0"; // Add a 0x00 byte at the end for consistency
  const out = new TextEncoder().encodeInto(zeroed, new Uint8Array(mem.buffer));
  if (out.read < zeroed.length)
    throw new TypeError("Bad string or buffer length needs to be increased");
}
