---
title: 压缩图片
author: Von
date: 2019-12-18
tags: ['Picture' , 'Python']
featuredImage: bbg.jpg   
---


```python
from PIL import Image
import sys
def gipit(pname):
    with Image.open(pname) as im:
        im.save(pname+'.jpeg', 'jpeg', progressive=True, optimize=True)
if __name__ == '__main__':
    _, pname = sys.argv
    gipit(pname)
```


