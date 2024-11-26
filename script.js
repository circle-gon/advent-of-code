import specials from "./solutions/specials.js";
import { format, AOC } from "./utils.js";

const yearSelector = document.getElementById("year");
const daySelector = document.getElementById("day");
const partSelector = document.getElementById("part");
const inputFile = document.getElementById("input-file");
const fileUpload = document.getElementById("file-upload");
const errorDiv = document.getElementById("error");
const dataInput = document.getElementById("data");
const runBtn = document.getElementById("run");
const resultSpan = document.getElementById("result");
const timeSpan = document.getElementById("time");
const updateSpan = document.getElementById("update");

const keys = Object.keys(specials);
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
  if (load !== null) Object.assign(toSave, load);

  for (const option of yearSelector.options) {
    if (option.innerText === toSave.year) option.selected = true;
  }

  loadYear();
}

function loadYear() {
  daySelector.textContent = "";
  for (let i = 1; i <= AOC.days; i++) {
    const select = document.createElement("option");
    select.innerText = `day ${i}`;
    daySelector.append(select);
  }

  daySelector.selectedIndex = getDay();
  loadDay();
}

function loadDay() {
  const data = forDay();
  dataInput.value = data.input;

  partSelector.textContent = "";
  for (let i = 1; i <= AOC.parts; i++) {
    const select = document.createElement("option");
    select.innerText = `part ${i}`;
    partSelector.append(select);
  }

  partSelector.selectedIndex = data.part;
}

function getDay() {
  return toSave.yearData[toSave.year].day;
}

function forDay() {
  return toSave.yearData[toSave.year].dayData[getDay()];
}

async function getSolution() {
  try {
    const effDay = getDay() + 1;
    const module = (
      await import(
        `./solutions/${toSave.year}/day${effDay}${
          specials[toSave.year].includes(effDay) ? "/main" : ""
        }.js`
      )
    ).default;
    const sol = module[forDay().part];
    if (!sol) return false;
    return sol;
  } catch (e) {
    console.error(e)
    return false;
  }
}

function main() {
  for (const year of keys) {
    const select = document.createElement("option");
    select.innerText = `${year}`;
    yearSelector.append(select);
  }

  fileUpload.addEventListener("click", () => {
    inputFile.click();
  });
  inputFile.addEventListener("change", async () => {
    const file = inputFile.files[0];
    if (file) {
      errorDiv.innerText = "";

      const data = await file.text();
      forDay().input = data;
      dataInput.value = data;

      save();
    } else {
      errorDiv.innerText = "No file chosen!";
    }
  });

  runBtn.addEventListener("click", async () => {
    if (dataInput.value !== "") {
      errorDiv.innerText = "";
      resultSpan.innerText = "Generating solution...";
      timeSpan.innerText = "???";
      updateSpan.innerText = "";
      await new Promise((r) => setTimeout(r, 0));

      let solution;
      let module;

      const start = performance.now();

      try {
        const solver = await getSolution();
        if (solver)
          solution = await solver(forDay().input, (value) => {
            updateSpan.innerText = value;
          });
        else solution = "No solution created";
      } catch (e) {
        solution = "Failed to get a result";
        console.error(e);
      }

      const duration = (performance.now() - start) / 1000;
      const isNumber = typeof solution === "number";

      timeSpan.innerText =
        duration >= 1
          ? `${duration.toFixed(2)}s`
          : `${(duration * 1000).toFixed(1)}ms`;
      resultSpan.innerText = `${solution}${
        isNumber && solution >= 1000 ? ` (${format(solution)})` : ""
      }`;
      updateSpan.innerText = "";

      if (isNumber && solution > Number.MAX_SAFE_INTEGER)
        errorDiv.innerText =
          "Warning: the answer is beyond the precision limit, so it may be wrong.";
    } else {
      errorDiv.innerText = "No problem data.";
      resultSpan.innerText = "???";
      timeSpan.innerText = "???";
      updateSpan.innerText = "";
    }
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
  load();
}

main();
