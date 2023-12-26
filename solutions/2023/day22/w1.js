import { hash, fall } from "./shared.js"

function solve(blocks) {
  fall(blocks);

  let valid = 0;

  for (let i = 0; i < blocks.length; i++) {
    // Try removing it and falling
    const clone = structuredClone(blocks);
    clone.splice(i, 1);

    const orig = hash(clone);
    fall(clone);

    if (hash(clone) === orig) valid++;
    
    if (i % 10 === 9) {
      self.postMessage({
        type: "msg"
      })
    }
  }
  
  return valid
}

self.addEventListener("message", e => {
  self.postMessage({
    type: "done",
    data: solve(e.data)
  })
})