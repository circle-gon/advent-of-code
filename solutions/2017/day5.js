function parse(input) {
  return input.split("\n").map(i => Number(i))
}

function run(input, part2) {
  const things = parse(input)
  let ip = 0
  let counter = 0
  while (ip >= 0 && ip < things.length) {
    const len = things[ip]
    things[ip] += (len >= 3 && part2 ? -1 : 1)
    ip += len
    counter++
  }
  return counter
}

function part1(input) {
  return run(input, false)
}

function part2(input) {
  return run(input, true)
}

export default [part1, part2]