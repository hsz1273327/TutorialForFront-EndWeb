# GRpc接口服务

[GRpc](https://grpc.io/)正如其名,是一种RPC.它实际上和RESTful接口在功能上是相近的,本质都是一种请求响应模式的服务.只是作为一个RPC,GRpc一般描述动作而非资源,并且它可以返回的不光是一个数据,而是一组流数据.

GRpc是一种跨语言的Rpc,它建立在`http2`上使用[protobuf](https://developers.google.com/protocol-buffers/)作为结构化数据的序列化工具,

它有4种形式:

+ 请求-响应
+ 请求-流响应
+ 流请求-响应
+ 流请求-流响应

其基本使用方式是:

1. 服务端与客户端开发者协商创建一个`protobuf`文件用于定义rpc的形式和方法名以及不同方法传输数据的schema
2. 服务端实现`protobuf`文件中定义的方法
3. 客户端调用`protobuf`文件中定义的方法

在js中我们需要使用包`grpc`和`@grpc/proto-loader`来实现上面的三个步骤

## 请求-响应

这个例子[C0](https://github.com/TutorialForJavascript/js-server/tree/master/code/GRpc%E6%8E%A5%E5%8F%A3%E6%9C%8D%E5%8A%A1/C0)我们来实现一个简单的服务--输入一个数,输出这个数的平方

### 创建一个`protobuf`文件

创建`protobuf`文件的语法可以看[protobuf的语法指南](https://developers.google.com/protocol-buffers/docs/proto3)

我们将函数命名为`Square`,每次传传入的数据是一个double型的数,传回的也是一个double型的数.

```protobuf
syntax = "proto3";
package squarerpc_service;

service SquareService {
    rpc square (Message) returns (Message){}
}

message Message {
    double message = 1;
}
```

### 服务端实现定义的方法

服务端通过使用`protoLoader.loadSync`来实现加载`protobuf`文件中package的功能.导入后通过`grpc.loadPackageDefinition`来将这个protobuf文件作为一个对象.然后为grpc的服务器创建一个实例

```js
const server = new grpc.Server()
```

同时定义一个对象用于存放rpc中函数的实现,需要注意的是函数的实现只有两个参数:

+ `call`请求对象,通过`call.request`获取请求的message

+ `callback`一个用于返回结果的函数,其第一位参数是,第二位参数是返回结果的对象

需要注意请求和响应的结果都需要符合proto文件中定义的结构.

定义好后需要使用`server.addService`将`protobuf`文件中的定义与实现绑定
最后使用`server.bind`绑定host和`grpc.ServerCredentials.createInsecure()`创建出来的rpc实例.之后`server.start()`启动服务

```js
import grpc from "grpc"
import * as protoLoader from "@grpc/proto-loader"

const PROTO_PATH = __dirname + "/../schema/square_service.proto"

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
    square(call,callback){
        let result = call.request.message**2
        callback(null,{
            message: result
        })
    }
}

const server = new grpc.Server()

server.addService(rpc_proto.SquareService.service,SquareService)

function main(){
    server.bind(`${HOST}:${PORT}`, grpc.ServerCredentials.createInsecure())
    console.log(`start @ ${HOST}:${PORT}`)
    server.start()
}

main()
```

### 客户端实现方式

客户端一样通过使用`protoLoader.loadSync`来实现加载`protobuf`文件中package的功能.导入后通过`grpc.loadPackageDefinition`来将这个protobuf文件作为一个对象

然后实例化一个客户端并使用`bluebird`将其Promise化.

```js
const clientcb = new rpc_proto.SquareService(
    host,
    grpc.credentials.createInsecure()
)
const client = bluebird.promisifyAll(clientcb)
```

后面要调用这个客户端只需要在方法后面加上`Async`即可

```js
import grpc from "grpc"
import * as protoLoader from "@grpc/proto-loader"
import * as bluebird from 'bluebird'


const PROTO_PATH = __dirname + "/../schema/square_service.proto"

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

const client = bluebird.promisifyAll(clientcb)

async function main() {
    let result = await client.squareAsync({
        message: 12.3
    })
    console.log(result.message)
}

main()
```

这个服务我们将其封如dockerimage中,方便其他文章使用.

## 请求-流响应

这种需求比较常见,有点类似,python中的range函数,它生成的是一个流而非一个数组,它会一次一条的按顺序将数据发送回请求的客户端.

这个例子[C1](https://github.com/TutorialForJavascript/js-server/tree/master/code/GRpc%E6%8E%A5%E5%8F%A3%E6%9C%8D%E5%8A%A1/C1)实现了给出一个正整数,它会返回从0开始到它为止的每个整数的平方.

### 修改`protobuf`文件

响应流只需要在返回部分前面申明是流即可

```proto
...
service SquareService {
    rpc rangeSquare (Message) returns (stream Message){}
}
...
```

### 修改服务端

服务端的不同之处在于不再需要callback参数,改为直接向在call中调用`write`方法写入流数据,再在最后结尾处使用`end`方法标明流结束

```js
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
```

### 修改客户端

由于js的流处理基于[event emitter](https://en.wikipedia.org/wiki/Event-driven_architecture),我们无法使用promise解决.这里我们只能老老实实的监听响应的结果.

```js
let call = clientcb.rangeSquare({
    message: 12.3
})
call.on("data",(message)=>{
    console.log(message.message)
})
call.on("end",()=>{
    console.log("stream end")
})

```

## 流请求-响应

这种需求不是很多见,可能用的比较多的是收集一串数据后统一进行处理吧,流只是可以确保是同一个客户端发过来的而已.

这个例子[C2](https://github.com/TutorialForJavascript/js-server/tree/master/code/GRpc%E6%8E%A5%E5%8F%A3%E6%9C%8D%E5%8A%A1/C2)实现了传过来一串数,之后返回他们的平方和

### 修改`protobuf`文件

响应流只需要在请求部分前面申明是流即可

```proto
...
service SquareService {
    rpc sumSquare (stream Message) returns (Message){}
}
...
```

### 修改服务端

服务端的不同之处在于需要监听call的`data`和`end`事件,在`data`事件中我们收集数据,在`end`事件中我们收到事件结束的标志,调用收集到的数据进行处理,再使用参数`callback`向响应一样的返回.

```js
(call, callback)=>{
    let container = []
    call.on("data", (message) => {
        console.log(`get ${message.message}`)
        container.push(message.message)
    })
    call.on("end", () => {
        console.log("stream end")
        callback(null, {
            message: container.map(e => e ** 2).reduce((x, y) => x + y)
        })
    })
}
```

### 修改客户端

客户端传输流比较特殊,需要先以一个以`error, message`为参数的回调函数作为参数创建一个可写的call对象,之后使用这个call对象的`write`方法写入流,然后在流结束时使用call的`end`方法结束流.

```js
let call = clientcb.sumSquare(
    (error, message) => console.log(`result: ${message.message}`)
)
for (let i = 0; i <= 5; i++) {
    call.write({
        message: i
    })
}
call.end()
```

## 流请求-流响应

将上面两种方式结合起来,就是我们的第四种方式,请求为一个流,响应也是流.这两个流可以是相互交叉的也可以是请求完后再返回一个流.他们在写pb文件时是相同的写法

```protobuf
service SquareService {
    rpc streamrangeSquare (stream Message) returns (stream Message){}
}
```

### 请求流完成后返回流

这个例子[C3](https://github.com/TutorialForJavascript/js-server/tree/master/code/GRpc%E6%8E%A5%E5%8F%A3%E6%9C%8D%E5%8A%A1/C3)实现了传过来一串数,之后以流的形式返回这组数每个的平方.

+ 修改服务端

```js
streamrangeSquare(call) {
    let container = []
    call.on("data", (message) => {
        console.log(`get ${message.message}`)
        container.push(message.message)
    })
    call.on("end", () => {
        console.log("stream end")
        for (let i of container) {
            call.write({
                message: i ** 2
            })
        }
        call.end()
    })

}
```

+ 修改客户端

```js
let result = []
let call = clientcb.streamrangeSquare()
call.on("data", (message) => {
    console.log(`get message ${message.message}`)
    result.push(message.message)
})
call.on("end", () => {
    console.log(`stream end with result: ${result}`)
})
for (let i = 0; i <= 5; i++) {
    call.write({
        message: i
    })
}
call.end()
```

### 请求的进行中就返回响应

这个例子[C4](https://github.com/TutorialForJavascript/js-server/tree/master/code/GRpc%E6%8E%A5%E5%8F%A3%E6%9C%8D%E5%8A%A1/C4)实现了传过来一串数,每收到一个数就处理了进行返回.

+ 修改服务端

```js
streamrangeSquare(call) {
    call.on("data", (message) => {
        console.log(`get ${message.message}`)
        call.write({
            message: message.message ** 2
        })
    })
    call.on("end", () => {
        console.log("stream end")
        call.end()
    })
}
```

### 两种方式的不同之处

这两种方式的不同之处只在于服务端的数据处理是在`data`事件还是在`end`事件时触发.

## grpc的坑

1. grpc的精度会在传递中有不一致的情况,比较建议使用字符串传递需要精确的数据(比如金融领域)
2. 虽然看起来流请求-流响应的模式写起来和websocket很像,但他们有本质区别--grpc必须由客户端发起,而websocket不需要.