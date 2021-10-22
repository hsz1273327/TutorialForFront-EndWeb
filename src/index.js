import WebSocket from 'ws'
import http from 'http'
import url from 'url'

const server = http.createServer()
const wss1 = new WebSocket.Server({
    noServer: true
})
const wss2 = new WebSocket.Server({
    noServer: true
})

wss1.on('connection', ws => {
    ws.on('message', message => {
        console.log('received: %s', message)
        switch (message) {
            case "close":
                {
                    ws.close()
                }
                break
            case "helloworld":
                {
                    ws.send('Hello World')
                }
                break
            default:
                {
                    ws.send('unkonwn command')
                }
        }
    })
})

wss2.on('connection', ws => {
    ws.on('message', message => {
        console.log('received: %s', message)
        switch (message) {
            case "close":
                {
                    ws.close()
                }
                break
            case "helloworld":
                {
                    ws.send('Hello World')
                }
                break
            default:
                {
                    ws.send('unkonwn command')
                }
        }
    })
})

server.on('upgrade', (request, socket, head) => {
    const pathname = url.parse(request.url).pathname
    console.log(pathname)
    if (pathname === '/room1') {
        wss1.handleUpgrade(request, socket, head, ws =>{
            wss1.emit('connection', ws, request)
            console.log("emit room1")
        })
    } else if (pathname === '/room2') {
        wss2.handleUpgrade(request, socket, head, ws => {
            wss2.emit('connection', ws, request)
            console.log("emit room2")
        })
    } else {
        socket.destroy()
        console.log("destory socket")
    }
});
server.listen(3000)