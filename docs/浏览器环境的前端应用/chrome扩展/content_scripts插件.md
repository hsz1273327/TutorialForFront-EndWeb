# content_script插件

一类插件的主要作用是针对特定页面执行特定任务(比如b站的ACG助手).这类插件的核心就是`content_script`.

`content_script`的本质是在本地魔改页面--在特定页面嵌入js脚本和样式表.因此必须声明

+ 脚本和样式表文件在哪里
+ 脚本和样式表要嵌入哪些网站

这也是manifest中需要声明的部分

+ `manifest.json`

```json
{
    "content_scripts": [
        {
            "matches": [ //指定要插入的网址匹配
                "*://*/*"
            ],
            "excludeMatches" : [ //指定要排除的网址匹配
                "*://*/*business*" 
            ],
            "js": [ //指定要插入的js脚本
                "js/content.js" 
            ],
            "css": [  //指定要插入的css样式表
                "my-styles.css"
            ]
        }
    ]
}
```

`content_scripts`插入的js脚本和在html中引入的脚本是一样的可以使用完整的浏览器api操作页面(比如window,document,fetch等),但它的运行是独立的,也就是说即不属于插入的网站也不属于插件,也就不会对插入的网站和其他插件的原有代码造成污染.代价就是它只能和所属插件的service worker通过特定的api进行通信,而网络请求的范围也受限于所属插件在`manifest`中的[web_accessible_resources](https://developer.chrome.com/docs/extensions/reference/manifest/web-accessible-resources?hl=zh-cn#manifest_declaration)声明.

```json
{
    ...
    "web_accessible_resources": [
        {
        "resources": [ "test1.png", "test2.png" ],
        "matches": [ "https://web-accessible-resources-1.glitch.me/*" ]
        }, {
        "resources": [ "test3.png", "test4.png" ],
        "matches": [ "https://web-accessible-resources-2.glitch.me/*" ],
        "use_dynamic_url": true
        }
    ],
    ...
}
```

也就是说`content_script`插入的脚本有如下特点

1. `content_scripts`插入的脚本仅可以修改指定插入的网页
2. `content_scripts`插入的脚本无法覆盖指定插入网页的原有代码
3. `content_scripts`仅可以和所属的插件的`service worker`通信
4. `content_scripts`仅可以访问所属插件在`manifest`中的`web_accessible_resources`声明

## 最基本的脚本嵌入

脚本嵌入最主要的用途就是改变特定网页的行为,这部分我们用一个例子[chrome-ext-cannottouch分支](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/chrome-ext-cannottouch)来演示content_script插件.这个例子我们会让百度的搜索按钮你怎么也点不到.

这个例子其实很简单,我们只针对百度首页,因此设置manifest如下

```json
{
    ...
    "content_scripts": [
        {
            "matches": ["*://www.baidu.com/"],
            "js": ["js/content.js"]
        }
    ]
}
```

之后我们的`content.ts`就直接操作dom就好了

```ts
// 让按钮随机飘动
function btn_move(el: HTMLElement, mouseLeft: number, mouseTop: number) {
    let leftRnd = (Math.random() - 0.5) * 200
    let topRnd = (Math.random() - 0.5) * 20
    let btnLeft = mouseLeft + (leftRnd > 0 ? 100 : -100) + leftRnd
    let btnTop = mouseTop + (topRnd > 0 ? 30 : -30) + topRnd
    btnLeft = btnLeft < 100 ? (btnLeft + window.innerWidth - 200) : (btnLeft > window.innerWidth - 100 ? btnLeft - window.innerWidth + 200 : btnLeft)
    btnTop = btnTop < 100 ? (btnTop + window.innerHeight - 200) : (btnTop > window.innerHeight - 100 ? btnTop - window.innerHeight + 200 : btnTop)
    el.style.position = 'fixed'
    el.style.left = btnLeft + 'px'
    el.style.top = btnTop + 'px'
}
function over_btn(this: HTMLElement, evt: MouseEvent) {
    btn_move(this, evt.clientX, evt.clientY)
}
// 百度的搜索按钮id是`su`
let ele = document.getElementById('su')
console.log(ele.toString())
// 监听到鼠标移动到按钮上时执行,让按钮随机飘动
ele.addEventListener("mouseover", over_btn)
```

## 嵌入脚本与插件通信

嵌入脚本一般情况下会通过`一次性消息`或`长效消息连接`

> 一次性消息方式

**在嵌入脚本中**可以通过`chrome.runtime.onMessage((request: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => void)`监听从插件的service worker中发送过来的一次性消息.如果我们有要应答的消息,可以通过`sendResponse(response)`这个对第三个参数的调用来实现.比较常见的形式如下

```ts
chrome.runtime.onMessage((request: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
    ...
    sendResponse("msg")
    
})
```

**在嵌入脚本中**可以通过`chrome.runtime.sendMessage(message: any, options?: MessageOptions) => Promise<any>)`主动向插件的service worker发送`一次性消息`.它是一个异步操作,我们可以等待它的返回应答.比较常见的形式如下:

```ts
const res = await chrome.runtime.sendMessage("message")
```

而**在插件的service worker中**对应的发送操作在`chrome.tabs`命名空间下,使用`chrome.tabs.sendMessage(tabId: number, message: any, options?: object)=>Promise<any>`向特定的嵌入脚本发送一次性消息方式.一般来说我们在service worker中大概率只会向当前激活在使用的tab对应的嵌入脚本发送消息,因此`tabId`可以通过`chrome.tabs.query`获得,也就是最常见的service worker向当前页的嵌入脚本中发送消息的写法如下

```ts
const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
const tabId=tab.id
const res = await chrome.tabs.sendMessage(tabId, message)
```

**在插件的service worker中**监听嵌入脚本中发送的消息就和别处一样了都是`chrome.runtime.onMessage((request: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => void)`

> 长效消息连接

**在嵌入脚本中**可以通过`chrome.runtime.onConnect`监听从插件的service worker中发送过来的长效消息.
我们需要为这个对象添加监听器,监听的回调参数是`port`,它有又有`port.onDisconnect`,`port.onMessage`两个对象可以添加监听器,并且可以调用`port.postMessage(message: any)`方法向连接的远端发送消息.

一个常见的写法演示如下

```ts
chrome.runtime.onConnect.addListener((port:chrome.runtime.Port) => {
    port.onDisconnect.addListener(function (port: Port){
        ...
        port.postMessage("some msg")
    })
    port.onMessage.addListener(function(message: any, port: chrome.runtime.Port) {
        ...
        port.postMessage("some msg")
    })
    ...
    port.postMessage("some msg")
})
```

**在嵌入脚本中**可以通过`chrome.runtime.connect(extensionId: string,connectInfo?: {includeTlsChannelId?:boolean;name:string;})=>chrome.runtime.Port`主动建立和插件的service worker的连接.在建立好连接后我们可以得到port对象,就像上面`chrome.runtime.onConnect`的监听函数一样,我们也需要对这个port的不同事件进行监听

需要注意由于是从嵌入脚本中向插件建立连接,我们需要带上插件的id,我们可以通过`chrome.runtime.id`来获取插件id,也就是写起来如下

```ts
const port = chrome.runtime.connect(chrome.runtime.id, {name: "con1"})
port.onDisconnect.addListener(function (port: Port){
    ...
    port.postMessage("some msg")
})
port.onMessage.addListener(function(msg) {  
    ...
    port.postMessage("some msg")
})
...
port.postMessage("some msg") // 发送消息
```

而**在插件的service worker中**对应的长效连接建立操作也在`chrome.tabs`命名空间下,使用`chrome.tabs.connect(tabId: number, connectInfo?: {includeTlsChannelId?:boolean;name:string;})=>chrome.runtime.Port`和特定的嵌入脚本建立长效连接.一般来说我们在service worker中大概率只会向当前激活在使用的tab对应的嵌入脚本发送消息,因此`tabId`可以通过`chrome.tabs.query`获得,也就是最常见的service worker向当前页的嵌入脚本中发送消息的写法如下

```ts
const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
const tabId=tab.id
const port = await chrome.tabs.connect(tabId, {name: "con1"})

port.onDisconnect.addListener(function (port: Port){
    ...
    port.postMessage("some msg")
})
port.onMessage.addListener(function(msg) {  
    ...
    port.postMessage("some msg")
})
...
port.postMessage("some msg") // 发送消息
```

**在插件的service worker中**监听嵌入脚本中建立的长效连接和上面在嵌入脚本中的就一样了

当然了另一个通信方式是借助`chrome.storage`.这与其说是通信不如说是共享信息.但无论如何在嵌入脚本中是可以正常使用`chrome.storage`的.

我们的例子[chrome-ext-tts分支](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/chrome-ext-tts)中演示了如何在嵌入脚本和插件的service worker间通信.这个例子我们可以通过command发起对页面上选中的文案的阅读操作.而service worker是不能直接操作页面dom的,因此我们就需要针对所有页面嵌入一个脚本,让这个脚本捕获页面上选中的数据,然后通过消息机制传回给service worker执行tts

在这个例子中,我们要为所有页面嵌入脚本,因此`manifest`写成下面这样

+ `manifest.json`

    ```json
    {
        ...
        "content_scripts": [
            {
                "matches": [
                    "*://*/*"
                ],
                "js": [
                    "js/content.js"
                ]
            }
        ],
        ...
    }
    ```

嵌入的脚本则仅完成监听`speak`指令的操作,当收到`speak`指令后获取当前选中的文案并返回给service worker

+ `content.ts`

    ```ts
    chrome.runtime.onMessage.addListener((request: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
        console.log(`get cmd ${request}`)
        if (request === "speak") {
            let selection = window.getSelection();
            console.log(`get message ${selection.toString()}`)
            console.log(`get message ${selection.toString()}`)
            sendResponse(selection.toString())
        }
    })
    ```

在service worker中我们则是在收到command后就向当前页面发起一个speak的message触发获取选中文案,获取到文案后调用tts读出来

+ `background.ts`

    ```ts
    ...
    chrome.commands.onCommand.addListener(async (command) => {
        console.log(`Command: ${command}`)
        if (command == "run-speak") {
            const [tab]= await chrome.tabs.query({ active: true, lastFocusedWindow: true })
            console.log(`Command: ${command} tabid: ${tab.id}`)
            const message = await chrome.tabs.sendMessage(tab.id, "speak")
            const DefaultVoiceInStorage = await chrome.storage.local.get(DEFAULT_VOICE_KEY)
            let voice_name: string | undefined = DefaultVoiceInStorage[DEFAULT_VOICE_KEY]
            if (message){
                await speak(message, voice_name)
            }
        }
    })
    ```

## 动态嵌入脚本

以上是content_scripts的静态用法,一些时候我们希望在运行时动态的给页面插入脚本.那就是另一套写法了.

动态嵌入脚本分两种:

+ 声明式嵌入脚本,在service worker中通过接口声明待嵌入的网页和对应嵌入的脚本,一般针对需要动态嵌入,动态更新,动态移除嵌入脚本的场景
+ 编程式嵌入脚本,在service worker中通过接口直接嵌入脚本到对应页面,一般针对需要为响应事件或特定事件而运行的脚本嵌入的场景

两种方式都需要使用到命名空间[chrome.scripting](https://developer.chrome.com/docs/extensions/reference/api/scripting?hl=zh-cn),因此都需要权限`scripting`

```json

```json
{
    ...
    "permissions": [
        "scripting"
    ],
    ...
}
```

### 声明式嵌入脚本

声明式嵌入脚本仅仅是将嵌入脚本的声明放到了service worker中,它依然是注册机制,

+ 注册嵌入脚本,使用接口`chrome.scripting.registerContentScripts(scripts: RegisteredContentScript[])=>Promise<void>`,其中`RegisteredContentScript`接口如下

    ```ts
    interface RegisteredContentScript{
        id :string;// 指定插入脚本的插入id
        matches ?: string[]; // 要插入的url匹配
        excludeMatches ?: string[]; // 排除的url匹配
        css ?: string[];// 指定插入的css文件位置
        js ?: string[]; //指定插入的js文件位置
        allFrames ?: boolean;// 是否在所有帧中都插入,否则仅会在顶部帧插入
        matchOriginAsFallback ?: boolean;// 指示是否可以将脚本注入到URL包含不受支持方案的帧中;具体来说指`数据`,`blob`,或`文件系统`等.在这些情况下会检查URL的来源以确定是否应该注入脚本.
        persistAcrossSessions ?: boolean optional; //默认true,指定此内容脚本是否将持续到未来的会话中
        runAt ?: "document_start" | "document_end" | "document_idle"; //默认`document_idle`,指定插入脚本的执行时机
        world ?: "ISOLATED" | "MAIN"; // 默认`ISOLATED`,指定嵌入脚本的执行空间
    }
    ```

    可以看到动态的生命石嵌入脚本可以做更加细致的设置.

+ 获取嵌入脚本,使用接口`chrome.scripting.getRegisteredContentScripts(filter?: ContentScriptFilter)=>Promise<RegisteredContentScript[]>`.其中`ContentScriptFilter`接口如下:

    ```ts
    interface ContentScriptFilter{
        ids: string[];// 指定要筛选出的id
    }
    ```

+ 更新嵌入脚本,使用接口`chrome.scripting.updateContentScripts(scripts: RegisteredContentScript[])=>Promise<void>`

+ 移除嵌入脚本,使用接口`chrome.scripting.unregisterContentScripts(filter?: ContentScriptFilter)=>Promise<void>`,如果指定filter则仅取消注册与过滤条件匹配的动态内容脚本;否则该扩展程序的所有动态内容脚本都会被取消注册

### 编程式嵌入脚本

编程式嵌入脚本一般都是针对特定tab(尤其是当前激活的tab)进行动态嵌入的.因此一般都需要权限`activeTab`和`tab`权限

```json
{
    "permissions": [
        "tabs",
        "activeTab",
        "scripting"
    ],
}
```

动态嵌入脚本使用接口`chrome.scripting.executeScript(injection: ScriptInjection)=>Promise< InjectionResult[]>`其中`ScriptInjection`接口如下:

```ts
interface ScriptInjection{
    func ?: Function;// 嵌入的函数
    args ?: any[]; //调用嵌入函数的参数
    files ?: string[];// 指定文件进行嵌入
    injectImmediately ?: boolean; //设置是否立即执行嵌入
    target : { //指定插入的位置
        allFrames ?: boolean;//是否插入全部帧
        documentIds ?: string[];//不能与frameIds共存,指定插入的document
        frameIds ?: number[]; //指定插入的帧
        tabId :number;//指定插入的tab
    }
    world ?: "ISOLATED" | "MAIN"; // 默认`ISOLATED`,指定嵌入脚本的执行空间
}
```