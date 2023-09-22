+++
author = "Ars"
title = "HTTP Method POST vs GET"
date = "2022-08-03"
description = ""
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

## 语义角度
GET 通常用于获取资源或者执行无副作用的操作

POST 通常用于提交数据并执行更改服务器状态的操作（服务器需要更多时间来处理 POST 请求）

## 安全角度
GET 请求将数据明文附加到 URL 中会存在一些安全和隐私问题，会缓存静态资源

POST 请求数据包含在请求的主题中，不会作为 URL 的一部分，通常不会被缓存，保存在服务器日志，以及浏览器浏览记录中

## 数据传输角度
GET 编码类型 application/x-www-form-urlencoded

POST application/x-www-form-urlencoded or multipart/form-data

GET 只允许 ASCII 字符

POST 没有限制，允许二进制数据

GET 不同的浏览器对长度大小限制不一（本质 HTTP 对提交的数据是没有限制的）

POST 理论上大小限制取决于服务器处理能力（长度超限，返回 414）



