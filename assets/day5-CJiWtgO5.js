import{a as c,m as t}from"./index-Btdp0kZ0.js";const a=`
(import "js" "raw" (memory $raw 1))
(memory $order 1)
(memory $reports 1)
(memory $indexes 1)

(func $parse 
  (local $idx i32)
  (local $str i32)
  (local $num i32)
  (local $out i32)
  (local $mode i32)
  
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
      (else
        (i32.eqz (local.get $num))
        (if
          (then
            (local.set $mode (i32.const 1))
            ;; Add a padding 0
            (i32.store8
              (memory $order)
              (local.get $out)
              (i32.const 0)
            )
            (local.set $out (i32.const 0))
          )
          (else
            (i32.eqz (local.get $mode))
            (if
              (then
                (i32.store8
                  (memory $order)
                  (local.get $out)
                  (local.get $num)
                )
              )
              (else
                (i32.store8
                  (memory $reports)
                  (local.get $out)
                  (local.get $num)
                )
                (i32.or
                  (i32.eq (local.get $str) (i32.const 10)) ;; Newline
                  (i32.eq (local.get $str) (i32.const 0)) ;; End of input
                )
                (if
                  (then
                    (local.set $out
                      (i32.add
                        (local.get $out)
                        (i32.const 1)
                      )
                    )
                    (i32.store8
                      (memory $reports)
                      (local.get $out)
                      (i32.const -1) ;; End of update
                    )
                  )
                )
              )
            )
            (local.set $num (i32.const 0))
            (local.set $out
              (i32.add
                (local.get $out)
                (i32.const 1)
              )
            )
          )
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
    (local.set $idx
      (i32.add (local.get $idx) (i32.const 1))
    )
    br_if $loop
  )
  ;; Add a padding zero
  (i32.store8
    (memory $reports)
    (local.get $out)
    (i32.const 0)
  )
)

(func $works
  (result i32)
  (local $i1 i32)
  (local $i2 i32)
  (local $ord i32)
  
  (loop $loop
    (local.set $i1
      (i32.load8_u
        (memory $order)
        (local.get $ord)
      )
    )
    (local.set $ord
      (i32.add (local.get $ord) (i32.const 1))
    )
    (local.set $i2
      (i32.load8_u
        (memory $order)
        (local.get $ord)
      )
    )
    (local.set $ord
      (i32.add (local.get $ord) (i32.const 1))
    )
  
    ;; Cheat by reusing the local
    (local.set $i1
      (i32.load8_u
        (memory $indexes)
        (local.get $i1)
      )
    )
    (local.set $i2
      (i32.load8_u
        (memory $indexes)
        (local.get $i2)
      )
    )
    (i32.and
      (i32.ne (local.get $i1) (i32.const 0))
      (i32.ne (local.get $i2) (i32.const 0))
    )
    (i32.ge_u (local.get $i1) (local.get $i2))
    i32.and
    (if
      (then
        local.get $ord
        return
      )
    )

    (i32.ne
      (i32.load8_s
        (memory $order)
        (local.get $ord)
      )
      (i32.const 0)
    )
    br_if $loop
  )
  i32.const 0
)

(func $check
  (result i32)
  (local $idx i32)
  (local $num i32)
  (local $sum i32)
  (local $count i32)
  
  (loop $loop
    (local.set $num
      (i32.load8_s
        (memory $reports)
        (local.get $idx)
      )
    )
    
    (i32.ne (local.get $num) (i32.const -1))
    (if
      (then
        (local.set $count (i32.add (local.get $count) (i32.const 1)))
        (i32.store8
          (memory $indexes)
          (local.get $num)
          (local.get $count)
        )
      )
      (else
        (i32.eqz (call $works))
        (if
          (then
            (i32.sub
              (local.get $idx)
              (i32.add
                (i32.div_u
                  (local.get $count)
                  (i32.const 2)
                )
                (i32.const 1)
              )
            )
            (i32.load8_u (memory $reports))
            local.get $sum
            i32.add
            local.set $sum
          )
        )
        ;; Clear all indexes (there's no way around it)
        (memory.fill
          (memory $indexes)
          (i32.const 0)
          (i32.const 0)
          (i32.const 65536)
        )
        (local.set $count (i32.const 0))
      )
    )
  
    (local.set $idx
      (i32.add (local.get $idx) (i32.const 1))
    )
    (i32.ne
      (i32.load8_s
        (memory $reports)
        (local.get $idx)
      )
      (i32.const 0)
    )
    br_if $loop
  )
  local.get $sum
)

(func $check2
  (result i32)
  (local $idx i32)
  (local $num i32)
  (local $sum i32)
  (local $count i32)
  (local $ridx i32)
  (local $num1 i32)
  (local $temp1 i32)
  (local $temp2 i32)
  (local $test i32)
  (local $idx2 i32)
  (local $num2 i32)
  
  (loop $loop
    (local.set $num
      (i32.load8_s
        (memory $reports)
        (local.get $idx)
      )
    )
    
    (i32.ne (local.get $num) (i32.const -1))
    (if
      (then
        (local.set $count (i32.add (local.get $count) (i32.const 1)))
        (i32.store8
          (memory $indexes)
          (local.get $num)
          (local.get $count)
        )
      )
      (else
        (local.set $ridx (call $works))
        (i32.ne (local.get $ridx) (i32.const 0))
        (if
          (then
            (loop $loop2
              ;; Swap thing
              (local.set $num1
                (i32.load8_u
                  (memory $order)
                  (i32.sub
                    (local.get $ridx)
                    (i32.const 2)
                  )
                )
              )
              (local.set $num2
                (i32.load8_u
                  (memory $order)
                  (i32.sub
                    (local.get $ridx)
                    (i32.const 1)
                  )
                )
              )
              (local.set $temp1
                (i32.load8_u
                  (memory $indexes)
                  (local.get $num1)
                )
              )
              (local.set $temp2
                (i32.load8_u
                  (memory $indexes)
                  (local.get $num2)
                )
              )
              (i32.store8
                (memory $indexes)
                (local.get $num1)
                (local.get $temp2)
              )
              (i32.store8
                (memory $indexes)
                (local.get $num2)
                (local.get $temp1)
              )
              (local.set $ridx (call $works))
              (i32.ne (local.get $ridx) (i32.const 0))
              br_if $loop2
              ;; Find the original index
              (local.set $test
                (i32.add
                  (i32.div_u
                    (local.get $count)
                    (i32.const 2)
                  )
                  (i32.const 1)
                )
              )
              (loop $loop3
                (local.set $num2
                  (i32.load8_u
                    (memory $indexes)
                    (local.get $idx2)
                  )
                )
                (i32.eq (local.get $test) (local.get $num2))
                (if
                  (then
                    (local.set $sum
                      (i32.add
                        (local.get $sum)
                        (local.get $idx2)
                      )
                    )
                  )
                  (else
                    (local.set $idx2
                      (i32.add (local.get $idx2) (i32.const 1))
                    )
                    br $loop3
                  )
                )
              )
              (local.set $idx2 (i32.const 0))
            )
          )
        )
        ;; Clear all indexes (there's no way around it)
        (memory.fill
          (memory $indexes)
          (i32.const 0)
          (i32.const 0)
          (i32.const 65536)
        )
        (local.set $count (i32.const 0))
      )
    )
  
    (local.set $idx
      (i32.add (local.get $idx) (i32.const 1))
    )
    (i32.ne
      (i32.load8_s
        (memory $reports)
        (local.get $idx)
      )
      (i32.const 0)
    )
    br_if $loop
  )
  local.get $sum
)

(func (export "part1") (result i32)
  call $parse
  call $check
)

(func (export "part2") (result i32)
  call $parse
  call $check2
)
`,i=c(a,{});async function $(o){const{module:l,memory:e}=await i;return t(o,e),l.part1()}async function s(o){const{module:l,memory:e}=await i;return t(o,e),l.part2()}const r=[$,s];export{r as default};
