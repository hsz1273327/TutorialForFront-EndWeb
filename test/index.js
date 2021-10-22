import assert from 'assert'
import WebSocket from 'ws'

describe('#Api_helloworld1', () => {
    it("should room1 get Hello World", () => {
        const ws = new WebSocket('ws://localhost:3000')
        ws.on('open', () => {
            ws.send(JSON.stringify({
                event: 'helloworld',
                message: 'hsz'
            }))
        })
        ws.on('message', (message) => {
            let data = null
            try{
                data = JSON.parse(message)
            }catch(error){
                ws.send('message is not json')
                return
            }
            if (!data || !data.event){
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
                        assert.equal(data.message, "helloworld hsz")
                        ws.close()
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
    })
})