---
title: Python编码问题
author: Von
subtitle: python-encoding
date: 2019-11-06 11:05:39
tags:
    - python
---
<!-- toc -->

# Python Encoding

## b'' 型

```
b'hello'.decode()
```

## u'' 型

```
a=u'\xe5\x9c\xa3\xe5\xbd\xbc\xe5\xbe\x97\xe5\xa0\xa1\xe6\x8e\x92\xe5\x90\x8d\xe7\xac\xac 1 \xe9\xa4\x90\xe5\x8e\x85 (\xe5\x85\xb1 8,650 \xe9\x97\xb4)'
print(a.encode('raw-unicode-escape'))
```

## \u00 型

```
>>> a = u'\u00e6\u0097\u00a5\u00e6\u009c\u00ac\u00e5\u009f\u00bc\u00e7\u008e\u0089\u00e5\u00b8\u0082\n'
>>> print(a)
>>> print(a.encode('iso-8859-1').decode('utf-8'))
```
## \uxxxx 型

```
a='\u56e0'
print(a.decode('unicode-escape'))
```

```
a = '\u00e6\u0097\u00a5\u00e6\u009c\u00ac\u00e5\u009f\u00bc\u00e7\u008e\u0089\u00e5\u00b8\u0082'
print(a.decode('unicode-escape').encode('iso-8859-1').decode('utf8'))
```


## unicode+ascii，且u前没有\ 

```
#coding=utf8
s = 'u00e7u0088u00b1u00e5u00b0u0094u00e7u00a6u008fu00e7u0089u00b9u00e5u009fu008eu00e9u0099u0085u00e9u0085u0092u00e5u00bau0097u00e6u0098u00afu00e4u00b8u0080u00e5u00aeu00b6u00efu00bcu008cu00e8u00b7u009du00e7u00a6u00bbu00e5u00aeu0089u00e6u00a0u00bcu00e5u00b0u0094u00e5u008du009au00e7u0089u00a9u00e9u00a6u0086u00e5u0092u008cu00e5u0085u008bu00e9u009bu00b7u00e9u00bbu0098u00e6u00a1u00a5u00e4u00b8u008du00e5u0088u00b0 15 u00e5u0088u0086u00e9u0092u009fu00e7u009au0084u00e6u00adu00a5u00e8u00a1u008cu00e8u00b7u00afu00e7u00a8u008bu00e3u0080u0082u00e8u0080u008cu00e4u00b8u0094u00efu00bcu008cu00e8u00bfu0099u00e5u00aeu00b6u00e9u0085u0092u00e5u00bau0097u00e8u00b7u009du00e7u00a6u00bbu00e5u009fu0083u00e5u00b0u0094u00e7u00a6u008fu00e7u0089u00b9u00e5u00a4u00a7u00e6u0095u0099u00e5u00a0u0082u00e5u0092u008cEgapark Erfurtu00e4u00b8u008du00e5u0088u00b0 5 u00e5u0085u00acu00e9u0087u008cu00e3u0080u0082 u00e6u00adu00a4u00e9u0085u0092u00e5u00bau0097u00e6u008fu0090u00e4u00beu009bu00e9u00a4u0090u00e5u008eu0085u00e3u0080u0081u00e5u00b1u008bu00e9u00a1u00b6u00e9u009cu00b2u00e5u008fu00b0u00e5u0092u008cu00e5u00b9u00b2u00e6u00b4u0097/u00e6u00b4u0097u00e8u00a1u00a3u00e6u009cu008du00e5u008au00a1u00e3u0080u0082u00e5u00a6u0082u00e6u009eu009cu00e6u0082u00a8u00e6u0083u00b3u00e5u0096u009du00e6u009du00afu00e9u00a5u00aeu00e6u0096u0099u00e6u0094u00beu00e6u009du00beu00e4u00b8u0080u00e4u00b8u008bu00efu00bcu008cu00e9u0085u0092u00e5u0090u00a7/u00e9u0085u0092u00e5u00bbu008au00e7u00bbu009du00e5u00afu00b9u00e6u0098u00afu00e6u0082u00a8u00e7u009au0084u00e5u00a5u00bdu00e5u008eu00bbu00e5u00a4u0084u00e3u0080u0082'

import re

pattern = re.compile(r'((u00([a-z0-9]){2})+)')
for i in pattern.findall(s):
    s = s.replace(i[0], i[0].replace('u', '\\u').decode('unicode-escape').encode('iso-8859-1'))
```

## html实体 -- '&#...;'

```
def parse_html(self, data):
        aa = re.findall('&#\d+;',data)
        xx = [html.fromstring(i).text_content() for i in aa]
        yy = re.sub('&#\d+;','{}',data)
        yy = yy.split('{}')
        res = yy[0]
        for i in range(len(xx)):
            res += xx[i]+yy[i+1]
        return res
```


