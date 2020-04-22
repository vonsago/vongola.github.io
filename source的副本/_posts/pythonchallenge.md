---
title: pythonchallenge
author: Von
date: 2019-11-07 17:03:49
subtitle: 'python挑战'
header-img: bg.jpeg
tags:
    - web
    - python
---

<!-- toc -->
# pythonchallenge


> 游戏入口 http://www.pythonchallenge.com/
> 挺好玩的解密小游戏，会上瘾

## 第零关
> Hint: try to change the URL address.

```
2**38 = 274877906944
```

```
http://www.pythonchallenge.com/pc/def/274877906944.html
```
## 第一关
> everybody thinks twice before solving this.
> g fmnc wms bgblr rpylqjyrc gr zw fylb. rfyrq ufyr amknsrcpq ypc dmp. bmgle gr gl zw fylb gq glcddgagclr ylb rfyr'q ufw rfgq rcvr gq qm jmle. sqgle qrpgle.kyicrpylq() gq pcamkkclbcb. lmu ynnjw ml rfc spj.

看图：每个字符ASCII+2
```
>>> for i in list(s):
...     if ord(i)>=97 and ord(i)<=122:
...             i = chr(ord(i)+2)
...             if ord(i)>122:
...                     i = chr(97+(ord(i)-122))
...     ans += i
...
"i hope you didnt translate it by hand. thats what computers are for. doing it in by hand is inefficient and that's why this text is so long. using string.maketrans() is recommended. now apply on the url."
```
查了string.maketrans()用法后(人工也成)把url中的map -> orc 就行了
```
>>>from string import maketrans
>>>ori = "g fmnc wms bgblr rpylqjyrc gr zw fylb. rfyrq ufyr amknsrcpq ypc dmp. bmgle gr gl zw fylb gq glcddgagclr ylb rfyr'q ufw rfgq rcvr gq qm jmle. sqgle qrpgle.kyicrpylq() gq pcamkkclbcb. lmu ynnjw ml rfc spj."
>>>aft = "i hope you didnt translate it by hand. thats what computers are for. doing it in by hand is inefficient and that's why this text is so long. using string.maketrans() is recommended. now apply on the url."
>>> transtab = maketrans(ori,aft)
>>> url.translate(transtab)
'httr://yyy.rathopehcnngpig.eoo/re/fgh/ocr.hton'

#so:url = http://www.pythonchallenge.com/pc/def/ocr.html
```
## 第二关
> recognize the characters. maybe they are in the book,
but MAYBE they are in the **page source.**

是要看页面的源码!?。。
源码中找到了：
```
<!--
find rare characters in the mess below:
-->
....
#很长，count()后发现有几个是字母。先复制给参数html
for i in html:
...     se.add(i)
...

>>> se
set(['!', '#', '%', '$', '&', ')', '(', '+', '*', '@', '[', ']', '_', '^', 'a', 'e', 'i', 'l', 'q', 'u', 't', 'y', '{', '}'])
>>> for i in list(se):
...     print i,html.count(i)
...
! 6079
# 6115
% 6104
$ 6046
& 6043
) 6186
( 6154
+ 6066
* 6034
@ 6157
[ 6108
] 6152
_ 6112
^ 6030
a 1
e 1
i 1
l 1
q 1
u 1
t 1
y 1
{ 6046
} 6105
#字母都是1，这也验证了Hit
其实知道是字母了直接re.findall('[a-z]',html)就成。题的真实用意？
#so:http://www.pythonchallenge.com/pc/def/equality.html
```
## 第三关
> One small letter, surrounded by EXACTLY three big bodyguards on each of its sides.
```
>>> ans = abcdefghijklmnopqrstuvwxyz
>>> import requests
>>> for i in ans:
...     r = requests.get('http://www.pythonchallenge.com/pc/def/{}.html'.format(i))
...     print r.content
...
```
到 l 时候：`yes. but there are more.`
试到y时候：`It really looks like a Y, isn't it? now, go back.`
好吧。。还是看页面源码去吧 : ) 开始以为是要处理字符串`abc...z`
和题2类似直接正则
```
ans = re.findall('[a-z][A-Z]{3}([a-z])[A-Z]{3}[a-z]',html)
>>> for i in ans:
...     a+=i
...
>>> a
'linkedlist'
#so:http://www.pythonchallenge.com/pc/def/linkedlist.html
#then 他有提示...
#so:http://www.pythonchallenge.com/pc/def/linkedlist.php
```
## 第四关：只有图..
只能将源码中的这句话作为Hit：
>urllib may help. DON'T TRY ALL NOTHINGS, since it will never end.
>400 times is more than enough.

在一家大数据公司实习一个月了：所以看页面源码还是能看懂的✧(≖ ◡ ≖✿)嘿嘿
发现了`href="linkedlist.php?nothing=12345"` 和源码中的NOTHING正好对应那就访问呗。。他让用urllib，我习惯用requests..


```

url = 'http://www.pythonchallenge.com/pc/def/linkedlist.php?nothing={}'
def get_data(i,u):
    r = requests.get(url.format(u))
    resp = r.content
    nothing = re.findall('\d+',resp)[0]
    print i,' nothing : ',nothing
    print resp
    return nothing

if __name__ == '__main__':
    s = time.time()
    nothing = '12345'
    for i in xrange(400):
        nothing = get_data(i+1,nothing)
    print time.time() - s

```
跑到and the next nothing is 16044出了问题：`Yes. Divide by two and keep going.`
人工改下接着跑呗 ：）...
好吧他真是怕你寂寞才设置这么多问题...
```
#82683
There maybe misleading numbers in the
text. One example is 82683. Look only for the next nothing and the next nothing is 63579
#改：nothing = re.findall('\d+',resp)[-1]
```

```
#66831出了结果
#so:http://www.pythonchallenge.com/pc/def/peak.html
```
## 第五关：

> pronounce it
> source page: peak hell sounds familiar ?

英语一般很吃力啊，还发音？匹克好？皮卡哦？
...去看文档https://docs.python.org/2/library/index.html
peak搜无果pick搜搜倒有点意思了。。

```

>>> a = pickle.dumps('peak')
>>> print a
S'peak'
p0
.
```
不对，又是忽略了什么。。
```
<peakhell src="banner.p">
<!-- peak hell sounds familiar ? -->
</peakhell>
#忽略了http://www.pythonchallenge.com/pc/def/banner.p
#mmp,loads后还是不知所措 :)
#似乎要排个序输出？不对，，每个小列表中的元组个数不一。。
```
随手写代码试试。。。
```
>>> final = ''
>>> for i in data:
...     for ii in i:
...             for iii in range(ii[1]):
...                     final+=ii[0]
...
>>> final
```
十分有趣✧(≖ ◡ ≖✿)嘿嘿
```
#so:http://www.pythonchallenge.com/pc/def/channel.html
```
## 第六关：
以后要把源码都分析好在往下分析。。
>  !-- <-- zip -->
>  now there are pairs
>
>  !-- The following has nothing to do with the riddle itself. I just
>  thought it would be the right point to offer you to donate to the
>  Python Challenge project. Any amount will be greatly appreciated.
>  -thesamet
>  -->
>  ！ - 以下与谜语本身无关。 我只是给你捐赠的正确点
>  -----------------------------------------------------mmp

信息不足。。看看cookie:
> info:  you+should+have+followed+busynothing...
> 没用，，只好想想zip和图片了
> 十分有趣✧(≖ ◡ ≖✿)嘿
> `http://www.pythonchallenge.com/pc/def/channel.zip`

查了查要打开.zip用到 zipfile（人工点开也成。。）

```
class zipfile.ZipFile(file[, mode[, compression[, allowZip64]]])
ZipFile.namelist()
	获取zip文档内所有文件的名称列表。
ZipFile.open(name[, mode[, pwd]])
#这些方法就够了
ZipFile.getinfo(name)
　　获取zip文档内指定文件的信息。返回一个zipfile.ZipInfo对象，它包括文件的详细信息
ZipFile.infolist()
	获取zip文档内所有文件的信息，返回一个zipfile.ZipInfo的列表。
ZipFile.printdir()
	将zip文档内的信息打印到控制台上。
文档:
#https://docs.python.org/2/library/zipfile.html#zipfile.ZipFile.getinfo
```

```
def process_num_6():
    with zipfile.ZipFile('channel.zip','r') as f:
        file_content = f.namelist()
        c = f.open('readme.txt','r')
        content =  c.readlines()[2][6:]
        print content
        while re.findall('(\d+)',content):
            num = re.findall('(\d+)',content)[0]
            content = '{}.txt'.format(num)
            c = f.open(content,'r')
            content =  c.readlines()[0]
            print num,content
#46145 Collect the comments.
#改代码
def process_num_6():
    with zipfile.ZipFile('channel.zip','r') as f:
        final = ''
        file_content = f.namelist()
        c = f.open('readme.txt','r')
        content =  c.readlines()[2][6:]
        print content
        while re.findall('(\d+)',content):
            num = re.findall('(\d+)',content)[0]
            content = '{}.txt'.format(num)
            ff = f.getinfo(content)
            c = f.open(content,'r')
            content =  c.readlines()[0]
            print num,content,ff.comment
            final+=ff.comment
    print final
#it's in the air. look at the letters.
#十分有趣✧(≖ ◡ ≖✿)嘿嘿
```

```
#so:http://www.pythonchallenge.com/pc/def/oxygen.html
```

## 第七关：
这次真的只有图片了。。。.png的图片

google了‘python怎么读写png图片中隐藏数据’
出现了连接类似这样的‘python读取图片中B通道隐藏数据’
所以解题方向应该就是这个了

```
#用的应该是The Image Module
#http://effbot.org/imagingbook/image.htm
def process_num_7():
    from PIL import Image
    im = Image.open('oxygen.png')
    pixdata=im.load()
    result=[]
    for y in xrange(43,52):#根据需要修改y范围
        for x in xrange(0,608):#根据需要修改x范围
            data=pixdata[x,y][2]
            result.append(chr(data))
    print ''.join(result)
#结果输出的好像有些问题但能看懂
'''
sssssmmmmmmmaaaaaaarrrrrrrttttttt       ggggggguuuuuuuyyyyyyy,,,,,,,       yyyyyyyooooooouuuuuuu       mmmmmmmaaaaaaadddddddeeeeeee       iiiiiiittttttt.......       ttttttthhhhhhheeeeeee       nnnnnnneeeeeeexxxxxxxttttttt       llllllleeeeeeevvvvvvveeeeeeelllllll       iiiiiiisssssss       ÆÆÆÆÆÆÆ111111100000005555555,,,,,,,       111111111111110000000,,,,,,,       111111111111116666666,,,,,,,       111111100000001111111,,,,,,,       111111100000003333333,,,,,,,       111111111111114444444,,,,,,,       111111100000005555555,,,,,,,       111111111111116666666,,,,,,,       111111122222221111111
'''
s = [105,110,116,101,103,114,105,116,121]
>>> ans = ''
>>> for i in s:
...     ans+=chr(i)
...
>>> ans
'integrity'
```
✧(≖ ◡ ≖✿)嘿嘿，图像处理挺有意思
```
#so:http://www.pythonchallenge.com/pc/def/integrity.html
```

## 第八关：

> Where is the missing link?
> 图中蜜蜂有鬼。。。有密码。。

```
un: 'BZh91AY&SYA\xaf\x82\r\x00\x00\x01\x01\x80\x02\xc0\x02\x00 \x00!\x9ah3M\x07<]\xc9\x14\xe1BA\x06\xbe\x084'
pw: 'BZh91AY&SY\x94$|\x0e\x00\x00\x00\x81\x00\x03$ \x00!\x9ah3M\x13<]\xc9\x14\xe1BBP\x91\xf08'
```
编码问题？查了很多资料。。。

```
#https://docs.python.org/2/library/bz2.html?highlight=bz2#module-bz2
>>> import bz2
>>> print(bz2.decompress(us).decode('utf-8'))
huge
>>> print(bz2.decompress(ps).decode('utf-8'))
file
```

```
#so:http://www.pythonchallenge.com/pc/return/good.html
```
## 第九关：connect the dots
好多图像处理，先学一波：

```
http://pillow.readthedocs.io/en/3.4.x/reference/Image.html
http://pythonguidecn.readthedocs.io/zh/latest/scenarios/imaging.html
```

连接点画图，first,second应该是坐标。。
用到的方法：
```
#http://effbot.org/imagingbook/image.htm#tag-Image.new
#http://pillow.readthedocs.io/en/3.4.x/reference/ImageDraw.html#imagedraw-module
```

```
def process_num_9():
    from PIL import Image,ImageDraw
    first = [146, 399, 163, , ]
    second = [156, 141, 165, , ]
    im = Image.new("RGB", (512, 512)) #开始把color设为'white'，结果一片白。
    draw = ImageDraw.Draw(im)
    draw.line(zip(first[0::2], first[1::2]))
    draw.line(zip(second[0::2], second[1::2]))
    im.show()
#运行结果是个牛的图像。。cow?
#hmm. it's a male.。。。。。。公牛英语怎么说
```

```
so:http://www.pythonchallenge.com/pc/return/bull.html
```

## 第十关：what are you looking at?

> 先找clue
> href="sequence.txt"
> len(a[30]) = ?
>

```
#http://www.pythonchallenge.com/pc/return/sequence.txt
a = [1, 11, 21, 1211, 111221,
#后来发现，点图里的牛也成，和蜜蜂那关一样
```
看起来很简单？！

```
把2拆了：
a[1,11,111,11111,11111111,,]
#其实就是各个位上的数求和
1，2，3，5，8,,似乎有规律,不过是错的。。
想破头皮了~~
知道什么是**外观数列**么
https://zh.wikipedia.org/wiki/%E5%A4%96%E8%A7%80%E6%95%B8%E5%88%97
先试试暴力。。。有反爬策略，，还是研究数列去吧
```

```
#根据wiki上外观数列的性质
def process_num_10():
    a=['11',]
    for i in range(30):
        node = ''
        now = a[i]
        num = 1
        for k in range(1,len(now)):
            if now[k-1]!=now[k]:
                node += str(num)+ now[k-1]
                num=1
            else:
                num+=1
        node += str(num)+now[-1]
        a.append(node)
    print a
    print len(a[29])
```

```
so:http://www.pythonchallenge.com/pc/return/5808.html
```
## 第十一关：odd even
这模糊的感觉，难道又是图像处理？

> 线索很少
> odd even 奇偶
> cave 洞穴

通过把奇数，偶数把坐标分成两份分别生成图像，结果一片黑，还是对图像处理不是特别理解。
多次尝试。。。
正确的如下：
```
def process_num_11():
    from PIL import Image, ImageDraw
    im = Image.open( 'cave.jpg' )
    im1 = Image.new("RGB", (640, 480))
    pixdata = im.load()
    for i in xrange(640):
        for j in xrange(480):
            if (i+j) %2== 0:
                im1.putpixel((i,j),pixdata[i,j])
            else:
                im1.putpixel((i,j),0)
    im1.show()
```

```
#so:http://www.pythonchallenge.com/pc/return/evil.html
```

## 第十二关：dealing evil

> 处理恶魔？
> 又是图像问题，满满的都是恶意
> 似乎这个游戏几乎图像问题。

hah...既然有evil1那么就有evil2，3，4...就2有用。

```
#not jpg - gfx
#http://www.pythonchallenge.com/pc/return/evil2.gfx
#curl -u huge:file http://www.pythonchallenge.com/pc/return/evil4.jpg #或者直接去查看响应
#response: Bert is evil! go back!
```

可是还是不会，，第一次听说.gfx文件

___note___:*实习生活告一段落，开始玩游戏。*

```
google: What is a GFX file?

Animation file used by video games, such as Batman: Arkham Asylum and Mass Effect; similar to the .SWF file format; contains vector and raster graphics; also may include ActionScript interactive actions.
视频游戏使用的动画文件，如蝙蝠侠：阿卡姆庇护和质量效应; 类似于.SWF文件格式; 包含矢量和光栅图形; 也可能包含ActionScript交互式动作。

google: how to open.gfx file in python
found-- http://www.swftools.org/gfx_tutorial.html

似乎和gfx模块没多大关系。。

---好难~~
```

```
直接打开文件试试吧
用sublime时候直接编译提示：[Decode error - output not utf-8]
去shell看看：
>>>doc2 = open("/Users/mioji/Desktop/evil2.gfx", "rb").read()
>>>doc2
输出一坨：'\xff\x89G\x89\xff\xd8PIP\xd8\xffNFN\xff\xe0G8G\xe0\x00\r7\r\x00\x10\na\n\x10J\x1a@\x1aJF\n\x01\nFI\x00\xf0\x00IF\x00\x00\x00F\x00\x00\xe7\x00\x00\x01\r\x00\r\x01\x01I\x00I\x01\x01H\x00H\x01\x00D\x01D\x00\xb4R\x00R\xb4\x00\x00\x00\x00\x00\xb4\x00\x01\x00\xb4\x00\x01\x04\x01\x00\x00\x90\x02@\x00\xff\x00\x00\x00\xff\xe1\x00\x05\x00\xe1\x08\x01\x00\x00\x0b\xa4,\x02\xf0\xdfE\x08\x00\x08Ex\x02\x06\x02xi\x00\x00\x00if\x00\x00\x00f\x00\x00\x04\x00\x00\x00b\x00\xfe\x00M\xd5\x06OMMr\x00*M\x00\x95\x01<\x00*\x00\x0e\x00*\x00\x00\x00\x00\x00\x00\x00\x03\x00\x00\x00\x06\x06\t\x00\x08b\x01p\x08\x00K\x04H\x00\x00G\x00Y\x00\x00D\x00s\x00\x00\x00\x04\x00\x00\x00\x00\x07\x00\x00\x0e\x00\x05\x1b\x0e\x00\x00\x02\xaf\x00\x02\x00\x07.......'
>>> doc2.count('\n')
232
>>> len(doc2)
67575
---忍不住看了答案：是要轮流分五份，就像第一张图片分牌一样。（MD）
剩下就简单了。。回过头来看好像很简单。。。不过刚接触以为还要用到什么新模块呢。无头苍蝇乱撞╮(╯▽╰)╭
def process_num_12():
    doc2 = open("/Users/mioji/Desktop/evil2.gfx", "rb").read()
    for i in range(5):
        with open('evil%s'%(str(i)),'wb') as f:
            f.write(doc2[i::5])
```

```
dis pro port ...我这边就显示上面一半 ity(被划掉了)，算了去google翻译吧 Did you mean: disproportionate ,试了又试
#so: disproportional
http://www.pythonchallenge.com/pc/return/disproportional.html
```

## 第十三关：call him

`phone that evil`
看到这，瞬间想到12关的那个`Bert is evil! go back!`
不会这么容易吧。。。2378不对。。
难道国外电话要加#号？试了下加前面有用，#2378

```
don't look here
--至少不是404，后来发现。单独一个“#”返回也是这个信息。。。唉
```

```
剩下就这一个线索了，还打不开。。
http://www.pythonchallenge.com/pc/phonebook.php
还有一个就是源码中：
phone that <remote /> evil
remote call? WTF-_-
google：python remote call --还真有
pip install rpyc and help(rpyc) 学吧，，MD好像不是这个模块。。

找了半天，不可避免的瞥到了答案：是用到xmlrpclib模块。看文档学习吧https://docs.python.org/2/library/xmlrpclib.html#xmlrpclib.ServerProxy
知道模块了就简单了-----早点给个提示多好
```

```
>>>import xmlrpclib
>>>r = xmlrpclib.ServerProxy('http://www.pythonchallenge.com/pc/phonebook.php')
>>> type(r)
<type 'instance'>
>>> r.system.listMethods()
['phone', 'system.listMethods', 'system.methodHelp', 'system.methodSignature', 'system.multicall', 'system.getCapabilities']
>>> r.system.methodSignature('phone')
[['string', 'string']]
>>> r.system.methodHelp('phone')
'Returns the phone of a person'
>>> r.phone('bert')
'He is not the evil'
>>> r.phone('Bert')
'555-ITALY'

---这一步一步的跟着提示走，唉。根据文档就学了俩方法，列出方法和Help。原理还不是太明吧，反正有答案了。事实上他列出的方法我都试了，我这里就展示有意义的线索。

http://www.pythonchallenge.com/pc/return/ITALY.html
SMALL letters.
#so:http://www.pythonchallenge.com/pc/return/italy.html
```

## 第十四关：walk around

```
应该是处理大便下面那个图片吧，O__O …那是面包。
http://www.pythonchallenge.com/pc/return/wire.png
源码中找到了提示：remember: 100*100 = (100+99+99+98) + (...
而图片正好是100*100的。试试吧。

MD,单单这个公式推了半天，最终试出来，实验过程如下：
>>> sum = 0
>>> num = 99
>>> for i in range(100):
...     sum+= num*4
...     num -= 2
...     print sum
会输出很多，似乎到i= 49时候就等于10000了。
所以推测公式为：100*100 = (100+99+99+98)+ (98+97+97+96)+(96+95+95+94)+...
```

```
下面才是正题--处理图像
>>> from PIL import Image, ImageDraw
>>> im = array(Image.open('/Users/mioji/Desktop/wire.png'))
>>> print len(im[0])
10000

#做实验时候还在纳闷：原来这个图像是10000*1的，所以图像下载下来是个长条。。。
#所以说公式没什么用- -WTF。

>>> for i in range(100):
...     for j in range(100):
...             im1[i][j]=im[0][num]
...             num-=1
...
>>> imshow(im1)
<matplotlib.image.AxesImage object at 0x109040250>
>>> show()
```
展示的图像。bit?什么鬼。
![这里写图片描述](bit.jpeg)

```
试了一下
#http://www.pythonchallenge.com/pc/return/bit.html
you took the wrong curve.
可能那个公式还是有用的。。
不不不，突然意识到那个大便有提示作用。。一圈一圈的。。
O__O "…拙劣的代码写了个蛇形数组(而且还有Bug)。不提出来献丑了所有代码我都保存在github上，等通关了我放到最后，虽然那是一个漫长的时间。
```
![这里写图片描述](cat.jpeg)

不过能看清是只猫，其他都是细节✧(≖ ◡ ≖✿)嘿嘿

```
#so:http://www.pythonchallenge.com/pc/return/cat.html
```
