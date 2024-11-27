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

export function spawnWorkerFor(type) {
  return (msg, ind, update) => {
    return new Promise((r) => {
      const f = createWorkerFor(type, ind);
      f.postMessage(msg);

      // this is the RESULT!
      const fn = (e) => {
        const data = e.data;
        switch (data.type) {
          case "done":
            f.removeEventListener("message", fn);
            r(data.data);
            break;
          case "msg":
            update(data.data);
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

export const AOC = {
  days: 25,
  parts: 2,
}

let wabt
export async function compile(wat, deps) {
  // LAZY!!!!!
  if (!wabt) wabt = await WabtModule()
  
  const buffer = wabt.parseWat("", wat).toBinary({}).buffer
  return (await WebAssembly.instantiate(buffer, deps)).instance.exports
}