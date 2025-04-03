function parse(input) {
  return input.split("\n").map(i => i.split(/ |\t/).map(i => Number(i)))
}

function part1(input) {
  const lines = parse(input)
  let sum = 0
  for (const line of lines) {
    sum += Math.max(...line) - Math.min(...line)
  }
  return sum
}

function part2(input) {
  const lines = parse(input)
  let sum = 0
  for (const line of lines) {
    for (const num of line) {
      for (const otherNum of line) {
        const div = Math.max(num, otherNum) / Math.min(num, otherNum)
        if (div !== 1 && Number.isInteger(div)) {
          sum += div
        }
      }
    }
  }
  // The math adds twice
  return sum / 2
}

export default [part1, part2]