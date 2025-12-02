const WORKERS = {};
function createWorkerFor(type, ind) {
  const w = WORKERS[type] ?? (WORKERS[type] = []);
  while (ind >= w.length)
    w.push(
      new Worker(type, {
        type: "module",
      }),
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
  return num.toLocaleString(undefined);
}

const formatter = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});
export function formatTime(offset) {
  const duration = (performance.now() - offset) / 1000;
  return duration >= 1
    ? `${formatter.format(duration)}s`
    : `${formatter.format(duration * 1000)}ms`;
}

export const AOC = Object.freeze({
  getDays(year) {
    if (Number(year) >= 2025) return 12;
    return 25;
  },
  parts: 2,
});

let wabt;
function getWabt() {
  if (!wabt)
    wabt = new Promise((r) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/wabt@1.0.36/index.js";
      script.addEventListener("load", async () => {
        r(await WabtModule());
      });
      document.body.append(script);
    });
  return wabt;
}

export async function compileWasm(wasm, deps) {
  const memory = new WebAssembly.Memory({
    initial: 1,
  });
  const depsFinal = {
    js: {
      raw: memory,
      log(...args) {
        console.log(...args);
      },
      debugger() {
        // eslint-disable-next-line no-debugger
        debugger;
      },
      ...deps,
    },
  };

  return {
    module: (await WebAssembly.instantiate(wasm, depsFinal)).instance.exports,
    memory,
  };
}
export async function compile(wat, deps) {
  const buffer = (await getWabt())
    .parseWat("", wat, {
      multi_memory: true,
    })
    .toBinary({}).buffer;
  return compileWasm(buffer, deps);
}

export function memstr(str, mem) {
  const zeroed = str + "\0"; // Add a 0x00 byte at the end for consistency
  const out = new TextEncoder().encodeInto(zeroed, new Uint8Array(mem.buffer));
  if (out.read < zeroed.length)
    throw new TypeError("Bad string or buffer length needs to be increased");
}
