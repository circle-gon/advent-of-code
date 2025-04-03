function part1(input) {
  const num = Number(input)
  const nums = [0]
  let addr = 0
  for (let i = 1; i <= 2017; i++) {
    addr = (addr + num) % nums.length + 1
    nums.splice(addr, 0, i)
  }
  return nums[nums.indexOf(2017) + 1]
}

function part2(input) {
  const num = Number(input)
  let addr = 0
  let out = -1
  for (let i = 1; i <= 50000000; i++) {
    addr = (addr + num) % i + 1
    if (addr === 1) out = i
  }
  return out
}

export default [part1, part2]