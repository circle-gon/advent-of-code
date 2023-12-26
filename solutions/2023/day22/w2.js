import { hash, fall } from "./shared.js"

function solve(blocks) {
  fall(blocks);

  let total = 0;

  for (let i = 0; i < blocks.length; i++) {
    // Try removing it and falling
    const clone = structuredClone(blocks);
    const [removed] = clone.splice(i, 1);
    fall(clone);
    
    // Put it back in
    clone.splice(i, 0, removed)
    
    // See how many fell
    for (let j = 0; j < blocks.length; j++) {
      if (clone[j][2][0] !== blocks[j][2][0]) total++
    }
    
    if (i % 10 === 9) {
      self.postMessage({
        type: "msg"
      })
    }
  }
  
  return total
}

self.addEventListener("message", e => {
  self.postMessage({
    type: "done",
    data: solve(e.data)
  })
})