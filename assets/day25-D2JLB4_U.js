import{c as r}from"./emwasm-BknXIY8D.js";import{m}from"./index-CbGXu4SM.js";import{i as s}from"./intcode-BuwA_ZA0.js";const c=`
${s}
export commands = memory<u8>(1)
temp = memory(1)
export output = memory<u8>(1)
let ip = u32(0)
let rel = s32(0)
let idx = u32(0)
export let outIdx = u32(0)
roomData = memory(1)
queue = memory<u8>(1)
seen = memory<u8>(1)
queue2 = memory<u8>(1)
safe = memory<u8>(1)
let roomId = u32(0)
let end = u32(0)
let cid = u32(0)
let entrance = u32(0)
let security = u32(0)

fn get()(val: u32) -> s64 {
  val = commands[idx]
  idx++
  if (val == 0) { return 1347376211 }
  return s64(val)
}

fn set(char: s64)() -> u32 {
  output[outIdx] = u32(char)
  outIdx++
  return 0
}

export fn part1()() -> u32 {
  outIdx = 0
  ip = 0
  rel = 0
  return parse()
}

export fn run()() -> u32 {
  idx = 0
  outIdx = 0
  ip, rel = evalIntcode(ip, rel, get, set)
  return ip == 1347376211
}

fn performStep(num: u32)() {
  if (num == 0) {
    // north
    commands[0] = 110
    commands[1] = 111
    commands[2] = 114
    commands[3] = 116
    commands[4] = 104
    commands[5] = 10
    commands[6] = 0
  } else if (num == 1) {
    // east
    commands[0] = 101
    commands[1] = 97
    commands[2] = 115
    commands[3] = 116
    commands[4] = 10
    commands[5] = 0
  } else if (num == 2) {
    // south
    commands[0] = 115
    commands[1] = 111
    commands[2] = 117
    commands[3] = 116
    commands[4] = 104
    commands[5] = 10
    commands[6] = 0
  } else if (num == 3) {
    // west
    commands[0] = 119
    commands[1] = 101
    commands[2] = 115
    commands[3] = 116
    commands[4] = 10
    commands[5] = 0
  } else { unreachable() }
  run()
}

fn takeItem(num: u64)(c: u32, d: u32, j: u32, e: u64) -> u32 {
  commands[0] = 116
  commands[1] = 97
  commands[2] = 107
  commands[3] = 101
  commands[4] = 32
  while (num != 0) {
    e = num % 27
    if (e == 26) { e = 32 }
    else { e += 97 }
    commands[5 + c] = i32(e)
    num /= 27
    c++
  }
  for (; d < c / 2; d++) {
    j = commands[5 + d]
    commands[5 + d] = commands[4 + c - d]
    commands[4 + c - d] = j
  }
  commands[5 + c] = 10
  commands[6 + c] = 0
  return run()
}

fn dropItem(num: u64)(c: u32, d: u32, j: u32, e: u64) -> u32 {
  commands[0] = 100
  commands[1] = 114
  commands[2] = 111
  commands[3] = 112
  commands[4] = 32
  while (num != 0) {
    e = num % 27
    if (e == 26) { e = 32 }
    else { e += 97 }
    commands[5 + c] = i32(e)
    num /= 27
    c++
  }
  for (; d < c / 2; d++) {
    j = commands[5 + d]
    commands[5 + d] = commands[4 + c - d]
    commands[4 + c - d] = j
  }
  commands[5 + c] = 10
  commands[6 + c] = 0
  j = run()
  return j
}

fn getDirs()(
  idx: u32, res: u32, security: u32, item: u64, code: u32
) -> u32, u32, u64 {
  for (; idx < outIdx; idx++) {
    if (
      // north
      output[idx] == 110 & output[idx + 1] == 111 &
      output[idx + 2] == 114 & output[idx + 3] == 116 & output[idx + 4] == 104
    ) {
      res |= 1  
      idx += 5
    }
    if (
      // east
      output[idx] == 101 & output[idx + 1] == 97 &
      output[idx + 2] == 115 & output[idx + 3] == 116
    ) {
      res |= 2
      idx += 4
    }
    if (
      // south
      output[idx] == 115 & output[idx + 1] == 111 &
      output[idx + 2] == 117 & output[idx + 3] == 116 & output[idx + 4] == 104
    ) {
      res |= 4
      idx += 5
    }
    if (
      // west
      output[idx] == 119 & output[idx + 1] == 101 &
      output[idx + 2] == 115 & output[idx + 3] == 116
    ) {
      res |= 8
      idx += 4
    }
    if (
      // security checkpoint
      output[idx] == 61 & output[idx + 1] == 32 &
      output[idx + 2] == 83 & output[idx + 3] == 101
    ) {
      security = true  
      idx += 19
    }
    if (output[idx] == 101 & output[idx + 1] == 58) {
      idx += 5
      while (output[idx] != 10) {
        code = output[idx]
        if (code == 32) { code = 26 }
        if (code >= 97) { code -= 97 }
        // 27 because the space
        item = 27 * item + i64(code)
        idx++
      }
    }
  }
  return security, res, item
}

fn poke(id: u32)(res: u32, h: u32, idx: u32, sec: u32, fake: u64) {
  sec, res, fake = getDirs()
  for (; idx < 4; idx++) {
    h = 1 << idx
    if ((res & h) != h) { continue }
    if (i32.load8_u(roomData, id * 12 + 8 + idx) == 0) {
      i32.store8(roomData, id * 12 + 8 + idx, roomId)
      i32.store8(roomData, roomId * 12 + 8 + idx + uint(((idx & 2) == 2) ? -2 : 2), id)
      if (!sec) {
        queue[end] = roomId
        end++
      } else {
        entrance = id
        security = roomId 
      }
      roomId++
    }
  }
}

fn moveTo(id: u32)(
  start: u32, end: u32, s: u32, h: u32, idx: u32,
  t: u32, next: u32, v: u32
) {
  memory.clear(seen)
  queue2[0] = cid
  end++
  while (start < end) {
    if (queue2[start] == id) { break }
    for (s = 0; s < 4; s++) {
      // Traversable and we have not already seen it
      v = i32.load8_u(roomData, queue2[start] * 12 + 8 + s)
      if (v != 0 & seen[v] == 0) {
        // add
        queue2[end] = v
        end++
        seen[v] = queue2[start] + 1
      }
    }
    start++
  }
  if (start >= end) { unreachable() }

  h = id
  queue2[0] = id
  end = 1
  while ((h = seen[h] - 1) != cid) {
    queue2[end] = h
    end++
  }
  queue2[end] = cid
  for (idx = end - 1; sint(idx) >= 0; idx--) {
    next = queue2[idx]
    t = false
    for (s = 0; s < 4; s++) {
      if (i32.load8_u(roomData, queue2[idx + 1] * 12 + 8 + s) == next) {
        performStep(s)
        t = true
        break
      }
    }
    if (!t) { unreachable() }
  }
  cid = id
}

export fn part1boring()(
  start: u32, i: u32, val: u64, count: u32, fake: u32, code: u64, range: u32, j: u32, k: u32, res: u32
) -> u32 {
  range = part1() * i64.size
  memory.copy(temp, program, 0, 0, range)
  // Part 1: find all paths to buildings, including the security entrance and the items
  roomId = 2
  cid = 1
  end = 0
  memory.clear(roomData)
  commands[0] = 0
  run()

  poke(1)
  while (start < end) {
    moveTo(queue[start])
    fake, fake, code = getDirs()
    i64.store(roomData, queue[start] * 12, code)

    poke(queue[start])
    start++
  }

  // Part 2: check each item to see if it's safe to take
  for (i = 1; i < roomId; i++) {
    val = i64.load(roomData, i * 12)
    if (
      val != 0 &
      // giant electromagnet and infinite loop don't end the program,
      // but instead halt or crash, which is bad because WASM can't handle
      // exceptions
      val != 12384964704234962299 & val != 1274119092880797282
    ) {
      moveTo(i)
      if (takeItem(val)) {
        cid = 1
        commands[0] = 0
        memory.copy(program, temp, 0, 0, range)
        ip = 0
        rel = 0
        run()
      } else {
        safe[count] = i
        count++
      }
    }
  }

  // Part 3: grab all safe items and head to security entrance, then drop all items
  for (i = 0; i < count; i++) {
    moveTo(safe[i])
    takeItem(i64.load(roomData, safe[i] * 12))
  }
  moveTo(entrance)
  for (i = 0; i < count; i++) { dropItem(i64.load(roomData, safe[i] * 12)) }

  // Part 4: try each combination of safe items until the goal is reached
  for (i = 0; i < (1 << count); i++) {
    for (j = 0; j < count; j++) {
      k = 1 << j
      if ((i & k) == k) { takeItem(i64.load(roomData, safe[j] * 12)) }
    }
    moveTo(security)
    // The code thinks that we're at the security point but if we get sent back
    // it's not true and the code will get messed up
    cid = entrance
    k = 0
    while (output[k] != 0 & (output[k] < 48 | output[k] > 57)) { k++ }
    while (output[k] >= 48 & output[k] <= 57) {
      res = 10 * res + output[k] - 48
      k++
    }
    if (res != 0) { return res }
    for (j = 0; j < count; j++) {
      k = 1 << j
      if ((i & k) == k) { dropItem(i64.load(roomData, safe[j] * 12)) }
    }
  }
  unreachable()
}
`,p=r(c,{},{});async function l(t,a){let d,o;const e=document.createElement("input"),u=document.createElement("pre"),n=document.createElement("button");for(n.textContent="Submit",e.addEventListener("keydown",i=>{i.key==="Enter"&&o(e.value)}),n.addEventListener("click",()=>o(e.value)),a([document.createElement("br"),"Command: ",e,n,document.createElement("br"),u]);;){const i=t.run();if(u.textContent=new TextDecoder().decode(new Uint8Array(t.output.buffer).subarray(0,t.outIdx.value)),e.value="",{promise:d,resolve:o}=Promise.withResolvers(),m(await d+`
`,t.commands),i)return}}async function f(t,a,d,o){const{module:e,memory:u}=await p;return m(t,u),e.part1(),o?l(e,a):e.part1boring()}const v=[f];export{v as default};
