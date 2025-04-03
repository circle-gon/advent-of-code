function parse(input) {
  const out = []
  for (const line of input.split("\n")) {
    const instrs = line.split(" ")
    if (instrs.length === 2) {
      const [w, h] = instrs[1].split("x")
      out.push(["rect", Number(w), Number(h)])
    } else {
      const [d, l] = instrs[2].split("=")
      const a = Number(instrs[4])
      out.push(["rotate", d, Number(l), a])
    }
  }
  return out
}

function solve(input) {
  const instructions = parse(input)
  const display = Array(6).fill().map(() => Array(50).fill(false))
  for (const [type, a, b, c] of instructions) {
    if (type === "rect") {
      for (let i = 0; i < b; i++) {
        for (let j = 0; j < a; j++) {
          display[i][j] = true
        }
      }
    } else {
      if (a === "y") {
        display[b] = [...display[b].slice(-c), ...display[b].slice(0, -c)]
      } else {
        const out = []
        for (let i = 0; i < 6; i++) {
          out.push(display[(i - c + 6) % 6][b])
        }
        for (let i = 0; i < 6; i++) {
          display[i][b] = out[i]
        }
      }
    }
  }
  return display
}

function part1(input) {
  return solve(input).reduce((a, b) => a + b.reduce((c, d) => c + (d ? 1 : 0), 0), 0)
}

function part2(input) {
  const display = solve(input)
  const out = []
  for (let i = 0; i < 50; i += 5) {
    const text = display.map(j => j.slice(i, i + 5).map(i => i ? "#" : " ").join("")).join("\n")
    const pre = document.createElement("pre")
    pre.textContent = text
    out.push(pre)
  }
  return out
}

export default [part1, part2]