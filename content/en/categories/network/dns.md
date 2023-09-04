+++
author = "Ars"
title = "DNS use both the protocols TCP and UDP"
date = "2023-01-06"
description = ""
featured = false
categories = [
  "Network"
]
tags = [
  "DNS"
]
images = [
  "images/bg/bgh1.jpg"
]
# toc = true
+++ 

UDP packets can't be greater than 512 bytes.

TCP is used for Zone transfer and UDP for name, and queries either regular (primary) or reverse.

There should be consistency in DNS Zone database.
