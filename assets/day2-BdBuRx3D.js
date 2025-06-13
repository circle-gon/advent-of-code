import{a as e,m as i}from"./index-Ds_q8QYG.js";const a=`
(import "js" "raw" (memory $raw 1))
(memory $input (export "in") 1)

(func $parse
  (local $idx i32)
  (local $str i32)
  (local $num i32)
  (local $out i32)
  
  (loop $loop
    (local.set $str 
      (i32.load8_u
        (memory $raw)
        (local.get $idx)
      )
    )
    (i32.and
      (i32.ge_u (local.get $str) (i32.const 48))
      (i32.le_u (local.get $str) (i32.const 57))
    )
    (if
      (then
         (local.set $num
          (i32.add
            (i32.mul (local.get $num) (i32.const 10))
            (i32.sub (local.get $str) (i32.const 48))
          )
        )
      )
    )
    (local.set $idx
      (i32.add (local.get $idx) (i32.const 1))
    )
    (local.set $str
      (i32.load8_u
        (memory $raw)
        (local.get $idx)
      )
    )
    (i32.eq (local.get $str) (i32.const 32)) ;; Space
    (i32.eq (local.get $str) (i32.const 10)) ;; Newline
    (i32.eq (local.get $str) (i32.const 0)) ;; End of input
    i32.or
    i32.or
    (if
      (then
        (i32.store8
          (memory $input)
          (local.get $out)
          (local.get $num)
        )
        (local.set $out
          (i32.add (local.get $out) (i32.const 1))
        )
        (local.set $num (i32.const 0))
      )
    )
    ;; Newline or end of input
    (i32.or
      (i32.eq (local.get $str) (i32.const 10)) 
      (i32.eq (local.get $str) (i32.const 0)) 
    )
    (if
      (then
        ;; Pad an extra -1 to signal end of report
        (i32.store8
          (memory $input)
          (local.get $out)
          (i32.const -1)
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
    br_if $loop
  )
  ;; Add a padding zero
  (i32.store8
    (memory $input)
    (local.get $out)
    (i32.const 0)
  )
)

(func $count
  (result i32)
  (local $idx i32)
  (local $pnum i32)
  (local $num i32)
  (local $inc i32)
  (local $safe i32)
  (local $c i32)
  (local $diff i32)
  
  (loop $loop
    (local.set $num
      (i32.load8_s
        (memory $input)
        (local.get $idx)
      )
    )
    (i32.ne (local.get $num) (i32.const -1))
    (if
      (then
        (i32.ne (local.get $pnum) (i32.const 0))
        (if
          (then
            (i32.eqz (local.get $inc))
            (if
              (then
                (i32.gt_u (local.get $num) (local.get $pnum))
                (if
                  (then
                    (local.set $inc (i32.const 1))
                  )
                  (else
                    (local.set $inc (i32.const -1))
                  )
                )
              )          
            )
            ;; Check to see if it is correct
            (i32.sub
              (local.get $num)
              (local.get $pnum)
            )
            f32.convert_i32_s
            f32.abs
            i32.trunc_f32_s
            local.set $diff
            (i32.lt_u (local.get $diff) (i32.const 1))
            (i32.gt_u (local.get $diff) (i32.const 3))
            (i32.and
              (i32.gt_u (local.get $num) (local.get $pnum))
              (i32.eq (local.get $inc) (i32.const -1))
            )
            (i32.and
              (i32.lt_u (local.get $num) (local.get $pnum))
              (i32.eq (local.get $inc) (i32.const 1))
            )
            i32.or
            i32.or
            i32.or
            (if
              (then
                (local.set $safe (i32.const 1))
              )
            )
          )
        )
        (local.set $pnum (local.get $num))
      )
      (else
        (i32.eqz (local.get $safe))
        (if
          (then
            (local.set $c 
              (i32.add
                (local.get $c)
                (i32.const 1)
              )
            )
          )
        )
        (local.set $pnum (i32.const 0))
        (local.set $inc (i32.const 0))
        (local.set $safe (i32.const 0))
      )
    )
    (local.set $idx
      (i32.add (local.get $idx) (i32.const 1))
    )
    (i32.ne
      (i32.load8_s
        (memory $input)
        (local.get $idx)
      )
      (i32.const 0)
    )
    br_if $loop
  )
  local.get $c
)

(func $count2
  (result i32)
  (local $idx i32)
  (local $pnum i32)
  (local $num i32)
  (local $inc i32)
  (local $safe i32)
  (local $c i32)
  (local $diff i32)
  (local $ignore i32)
  (local $last i32)
  
  (loop $loop
    (local.set $num
      (i32.load8_s
        (memory $input)
        (local.get $idx)
      )
    )
    (i32.ne (local.get $num) (i32.const -1))
    (if
      (then
        (i32.ne
          (local.get $idx)
          (i32.add
            (local.get $last)
            (local.get $ignore)
          )
        )
        (if
          (then
            (i32.ne (local.get $pnum) (i32.const 0))
            (if
              (then
                (i32.eqz (local.get $inc))
                (if
                  (then
                    (i32.gt_u (local.get $num) (local.get $pnum))
                    (if
                      (then
                        (local.set $inc (i32.const 1))
                      )
                      (else
                        (local.set $inc (i32.const -1))
                      )
                    )
                  )          
                )
                ;; Check to see if it is correct
                (i32.sub
                  (local.get $num)
                  (local.get $pnum)
                )
                f32.convert_i32_s
                f32.abs
                i32.trunc_f32_s
                local.set $diff
                (i32.lt_u (local.get $diff) (i32.const 1))
                (i32.gt_u (local.get $diff) (i32.const 3))
                (i32.and
                  (i32.gt_u (local.get $num) (local.get $pnum))
                  (i32.eq (local.get $inc) (i32.const -1))
                )
                (i32.and
                  (i32.lt_u (local.get $num) (local.get $pnum))
                  (i32.eq (local.get $inc) (i32.const 1))
                )
                i32.or
                i32.or
                i32.or
                (if
                  (then
                    (local.set $safe (i32.const 1))
                  )
                )
              )
            )
            (local.set $pnum (local.get $num))
          )
        )
      )
      (else
        (i32.eqz (local.get $safe))
        (if
          (then
            (local.set $c 
              (i32.add
                (local.get $c)
                (i32.const 1)
              )
            )
          )
        )
        (local.set $ignore
          (i32.add 
            (local.get $ignore)
            (i32.const 1)
          )
        )
        (i32.or
          (i32.eq
            (i32.load8_s
              (memory $input)
              (i32.add
                (local.get $last)
                (local.get $ignore)
              )
            )
            (i32.const -1)
          )
          (i32.eqz (local.get $safe))
        )
        (if
          (then
            (local.set $ignore (i32.const 0))
          )
          (else
            (local.set $idx (local.get $last))
          )
        )
        (local.set $pnum (i32.const 0))
        (local.set $inc (i32.const 0))
        (local.set $safe (i32.const 0))
        (local.set $last (local.get $idx))
      )
    )
    (local.set $idx
      (i32.add (local.get $idx) (i32.const 1))
    )
    (i32.ne
      (i32.load8_s
        (memory $input)
        (local.get $idx)
      )
      (i32.const 0)
    )
    br_if $loop
  )
  local.get $c
)

(func (export "part1") (result i32)
  call $parse
  call $count
)

(func (export "part2") (result i32)
  call $parse
  call $count2
)
`,c=e(a,{});async function n(l){const{module:o,memory:t}=await c;return i(l,t),o.part1()}async function s(l){const{module:o,memory:t}=await c;return i(l,t),o.part2()}const u=[n,s];export{u as default};
