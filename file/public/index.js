'use strict'

const WSURL = 'ws://localhost:4500'
const CONNECT_CFG = {
    'iceServers': [ {
        'url': 'stun:23.21.150.121'
    } ],
    'optional': [ {
        'DtlsSrtpKeyAgreement': true
    } ]
}
const chunkSize = 16384

let storage = localStorage

class WebrtcApplication {
    constructor (wsurl = WSURL, connectcfg = CONNECT_CFG) {
        this.wsurl = wsurl
        this.connectcfg = connectcfg

        this.filename = ''
        this.filesize = 0

        this.receiveBuffer = []
        this.receivedSize = 0
        this.bytesPrev = 0
        this.bitrateMax = 0
        this.timestampPrev = 0
        this.timestampStart = null
        this.file = null

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
        this.fileField = document.getElementById('files')
        this.statueMsg = document.getElementById("channel-status")
        this.sendProgress = document.querySelector('progress#sendProgress')
        this.receiveProgress = document.querySelector('progress#receiveProgress')
        this.leaveChannelBtn = document.getElementById('leave_channel')
        this.downloadAnchor = document.querySelector('a#download')
        this.bitrateDiv = document.querySelector('div#bitrate')

        this.connection_init()
        this.socket_init()
        this.bind_event()
    }
    socketOnError (error) {
        console.log('WebSocket Error: ' + error.message)
    }
    socketOnConnect () {
        this.socketStatus.innerHTML = `Connected to: ${ this.wsurl }`
        this.socketStatus.className = 'open'
    }
    socketOnDisconnect () {
        this.socketStatus.innerHTML = 'Disconnected from WebSocket.'
        this.socketStatus.className = 'closed'
    }
    socketOnAnswer (data) {
        console.log(`answer: ${ data }`)
        let message = data.sdp
        let remote_session_desc = new RTCSessionDescription(data)
        this.connection.setRemoteDescription(remote_session_desc)
        console.log(this.connection.remoteDescription)
        this.roomInfoList.innerHTML += `<li class="answer"><span>Remote:</span>${ message }</li>`
        console.log(`now con ${ this.connection.iceConnectionState }`)
    }
    async socketOnOffer (data) {
        console.log(`offer ${ data }`)
        let message = data.sdp
        this.roomInfoList.innerHTML += `<li class="info"><span>Remote:</span>${ message }</li>`
        let remote_session_desc = new RTCSessionDescription(data)
        await this.connection.setRemoteDescription(remote_session_desc)
        let answer = await this.connection.createAnswer()
        console.log(`answer:${ answer }`)
        this.roomInfoList.innerHTML += `<li class="info"><span>Local:</span>${ answer.sdp }</li>`
        this.connection.setLocalDescription(answer)
        let sendinfo = {
            "room": storage.getItem("room"),
            "answer": answer
        }
        this.socket.emit("answer", sendinfo, data => console.log(data))
        console.log("now con")
    }
    socketOnMessage (data) {
        this.roomInfoList.innerHTML += `<li class="info"><span>message:</span>${ data }</li>`
    }
    socketOnCandidate (data) {
        console.log(data)
        this.connection.addIceCandidate(data)
        this.roomInfoList.innerHTML += `<li class="info"><span>candidate:</span>${ data.candidate }added</li>`
    }
    socket_init () {
        console.log("socket_init")
        this.socket = io(this.wsurl)
        this.socket.on("error", error => error => this.socketOnError(error))
        this.socket.on("connect", () => this.socketOnConnect())
        this.socket.on("disconnect", () => this.socketOnDisconnect())
        this.socket.on("answer", data => this.socketOnAnswer(data))
        this.socket.on("offer", data => this.socketOnOffer(data))
        this.socket.on("message", data => this.socketOnMessage(data))
        this.socket.on("candidate", data => this.socketOnCandidate(data))
    }
    fileOnLoad (file, offset) {
        return e => {
            let result = e.target.result
            this.channel.send(result)
            if (file.size > offset + e.target.result.byteLength) {
                window.setTimeout(sliceFile, 0, offset + chunkSize)
            }
            this.sendProgress.value = offset + e.target.result.byteLength
        }
    }
    sliceFile (file, offset) {
        let reader = new FileReader()
        reader.onload = this.fileOnLoad(file, offset)
        let slice = file.slice(offset, offset + chunkSize)
        reader.readAsArrayBuffer(slice)
    }

    ///这个是主要的修改对象
    channelOnMessage (event) {
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
                        this.messagesList.innerHTML += '<li class="info"><span>Remote message:</span>' + "reciving :" + info.name + '</li>'
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
                let received = new window.Blob(this.receiveBuffer)
                this.receiveBuffer = []

                this.downloadAnchor.href = URL.createObjectURL(received)
                this.downloadAnchor.download = this.filename
                this.downloadAnchor.textContent = 'Click to download \'' + this.filename + '\' (' + this.filesize + ' bytes)'
                this.downloadAnchor.style.display = 'block'

                let bitrate = Math.round(this.receivedSize * 8 / (new Date().getTime() - this.timestampStart))
                this.bitrateDiv.innerHTML = '<strong>Average Bitrate:</strong> ' + bitrate + ' kbits/sec (max: ' + this.bitrateMax + ' kbits/sec)'
            }
        }
    }
    channelOnStateChange (event) {
        let state = this.channel.readyState == "open" ? 'online' : "offline"
        this.statueMsg.innerHTML = state
        this.statueMsg.className = state
    }
    connOnDataChannel (event) {
        this.channel = event.channel
        this.channel.onmessage = event => this.channelOnMessage(event)
        this.channel.onopen = event => this.channelOnStateChange(event)
        this.channel.onclose = event => this.channelOnStateChange(event)
    }
    connOnIceConnectionStateChange (event) {
        console.log("oniceconnectionstatechange")
        console.log(this.connection.iceConnectionState)
    }
    connOnIceGatheringStateChange (event) {
        console.log("onicegatheringstatechange")
        console.log(this.connection.iceGatheringState)
    }
    connOnIceCandidate (event) {
        console.log("onicecandidate")
        console.log(event)
        console.log(event.candidate)
        if (event.candidate) {
            let data = {
                "type": 'iceCandidate',
                "room": storage.getItem("room"),
                "payload": event.candidate
            }
            let callback = data => {
                console.log(data)
                console.log(this.connection)
            }
            this.socket.emit("candidate", data, data => callback(data))
        }
    }
    connection_init () {
        console.log("connection_init")
        if (!("webkitRTCPeerConnection" in window || "RTCPeerConnection" in window)) {
            alert("RTCPeerConnection not supported")
            throw "RTCPeerConnection not supported"
        } else {
            this.connection = new RTCPeerConnection(this.connectcfg)
            console.log("webkitRTCPeerConnection")
            this.connection.ondatachannel = event => this.connOnDataChannel(event)
            this.connection.onsignalingstatechange = state => console.info('signaling state change:', state)
            this.connection.oniceconnectionstatechange = event => this.connOnIceConnectionStateChange(event)
            this.connection.onicegatheringstatechange = event => this.connOnIceGatheringStateChange(event)
            this.connection.onicecandidate = event => this.connOnIceCandidate(event)
        }
    }
    bind_event () {
        this.roomForm.onsubmit = e => this.roomForm_onsubmit(e)
        this.createRoomBtn.onclick = e => this.createRoomBtn_onclick(e)
        this.leaveRoomBtn.onclick = e => this.leaveRoomBtn_onclick(e)
        this.messagesSubmit.onclick = e => this.messagesSubmit_onclick(e)
        this.leaveChannelBtn.onclick = e => this.leaveChannelBtn_onclick(e)
    }
    roomForm_onsubmit (e) {
        e.preventDefault()
        let info = {
            "username": this.usernameField.value,
            'room': this.roomField.value
        }
        this.socket.emit("join", info, function (data) {
            console.log(data)
            storage.setItem("username", info[ "username" ])
            storage.setItem("room", info[ "room" ])
            console.log("local info saved")
        })
        this.usernameField.value = ''
        this.roomField.value = ''
        return false
    }
    ///此处有修改
    async createRoomBtn_onclick (e) {
        e.preventDefault()
        this.channel = this.connection.createDataChannel('test', {
            reliable: true
        })
        this.channel.binaryType = 'arraybuffer' //文件使用arraybuffer
        console.log(this.channel)
        this.channel.onopen = e => this.channelOnStateChange(e)
        this.channel.onclose = e => this.channelOnStateChange(e)
        this.channel.onmessage = e => this.channelOnMessage(e)

        let offer = await this.connection.createOffer()
        console.log(`offer:${ offer.toJSON() }`)
        this.connection.setLocalDescription(offer)
        let sendinfo = {
            "room": storage.getItem("room"),
            "offer": offer
        }
        this.roomInfoList.innerHTML += `<li class="info"><span>Local:</span>${ offer.sdp }</li>`
        this.socket.emit("offer", sendinfo, data => console.log(data))
    }
    leaveRoomBtn_onclick (e) {
        e.preventDefault()
        let sendinfo = {
            "username": this.usernameField.value,
            'room': this.roomField.value
        }
        this.socket.emit("leave", sendinfo, data => console.log(data))
        this.socket.close()
    }
    //修改这里
    messagesSubmit_onclick (e) {
        console.log("send message")
        e.preventDefault()
        this.file = this.fileField.files[ 0 ]
        console.log(this.file)
        if (this.file.size) {
            this.sendProgress.max = this.file.size
            this.channel.send(JSON.stringify({
                "type": "info",
                "size": this.file.size,
                "name": this.file.name,
                "starttime": new Date().getTime()
            }))
        } else {
            this.messagesList.innerHTML += '<li class="info"><span>Local message:</span>' + "File is empty, please select a non-empty file" + '</li>'
            this.messagesList.textContent = 'File is empty, please select a non-empty file'
            return
        }
    }
    leaveChannelBtn_onclick (e) {
        console.log("leave channel")
        e.preventDefault()
        this.channel.close()
    }
}

window.onload = () => {
    new WebrtcApplication()
}