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
setInterval(() => wsserver.broadcast(JSON.stringify({
    event: "clock",
    message: (new Date).toString()
})), 10000)
