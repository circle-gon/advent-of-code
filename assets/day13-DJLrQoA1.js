import{c as m}from"./emwasm-CoPIFzXk.js";import{m as p,f as v}from"./index-Ds_q8QYG.js";import{i as x}from"./intcode-BuwA_ZA0.js";const d=`
${x}
let stage = u32(0)
let stage2 = u32(0)
let count = u32(0)
export let score = u32(0)
export let val = s32(0)
let ip = u32(0)
let rel = s32(0)
let x = s32(0)
let y = s32(0)
let px = s32(0)
let rx = s32(0)
export let my = s32(0)
export output = memory<u8>(1)

fn get()() -> s64 {
  unreachable()
}

fn set(v: s64)() -> u32 {
  if (stage == 0 | stage == 1) {
    stage++
  } else {
    if (v == 2) { count++ }
    stage = 0 
  }
  return 0
}

fn get2()() -> s64 {
  if (stage == 0) {
    stage = 1
    return i64(val)
  }
  stage = 0
  return 1347376211 // STOP
}

fn get3()() -> s64 {
  if (px < rx) {
    return 1
  }
  if (px > rx) {
    return -1
  }
  return 0
}

fn set2(v: s64)() -> u32 {
  if (stage2 == 0) { x = i32(v); stage2 = 1 }
  else if (stage2 == 1) { y = i32(v); stage2 = 2 }
  else {
    if (x == -1 & y == 0) { score = u32(v) }
    else {
      if (y > my) { my = y }
      output[uint(y * 50 + x)] =
        v == 0 ? 32 :
          v == 1 ? 35 :
            v == 2 ? 61 :
              v == 3 ? 45 :
                64
      output[uint(y * 50 + 49)] = 10
      if (v == 4) { rx = x }
      if (v == 3) { px = x }
    }
    stage2 = 0
  }
  return 0
}

export fn part1()() -> u32 {
  count = 0
  parse()
  evalIntcode(0, 0, get, set)
  return count
}

export fn part2fun()() {
  parse()
  ip = 0
  rel = 0
  my = 0
  memory.clear(output)
  program[0] = 2
}

export fn part2boring()(res: u32) -> u32 {
  part2fun()
  evalIntcode(0, 0, get3, set2)
  return score
}

export fn run()() -> u32 {
  ip, rel = evalIntcode(ip, rel, get2, set2)
  if (ip == 1347376211) { return score }
  return 1347376211
}
`,f=m(d,{},{});async function g(e){const{module:n,memory:o}=await f;return p(e,o),n.part1()}async function y(e,n){let o,t;const s=document.createElement("span"),a=document.createElement("pre"),u=document.createElement("button"),c=document.createElement("button"),i=document.createElement("button");n(["Score: ",s,document.createElement("br"),a,document.createElement("br"),u,c,i]),u.addEventListener("click",()=>t(-1)),c.addEventListener("click",()=>t(0)),i.addEventListener("click",()=>t(1)),u.textContent="Left",c.textContent="Nothing",i.textContent="Right";const l=r=>{r.key==="ArrowLeft"?t(-1):r.key==="ArrowDown"?t(0):r.key==="ArrowRight"&&t(1)};for(window.addEventListener("keydown",l),e.part2fun();;){const r=e.run();if(r!==1347376211)return window.removeEventListener("keydown",l),r;s.textContent=v(e.score.value),a.textContent=new TextDecoder().decode(new Uint8Array(e.output.buffer).subarray(0,e.my.value*50)),{promise:o,resolve:t}=Promise.withResolvers(),e.val.value=await o}}async function w(e,n,o,t){const{module:s,memory:a}=await f;return p(e,a),t?y(s,n):s.part2boring()}const h=[g,w];export{h as default};
