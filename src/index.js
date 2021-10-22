import WebSocket from 'ws'

const wsserver = new WebSocket.Server({
    port: 3000
})


wsserver.on('connection', ws => {
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
                    const array = new Float32Array(10000)
                    for (var i = 0; i < array.length; ++i) {
                        array[i] = i / 2;
                    }
                    ws.send(array)
                }
                break
            default:
                {
                    ws.send('unkonwn command')
                }
        }
    })
})
