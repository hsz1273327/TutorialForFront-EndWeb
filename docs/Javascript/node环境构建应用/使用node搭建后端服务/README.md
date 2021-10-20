# 使用Javascript搭建后端服务

Javascript并不是最佳的后端服务语言,但它并不是不能做,node.js依靠异步可以在性能上达到相当高的程度,足以应付10k问题,而在同时其内存消耗也相当小,应付一般的网站绰绰有余.
其主要缺陷在于没有足够的生态,不适合做更加复杂的后端服务.
通常js在后端的角色更多的是:

+ 微服务架构中作为组件提供接口
+ 作为连接前端的APIgateway根据业务需要聚合后端接口

而常见的技术主要是:

+ 基于HTTP的RESTful接口服务
+ 基于Websocket的长连接服务
+ GRpc提供的接口服务

而后端相关的技术有:

+ 关系数据库技术,常见的有[PostgreSQL](http://www.postgres.cn/docs/10/),业务上一般使用orm来操作数据库.常用的orm有[sequelize](http://docs.sequelizejs.com/)配合[pg](https://github.com/brianc/node-postgres)和[pg-hstore](https://github.com/scarney81/pg-hstore)使用
+ 共享内存技术,常见的是Redis,我们使用[node-redis](http://redis.js.org/)配合[bluebird](https://github.com/petkaantonov/bluebird)
+ 消息队列技术,常见的有rabbitMQ,我们使用[rabbit.js](https://github.com/squaremo/rabbit.js)
+ 消息的发布订阅工具,常见的有Redis,rabbitMQ,postgreSQL

+ [zmq](http://zeromq.org/)一种基于通信模式的消息组件框架
+ [webrtc](https://github.com/node-webrtc/node-webrtc)一种在浏览器端也有实现的p2p即时通信技术


不过还是那句话,不建议后端开发使用node.不过本系列文章的演示程序后台都将使用node编写,这样读者不用再多学一门编程语言在后台部分陷入泥潭
