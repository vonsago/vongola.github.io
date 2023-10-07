+++
author = "Ars"
title = "Docker Log"
date = "2021-09-09"
description = "how docker log storage"
featured = false
categories = [
  "Kubernetes"
]
tags = [
  "Kubernetes"
]
images = [
  "images/bg/bgh1.jpg"
]
# toc = true
+++

# Docker
docker 支持的日志驱动，配置文件 `/etc/docker/daemon.json`

none 没有容器日志，无任何输出

local 自定义格式存储

json-file 默认驱动程序，json

syslog 依赖 syslog 守护进程，可指定路径

journald 依赖 journald 守护进程，相比 syslog 采用二进制存储，提供搜索，自动添加时间戳

gelf Graylog

fluentd 转发输入

awklog, spluntk, etwlogs, gcplogs, logentries


ref.https://xujiahua.github.io/posts/20200403-docker-logging/
