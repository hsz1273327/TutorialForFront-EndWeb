# WebRTC

[WebRTC](https://webrtc.org/)是一项革命性的技术.其[api](http://w3c.github.io/webrtc-pc/))可以点击查阅.

webRTC除了控制摄像头麦克风,更关键的特性是支持p2p通信.

## 几个概念

+ `SDP`一种会话描述格式
+ `iceServers(Interactive Connectivity Establishment Servers)`交互式连接建立服务器
+ `DTLS(Datagram Transport Layer Security)`数据包传输层安全性协议
+ `SCTP(Stream Control Transmission Protocol)`流控制传输协议
+ `RTP(Real TimeProtocol)`实时协议
+ `RTCP(Real-time ControlProtocol)`实时传输控制协议
+ `SRTP(SecureReal-time Transport Protocol)`安全实时传输协议
+ `STUN(Simple Traversal of UDP Through NATs)`用UDP穿透NAT的服务
+ `TURN(Traversal Using Relays around NAT)`使用中继穿透NAT--STUN的中继扩展,自己可以使用[这个镜像](https://hub.docker.com/r/instrumentisto/coturn)来部署

更多的p2p相关技术可以看[这篇文章](https://www.cnblogs.com/mlgjb/p/8243690.html)

## 建立连接的过程

类`RTCPeerConnection`用于处理p2p连接,其使用方法是:

```js
let connection = new RTCPeerConnection([configuration])
```

我们可以创建的时候加入设置,也可以创建后用`.setConfiguration(restartConfig)`方法来设置这个连接.

比较重要的是`iceServers`这个参数,它用于穿过防火墙

```js
{
    'iceServers': [{'url': 'stun:23.21.150.121'}]
}

{
    'optional': [{'DtlsSrtpKeyAgreement': true}]
}
```

通常我们需要借助`stun(Session Traversal Utilities for NAT)`服务来帮助我们实现NAT穿越.

国内可用的免费stun有:

```
stun:stun1.l.google.com:19302
stun:stun2.l.google.com:19302
stun:stun3.l.google.com:19302
stun:stun4.l.google.com:19302
stun:23.21.150.121
stun:stun01.sipphone.com
stun:stun.ekiga.net
stun:stun.fwdnet.net
stun:stun.ideasip.com
stun:stun.iptel.org
stun:stun.rixtelecom.se
stun:stun.schlund.de
stun:stunserver.org
stun:stun.softjoys.com
stun:stun.voiparound.com
stun:stun.voipbuster.com
stun:stun.voipstunt.com
stun:stun.voxgratia.org
stun:stun.xten.com
```

完成这个配置之后就是为通道创建端点连接了.一根管道当然是有两个端点,所以肯定会要有两个`RTCPeerConnection`的实例,本机一端叫`localConnection`,另一机一端叫`remoteConnection`

连接实例可以有事件绑定

事件句柄|说明
---|---
`onaddstream`|连接上添加了流
`onconnectionstatechange`|连接状态改变
`ondatachannel`|当`RTCDataChannel`由调用`createDataChannel()`的远程对等体添加到连接时会发送类型为`RTCDataChannelEvent`的此事件.
`onicecandidate`|每当本地`ICE`代理需要通过信令服务器将消息递送到另一对等体时发生
`oniceconnectionstatechange`|当由`iceConnectionState`属性表示的连接的`ICE`代理的状态发生变化时会发生这种情况
`onicegatheringstatechange`|当`ICE`收集状态(即`ICE`代理是否主动收集候选项)时发生这种情况
`onidentityresult`|当生成身份断言时,通过`getIdentityAssertion()`或在提供或回答的创建期间发送此类事件
`onidpassertionerror`|当相关联的身份提供商(IdP)在生成身份断言时遇到错误时,发送这样的事件.
`onidpvalidationerror`|当相关联的身份提供商(IdP)在验证身份断言时遇到错误时,发送这样的事件.
`onnegotiationneeded`|当发生需要进行会话协商的更改时,会触发此事件.
`onpeeridentity`|当从对等体接收到的身份断言已经被成功验证时,发送这样的事件.
`onremovestream`|当从此连接中删除`MediaStream`时,将发送此类事件.
`onsignalingstatechange`|当`RTCPeerConnection.signalingState`的值更改时,作为调用`setLocalDescription()`或`setRemoteDescription()`的结果将发送此事件.
`ontrack`|当创建了新的传入`MediaStreamTrack`并与已在连接时添加到该组接收器的`RTCRtpReceiver`对象相关联时会发送此事件


我们要让两端可以通信,除了要建立连接,还要在同一个频道,RTCPeerConnection的实例的`.createDataChannel(channelname[,option])`方法就是用来创建频道,一般都是在本机端创建频道,频道可以有

`.onopen`和`.onclose`两个事件绑定

而另一机那端则是并不需要,但一般要设置`ondatachannel`来确认通道建立成功.



接着我们需要两个端点都有有`icecandidate`,就用刚才的事件绑定`onicecandidate`:

```js
localConnection.onicecandidate = e => !e.candidate
    || remoteConnection.addIceCandidate(e.candidate)
    .catch(handleAddCandidateError)
```

另一端也是一样,`IceCandidate`需要两边都有.

有了连接,有了通道,还要为两端找到标识,这样才能两边建立连通的连接.`RTCSessionDescription`就是这个标识.

`localConnection.createOffer()`可以产生一个`offer`,也就是一个包含元数据信息的`RTCSessionDescription`的`promise`,接着我们可以拿这个offer来设置为本机的`SessionDescription`

```js
localConnection.setLocalDescription(offer)
```

所谓`SessionDescription`就是一组对连接的唯一表示元数据,包括`RTCSessionDescription.type`和`RTCSessionDescription.sdp`两部分,可以用`.toJSON()`方法获得json格式序列化后的数据.

每个端点都必须要知道自己的唯一标识和对面的唯一标识,我们本地的连接有了自己的唯一标识,但还不知道对面的唯一标识,这时候就需要一个服务器来传递这个标识到另一端,而另一端则要先用`.setRemoteDescription(offer)`记录自己对面的标识,之后使用`remoteConnection.createAnswer()`来创建回应的`RTCSessionDescription`,并将之设置为自己的标识`.setLocalDescription(answer)`,然后再把这个answer传回给之前的端点连接

这个用来转发标识的服务器就是所谓的发信服务器了.事实上发信服务器只是一个简单的消息传递,数据传递是p2p的.发信服务器没有限制,只要能发能收就可以了我们完全可以用websocket来实现.当然了,实际上只要能交换就行,因此不通过服务器,而是通过其他比如im呀,邮件呀,人肉呀的方法也是完全可以的.

这样就可以用浏览器实现直播,视频通话之类的功能,这样一些原本只能通过客户端实现的功能了

![webrtc的传输结构](img/webrtc.png)


总结下webrtc的连接建立顺序:

1. 创建端点`RTCPeerConnection`
2. 创建`channel`,这时我们设置的ice服务器就可以触发让我们获得`IceCandidate`的事件
3. 两端通过发信服务器相互交换`IceCandidate`并互设彼此为`IceCandidate`,用`addIceCandidate()`方法
4. 创建offer获取本机`RTCSessionDescription`,并设置为本机的`LocalDescription`,之后通过发信服务器发送给对面
5. 对面接收到本机offer后将之设为`RemoteDescription`,然后在创建`answer`,并设为`LocalDescription`,之后再将`answer`通过发信服务器发送回本机
6. 或得到`answer`后将之设置为本机的`RemoteDescription`


### 通过发信服务器建立连接

本例在[C3-S4](https://github.com/TutorialForJavascript/frontend-basic/tree/master/code/C3/S4)


我们可以用websocket来建立发信服务器.一个发信服务器应该有如下几个接口:

+ `offer`:用来将`offer`传出
+ `answer`: 用来将`answer`传回
+ `candidate`:用来交换`candidate`

而这个业务流程应该是:


1. 用户A通过接口candidate发现用户B在线
2. 用户A通过发信服务向其发送一个offer
3. 用户B收到offer后确认通过发信服务发回answer给用户A

### 消息传递

这个部分对应文件夹`message`中的内容.

消息传递只需要使用DataChannel的send方法即可.

+ index.js

```js
const WSURL = 'ws://localhost:4500'
const CONNECT_CFG = {
    'iceServers': [{
        'url': 'stun:23.21.150.121'
    }],
    'optional': [{
        'DtlsSrtpKeyAgreement': true
    }]
}

let storage = localStorage

class WebrtcApplication {
    constructor(wsurl = WSURL, connectcfg = CONNECT_CFG) {
        this.wsurl = wsurl
        this.connectcfg = connectcfg
        this.socket = null
        this.connection = null
        this.channel = null
        this.socketStatus = document.getElementById('ws-status')
        this.roomInfoList = document.getElementById('room-info')
        this.roomForm = document.getElementById('room-form')
        this.usernameField = document.getElementById('username')
        this.roomField = document.getElementById('room')
        this.createRoomBtn = document.getElementById('create_room')
        this.leaveRoomBtn = document.getElementById('leave_room')
        this.messagesList = document.getElementById('messages')
        this.messagesSubmit = document.getElementById('submit')
        this.messageField = document.getElementById('message')
        this.statueMsg = document.getElementById("channel-status")
        this.leaveChannelBtn = document.getElementById('leave_channel')

        this.connection_init()
        this.socket_init()
        this.bind_event()
    }
    socketOnError(error) {
        console.log('WebSocket Error: ' + error.message)
    }
    socketOnConnect() {
        this.socketStatus.innerHTML = `Connected to: ${this.wsurl}`
        this.socketStatus.className = 'open'
    }
    socketOnDisconnect() {
        this.socketStatus.innerHTML = 'Disconnected from WebSocket.'
        this.socketStatus.className = 'closed'
    }
    socketOnAnswer(data) {
        console.log(`answer: ${data}`)
        let message = data.sdp
        let remote_session_desc = new RTCSessionDescription(data)
        this.connection.setRemoteDescription(remote_session_desc)
        console.log(this.connection.remoteDescription)
        this.roomInfoList.innerHTML += `<li class="answer"><span>Remote:</span>${message}</li>`
        console.log(`now con ${this.connection.iceConnectionState}`)
    }
    async socketOnOffer(data) {
        console.log(`offer ${data}`)
        let message = data.sdp
        this.roomInfoList.innerHTML += `<li class="info"><span>Remote:</span>${message}</li>`
        let remote_session_desc = new RTCSessionDescription(data)
        await this.connection.setRemoteDescription(remote_session_desc)
        let answer = await this.connection.createAnswer()
        console.log(`answer:${answer}`)
        this.roomInfoList.innerHTML += `<li class="info"><span>Local:</span>${answer.sdp}</li>`
        this.connection.setLocalDescription(answer)
        let sendinfo = {
            "room": storage.getItem("room"),
            "answer": answer
        }
        this.socket.emit("answer", sendinfo, (data) => console.log(data))
        console.log("now con")
    }
    socketOnMessage(data) {
        this.roomInfoList.innerHTML += `<li class="info"><span>message:</span>${data}</li>`
    }
    socketOnCandidate(data) {
        console.log(data)
        this.connection.addIceCandidate(data)
        this.roomInfoList.innerHTML += `<li class="info"><span>candidate:</span>${data.candidate}added</li>`
    }
    socket_init() {
        console.log("socket_init")
        this.socket = io(this.wsurl)
        this.socket.on("error", (error) => (error) => this.socketOnError(error))
        this.socket.on("connect", () => this.socketOnConnect())
        this.socket.on("disconnect", () => this.socketOnDisconnect())
        this.socket.on("answer", (data) => this.socketOnAnswer(data))
        this.socket.on("offer", (data) => this.socketOnOffer(data))
        this.socket.on("message", (data) => this.socketOnMessage(data))
        this.socket.on("candidate", (data) => this.socketOnCandidate(data))
    }
    channelOnMessage(event) {
        this.messagesList.innerHTML += `<li class="info"><span>Remote message:</span>${event.data}</li>`
    }
    channelOnStateChange(event) {
        let state = (this.channel.readyState == "open") ? 'online' : "offline"
        this.statueMsg.innerHTML = state
        this.statueMsg.className = state
    }
    connOnDataChannel(event) {
        this.channel = event.channel
        this.channel.onmessage = (event) => this.channelOnMessage(event)
        this.channel.onopen = (event) => this.channelOnStateChange(event)
        this.channel.onclose = (event) => this.channelOnStateChange(event)
    }
    connOnIceConnectionStateChange(event) {
        console.log("oniceconnectionstatechange")
        console.log(this.connection.iceConnectionState)
    }
    connOnIceGatheringStateChange(event) {
        console.log("onicegatheringstatechange")
        console.log(this.connection.iceGatheringState)
    }
    connOnIceCandidate(event) {
        console.log("onicecandidate")
        console.log(event)
        console.log(event.candidate)
        if (event.candidate) {
            let data = {
                "type": 'iceCandidate',
                "room": storage.getItem("room"),
                "payload": event.candidate
            }
            let callback = (data) => {
                console.log(data)
                console.log(this.connection)
            }
            this.socket.emit("candidate", data, (data) => callback(data))
        }
    }
    connection_init() {
        console.log("connection_init")
        if (!(("webkitRTCPeerConnection" in window) || ("RTCPeerConnection" in window))) {
            alert("RTCPeerConnection not supported")
            throw "RTCPeerConnection not supported"
        } else {
            this.connection = new RTCPeerConnection(this.connectcfg)
            console.log("webkitRTCPeerConnection")
            this.connection.ondatachannel = (event) => this.connOnDataChannel(event)
            //connection.setConfiguration(connectcfg)
            this.connection.onsignalingstatechange = state => console.info('signaling state change:', state)
            this.connection.oniceconnectionstatechange = (event) => this.connOnIceConnectionStateChange(event)
            this.connection.onicegatheringstatechange = (event) => this.connOnIceGatheringStateChange(event)
            this.connection.onicecandidate = (event) => this.connOnIceCandidate(event)
        }
    }
    bind_event() {
        this.roomForm.onsubmit = (e) => this.roomForm_onsubmit(e)
        this.createRoomBtn.onclick = (e) => this.createRoomBtn_onclick(e)
        this.leaveRoomBtn.onclick = (e) => this.leaveRoomBtn_onclick(e)
        this.messagesSubmit.onclick = (e) => this.messagesSubmit_onclick(e)
        this.leaveChannelBtn.onclick = (e) => this.leaveChannelBtn_onclick(e)
    }
    roomForm_onsubmit(e) {
        e.preventDefault()
        let info = {
            "username": this.usernameField.value,
            'room': this.roomField.value
        }
        this.socket.emit("join",
            info,
            function (data) {
                console.log(data)
                storage.setItem("username", info["username"])
                storage.setItem("room", info["room"])
                console.log("local info saved")
            })
        this.usernameField.value = ''
        this.roomField.value = ''
        return false
    }
    async createRoomBtn_onclick(e) {
        e.preventDefault()
        this.channel = this.connection.createDataChannel('test', {
            reliable: true
        })
        console.log(this.channel)
        this.channel.onopen = (e) => this.channelOnStateChange(e)
        this.channel.onclose = (e) => this.channelOnStateChange(e)
        this.channel.onmessage = (e) => this.channelOnMessage(e)

        let offer = await this.connection.createOffer()
        console.log(`offer:${offer.toJSON()}`)
        this.connection.setLocalDescription(offer)
        let sendinfo = {
            "room": storage.getItem("room"),
            "offer": offer
        }
        this.roomInfoList.innerHTML += `<li class="info"><span>Local:</span>${offer.sdp}</li>`
        this.socket.emit("offer", sendinfo, (data) => console.log(data))
    }
    leaveRoomBtn_onclick(e) {
        e.preventDefault()
        let sendinfo = {
            "username": this.usernameField.value,
            'room': this.roomField.value
        }
        this.socket.emit("leave", sendinfo, (data) => console.log(data))
        this.socket.close()
    }
    messagesSubmit_onclick(e) {
        console.log("send message")
        e.preventDefault()
        let message = this.messageField.value
        this.messageField.value = ''
        this.channel.send(message)
        this.messagesList.innerHTML += `<li class="info"><span>Local message:</span>${message}</li>`
    }
    leaveChannelBtn_onclick(e) {
        console.log("leave channel")
        e.preventDefault()
        this.channel.close()
    }
}

window.onload = () => {
    new WebrtcApplication()
}
```

### 文件传递

这个例子对应文件夹`file`中的内容.是传递文件,文件已经有了html5支持,要传输我们只要设置channel的`binaryType = 'arraybuffer'`即可,之后只要把用`reader.readAsArrayBuffer(f)`读出的数据直接发送过去就行了,为了显示,我先将文件信息传了过去,这样就好显示了.

```js
...
fileOnLoad(file, offset) {
    return (e)=>{
        let result = e.target.result
        this.channel.send(result)
        if (file.size > offset + e.target.result.byteLength) {
            window.setTimeout(sliceFile, 0, offset + chunkSize)
        }
        this.sendProgress.value = offset + e.target.result.byteLength
    }
}
sliceFile(file, offset) {
    let reader = new FileReader();
    reader.onload = this.fileOnLoad(file, offset)
    let slice = file.slice(offset, offset + chunkSize);
    reader.readAsArrayBuffer(slice)
}
...
channelOnMessage(event) {
    try {
        let info = JSON.parse(event.data)
        console.log(event)
        switch (info.type) {
            case "info":
                {
                    this.filename = info.name
                    this.filesize = info.size
                    this.timestampStart = info.starttime
                    this.receiveProgress.max = this.filesize
                    this.messagesList.innerHTML += '<li class="info"><span>Remote message:</span>' +
                    "reciving :" + info.name + '</li>'
                    this.channel.send(JSON.stringify({
                        "type": "return",
                        "result": "ok"
                    }))
                }
                break
            case "return":
                {
                    this.sliceFile(this.file, 0)
                }
        }
    } catch (error) {
        console.log(error)
        this.receiveBuffer.push(event.data)
        this.receivedSize += event.data.byteLength
        console.log("receivedSize")
        console.log(this.receivedSize)
        this.receiveProgress.value = this.receivedSize ? this.receivedSize : 0

        // we are assuming that our signaling protocol told
        // about the expected file size (and name, hash, etc).
        if (this.receivedSize === this.receiveProgress.max) {
            let received = new window.Blob(this.receiveBuffer);
            this.receiveBuffer = []

            this.downloadAnchor.href = URL.createObjectURL(received)
            this.downloadAnchor.download = this.filename
            this.downloadAnchor.textContent =
                'Click to download \'' + this.filename + '\' (' + this.filesize + ' bytes)';
            this.downloadAnchor.style.display = 'block';

            let bitrate = Math.round(this.receivedSize * 8 /
                ((new Date()).getTime() - this.timestampStart));
            this.bitrateDiv.innerHTML = '<strong>Average Bitrate:</strong> ' +
                bitrate + ' kbits/sec (max: ' + this.bitrateMax + ' kbits/sec)';

        }
    }
}
...
async createRoomBtn_onclick(e) {
        e.preventDefault()
        this.channel = this.connection.createDataChannel('test', {
            reliable: true
        })
        this.channel.binaryType = 'arraybuffer'//文件使用arraybuffer
       ...
    }
...
messagesSubmit_onclick(e) {
        console.log("send message")
        e.preventDefault()
        this.file = this.fileField.files[0]
        console.log(this.file)
        if (this.file.size) {
            this.sendProgress.max = this.file.size
            this.channel.send(JSON.stringify({
                "type": "info",
                "size": this.file.size,
                "name": this.file.name,
                "starttime": (new Date()).getTime()
            }))
        } else {
            this.messagesList.innerHTML += '<li class="info"><span>Local message:</span>' +
                "File is empty, please select a non-empty file" + '</li>'
            this.messagesList.textContent = 'File is empty, please select a non-empty file'
            return;
        }
    }
```

后续还可以加入md5检验,有兴趣的可以自己实现

### 多媒体传递

如果是视屏通讯的话,我们甚至不用借助channel的send方法,只要在各端使用`addStream`添加流,并且各端监听`onaddstream`事件即可.

我们在页面加载后就将流读取到本地video标签.当建立连接后本地的流会推送到远端

```js
...
///新增
connection_onaddstream(event) {
    console.log("onaddstream")
    this.remoteVideo.srcObject = event.stream
}
...
connection_init() {
        ...
        this.connection.onicecandidate = (event) => this.connOnIceCandidate(event)
        /// 新增事件句柄
        this.connection.onaddstream = (event) => this.connection_onaddstream(event)
    }
}
...
///新增
async addStream() {
    let stream = await navigator.mediaDevices.getUserMedia({
        video: true
    })
    this.connection.addStream(stream)
    this.localVideo.srcObject = stream
}
...
```
