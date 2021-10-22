# websocket

`websocket`则是一种相对颠覆协议,它用起来和tcp的套接字类似,可以实现客户端(浏览器)和服务器间的双工通信.

在`websocket`之前,大家往往使用轮询技术来模拟双工通信,轮询是在特定的的时间间隔(如每1秒)由浏览器对服务器发出HTTP request,然后由服务器返回最新的数据给客户端的浏览器.这种传统的`request-response`的模式带来很明显的缺点--浏览器需要不断的向服务器发出请求,从而占用大量的流量.同时`HTTP request`的`header`是非常长的,里面包含的有用数据可能只是一个很小的值,这样会占用很多不必要的带宽.

使用`websocket`的话浏览器和服务器只需要做一个握手的动作,这之后浏览器和服务器之间就形成了一条快速通道.两者之间就直接可以数据互相传送.在此WebSocket协议中，为我们实现即时服务带来了两大好处:

1. 长连接

    一旦建立连接除非关闭否则可以一直相互通信,包括服务端也可以主动推送信息

2. 安全高效

    一次连接只用验证一次用户,大大减小了验权的频率.

对websocket原理感兴趣的可以看下我[js后端的ws服务器攻略](https://tutorialforjavascript.github.io/%E4%BD%BF%E7%94%A8Javascript%E6%90%AD%E5%BB%BA%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1/Websocket%E6%8E%A5%E5%8F%A3%E6%9C%8D%E5%8A%A1.html)

## websockets api使用示例

这个例子的代码在[C3-S2](https://github.com/TutorialForJavascript/frontend-basic/tree/master/code/C3/S2)

前端项目可以直接通过浏览器的[websockets api](https://developer.mozilla.org/zh-CN/docs/Web/API/Websockets_API)来直接和后端的ws服务器建立连接.

本例复用'js后端的ws服务器'篇中的例子[helloworld](https://github.com/TutorialForJavascript/js-server/tree/master/code/Websocket%E6%8E%A5%E5%8F%A3%E6%9C%8D%E5%8A%A1/C0)作为后端,
我们来基于这个构建一个前端例子.

由于后端我们已经有一个docker镜像,我们可以直接使用docker启动它.

这个项目很简单点击按钮我们就向后端ws服务器发送一个helloworld消息,后端收到后就原样传回来,前端则监听`message`事件由数据传过来就新建个`p`标签的节点插入到`main`节点下.

+ index.js

```js
class WebsocketApp {
    constructor() {
        this.ws = new WebSocket("ws://localhost:4000")
        this.container = document.querySelector("main")
        this.button = document.querySelector("main button")
        this.bind_event()
        console.log("init")
    }
    bind_event() {
        this.button.onclick = () => this.onClick()
        // 注意这里和node中ws框架下不一致,事件监听接口的命名规则和其他前端事件一样.
        this.ws.onclose = () => {
            console.log('disconnected');
        }
        this.ws.onmessage = (message_event) => this.onMessage(message_event)
        console.log("bind")
    }
    onClick() {
        this.ws.send('helloworld')
    }
    onMessage(message_event) {
        // 注意这里和node中ws框架下不一致,数据放在event.data中
        console.log(message_event.data)
        let content = message_event.data
        let p = document.createElement("p")
        p.innerText = content
        this.container.appendChild(p)
    }
}

function main() {
    let app = new WebsocketApp()
}
main()
```

+ index.html

```js
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>websocket demo</title>
  <link rel="stylesheet" href="style.css" type="text/css">
  <script src="index.js" async="async"></script>
</head>

<body>
  <main>
    <button>点击请求</button>
  </main>
</body>

</html>
```



