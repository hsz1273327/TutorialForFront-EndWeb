import assert from 'assert'
import WebSocket from 'ws'
describe('#Api_helloworld1', () => {
    it("should room1 get Hello World", () => {
        const ws = new WebSocket('ws://localhost:3000/room1')
        ws.on('open', () => {
            ws.send('helloworld')
        })
        ws.on('message', (data) => {
            console.log(data)
            assert.equal(data, 'Hello World')
            ws.close()
        })
        ws.on('close', () => {
            console.log('disconnected')
        })
    })
})
describe('#Api_helloworld2', () => {
    it("should room2 get Hello World", () => {
        const ws = new WebSocket('ws://localhost:3000/room2')
        ws.on('open', () => {
            ws.send('helloworld')
        })
        ws.on('message', (data) => {
            console.log(data)
            assert.equal(data, 'Hello World')
            ws.close()
        })
        ws.on('close', () => {
            console.log('disconnected')
        })
    })
})