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
