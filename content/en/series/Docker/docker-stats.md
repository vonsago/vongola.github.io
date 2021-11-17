+++
author = "Ars"
title = "Docker Stats"
date = "2020-02-20"
description = "docker stats"
featured = true
categories = [
]
tags = [
  "Linux",
  "Docker"
]
series = [
  "docker"
]
images = [
  "images/bg/bg2.jpeg"
]
# toc = true
+++

# Docker Stats
```
是基于docker 1.10.3版本的源码，
对docker stats命令进行源码分析，看看docker stats命令输出的数据是从cgroups fs中怎么怎么计算出来的。

$ docker stats nginx-test |CONTAINER|CPU % |MEM USAGE / LIMIT|MEM %|NET I/O |BLOCK I/O | |---|---|---|---|---|---| | nginx-test|0.00% |    4.268 MB / 1.041 GB     |    0.41%     |    1.296 kB / 648 B    |    7.463 MB / 0 B|

docker client相关代码入口可参考：/docker/docker/api/client/stats.go#141 docker daemon相关代码入口可参考：/docker/docker/daemon/daemon.go#1474

##源码分析结果 ###Cpu数据： docker daemon会记录这次读取/sys/fs/cgroup/cpuacct/docker/[containerId]/cpuacct.usage的值，作为cpu_total_usage；并记录了上一次读取的该值为pre_cpu_total_usage；

读取/proc/stat中cpu field value，并进行累加，得到system_usage;并记录上一次的值为pre_system_usage；

读取/sys/fs/cgroup/cpuacct/docker/[containerId]/cpuacct.usage_percpu中的记录，组成数组per_cpu_usage_array；

docker stats计算Cpu Percent的算法：

 cpu_delta = cpu_total_usage - pre_cpu_total_usage; system_delta = system_usage - pre_system_usage; CPU % = ((cpu_delta / system_delta) * length(per_cpu_usage_array) ) * 100.0
```

###Memory数据：
```
读取/sys/fs/cgroup/memory/docker/[containerId]/memory.usage_in_bytes的值，作为mem_usage；

如果容器限制了内存，则读取/sys/fs/cgroup/memory/docker/[id]/memory.limit_in_bytes作为mem_limit，否则mem_limit = machine_mem；

docker stats计算Memory数据的算法：

 MEM USAGE = mem_usage MEM LIMIT = mem_limit MEM % = (mem_usage / mem_limit) * 100.0


Networt Stats数据：
获取属于该容器network namespace veth pairs在主机中对应的veth*虚拟网卡EthInterface数组，然后循环数组中每个网卡设备，读取/sys/class/net/<EthInterface>/statistics/rx_bytes得到rx_bytes, 读取/sys/class/net/<EthInterface>/statistics/tx_bytes得到对应的tx_bytes。

将所有这些虚拟网卡对应的rx_bytes累加得到该容器的rx_bytes。

将所有这些虚拟网卡对应的tx_bytes累加得到该容器的tx_bytes。

docker stats计算Network IO数据的算法：

 NET I = rx_bytes NET O = tx_bytes

```
###Blkio Stats数据： 获取每个块设备的IoServiceBytesRecursive数据：先去读取/sys/fs/cgroup/blkio/docker/[containerId]/blkio.io_serviced_recursive中是否有有效值，
```
如果有，则读取/sys/fs/cgroup/blkio/docker/[containerId]/blkio.io_service_bytes_recursive的值返回；
如果没有，就去读取/sys/fs/cgroup/blkio/docker/[containerId]/blkio.throttle.io_service_bytes中的值返回；
将每个块设备的IoServiceBytesRecursive数据中所有read field对应value进行累加，得到该容器的blk_read值； 将每个块设备的IoServiceBytesRecursive数据中所有write field对应value进行累加，得到该容器的blk_write值；

docker stats计算Block IO数据的算法：

 BLOCK I = blk_read BLOCK O = blk_write
```
