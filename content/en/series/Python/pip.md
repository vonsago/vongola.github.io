+++
author = "Ars"
title = "Change pip conf in global"
date = "2022-08-13"
description = "Python GC"
featured = true
categories = [
]
tags = [
  "Python3"
]
series = [
  "Python"
]
images = [
  "images/bg/ang.jpeg"
]
# toc = true

+++

```shell
cat >> .pip/pip.conf << EOF

[global]

timeout = 6000

index-url = https://pypi.douban.com/simple/

[install]

use-mirrors = true

mirrors = https://pypi.douban.com/simple/

trusted-host = pypi.douban.com

EOF
```
