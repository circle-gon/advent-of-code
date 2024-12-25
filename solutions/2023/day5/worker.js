import { mapTo } from "./shared.js";

function computeSolution(low, count, headers) {
  let lowestLoc = Infinity;
  for (let i = 0; i < count; i++) {
    const loc = headers.reduce(
      (num, replacer) => mapTo(num, replacer),
      low + i
    );
    lowestLoc = Math.min(lowestLoc, loc);
  }
  return lowestLoc;
}


self.addEventListener("message", (e) => {
  const [echo, data] = e.data
  const result = computeSolution(...data)
  
  self.postMessage({
    type: "msg",
    data: [echo]
  })
  
  self.postMessage({
    type: "done",
    data: [echo, result],
  });
});
