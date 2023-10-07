+++
author = "Ars"
title = "Tuning page size and compression of mongodb"
date = "2023-10-07"
description = ""
featured = false
categories = [
  "Mongodb"
]
tags = [
  "Mongodb"
]
images = [
  "images/bg/bgh1.jpg"
]
# toc = true
+++ 


## memory_page_max
在协调到磁盘之前表的页面在内存中允许增长的最大大小。

默认 5MB [512B, 10TB]，leaf_page_max <= memory_page_max <= cache_size/10

memory_page_max 对于想要调整写入密集型工作负载一致性的应用程序非常重要。

可以调整不每个表总体吞吐量和单独操作延迟之间的平衡

## internal_page_max
B 树协调的磁盘内部页面的最大页面大小（以字节为单位）。当内部页面增长超过此大小时，它会分成多个页面。

默认 4KB [512B, 512MB]

对于希望在搜索树时避免过多的二级缓存未命中的应用程序来说，internal_page_max 非常重要

主要影响B 树的深度和形状，进而影响性能

## leaf_page_max
B 树协调的磁盘叶页的最大页大小（以字节为单位）。当叶页增长超过此大小时，它会分裂为多个页。

默认 32KB [512B, 512MB] 

影响想要最大化存储设备的顺序数据传输，I/O 性能

ref.https://source.wiredtiger.com/develop/arch-cache.html


