+++
author = "Ars"
title = "Zip Picture With Python"
date = "2019-12-18"
description = "Zip Picture With Python"
featured = true
categories = [
]
tags = [
  "Python3",
  "Picture"
]
series = [
  "Python"
]
images = [
  "images/bg/computer2.jpg"
]
# toc = true

+++

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


