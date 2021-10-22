import path from "path"
import grpc from "@grpc/grpc-js"
import * as assert from 'assert'
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

const SquareService = {
    rangeSquare(call) {
        let limit = call.request.message
        for (let i = 0; i <= limit; i++) {
            call.write({
                message: i ** 2
            })
        }
        call.end()
    }
}

const server = new grpc.Server()

server.addService(rpc_proto.SquareService.service, SquareService)

function main() {
    server.bindAsync(
        `${ HOST }:${ PORT }`,
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            assert.ifError(err)
            console.log(`start @ ${ port }`)
            server.start()
        }
    )
}

main()