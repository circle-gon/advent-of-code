// DO NOT EXECUTE (for reference only)

// Grab most-likely inputs
const EXAMPLES = /<pre><code>(.*?)<\/code><\/pre>/gs;
(async () => {
  const out = [];
  for (let i = 1; i <= 25; i++) {
    const resp = await fetch(`https://adventofcode.com/2024/day/${i}`);
    const text = await resp.text();
    out.push(
      [...text.matchAll(EXAMPLES)].map((i) =>
        i[1]
          .replaceAll(/<em>(.*?)<\/em>/gs, "$1")
          .replaceAll("&lt;", "<")
          .replaceAll("&gt;", ">")
          .replaceAll("&amp;", "&"),
      ),
    );
  }
  console.log(out);
})();

// Grab inputs for the current page
const EXAMPLES2 = /<pre><code>(.*?)<\/code><\/pre>/gs;
(async () => {
  const resp = await fetch(location.href);
  const text = await resp.text();
  console.log(
    [...text.matchAll(EXAMPLES2)].map((i) =>
      i[1]
        .replaceAll(/<em>(.*?)<\/em>/gs, "$1")
        .replaceAll("&lt;", "<")
        .replaceAll("&gt;", ">")
        .replaceAll("&amp;", "&"),
    ),
  );
})();

// Grab problem titles
const DAY = /--- Day \d+: (.*)? ---/;
(async () => {
  const out = [];
  for (let i = 1; i <= 25; i++) {
    const resp = await fetch(`https://adventofcode.com/2024/day/${i}`);
    const text = await resp.text();
    out.push(text.match(DAY)[1]);
  }
  console.log(out);
})();
