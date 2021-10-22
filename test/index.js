import assert from 'assert'
import WebSocket from 'ws'

describe('#Api_helloworld1', () => {
    it("should room1 get Hello World", () => {
        const ws = new WebSocket('ws://localhost:3000')
        ws.binaryType = "arraybuffer"
        ws.on('open', () => {
            ws.send('helloworld')
        })
        ws.on('message', (data) => {
            data = new Float32Array(data)
            const array = new Float32Array(10000)
            for (var i = 0; i < array.length; ++i) {
                array[i] = i / 2;
            }
            assert.equal(data.lenght, array.lenght)
            ws.close()
        })
        ws.on('close', () => {
            console.log('disconnected');
        })
    })
})
