function parse(input) {
  const lines = input.split("\n\n")
  const trim = lines[0].split("\n").map(i => i.split(" "))
  const begin = trim[0][3].slice(0, -1)
  
  const checksum = Number(trim[1][5])
  const states = new Map()
  
  const result = [begin, checksum, states]
  for (let i = 1; i < lines.length; i++) {
    const out = []
    const part = lines[i].split("\n").map(i => i.trim().split(" "))
    const state = part[0][2].slice(0, -1)
    
    for (let j = 0; j < 8; j += 4) {
      const cond0 = Number(part[1 + j][5].slice(0, -1))
      const write0 = Number(part[2 + j][4])
      const move0 = part[3 + j][6] === "right." ? 1 : -1
      const continue0 = part[4 + j][4].slice(0, -1)
      out.push([write0, move0, continue0])
    }
    
    states.set(state, out)
  }
  
  return result
}

function part1(input) {
  const [begin, checksum, state] = parse(input)
  const tape = new Map()
  let cursor = 0
  let current = begin
  
  for (let i = 0; i < checksum; i++) {
    const [write, move, next] = state.get(current)[tape.get(cursor) ?? 0]
    tape.set(cursor, write)
    cursor += move
    current = next
  }
  
  return [...tape.values()].reduce((a, b) => a + b, 0)
}

export default [part1]