# 使用Javascript构建Websocket接口服务

js可以使用[ws](https://github.com/websockets/ws)这个框架来实现websocket接口的构造.[接口文档](https://github.com/websockets/ws/blob/master/doc/ws.md)
我们依然从一个[helloworld](https://github.com/TutorialForJavascript/js-server/tree/master/code/Websocket%E6%8E%A5%E5%8F%A3%E6%9C%8D%E5%8A%A1/C0)开始.这个例子我们在客户端连同服务端后立即发送一个`helloworld`消息给后端服务器,服务器接到后则返回一个`helloworld`消息给客户端.客户端在接收到服务器消息后发送一个`close`消息给服务器,服务器就断开和客户端的连接.

+ 客户端

    ```js
    const ws = new WebSocket('ws://localhost:3000')
    ws.on('open', () => {
        ws.send('helloworld')
    })
    ws.on('message', (data) => {
        console.log(data)
        assert.equal(data, 'Hello World')
        ws.close()
    })
    ws.on('close', () => {
        console.log('disconnected');
    })
    ```

+ 服务器

    ```js
    import WebSocket from 'ws'

    const wsserver = new WebSocket.Server({
        port: 3000
    })
    wsserver.on('connection', ws => {
        ws.on('message', message => {
            console.log('received: %s', message)
            switch (message) {
                case "close":
                    {
                        ws.close()
                    }
                    break
                case "helloworld":
                    {
                        ws.send('Hello World')
                    }
                    break
                default:
                    {
                        ws.send('unkonwn command')
                    }
            }
        })
    })
    ```

## websocket的连接原理

首先明确下几个概念:

+ `WebSocket`是一个[双工通信](https://baike.baidu.com/item/%E5%8F%8C%E5%B7%A5%E9%80%9A%E4%BF%A1/2500531?fr=aladdin)协议.意味着一旦建立连接它可以从一端向另一端推送数据
+ `WebSocket`协议是一个和html同一级别的协议([第七层](https://baike.baidu.com/item/%E7%BD%91%E7%BB%9C%E4%B8%83%E5%B1%82%E5%8D%8F%E8%AE%AE/6056879?fr=aladdin)),归属于[IETF](https://baike.baidu.com/item/%E4%BA%92%E8%81%94%E7%BD%91%E5%B7%A5%E7%A8%8B%E4%BB%BB%E5%8A%A1%E7%BB%84/707674?fromtitle=IETF&fromid=2800318&fr=aladdin)

+ `WebSocket API`是一个`Web API`,归属于[W3C](https://baike.baidu.com/item/%E4%B8%87%E7%BB%B4%E7%BD%91%E8%81%94%E7%9B%9F?fromtitle=w3c&fromid=216888)

+ 广义上讲`WebSocket API`包含于`HTML5`,我们知道html协议是特性集合,它的每一项特性都是独自实现的,它本身只是一个集合概念.

+ websocket最终建立的是tcp连接,它只是通过http进行握手.

+ TCP(socket)管的是第四层协议,websocket是第七层,这意味着websocket做好了分包组包(会话层)和编码解码(表示层)的协议.所以接口会更友好,但也就无法针对特定业务优化这些协议的性能(话又说回来自己做的会话层和表示层未必有现成的性能好,更不要说通用性了).

我们知道websocket是借助http协议进行握手,之后再提升进行连接的,其原理具体是这样:

![websocket原理与http比较](img/websocket.png)

1. 客户端带着型如下面的形式的http头请求http服务器

    ```http
    GET /chat HTTP/1.1
    Host: server.example.com
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
    Sec-WebSocket-Protocol: chat, superchat
    Sec-WebSocket-Version: 13
    Origin: http://example.com
    ```

    + 主要起作用的就是`Upgrade: websocket`和`Connection: Upgrade`,它通知服务端需要使用websocket协议
    + `Sec-WebSocket-Key`是一个浏览器随机生成的Base64 encode的值,通知服务器并验证是不是真的是Websocket服务.
    + `Sec_WebSocket-Protocol`是一个用户定义的字符串,用来区分同URL下不同的服务所需要的协议.
    + `Sec-WebSocket-Version`是告诉服务器所使用的Websocket Draft(协议版本),这个是个历史遗留问题,只是为了解决各家浏览器实现上的不统一,现在直接填13即可.

2. 服务端返回一个型如下面的response通知客户端即将升级为websocket协议

    ```http
    HTTP/1.1 101 Switching Protocols
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
    Sec-WebSocket-Protocol: chat
    ```

    其中
    + `Sec-WebSocket-Accept`是经过服务器加密过后的`Sec-WebSocket-Key`

    ***这步结束后http握手部分即结束***

3. 再上面的握手成功后客户端和服务器会建立TCP连接,后续就可以进行TCP通讯了


需要注意这个lib的接口和Websocket API的并不一致.比如onmessage中的回调函数参数为获取的数据而非一个messageEvent.


## 传递二进制数据

ws即然是一个双工通信协议,那他自然支持流数据的推送.

这主要是靠`send`接口,send支持的数据类型包括
+ `USVString`
    文本字符串.字符串将以`UTF-8`格式添加到缓冲区,并且`bufferedAmount`将加上该字符串以`UTF-8`格式编码时的字节数的值.
+ `ArrayBuffer`

    可以使用一有类型的数组对象发送底层二进制数据;其二进制数据内存将被缓存于缓冲区,`bufferedAmount`将加上所需字节数的值.
+ `Blob`

    Blob类型将队列blob中的原始数据以二进制中传输.`bufferedAmount`将加上原始数据的字节数的值.
+ `ArrayBufferView`

    可以以二进制帧的形式发送任何JavaScript类数组对象;其二进制数据内容将被队列于缓冲区中.值`bufferedAmount`将加上必要字节数的值.

这边的例子[C1](https://github.com/TutorialForJavascript/js-server/tree/master/code/Websocket%E6%8E%A5%E5%8F%A3%E6%9C%8D%E5%8A%A1/C1)以ArrayBuffer为例演示了传递二进制数据的方式,其中主要的注意点是:

+ 客户端需要指明`ws.binaryType = "arraybuffer"`或`ws.binaryType = "blob"`
+ 如果是`arraybuffer`需要在客户端按它的类型转换下`data = new Float32Array(data)`

## 实现广播

另一个常见的应用是广播,即服务端向全体用户发送同样的消息.这个可以借助`ws.clients`来实现,它是一个维护全体客户端连接的set.

这个例子[C2](https://github.com/TutorialForJavascript/js-server/tree/master/code/Websocket%E6%8E%A5%E5%8F%A3%E6%9C%8D%E5%8A%A1/C2)会向全体客户端发送一个`welcome+客户的名字`的消息,这个例子我们会将数据已json的形式传递,已其中的`event`字段来判断触发的事件

+ 服务端
  
    ```js
    import WebSocket from 'ws'

    const wsserver = new WebSocket.Server({
        port: 3000
    })


    wsserver.broadcast = (data) => {
        wsserver.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data)
            }
        })
    }


    wsserver.on('connection', ws => {
        ws.on('message', message => {
            console.log('received: %s', message)
            //----这段以下是判断是否符合格式规范
            let data = null
            try {
                data = JSON.parse(message)
            } catch (error) {
                ws.send('message is not json')
                return
            }

            if (!data || !data.event) {
                ws.send('no event')
                return
            }
            //----这段以上是判断是否符合格式规范
            switch (data.event) {
                case "close":
                    {
                        ws.close()
                    }
                    break
                case "helloworld":
                    {
                        console.log(data.message)
                        wsserver.broadcast(JSON.stringify({
                            event: "helloworld",
                            message: `helloworld ${data.message}`
                        }))
                    }
                    break
                default:
                    {
                        ws.send('unkonwn command')
                    }
            }
        })
    })
    ```

    我们可以为wsserver封装一个方法`broadcast`用于做广播,这个方法只是遍历所有客户端连接,只要状态是`open`我们就向他发送消息.

+ 客户端

```js
const ws = new WebSocket('ws://localhost:3000')
ws.binaryType = "arraybuffer"
ws.on('open', () => {
    ws.send(JSON.stringify({
        event: 'helloworld',
        message: 'hsz'
    }))
})
ws.on('message', (message) => {
    let data = null
    try{
        data = JSON.parse(message)
    }catch(error){
        ws.send('message is not json')
        return
    }
    if (!data || !data.event){
        ws.send('no event')
        return
    }
    switch (data.event) {
        case "close":
            {
                ws.close()
            }
            break
        case "helloworld":
            {
                console.log(data.message)
                assert.equal(data.message, "helloworld hsz")
                ws.close()
            }
            break
        default:
            {
                ws.send('unkonwn command')
            }
    }
})
ws.on('close', () => {
    console.log('disconnected');
})
```

### 广播排除发件人

很多时候广播是由客户端发起希望发给处掉自己外的其他人,那我们就还得再做一些处理

下面的例子[C3](https://github.com/TutorialForJavascript/js-server/tree/master/code/Websocket%E6%8E%A5%E5%8F%A3%E6%9C%8D%E5%8A%A1/C3)展示了如何实现这个功能.

我们在C2的基础上为ws封装一个`publish`方法,它会排除掉自己向其他一个server的用户发送消息.

## 实现推送

很多时候我们需要的不光是请求响应,作为一个双工通信的协议,我们也需要可以向客户端推送数据.

[C4](https://github.com/TutorialForJavascript/js-server/tree/master/code/Websocket%E6%8E%A5%E5%8F%A3%E6%9C%8D%E5%8A%A1/C4)是一个简单的推送任务,它会每隔10s向全体广播一次当前时间.

这个例子使用了`setInterval`做周期性的推动,当然了更常见的是监听一个redis或者其他中间件,如果有消息传过来就推送.这个可以留着自己研究下.

## 路径

我们常见的websocket连接通常不会是一个光秃秃host,而是会根据http路径区分功能.这个当然可以[通过nginx来解决](http://blog.hszofficial.site/recommend/2019/03/20/%E7%8E%A9%E8%BD%ACNginx/),但如果我们希望直接一个服务解决那该如何操作呢?

我们就需要结合http服务模块来做了.例子[C5](https://github.com/TutorialForJavascript/js-server/tree/master/code/Websocket%E6%8E%A5%E5%8F%A3%E6%9C%8D%E5%8A%A1/C5)

+ 服务端

```js
import WebSocket from 'ws'
import http from 'http'
import url from 'url'

const server = http.createServer()
const wss1 = new WebSocket.Server({
    noServer: true
})
const wss2 = new WebSocket.Server({
    noServer: true
})

wss1.on('connection', ws => {
    ws.on('message', message => {
        console.log('received: %s', message)
        switch (message) {
            case "close":
                {
                    ws.close()
                }
                break
            case "helloworld":
                {
                    ws.send('Hello World')
                }
                break
            default:
                {
                    ws.send('unkonwn command')
                }
        }
    })
})

wss2.on('connection', ws => {
    ws.on('message', message => {
        console.log('received: %s', message)
        switch (message) {
            case "close":
                {
                    ws.close()
                }
                break
            case "helloworld":
                {
                    ws.send('Hello World')
                }
                break
            default:
                {
                    ws.send('unkonwn command')
                }
        }
    })
})

server.on('upgrade', (request, socket, head) => {
    const pathname = url.parse(request.url).pathname
    console.log(pathname)
    if (pathname === '/room1') {
        wss1.handleUpgrade(request, socket, head, ws =>{
            wss1.emit('connection', ws, request)
            console.log("emit room1")
        })
    } else if (pathname === '/room2') {
        wss2.handleUpgrade(request, socket, head, ws => {
            wss2.emit('connection', ws, request)
            console.log("emit room2")
        })
    } else {
        socket.destroy()
        console.log("destory socket")
    }
});
server.listen(3000)
```

## 用户管理

用户管理有两种思路

+ 一种是借助http服务器动态的创建wsserver,比如channel,一个channel就是一个单位,在其中只有广播.这种方式好处是简单,不需要了解细颗粒度的信息.
+ 一种是使用`中介模式`,通过一张map来映射用户和用户的socket,在用户首次登陆时需要附带用户的辨识信息.当用户退出时这张map也要删除对应的用户socket.这样用户就可以指定单独的某个用户来实现互发消息了,同时广播也可以指定用户.

### 借助http服务器动态的创建wsserver

例子[C6](https://github.com/TutorialForJavascript/js-server/tree/master/code/Websocket%E6%8E%A5%E5%8F%A3%E6%9C%8D%E5%8A%A1/C6)演示了如何创建动态的wsserver.

为了保持回调函数不要太长,我们可以将回调函数定义在外面,然后通过闭包在每个wss和ws中绑定.

```js
const onMessage = wws => ws => message => {
    console.log('received: %s', message)
    ...
}

...

wss = new WebSocket.Server({
                    noServer: true
                })
wss.cid = channel_id
wss.on('connection', ws => {
    ws.publish = message => {
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message)
                console.log(`send message ${message}`)
            }else{
                console.log(`client status ${client.readyState}`)
            }
        })
    }
    ws.on('message', onMessage(wss)(ws))
})
```

我们创建了一个全局的Map--CHANNELS用于管理维护所有的频道,并使用一个定时任务每5分钟清理一次没有客户连接的频道

### 使用`中介模式`

使用中介模式我们一样是用一个Map集合client,这样要使用时只要用client的名字来查找即可.

[C7](https://github.com/TutorialForJavascript/js-server/tree/master/code/Websocket%E6%8E%A5%E5%8F%A3%E6%9C%8D%E5%8A%A1/C7)是一个简易的聊天室应用.我们可以通过`event:client_list`获取当前有哪些用户,然后根据这个指定用户去通过``event:talk_with`来发送消息.

这个例子需要有一套用户系统,这边做了相当的简化.

1. 只有用户名
2. 验证的token只是token的base64转码
3. 用户完全没有服务端的保存,只是做个用户名的去重而已

在服务端使用一个Map的常量`CLIENTS`来管理所有的用户名,ws对,在验证用户和用户退出时会对这个map做增删.

这个例子的流程是:

1. 建立连接后客户端向服务端发起验证请求
2. 服务端处理验证请求后创建一个token发回给客户端
3. 客户端收到token后发起查询用户列表的操作,服务端将当前的用户名列表发送回去给客户端
4. 客户端收到用户列表后发起talk事件,代上消息给服务端,客户端发送talk事件的消息会根据用户列表的长度来判断,如果长度>3,那么使用一个随机数判断要通过字段`with_cilents`发给第一个人还是第二个人,否则就不带字段`with_cilents`
5. 服务端收到talk事件后如果没有字段`with_cilents`则发起广播,否则查找`with_cilents`列表中的用户发送

+ 客户端

    ```js
    import faker from 'faker'
    import WebSocket from 'ws'


    const ws = new WebSocket('ws://localhost:3000/channel?id=1')
    const self = faker.fake("{{name.lastName}}")

    let token = null

    console.log(`I'm ${self}`)

    ws.on('open', () => {
        ws.send(JSON.stringify({
            event: 'auth',
            message: 'auth',
            user: self
        }))

    })
    ws.on('message', (message) => {
        let data = null
        try {
            data = JSON.parse(message)
        } catch (error) {
            ws.send(JSON.stringify({
                event: "error",
                message: 'message is not json'
            }))
            return
        }
        if (!data || !data.event) {
            ws.send(JSON.stringify({
                event: "error",
                message: 'no event'
            }))
            return
        }
        switch (data.event) {
            case "close":
                {
                    ws.close()
                }
                break
            case "user_list":
                {
                    if (data.message.length > 2) {
                        console.log("get user list:")
                        console.log(data.message)
                        let chosen = data.message[Math.random() >= 0.5 ? 1 : 2]
                        console.log(`chosen ${chosen}`)
                        ws.send(JSON.stringify({
                            event: "talk_with",
                            auth: token,
                            with_cilents: [chosen],
                            message: `hello ${chosen},I'm ${self}`
                        }))
                        console.log(`send message to ${chosen}`)
                    } else {
                        ws.send(JSON.stringify({
                            event: "talk_with",
                            auth: token,
                            message: `hello all,I'm ${self}`
                        }))
                    }
                }
                break
            case "message":
                {
                    console.log(`get message: ${data.message}`)
                }
                break
            case "error":
                {
                    console.log(`error:${data.message}`)
                }
                break
            case "token":
                {
                    token = data.message
                    ws.send(JSON.stringify({
                        event: "user_list",
                        auth: token
                    }))
                }
                break
            default:
                {
                    ws.send(JSON.stringify({
                        event: "error",
                        message: 'unkonwn command'
                    }))
                }
        }

    })
    ws.on('close', () => {
        console.log('disconnected');
    })
    ```

+ 服务端

    ```js
    import WebSocket from 'ws'

    const wss = new WebSocket.Server({
        port: 3000
    })
    let CLIENTS = new Map()
    const onClose = wws => ws => () => {
        if (CLIENTS.has(ws.user)) {
            CLIENTS.delete(ws.user)
        }

    }
    const btoa = message=>Buffer.from(message).toString('base64')
    const atob=message=>Buffer.from(message, 'base64').toString()

    const onMessage = wws => ws => message => {
        console.log('received: %s', message)
        let data = null
        try {
            data = JSON.parse(message)
        } catch (error) {
            ws.send(JSON.stringify({
                event: "error",
                message: 'message is not json'
            }))
            return
        }

        if (!data || !data.event) {
            ws.send(JSON.stringify({
                event: "error",
                message: 'no event'
            }))
            return
        }
        switch (data.event) {
            case "close":
                {
                    ws.close()
                    if (CLIENTS.has(ws.user)) {
                        CLIENTS.delete(ws.user)
                    }
                }
                break

            case "auth":
                {
                    if (!data.user) {
                        ws.send(JSON.stringify({
                            event: "error",
                            message: 'auth error,no user'
                        }))
                        ws.close()
                    } else {
                        if (CLIENTS.has(data.user)){
                            ws.send(JSON.stringify({
                                event: "error",
                                message: 'auth error,user name already exist'
                            }))
                            ws.close()
                        }else{
                            ws.user = data.user
                            CLIENTS.set(data.user, ws)
                            ws.send(JSON.stringify({
                                event: "token",
                                message: btoa(data.user)
                            }))
                        }
                    }
                }
                break

            case "error":
                {
                    console.log(`error:${data.message}`)
                }
                break
            case "user_list":
                {
                    if (!data.auth){
                        ws.send(JSON.stringify({
                            event: "error",
                            message: 'auth error,no token'
                        }))
                        ws.close()
                    }else{
                        if (!CLIENTS.has(atob(data.auth))){
                            ws.send(JSON.stringify({
                                event: "error",
                                message: 'auth error,already closed'
                            }))
                            ws.close()
                        } else{
                            ws.send(JSON.stringify({
                                event: "user_list",
                                message: Array.from(CLIENTS.keys())
                            }))
                        }
                    }
                }
                break
            case "talk_with":
                {
                    if (!data.auth){
                        ws.send(JSON.stringify({
                            event: "error",
                            message: 'auth error,no token'
                        }))
                        ws.close()
                    } else{
                        if (!CLIENTS.has(atob(data.auth))){
                            ws.send(JSON.stringify({
                                event: "error",
                                message: 'auth error,already closed'
                            }))
                            ws.close()
                        } else{
                            if (!data.with_cilents) {
                                ws.publish(data.message)
                            } else {
                                ws.talk_with(data.with_cilents, data.message)
                            }
                        }
                    }
                }
                break
            default:
                {
                    ws.send(JSON.stringify({
                        event: "error",
                        message: 'unkonwn command'
                    }))
                }
        }
    }
    wss.on('connection', ws => {
        ws.talk_with = (with_cilents, message) => {
            with_cilents.forEach(client => {
                if (CLIENTS.has(client) && CLIENTS.get(client).readyState === WebSocket.OPEN) {
                    CLIENTS.get(client).send(JSON.stringify({
                        event: "message",
                        message: message
                    }))
                    console.log(`user ${ws.user} send message ${message}`)
                } else {
                    console.log(`client status ${client.readyState}`)
                    ws.send(JSON.stringify({
                        event: "error",
                        message: `user ${ws.user} send to ${client} error`
                    }))
                }
            })
        }
        ws.publish = message => {
            wss.clients.forEach(client => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                        event: "message",
                        message: message
                    }))
                    console.log(`user ${ws.user} send message ${message}`)
                } else {
                    console.log(`client status ${client.readyState}`)
                }
            })
        }
        ws.on('message', onMessage(wss)(ws))
        ws.on("close", onClose(wss)(ws))
    })
    ```

当然了这两种管理用户的方式也是正交的,我们完全可以结合使用.如何结合有兴趣的可以自己尝试.