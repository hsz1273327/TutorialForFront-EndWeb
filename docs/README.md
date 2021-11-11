# Web前端技术攻略

web前端技术狭义上说就是针对桌面端的网页制作技术,也就是以http协议,html,css,javascript为核心的基于浏览器的客户端开发技术.而广义上说也可以泛指使用http协议,html,css,javascript中的某几样为核心的客户端技术.具体来说可以分为:

1. 浏览器前端开发(html,css,javascript)
2. chrome插件客户端开发(html,css,javascript和chrome特有api)
3. 桌面端基于electron的客户端开发(html,css,javascript和electron特有api以及一些node服务器技术)
4. 移动端小程序开发(javascript和不同平台特有api)
5. 移动端原生程序开发(javascript和不同平台特有api)

本文会先介绍核心的javascript,html,css,然后从上面介绍的5个方向上一一介绍如何开发.

## 本文针对人群

注意本文并不是一个基础教程,主要是为已经学过python的人而写的攻略文.本文同样也不是专门针对前端开发人员的教程,不会涉及到那些底层技术,而是更加偏向应用.

本文写出来目的是让读者具备如下能力:

1. 有能力进行针对一些简单业务的快速原型开发,用于提供一个功能上可用的前端应用
2. 有能力借助web前端技术解决数据可视化问题

## 文章结构

本文结构上说大致分为:

+ Javascript介绍
+ 基于Vue的浏览器前端应用
+ 基于Vue的chrome插件应用
+ 基于Vue和Electron的桌面客户端应用
+ 基于Vue和taro的小程序应用
+ 基于Vue和taro的移动端原生应用

可以看到本文的技术栈基本围绕Vue展开,这主要还是我个人的技术所限.

本文的示例代码都在项目的各个分支中,大家可以按`${章}-{节}-{内容}`的方式查找到对应的示例代码.文章中也会给出链接方便查看.

## 参考资料

本文大量参考[MDN](https://developer.mozilla.org/zh-CN/docs/Web)上的资料和用到的各种工具的官方文档.也有一些知识点来自网络博客.
