---
title: 代码模版
author: Von
subtitle: "积累的一些代码模版"
date: 2019-11-06 13:39:10
header-img: bg.jpeg
tags:
---

<!-- toc -->

# Code Template
## Python多进程写入文件(multiprocessing template)
[参考文档](https://docs.python.org/2/library/multiprocessing.html?highlight=apply_async#multiprocessing.pool.multiprocessing.Pool.apply_async)
```
#multiprocessing template
import multiprocessing

def write_file(result):
    f = open('')
    f.write(result)

def process(args):
    '''
    work
    '''
    return result

if __name__ == '__main__':
    pool = multiprocessing.Pool(processes = 100)
    for t in tasks:
        pool.apply_async(process, (t, ),callback=write_file)
    pool.close()
    pool.join()
```
## 高次方取模
### 次方求模模板
就是求`(a^b)% p`其中 a, b, p 数值比较大
取余公式：**(a*b)% p = (a%p * b%p)% p**
![](mod.jpeg)
```
//次方求模模板
template<class Type>
inline Type ModPow(Type m,Type n,Type p) //m的n次方模p
{
    if(n==0) return 1;
    if (n==1) return m%p;
        Type tmp=ModPow(m,n>>1,p);
    return (tmp*tmp%p)*((n%2?m:1)%p)%p;
}
```
### 高次方求模
```
/*高次方求模：
比如a的b次方对c求模
我们可以把b 化为二进制形式看那一位有1
比如b=10101则  a^b=a^(10000)*a^(100)*a^(1)
以函数形式体现：*/
template<class Type>
inline Type han()
{
    Type t,s;
    for(t=a,s=1;b;b>>=1,t*=t,t%=c)//用b>>=1查看b中1
     if(b&1){s*=t;s%=c;}
    return s%c;
}
```
### 大数取模的模板
取余公式：(a+b)% p = (a%p+b%p)% p;
```
char big_number[MAX];
template<class type>
type big_mod(char *a,type mod){
    type len=strlen(a),result=0;
    for(int i=0;i<len;i++){
        result=((result*10)%mod+(a[i]-'0')%mod)%mod;
        //如果数据不算太大，可以写成这样来节省时间result=(result*10+a[i]-'0')%mod;
    }
    return result;
}
//test
char s[200];
int main()
{   while(gets(s))
        cout<<big_mod<int>(s,2)<<endl;
}
```
## 哈希模版(hash template)
```
const int  MAX=1000003;
template <class T>
class hash
{
private:
    int pos;
    int next[MAX];
    int head[MAX];
    T key[MAX];
public:
    hash();
    bool search(T x);
    void push(T x);
};
template <class T>
hash<T>::hash()
{
    pos=0;
    memset(next,-1,sizeof(next));
    memset(head,-1,sizeof(head));
    //memset(key,-1,sizeof(key));
}
template <class T>
inline bool hash<T>::search(const T x)
{
    int temp=x%MAX;
    int t=head[temp];
    while(t!=-1)
    {
        if (key[t]==x)
        {
            return 1;
        }
        t=next[t];
    }
    return 0;
}
template <class T>
inline void hash<T>::push(const T x)
{
    int temp=x% MAX;
    if (head[temp]!=-1)
    {
        next[pos]=head[temp];
    }
    head[temp]=pos;
    key[pos]=x;
    pos++;
}
```
## Python 协程处理 requests

```
from gevent import monkey
monkey.patch_all()

import sys
reload(sys)
sys.setdefaultencoding('utf-8')

import requests
import time
import gevent
from gevent import pool
import re
import math
import pymysql
import functools
from DBUtils.PooledDB import PooledDB
from datetime import datetime
from collections import defaultdict

# db ip
'''
db msg
'''
# 数据库连接池
mysql_db_pool = PooledDB(creator=pymysql, mincached=1, maxcached=2, maxconnections=100, host=base_ip, port=3306,
                         user=base_user, passwd=base_pwd, db=base_db, charset='utf8', use_unicode=False, blocking=True)
# target url
URL = ''


complete_count = 0
# log--
func_count_dict = defaultdict(int)

def func_time_logger(fun):
    if fun.__dict__.get('mioji.aop_utils.logger', False):
        return fun
    fun.__dict__['mioji.aop_utils.logger'] = True

    @functools.wraps(fun)
    def logging(*args, **kw):
        func_count_dict[fun.__name__] += 1
        begin = datetime.now()
        result = fun(*args, **kw)
        end = datetime.now()
        func_count_dict[fun.__name__] -= 1
        print 'func {0}, cost:{1}, ex:{2}'.format(fun.__name__, end - begin , func_count_dict[fun.__name__])
        return result

    return logging
# --log

# 获得代理
@func_time_logger
def get_PROXY():
    # 代理url
    R = requests.get(url)
    p = R.content
    if p.startswith('10.'):
        # if p.split(':')[0] in SOCKS_PROXY:
        PROXY = {
        'http': 'socks5://' + p,
        'https': 'socks5://' + p
        }
    else:
        self.real_ip = p.split(':')[0]
        proxy_type = 'http'
        PROXY = {
            'https': 'http://' + p,
            'http': 'http://' + p,
        }

    return PROXY

# requests
@func_time_logger
def get_request_data(x, y):
    i = 0
    while i < 3:
        try:
            r = requests.get(URL, proxies=get_PROXY(), timeout=(5, 10))
            data = r.content
            return data
        except:
            print 'get error'
            i += 1
    return None

# process function
@func_time_logger
def process(a1,a2):

    get_request_data(x,y)

    '''
    other works
    '''

    global complete_count
    complete_count += 1
    print 'end {0}'.format(sid)
    print 'complete {0}'.format(complete_count)

# 异步协程处理请求量大的需求
if __name__ == '__main__':
    s = time.time()

    gs = []
    for data in data_list:
        g = execute_pool.apply_async(process, args=(a1, a2,))
        gs.append(g)
    gevent.joinall(gs)

    print time.time() - s

```
