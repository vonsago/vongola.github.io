+++
author = "Ars"
title = "Video Develop Environment"
date = "2021-05-17"
description = "video developer"
featured = false
categories = [
]
tags = [
  "FFmpeg",
  "Video",
  "C/C++"
]
series = [
  "FFmpeg"
]
images = [
  "images/bg/computer2.jpg"
]
# toc = true
+++

# ffmpeg-develop: vscode + docker + ssh

## Dockerfile

```
FROM vonsago/ffmpeg-devel
RUN mkdir /var/run/sshd && apt-get  install -y openssh-server  --allow-unauthenticated && echo 'root:root' | chpasswd && sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config && useradd -ms /bin/bash debugger && echo 'debugger:pwd' | chpasswd
RUN wget "http://ftp.gnu.org/gnu/gdb/gdb-7.11.tar.gz" && tar -xvzf gdb-7.11.tar.gz && cd gdb-7.11 && ./configure && make && make install 
RUN apt-get install -y --allow-unauthenticated clang
CMD ["/usr/sbin/sshd", "-D"]
```

```
docker build -f Dockerfil.dev --no-cache -t vonsago/ffmpeg-dev .
docker run -d --cap-add sys_ptrace -p127.0.0.1:2222:22 vonsago/ffmpeg-dev

FAQ: if nessary, Debug:
1.ps -e|grep ssh
*the remote ip should not in ~/.ssh/known_hosts*
/usr/sbin/sshd
/etc/init.d/ssh restart
2.WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED! - vim ~/.ssh/known_hosts , rm 2222 port
Ssh-keygen -f "/root/.ssh/known_hosts" -R "[127.0.0.1]:2233"
use vscode: https://code.visualstudio.com/docs/containers/ssh

---

>>> import requests
>>> req = requests.Request('GET', 'https://httpbin.org/get')
>>> r = req.prepare()
>>> r
<PreparedRequest [GET]>

>>> s = requests.Session()
>>> s.send(r)
<Response [200]>

./configure --extra-libs=-lpthread --extra-libs=-lm --enable-gpl --enable-libfdk_aac --enable-libx264 --enable-nonfree --disable-asm

```

![](/images/test.jpg)

