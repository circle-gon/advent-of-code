function parse(input) {
  const out = []
  for (const line of input.split("\n")) {
    const [, child] = line.split(" <-> ")
    const children = child.split(", ").map(i => Number(i))
    out.push(children)
  }
  return out
}

function getGroup(nums, num) {
  const look = [num]
  const set = new Set()
  
  while (look.length > 0) {
    const num = look.pop()
    set.add(num)
    for (const child of nums[num]) {
      if (!set.has(child)) look.push(child)
    }
  }
  
  return set
}

function part1(input) {
  const nums = parse(input)
  return getGroup(nums, 0).size
}

function part2(input) {
  const nums = parse(input)
  let seen = new Set()
  let groups = 0
  
  for (let i = 0; i < nums.length; i++) {
    if (seen.has(i)) continue
    seen = seen.union(getGroup(nums, i))
    groups++
  }
  return groups
}

export default [part1, part2]