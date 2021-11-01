const {
    Message
} = require('./square_service_pb.js')
const {
    SquareServiceClient
} = require('./square_service_grpc_web_pb.js')

class WebGrpcApp {
    constructor () {
        this.clientcb = new SquareServiceClient('http://localhost:8000')
        this.container = document.querySelector("main")
        this.button = document.querySelector("main button")
        this.bind_event()
        console.log("init")
    }
    bind_event () {
        this.button.onclick = () => this.onClick()
        console.log("bind")
    }
    onClick () {
        let query = new Message()
        query.setMessage(12.3)
        console.log(query)
        this.clientcb.square(query, {}, (error, message) => this.onMessage(error, message))
    }
    onMessage (error, message) {
        console.log(message)
        let content = message
        let p = document.createElement("p")
        p.innerText = content
        this.container.appendChild(p)
    }
}

function main () {
    let app = new WebGrpcApp()
}
main()