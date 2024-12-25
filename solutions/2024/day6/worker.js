import { valid } from "./shared.js";

function computeSolution(echo, parsed) {
  let iters = 0;
  let count = 0;
  const base = valid(parsed);

  for (const item of base) {
    const [x, y] = item;
    iters++;
    if (iters % 1000 === 0)
      self.postMessage({
        type: "msg",
        data: [echo]
      });

    if (parsed[y][x] === ".") {
      parsed[y][x] = "#";
      if (valid(parsed) === 0) count++;
      parsed[y][x] = ".";
    }
  }

  return [echo, count];
}

self.addEventListener("message", (e) => {
  self.postMessage({
    type: "done",
    data: computeSolution(...e.data),
  });
});
