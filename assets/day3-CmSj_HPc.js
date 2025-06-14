import{a,m as i}from"./index-C_urV7hb.js";const c=`
(import "js" "raw" (memory $input 1))
(func (export "part1") 
  (result i32)
  (local $idx i32)
  (local $str i32)
  (local $num1 i32)
  (local $num2 i32)
  (local $status i32)
  (local $good i32)
  (local $sum i32)
  
  (loop $loop
    (local.set $str
      (i32.load8_u
        (memory $input)
        (local.get $idx)
      )
    )
    (local.set $good (i32.const 0))
    (i32.and
      (i32.eq (local.get $str) (i32.const 109)) ;; m
      (i32.eq (local.get $status) (i32.const 0))
    )
    (i32.and
      (i32.eq (local.get $str) (i32.const 117)) ;; u
      (i32.eq (local.get $status) (i32.const 1))
    )
    (i32.and
      (i32.eq (local.get $str) (i32.const 108)) ;; l
      (i32.eq (local.get $status) (i32.const 2))
    )
    (i32.and
      (i32.eq (local.get $str) (i32.const 40)) ;; (
      (i32.eq (local.get $status) (i32.const 3))
    )
    (i32.and
      (i32.eq (local.get $str) (i32.const 44)) ;; ,
      (i32.eq (local.get $status) (i32.const 4))
    )
    i32.or
    i32.or
    i32.or
    i32.or
    (if
      (then
        (local.set $status
          (i32.add (local.get $status) (i32.const 1))
        )
        (local.set $good (i32.const 1))
      )
    )
    (i32.and
      (i32.eq (local.get $str) (i32.const 41)) ;; )
      (i32.eq (local.get $status) (i32.const 5))
    )
    (if
      (then
        (local.set $sum 
          (i32.add 
            (local.get $sum)
            (i32.mul
              (local.get $num1)
              (local.get $num2)
            )
          )
        )
        ;; Don't set $good so it resets
      )
    )
    (i32.and
      (i32.or
        (i32.eq (local.get $status) (i32.const 4))
        (i32.eq (local.get $status) (i32.const 5))
      )
      (i32.and
        (i32.ge_u (local.get $str) (i32.const 48))
        (i32.le_u (local.get $str) (i32.const 57))
      )
    )
    (if
      (then
        (i32.eq (local.get $status) (i32.const 4))
        (if
          (then
            (local.set $num1
              (i32.add
                (i32.mul (local.get $num1) (i32.const 10))
                (i32.sub (local.get $str) (i32.const 48))
              )
            )
          )
          (else
            (local.set $num2
              (i32.add
                (i32.mul (local.get $num2) (i32.const 10))
                (i32.sub (local.get $str) (i32.const 48))
              )
            )
          )
        )
        (local.set $good (i32.const 1))
      )
    )
    (i32.eqz (local.get $good))
    (if
      (then
        (local.set $num1 (i32.const 0))
        (local.set $num2 (i32.const 0))
        (local.set $status (i32.const 0))
      )
    )
    (local.set $idx
      (i32.add (local.get $idx) (i32.const 1))
    )
    (i32.ne
      (i32.load8_u
        (memory $input)
        (local.get $idx)
      )
      (i32.const 0)
    )
    br_if $loop
  )
  local.get $sum
)

(func (export "part2") 
  (result i32)
  (local $idx i32)
  (local $str i32)
  (local $num1 i32)
  (local $num2 i32)
  (local $status i32)
  (local $good i32)
  (local $active i32)
  (local $sum i32)
  
  (loop $loop
    (local.set $str
      (i32.load8_u
        (memory $input)
        (local.get $idx)
      )
    )
    (local.set $good (i32.const 0))
    (i32.and
      (i32.eq (local.get $str) (i32.const 109)) ;; m
      (i32.eq (local.get $status) (i32.const 0))
    )
    (i32.and
      (i32.eq (local.get $str) (i32.const 117)) ;; u
      (i32.eq (local.get $status) (i32.const 1))
    )
    (i32.and
      (i32.eq (local.get $str) (i32.const 108)) ;; l
      (i32.eq (local.get $status) (i32.const 2))
    )
    (i32.and
      (i32.eq (local.get $str) (i32.const 40)) ;; (
      (i32.eq (local.get $status) (i32.const 3))
    )
    (i32.and
      (i32.eq (local.get $str) (i32.const 44)) ;; ,
      (i32.eq (local.get $status) (i32.const 4))
    )
    i32.or
    i32.or
    i32.or
    i32.or
    (i32.eqz (local.get $active))
    i32.and
    
    (i32.and
      (i32.eq (local.get $str) (i32.const 100)) ;; d
      (i32.eq (local.get $status) (i32.const 0))
    )
    (i32.and
      (i32.eq (local.get $str) (i32.const 111)) ;; o
      (i32.eq (local.get $status) (i32.const 6))
    )
    (i32.and
      (i32.eq (local.get $str) (i32.const 40)) ;; (
      (i32.eq (local.get $status) (i32.const 7))
    )
    (i32.and
      (i32.eq (local.get $str) (i32.const 110)) ;; n
      (i32.eq (local.get $status) (i32.const 7))
    )
    (i32.and
      (i32.eq (local.get $str) (i32.const 39)) ;; '
      (i32.eq (local.get $status) (i32.const 9))
    )
    (i32.and
      (i32.eq (local.get $str) (i32.const 116)) ;; t
      (i32.eq (local.get $status) (i32.const 10))
    )
    (i32.and
      (i32.eq (local.get $str) (i32.const 40)) ;; (
      (i32.eq (local.get $status) (i32.const 11))
    )
    i32.or
    i32.or
    i32.or
    i32.or
    i32.or
    i32.or
    i32.or
    
    (if
      (then
        (i32.eq (local.get $str) (i32.const 100)) ;; d - skip to o
        (if
          (then
            (local.set $status
              (i32.add (local.get $status) (i32.const 6))
            )
          )
          (else
            (i32.eq (local.get $str) (i32.const 110)) ;; n - skip to '
            (if
              (then
                (local.set $status
                  (i32.add (local.get $status) (i32.const 2))
                )
              )
              (else
                (local.set $status
                  (i32.add (local.get $status) (i32.const 1))
                )
              )
            )
          )
        )
        (local.set $good (i32.const 1))
      )
    )
    (i32.eq (local.get $str) (i32.const 41)) ;; )
    (if
      (then
        (i32.eq (local.get $status) (i32.const 5))
        (if
          (then
            (local.set $sum 
              (i32.add 
                (local.get $sum)
                (i32.mul
                  (local.get $num1)
                  (local.get $num2)
                )
              )
            )
          )
        )
        (i32.eq (local.get $status) (i32.const 8))
        (if
          (then
            (local.set $active (i32.const 0))
          )
        )
        (i32.eq (local.get $status) (i32.const 12))
        (if
          (then
            (local.set $active (i32.const 1))
          )
        )
        ;; Don't set $good so it resets
      )
    )
    (i32.and
      (i32.or
        (i32.eq (local.get $status) (i32.const 4))
        (i32.eq (local.get $status) (i32.const 5))
      )
      (i32.and
        (i32.ge_u (local.get $str) (i32.const 48))
        (i32.le_u (local.get $str) (i32.const 57))
      )
    )
    (if
      (then
        (i32.eq (local.get $status) (i32.const 4))
        (if
          (then
            (local.set $num1
              (i32.add
                (i32.mul (local.get $num1) (i32.const 10))
                (i32.sub (local.get $str) (i32.const 48))
              )
            )
          )
          (else
            (local.set $num2
              (i32.add
                (i32.mul (local.get $num2) (i32.const 10))
                (i32.sub (local.get $str) (i32.const 48))
              )
            )
          )
        )
        (local.set $good (i32.const 1))
      )
    )
    (i32.eqz (local.get $good))
    (if
      (then
        (local.set $num1 (i32.const 0))
        (local.set $num2 (i32.const 0))
        (local.set $status (i32.const 0))
      )
    )
    (local.set $idx
      (i32.add (local.get $idx) (i32.const 1))
    )
    (i32.ne
      (i32.load8_u
        (memory $input)
        (local.get $idx)
      )
      (i32.const 0)
    )
    br_if $loop
  )
  local.get $sum
)
`,s=a(c,{});async function e(t){const{module:o,memory:l}=await s;return i(t,l),o.part1()}async function n(t){const{module:o,memory:l}=await s;return i(t,l),o.part2()}const u=[e,n];export{u as default};
