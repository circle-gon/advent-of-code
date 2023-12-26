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
  const result = computeSolution(...e.data)
  
  self.postMessage({
    type: "msg"
  })
  
  self.postMessage({
    type: "done",
    data: result,
  });
});
