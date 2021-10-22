import WebSocket from 'ws'

const ws = new WebSocket('ws://localhost:3000/channel?id=1')
ws.on('open', () => {
    ws.send(JSON.stringify({
        event: 'publish',
        message: 'hsz'
    }))
})
ws.on('message', (message) => {
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
        case "message":
            {
                console.log(data.message)
            }
            break
        default:
            {
                ws.send('unkonwn command')
            }
    }

})
ws.on('close', () => {
    console.log('disconnected');
})