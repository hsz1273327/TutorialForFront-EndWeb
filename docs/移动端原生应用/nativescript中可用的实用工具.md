# nativescript中可用的实用工具

nativescript的执行环境是基于v8引擎的运行时.因此很尴尬的可以使用的工具既不能调用node专用接口也不能调用浏览器专用接口.这就导致了实际可以使用的工具挺少的.通常只有浏览器环境下的不涉及dom操作的工具库才能在其中使用.如果我们希望可以使用一些基于node标准库的库(比如用到`crypto`的库).

下面我们列出个人总结的可用的实用工具.他们大致分为:

1. 第一类,仅仅只有js逻辑并没有调用标准库或浏览器接口,因此原本就可以直接使用
2. 第二类,有提供浏览器可用版本但不能使用npm安装的,这种就需要自己下载下来浏览器版本放到源码目录下使用.需要注意这类一般都是经过编译混淆压缩后的js文件,也无法通过安装`@types/xxx`来获得类型签名,因此我们只能对照着它的文档写代码,同时要注意自己下载的js文本的版本是否和参考的一致
3. 第三类,专门针对nativescript不同平台原生代码封装而成的工具库
4. 第四类,不同平台有原生实现且不用安装依赖,但并没有封装成统一接口的库

## 全局对象的支持

js用起来最方便的自然是全局对象,但nativescript只有对js全局对象的部分支持,下面是我总结的支持对象

+ Date
+ JSON
+ Worker

## markdown解析

很多时候我们可能需要用webview来展示一些富文本内容,比如用户写的博文呀什么的,这种就比较适合直接从远端获取html数据,但正常用户不会手写html,而markdown又是技术圈中比较通用的文本标记语言,所以一般我们都会用markdown来保存和传输这些富文本信息,到客户端时再本地解析用webview进行渲染.

这种需求我们可以使用[markdown-it](https://markdown-it.github.io/markdown-it/)来满足,它属于*第一类*

```ts
import markdownit from 'markdown-it'
...
const mdcontent = '# markdown-it rulezz!'
const md = markdownit()
const result = md.render(mdcontent)
```

## 序列化工具

序列化工具一般用于数据交换和留存,和web端不太一样,移动端本质上是一个完整应用,数据交互和留存往往更倾向于本地实现而非依赖远端,因此序列化工具就非常重要了

### JSON

序列化工具最常用的当然是js原生支持的`JSON`,在大多数场景下它也足够了

```ts
let json_str = JSON.stringify({a:1,b:2})
console.log(json_str)
console.log(JSON.parse(json_str))
```

### messagepack

messagepack可以看做是字节流版本的`JSON`,接口简单,性能也不错,结构紧凑,大小也比`JSON`小的多,而且不是明文,也就更适合用来和服务端传输信息.

我们可以使用工具[@ygoe/msgpack](https://github.com/ygoe/msgpack.js)来实现对messagepack的序列化和反序列化,它也属于*第一类*工具.

```ts
import * as msgpack from "@ygoe/msgpack"
...
const sourceData = {
    number: 123,
    number2: -0.129,
    text: "Abc with Üñıçôðé and ユニコード",
    flag: true,
    list: [1, 2, 3],
    obj: { a: 1, b: "2", c: false, d: { a: 0, b: -1 } },
    time: Date.now()
}

const bytes = msgpack.serialize(sourceData)
const deserializedData = msgpack.deserialize(bytes)
```

### yaml

yaml和json也是等价的,但更加利于模块化和人工阅读,因此通常用在做为配置文件上.那手机app需不需要配置文件呢?当然是需要了.有不少移动端应用会在服务端通过配置文件控制客户端行为--应用启动时会去服务端拉取配置,然后根据配置初始化全局设置.这种配置往往是人工维护,那用yaml就相对简单了.

我们可以使用[js-yaml](https://github.com/nodeca/js-yaml),它也属于*第一类*工具

```ts
const sourceData = {
    number: 123,
    number2: -0.129,
    text: "Abc with Üñıçôðé and ユニコード",
    flag: true,
    list: [1, 2, 3],
    obj: { a: 1, b: "2", c: false, d: { a: 0, b: -1 } },
    time: Date.now()
}
const conf = yaml.dump(sourceData, {
    'sortKeys': true        // sort object keys
})
const deserializedData = yaml.load(conf)
```

## 数据校验

w3c标准[jsonschema](https://json-schema.org/)是最常用的通用数据申明和校验方案,它可以解析`json`格式的数据,在js下也就是可以用于校验js的object.

我们可以使用[@cfworker/json-schema](https://github.com/cfworker/cfworker/tree/main/packages/json-schema)库来做这个工作,它也是*第一类*工具.

```ts
import { Validator } from '@cfworker/json-schema'
...
// 声明校验数据需要满足的模式
const schema = {
    type: 'object',
    required: ['name', 'email', 'number', 'bool'],
    properties: {
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        number: { type: 'number' },
        bool: { type: 'boolean' }
    }
};
//声明使用的版本
const draft = '2019-09'
//设置错误短路,为true则发现第一个错误就结束校验,为false则会校验获得全部错误
const shortCircuit = false
// 创建校验实例
const validator = new Validator(schema, draft, shortCircuit);

// 参数即为要校验的对象,result即为校验结果
//错误的数据
// const result = validator.validate({
//     name: 'hello',
//     email: 5, // invalid type
//     number: 'Hello', // invalid type
//     bool: 'false' // invalid type
// })
//正确的数据
const result = validator.validate({
    name: 'hello',
    email: "12345@gmail.com", // invalid type
    number: 12, // invalid type
    bool: false // invalid type
})

if (result.valid) {
    // valid为true表示没有校验错误
    await alert("jsonschema check ok")
} else {
    // valid为false表示有校验错误,校验错会被放在errors字段
    const msg = `jsonschema check has error ${JSON.stringify(result.errors, null, 2)}`
    console.log(msg)
    await alert("jsonschema check has error")
}
```

当检测出有问题时,校验不通过的问题会被放在`result.errors`,这是一个`OutputUnit[]`类型的数组数据,满足接口

```ts
interface OutputUnit {
  keyword: string; //出错的关键字(schema中)
  keywordLocation: string; //出错关键字在schema中的位置
  instanceLocation: string; //被校验实例中错误发生的位置
  error: string;//错误信息
}
```

因此你可以很明确的找到出问题的地方

## arraybuffer

移动端是有自己的算力的,如果需要本地进行一些计算很多时候就会用到arraybuffer,在移动端我们就时长需要让原生的arraybuffer和js的arraybuffer类型的数据可以相互转换.
社区提供的针对arraybuffer的帮助工具[@nativescript-community/arraybuffers](https://github.com/nativescript-community/arraybuffers)可以用来干这个.它属于*第三类*工具

## 计算

移动端应用也是可以进行一些本地计算工作的,毕竟现在的移动端算力已经不算低了,唯一要顾虑的可能更多的是发热和对续航的影响.如果是简单的向量计算或统计计算,我们完全可以仅用js包完成,虽然必定效率低,但快速开发还是够用的.我们可以使用库[numjs](https://github.com/nicolaspanel/numjs).这个库基本可以看做是[numpy](https://blog.hszofficial.site/TutorialForPython/#/%E5%9F%BA%E7%A1%80%E5%BA%94%E7%94%A8%E7%AF%87/%E7%AE%80%E5%8D%95%E6%95%B0%E6%8D%AE%E5%A4%84%E7%90%86/%E6%95%B0%E5%80%BC%E6%95%B0%E6%8D%AE%E5%A4%84%E7%90%86/%E4%BD%BF%E7%94%A8numpy%E5%92%8Cscipy%E5%A4%84%E7%90%86%E5%A4%8D%E6%9D%82%E7%9A%84%E6%95%B0%E5%80%BC%E8%AE%A1%E7%AE%97%E9%97%AE%E9%A2%98/README)的js版本,它实现了多维向量,unversal function,线性代数计算,统计计算,fft等主要的numpy计算单元.它属于*第二类*工具,因此需要将其[针对浏览器编译好的js代码](https://cdn.jsdelivr.net/gh/nicolaspanel/numjs@0.16.1/dist/numjs.min.js)下载到`src`目录中通过相对路径(比如我放在根目录中)导入使用

```ts
import * as nj from '../numjs.min.js'
...

const a = nj.random([4,3])
const b = nj.dot(a, a.T)
const msg = `Calcul Check get result with shape ${b.shape}`
```

## 密码学

虽然node和浏览器中现在都已经默认有密码学工具支持了,但很遗憾在nativescript中一个也用不了.尴尬的是我们想退而求其次使用[cryptojs](https://cryptojs.gitbook.io/docs)也不行,它已经不再维护了而且没有实现现代js和ts的模块化.最终我找到了[crypto-es](https://www.npmjs.com/package/crypto-es)这个项目,它实现了`cryptojs`的接口并做了现代js和ts的模块化实现,属于*第一类*工具,亲测可用

```ts
import CryptoES from 'crypto-es'
...

const encrypted = CryptoES.AES.encrypt("Message", "Secret Passphrase");
const decrypted = CryptoES.AES.decrypt(encrypted, "Secret Passphrase");
decrypted.toString(CryptoES.enc.Utf8) == "Message" ? true:false
```

## 网络相关工具

## url解析

url解析可以使用[url-parse](https://www.npmjs.com/package/url-parse),它属于*第一类*,因此可以完美在nativescript中使用.它在涉及到deeplink的场景下非常常用

```ts
import * as urlparse from 'url-parse'
...
const url = urlparse(ul, true)
console.log(`url parsed as ${JSON.stringify(url)}`)
```

### uuid

作为一个很难碰撞的全局唯一id, uuid在各种场景下被广泛使用.可以通过[pure-uuid](https://github.com/rse/pure-uuid)在nativescript下构造uuid.`pure-uuid`属于*第一类*,因此可以完美在nativescript中使用

```ts
import * as UUID from "pure-uuid"
...
const uuid = new UUID(4); //v4
console.log(`gen uuid get ${uuid.format("std")}`)
```

`pure-uuid`支持v1,v3,v4,v53种uuid,支持`std`(标准格式),`b16`(base64编码格式),`z85`(ZeroMQ-Base85编码格式)3种输出格式,调用`format`接口可以将uuid对象转换为对应格式的string类型输出

### jwt解析

作为web环境下最广泛使用的令牌,[jwt](https://datatracker.ietf.org/doc/html/rfc7519)非常重要,不了解的人可以先看下[阮一峰老师的这篇文章有个基本概念](https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html).但通常我们在移动端并不需要生成jwt,最多只要能解析就行.[jwt-decode](https://github.com/auth0/jwt-decode/tree/v3.1.2)就是一个方便我们解析jwt令牌的工具.注意只有`jwt-decode v4`之前的版本可用,因此安装使用`npm install jwt-decode@3.1.2`.`jwt-decode@3.1.2`属于*第一类*,因此可以完美在nativescript中使用

```ts
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

const decoded_header = jwtDecode(token, { header: true });
console.log(`decode jwt header get ${JSON.stringify(decoded_header)}`)
const decoded = jwtDecode(token);
console.log(`decode jwt get ${JSON.stringify(decoded)}`)
```

接口很简单参数带`{ header: true }`解析出jwt令牌的类型和签名算法;不带则解析出内容信息

### base64编解码

base64是web环境下最常用的编解码格式,通常用于传输文件数据.base64的编解码移动端都原生支持,但不同平台实现方式不同.该功能涉及到底层文件的字节信息和文件系统,属于*第四类*.我们要用只能自己封函数.

```ts
import { isAndroid, File, knownFolders, path } from "@nativescript/core"

declare const android: any;
declare const java: any;
declare const NSData: any;
declare const NSUTF8StringEncoding: any;
declare const NSString: any;

function stringToBase64(textString: string): string {
    if (isAndroid) {
        const text = new java.lang.String(textString)
        const data = text.getBytes("UTF-8")
        const base64String = android.util.Base64.encodeToString(data, android.util.Base64.NO_WRAP)
        return base64String
    } else {
        const text = NSString.stringWithString(textString)
        const data = text.dataUsingEncoding(NSUTF8StringEncoding)
        const base64String = data.base64EncodedStringWithOptions(0)
        return base64String
    }
}
async function fileToBase64(filepath: string): Promise<string> {
    const sourceFile = File.fromPath(path.join(knownFolders.currentApp().path, filepath))
    const data = await sourceFile.read();
    if (isAndroid) {
        return android.util.Base64.encodeToString(
            data,
            android.util.Base64.NO_WRAP
        );
    } else {
        return data.base64EncodedStringWithOptions(0);
    }
}

function base64ToString(base64String: string): string {
    if (isAndroid) {
        var data = android.util.Base64.decode(base64String, android.util.Base64.NO_WRAP)
        var decodedString = new java.lang.String(data, java.nio.charset.StandardCharsets.UTF_8)
        return decodedString
    } else {
        const decodedData = NSData.alloc().initWithBase64EncodedStringOptions(base64String, 0)
        const decodedString = NSString.alloc().initWithDataEncoding(decodedData, NSUTF8StringEncoding)
        return decodedString
    }
}


async function base64ToFile(base64String: string, filepath: string): Promise<void> {
    if (isAndroid) {
        const data = android.util.Base64.decode(base64String, android.util.Base64.NO_WRAP)
        const targetFile = File.fromPath(path.join(knownFolders.currentApp().path, filepath))
        await targetFile.write(data);
    } else {
        const data = NSData.alloc().initWithBase64EncodedStringOptions(base64String, 0)
        const targetFile = File.fromPath(path.join(knownFolders.currentApp().path, filepath))
        await targetFile.write(data);
    }
}
```

之后调用上面封装的函数即可.有空我会将它封装成包

```ts
const msg = "a message"
const bstr = stringToBase64(msg)
console.log(`message get base64 string ${bstr}`)
const bmsg = base64ToString(bstr)
console.log(` base64 string to message get ${bmsg}`)
await base64ToFile(bstr, "./mymsg.txt")
console.log(`base64 to file ok`)
const fbstr = await fileToBase64("./mymsg.txt")
const str_match = msg == bmsg ? true : false
const b64_match = fbstr == bstr ? true : false
```