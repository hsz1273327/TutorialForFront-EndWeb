import WebSocket from 'ws'
import http from 'http'
import url from 'url'
import {
    URLSearchParams
} from 'url'

const server = http.createServer()

const onMessage = wws => ws => message => {
    console.log('received: %s', message)
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
    switch (data.event) {
        case "close":
            {
                ws.close()
            }
            break
        case "publish":
            {
                ws.publish(JSON.stringify({
                    event: "message",
                    message: `${data.message} subscribed this channel`
                }))
            }
            break
        default:
            {
                ws.send('unkonwn command')
            }
    }
}

let CHANNELS = new Map()

server.on('upgrade', (request, socket, head) => {
    const url_p = url.parse(request.url)
    const pathname = url_p.pathname
    const params = new URLSearchParams(url_p.query)
    if (pathname === '/channel') {
        if (params.get("id")) {
            let channel_id = params.get("id")
            let wss = null
            if (CHANNELS.get(channel_id)) {
                wss = CHANNELS.get(channel_id)
            } else {
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
                CHANNELS.set(channel_id, wss)
            }
            wss.handleUpgrade(request, socket, head, ws => {
                wss.emit('connection', ws, request)
                console.log(`emit channel ${channel_id}`)
            })
        } else {
            socket.destroy()
            console.log("destory socket")
        }

    } else {
        socket.destroy()
        console.log("destory socket")
    }
});

setInterval(() => {
    for (let [key, value] of CHANNELS.entries()) {
        if (value.clients.filter(client => client.readyState === WebSocket.OPEN).length === 0) {
            CHANNELS.delete(key)
        }
    }
}, 300000)
server.listen(3000)