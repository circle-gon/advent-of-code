import { md5 } from "/externals.js";

function crack(echo, input, start, end) {
  const out = [];
  for (let i = start; i < end; i++) {
    const hash = md5(input + i.toString());
    if (hash.startsWith("00000")) out.push([i, hash[5], hash[6]]);
  }
  return [echo, out];
}

self.addEventListener("message", (e) => {
  self.postMessage(crack(...e.data));
});
