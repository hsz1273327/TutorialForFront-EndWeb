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
            case "helloworld":
                {
                    console.log(data.message)
                    wsserver.broadcast(JSON.stringify({
                        event: "helloworld",
                        message: `helloworld ${ data.message }`
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