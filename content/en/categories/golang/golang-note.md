+++
author = "Ars"
title = "Golang Notes"
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

## Keywords

### context
- golang 并发编程中常用的一种编程模式
- 上层任务取消后（超时，取消操作或者异常情况），所有下层的任务都会被取消
- 中间的某一层任务取消后，只会将当前任务的下层任务取消，但不影响上层任务以及同级任务

### 