// import WebSocket from 'ws'
import { WebSocketServer } from 'ws'
const wsserver = new WebSocketServer({
    host: "0.0.0.0",
    port: 3000
})


wsserver.on('connection', ws => {
    console.log('someone connected')
    ws.on('message', message => {
        console.log('received: %s', message)
        switch (message) {
            case "close\n":
                {
                    ws.close()
                }
                break
            default:
                {
                    ws.send(`echo ${message}`)
                }
        }
    })
})