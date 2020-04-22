---
title: Linux 面试题
author: Von
date: 2019-11-15 13:50:43
subtitle: 先来100道题开开胃
tags:
    - linux
    - system
---

<!-- toc -->

# Linux

## cron daemon

Cron 是一个守护程序，用于计划可以想象的任何类型的任务（**管理系统日常任务的调度**）。Windows 上被称为“Task Scheduler”
命令`crontab`常见于`Unix-Like`系统，用于设置周期性被执行的指令。
该命令从标准输入设备读取指令，并将其存放于“crontab”文件中，以供之后读取和执行。

## block device

块设备是代表某种设备的一种文件，具有可在块中读取或写入的数据。
块设备通常代表某种大容量存储单元（例如，硬盘或USB笔式驱动器上的分区）。

[Detail](https://en.wikipedia.org/wiki/Device_file#Block_devices)

## more

more命令是一个基于vi编辑器文本过滤器，它以全屏幕的方式按页显示文本文件的内容
该命令可以一次显示一页内容，满屏后停下来

## du

查看在当前目录下还有多大剩余空间`du .`

## chmod

更改文件的权限

## runlevel & telinit

`runlevel`读取系统的utmp文件夹定位系统的运行级别记录，然后显示当前系统的执行等级
运行级别指的是`Unix-Like`系统下不同的运行模式，通常分为7等，分别是从0到6

```
0 ：停机
1 ：单用户模式
2 ：多用户模式，无网络
3 ：完全的多用户模式
4 ：用户自定义
5 ：图形界面多用户模式
6 ：重启 
```

`telinit`命令可以设置当前系统的运行等级

## atq

可以列出定义在以后特定时间运行一次的所有任务

## set

`set PS1="[\u\w\t]\$" ; export PS1`的作用是
改变命令提示符

## skel

`/etc/skel`目录作用是在建立新用户时，用于初始化用户根目录

## export

显示和设置环境变量值
`export PATH=$PATH:/usr/local/bin`  #将/usr/local/bin加入环境变量中

## chmod

linux 中权限的粒度有 拥有者 、群组 、其它组 三种

```
-rw------- (600)  只有拥有者有读写权限。
-rw-r--r-- (644)  只有拥有者有读写权限；而属组用户和其他用户只有读权限。
-rwx------ (700)  只有拥有者有读、写、执行权限。
-rwxr-xr-x (755)  拥有者有读、写、执行权限；而属组用户和其他用户只有读、执行权限。
-rwx--x--x (711)  拥有者有读、写、执行权限；而属组用户和其他用户只有执行权限。
-rw-rw-rw- (666)  所有用户都有文件读、写权限。
-rwxrwxrwx (777)  所有用户都有读、写、执行权限。
```

算法：
`rw-` = `110` = `6`

## userdel

删除使用者帐号及相关档案

## umount

卸除文件系统

## umask

用来设置限制新文件权限的掩码
从权限中“拿走”相应的位,且文件创建时不能赋予执行权限

对于目录，用户所能拥有的最大权限是777；对于文件，用户所能拥有的最大权限是目录的最大权限去掉执行权限，即666
对于root用户，他的umask值是022。当root用户创建目录时，默认的权限就是用最大权限777去掉相应位置的umask值权限，即对于所有者不必去掉任何权限，对于所属组要去掉w权限，对于其他用户也要去掉w权限，所以目录的默认权限就是755；
当root用户创建文件时，默认的权限则是用最大权限666去掉相应位置的umask值，即文件的默认权限是644。

## which

查找环境变量中的文件
查找一个二进制命令的路径

## mount

加载指定的文件系统

`mount -a` 用来装载所有在 /etc/fstab 中定义的文件系统

## nice

以指定的优先级运行命令，这会影响相应进程的调度。
如果不指定命令，程序会显示当前的优先级。优先级的范围是从 -20
(最大优先级) 到 19 (最小优先级)。

## tail

显示一个文件最后几行

## tr

`tr a-z A-Z` 把一个流中所有字符转换成大写字符

## dmesg

被用于检查和控制内核的环形缓冲区。
Linux 启动信息保存在`/var/log/dmesg`文件里

## 显示系统中各个分区中inode的使用情况

`df -i`

## 显示Linux系统中注册的用户数

`wc --lines /etc/passwd`

## kill 9 的含义

sends SIGTERM to the process whose PID IS 9

## 今天午夜运行命令 cmd1

`echo "cmd1" | at midnight`

## 用户的变量设置

`/etc/profile`

## 如果cmd1成功执行，则执行cmd2命令

`cmd1&&cmd2`

## 定义网卡的I/O地址

`cat /proc/ioports`

## Linux中，提供TCP/IP包过滤功能的软件

`iptables`

## 暂停一个打印队列

`lpc`

## 哪个协议使用了二个以上的端口

`FTP`

## 哪个命令可以压缩部分文件

`tar -czvf filename.tgz *`

## 解压缩tar文件

`tar -xzvf filename.tgz`

## ping使用的协议是

`ICMP`

## 查看网络故障的命令

`ping` `telnet` `netstat`

## 拨号上网使用的协议

`PPP`

## 定义了网络服务的端口

`/etc/services`

## 查看网卡的中断

`cat /proc/interrupts`

---

## CPU

CPU 的全称是 Central Processing Unit
CPU 的核心是从程序或应用程序获取指令并执行计算。此过程可以分为三个关键阶段：提取，解码和执行。CPU从系统的主存中提取指令，然后解码该指令的实际内容，然后再由 CPU 的相关部分执行该指令。
几乎所有的冯·诺伊曼型计算机的CPU，其工作都可以分为5个阶段：取指令、指令译码、执行指令、访存取数、结果写回

## MySQL

