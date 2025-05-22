self.addEventListener("message", (e) => {
  const echo = e.data[0];
  const result = Function("echo", e.data[1])(echo);
  self.postMessage({
    type: "done",
    data: [echo, result],
  });
});
