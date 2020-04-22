---
title: 压缩图片
author: Von
date: 2019-12-18 10:58:44
subtitle: “压缩图片 提高博客加载速度“
tags:
    python
    picture

---


```
from PIL import Image
import sys
def gipit(pname):
    with Image.open(pname) as im:
        im.save(pname+'.jpeg', 'jpeg', progressive=True, optimize=True)
if __name__ == '__main__':
    _, pname = sys.argv
    gipit(pname)
```
