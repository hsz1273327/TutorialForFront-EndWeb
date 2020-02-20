# grpc-web

grpc-web是google新推出的一种前端与后端交互的方式,它的本质是让前端可以作为[grpc]()的客户端直接与服务端交互.

grpc-web的使用相对是比较麻烦的,它必须依托于:

+ grpc服务器
+ 一个webgrpc的代理用于将grpc转为http2的服务
+ 使用grpc-web的前端项目

## 开发环境依赖

grpc-web的开发需要工具[protoc](https://github.com/protocolbuffers/protobuf/releases)和[grpc-web](https://github.com/grpc/grpc-web/releases)将protobuf文件编译为js模块.主意安装好后我们需要先将这两个放入PATH环境变量

安装好这两个后我们可以使用如下命令将目标protobuf文件编译为

```shell
protoc -I=$proto_dir $proto_file \
--js_out=import_style=commonjs:$target_dir \
--grpc-web_out=import_style=commonjs,mode=grpcwebtext:$target_dir
```

+ 其中`import_style=commonjs`表示编译出来的js模块使用commonjs标准引用,即`require('mod')`
+ 其中`mode=grpcwebtext`表示编译出来的js模块使用`Content-type: application/grpc-web-text`且使用base64-encoded编码数据

## webgrpc的代理

我们当然希望前端可以直接和grpc服务端相连,但现在官方还没有解决方案,只能借助一层网关来代理的grpc服务端,使之可以接收http请求.
官方推荐的是使用[envoy](https://www.envoyproxy.io/)作为grpc-web的代理,这个东西整体来说太重了但其他的工具目前看都无法使用.

+ envoy.yml

```yml
admin:
  access_log_path: /tmp/admin_access.log
  address:
    socket_address: { address: 0.0.0.0, port_value: 9901 }

static_resources:
  listeners:
  - name: listener_0
    address:
      socket_address: { address: 0.0.0.0, port_value: 8000 } # 这里修改对外暴露的端口和hostname
    filter_chains:
    - filters:
      - name: envoy.http_connection_manager
        config:
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
                  cluster: test_service
                  max_grpc_timeout: 0s
              cors:
                allow_origin:
                - "*"
                allow_methods: GET, PUT, DELETE, POST, OPTIONS
                allow_headers: keep-alive,user-agent,cache-control,content-type,content-transfer-encoding,custom-header-1,x-accept-content-transfer-encoding,x-accept-response-streaming,x-user-agent,x-grpc-web,grpc-timeout
                max_age: "1728000"
                expose_headers: custom-header-1,grpc-status,grpc-message
                enabled: true
          http_filters:
          - name: envoy.grpc_web
          - name: envoy.cors
          - name: envoy.router
  clusters:
  - name: test_service
    connect_timeout: 0.25s
    type: logical_dns
    http2_protocol_options: {}
    lb_policy: round_robin
    hosts: [{ socket_address: { address: grpc-api, port_value: 5000 }}]# 这里修改要代理的服务器
```

## 一个简单的例子

我们来代理[使用js搭建后端服务攻略中grpc部分](https://tutorialforjavascript.github.io/%E4%BD%BF%E7%94%A8Javascript%E6%90%AD%E5%BB%BA%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1/GRpc%E6%8E%A5%E5%8F%A3%E6%9C%8D%E5%8A%A1.html)的[C0](https://github.com/TutorialForJavascript/js-server/tree/master/code/GRpc%E6%8E%A5%E5%8F%A3%E6%9C%8D%E5%8A%A1/C0)项目.

本项目放在[C3-S3](https://github.com/TutorialForJavascript/frontend-basic/tree/master/code/C3/S3)

### 服务端部分

我们使用envoy的官方镜像来实现对grpc-web的网关.

+ docker-compose.yml

```yml
version: '3.6'
services:
  grpc_web_proxy:
    image: envoyproxy/envoy-dev:latest
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

### 前端部分

前端部分我们修改自websocket的例子,只是点击以后发送和接收改为了使用grpc-web而已.

1. 修改package.json

    由于编译出来的pb模块是`commonjs`的引用形式,而浏览器端是没有`require`方法的,所以这时候我们就需要借助一些前端模块化编程工具,当然我们可以使用[webpack](https://tutorialforjavascript.github.io/web%E5%89%8D%E7%AB%AF%E6%8A%80%E6%9C%AF/Webpack/),但这个对于我们这个简单的项目来说太重,因此你我们使用的是更加轻量的[browserify](http://browserify.org/)
    我们将编译pb文件和打包js都写到package.json中

    ```json
    ...
    "scripts": {
        "start": "./node_modules/.bin/live-server --port=3000 public",
        "build": "./node_modules/.bin/babel es -d public",
        "browserify":"browserify public/main.js > public/index.js",
        "build_pb": "protoc -I=schema square_service.proto --js_out=import_style=commonjs:es --grpc-web_out=import_style=commonjs,mode=grpcwebtext:es"
    },
    ...
    ```

    入口模块为`es/main.js`编译后使用的js文件为`index.js`

2. 执行`npm run build_pb`在`es`文件夹下生成grpc到js的模块

3. 编辑main.js

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
4. 执行`npm run build`=>`npm run browserify`在public文件夹下创建出`index.js`
5. 执行`npm start`

在页面上点击按钮,稍等一会儿就可以看到结果了