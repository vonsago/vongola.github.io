+++
author = "Ars"
title = "Kubernetes Beginner"
date = "2020-01-03"
description = "kubernetes"
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


# 调度


# 网络
## 容器网络模式
- none: 完全隔离，既不访问外部网络，也不提供服务访问自己。可以用于测试容器，为后续容器创建网络环境容器
- host: 共享宿主机网络，性能好，不需要 NAT，但是可能会造成端口冲突
- overlay: 在物理网络之上，构建一个逻辑网络，使用网络隧道在主机之间传递通信。这种网络虚拟化技术可以将多个物理网络组成一个虚拟网络，实现多主机之间的通信。Overlay网络是使用VXLAN协议实现的，VXLAN是一种虚拟化隧道协议，它可以将二层网络封装在UDP包中传输，从而实现跨主机的网络通信。具体工作流程TODO
- container: Docker网络container模式是指定其和已经存在的某个容器共享一个 Network Namespace，此时这两个容器共同使用同一网卡、主机名、IP 地址，容器间通讯可直接通过本地回环 lo 接口通讯
- bridge: 当Docker server启动时，会在主机上创建一个名为docker0的虚拟网桥，此主机上启动的Docker容器会连接到这个虚拟网桥上。虚拟网桥的工作方式和物理交换机类似，这样主机上的所有容器就通过交换机连在了一个二层网络中。


### k8s Pod 网络初始化流程
kubelet 调用 CRI Runtime（dockershim 或 containerd）创建 Pod 的 Sandbox 容器。
2. CRI Runtime 调用底层 docker 或 containerd 创建 pause 容器（此时 pause 进程还没启动，但已经初始化 Network Namespace）。
3. CRI Runtime 调用 CNI 执行在 Network Namespace 中创建 veth 并加入 cbr0 网桥等网络初始化操作。
4. CRI Runtime 启动 pause 容器，pause 进程被拉起。
5. kubelet 继续调用 CRI Runtime 执行创建容器等后续操作。
Docker 和 containerd 在创建 pause 容器并初始化 Network Namespace和 调用 CNI 初始化 veth 这两步有区别。

docker 在创建 Pause 容器时，会进行 Docker 特有的网络设置，该设置导致和 Containerd 最大的区别是在不使用 IPv6 的情况下，Docker 会将容器 Network Namespace 中内核参数net.ipv6.conf.all.disable_ipv6 设置为1，也即关闭容器内的 ipv6 选项。
同样的 Pod 在 Docker 的节点上只开启了 IPv4，而在 Containerd 的节点上会同时开启 IPv4 和 IPv6。

docker 情况日志保存地址是由docker完成，kubelet 会通过软连接方式指向docker日志，containerd 是保存在 /var/log/pods/ 目录下，同时会在 /var/log/containers 目录下创建软连接指向文件

docker 默认保存1G日志，contained 默认保存50MB日志


## 关于网络流量传输
https://sookocheff.com/post/kubernetes/understanding-kubernetes-networking-model/#6-internet-to-service-networking-a-nameinternal-to-servicea

## CNI 组件
网络插件选型原则
- 底层系统环境限制：公有云环境多有自己专有的实现，例如 Google GCE、AzureCNI、AWS VPC CNI 和 Aliyun Terway 等，它们通常是相应环境上较佳的选择。若虚拟化环境限制较多，除 Overlay 网络模型别无选择，则可用的方案有 FlannelVXLAN、Calico IPIP、Weave 和 Antrea 等。物理机环境几乎支持任何类型的网络插件，此时一般应该选择性能较好的 Calico BGP、Flannel host-gw 或 DAMM IPVLAN 等。

- 容器网络功能需求：支持 NetworkPolicy 的解决方案以 Calico、WeaveNet 和 Antrea 为代表，而且后两个支持节点到节点间的通信加密。而大量 Pod 需要与集群外部资源互联互通时，应该选择 Underlay 网络模型一类的解决方案。

- 容器网络性能需求：Overlay 网络中的协议报文有隧道开销，性能略差，而 Underlay 网络则几乎不存这方面的问题，但 Overlay 或 Underlay 路由模型的网络插件支持较快的 Pod 创建速度，而 Underlay 模型中的 IP VLAN 或 MAC VLAN 模式则较慢。

### k8s 使用 CNI 的主要工作流程

1. kubelet 先创建 pause 容器创建对应的网络命名空间；
2. 根据配置调用具体的 CNI 插件，可以配置成 CNI 插件链来进行链式调用；
3. 当 CNI 插件被调用时，它根据环境变量以及命令行参数来获得网络命名空间、容器的网络设备等必要信息，然后执行 ADD 操作；
4. CNI 插件给 pause 容器配置正确的网络，pod 中其他的容器都是复用 pause 容器的网络；



### Flannel
是由 CoreOS 提供的网络插件，特点是简单；它使用 VXLAN 或者 UDP 协议封装 IP 报文来创建 Overlay 网络，并协助etcd维护分配信息，也支持 host-gw 路由模型。
同节点Pod间通信可基于本地虚拟网桥（cni0）实现，跨节点Pod间通信由flanneld守护进程封装隧道协议报文后，通过查询etcd路由到目的地

### Calico
特点是灵活良好的性能和网络策略，属于路由型插件，也支持IPIP型的Overlay网络，在每台节点上运行一个 vRouter，并基于BGP路由协议在节点之间路由数据包。同时借助iptables实现网络策略，提供访问控制功能。

### Canal
试图将 Flannel 和 Calico 融合在一起，前者作为网络插件，后者提供网络策略

### WeaveNet
WeaVeworks 提供的网络插件，支持网络策略。它是在每个节点上不出vRouter路由组件构建一个网格化的TCP链接，并通过Goosip协议来同步控制信息。通过UDP封装实现L2隧道报文，报文封装支持sleeve模式和fastpath模式。

### Multus CNI
多 CNI 插件，实现了 CNI 规范的所有参考类插件（例如 Flannel、MAC VLAN、IPVLAN 和 DHCP 等）和第三方插件（例如 Calico、Weave 和 Contiv 等），也支持 Kubernetes 中的 SR-IOV、DPDK、OVS-DPDK 和 VPP 工作负载，以及 Kubernetes 中的云原生应用程序和基于 NFV 的应用程序，是需要为 Pod 创建多网络接口时的常用选择。

### Antrea
一款致力于成为 Kubernetes 原生网络解决方案的 CNI 网络插件，它使用 OpenvSwitch 构建数据平面，基于 Overlay 网络模型完成 Pod 间的报文交换，支持网络策略，支持使用 IPSec ESP 加密 GRE 隧道流量。

### DAMM
由诺基亚发布的电信级的 CNI 网络插件，支持具有高级功能的 IP VLAN 模式，内置 IPAM 模块，可管理多个集群范围内的不连续三层网络；支持通过 CNImeta 插件将网络管理功能委派给任何其他网络插件。


### kube-router
是 Kubernetes 网络的一体化解决方案，它可取代 kube-proxy 实现基于 ipvs 的 Service，能为 Pod 提供网络，支持网络策略以及拥有完美兼容 BGP 协议的高级特性。


## IPVS  
