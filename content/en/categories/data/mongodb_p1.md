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

## Mongodb 存储到底是Btree 还是B+tree
实际上要讨论的是 WiredTiger 存储引擎到底是什么结构

提前要对齐的几件事情

- 文档中称表是B-Trees是一种简单表达，而不是完全正确的术语
- WiredTiger包含许多不符合 Btree B 或者 Plus tree 的经典定义和设计选择（其他数据库也会有类似的变化）

WiredTiger 的btree确实将所有的键值对存储在叶页中（溢出页目前是个例外并且在优化中）

它不提供从一个叶子到下一个叶子的链接，这是因为将更新的页面写入文件中的新位置，使用这种方式链接叶子页是不切实际的（这个需要更新指向他的页中的指针，所以这个更新操作又需要写入新的位置，最后会重写每个页）

实际上，WiredTiger通过返回父页来实现从一个叶子页移动到下一个叶子页，因为内部缓存永远都不会驱逐btree页面，所以通过这个方式移动时候能保证所有的父节点都在缓存中

FWIW，Douglas Comer 1979 年关于 B 树的经典论文说，在 B+ 树中“叶节点*通常*链接在一起”（第 129 页，重点是我的）。所以从来没有严格要求B+树有这些链接。


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


