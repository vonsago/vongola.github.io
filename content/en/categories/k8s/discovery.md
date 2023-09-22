+++
author = "Ars"
title = "Service Discovery"
date = "2022-11-02"
description = "Zookeeper, Eureka, Nacos, Consul and Etcd"
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



一致性协议算法主要有Paxos、Raft、ZAB。


## Zookeeper


## Eureka


## Nacos 
提供了一组简单易用的特性集，帮助您快速实现动态服务发现、服务配置、服务元数据及流量管理。
服务发现和服务健康监测,动态配置服务,动态 DNS 服务

Nacos 支持基于 DNS 和基于 RPC 的服务发现。服务提供者使用原生SDK、OpenAPI、或一个独立的Agent TODO注册 Service 后，服务消费者可以使用DNS TODO 或HTTP&API查找和发现服务。

Nacos 提供对服务的实时的健康检查，阻止向不健康的主机或服务实例发送请求。


## Consul

用于实现分布式系统的服务发现与配置 支持 http 和 dns 协议接口 多数据中心


## ETCD
分布式、高可用的一致性键值存储系统，用于提供可靠的分布式键值存储、配置共享和服务发现等功能。
