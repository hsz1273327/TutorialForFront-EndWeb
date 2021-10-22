import assert from 'assert'
import WebSocket from 'ws'

describe('#Api_helloworld', () => {
    it("should get Hello World", () => {

        const ws = new WebSocket('ws://localhost:3000')
        ws.on('open', () => {
            ws.send('helloworld')
        })
        ws.on('message', (data) => {
            console.log(data)
            assert.equal(data, 'Hello World')
            ws.close()
        })
        ws.on('close', () => {
            console.log('disconnected');
        })
    })
})