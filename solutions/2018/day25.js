function parse(input) {
  return input.split("\n").map(i => i.split(",").map(i => Number(i)))
}

function makeConstellation(seen, grid, i) {
  const look = [i]
  while (look.length > 0) {
    const val = look.pop()
    if (seen[val]) continue
    
    seen[val] = true
    for (let i = 0; i < grid.length; i++) {
      if (grid[val][i]) look.push(i)
    }
  }
}

function part1(input) {
  const points = parse(input)
  const grid = Array(points.length).fill().map(() => Array(points.length).fill(false))
  const seen = Array(points.length).fill(false)
  
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < i; j++) {
      const pa = points[i]
      const pb = points[j]
      const dist = pa.reduce((a, b, c) => a + Math.abs(pb[c] - b), 0)
      if (dist <= 3) {
        grid[i][j] = true
        grid[j][i] = true
      }
    }
  }
  
  let stell = 0
  for (let i = 0; i < seen.length; i++) {
    if (!seen[i]) {
      makeConstellation(seen, grid, i)
      stell++
    } 
  }
  
  return stell
}

export default [part1]