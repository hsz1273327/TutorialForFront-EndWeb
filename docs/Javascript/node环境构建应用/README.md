# node环境构建应用

node环境一般是辅助前端开发为主,其定位很大程度上和python在后台的定位类似--都是动态语言可以比较灵活的开发功能,但也确实各有特点:

+ 资源利用率上来说,纯python相当慢,同时内存消耗也大,纯node比纯python性能优越也省内存;
+ 扩展性上来说,python极易扩展,使用cython/c/cpp/fortan/rust等静态语言进行扩展后性能基本就是这些静态语言编译出的动态链接库的性能.node也较容易扩展,但似乎并不及python扩展起来自然.
+ 生态上来说,python同时拥有科学计算的全套生态工具,更有pytorch,tenserflow等工具可以方便的使用gpu资源.因此适合写计算密集型的程序.js在这方面不成熟这块基本无法涉足.
+ 性能上来说,cpu方面都是单进程只能用一个核的假多线程,cpu密集型任务都不适合,但node天生异步非阻塞,没有历史包袱,而python的异步是3.5才有的"新特性",光看io性能node略胜半筹,但由于node的社区更偏向前端,所以一般来说写http服务更方便.

node最常见的应用场景包括:

+ 作为连接前端的APIgateway根据业务需要聚合后端接口
+ 结合前端框架提供服务端渲染(这个我们不在这里讨论)
+ 构造一些辅助静态生成的模版类工具.

而常见的技术主要是:

+ 基于HTTP的RESTful接口服务
+ 基于Websocket的长连接服务
+ GRpc提供的接口服务

而后端相关的技术有:

+ 关系数据库技术,常见的有[PostgreSQL](http://www.postgres.cn/docs/10/),业务上一般使用orm来操作数据库.常用的orm有[typeorm](https://typeorm.io/)配合[pg](https://github.com/brianc/node-postgres)使用
+ 共享内存技术,常见的是Redis,我们使用[node-redis](http://redis.js.org/)配合[bluebird](https://github.com/petkaantonov/bluebird)
+ 消息队列技术,常见的有rabbitMQ,我们使用[rabbit.js](https://github.com/squaremo/rabbit.js)
+ 消息的发布订阅工具,常见的有Redis,rabbitMQ,postgreSQL

+ [zmq](http://zeromq.org/)一种基于通信模式的消息组件框架
+ [webrtc](https://github.com/node-webrtc/node-webrtc)一种在浏览器端也有实现的p2p即时通信技术
+ [commander](https://github.com/tj/commander.js)用于构造命令行的工具.

不过还是那句话,不建议后端开发使用node.不过本系列文章的演示程序后台都将使用node编写,这样读者不用再多学一门编程语言在后台部分陷入泥潭

本篇为番外篇章,和本文主题并无太多关联,没有兴趣的可以跳过,后面如果有用到的会有链接连回来
