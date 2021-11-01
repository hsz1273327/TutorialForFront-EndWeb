const WSURL = 'ws://localhost:4500'
const connectcfg = {
    'iceServers': [{ 'url': 'stun:23.21.150.121' }],
    'optional': [{ 'DtlsSrtpKeyAgreement': true }]
}

let storage = localStorage

let socket: any = null
let connection: any = null
let channel: any = null

let socketStatus = document.getElementById('ws-status')
let roomInfoList = document.getElementById('room-info')
let roomForm = <HTMLFormElement>document.getElementById('room-form')
let usernameField = <HTMLInputElement>document.getElementById('username')
let roomField = <HTMLInputElement>document.getElementById('room')
let createRoomBtn = <HTMLButtonElement>document.getElementById('create_room')
let leaveRoomBtn = <HTMLButtonElement>document.getElementById('leave_room')
let messagesList = document.getElementById('messages')

let messagesSubmit = <HTMLButtonElement>document.getElementById('submit')
let remoteVideo = <HTMLVideoElement>document.querySelector('video#remoteVideo')
let localVideo = <HTMLVideoElement>document.querySelector('video#localVideo')
let statueMsg = document.getElementById("channel-status")

let leaveChannelBtn = <HTMLButtonElement>document.getElementById('leave_channel')

function handleAddCandidateError() {
    console.log("addICECandidate failed!")
}
function handleChannelStatusChange(event: any) {

    let state = (channel.readyState == "open") ? 'online' : "offline"
    statueMsg.innerHTML = state
    statueMsg.className = state
}
function handleChannelMessage(event: any) {

    messagesList.innerHTML += '<li class="info"><span>Remote message:</span>' +
        event.data + '</li>'

}

function onsignalingstatechange(state: any) {
    console.info('signaling state change:', state)
}

function socket_init() {
    console.log("socket_init")
    socket = io(WSURL)
    socket.on("error", function(error: Error) {
        console.log('WebSocket Error: ' + error.message)
    })
    socket.on("connect", function() {
        socketStatus.innerHTML = 'Connected to: ' + WSURL
        socketStatus.className = 'open'
    })
    socket.on("disconnect", function() {
        socketStatus.innerHTML = 'Disconnected from WebSocket.'
        socketStatus.className = 'closed'
    })

    socket.on("answer", function(data: any) {
        console.log("answer")
        console.log(data)
        let message = data.sdp
        new RTCSessionDescription(data)
        connection.setRemoteDescription(new RTCSessionDescription(data))
        console.log(connection.remoteDescription)
        roomInfoList.innerHTML += '<li class="answer"><span>Remote:</span>' +
            message + '</li>'
        console.log("now con")
        console.log(connection.iceConnectionState)
    })

    socket.on("offer", function(data: RTCSessionDescription) {
        console.log("offer")
        console.log(data)
        let message = data.sdp
        roomInfoList.innerHTML += '<li class="info"><span>Remote:</span>' +
            message + '</li>'
        connection.setRemoteDescription(new RTCSessionDescription(data))
            .then(() => connection.createAnswer())
            .then((answer: RTCSessionDescription) => {
                console.log("answer:    ")
                console.log(answer)
                roomInfoList.innerHTML += '<li class="info"><span>Local:</span>' +
                    answer.sdp + '</li>'
                connection.setLocalDescription(answer)
                let sendinfo = {
                    "room": storage.getItem("room"),
                    "answer": answer
                }
                socket.emit("answer", sendinfo, function(data: any) {
                    console.log(data)
                    console.log(connection)
                })
                console.log("now con")

            })
    })

    socket.on("message", function(data: any) {

        roomInfoList.innerHTML += '<li class="info"><span>message:</span>' +
            data +
            '</li>'
    })

}

function connection_init() {
    console.log("connection_init")
    if (!(("webkitRTCPeerConnection" in window) || ("RTCPeerConnection" in window))) {
        alert("RTCPeerConnection not supported")
        //let connection = new RTCPeerConnection(cfg)
    } else {
        connection = new RTCPeerConnection(connectcfg)
        console.log("webkitRTCPeerConnection")
        connection.ondatachannel = (event: any) => {
            channel = event.channel
            channel.onmessage = handleChannelMessage
            channel.onopen = handleChannelStatusChange
            channel.onclose = handleChannelStatusChange
        }
        //connection.setConfiguration(connectcfg)
        connection.onsignalingstatechange = onsignalingstatechange

    }
}
function candidate_init() {

    socket.on("candidate", function(data: any) {
        console.log(data)
        connection.addIceCandidate(data)
        roomInfoList.innerHTML += '<li class="info"><span>candidate:</span>' +
            data.candidate + "added" +
            '</li>'
    })
    connection.oniceconnectionstatechange = (event: any) => {
        console.log("oniceconnectionstatechange")
        console.log(connection.iceConnectionState)

    }
    connection.onicegatheringstatechange = function() {
        console.log("onicegatheringstatechange")
        console.log(connection.iceGatheringState)

    }
    connection.onicecandidate = (event: any) => {
        console.log("onicecandidate")
        console.log(event)
        console.log(event.candidate)
        if (event.candidate) {
            var data = {
                "type": 'iceCandidate',
                "room": storage.getItem("room"),
                "payload": event.candidate
            }
            socket.emit("candidate", data, function(data: any) {
                console.log(data)
                console.log(connection)
            })
        }
    }
    connection.onaddstream = function (e:any) {
        console.log("onaddstream")
        remoteVideo.srcObject = e.stream
    }

}


window.onload = function() {

    connection_init()
    socket_init()
    candidate_init()

    navigator.mediaDevices.getUserMedia({
      video: true
  }).then((stream)=>{
      connection.addStream(stream)
      localVideo.srcObject = stream
  })



    roomForm.onsubmit = function(e) {
        e.preventDefault()
        let info = {
            "username": usernameField.value,
            'room': roomField.value
        }
        socket.emit("join",
            info,
            function(data: any) {
                console.log(data)
                storage.setItem("username", info["username"])
                storage.setItem("room", info["room"])
                console.log("local info saved")
            })
        usernameField.value = ''
        roomField.value = ''
        return false
    }
    createRoomBtn.onclick = function(e) {
        e.preventDefault()
        channel = connection.createDataChannel('test', { reliable: true })
        console.log(channel)
        channel.onopen = handleChannelStatusChange
        channel.onclose = handleChannelStatusChange
        channel.onmessage = handleChannelMessage

        connection.createOffer()
            .then((offer: any) => {
                console.log("offer:    ")
                console.log(offer.toJSON())
                connection.setLocalDescription(offer)
                let sendinfo = {
                    "room": storage.getItem("room"),
                    "offer": offer
                }
                roomInfoList.innerHTML += '<li class="info"><span>Local:</span>' +
                    offer.sdp +
                    '</li>'
                socket.emit("offer", sendinfo, function(data: any) {
                    console.log(data)
                })
            })

    }
    leaveRoomBtn.onclick = function(e) {
        e.preventDefault()
        let sendinfo = {
            "username": usernameField.value,
            'room': roomField.value
        }
        socket.emit("leave", sendinfo, function(data: any) {
            console.log(data)
        })
        socket.close()

    }
    leaveChannelBtn.onclick = function(e) {
        console.log("leave channel")
        e.preventDefault()
        channel.close()
    }

}
//# sourceMappingURL=app.js.map
