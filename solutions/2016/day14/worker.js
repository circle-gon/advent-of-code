import { run } from "./shared.js";

function crack(echo, input) {
  return [
    echo,
    run(input, 2016, (idx, hashes) => {
      self.postMessage({
        type: "msg",
        data: [echo, [idx, hashes]],
      });
    }),
  ];
}

self.addEventListener("message", (e) => {
  self.postMessage({
    type: "done",
    data: crack(...e.data),
  });
});
