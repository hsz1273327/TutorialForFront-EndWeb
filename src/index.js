import Koa from 'koa'
import route from 'koa-route'
import websockify from 'koa-websocket'
import WebSocket from 'ws'

const app = websockify(new Koa())
let CHANNEL_WS_INDEX = new Map()// channelid-> set(ws)
let WS_CHANNEL_INDEX = new Map() // ws-> set(channelid)

const Publish = (channel_id, msg) => {
    let wss = CHANNEL_WS_INDEX.get(channel_id)
    for (let ws of wss) {
        ws.send(msg)
    }
}

const RemoveWs = (ws) => {
    let channels = WS_CHANNEL_INDEX.get(ws)
    for (let channel of channels) {
        let wss = CHANNEL_WS_INDEX.get(channel)
        wss.delete(ws)
    }
    WS_CHANNEL_INDEX.delete(ws)
    ws.close()
}
const AddToChannel = (ws, index_id) => {
    if (CHANNEL_WS_INDEX.has(index_id)) {
        let wss = CHANNEL_WS_INDEX.get(index_id)
        wss.add(ws)
        CHANNEL_WS_INDEX.set(index_id, wss)
    } else {
        let wss = new Set()
        wss.add(ws)
        CHANNEL_WS_INDEX.set(index_id, wss)
    }
    if (WS_CHANNEL_INDEX.has(ws)) {
        let channels = WS_CHANNEL_INDEX.get(ws)
        channels.add(index_id)
        WS_CHANNEL_INDEX.set(ws, channels)
    } else {
        let channels = new Set()
        channels.add(index_id)
        WS_CHANNEL_INDEX.set(ws, channels)
    }
}

const onMessage = channel_id => ws => message => {
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
                RemoveWs(ws)
            }
            break
        case "publish":
            {
                Publish(channel_id, JSON.stringify({
                    event: "message",
                    message: `${ data.message } subscribed this channel`
                }))
            }
            break
        default:
            {
                ws.send('unkonwn command')
            }
    }
}


// Using routes
app.ws.use(route.all('/channel/:index_id', async function (ctx, index_id) {
    console.log(`get in channel ${ index_id }`)
    AddToChannel(ctx.websocket, index_id)
    console.log("AddToChannel ok")
    ctx.websocket.send(JSON.stringify({ event: "message", message: "hello" }))
    ctx.websocket.on('message', onMessage(index_id)(ctx.websocket))
}))
setInterval(() => {
    for (let client of app.ws.server.clients) {
        if (client.readyState === WebSocket.CLOSED){
            RemoveWs(client)
        }
    }
}, 300000)

console.log("serve start @ localhost:3000")
app.listen(3000)