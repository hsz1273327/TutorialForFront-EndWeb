# ServiceWorker

[ServiceWorker](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers)是一个为解决通信中断而生的技术,它本质上是一个单独的代理线程,通过缓存可以将特定的远程资源拦截保存,以提供离线状态下的可用性.

这个特性是为离线模式准备的,使用它就意味着你的前端项目的缓存是可控的,更进一步的如果你的前端项目并不是内容驱动而是功能驱动的,那处理好缓存甚至可以将它当做本地应用使用,再更进一步,ServiceWorker是PWA(Progressive Web App)的核心依赖,完整的PWA在国内搞不了,但利用ServiceWorker搞离线优先的web app是完全可行的

本文依然以单页应用作为例子,例子在[浏览器环境-浏览器与通信-ServiceWorker分支](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%8E%AF%E5%A2%83-%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%8E%E9%80%9A%E4%BF%A1-ServiceWorker).这个例子就是mdn官方的例子的扩展,这里仅做基本演示.

## 开发环境

ServiceWorker特性依赖于https或本地域名localhost,毕竟本地要缓存的东西安全性要是要在意的,毕竟修改网络请求的能力暴露给中间人攻击会非常危险,如果允许访问这些强大的API,此类攻击将会变得很严重.我使用的开发浏览器是chrome.据说firefox需要有额外设置才能本地调试该功能,不过chrome并没有这个要求.

## serviceworker的生命周期

有serviceworker的前端项目通常会在要其发挥作用的路径(作用域)下放置一个命名为`sw.js`的文件.这个文件就用于管理这个作用域下的缓存操作.对于单页应用来说项目通常是如下结构

```txt
---public
    |---index.html // 页面
    |---style.css  // 样式表
    |---app.js     // 入口js
    |---sw.js      // serviceworker逻辑
    |...
```

我们需要在入口js中包含安装这个sw.js的逻辑这样这个作用域内的serviceworker才会生效

而serviceworker的生效流程可以按顺序分为如下步骤

1. 注册.由`app.js`中的逻辑发起,这一步会从指定的地址下载serviceworker脚本并注册到位等待安装.注册过的serviceworker脚本会绑定到对应的scope,并保存到硬盘.
2. 安装.注册成功后浏览器会加载这个脚本到一个线程,并在这个worker线程中初始化一个作用域对象(ServiceWorkerGlobalScope)作为`self`全局变量.当线程建立好后就会发送一个`install`事件给这个worker线程
3. 激活.安装完成后浏览器会锁定这个worker的状态,如果之前有安装过其他的worker且还在生效中则会先关闭旧版本相关的内容,之后再激活这个新的worker.当激活完成时就会发送一个`install`事件给这个worker线程.
4. 废弃.`如果service worker`在注册或安装过程中失败或被新版本替代,serviceworker就会被置为废弃.

执行完前3个步骤后对应的`sw.js`就正式生效了.

## 和webWorker的关系

`service worker`本质上是`webworker`的特例,他们在多数接口和行为上是一致的.

1. 他们都只在`渲染进程`中由`worker线程`执行
2. 他们的导入行为完全一致
3. 他们全局变量和全局接口除了`service worker`多一个`caches`外完全一致

`service worker`本质上就是`shared worker`+对特定事件的监听+`caches`接口+特殊生命周期

### 多标签时的service worker线程

这也是和`webworker`不同的一点,普通的`webworker`由`渲染进程`的`主线程`直接拉起`worker线程`.也就意味着多标签情况下每个标签会有自己的`worker线程`.

而`service worker`的`worker线程`启动就会复杂一些

+ 在导航流程中`浏览器进程`会先查询scope下有没有`service worker`注册,如果没有就和正常流程一样,`service worker`线程和一般的`webworker`一样由`渲染进程`的`主线程`通过注册接口拉起来.这个`service worker`脚本最终会处于激活状态
+ 如果scope下有`service worker`注册且不处于激活状态,`浏览器进程`的`UI线程`会为这个`service worker`启动一个`渲染进程`,然后在没有`主线程`的情况下先拉起来`service worker`线程.然后执行serviceworker的执行流程,脚本最终会处于激活状态
+ 如果scope下有`service worker`注册且处于激活状态,这就意味着浏览器下已经存在一个`渲染进程`中存在一个`service worker`线程了,那么`浏览器进程`的`UI线程`不会为这个`service worker`启动`service worker`线程,而是网络请求都会被这个已经激活的`service worker`的代理,而`渲染进程`的主线程中的注册接口也不会额外拉起新的`service worker`线程了

### 注册安装

注册步骤由主线程的脚本发起,通常我们都会在最前面执行这个注册步骤

+ app.js

    ```js
    const registerServiceWorker = async () => {
    // 判断浏览器支不支持serviceWorker特性
    if ('serviceWorker' in navigator) {
        try {
            // 注册serviceworker
            // 这个接口会向服务端请求`sw.js`
            const registration = await navigator.serviceWorker.register(
                'sw.js',
                {
                scope: '/',
                }
            )
            if (registration.installing) {
                // registration.installing不为null则说明Service worker正在安装
                console.log('Service worker installing');
            } else if (registration.waiting) {
                // registration.waiting不为null则说明Service worker已经安装好
                console.log('Service worker installed');
            } else if (registration.active) {
                // registration.active不为null则说明Service worker已经激活
                console.log('Service worker active');
            }
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
    };
    ...
    registerServiceWorker()
    ```

相对应的,当执行这个`navigator.serviceWorker.register`接口时,`sw.js`会被下载并在`ServiceWorkerGlobalScope`中作为一个单独的线程执行,这本质上是一种特殊的上下文,和webworker一样没有访问DOM的权限.

注册步骤会执行下载`serviceworker`脚本的操作,这个下载的触发条件有

+ 每次进入页面会重新下载
+ 每24小时必定会下载一次
+ 在 service worker上的一个事件被触发并且过去24小时没有被下载会触发新的下载

只有新下载的`serviceworker`脚本和旧有的按照字节比对有不一致才会执行安装.也就是上面的`registration.installing`不为`null`的情况.如果不进行安装,则表示继续使用原有的,此时就要看原有的所处的状态,如果已经被激活则`registration.active`不为null,否则表示虽然已经安装但并未激活,则`registration.waiting`不为空

### 作用域

`avigator.serviceWorker.register()`的`scope`参数用于指定你想要`service worker`控制的子作用域.在这个例子中我们指定了`/`,其表示app的源(origin)下的所有内容.`/`也是这个参数的默认值.
我们当然也可以在`scope`传入别的值,它表示作用于不超过指定的最大范围,比如`{scope: '/read/'}`则作用域的最大范围就只到`/read/`,也就是说`/read/`,`/read/a`这类的都可以,但超出了范围即便是`/read`都不在其范围内.

比较需要注意的是两个特殊的作用域

+ `/`,表示根目录.`service worker`可以控制域名下所有页面也网络请求
+ `./`,表示当前目录.会根据路径的作用域动态的产生多个`serviceWorker`,比如一个页面属于作用域为`/read/`的会创建一个`/read/`对应的`serviceWorker`,作用域为`/`的会创建一个`/`对应的`serviceWorker`.

### 作用域污染

多个`serviceWorker`同时管理同一个页面就会产生作用域污染.为了避免作用域污染我们可以从两个方面着手.

1. 强制一个前端应用只注册一次且只注册根目录作为作用域
2. 注册时强制先注销掉错误的serviceWorker再注册新的

    ```js
    ...
    if ('serviceWorker' in navigator) {
        try {
            // 先强制取消注册
            const registrations = await navigator.serviceWorker.getRegistrations()
                for (let r of registrations){
                    if (r.scope.includes("read")){
                    const ok = await r.unregister()
                    console.log(`Service worker ${r.scope} unregisted -- ${ok}`);
                    }
                }
            // 注册serviceworker
            // 这个接口会向服务端请求`sw.js`
            const registration = await navigator.serviceWorker.register(
                'sw.js',
                {
                scope: '/',
                }
            )
            ...
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
    ...
    ```

当然了我们的例子是单页应用,因此也就不需要这么麻烦了.

### serviceWorker的更新

如果你的`service worker`已经被安装,但是刷新页面时有一个新版本的可用,新版的`service worker`会在后台安装,但是仍然不会被激活.当不再有任何已加载的页面在使用旧版的`service worker`的时候新版本才会激活.这是前面提到的激活步骤.

serviceWorker更新通常是在要缓存的内容范围或逻辑有变化时才有必要,如果只是缓存逻辑的变化我们其实不用操心,但如果是内容范围有变化我们就需要使用版本号来做区分了.

我们通常会在`install`事件时设置缓存,这个步骤中我们只需要管好缓存的版本号即可

+ sw.js

    ```js
    const addResourcesToCache = async (resources) => {
    const cache = await caches.open("v2"); //创建新版本缓存
        await cache.addAll(resources);
    };

    self.addEventListener("install", (event) => {
        event.waitUntil(
            addResourcesToCache([
                "/",
                "/index.html",
                "/style.css",
                "/app.js",
                "/image-list.js",
                ...
            ]),
        );
    });
    ```

激活这个过程是自动的,但旧的缓存不会被自动删除,因此我们应该在激活后清除旧有缓存

+ sw.js

    ```js
    const deleteCache = async (key) => {
        await caches.delete(key);
    };

    const deleteOldCaches = async () => {
    const cacheKeepList = ["v2"];
    const keyList = await caches.keys();
    const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key)); //删除旧版本缓存
        await Promise.all(cachesToDelete.map(deleteCache));
    };

    self.addEventListener("activate", (event) => {
        event.waitUntil(deleteOldCaches());
    });
    ```

传给 `event.waitUntil()` 的`promise`会阻塞其他的事件直到它完成.因此你可以放心,当你在新的`service worker`中得到你的第一个`fetch`事件时你的清理操作已经完成.

### 立即激活

正常流程我们需要等待全部页面清理完才能激活新的serviceWorker,我们也可以强制要求跳过这个步骤直接激活,方法就是在`serviceWorker`脚本中在接收到`install`事件后调用`self.skipWaiting()`.这样新的`service worker`将立即收到`activate`事件,并将接管任何打开的页面

+ sw.js

    ```js
    self.addEventListener('install', (event) => {
        self.skipWaiting() //先执行,不用await
        event.waitUntil(
            addResourcesToCache(SW_CACHE_RESOURCE)
        )
    })
    ```

如果应用中有多个`service worker`,我们还得将`serviceWorker`的更新扩散到所有作用域,这就需要借助``接口实现了

+ sw.js

    ```js
    self.addEventListener("activate", (event) => {
        event.waitUntil(self.clients.claim());
    });
    ```

## serviceWorker的事件

和webworker一样,`sw.js`也是事件驱动的,驱动的事件包括如下几个:

+ `install`安装完成事件,
+ `activate`激活事件.
+ `message`消息事件.
+ `fetch`http请求事件.
+ `sync`同步事件.以及实验性的`periodicSync`定时同步事件
+ `push`[Push API](https://www.w3.org/TR/push-api/)的对接事件,用于接收Push Service发送来的消息的事件,对于chrome来说就是要使用[Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging?hl=zh-cn),在墙外,因此这里就不介绍了.

### waitUntil接口

这些事件注册的回调函数是一般函数,我们不能为其注册异步函数.我们就需要确保注册的回调函数能够被完整的执行完成.`event.waitUntil(Promise<any>)`提供了延长生命周期事件的执行时间等待传入的`Promise`被成功 `resolve`的能力.

+ sw.js

    ```js
    self.addEventListener('install', (event) => {
        // self.skipWaiting()
        event.waitUntil(
            addResourcesToCache()
        )
    })
    ```

### install事件

install事件是注册成功后serviceWorker脚本开始运行时触发的事件.这个事件始终会是第一个发给serviceWorker脚本的事件,因此通常用它来激活缓存配置.和前面更新部分一样,我们只要关心内容范围有变化并为其确定好版本号即可.

+ sw.js

    ```js
    const SW_VERSION = "v1"
    const SW_CACHE_RESOURCE = [
        './',
        './index.html',
        './style.css',
        './app.js',
        './image-list.js',
        './star-wars-logo.jpg',
        './gallery/bountyHunters.jpg',
        './gallery/myLittleVader.jpg',
        './gallery/snowTroopers.jpg',
    ]
    ...
    const addResourcesToCache = async () => {
        const cache = await caches.open(SW_VERSION)
        await cache.addAll(SW_CACHE_RESOURCE)
    }
    ...
    self.addEventListener("install", (event) => {
        event.waitUntil(
            addResourcesToCache(),
        );
    });
    ```

个人建议将版本号和要维护的资源列表放在脚本最前面便于维护.

### activate事件

当`serviceWorker`被激活后就会受到activate事件.通常activate事件一般用来删除旧版本缓存以及激活一些特性比如`导航预加载`

### message事件

类似`webworker`中的消息机制.`serviceWorker`和主线程间也可以通过消息事件沟通.整个流程也和`webworker`类似,只是接口的载体略有不同

在浏览器中同一个作用域内仅可以有一个`serviceWorker`线程在激活状态,但页面或者说主线程并不唯一,页面多开是很常见的操作. 因此message的发送可以分为

+ 主线程向`serviceWorker`中发送消息
+ `serviceWorker`向所有主线程广播消息
+ `serviceWorker`向特定主线程单播消息

但无论主线程还是在`serviceWorker`线程中,`postMessage()`接口发送的消息都和`webworker`中的限制一样,其结果会被放在接收端事件的`.data`字段下

#### 主线程向`serviceWorker`中发送消息

主线程(`app.js`)向`serviceWorker`中发送消息要两个条件:

1. `navigator.serviceWorker`是就绪状态,我们可以调用`await navigator.serviceWorker.ready`等待其就绪
2. 使用注册接口获得的`ServiceWorkerRegistration`对象调用它的`active`获取`ServiceWorker`对象,调用其`postMessage()`接口发送消息

```js
const registration = await navigator.serviceWorker.register(
    'sw.js',
    {
        scope: '/',
    }
)
...

await navigator.serviceWorker.ready
registration.active.postMessage(
    "Test message sent immediately after creation from main to worker",
)
```

而在`serviceWorker`端(`sw.js`)接收消息就简单的多,直接注册`message`事件的回调即可

```js
addEventListener("message", (event) => {
event.waitUntil(
    (async () => {
    console.log(`Message received: ${ event.data }`)
    })()
)
})
```

我们还可以从`event`对象上获取到发送消息的主线程的一些元信息

+ `event.origin`,主线程的`origin`
+ `event.source`,主线程对象其中可以获得
    + `event.source.id`,主线程id
    + `event.source.url`,主线程对应的url
    + `event.source.visibilityState`,主线程的可见性状态,有如下枚举`hidden`(隐藏),`visible`(可见),`prerender`(预渲染)

#### `serviceWorker`向所有主线程广播消息

`serviceWorker`向所有主线程广播消息我们就需要用到`self.clients`对象.这个对象会代理整个作用域中所有的主线程,通过调用其接口`matchAll()`就可以获得一个元素为全量主线程对象的array,每一个主线程对象的元数据和上面的`event.source`一致,而且提供`postMessage`接口.

`serviceWorker`端(`sw.js`)要向所有主线程广播我们遍历`self.clients`,全部都调用发送接口即可

```js
const clients = await self.clients.matchAll()
clients.forEach(function(client) {
    if (client.url.includes("/my-account")) {
        client.postMessage("Hi client: "+client.id)
    } 
})
```

而在每个主线程(`app.js`)中我们要能够监听到由`serviceWorker`发送来的消息则需要做如下操作

1. 调用`avigator.serviceWorker.startMessages()`这个接口开启消息接收功能
2. 在`navigator.serviceWorker`上注册`message`的回调从`serviceWorker`端获取消息

```js
navigator.serviceWorker.addEventListener("message", (event) => {
    console.log(`Get message from worker ${event.data}`);
});
navigator.serviceWorker.startMessages()
```

#### `serviceWorker`向特定主线程单播消息

广播和单播类似,或者说我们在获得到特定主线程对象后直接调用其`postMessage`接口就是单播.所以`serviceWorker`向特定主线程单播消息的核心问题就是在`serviceWorker`中(`sw.js`)如何获取到特定主线程实例.

有如下两种方式

+ 从监听事件的事件对象上获取,注册回调的参数有`source`指向传递过来消息的主线程对象.我们可以充分利用这一机制做应答或保存其`id`

    ```js
    let cacheClientID
    addEventListener("message", (event) => {
        event.waitUntil(
            (async () => {
                cacheClientID = event.source.id
                console.log(`Message from ${event.source.id} received: ${ event.data }`)
                event.source.postMessage("This is a message from sw")
            })()
        )
    })
    ```

+ 利用主线程对象的`id`查询获取对应的主线程对象.这个`id`可以通过`self.clients.matchAll()`取到全量,通过消息事件的`event.source.id`的应答让特定主线程获取到自己的`id`,等到需要的时候`self.clients.get(id)`接口获取到对应的主线程对象

    ```js
    const client = await self.clients.get(clientID)
    client.postMessage("Hi client: "+client.id)
    ```

需要注意页面只要已刷新主线程就会重启,也就会有一个id失效并创建一个新id,

### fetch事件

主线程的http请求就会触发这个事件,serviceWorker可以通过fetch事件事件拦截网络请求,从而给缓存的调用留有空间.

`fetch`回调的参数有如下字段

+ `event.clientId`,请求主线程的id
+ `event.replacesClientId`,在页面导航过程中被替换的主线程的id
+ `event.resultingClientId`,在页面导航期间替换前一个主线程的主线程的id
+ `event.request`,请求的请求体
+ `event.preloadResponse`,预加载特性激活后会存在,导航预加载阶段获取到的响应

拦截`fetch`事件我们只需要简单的使用`event.respondWith()`接口即可.

+ sw.js

```js
// 缓存请求结果的函数
const putInCache = async (request, response) => {
  const cache = await caches.open('v1')
  await cache.put(request, response)
}

// 缓存优先的拦截策略
// 有缓存就返回缓存,没有则执行网络请求
const cacheFirst = async ({ request, fallbackUrl }) => {
  // 1. 尝试从缓存中寻找请求对应的结果,存在就直接返回
  const responseFromCache = await caches.match(request)
  if (responseFromCache) {
    return responseFromCache
  }
  // 2. 当不存在缓存时尝试从网络上获取数据
  try {
    const responseFromNetwork = await fetch(request.clone())
    // 顺利请求到数据则异步的缓存起来
    putInCache(request, responseFromNetwork.clone())
    return responseFromNetwork
  } catch (error) {
    // 3. 请求不成功则通过`fallbackUrl`查找匹配的默认结果
    const fallbackResponse = await caches.match(fallbackUrl)
    if (fallbackResponse) {
      return fallbackResponse
    }
    // 4. 如果没有对应的默认结果则返回一个408状态兜底
    return new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    })
  }
}
...
self.addEventListener('fetch', (event) => {
  event.respondWith(
    cacheFirst({
      request: event.request,
      fallbackUrl: './gallery/myLittleVader.jpg',
    })
  )
})
```

### `后台同步`和同步事件

同步事件`sync`是`serviceWorker`特有的用于同步本地状态到远端的事件.它对应的功能叫`后台同步`.使用后台同步的实质是将操作从页面上下文中剥离开,并在后台(即`serviceWorker`中)运行.
通过将这些操作放到后台它们就不会受到单个网页行为不可预测性的影响.网页会被关闭,用户连接可能会断开,甚至服务器有时候也会故障.但只要用户设备上安装了浏览器,后台同步中的操作就不会消失,直到它成功完成为止.
你应该考虑用后台同步来处理任何超出当前页面生命周期的操作.无论用户要发送消息,将待定项目标记为已完成,还是添加事件到日历等等,后台同步都可以确保操作能够成功完成.

注意无论是`sync`还是`periodicSync`现在都不是所有浏览器都支持,目前确认chrome(及其他chromium核心的浏览器),edge和Opera可以兼容.为了确保业务通顺我们应该在使用这个特性的时候做好兼容性检测并想好不支持的浏览器应该怎么处理

```js
if ("sync" in registration){
    ...
}
if ("periodicSync" in registration){

}
```

`后台同步`的包括两个部分

1. 主线程注册同步标签
2. `serviceWorker`监听同步事件

他有如下接个特点:

+ 事件标签是唯一的.已经注册过的事件不会被重复注册.你只需要无脑注册就好不用管是否已经存在同步标签或者是正在运行.
+ 仅在网络连接可用时会触发同步事件,且事件成功执行回调后标签会被自动取消注册

#### 注册同步标签

注册同步标签可以在主线程中也可以在`serviceWorker`中实现

+ 在主线程中,我们需要先确保`navigator.serviceWorker`已经就绪,之后用注册对象`registration`的`sync`字段注册即可

    ```js
    const registration = await navigator.serviceWorker.register(
        'sw.js',
        {
          scope: '/',
        }
    )
    ...
    await navigator.serviceWorker.ready
    ...
    registration.sync.register("say-hello") // 注册同步事件
    ```

+ 在`serviceWorker`中我们使用`self.registration`的`sync`字段注册即可.

    ```js
    self.registration.sync.register("say-bye") 
    ```

我们一样也可以用这个`sync`字段获取当前注册的标签记录

```js
const tags = await registration.sync.getTags()
console.log(tags)
```

#### 监听同步事件

同步事件(`sync`)只能在`sw.js`上部署

```js
addEventListener("sync", (event) => {
    console.log(`get sync event ${ event.tag }`)
    if (event.tag === "say-hello") {
        console.log("say-hello ok")
    }
    if (event.tag === "say-bye") {
        console.log("say-bye ok")
    }
})
```

如果回调执行失败,同步标签就不会被取消注册,而是会由浏览器自行定义重试行为.event有一个额外字段`lastChance`,它可以用于标识当前的`sync`事件是否是最后一次重试.

```js
addEventListener("sync", (event) => {
    console.log(`get sync event ${ event.tag }`)
    if (event.tag === "say-hello") {
        ...
        if (event.lastChance){
            console.log("say-hello ok lastChance")
        }
        ...
    }
    ...
})
```

#### 定时同步

`后台同步`仅在网络由离线切换到在线时触发,如果我们希望任务定时被触发,可以使用`periodicSync`事件,它的使用流程和`sync`基本一样,只有如下几个不同点,这几点都是在主线程中处理的

+ 需要申请权限且必须有https

    ```js
    const status = await navigator.permissions.query({
        name: 'periodic-background-sync',
    });
    if (status.state === 'granted') {
        ...// 有权限后的操作
    }
    ```

+ 注册时需要填入定时信息,第二个参数接收一个有`minInterval`字段的对象,这个字段中填写最小间隔,单位ms

    ```js
    if ('periodicSync' in registration) {
        // 注册定期同步事件
        registration.periodicSync.register("say-hello-1-seconde",{minInterval: 1000}) // 注册定时同步事件
        ...
    }
    ```

+ 同步标签的处理逻辑不通,由于是定时任务,同步标签不会自动取消注册,如果要取消注册只能手动调用`unregister(tag)`接口

    ```js
    registration.periodicSync.unregister("say-hello-1-seconde")
    ```

    同时事件也就不存在`lastChance`.

## 缓存处理

`serviceWorker`是为自定义缓存策略而生的工具,自然也提供了专门的对应接口`caches`(类为`CacheStorage`)和由它创建的实例`cache`(类为`Cache`).这是一个键值对型的数据库,且自动和当前的作用域关联,键是请求对象,值是响应对象,接口非常简单

> `CacheStorage`数据库管理工具

+ `caches.open(SW_VERSION)=>Promise<Cache>`.打开指定名字的缓存数据库,通常`SW_VERSION`是版本名.
+ `caches.keys()=>Promise<string[]>`,获取所有当前存在的数据库名.通常在清理旧缓存时使用.
+ `caches.has(cacheName: string)=>Promise<boolean>`,查看当前指定的数据库名的缓存数据库是否存在.
+ `caches.delete(cacheName: string)=>Promise<boolean>`,删除指定数据库名对应的缓存数据库
+ `caches.match(request: RequestInfo | URL, options?: MultiCacheQueryOptions)=>Promise<Response | undefined>`,从所有存在的缓存数据库中按`caches.keys()`返回数组的顺序查找是否有匹配这个请求的响应.如果找到了就立刻返回匹配到的响应数据,最终都找不到则返回`undefined`.这个接口如果能够确保仅有一个数据库存在则所有缓存的查找操作都可以用它来实现.可以在`options`中指定如下字段进行精细查找
    + `ignoreSearch`: Boolean类型,默认`false`.指定匹配过程是否应该忽略`url`中查询参数(比如`?value=bar`).
    + `ignoreMethod`: Boolean类型,默认为`false`.指定是否阻止在匹配操作中对Request请求的http方式的验证(只允许`GET`和`HEAD`两种请求方式)
    + `ignoreVary`: Boolean类型,默认为`false`. 指定是否告知在匹配操作中忽略对`VARY头信息`的匹配.
    + `cacheName`: String类型，指定搜索的缓存数据库名

> `Cache`缓存管理工具

+ `cache.put(request, response)=>Promise<Cache>`,往缓存数据库对象中保存一组请求响应
+ `cache.add(request: RequestInfo | URL)=>Promise<void>`,执行一个请求,获取响应后将这个请求响应对缓存到数据库
+ `cache.addAll(requests: RequestInfo[])=>Promise<void>`,执行一个列表的请求,获取相应响应后将请求响应对的列表都存入缓存数据库
+ `cache.keys(request?: RequestInfo | URL, options?: CacheQueryOptions)=>Promise<ReadonlyArray<Request>>`,查询缓存库中所有的key,如果指定`request`和`options`则表示查询所有符合要求的键.第二个参数的字段和上面`caches.match`的一致,只是`cacheName`不会生效
+ `cache.match(request: RequestInfo | URL, options?: CacheQueryOptions)=>Promise<Response | undefined>`,匹配获取缓存库中指定请求的的第一个响应,第二个参数的字段和上面`caches.match`的一致,只是`cacheName`不会生效
+ `cache.matchAll(request?: RequestInfo | URL, options?: CacheQueryOptions)=>Promise<ReadonlyArray<Response>>`,匹配获取缓存库中指定请求的的全部响应,第二个参数的字段和上面`caches.match`的一致,只是`cacheName`不会生效.
+ `cache.delete(request: RequestInfo | URL, options?: CacheQueryOptions)=>Promise<boolean>`,指定一个请求,查找到匹配数据后删除,如果成功找到并删除则返回`true`,否则返回`false`,第二个参数的字段和上面`caches.match`的一致,只是`cacheName`不会生效

这就是所有的缓存接口了.剩下的只是如何利用缓存了.

### 初始化缓存

静态资源的缓存通常是在`install`事件触发时执行的,上面已经有所介绍.由于serviceWorker的激活机制,我们应该按静态资源的变化来划分缓存数据库的版本.

```js
const SW_VERSION = "v1"
const SW_CACHE_RESOURCE = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './image-list.js',
    './star-wars-logo.jpg',
    './gallery/bountyHunters.jpg',
    './gallery/myLittleVader.jpg',
    './gallery/snowTroopers.jpg',
]
...
async function addResourcesToCache(){
    const cache = await caches.open(SW_VERSION)
    await cache.addAll(SW_CACHE_RESOURCE)
}
...
self.addEventListener("install", (event) => {
    event.waitUntil(
        addResourcesToCache(),
    );
})
```

通常我们应该保证最终只有一个版本的缓存数据库存在,且不能影响当前已经激活的serviceWorker,因此需要在`activate`事件中清理旧有缓存

```js
...
async function deleteCache(key) => {
    await caches.delete(key)
};

const deleteOldCaches = async () => {
const cacheKeepList = ["v2"]
const keyList = await caches.keys()
const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key)) //删除旧版本缓存
    await Promise.all(cachesToDelete.map(deleteCache))
};
...
self.addEventListener("activate", (event) => {
    event.waitUntil(deleteOldCaches())
})
...
```

### 拦截fetch

缓存存起来自然是要用的,怎么用呢?通过拦截缓存来使用.根据不同的需求,我们可以将缓存的使用策略分为如下几种

+ `仅缓存`,仅使用在`install`事件触发下缓存的页面,如果缓存中找不到就直接抛错误.这一策略仅对静态资源是实用的,因为静态资源不会在发布之间发生变化.例如徽标,图标和样式表等.这并不意味着你永远无法修改它们.只是意味着它们不会在应用某个特定版本的生命周期内发生变化.其拦截写法也最简单.

    ```js
    async function onlyCache(request){
        return await caches.match(request)
    }
    self.addEventListener("fetch", function(event) {
        event.respondWith(
            onlyCache(event.request)
        )
    })
    ```

+ `缓存优先`,网络作为回退方案.和仅缓存类似,这个模式也会从缓存中响应请求.然而,如果在缓存中找不到内容,`service worker`会尝试从网络中请求并返回,如果网络上依然获得不到,则我们应该将一个在`install`阶段缓存好的回退数据作为结果返回,如果也没有回退数据才返回错误.这一策略一般是本地优先前端应用最常用的策略.一般也主要是针对静态资源和无法修改变动的动态资源使用.

    ```js
    const SW_VERSION = "v1"
    const SW_CACHE_RESOURCE = [
        ...
        './some-fallback', //在服务端定义好fallback,之后在`install`事件是缓存
    ]
    ...
    async function addResourcesToCache(){
        const cache = await caches.open(SW_VERSION)
        await cache.addAll(SW_CACHE_RESOURCE)
    }
    ...
    self.addEventListener("install", (event) => {
        event.waitUntil(
            addResourcesToCache(),
        );
    })
    ...

    // 缓存请求结果的函数
    async function putInCache(request, response) {
        const cache = await caches.open('v1')
        await cache.put(request, response)
    }

    // 缓存优先的拦截策略
    // 有缓存就返回缓存,没有则执行网络请求
    async function cacheFirst({ request, fallbackUrl }){
        // 1. 尝试从缓存中寻找请求对应的结果,存在就直接返回
        const responseFromCache = await caches.match(request)
        if (responseFromCache) {
            return responseFromCache
        }
        // 2. 当不存在缓存时尝试从网络上获取数据
        try {
            const responseFromNetwork = await fetch(request.clone())
            // 顺利请求到数据则异步的缓存起来
            putInCache(request, responseFromNetwork.clone())
            return responseFromNetwork
        } catch (error) {
            // 3. 请求不成功则通过`fallbackUrl`查找匹配的默认结果
            const fallbackResponse = await caches.match(fallbackUrl)
            if (fallbackResponse) {
                return fallbackResponse
            }
            // 4. 如果没有对应的默认结果则返回一个408状态兜底
            return new Response('Network error happened', {
                status: 408,
                headers: { 'Content-Type': 'text/plain' },
            })
        }
    }
    ...
    self.addEventListener('fetch', (event) => {
        event.respondWith(
            cacheFirst({
            request: event.request,
            fallbackUrl: './some-fallback',
            })
        )
    })
    ```

+ `仅网络`,经典的Web模型.尝试从网络中请求,网络不通则请求失败.可以用于不缓存的内容,通常这种模式犯不着用`service worker`实现.如果要在`service worker`中实现一般是要做一些额外的非缓存操作,比如收集上报数据什么的.也就是说这种模式中拦截fetch的操作仅作为代理而已.

    ```js
    async function onlyNetwork(){
        ...
        const res = await fetch(event.request)
        ...
        return res
    }
    self.addEventListener("fetch", function(event) {
        event.respondWith(onlyNetwork(event.request))
    })
    ```

+ `网络优先,缓存作为回退方案`,总是向网络发起请求,请求失败则返回缓存中的版本.如果在缓存中找不到请求就会失败.这种策略主要的是为了防止网络断连后用户什么都干不了,用户总能获取到当前连接状况下可用的最新内容,对于经常改变的内容来说这很合适,对于需要显示最新响应的场景来说也很重要,可以让用户体验稍微好些.

    ```js
    // 缓存请求结果的函数
    async function putInCache(request, response) {
        const cache = await caches.open('v1')
        await cache.put(request, response)
    }
    ...
    // 网络优先的拦截策略
    // 总是先请求网络,如果网络不通则尝试使用缓存,没有缓存才报错
    async function networkFirst(request){
        
        //1. 先尝试网络请求
        try {
            const responseFromNetwork = await fetch(request.clone())
            // 顺利请求到数据则异步的缓存起来
            putInCache(request, responseFromNetwork.clone())
            return responseFromNetwork
        } catch (error) {
            // 2. 请求不成功则查询缓存中是否存在
            const responseFromCache = await caches.match(request)
            if (responseFromCache) {
                return responseFromCache
            }
            // 3. 如果没有对应的缓存结果则返回一个408状态兜底
            return new Response('Network error happened', {
                status: 408,
                headers: { 'Content-Type': 'text/plain' },
            })
        }
    }
    ...
    self.addEventListener("fetch", function(event) {
        event.respondWith(networkFirst(event.request))
    })
    ```

+ `先缓存,后网络`,在检查网络是否有较新版本的期间,立即显示缓存中的数据.一旦网络返回响应,检查它是否比缓存新并使用新内容更新页面.虽然这可能看起来是一种最好的方法,将缓存的快速响应和网络中可用的最新内容结合了起来,但是它需要付出代价.你必须修改你的页面刷新逻辑才能通过发起一次请求但刷新两次页面.更重要的是这种模式可能会为你的应用带来新的用户体验挑战--虽然把一张图片替换成可用的新内容很容易,但是如果你要更新的内容是用户正在编辑的文档文本呢?如果用户已经开始编辑第二句话你又需要修改它应该如何处理呢?如此高的成本带来的仅仅是用户可能都感知不到的体验提升.当然了要实现也不是不能做,我们就需要依赖异步任务和上面的消息机制了

    + `sw.js`

        ```js
        // 缓存请求结果的函数
        async function putInCache(request, response) {
            const cache = await caches.open('v1')
            await cache.put(request, response)
        }
        ...
        // 请求网络获取最新的响应,然后通过message返回给主线程
        async function networkNext(request,clientIDS){
            const responseFromNetwork = await fetch(request.clone())
            const clients = await self.clients.matchAll()
            clients.forEach(function(client) {
                if (clientIDS.includes(client.id)) {
                    client.postMessage({
                        "event": "networkNext"
                        "request": request,
                        "response": responseFromNetwork
                    })
                } 
            })
        }
        // 先缓存,后网络
        // 有缓存就返回缓存,然后异步的请求网络,获得结果后再发送,没有缓存则执行网络请求
        async function cacheFirstNetworkNext({ request, fallbackUrl, clientIDS }){
            // 1. 尝试从缓存中寻找请求对应的结果,存在就直接返回
            const responseFromCache = await caches.match(request)
            if (responseFromCache) {
                // 1.1 异步的请求网络
                networkNext(request,clientIDS)
                return responseFromCache
            }
            // 2. 当不存在缓存时尝试从网络上获取数据
            try {
                const responseFromNetwork = await fetch(request.clone())
                // 顺利请求到数据则异步的缓存起来
                putInCache(request, responseFromNetwork.clone())
                return responseFromNetwork
            } catch (error) {
                // 2.1 请求不成功则通过`fallbackUrl`查找匹配的默认结果
                const fallbackResponse = await caches.match(fallbackUrl)
                if (fallbackResponse) {
                    return fallbackResponse
                }
                // 2.2 如果没有对应的默认结果则返回一个408状态兜底
                return new Response('Network error happened', {
                    status: 408,
                    headers: { 'Content-Type': 'text/plain' },
                })
            }
        }
        ...
        self.addEventListener('fetch', (event) => {
            event.respondWith(
                cacheFirst({
                    request: event.request,
                    fallbackUrl: './some-fallback',
                    clientIDS: [event.clientId,event.replacesClientId,event.resultingClientId]
                })
            )
        })
        ```

    + `app.js`,这里的渲染逻辑需要额外抽出来,让返回的响应和监听到的响应都可以触发重新渲染

        ```js
        //通过请求和响应确定渲染逻辑
        function respRender(req,res){
            ...
        }
        // 通过监听message执行渲染
        navigator.serviceWorker.addEventListener("message", (event) => {
            if ('event' in event.data){
                switch (event.data.event){
                    case :
                        {
                            respRender(event.data.request, event.data.response)
                        }
                        break;
                    ...
                }
            }else{
                ...
            }
            console.log(`Get message from worker ${event.data}`)
        })
        ...
        // 请求响应的渲染部分
        async function someHanddler(){
            ...
            const res = await fetch(req)
            respRender(req,res)
            ...
        }
        ```

+ `过期验证缓存`,这个策略是[HTTP RFC 5861](https://datatracker.ietf.org/doc/html/rfc5861)描述的一种缓存策略,其本质类似食品保质期的概念.这个策略需要后台额外在http的响应头部提供字段`Cache-Control`来设置过期细节,比如`Cache-Control: max-age=600, stale-while-revalidate=30`,它的含义是响应的结果最大可以600s保持新鲜而不用更新,而如果这个响应不再新鲜后30s内依然可以凑活使用,但超过这30s后我们就需要丢弃它重新请求了.一个极端情况是`Cache-Control`没有设置,此时相当于`max-age`和`stale-while-revalidate`都是0,那也就退回到了`仅网络`策略

### web应用的缓存方案

更多的时候我们会根据请求的特点采用不同的缓存策略以最大化缓存的功效.一般混合策略可以分为`在线优先方案`和`离线优先方案`,无论哪种方案我们都需要确定某个请求它本身的特点

+ `在线优先方案`,这种方案适合必须频繁和互联网交互的以及数据时效性要求比较高的应用,大多数传统网络应用都是这个类型,缓存仅作为优化体验的工具.这种方案下我们一般静态资源类数据使用`缓存优先策略`或`网络优先,缓存作为回退方案策略`,动态数据使用`网络优先,缓存作为回退方案策略`
+ `离线优先方案`,这种方案适合对联网状态要求不高的以及对数据时效性要求不高的应用,开发这种应用说白了就是用web技术构造本地应用.比如一些可以利用本地算力的工具型应用,展示为主的应用就非常适合.这种方案下我们一般静态资源类数据使用使用`仅缓存策略`或`缓存优先策略`,动态数据使用`缓存优先策略`或`先缓存,后网络策略`,同时搭配`后台同步`功能确保本地缓存的任务可以被最终消费,搭配`定时后台同步`功能确保本地缓存不会过旧

### serviceWorker对导航的影响以及导航预加载

[标准的导航流程我们已经在本篇最最前面介绍过了](https://blog.hszofficial.site/TutorialForFront-EndWeb/#/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%8E%AF%E5%A2%83%E7%9A%84%E5%89%8D%E7%AB%AF%E5%BA%94%E7%94%A8/README?id=%e5%af%bc%e8%88%aa),但因为`Service worker`可以用来写网站的网络代理层,所以开发者可以对网络请求有更多的控制权,例如决定哪些数据缓存在本地以及哪些数据需要从网络上面重新获取等等.如果开发者在`service worker`里设置了当前的页面内容从缓存里面获取,当前页面的渲染就不需要重新发送网络请求了,这就大大加快了整个导航的过程.这里要重点留意的是`service worker`其实只是一些跑在`渲染进程`里面的JavaScript代码.那么问题来了,当导航开始的时候浏览器进程是如何判断要导航的站点存不存在对应的`service worker`并启动一个渲染进程去执行它的呢?

其实`service worker`在注册的时候它的作用范围(scope)会被记录下来.在导航开始的时候`浏览器进程`的`网络线程`会根据请求的域名在已经注册的`service worker`作用范围里面寻找有没有对应的`service worker`.如果有命中该URL的`service worker`,`UI线程`就会为这个`service worker`启动一个`渲染进程`来执行它的代码.`Service worker`既可能使用之前缓存的数据也可能发起新的网络请求.

如果已经有缓存了不需要发送网络请求还好,但如果启动的`service worker`最后还是决定发送网络请求的话浏览器进程和渲染进程这一来一回的通信包括`service worker`启动的时间其实增加了页面导航的延迟.那有没有降低这种延迟的方法呢?有,`导航预加载`就是一种通过在`service worker`启动的时候并行加载对应资源的方式来加快整个导航过程效率的技术.预加载资源的请求头会用特殊的标志`Service-Worker-Navigation-Preload: <any>(default: true)`来让服务器决定是发送全新的内容给客户端还是只发送更新了的数据给客户端.

导航预加载需要在`serviceWorker`的`activate`事件中使用`self.registration.navigationPreload.enable()`接口激活.

```js
async function enableNavigationPreload() {
  if (self.registration.navigationPreload) {
    // Enable navigation preloads!
    await self.registration.navigationPreload.enable()
  }
}

self.addEventListener('activate', async (event) => {
  event.waitUntil((async () => {
    await enableNavigationPreload()
  })())
})
```

然后在`fetch`事件中使用`event.preloadResponse`等待预加载的资源处理程序完成下载

```js
const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
  //尝试从缓存获取返回
  ...
  // 尝试使用预加载的响应
  const preloadResponse = await preloadResponsePromise;
  if (preloadResponse) {
    console.info("using preload response", preloadResponse);
    putInCache(request, preloadResponse.clone());
    return preloadResponse;
  }
  //尝试从网络中获取响应
  ...
}
...
self.addEventListener("fetch", (event) => {
  event.respondWith(
    cacheFirst({
      request: event.request,
      preloadResponsePromise: event.preloadResponse,
      fallbackUrl: "/gallery/myLittleVader.jpg",
    }),
  );
});
```
