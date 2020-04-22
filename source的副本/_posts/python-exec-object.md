---
title: Python可执行对象使用
author: Von
date: 2020-02-19 17:18:38
subtitle:
header-img:
tags:
    - python
---

## exec()

### Syntax:
```
exec(object[, globals[, locals]])

:param object: As already said this can be a string or object code
:param globals: This can be a dictionary and the parameter is optional
:param locals: This can be a mapping object and is also optional
```
eg.
```
from math import *
exec("print(factorial(5))", {"factorial":factorial})
```

## eval()
### Syntax:
```
eval(expression[, globals[, locals]])
```
### diff with exec()
1.eval accepts only a single expression, exec can take a code block that has Python statements: loops, try: except:, class and function/method definitions and so on.
2.eval returns the value of the given expression, whereas exec ignores the return value from its code, and always returns None (in Python 2 it is a statement and cannot be used as an expression, so it really does not return anything).

```
>>> a = 5
>>> eval('37 + a')   # it is an expression
42
>>> exec('37 + a')   # it is an expression statement; value is ignored (None is returned)
>>> exec('a = 47')   # modify a global variable as a side effect
>>> a
47
>>> eval('a = 47')  # you cannot evaluate a statement
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "<string>", line 1
    a = 47
      ^
SyntaxError: invalid syntax
```

## compile()
### Syntax:
```
compile(source, filename, mode, flags=0, dont_inherit=False, optimize=-1)
```
It can be used to speed up repeated invocations of the same code with exec or eval by compiling the source into a code object beforehand.

[compile](https://docs.python.org/3/library/functions.html#compile)
