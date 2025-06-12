import{a,m as c}from"./index-gvt7MWwt.js";const e=`
(import "js" "raw" (memory $raw 1))
(global $row (mut i32) (i32.const 0))
(global $col (mut i32) (i32.const 0))
(memory $input 1)

(func $parse (local $idx i32) (local $str i32) (local $out i32)
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

(func $check 
  (param $idxX i32)
  (param $idxY i32)
  (param $incX i32)
  (param $incY i32)
  (result i32)
  (local $count i32)
  (local $str i32)
  (local $tmpX i32)
  (local $tmpY i32)
  
  (loop $loop
    (local.set $tmpX
      (i32.add 
        (local.get $idxX) 
        (i32.mul
          (local.get $count)
          (local.get $incX)
        )
      )
    )
    (local.set $tmpY
      (i32.add 
        (local.get $idxY) 
        (i32.mul
          (local.get $count)
          (local.get $incY)
        )
      )
    )
    ;; Check OOB
    (call $valid (local.get $tmpX) (local.get $tmpY))
    (if
      (then
        (local.set $str
          (i32.load8_u
            (memory $input)
            (call $calcI (local.get $tmpX) (local.get $tmpY))
          )
        )
        (i32.and
          (i32.eq (local.get $str) (i32.const 88)) ;; X
          (i32.eq (local.get $count) (i32.const 0))
        )
        (i32.and
          (i32.eq (local.get $str) (i32.const 77)) ;; M
          (i32.eq (local.get $count) (i32.const 1))
        )
        (i32.and
          (i32.eq (local.get $str) (i32.const 65)) ;; A
          (i32.eq (local.get $count) (i32.const 2))
        )
        (i32.and
          (i32.eq (local.get $str) (i32.const 83)) ;; S
          (i32.eq (local.get $count) (i32.const 3))
        )
        i32.or
        i32.or
        i32.or
        (if
          (then
            (local.set $count 
              (i32.add (local.get $count) (i32.const 1))
            )
            (i32.lt_u (local.get $count) (i32.const 4))
            br_if $loop
            i32.const 1
            return
          )
        )
      )
    )
  )
  i32.const 0
)

(func $compute
  (result i32)
  (local $count i32)
  (local $idxX i32)
  (local $idxY i32)
  
  (loop $loop
    ;; Check in all directions
    (call $check
      (local.get $idxX)
      (local.get $idxY)
      (i32.const -1)
      (i32.const 0)
    )
    (call $check
      (local.get $idxX)
      (local.get $idxY)
      (i32.const -1)
      (i32.const 1)
    )
    (call $check
      (local.get $idxX)
      (local.get $idxY)
      (i32.const 0)
      (i32.const 1)
    )
    (call $check
      (local.get $idxX)
      (local.get $idxY)
      (i32.const 1)
      (i32.const 1)
    )
    (call $check
      (local.get $idxX)
      (local.get $idxY)
      (i32.const 1)
      (i32.const 0)
    )
    (call $check
      (local.get $idxX)
      (local.get $idxY)
      (i32.const 1)
      (i32.const -1)
    )
    (call $check
      (local.get $idxX)
      (local.get $idxY)
      (i32.const 0)
      (i32.const -1)
    )
    (call $check
      (local.get $idxX)
      (local.get $idxY)
      (i32.const -1)
      (i32.const -1)
    )
    local.get $count
    i32.add
    i32.add
    i32.add
    i32.add
    i32.add
    i32.add
    i32.add
    i32.add
    local.set $count
    
    (local.set $idxX
      (i32.add (local.get $idxX) (i32.const 1))
    )
    (i32.eq (local.get $idxX) (global.get $col))
    (if
      (then
        (local.set $idxX (i32.const 0))
        (local.set $idxY
          (i32.add (local.get $idxY) (i32.const 1))
        )
      )
    )
    (i32.lt_u (local.get $idxY) (global.get $row))
    br_if $loop
  )
  local.get $count
)

(func $check2
  (param $aX i32)
  (param $aY i32)
  (param $bX i32)
  (param $bY i32)
  (result i32)
  (local $v1 i32)
  (local $v2 i32)
  
  (i32.and
    (call $valid (local.get $aX) (local.get $aY))
    (call $valid (local.get $bX) (local.get $bY))
  )
  (if
    (then
      (local.set $v1
        (i32.load8_u
          (memory $input)
          (call $calcI (local.get $aX) (local.get $aY))
        )
      )
      (local.set $v2
        (i32.load8_u
          (memory $input)
          (call $calcI (local.get $bX) (local.get $bY))
        )
      )
      (i32.or
        (i32.and
          (i32.eq (local.get $v1) (i32.const 77)) ;; M
          (i32.eq (local.get $v2) (i32.const 83)) ;; S
        )
        (i32.and
          (i32.eq (local.get $v1) (i32.const 83)) ;; S
          (i32.eq (local.get $v2) (i32.const 77)) ;; M
        )
      )
      (if
        (then
          i32.const 1
          return
        )
      )
    )
  )
  i32.const 0
)

(func $compute2
  (result i32)
  (local $count i32)
  (local $idxX i32)
  (local $idxY i32)
  (local $str i32)
  
  (loop $loop
    ;; Check in all directions
    (local.set $str
      (i32.load8_u
        (memory $input)
        (call $calcI (local.get $idxX) (local.get $idxY))
      )
    )
    (i32.eq (local.get $str) (i32.const 65))
    (if
      (then
        (call $check2
          (i32.add
            (local.get $idxX)
            (i32.const -1)
          )
          (i32.add
            (local.get $idxY)
            (i32.const 1)
          )
          (i32.add
            (local.get $idxX)
            (i32.const 1)
          )
          (i32.add
            (local.get $idxY)
            (i32.const -1)
          )
        )
        (call $check2
          (i32.add
            (local.get $idxX)
            (i32.const 1)
          )
          (i32.add
            (local.get $idxY)
            (i32.const 1)
          )
          (i32.add
            (local.get $idxX)
            (i32.const -1)
          )
          (i32.add
            (local.get $idxY)
            (i32.const -1)
          )
        )
        i32.and
        (if
          (then
            (local.set $count (i32.add (local.get $count) (i32.const 1)))
          )
        )
      )
    )
    
    (local.set $idxX
      (i32.add (local.get $idxX) (i32.const 1))
    )
    (i32.eq (local.get $idxX) (global.get $col))
    (if
      (then
        (local.set $idxX (i32.const 0))
        (local.set $idxY
          (i32.add (local.get $idxY) (i32.const 1))
        )
      )
    )
    (i32.lt_u (local.get $idxY) (global.get $row))
    br_if $loop
  )
  local.get $count
)

(func (export "part1") (result i32)
  call $parse
  call $compute
)

(func (export "part2") (result i32)
  call $parse
  call $compute2
)
`,i=a(e,{});async function $(l){const{module:o,memory:t}=await i;return c(l,t),o.part1()}async function n(l){const{module:o,memory:t}=await i;return c(l,t),o.part2()}const s=[$,n];export{s as default};
