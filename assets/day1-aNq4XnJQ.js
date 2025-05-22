import{a as r,m as s}from"./index-CXErhknd.js";const u=`
;; Memory
(import "js" "raw" (memory $raw 1))
(import "js" "sort" (func $sort))
(memory $input1 (export "input1") 1)
(memory $input2 (export "input2") 1)

(func $range (param $str i32) (result i32)
  (i32.and
    (i32.ge_u (local.get $str) (i32.const 48))
    (i32.le_u (local.get $str) (i32.const 57))
  )
)

;; Parse
(func $parse 
  (local $idx i32)
  (local $str i32)
  (local $num i32)
  (local $m i32)
  (local $out i32)
  
  (local.set $out (i32.const 4))
  (loop $loop
    (local.set $str 
      (i32.load8_u
        (memory $raw)
        (local.get $idx)
      )
    )
    (call $range (local.get $str))
    (if
      (then
        (local.set $num
          (i32.add
            (i32.mul (local.get $num) (i32.const 10))
            (i32.sub (local.get $str) (i32.const 48))
          )
        )
        (i32.eqz
          (call $range
            (i32.load8_u
              (memory $raw)
              (i32.add (local.get $idx) (i32.const 1))
            )
          )
        )
        (if
          (then
            (i32.eqz (local.get $m))
            (if
              (then
                (i32.store
                  (memory $input1)
                  (local.get $out)
                  (local.get $num)
                )
                (local.set $m (i32.const 1))
              )
              (else
                (i32.store
                  (memory $input2)
                  (local.get $out)
                  (local.get $num)
                )
                (local.set $m (i32.const 0))
                (local.set $out
                  (i32.add (local.get $out) (i32.const 4))
                )
              )
            )
            (local.set $num (i32.const 0))
          )
        )
      )
    )
    (local.set $idx
      (i32.add (local.get $idx) (i32.const 1))
    )
    (i32.ne
      (i32.load8_u
        (memory $raw)
        (local.get $idx)
      )
      (i32.const 0)
    )
    br_if $loop
  )
  (i32.store
    (memory $input1)
    (i32.const 0)
    (local.get $out)
  )
  (i32.store
    (memory $input2)
    (i32.const 0)
    (local.get $out)
  )
)

(func $sum (result i32) (local $idx i32) (local $sum i32)
  (local.set $idx (i32.const 4))
  (loop $loop
    (i32.sub
      (i32.load
        (memory $input1)
        (local.get $idx)
      )
      (i32.load
        (memory $input2)
        (local.get $idx)
      )
    )
    ;; This is so stupid
    f32.convert_i32_s
    f32.abs
    i32.trunc_f32_s
    local.get $sum
    i32.add
    local.set $sum
    (local.set $idx
      (i32.add (local.get $idx) (i32.const 4))
    )
    (i32.lt_u
      (local.get $idx)
      ;; It doesn't matter which one we choose
      (i32.load 
        (memory $input1)
        (i32.const 0)
      )
    )
    br_if $loop
  )
  local.get $sum
)

(func $similar
  (result i32)
  (local $max i32)
  (local $idx i32)
  (local $idx2 i32)
  (local $num i32)
  (local $count i32)
  (local $sum i32)
  
  (local.set $idx (i32.const 4))
  ;; It doesn't matter which one we choose
  (local.set $max 
    (i32.load
      (memory $input1)
      (i32.const 0)
    )
  )
  (loop $loop
    (local.set $num
      (i32.load
        (memory $input1)
        (local.get $idx)
      )
    )
    (local.set $idx2 (i32.const 4))
    (local.set $count (i32.const 0))
    (loop $loop2
      (i32.eq
        (local.get $num)
        (i32.load
          (memory $input2)
          (local.get $idx2)
        )
      )
      (if
        (then
          (local.set $count
            (i32.add 
              (local.get $count)
              (i32.const 1)
            )
          )
        )
      )
      (local.set $idx2
        (i32.add (local.get $idx2) (i32.const 4))
      )
      (i32.lt_u
        (local.get $idx2)
        (local.get $max)
      )
      br_if $loop2
    )
    (local.set $sum
      (i32.add
        (local.get $sum)
        (i32.mul
          (local.get $count)
          (local.get $num)
        )
      )
    )
    (local.set $idx
      (i32.add (local.get $idx) (i32.const 4))
    )
    (i32.lt_u
      (local.get $idx)
      (local.get $max)
    )
    br_if $loop
  )
  local.get $sum
)

;; Out
(func (export "part1") (result i32)
  call $parse
  call $sort
  call $sum
)

(func (export "part2") (result i32)
  call $parse
  call $similar
)
`;function c(i){const l=new DataView(i.buffer),t=l.getInt32(0,!0)/4-1,e=new Int32Array(t);for(let o=0;o<t;o++)e[o]=l.getInt32(4*(o+1),!0);e.sort((o,n)=>o-n);for(let o=0;o<t;o++)l.setInt32(4*(o+1),e[o],!0)}let a;const $=r(u,{sort(){c(a.input1),c(a.input2)}});async function m(i){const{module:l,memory:t}=await $;return s(i,t),a=l,l.part1()}async function d(i){const{module:l,memory:t}=await $;return s(i,t),l.part2()}const g=[m,d];export{g as default};
