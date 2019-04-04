
# AJAX

jQuery操作ajax是很方便的,主要的方法只有这么几个:


+ `.ajax(url, settings)`|通用的ajax方法,settings有如下选项

    + async：是否异步执行AJAX请求，默认为true，千万不要指定为false
    + method：发送的Method，缺省为'GET'，可指定为'POST'、'PUT'等
    + contentType：发送POST请求的格式，默认值为'application/x-www-form-urlencoded; charset=UTF-8'，也可以指定为text/plain、application/json;
    + data：发送的数据，可以是字符串、数组或object。如果是GET请求，data将被转换成query附加到URL上，如果是POST请求，根据contentType把data序列化成合适的格式；
    + headers：发送的额外的HTTP头，必须是一个object；
    + dataType：接收的数据格式，可以指定为'html'、'xml'、'json'、'text'等，缺省情况下根据响应的Content-Type猜测。

+ `.get(url,setting)`|第二个参数如果是object，jQuery自动把它变成query string然后加到URL后面,变成?xxx=xxx&xxx=xxx

+ `.post(url,setting)`|post()和get()类似，但是传入的第二个参数默认被序列化为application/x-www-form-urlencoded,比如name=Bob%20Lee&check=1作为POST的body被发送

+ `getJSON(url,setting)`|通过GET获取一个JSON对象

回调函数处理:

方法|说明
---|---
.done(func)|成功收到数据
.fail(func)|失败
always(func)|无论成功失败
