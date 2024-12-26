import data from "./solutions/data.js";
import { format, AOC, formatTime } from "./utils.js";

const yearSelector = document.getElementById("year");
const daySelector = document.getElementById("day");
const partSelector = document.getElementById("part");
const inputFile = document.getElementById("input-file");
const fileUpload = document.getElementById("file-upload");
const errorDiv = document.getElementById("error");
const dataInput = document.getElementById("data");
const runBtn = document.getElementById("run");
const runexBtn = document.getElementById("runex");
const runallBtn = document.getElementById("runall");
const runexallBtn = document.getElementById("runexall");
const resultSpan = document.getElementById("result");
const timeSpan = document.getElementById("time");
const updateSpan = document.getElementById("update");
const multiTable = document.getElementById("multi");
const tableHeader = document.getElementById("title");
const tableContents = document.getElementById("stuff");

const keys = Object.keys(data);
function createDefault() {
  const toSave = {
    year: keys.at(-1),
    yearData: {},
  };

  for (const year of keys) {
    toSave.yearData[year] = {
      day: 0,
      dayData: Array(AOC.days)
        .fill()
        .map(() => ({
          input: "",
          part: 0,
        })),
    };
  }

  return toSave;
}

const toSave = createDefault();

function save() {
  localStorage.setItem("data", JSON.stringify(toSave));
}
function load() {
  const load = JSON.parse(localStorage.getItem("data"));
  if (load !== null) {
    // Don't assign directly because we need to make sure new years get filled in instead of replaced
    toSave.year = load.year;
    Object.assign(toSave.yearData, load.yearData);
  }

  for (const option of yearSelector.options)
    if (option.innerText === toSave.year) option.selected = true;

  loadYear();
}

function loadYear() {
  daySelector.textContent = "";
  for (let i = 1; i <= AOC.days; i++) {
    const select = document.createElement("option");
    const d = data[toSave.year][i - 1];
    select.innerText = `day ${i} (${d.name})${d.special ? " (slow)" : ""}`;
    daySelector.append(select);
  }

  daySelector.selectedIndex = getDay();
  loadDay();
}

function loadDay() {
  const data = forDay();
  dataInput.value = data.input;
  partSelector.selectedIndex = data.part;
}

function getDay() {
  return toSave.yearData[toSave.year].day;
}

function forDay() {
  const data = toSave.yearData[toSave.year];
  return data.dayData[data.day];
}

async function getSolution(day) {
  try {
    return (
      await import(
        `./solutions/${toSave.year}/day${day + 1}${
          data[toSave.year][day].special ? "/main" : ""
        }.js`
      )
    ).default;
  } catch (e) {
    // It's not possible to differentiate between non-existant module and syntax error, so log it just in case
    console.error(e);
  }
}

function wait() {
  return new Promise((r) => setTimeout(r, 0));
}

const tableElements = Array(AOC.days * AOC.parts)
  .fill()
  .map(() => []);

const SCALE = 2;
function setupTable() {
  multiTable.style.display = "none";
  for (let i = 0; i < Math.ceil(AOC.days / SCALE); i++) {
    const row = document.createElement("tr");
    const d = Math.max(Math.min(AOC.days - SCALE * i, SCALE), 0);
    for (let l = 0; l < d; l++) {
      const ele = document.createElement("td");
      const day = SCALE * i + l;
      ele.innerText = day + 1;
      row.append(ele);
      for (let j = 0; j < AOC.parts; j++) {
        for (let k = 0; k < 4; k++) {
          const ele = document.createElement("td");
          ele.innerText = k === 0 ? j + 1 : "";
          row.append(ele);
          if (k > 0) tableElements[AOC.parts * day + j].push(ele);
        }
      }
    }
    tableContents.append(row);
  }
}

function clearTable() {
  for (let i = 0; i < AOC.days; i++) {
    for (let j = 0; j < AOC.parts; j++) {
      const thing = tableElements[i * AOC.parts + j];
      for (const t of thing) t.innerText = "";
    }
  }
}

function main() {
  for (const year of keys) {
    const select = document.createElement("option");
    select.innerText = year;
    yearSelector.append(select);
  }

  for (let i = 1; i <= AOC.parts; i++) {
    const select = document.createElement("option");
    select.innerText = `part ${i}`;
    partSelector.append(select);
  }

  fileUpload.addEventListener("click", () => inputFile.click());
  inputFile.addEventListener("change", async () => {
    const file = inputFile.files[0];
    if (file) {
      errorDiv.innerText = "";

      const data = await file.text();
      forDay().input = data;
      dataInput.value = data;

      save();
    } else errorDiv.innerText = "No file chosen!";
  });

  dataInput.addEventListener("change", () => {
    forDay().input = dataInput.value;
    save();
  });

  runBtn.addEventListener("click", async () => {
    if (dataInput.value !== "") {
      errorDiv.innerText = "";
      resultSpan.innerText = "Generating solution...";
      resultSpan.className = "maybe";
      timeSpan.className = "maybe";
      timeSpan.innerText = "???";
      runBtn.disabled = true;
      runexBtn.disabled = true;
      runallBtn.disabled = true;
      runexallBtn.disabled = true;
      multiTable.style.display = "none";
      await wait();

      let solution;
      let name;
      const start = performance.now();

      try {
        const solver = (await getSolution(getDay()))?.[forDay().part];
        if (solver) {
          solution = await solver(
            forDay().input.trim(),
            (value) => (updateSpan.innerText = value),
            false
          );
          name = "success";
        } else {
          solution = "No solution created";
          name = "skipped";
        }
      } catch (e) {
        solution = "Failed to get a result";
        name = "failed";
        console.error(e);
      }

      const isNumber = typeof solution === "number";
      const isNumberLike = isNumber || typeof solution === "bigint";

      if (isNumber && solution > Number.MAX_SAFE_INTEGER) {
        errorDiv.innerText =
          "The answer is beyond the precision limit, so it is most likely wrong.";
        name = "failed";
      }

      timeSpan.innerText = formatTime(start);
      resultSpan.innerText = `${solution}${
        isNumberLike && solution >= 1000 ? ` (${format(solution)})` : ""
      }`;
      resultSpan.className = name;
      timeSpan.className = name;
      updateSpan.innerText = "";
      runBtn.disabled = false;
      runexBtn.disabled = false;
      runallBtn.disabled = false;
      runexallBtn.disabled = false;
    } else {
      errorDiv.innerText = "No problem data.";
      resultSpan.innerText = "???";
      resultSpan.className = "skipped";
      timeSpan.className = "skipped";
      timeSpan.innerText = "???";
      updateSpan.innerText = "";
    }
  });

  runexBtn.addEventListener("click", async () => {
    errorDiv.innerText = "";
    resultSpan.innerText = "Checking...";
    resultSpan.className = "maybe";
    timeSpan.className = "maybe";
    timeSpan.innerText = "???";
    runBtn.disabled = true;
    runexBtn.disabled = true;
    runallBtn.disabled = true;
    runexallBtn.disabled = true;
    multiTable.style.display = "none";
    await wait();

    let solution;
    let name;
    const start = performance.now();

    try {
      const solver = (await getSolution(getDay()))?.[forDay().part];
      if (solver) {
        const inputs = data[toSave.year][getDay()].examples[forDay().part];
        for (const [input, expected] of inputs) {
          const result = await solver(
            input.trim(),
            (value) => (updateSpan.innerText = value),
            true
          );
          if (result !== expected) {
            console.error(
              "Example failed: got",
              result,
              "expected",
              expected,
              "for"
            );
            console.log(input);
            name = "failed";
            solution = "Examples failed";
          }
        }
        if (name !== "failed") {
          name = "success";
          solution = "Examples passed";
        }
      } else {
        solution = "No solution created";
        name = "skipped";
      }
    } catch (e) {
      solution = "Failed to test";
      name = "failed";
      console.error(e);
    }

    timeSpan.innerText = formatTime(start);
    resultSpan.innerText = solution;
    resultSpan.className = name;
    timeSpan.className = name;
    updateSpan.innerText = "";
    runBtn.disabled = false;
    runexBtn.disabled = false;
    runallBtn.disabled = false;
    runexallBtn.disabled = false;
  });

  runallBtn.addEventListener("click", async () => {
    errorDiv.innerText = "";
    resultSpan.innerText = "Generating solutions...";
    resultSpan.className = "maybe";
    timeSpan.className = "maybe";
    timeSpan.innerText = "???";
    runBtn.disabled = true;
    runexBtn.disabled = true;
    runallBtn.disabled = true;
    runexallBtn.disabled = true;
    multiTable.style.display = "block";
    tableHeader.innerText = toSave.year;
    clearTable();
    await wait();

    const globalStart = performance.now();
    const waiting = [];
    let failed = false;
    for (let i = 0; i < AOC.days; i++) {
      const input = toSave.yearData[toSave.year].dayData[i].input;
      const sols = (await getSolution(i)) ?? [];
      for (let j = 0; j < AOC.parts; j++) {
        const elements = tableElements[i * AOC.parts + j];
        const solver = sols[j];
        if (solver === undefined || input === "") {
          elements[0].innerText = `no ${solver ? "input" : "solution"}`;
          elements[1].innerText = "N/A";
          elements[2].innerText = "N/A";
          elements[0].className = "skipped";
          elements[1].className = "skipped";
          elements[2].className = "skipped";
          await wait();
        } else {
          elements[0].innerText = "running";
          elements[1].innerText = "...";
          elements[2].innerText = "...";
          elements[0].className = "maybe";
          elements[1].className = "maybe";
          elements[2].className = "maybe";
          await wait();

          const start = performance.now();
          waiting.push(
            new Promise((r) =>
              r(solver(input.trim(), (i) => (elements[1].innerText = i), false))
            )
              .then(async (r) => {
                elements[0].innerText = "done";
                elements[1].innerText = r;
                elements[2].innerText = formatTime(start);
                elements[0].className = "success";
                elements[1].className = "success";
                elements[2].className = "success";
                await wait();
              })
              .catch(async (e) => {
                elements[0].innerText = "failed";
                elements[1].innerText = "N/A";
                elements[2].innerText = formatTime(start);
                elements[0].className = "failed";
                elements[1].className = "failed";
                elements[2].className = "failed";
                failed = true;
                console.error(e);
                await wait();
              })
          );
        }
      }
    }
    await Promise.allSettled(waiting);

    timeSpan.innerText = formatTime(globalStart);
    resultSpan.innerText = `All problems done${failed ? " (some failed)" : ""}`;
    resultSpan.className = failed ? "failed" : "success";
    timeSpan.className = failed ? "failed" : "success";
    runBtn.disabled = false;
    runexBtn.disabled = false;
    runallBtn.disabled = false;
    runexallBtn.disabled = false;
  });

  runexallBtn.addEventListener("click", async () => {
    async function update() {
      updateSpan.innerText =
        checking.length > 0
          ? `(${checking
              .map(([a, b]) => `day ${a + 1} part ${b + 1}`)
              .join(", ")})`
          : "";
      await wait();
    }

    errorDiv.innerText = "";
    resultSpan.innerText = "Checking...";
    resultSpan.className = "maybe";
    timeSpan.innerText = "???";
    timeSpan.className = "maybe";
    runBtn.disabled = true;
    runexBtn.disabled = true;
    runallBtn.disabled = true;
    runexallBtn.disabled = true;
    multiTable.style.display = "none";
    await wait();

    const start = performance.now();
    const failed = [];
    const checking = [];
    const waiting = [];

    for (let i = 0; i < AOC.days; i++) {
      const inputs = data[toSave.year][i].examples;
      const sols = (await getSolution(i)) ?? [];
      for (const [j, solver] of sols.entries()) {
        const test = inputs[j];
        let count = 0;

        if (test.length > 0) {
          checking.push([i, j]);
          await update();
        }
        for (const [t, see] of test) {
          waiting.push(
            new Promise((r) => r(solver(t.trim(), () => {}, true)))
              .then((r) => {
                if (r !== see) {
                  console.error(
                    `Day ${i + 1} part ${j + 1} failed: got`,
                    r,
                    "expected",
                    see,
                    "for"
                  );
                  console.log(t);
                  if (failed.findIndex(([a, b]) => a === i && b === j) === -1)
                    failed.push([i, j]);
                }
              })
              .catch((e) => {
                if (failed.findIndex(([a, b]) => a === i && b === j) === -1)
                  failed.push([i, j]);
                console.error(e);
              })
              .finally(async () => {
                count++;
                if (count === test.length) {
                  const idx = checking.findIndex(
                    ([a, b]) => a === i && b === j
                  );
                  checking.splice(idx, 1);
                  await update();
                }
              })
          );
        }
      }
    }
    await Promise.allSettled(waiting);

    timeSpan.innerText = formatTime(start);
    resultSpan.innerText =
      failed.length === 0
        ? "Examples passed"
        : `Examples failed: ${failed
            .map(([a, b]) => `day ${a + 1} part ${b + 1}`)
            .join(", ")}`;
    resultSpan.className = failed.length === 0 ? "success" : "failed";
    timeSpan.className = failed.length === 0 ? "success" : "failed";
    runBtn.disabled = false;
    runexBtn.disabled = false;
    runallBtn.disabled = false;
    runexallBtn.disabled = false;
  });

  dataInput.addEventListener("change", () => {
    forDay().input = dataInput.value;
    save();
  });

  yearSelector.addEventListener("change", () => {
    errorDiv.innerText = "";
    toSave.year = keys[yearSelector.selectedIndex];
    loadYear();
    save();
  });

  daySelector.addEventListener("change", () => {
    errorDiv.innerText = "";
    toSave.yearData[toSave.year].day = daySelector.selectedIndex;
    loadDay();
    save();
  });

  partSelector.addEventListener("change", () => {
    errorDiv.innerText = "";
    forDay().part = partSelector.selectedIndex;
    save();
  });

  // init
  setupTable();
  load();
}

main();
