import { getWorkerFor } from "/utils.js";
import worker from "./worker.js?worker&url";

const getWorker = getWorkerFor(worker);
const BATCH_SIZE = 100000;

async function useResults(input, callback) {
  const crackers = Array(navigator.hardwareConcurrency)
    .fill()
    .map((_, i) => getWorker(i));
  let i = 0;
  while (true) {
    const waiting = [];
    for (const [id, cracker] of crackers) {
      waiting.push(
        new Promise((r) => {
          cracker.postMessage([
            id,
            input,
            i * BATCH_SIZE,
            (i + 1) * BATCH_SIZE,
          ]);
          const listener = (e) => {
            const [echo, results] = e.data;
            if (echo !== id) return;
            r(results);
            cracker.removeEventListener("message", listener);
          };
          cracker.addEventListener("message", listener);
          i++;
        }),
      );
    }
    const results = await Promise.all(waiting);
    const out = [];
    for (const result of results) out.push(...result);

    const result = callback(out.sort((a, b) => a[0] - b[0]));
    if (result) return;
  }
}
async function part1(input, update) {
  let password = "";
  update(`(password: ${password.padEnd(8, "-")})`);

  await useResults(input, (out) => {
    password += out
      .sort((a, b) => a[0] - b[0])
      .map((i) => i[1])
      .join("");
    update(`(password: ${password.padEnd(8, "-")})`);
    return password.length >= 8;
  });
  // It's possible for password.length to be greater than 8
  return password.slice(0, 8);
}

async function part2(input, update) {
  const password = Array(8).fill("-");
  update(`(password: ${password.join("")})`);

  await useResults(input, (out) => {
    for (const [, loc, p] of out) {
      const l = Number(loc);
      if (Number.isNaN(l) || password[l] !== "-") continue;
      password[l] = p;
    }
    update(`(password: ${password.join("")})`);
    return password.every((i) => i !== "-");
  });
  return password.join("");
}

export default [part1, part2];
