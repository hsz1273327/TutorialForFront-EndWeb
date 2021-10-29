# EventSource

[EventSource](https://developer.mozilla.org/zh-CN/docs/Server-sent_events/Using_server-sent_events)是html5中新增的一个实用技术,它的主旨是让服务端拥有推送能力,从而弥补单纯http接口服务在实时性上的短板.

我们的http接口服务只有`req/resp`模式,而`EventSource`相当于在其上打了一个支持`push/pull`模式的补丁.这个技术非常适合如下场景:

+ 有基于http接口的项目,需要有推送服务,但全部迁移至websocket需要时间缓冲
+ 只需要消息推送,不需要双工通信

其优点主要是:

+ 使用HTTP协议
+ 轻量级,使用简单
+ 默认支持断线重连
+ 发送纯文本消息,完美支持json数据格式

当然它也有缺点:

当不通过`HTTP 2`使用时SSE会受到最大连接数的限制,这在打开各种选项卡时特别麻烦.因为该限制是针对每个浏览器的并且被设置为一个非常低的数字(6).该问题在`Chrome`和`Firefox`中被标记为"无法解决".此限制是针对每个浏览器+域的,因此这意味着您可以跨所有选项卡打开6个SSE连接到`www.example1.com`并打开6个SSE连接到`www.example2.com`.使用HTTP 2时HTTP同一时间内的最大连接数由服务器和客户端之间协商(默认为100).

通常我个人的使用习惯是一个前端应用只开一个sse连接专门收消息,而收消息的内容范围则根据用户的权限在后台控制.

## 实现原理

HTTP协议无法做到服务器主动推送信息,但有一种变通方法:

1. 客户端向服务端发起一个请求,申明好需要返回的是一个流.
2. 服务器向客户端发送流数据,并声明发送的是流信息而且流还没结束.这时客户端也就不会关闭连接.
3. 服务端的流发送完了,就会发送一个消息在流的末尾,客户端收到也就断开连接了.

本质上来讲这种通信就是以流信息的方式完成一次用时很长的下载.可以看出EventSource需要服务端支持流数据作为响应,而且一旦建立起这个连接这个连接是无法复用的.

服务端处理SSE的消息也是相当简单,就和处理`GET`请求一样,只是它的header中需要定义`content-type`为`text/event-stream`

而在数据序列化方面,sse则是一个非常简单的协议:

1. 使用量个换行符表示一条消息的终止
2. 消息中一行表示一行数据,消息中每行都必须有标头,标头可以是
    1. `:`表示这行是注释
    2. `event:`表示这行定义消息的事件类型,如果指定了该字段,则在客户端接收到该条消息时会在当前的EventSource对象上触发一个事件,事件类型就是该字段的字段值,你可以使用`addEventListener()`方法在当前`EventSource`对象上监听任意类型的命名事件.如果该条消息没有event字段,则会触发`onmessage`属性上的事件处理函数.
    3. `data:`表示这行定义消息数据,如果该条消息包含多个data字段,则客户端会用换行符把它们连接成一个字符串来作为字段值.`data:`是消息必须带的字段,其他都可以有可以没有
    4. `id:`表示这行标明事件ID.会成为当前EventSource对象的内部属性"last event ID string"的属性值.在重连时它会被放在请求头的`Last-Event-ID`上传给服务端.通常如果你希望重连后不不丢失消息就需要设置这个,而且也必须确保后端服务能提供这个能力
    5. `retry:`指定一个**整数**作为重连的时间(单位为毫秒)

也就是说一个sse的消息流大致长这样

```txt
event: userconnect
data: {"username": "bobby", "time": "02:33:48"}

data: Here's a system message of some kind that will get used
data: to accomplish some task.

event: usermessage
data: {"username": "bobby", "time": "02:34:11", "text": "Hi everyone."}
```

## 浏览器支持程度

目前除了微软家两个浏览器不支持外其他的应该是都支持的,我们可以使用`window.EventSource ? true:false`来验证当前的浏览器支不支持.

## 使用方法

`EventSource`对象的构造函数有两个参数

+ `url`,要访问的url
+ `options`,配置参数,这个参数必须是一个对象,其中只可以有字段`withCredentials`,它的值是布尔值,用于设置跨域请求.
    一旦设置为`true`,它就可以进行跨域了.但很遗憾跨域的`Access-Control-Allow-Origin`不能是`*`,必须指明要跨的hostname.并且需要设置`Access-Control-Allow-Credentials`为`true`

`EventSource`实例有`readyState`属性可以查看当前连接的状态,这些状态包括:

+ CONNECTING (0)
+ OPEN (1)
+ CLOSED (2)

要在客户端断开连接可以使用实例方法`close()`,而获取流数据必须使用事件监听,可以监听的事件有:

+ `onerror`,当报错时触发
+ `onmessage`,当有消息推送来时触发
+ `onopen`,当连接建立成功时触发

我们的`onmessage`注册的回调函数以及`addEventListener()`的回调函获得的参数为`MessageEvent`,它有如下字段:

+ `data` 消息数据
+ `origin`发送者的源头
+ `lastEventId`消息id
+ `source` 可以是Window对象的代理Proxy,web worker的MessagePort或者ServiceWorker对象
+ `port`正在通过其发送消息的通道相关联的端口

## 例子--一个推送时间的服务

这个例子在[浏览器环境-浏览器与通信-sse分支](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%8E%AF%E5%A2%83-%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%8E%E9%80%9A%E4%BF%A1-sse),我们用koa来构建服务端.
这个服务端会每隔1s发送一个当前时间给页面,我们将其写入页面,我们定义`/stream`为获取流数据的接口,那么在前端我们可以这样定义:

```js
function main() {
    let url = 'http://localhost:5000/stream'

    let evtSource = new EventSource(url);
    evtSource.onmessage = function (e) {
        console.log('onmsg: ' + e.data);
        document.querySelector("#local_time").textContent = e.data
    }
    evtSource.onerror = function (e) {
        console.log('error', e);
        evtSource.close();
    }
}
main()
```

当收到消息后我们就会将id为`local_time`的p标签中的内容用收到的内容填充.
