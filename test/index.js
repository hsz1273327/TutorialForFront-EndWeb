import path from "path"
import grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
const __dirname = path.resolve()
const PROTO_PATH = __dirname + "/schema/square_service.proto"

const HOST = "0.0.0.0"
const PORT = 5000

const PackageDefintion = protoLoader.loadSync(
    PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
)

const rpc_proto = grpc.loadPackageDefinition(PackageDefintion).squarerpc_service

const clientcb = new rpc_proto.SquareService(
    `${HOST}:${PORT}`,
    grpc.credentials.createInsecure()
)

function main() {
    let call = clientcb.rangeSquare({
        message: 12.3
    })
    call.on("data",(message)=>{
        console.log(message.message)
    })
    call.on("end",()=>{
        console.log("stream end")
    })
}

main()