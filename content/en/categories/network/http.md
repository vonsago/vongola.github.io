+++
author = "Ars"
title = "History of HTTP"
date = "2023-01-06"
description = "HTTP 协议的历史"
featured = false
categories = [
  "Network"
]
tags = [
  "HTTP"
]
images = [
  "images/bg/bgh1.jpg"
]
# toc = true
+++ 


# HTTP 0.9
也叫做单行（one-line）协议，基于 TCP 只允许 GET，只会响应 HTML 格式的字符串

# HTTP 1.0
增加了请求头，版本号（比如 content-type，就可以传输不同类型的数据）

请求方法扩展了 GET，HEAD，POST，响应带上了状态码


# HTTP 1.1
支持长连接：在 HTTP1.1 中默认开启 Connection： keep-alive，允许在一个 TCP 连接上传输多个 HTTP 请求和响应，减少了建立和关闭连接造成的性能消耗。

支持流水线：在同一条长连接上发出连续的请求，而不用等待应答返回。这样可以避免连接延迟

支持响应分块：对于比较大的响应，HTTP/1.2 通过 Transfer-Encoding 首部支持将其分割成多个任意大小的分块，每个数据块在发送时都会附上块的长 度，最后用一个零长度的块作为消息结束的标志。

新的缓存控制机制：HTTP/1.1定义的 Cache-Control 头用来区分对缓存机制的支持情况，同时，还提供 If-None-Match, ETag ,  Last-Modified, If-Modified-Since 等实现缓存的验证等工作。

请求头增加 HOST 字段：允许不同域名配置到同一IP的服务器上，它指明了请求将要发送到的服务器主机名和端口号，这是一个必须字段，请求缺少该字段服务端将会返回 400

引入内容协商机制，包括语言，编码，类型等，并允许客户端和服务器之间约定以最合适的内容进行交换。

使用了 100 状态码


# HTTP 2.0
采用多路复用解决了队头阻塞的问题（在一个TCP中按序发送，前面请求处理慢）

二进制传输
请求和响应复用
Header压缩
Server Push（服务端推送）

# QUIC
基于 UDP，与 TLS 深度集成、支持多个独立的字节流、使用连接 ID、使用帧（frame）
