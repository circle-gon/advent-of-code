function checksum(input) {
  let cb = "";
  for (let i = 0; i < input.length; i += 2)
    cb += input[i] === input[i + 1] ? "1" : "0";
  if (cb.length % 2 === 0) return checksum(cb);
  return cb;
}

function run(input, req) {
  let stuff = input;
  while (stuff.length < req) {
    let newStuff = "";
    for (let i = stuff.length - 1; i >= 0; i--)
      newStuff += stuff[i] === "1" ? "0" : "1";
    stuff += "0" + newStuff;
  }
  return checksum(stuff.slice(0, req));
}

function part1(input, _, example) {
  return run(input, example ? 20 : 272);
}

function part2(input) {
  return run(input, 35651584);
}

export default [part1, part2];
