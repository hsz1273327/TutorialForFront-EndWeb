# grpc-web

grpc-web是google新推出的一种前端与后端交互的方式,它的本质是让前端可以作为[grpc](https://blog.hszofficial.site/introduce/2021/06/17/grpc%E6%8E%A5%E5%8F%A3%E6%9C%8D%E5%8A%A1/)的客户端直接与服务端交互.

grpc-web的使用相对是比较麻烦的,它必须依托于:

+ grpc服务器
+ 一个webgrpc的代理用于将grpc转为http2的服务
+ 使用grpc-web的前端项目

grpc-web的优点自不必说,代码即文档的便利谁用谁知道,但grpc-web目前并不成熟,相比起通常的grpc,目前只有req-res这一种形式支持比较完备,req-stream这种模式可以支持但并不稳定,而其他两种模式都还不支持.本文更多的是一个占位,先大致介绍下这个技术,等他成熟了我们再进行补完.

## 开发环境依赖

grpc-web的开发需要工具[protoc](https://github.com/protocolbuffers/protobuf/releases)和[grpc-web](https://github.com/grpc/grpc-web/releases)将protobuf文件编译为js模块.注意安装好后我们需要先将这两个放入PATH环境变量.

同时由于grpc-web并不支持es module,所以我们必须借助[webpack](https://blog.hszofficial.site/TutorialForFront-EndWeb/#/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%8E%AF%E5%A2%83%E7%9A%84%E5%89%8D%E7%AB%AF%E5%BA%94%E7%94%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%8E%E9%A1%B5%E9%9D%A2%E6%B8%B2%E6%9F%93/%E4%BD%BF%E7%94%A8webpack%E7%BB%84%E5%90%88%E6%B8%B2%E6%9F%93%E8%B5%84%E6%BA%90)进行打包.

## 根据protobuf文件生成前端使用的js模块

安装好这两个后我们可以使用如下命令将目标protobuf文件编译为js模块

```shell
protoc -I=$proto_dir $proto_file \
--js_out=import_style=commonjs:$target_dir \
--grpc-web_out=import_style=commonjs,mode=grpcwebtext:$target_dir
```

+ 其中`import_style`表示编译出来的js模块的导入形式,可选的有:
    + `closure`:默认的格式,谷歌定义的一种导入模式,可以忽略
    + `commonjs`:使用commonjs标准引用,即`require('mod')`
    + `commonjs+dts`:(实验特性),使用commonjs标准引用,即`require('mod')`,但同时生成`.d.ts`这样的ts的类型声明文件
    + `typescript`:(实验特性),生成typescript模块.

    注意`commonjs+dts`和`typescript`只是针对`--grpc-web_out`,`--js_out`只有`closure`和`commonjs`两种可用,因此一般都是直接`commonjs`
+ 其中`mode`表示编译出来的的模块请求响应使用的序列化方式,有如下几种:
    + `grpcwebtext`:header中`Content-type: application/grpc-web-text`且使用base64-encoded编码数据(字符串型数据).支持`req-res`模式和`req-stream`模式
    + `grpcweb`: header中`Content-type: application/grpc-web+proto`负载为protobuf格式的二进制数据,只支持`req-res`模式

    因此我们一般用`grpcwebtext`

## webgrpc的转义层

我们当然希望前端可以直接和grpc服务端相连,但现在官方还没有解决方案,但grpc协议和grpc-web协议本质上并不一样(具体可以看[grpc-web的协议文档](https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-WEB.md),因此必须在常规grpc服务和grpc-web客户端之间插入一层转义层.官方推荐的(几乎也是唯一选项)是使用[envoy](https://www.envoyproxy.io/)充当这一角色.

要使用envoy代理webgrpc需要进行特殊设置,在主体框架上他是一个反向代理,但在`filters`部分需要进行一些特殊设置.如何配置我们会在下面的例子中演示,大体上主要的内容就在`filters`这一层.

## 前端部分

前端部分就和正常grpc的使用方式很接近了.先建立连接然后调用接口方法获得结果.

## 一个简单的例子

我们借用[使用js搭建后端服务攻略中grpc部分](https://blog.hszofficial.site/TutorialForFront-EndWeb/#/Javascript/node%E7%8E%AF%E5%A2%83%E6%9E%84%E5%BB%BA%E5%BA%94%E7%94%A8/%E4%BD%BF%E7%94%A8node%E6%90%AD%E5%BB%BA%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1/GRpc%E6%8E%A5%E5%8F%A3%E6%9C%8D%E5%8A%A1)的[helloworld例子](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/node%E7%8E%AF%E5%A2%83%E6%9E%84%E5%BB%BA%E5%BA%94%E7%94%A8-%E4%BD%BF%E7%94%A8node%E6%90%AD%E5%BB%BA%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1-grpchello)来演示这个项目.这个项目的目的是点击按钮就发送请求到grpc中计算12.3的平方.

本项目放在[浏览器环境-浏览器与通信-grpcweb分支](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%8E%AF%E5%A2%83-%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%8E%E9%80%9A%E4%BF%A1-grpcweb)

### 服务端部分

我们使用envoy的官方镜像来实现对grpc-web的网关.

+ docker-compose.yml

    ```yml
    version: '2.4'
    services:
      grpc_web_proxy:
        image: envoyproxy/envoy:v1.17.0
        depends_on:
          - grpc-api
        ports:
          - 8000:8000
        networks:
          - rest_test
        logging:
          options:
              max-size: "10m"
              max-file: "3"
        volumes:
          - ./envoy.yaml:/etc/envoy/envoy.yaml
        command: /usr/local/bin/envoy -c /etc/envoy/envoy.yaml -l trace --log-path /tmp/envoy_info.log

      grpc-api:
        image: hsz1273327/js-server:grpc_c0
        networks:
          - rest_test

    networks:
      rest_test:
    ```

+ `envoy.yml`

    ```yml
    admin:
      access_log_path: /tmp/admin_access.log
      address:
        socket_address: { address: 0.0.0.0, port_value: 9901 }

    static_resources:
      listeners:
      - name: listener_0
        address:
          socket_address: { address: 0.0.0.0, port_value: 8000 }
        filter_chains:
        - filters:
          - name: envoy.filters.network.http_connection_manager
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
              codec_type: auto
              stat_prefix: ingress_http
              route_config:
                name: local_route
                virtual_hosts:
                - name: local_service
                  domains: ["*"]
                  routes:
                  - match: { prefix: "/" }
                    route:
                      cluster: greeter_service
                      max_stream_duration:
                        grpc_timeout_header_max: 0s
                  cors:
                    allow_origin_string_match:
                    - prefix: "*"
                    allow_methods: GET, PUT, DELETE, POST, OPTIONS
                    allow_headers: keep-alive,user-agent,cache-control,content-type,content-transfer-encoding,custom-header-1,x-accept-content-transfer-encoding,x-accept-response-streaming,x-user-agent,x-grpc-web,grpc-timeout
                    max_age: "1728000"
                    expose_headers: custom-header-1,grpc-status,grpc-message
              http_filters:
              - name: envoy.filters.http.grpc_web
              - name: envoy.filters.http.cors
              - name: envoy.filters.http.router
      clusters:
      - name: greeter_service
        connect_timeout: 0.25s
        type: logical_dns
        http2_protocol_options: {}
        lb_policy: round_robin
        load_assignment:
          cluster_name: cluster_0
          endpoints:
            - lb_endpoints:
                - endpoint:
                    address:
                      socket_address:
                        address: grpc-api
                        port_value: 5000

    ```

### 前端部分

和之前的不同我们将前端资源都放在`dist`文件夹中方便webpack打包js.我们的js源文件则放在`src`文件夹.主逻辑如下:

```js
const {
    Message
} = require('./square_service_pb.js')
const {
    SquareServiceClient
} = require('./square_service_grpc_web_pb.js')

class WebGrpcApp {
    constructor() {
        this.clientcb = new SquareServiceClient('http://localhost:8000')
        this.container = document.querySelector("main")
        this.button = document.querySelector("main button")
        this.bind_event()
        console.log("init")
    }
    bind_event() {
        this.button.onclick = () => this.onClick()
        console.log("bind")
    }
    onClick() {
        let query = new Message()
        query.setMessage(12.3)
        console.log(query)
        ///grpc-web基于回调
        this.clientcb.square(query, {}, (error, message) => this.onMessage(error, message))
    }
    onMessage(error, message) {
        console.log(message)
        let content = message
        let p = document.createElement("p")
        p.innerText = content
        this.container.appendChild(p)
    }
}

function main() {
    let app = new WebGrpcApp()
}
main()
```

而`square_service_pb.js`和`square_service_grpc_web_pb.js`则是通过`protoc -I=pbschema square_service.proto --js_out=import_style=commonjs:src --grpc-web_out=import_style=commonjs,mode=grpcwebtext:src`生成的.