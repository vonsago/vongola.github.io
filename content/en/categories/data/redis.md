+++
author = "Ars"
title = "Install redis cluster with docker-compose"
date = "2023-07-01"
description = ""
featured = false
categories = [
  "Data"
]
tags = [
  "Data", "Redis"
]
images = [
  "images/bg/bgh1.jpg"
]
# toc = true
+++ 


# 创建目录
mkdir -p /usr/local/docker-redis/redis-cluster
# 切换至指定目录
cd /usr/local/docker-redis/redis-cluster/
# 编写 redis-cluster.tmpl 文件
vi redis-cluster.tmpl
```
port ${PORT}
requirepass 1234
masterauth 1234
protected-mode no
daemonize no
appendonly yes
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 15000
cluster-announce-ip 192.168.10.10
cluster-announce-port ${PORT}
cluster-announce-bus-port 1${PORT}

port ${PORT}
requirepass 1234
masterauth 1234
protected-mode no
daemonize no
appendonly yes
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 15000
cluster-announce-ip 192.168.10.11
cluster-announce-port ${PORT}
cluster-announce-bus-port 1${PORT}



for port in `seq 6371 6373`; do \
  mkdir -p ${port}/conf \
  && PORT=${port} envsubst < redis-cluster.tmpl > ${port}/conf/redis.conf \
  && mkdir -p ${port}/data;\
done

for port in `seq 6374 6376`; do \
  mkdir -p ${port}/conf \
  && PORT=${port} envsubst < redis-cluster.tmpl > ${port}/conf/redis.conf \
  && mkdir -p ${port}/data;\
done
```

```
version: "3.8"

services:
  redis-6371: # 服务名称
    image: redis # 创建容器时所需的镜像
    container_name: redis-6371 # 容器名称
    restart: always # 容器总是重新启动
    network_mode: "host" # host 网络模式
    volumes: # 数据卷，目录挂载
      - /usr/local/docker-redis/redis-cluster/6371/conf/redis.conf:/usr/local/etc/redis/redis.conf
      - /usr/local/docker-redis/redis-cluster/6371/data:/data
    command: redis-server /usr/local/etc/redis/redis.conf # 覆盖容器启动后默认执行的命令

  redis-6372:
    image: redis
    container_name: redis-6372
    network_mode: "host"
    volumes:
      - /usr/local/docker-redis/redis-cluster/6372/conf/redis.conf:/usr/local/etc/redis/redis.conf
      - /usr/local/docker-redis/redis-cluster/6372/data:/data
    command: redis-server /usr/local/etc/redis/redis.conf

  redis-6373:
    image: redis
    container_name: redis-6373
    network_mode: "host"
    volumes:
      - /usr/local/docker-redis/redis-cluster/6373/conf/redis.conf:/usr/local/etc/redis/redis.conf
      - /usr/local/docker-redis/redis-cluster/6373/data:/data
    command: redis-server /usr/local/etc/redis/redis.conf


version: "3.8"

services:
  redis-6374: # 服务名称
    image: redis # 创建容器时所需的镜像
    container_name: redis-6374 # 容器名称
    restart: always # 容器总是重新启动
    network_mode: "host" # host 网络模式
    volumes: # 数据卷，目录挂载
      - /usr/local/docker-redis/redis-cluster/6374/conf/redis.conf:/usr/local/etc/redis/redis.conf
      - /usr/local/docker-redis/redis-cluster/6374/data:/data
    command: redis-server /usr/local/etc/redis/redis.conf # 覆盖容器启动后默认执行的命令

  redis-6375:
    image: redis
    container_name: redis-6375
    network_mode: "host"
    volumes:
      - /usr/local/docker-redis/redis-cluster/6375/conf/redis.conf:/usr/local/etc/redis/redis.conf
      - /usr/local/docker-redis/redis-cluster/6375/data:/data
    command: redis-server /usr/local/etc/redis/redis.conf

  redis-6376:
    image: redis
    container_name: redis-6376
    network_mode: "host"
    volumes:
      - /usr/local/docker-redis/redis-cluster/6376/conf/redis.conf:/usr/local/etc/redis/redis.conf
      - /usr/local/docker-redis/redis-cluster/6376/data:/data
    command: redis-server /usr/local/etc/redis/redis.conf
```

```
docker exec -it  xx bash
cd /usr/local/bin

redis-cli -a 1234 --cluster create 172.22.119.17:6371 172.22.119.17:6372 172.22.119.17:6373 172.22.119.25:6374 172.22.119.25:6375 172.22.119.25:6376 --cluster-replicas 1

mongosh mongodb://live:8O3ydQyaPf4qLIvvg5MLxX3TSVCnF2JK@10.157.17.32:10070,10.157.11.24:10070,10.157.14.38:10070/live?readPreference=secondaryPreferred --authenticationDatabase admin

import sys

if __name__ == "__main__":
    _, t = sys.argv
    if t == "export":
        os.system("mongoexport -u video_admin -p 7O0lDzpfxUHEDnUOuX83HQQdfNvi8aCM -h 10.69.169.36:27024 --authenticationDatabase admin -d video-calc -c tasks --type json -o tasks.json")
    else:
        os.system("mongosh mongodb://live:8O3ydQyaPf4qLIvvg5MLxX3TSVCnF2JK@10.157.17.32:10070,10.157.11.24:10070,10.157.14.38:10070/live?readPreference=secondaryPreferred --authenticationDatabase admin")

```
