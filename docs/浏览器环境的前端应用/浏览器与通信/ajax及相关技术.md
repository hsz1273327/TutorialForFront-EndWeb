# ajax及相关技术

前端项目往往只是作为展现层(view层).数据,业务运算往往要依赖后端服务器,因此与服务器间的通信是非常重要的.在最开始的时候http协议只想做个用于发布和接收HTML页面的协议,它不想搞得太复杂,但随着时代的变迁,越来越多的通信需求让它与服务器间的交互手段越来越多,web的发展是在太快,很少有实现快于标准的技术,而web技术就是一个.回顾历史,在最初的时候前端app只能通过`提交表单`来与服务器交互,到后来出现了ajax,可以通过XML作为数据的表现层协议来做到与服务端的频繁通讯.再后来json逐渐取代了XML的地位,而更加规范更加符合直觉的[RESTful接口](https://blog.hszofficial.site/recommend/2019/03/14/RESTful%E9%A3%8E%E6%A0%BC%E7%9A%84%E6%8E%A5%E5%8F%A3%E8%AE%BE%E8%AE%A1/)成了前端与后台通讯的首选.

这些花样繁多的技术其本质都是一样的,即请求响应模式:

1. 前端向后端发起请求
2. 后端响应请求并带上请求的结果数据.

这其实就是利用的http协议本身.浏览器获取页面也是同样的模式.

下面开始我们从例子出发来看看如何向后端发起请求.

本文适合配合本js攻略的[使用Javascript构建RESTful接口服务](https://blog.hszofficial.site/TutorialForFront-EndWeb/#/Javascript/node%E7%8E%AF%E5%A2%83%E6%9E%84%E5%BB%BA%E5%BA%94%E7%94%A8/%E4%BD%BF%E7%94%A8node%E6%90%AD%E5%BB%BA%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1/http%E6%8E%A5%E5%8F%A3%E6%9C%8D%E5%8A%A1)文章一起看,如果对后台部分没兴趣不看也行.

## fetch

[fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)是一个[w3c标准接口](https://fetch.spec.whatwg.org/).它和XMLHttpRequest同级的底层接口,但老浏览器(主要是ie)并不支持它使他的使用受到了限制.但我这篇本来就不考虑用ie的用户所以这边依然还是推荐首选使用它.

我们在项目[浏览器环境-helloworld](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%8E%AF%E5%A2%83-helloworld)中已经实现了这个例子这边就不再重复

顺道一提要在node中使用`fetch`可以安装`node-fetch`.

`fetch(input:Request|string, init ?:object)->Promise<Response>`的接口极其简单,他也是一个相当现代化的接口,使用Promise作为结果因此一般使用协程语法处理.

```js
let res = await fetch(url, {
    method: 'POST',
    headers: new Headers({
        'Content-Type': 'application/json',
    }),
    body: JSON.stringify(data),
// mode: 'no-cors',
})
if (!res.ok) {
let restext = await res.text()
throw new QueryError(restext)
}
let token = await res.json()
```

与之相关的类有:

+ `Headers`: http头对象,我们可以在请求时带上`headers`属性,但这个属性应该是一个`Headers`的实例.
    **需要注意**:
    1. `fetch`是对接http2协议的,而http2协议的头必须小写,因此fetch的key都会自动转为小写.
    2. `Headers`设置的值并不是实际发送出去的请求头,实际发送出去的内容受属性`mode`限制
+ `Request`: http请求对象.fetch可以理解为发送的就是一个Request,`Request()`接收的参数和fetch是一样的
+ `Response`: http响应对象.要判断请求是否成功可以使用`.ok`,要看http状态码可以使用`.status`,要获取响应头可以用`.headers`要获取响应body中的数据可以用`.arrayBuffer()->Promise<arrayBuffer>`,`.blob()->Promise<Blob>`,`.formData()->Promise<FormData>`,`.json()->Promise<object>`,`.text()->Promise<string>`.注意这几个方法执行后`Response`对象中的body就已经被读取了,后面就没法再读出了

## axios

本文例子在[浏览器环境-浏览器与通信-axios分支](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%8E%AF%E5%A2%83-%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%8E%E9%80%9A%E4%BF%A1-axios)

本质上[axios](https://github.com/axios/axios)是各家浏览器[XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)的封装,因此它具有最好的通用性,而且node中也可以使用,但目前它还没有实现esmodule,所以我们在浏览器中使用它还是得先单独全局导入

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

这个例子中我们实现了一个网页来抓取github上最近注册的用户数据,并展示到页面上.这个页面和[浏览器环境-helloworld分支](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%8E%AF%E5%A2%83-helloworld)功能一样,我们这边只是替换其请求方式.

## 浏览器的同源策略与跨域请求

上面的例子中我们很轻易的就访问到了数据,但并不是所有的请求都可以如此轻易,因为浏览器有同源策略--前端页面只能访问与之协议同域名同端口的后端服务.

服务器`A`上的页面想要获取服务器`B`上的资源,这种行为叫跨域请求.

![跨域错误](img/跨域错误.png)

这个问题呢其实比较尴尬,是只有通过浏览器访问才会碰到的问题所以应该归属于前端问题,但其解决方案并不只和前端相关.解决跨域问题需要:

+ 后端添加跨域支持
+ 前端请求时添加跨域支持

### 网络请求CORS的原理

本质上来说并不是网页或者服务端不允许跨域,而是网页的宿主也就是浏览器不允许.浏览器其实也不是不允许,它只是要为了安全性要把下关.进行符合要求的设置浏览器也会放行.

大致流程是这样的

1. 前端js中发起请求需要声明自己是跨域请求

2. 浏览器检查请求的方法,有两种情况
   1. 如果是`GET`,`POST`,`HEAD`三种方法的请求,则直接放行给服务端.当服务器返回响应后检查服务器是否允许接收请求发起域的请求.如果不允许就直接报跨域错误,如果允许就正常返回
   2. 如果是除`GET`,`POST`,`HEAD`之外的方法,浏览器会先发送一个到请求url的`OPTIONS`方法的请求(预检请求)看它的响应.当服务器返回响应后检查服务器是否允许接收请求发起域的请求.如果不允许就直接报跨域错误,如果允许就正式发送请求并处理结果.

好下面就是每一步的细节了

#### 使用fetch发送跨域请求

使用`fetch`发送跨域请求只需要设置请求中`init`参数的`mode`字段为`'cors'`(该字段的取值范围为`no-cors,cors,*same-origin`),这时浏览器就会在请求的headers中添加`Origin`字段,其值就是请求发起的域.

注意并不是所有请求头都被允许,具体哪些头不被允许可以看[这个文档](https://fetch.spec.whatwg.org/#cors-safelisted-request-header)

如果请求使用除`GET`,`POST`,`HEAD`之外的方法,fetch会自动发送一个预请求,这个预请求会带上字段:

+ `Access-Control-Request-Headers`: 告诉服务器正式请求会带哪些http头

+ `Access-Control-Request-Method`: 告诉服务器正式请求会用哪种http方法

如果跨域请求失败,浏览器会直接报跨域错误,而且跨域错误是浏览器报的js还无法捕捉,在界面上看根本看不出来,因此我们写的前端项目尽量不要搞跨域请求.

而如果预请求被通过了,fetch才会真的发送设定的请求.

#### 服务端针对跨域的设置

服务端需要做两方面工作:

1. 处理预请求
    1. 接收各个URL的`OPTIONS`方法的请求,在其中验证`Origin`,`Access-Control-Request-Headers`,`Access-Control-Request-Method`字段的值是否在自己允许的范围内.
    2. 返回如下header:
         + `Access-Control-Allow-Origin`: 指定可以接收请求来自哪些域,可以使用通配符`*`表示接收任何来源的请求
         + `Access-Control-Allow-Credentials`: 指定当请求的凭证标记为`true`时是否响应该请求.也就是接受不接收请求中带cookie
         + `Access-Control-Allow-Headers`: 指定请求中允许带哪些http头字段.
         + `Access-Control-Allow-Methods`: 指定请求可以使用哪些http方法.
         + `Access-Control-Max-Age`: 指定预请求的结果缓存多久
         + `Vary`: 值为`Origin,Access-Control-Request-Method,Access-Control-Request-Headers`,标明这几个字段的值要缓存.
    3. 返回状态码为`204`(StatusNoContent)

2. 为每个业务响应设置http头

   + `Access-Control-Allow-Origin`: 指定可以接收请求来自哪些域,可以使用通配符`*`表示接收任何来源的请求
   + `Access-Control-Allow-Credentials`: 指定当请求的凭证标记为`true`时是否响应该请求.也就是接受不接收请求中带cookie
   + `Access-Control-Expose-Headers`: 指定哪些http头可以在响应中列出
   + `Vary`: 值为`Origin`,标明要缓存的字段

服务端通常有两种方式来实现上面的工作:

1. 在接口服务外套一层反向代理,在反向代理中设置.比如在nginx中通过如下设置来实现

    ```config
    upstream helloworld {
        server rest-api:4000;
    }

    server {
        listen 8000;  
        server_name localhost;
        location / {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET,POST,PUT,DELETE,OPTIONS';
            add_header 'Access-Control-Allow-Credentials' true;
            add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
            add_header 'Access-Control-Max-Age' 1728000;
            proxy_pass http://helloworld;     #设定代理服务器的协议和地址       }
    }
    ```

2. 在接口服务中通过中间件实现,比较常用的有:
    + golang的gin框架中可以使用[github.com/gin-contrib/cors](https://github.com/gin-contrib/cors)
    + node中的koa框架中可以[koa2-cors](https://github.com/zadzbw/koa2-cors)
    + python中的sanic框架可以使用[sanic-cors](https://github.com/ashleysommer/sanic-cors)

通常开发中接口服务都是在调试阶段才会有跨域问题,因此第二种方式更加常用

#### 附带cookie的跨域请求

值得注意的是`cookie`的跨域发送,默认情况下`cookie`是不跨域发送的,fetch的参数`init`中提供了一个字段`credentials`用于控制cookie的发送.其值可以是:

+ `omit`: 无论请求是否跨域都不发送cookie
+ `same-origin`: 只在请求同源时发送cookie
+ `include`: 无论请求是否跨域都发送cookie

需要注意要使用附带cookie的跨域请求,在服务端的配置中不得设置`Access-Control-Allow-Origin`的值为`*`,我们必须显式的声明允许访问域.

### 完整的跨域访问例子

本文的例子[浏览器环境-浏览器与通信-跨域](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%8E%AF%E5%A2%83-%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%8E%E9%80%9A%E4%BF%A1-%E8%B7%A8%E5%9F%9F)就是借助koa2-cors做的一个支持跨域的服务端.执行这个例子,我们可以看到问题就解决了.
