+++
author = "Ars"
title = "Linux Signal"
date = "2024-04-24"
description = ""
featured = false
categories = [
  "Linux"
]
tags = [
    "Linux"
]
images = [
  "images/bg/bgh1.jpg"
]
# toc = true
+++ 

通过 man 7 signal 给出了官方手册

## SINGHUP 1
如果一个进程正在从终端运行并且该终端突然消失，则该进程会收到此信号。HUP是挂断的缩写，指的是在电话调制解调器时代挂断电话

## SIGINT 2
进程被“中断”。当您按下 Control+C 时会发生这种情况控制终端。

## SIGQUIT 3
退出

## SIGILL 4
非法指令。该程序包含CPU的一些机器代码无法理解。

## SIGTRAP 5
该信号主要在调试器和程序跟踪器中使用。

## SIGABRT 6
程序调用了 abort() 函数。这是紧急停止。

## SIGBUS 7
尝试错误地访问内存。这可能是由于内存访问中的对齐错误等。

## SIGFPE 8
程序中发生浮点异常。

## SIGKILL 9
该进程被使用kill命令的人明确杀死程序。

## SIGUSR1 10
留给程序员做他们想做的事。

## SIGSEGV 11
尝试访问未分配给进程的内存。这通常是由读取数组末尾等引起的。

## SIGUSR2 12
留给程序员做他们想做的事。

## SIGPIPE 13
如果一个进程正在生成输出并被送入另一个进程，通过管道（“生产者 | 消费者”）和消费者使用它死亡然后生产者被发送这个信号。

## SIGALRM 14
进程可以在某个时间向操作系统请求“唤醒呼叫”通过调用alarm()函数来确定未来的时间。 当那个时刻到来时整个唤醒呼叫由该信号组成。

## SIGTERM 15
该进程被使用kill命令的人明确杀死程序。

## 16 unused

## SIGCHLD 17
该进程先前已创建一个或多个子进程fork() 函数。 这些进程中的一个或多个已经死亡。

## SIGCONT 18
（与 SIGSTOP 一起读取。）
如果进程已通过发送 SIGSTOP 暂停，然后发送对进程发出 SIGCONT 信号会再次唤醒它（“继续”它）。

## SIGSTOP 19
（与 SIGCONT 一起读取。）
如果一个进程被发送 SIGSTOP，它就会被操作系统暂停。 它的所有状态都已保留，可供重新启动（通过 SIGCONT），但它没有在此之前获得更多的 CPU 周期。

## SIGTSTP 20
与SIGSTOP 本质上相同。 这是用户点击时发送的信号终端上的 Control+Z。 （SIGTSTP 是“终端停止”的缩写）
SIGTSTP 和 SIGSTOP 之间的唯一区别是暂停仅是 SIGTSTP 的默认操作，但却是 SIGTSTP 的必需操作信号停止。 该进程可以选择以不同的方式处理 SIGTSTP，但不会得到任何结果关于 SIGSTOP 的选择。

## SIGTTIN 21
操作系统向后台进程发送此信号尝试从终端读取输入。 典型的反应是暂停（根据SIGSTOP 和 SIFTSTP）并等待 SIGCONT 到达进程被带回到前台。

## SIGTTOU 22
操作系统向后台进程发送此信号尝试将输出写入其终端。 典型的响应如下签署。

## SIGURG 23
操作系统使用网络将此信号发送到进程当“紧急”带外数据发送到它时连接。

## SIGXCPU 24
操作系统将此信号发送给已超出其限制的进程CPU 限制。可以在运行 make 之前使用 shell 命令 ulimit -t unlimited 取消任何 CPU 限制，但如果达到 make 中的 CPU 限制，则更可能出现问题。

## SIGXFSZ 25
操作系统将此信号发送到尝试创建超出文件大小限制的文件进程。可以在运行 make 之前使用 shell 命令 ulimit -f unlimited 取消任何文件大小限制，但是如果达到 make 中的文件大小限制，则更有可能出现问题。

## SIGVTALRM 26
这与 SIGALRM 非常相似，但 SIGALRM 是在经过一定的实际时间后，在运行进程花费一定量的时间后发送 SIGVTALRM 。

## SIGPROF 27
这也与 SIGALRM 和 SIGVTALRM 非常相似，但是 SIGALRM 是在经过一定的实时时间后发送，在经过一定的实时时间后发送，SIGPROF 是在运行进程并代表进程运行系统代码一段时间后发送的。

## SIGWINCH 28
（现在大多未使用。）过去，当一个进程的窗口之一调整大小时，它会发送此信号。

## SIGIO 29
（也称为 SIGPOLL。）当有一些输入可供处理或者输出通道已经准备好写入时，进程可以安排将此信号发送给它。

## SIGPWR 30
由电源管理服务发送到进程的信号，表明电源已切换至短期应急电源。该进程（尤其是长时间运行的守护进程）可能会在紧急电源发生故障之前关闭 cleanlt。

## SIGSYS 31
unused
