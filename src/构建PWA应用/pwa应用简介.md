# PWA应用简介

pwa应用在设计思路和结构上已经和传统web前端应用有了明显区分,而更加接近原生客户端应用了.

pwa应用在形式上是单页应用,也就是说一个pwa应用只有一个html页面.因此天然的非常适合用vue,react这种框架构造.

一个标准的pwa应用有如下几个部分:

1. 网址和对应的页面,这个自不必说,毕竟它还是个浏览器前端应用
2. 一个`service worker`脚本,一般就命名为`sw.js`放在前端项目托管的目录下,并在前端应用中通过`navigator.serviceWorker.register`接口注册.一旦注册它就会像`web worker`一样起一个线程来执行,同时它也可以使用`web worker`下可以使用的接口.具体可以看[前面的相关文章](https://blog.hszofficial.site/TutorialForFront-EndWeb/#/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%8E%AF%E5%A2%83%E7%9A%84%E5%89%8D%E7%AB%AF%E5%BA%94%E7%94%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%E8%B0%83%E7%94%A8%E6%9C%AC%E5%9C%B0%E8%B5%84%E6%BA%90/%E4%BD%BF%E7%94%A8%E6%9C%AC%E5%9C%B0%E5%A4%9A%E7%BA%BF%E7%A8%8B%E8%B5%84%E6%BA%90)
3. 一个名为`manifest.json`的json文件了,这个文件是为了实现PWA应用添加至桌面的功能,可以配置用的图标,名称等信息,具体可以看[MDN上的这篇文章](https://developer.mozilla.org/zh-CN/docs/Web/Manifest).其形式为:

    ```json
    {
    "name": "HackerWeb",
    "short_name": "HackerWeb",
    "start_url": ".",
    "display": "standalone",
    "background_color": "#fff",
    "description": "A simply readable Hacker News app.",
    "icons": [{
        "src": "images/touch/homescreen48.png",
        "sizes": "48x48",
        "type": "image/png"
    }, {
        "src": "images/touch/homescreen72.png",
        "sizes": "72x72",
        "type": "image/png"
    }, {
        "src": "images/touch/homescreen96.png",
        "sizes": "96x96",
        "type": "image/png"
    }, {
        "src": "images/touch/homescreen144.png",
        "sizes": "144x144",
        "type": "image/png"
    }, {
        "src": "images/touch/homescreen168.png",
        "sizes": "168x168",
        "type": "image/png"
    }, {
        "src": "images/touch/homescreen192.png",
        "sizes": "192x192",
        "type": "image/png"
    }],
    "related_applications": [{
        "platform": "web"
    }, {
        "platform": "play",
        "url": "https://play.google.com/store/apps/details?id=cheeaun.hackerweb"
    }]
    }
    ```

    在定义好后还需要在html页面上填上`<link rel="manifest" href="/manifest.json">`使之生效

按惯例我们来个helloworld,这个项目以[浏览器环境-helloworld](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%8E%AF%E5%A2%83-helloworld)为蓝本,将其改造为一个简单的pwa应用.

这个项目托管在[浏览器环境-pwa-hello分支](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%8E%AF%E5%A2%83-pwa-hello).

我们的这个helloworld仅仅只是演示了

## 响应缓存和拦截



## PWA应用的生命周期

## 