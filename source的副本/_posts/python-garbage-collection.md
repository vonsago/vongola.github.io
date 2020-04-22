---
title: Python 垃圾回收原理
author: Von
date: 2019-11-07 17:59:46
subtitle: "Python 垃圾回收机制"
tags:
    - python
---

<!-- toc -->

# Python GC
##Python 垃圾回收原理
### 对象
Python所谓的“一切皆对象”，实际上说的是：
python有一个`Common Object Structures`通用对象结构的东西，所有在内存中是`PyObject`和`PyVarObject`类型的，都会共享少量字段，如**引用计数**和指向相应类型对象的指针。

- PyObject 此类型扩展出了所有的Python对象。它包含**引用计数**和**指向相应类型对象的指针**
- PyVarObject 是对PyObject类型的扩展。添加了**ob_size**属性，并且仅用于具有**length**概念的对象

引用计数`ob_refcnt`原理

- 当为对象分配了新名称，将对象作为参数传递给函数，或将其放置在诸如元组或字典的数据结构中，引用计数会增加
- 当重新分配对对象的引用，对象的引用超出范围或删除对象时，引用计数也会减少

```
# 可以通过 sys 模块中下面的方法获取参数的引用计数
sys.getrefcount(a)
```
### 内存：

- 是一个堆
- 包含程序中使用的对象和其他数据结构
- 内存堆空间的分配和取消分配是通过Python内存管理器使用API​​函数管理的。
- 和其他语言不同，Python不一定会把内存释放回操作系统
- Python解释器为小于512字节的对象提供了专用的对象分配器，从而保留了一些已分配的内存块，以备使用

*对内存需做更深的研究*

### 垃圾回收
**python释放不再使用的内存，这项工作就称为垃圾回收。**

何时回收：

- 当引用计数为0

```
引用计数的优点是原理简单、将消耗均摊到运行时；缺点是无法处理循环引用
```

- 三代垃圾收集器(目前只有三代)中的每一代都有一个阈值和一个计数器。计数器值为上次GC后对象分配数量-释放数量。当计数器超过该阈值，则触发这一代GC。内存释放过后仍存在的对象，将会移植到更老的一代。

```
分代回收可以处理引用计数无法处理的情况：循环引用，但是无法处理循环引用中的对象定义了__del__的情况
分代回收并不是实时工作，而是定期运行，每次回收会造成一定的卡顿
老一代的回收频率比新一代的低，而且新一代的回收更多。
```
**循环引用示例：**

```
>>> from ctypes import *
>>> class ObjRnt(Structure):
...     _fields_ = [('refcnt',c_int)]
...
>>> l = []
>>> l.append(l)
>>> l_address = id(l)
>>> del(l)
>>> ObjRnt.from_address(l_address).refcnt
1
```
可以看出，如果`del`对象后，`lst`不可再被 Python 内部访问了，但是他的地址上来看，他的循环引用计数并不是0。更详细的Debug方法可以往下看

**如果没有禁用垃圾回收，那么Python中的内存泄露有两种情况：**

```
要么是对象被生命周期更长的对象所引用，比如global作用域对象；
要么是循环引用中存在__del__；
```

垃圾回收比较耗性能，解除循环引用，就可以禁用垃圾回收。解除循环引用的办法：

- 手动解除
- 使用weakref(弱引用)

[wakref py3.6](https://docs.python.org/3.6/library/weakref.html)
## 传统的 GC
比如标记-清除或停止-复制的**工作机制**如下：

- 1.找出系统的根对象。包含全局环境（例如Python中的__main__模块）和堆栈上的对象
- 2.从这些对象中搜索并找到所有可到达的对象。找到的对象都是“活着的”
- 3.释放所有其他对象

其存在的问题很明显：与其说访问所有可以访问，并且“活着的”对象，不如尝试查找不可访问的对象。

所以，GC 的**算法原理**是这样的：
因为只有容器对象（如list，dict，class等；int，str不是容器对象）可能存在循环引用的情况。所以，我们只跟踪所有容器对象。具体来说使用了`doubly linked lists`的数据结构。

- 1.对容器对象添加了`gc_refs`字段和两个链接指针
- 2.将每一个容器对象的`gc_refs`设置为等于该对象的引用计数
- 3.找到每一个容器对象它所引用的容器对象，并减少所引用容器的`gc_refs`字段。
- 4.所有具有`gc_refs`字段大于1的容器对象，这些对象被外部容器对象集所引用，并且无法被释放，于是我们将这些对象移动到另一个集合
- 5.我们要释放的对象是，保留在原始集中的对象，而且仅由该集中的对象引用（即，它们无法从Python访问并且是垃圾）

**算法的开销**

- 最大的成本之一是每个容器对象需要三个额外的内存（上面原理中1.）
- 其次容器对象集的维护也是一个开销



## Debug memory leaks
[gc](https://docs.python.org/2/library/gc.html)模块主要提供了禁用收集器，调整收集频率以及设置调试选项的功能，对收集器找到但无法释放的无法访问对象的访问。
[objgraph](https://mg.pov.lt/objgraph)模块可以用于定位内存泄漏

gc（garbage collector）是Python 标准库。功能：

可以开关gc、调整垃圾回收的频率、输出调试信息。gc模块是很多其他模块（比如objgraph）封装的基础。核心API：

* `gc.enable()` _开启gc（默认情况下是开启的）_;<br>`gc.disable()` _关闭gc_;<br>`gc.isenabled()` _判断gc是否开启_;
* `gc.collect()` _执行一次垃圾回收，不管gc是否处于开启状态都能使用_
* `gc.set_threshold(th0[, th1[, th2]])` _设置垃圾回收阈值_;<br>`gc.get_threshold()` _获得当前的垃圾回收阈值_
* `gc.get_objects()`返回所有被垃圾回收器（collector）管理的对象。只要python解释器运行起来，就有大量的对象被collector管理，因此，该函数的调用比较耗时！
* `gc.set_debug(flags)` _设置调试选项_ [flags参数根据python版本有很大差异](https://docs.python.org/2/library/gc.html#gc.DEBUG_STATS)
* `gc.garbage` 返回 unreachable 的 could not be freed (uncollectable 对象)
