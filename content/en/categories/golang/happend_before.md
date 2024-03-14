+++
author = "Ars"
title = "golang happened-before"
date = "2024-03-14"
description = ""
featured = false
categories = [
  "Data"
]
tags = [
 "Golang"
]
images = [
  "images/bg/bgh1.jpg"
]
# toc = true
+++ 

关于 channel 的发送（send）、发送完成（send finished）、接收（receive）、接收完成（receive finished）的 happened-before 关系如下：

1.第 n 个 send 一定 happened before 第 n 个 receive finished，无论是缓冲型还是非缓冲型的 channel。
2.对于容量为 m 的缓冲型 channel，第 n 个 receive 一定 happened before 第 n+m 个 send finished。
3.对于非缓冲型的 channel，第 n 个 receive 一定 happened before 第 n 个 send finished。
4.channel close 一定 happened before receiver 得到通知。

