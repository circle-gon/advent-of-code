import { format, compile } from "/utils.js"

const wat = `
(import "js" "offset" (func $offset (result f32)))
(func (export "offset") (result f32)
call $offset
)
`

function getOffset() {
  return new Date(2024, 11).getTime() - Date.now()
}

async function part1(input) {
  const module = await compile(wat, {
    js: {
      offset: getOffset
    }
  })
  return `Wait ${module.offset()} milliseconds!`
}

export default [part1]