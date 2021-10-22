import faker from 'faker'
import WebSocket from 'ws'


const ws = new WebSocket('ws://localhost:3000/channel?id=1')
const self = faker.fake("{{name.lastName}}")

let token = null

console.log(`I'm ${self}`)

ws.on('open', () => {
    ws.send(JSON.stringify({
        event: 'auth',
        message: 'auth',
        user: self
    }))

})
ws.on('message', (message) => {
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
            }
            break
        case "user_list":
            {
                if (data.message.length > 2) {
                    console.log("get user list:")
                    console.log(data.message)
                    let chosen = data.message[Math.random() >= 0.5 ? 1 : 2]
                    console.log(`chosen ${chosen}`)
                    ws.send(JSON.stringify({
                        event: "talk_with",
                        auth: token,
                        with_cilents: [chosen],
                        message: `hello ${chosen},I'm ${self}`
                    }))
                    console.log(`send message to ${chosen}`)
                } else {
                    ws.send(JSON.stringify({
                        event: "talk_with",
                        auth: token,
                        message: `hello all,I'm ${self}`
                    }))
                }
            }
            break
        case "message":
            {
                console.log(`get message: ${data.message}`)
            }
            break
        case "error":
            {
                console.log(`error:${data.message}`)
            }
            break
        case "token":
            {
                token = data.message
                ws.send(JSON.stringify({
                    event: "user_list",
                    auth: token
                }))
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

})
ws.on('close', () => {
    console.log('disconnected');
})