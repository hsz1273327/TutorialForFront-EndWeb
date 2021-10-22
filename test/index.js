import path from "path"
import grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import bluebird from 'bluebird'
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

const client = bluebird.Promise.promisifyAll(clientcb)   //Promise.promisifyAll(clientcb)

async function main() {
    let result = await client.squareAsync({
        message: 12.3
    })
    console.log(result.message)
}

main()