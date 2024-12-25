// No idea what I was doing here

import { compile, memstr } from "/utils.js";

const wat = `
(import "js" "raw" (memory $raw 1))
(import "js" "d" (func $d (param i32)))
(global $row (mut i32) (i32.const 0))
(global $col (mut i32) (i32.const 0))
(memory $input (export "in") 1)
(memory $visited 2)

(func $parse (result i32) (local $idx i32) (local $str i32) (local $out i32) (local $start i32)
  ;; Reset on each invocation so state isn't kept across solves
  (global.set $row (i32.const 0))
  (global.set $col (i32.const 0))
  (loop $loop
    (local.set $str
      (i32.load8_u
        (memory $raw)
        (local.get $idx)
      )
    )
    (i32.or
      (i32.eq (local.get $str) (i32.const 10)) ;; Newline
      (i32.eq (local.get $str) (i32.const 0)) ;; End of input
    )
    (if
      (then
        (global.set $row 
          (i32.add (global.get $row) (i32.const 1))
        )
        (i32.eqz (global.get $col))
        (if
          (then
            (global.set $col (local.get $idx))
          )
        )
      )
      (else
        ;; The newline tripped me up and I think I wasted 30 minutes on it
        (i32.store8
          (memory $input)
          (local.get $out)
          (local.get $str)
        )
        (i32.eq (local.get $str) (i32.const 94)) ;; ^
        (if
          (then
            (local.set $start (local.get $out))
          )
        )
        (local.set $out
          (i32.add (local.get $out) (i32.const 1))
        )
      )
    )
    (i32.ne
      (i32.load8_u
        (memory $raw)
        (local.get $idx)
      )
      (i32.const 0)
    )
    ;; Put this at the end because we WANT to handle the padding 0
    (local.set $idx
      (i32.add (local.get $idx) (i32.const 1))
    )
    br_if $loop
  )
  local.get $start
)

(func $calcI
  (param $x i32)
  (param $y i32)
  (result i32)
  
  (i32.add
    (local.get $x)
    (i32.mul
      (local.get $y)
      (global.get $col)
    )
  )
)

(func $valid
  (param $x i32)
  (param $y i32)
  (result i32)
  
  (i32.and
    (i32.and
      (i32.ge_s (local.get $x) (i32.const 0))
      (i32.lt_s (local.get $x) (global.get $col))
    )
    (i32.and
      (i32.ge_s (local.get $y) (i32.const 0))
      (i32.lt_s (local.get $y) (global.get $row))
    )
  )
)

(func $good
  (param $x i32)
  (param $y i32)
  (result i32)

  (i32.eqz (call $valid (local.get $x) (local.get $y)))
  (if
    (then
      i32.const 1
      return
    )
  )
  (i32.ne
    (i32.load8_u
      (memory $input)
      (call $calcI (local.get $x) (local.get $y))
    )
    (i32.const 35)
  )
)

(func $path 
  (param $start i32)
  (result i32)
  (local $idxX i32)
  (local $idxY i32)
  (local $dir i32)
  (local $temp i32)
  (local $idx i32)
  (local $count i32)
  (local $done i32)
  
  ;; Decompose $start into $idxX and $idxY
  (local.set $idxX
    (i32.rem_u
      (local.get $start)
      (global.get $col)
    )
  )
  (local.set $idxY
    (i32.div_u
      (local.get $start)
      (global.get $col)
    )
  )
  
  (loop $loop
    ;; Check and add
    (local.set $done (i32.const 0))
    (i32.eqz
      (i32.load8_u
        (memory $visited)
        (i32.add
          (i32.mul (call $calcI (local.get $idxX) (local.get $idxY)) (i32.const 4))
          (local.get $dir)
        )
      )
    )
    (if
      (then
      (i32.store8
          (memory $visited)
          (i32.add
            (i32.mul (call $calcI (local.get $idxX) (local.get $idxY)) (i32.const 4))
            (local.get $dir)
          )
          (i32.const 1)
        )
        
      )
      (else
        i32.const 0
        ;; Clear all indexes (there's no way around it)
  (memory.fill
    (memory $visited)
    (i32.const 0)
    (i32.const 0)
    (i32.const 65536)
  )
        return
      )
    )
  
    ;; Move in a direction
    (i32.and
      (i32.eqz (local.get $dir))
      (i32.eqz (local.get $done))
    )
    (if
      (then
        ;; Moving up is actually going negative
        (local.set $temp
          (i32.sub
            (local.get $idxY)
            (i32.const 1)
          )
        )
        (call $good (local.get $idxX) (local.get $temp))
        (if
          (then
            (local.set $idxY (local.get $temp))
          )
          (else
            (local.set $dir
              (i32.rem_u
                (i32.add
                  (local.get $dir)
                  (i32.const 1)
                )
                (i32.const 4)
              )
            )
            (local.set $done (i32.const 1))
          )
        )
      )
    )
    (i32.and
      (i32.eq (local.get $dir) (i32.const 1))
      (i32.eqz (local.get $done))
    )
    (if
      (then
        (local.set $temp
          (i32.add
            (local.get $idxX)
            (i32.const 1)
          )
        )
        (call $good (local.get $temp) (local.get $idxY))
        (if
          (then
            (local.set $idxX (local.get $temp))
          )
          (else
            (local.set $dir
              (i32.rem_u
                (i32.add
                  (local.get $dir)
                  (i32.const 1)
                )
                (i32.const 4)
              )
            )
            (local.set $done (i32.const 1))
          )
        )
      )
    )
    (i32.and
      (i32.eq (local.get $dir) (i32.const 2))
      (i32.eqz (local.get $done))
    )
    (if
      (then
        (local.set $temp
          (i32.add
            (local.get $idxY)
            (i32.const 1)
          )
        )
        (call $good (local.get $idxX) (local.get $temp))
        (if
          (then
            (local.set $idxY (local.get $temp))
          )
          (else
            (local.set $dir
              (i32.rem_u
                (i32.add
                  (local.get $dir)
                  (i32.const 1)
                )
                (i32.const 4)
              )
            )
            (local.set $done (i32.const 1))
          )
        )
      )
    )
    (i32.and
      (i32.eq (local.get $dir) (i32.const 3))
      (i32.eqz (local.get $done))
    )
    (if
      (then
        (local.set $temp
          (i32.sub
            (local.get $idxX)
            (i32.const 1)
          )
        )
        (call $good (local.get $temp) (local.get $idxY))
        (if
          (then
            (local.set $idxX (local.get $temp))
          )
          (else
            (local.set $dir
              (i32.rem_u
                (i32.add
                  (local.get $dir)
                  (i32.const 1)
                )
                (i32.const 4)
              )
            )
            (local.set $done (i32.const 1))
          )
        )
      )
    )
  
    (call $valid (local.get $idxX) (local.get $idxY))
    br_if $loop
  )
  ;; Now count
  (loop $loop
        (i32.ne
          (i32.load8_u
            (memory $visited)
            (i32.mul
              (local.get $idx)
              (i32.const 4)
            )
          )
          (i32.const 0)
        )
        (i32.ne
          (i32.load8_u
            (memory $visited)
            (i32.add (i32.mul
              (local.get $idx)
              (i32.const 4)
            ) (i32.const 1))
          )
          (i32.const 0)
        )
        (i32.ne
          (i32.load8_u
            (memory $visited)
            (i32.add (i32.mul
              (local.get $idx)
              (i32.const 4)
            ) (i32.const 2))
          )
          (i32.const 0)
        )
        (i32.ne
          (i32.load8_u
            (memory $visited)
            (i32.add (i32.mul
              (local.get $idx)
              (i32.const 4)
            ) (i32.const 3))
          )
          (i32.const 0)
        )
        i32.or
        i32.or
        i32.or
        local.get $count
        i32.add
        local.set $count
  
    (local.set $idx
      (i32.add
        (local.get $idx)
        (i32.const 1)
      )
    )
    (i32.lt_u
      (local.get $idx)
      (i32.mul
        (global.get $row)
        (global.get $col)
      )
    )
    br_if $loop
  )
  ;; Clear all indexes (there's no way around it)
  (memory.fill
    (memory $visited)
    (i32.const 0)
    (i32.const 0)
    (i32.const 65536)
  )
  local.get $count
)

(func $calc 
  (param $start i32)
  (result i32)
  (local $idx i32)
  (local $count i32)
  
  (loop $loop
    (i32.eq
      (i32.load8_u
        (memory $input)
        (local.get $idx)
      )
      (i32.const 46)
    )
    (if
      (then
        ;; Replace it with a #
        (i32.store8
          (memory $input)
          (local.get $idx)
          (i32.const 35)
        )
        (local.set $count
          (i32.add
            (local.get $count)
            (i32.eqz (call $path (local.get $start)))
          )
        )
        (i32.eqz (call $path (local.get $start)))
        (if
          (then
            (call $d (local.get $idx))
          )
        )
        ;; Replace it back to a .
        (i32.store8
          (memory $input)
          (local.get $idx)
          (i32.const 46)
        )
      )
    )
  
    (local.set $idx
      (i32.add
        (local.get $idx)
        (i32.const 1)
      )
    )
    (i32.lt_u
      (local.get $idx)
      (i32.mul
        (global.get $row)
        (global.get $col)
      )
    )
    br_if $loop
  )
  
  local.get $count
)

(func (export "part1") (result i32)
  call $parse
  call $path
)

(func (export "part2") (result i32)
  call $parse
  call $calc
)
`;

const compilee = compile(wat, {
  d: (i) => {
    /* self.postMessage({
      type: "msg"
    })*/
    console.log(i);
  },
});

self.addEventListener("message", async (e) => {
  const { module, memory } = await compilee;
  memstr(e.data[0], memory);
  self.postMessage({
    type: "done",
    data: module[e.data[1] ? "part2" : "part1"](),
  });
});
