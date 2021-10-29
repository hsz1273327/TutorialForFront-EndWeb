"use strict"

class WebsocketApp {
    constructor () {
        this.ws = new WebSocket("ws://localhost:4000")
        this.container = document.querySelector("main")
        this.button = document.querySelector("main button")
        this.bind_event()
        console.log("init")
    }
    bind_event () {
        this.button.onclick = () => this.onClick()
        this.ws.onclose = () => {
            console.log('disconnected')
        }
        this.ws.onmessage = message_event => this.onMessage(message_event)
        console.log("bind")
    }
    onClick () {
        this.ws.send('helloworld')
    }
    onMessage (message_event) {
        console.log(message_event.data)
        let content = message_event.data
        let p = document.createElement("p")
        p.innerText = content
        this.container.appendChild(p)
    }
}

function main () {
    let app = new WebsocketApp()
}
main()