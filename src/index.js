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