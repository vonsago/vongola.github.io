---
title: Flask 注入自定义的日志
author: Von
date: 2019-11-26 11:08:14
subtitle: 自定义 flask 日志
header-img:
tags:
    flask
    web
    python

---


# Flask logging
使用 Flask 时，如何优雅的输出日志。这些日志也许需要特定的格式，更丰富的信息，或者添加一些上下文的信息（如当前登录的用户名）等等。

根据官方文档来看，当想要为项目配置日志时，应当在程序启动时尽早进行配置。比如在`flask_app = Flask('api-controller')`之前配置。
如果不配置，flask 会`create_logger`
```
# flask source code 中是这样的
default_handler = logging.StreamHandler(wsgi_errors_stream)
default_handler.setFormatter(
    logging.Formatter("[%(asctime)s] %(levelname)s in %(module)s: %(message)s")
)
# 所以使用缺省配置时

```
如果在操作 `app.logger` 之后配置日志，并且需要 移除缺省的日志记录器，可以导入并移除它:
```
from flask.logging import default_handler

flask_app.logger.removeHandler(default_handler)
```

实际上，在设置完 basicConfig 后也可以通过下面方式修改。这段代码的影响是**在所有日志后面增加一个上下文参数（当前登录的用户名）
```
from flask import g
username = g.user.name
root = logging.getLogger()
handler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s %(name)s %(levelname)-8s %(message)s' + f" User: {username}")
handler.setFormatter(formatter)
root.handlers = [handler]
```

应用程序代码可以在一个模块中定义和配置父记录器，并在单独的模块中创建（但不配置）子记录器，并且对子记录器的**所有调用都将传递给父记录器**。

比如上面的 `logging.getLogger() # 同 logging.getLogger('')` 其实就是获取了 root logger 并作修改。
上述代码写在 `@app.before_request` 函数中，会对所有的日志输出有影响；
如果写在 `@app.after_request` 函数中，只会影响 `werkzeug` 的日志输出。
比如在`flask`应用中我们的目录为`app`
```
# create logger with app and config it
logging.getLogger("app").setLevel(log_level)
```
那么所有的 `app.*` 文件下的 logger 都会这个父记录器的影响。

