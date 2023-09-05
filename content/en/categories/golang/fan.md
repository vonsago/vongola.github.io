+++
author = "Ars"
title = "Fan vs go func"
date = "2021-11-29"
description = "Golang Notes"
featured = false
categories = [
  "Golang"
]
images = [
  "images/bg/go.png"
]
# toc = true
+++

## test script
```golang
func gen(nums ...int) <-chan int {
   out := make(chan int)
   go func() {
      for _, n := range nums {
         out <- n
      }
      close(out)
   }()
   return out
}
func sq(in <-chan int) <-chan int {
   out := make(chan int)
   go func() {
      for n := range in {
         out <- n * n
      }
      close(out)
   }()
   return out
}

func merge(cs ...<-chan int) <-chan int {
   var wg sync.WaitGroup
   out := make(chan int)

   // Start an output goroutine for each input channel in cs.  output
   // copies values from c to out until c is closed, then calls wg.Done.
   output := func(c <-chan int) {
      for n := range c {
         out <- n
      }
      wg.Done()
   }
   wg.Add(len(cs))
   for _, c := range cs {
      go output(c)
   }

   // Start a goroutine to close out once all the output goroutines are
   // done.  This must start after the wg.Add call.
   go func() {
      wg.Wait()
      close(out)
   }()
   return out
}

func TestFan(t *testing.T) {
   x := []int{0}
   for i := 1; i < 10000; i++ {
      x = append(x, i)
   }
   st := time.Now().UnixMicro()
   c := gen(x...)

   out := []<-chan int{}
   for i := 0; i < 10; i++ {
      out = append(out, sq(c))
   }

   // Consume the output.
   for n := range merge(out...) {
      fmt.Println(n) // 4 then 9, or 9 then 4
   }
   t1 := time.Now().UnixMicro() - st

   fmt.Println("=======")
   st = time.Now().UnixMicro()
   var wg sync.WaitGroup
   wg.Add(len(x))
   for _, i := range x {
      go func(x int) {
         defer wg.Done()
         fmt.Println(x * x)
      }(i)
   }
   wg.Wait()
   t2 := time.Now().UnixMicro() - st

   fmt.Printf("===%d vs %d", t1, t2)
   assert.Assert(t, t1 < t2)
}

// performace 1:4

```
