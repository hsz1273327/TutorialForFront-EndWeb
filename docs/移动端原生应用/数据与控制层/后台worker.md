# 后台worker

如果我们的应用需要一个额外线程用于处理一些比较重的任务,在浏览器环境下我们可以用[webworker](https://blog.hszofficial.site/TutorialForFront-EndWeb/#/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%8E%AF%E5%A2%83%E7%9A%84%E5%89%8D%E7%AB%AF%E5%BA%94%E7%94%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%E8%B0%83%E7%94%A8%E6%9C%AC%E5%9C%B0%E8%B5%84%E6%BA%90/%E4%BD%BF%E7%94%A8%E6%9C%AC%E5%9C%B0%E5%A4%9A%E7%BA%BF%E7%A8%8B%E8%B5%84%E6%BA%90).移动端应用作为一个客户端应用,额外线程自然更应该支持.nativescript提供了`webworker`的nativescript版本,其接口在`golabl`下和`webworker`基本一致,只是有如下限制:

1. 没有`JavaScript memory sharing`,没有`ArrayBuffer`和`MessagePort`仅支持通过`postMessage()`传递可以被`JSON`序列化的对象在线程间交互
2. worker不能嵌套

但整体用起来还是差不多的.

## worker脚本定义

通常我们会将worker模块放在和`app.ts`同级,也就是如下这样的结构

```bash
src\
    |---app.ts   # 入口
    |---app.css  # 主样式表
    |---utils.ts # 通用工具文件,放置比如交互提示这类工具的操作实例
    |---workers\  # 定义worker
    |          |---myworker.ts
    |
    |---fonts\   # 存放字体文件
    |---assets\  # 存放图片等资源
    |---views\   # views中仅放一个入口的根vue文件
    |        |---Root.vue
    |
    |---pages\   # 存放页面组件,页面组件全部以`Page`标签作为最顶层的标签,每个页面组件都被注册到router中
    |        |---PageA.vue
    |        |---PageB.vue
    |        ...
    |
    |---components\   # 存放公用组件
    |             |---ComponentA.vue
    |             |---ComponentB.vue
    |             ...
    |
    |---models\    # 存放数据模型,比如本地sqlite访问逻辑等
    |
    |---router\    # 存放路由注册信息
    |         |---index.ts

```

worker脚本中使用`self`对象管理和主线程间的通讯,接口包括

+ `self.onmessage:(evt)=>void`,监听主线程调用`worker.postMessage(data)`接口传来的消息,`evt.data`就是主进程传来的数据
+ `self.postMessage(data)`,向主线程发送消息
+ `self.onerror:(error: Error)=> boolean`,监听本线程内发生的未捕获异常,如果返回`true`则消息不会传播到主线程上,否则就可以被主线程中的`worker.onerror`捕获,
+ `self.onclose:()=>void`,监听本线程的关闭操作,一般用于回收资源
+ `self.close()`,在下一次运行循环时终止本线程的执行

除此以外,如果我们需要用到nativescript的golbal中绑定的东西,比如`setTimeout`,`setInterval`等,我们还需要在worker中导入`import '@nativescript/core/globals'`

worker中自然是可以使用各种第三方库的,我们可以将比较重的网络请求,定时任务,文件读写操作,本地计算等任务都放worker里,这样主线程就只管展示逻辑了从而实现了对多核的利用以及应用的分层解耦.

## worker脚本调用

worker脚本仅能在主线程中调用,用worker通常都会配合状态管理工具.在状态管理组件中封装worker操作.因此通常worker也是专项专用的,会配合数据模型做整合拆分.

在主线程中要启动一个worker线程只要实例化一个`Worker`类即可,而实例化时的参数就是这个worker文件的位置.

```ts
const myWorker = new Worker("../workers/myworker.ts")
```

在启动woker后一定要记得在程序被干掉前调用`myWorker.terminate()`接口关闭线程.

类似worker,主线程和worker通信也是类似的几个接口

+ `myWorker.onmessage:(evt)=>void`,监听worker线程调用`self.postMessage(data)`接口传来的消息,`evt.data`就是主进程传来的数据
+ `myWorker.postMessage(data)`,向worker线程发送消息
+ `myWorker.onerror:(error: Error)=> void`,监听worker本线程内发生的未捕获异常

由于需要在应用退出时结束worker线程,通常我们需要利用到应用的状态监听,通过封装一个关闭程序,在监听到`exit`状态时调用它以实现关闭worker线程.

```ts
...
export function CloseWorker() {
    myWorker.terminate()
}
```

```ts
...
Application.on("exit", (args: ApplicationEventData) => {
    CloseWorker()
})
...
```

通常worker和主线程间通信会以事件的形式进行,一般以如下结构传输数据触发操作

```ts
interface EventMessage{
    event: string;
    payload: string|number|array|object
}
```

其中`event`用于确定执行的操作,而`payload`则是作为操作的参数.

worker一般是执行方,主线程往往是发起方,因此我们一般会把在主线程发起操作的东西封装为接口方便外部调用

```ts
export function StartSendInterval(interval:number) {
    myWorker.postMessage({ "event": "start","payload": interval})
}
```

而在worker中`self.postMessage()`则通常在执行好后用于传回结果.

无论在哪种情况下,通常事件不会只有一种,最适合的就是在`onmessage`中使用`switch...case...`语法辨别`event`做分流处理.

```ts
self.onmessage = (evt) => {
    console.log('Message received from the main thread.')
    const data = evt.data // data from myMessage
    switch (data.event) {
        case "start":
            {
                console.log(`received start event`)
                interval_task_id = setInterval(()=>{
                    self.postMessage({ "event": "update_ts_result","payload": (new Date()).getTime() })
                    console.log(`send message to main`)
                },data.payload)
            }
            break;
        default:
            {
                console.log(`received unknown event ${data.event}`)
            }
            break;
    }
}
```

## 例子

我们修改helloworld例子到[native-helloworld-worker分支](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/native-helloworld-worker),这个例子在home页面顶部会展示通过worker定时传回的当前时间.

+ `workers/myworker.ts`,用于定义worker线程行为

    ```ts
    // 这个worker用于

    // load NativeScript globals in the worker thread
    import '@nativescript/core/globals'

    let interval_task_id = null

    self.onmessage = (evt) => {
        console.log('Message received from the main thread.')
        const data = evt.data // data from myMessage
        switch (data.event) {
            case "start":
                {
                    console.log(`received start event`)
                    interval_task_id = setInterval(()=>{
                        self.postMessage({ "event": "update_ts_result","payload": (new Date()).getTime() })
                        console.log(`send message to main`)
                    },data.payload)
                }
                break;
            default:
                {
                    console.log(`received unknown event ${data.event}`)
                }
                break;
        }
    }

    self.onclose = () => {
        if (interval_task_id){
            clearInterval(interval_task_id)
            console.log('close interval_task')
        }
        console.log('close ok')
    }

    self.onerror = (evt): boolean => {
        return true
    }
    ```

+ `store/time.ts`,用于和worker交互并提供当前时间的状态

    ```ts
    import { defineStore } from 'pinia'
    import { ref, computed } from 'nativescript-vue';
    const myWorker = new Worker("../workers/myworker.ts")

    export function CloseWorker() {
        myWorker.terminate()
    }
    export function StartSendInterval(interval: number) {
        myWorker.postMessage({ "event": "start", "payload": interval })
    }

    export const useTimeStore = defineStore('time', () => {
        const nowTime = ref(new Date())
        const nowLocalTime = computed(() => nowTime.value.toLocaleString())
        const nowUTCTime = computed(() => nowTime.value.toUTCString())
        function update(ts: number) {
            nowTime.value = new Date(ts)
        }
        myWorker.onmessage = (evt) => {
            console.log(`get message ${JSON.stringify(evt.data)} from worker`)
            if (evt.data.event == 'update_ts_result') {
                update(evt.data.payload)
                console.log(`update nowTime ok`)
            }
        }
        return { nowTime, nowLocalTime, nowUTCTime, update }
    })
    ```

+ 修改`app.ts`,在合适的应用状态时启动或关闭worker

    ```ts
    ...
    import { CloseWorker, StartSendInterval } from "./store/time"
    ...
    Application.on("displayed", (args: ApplicationEventData) => {
        console.log("*************displayed")
        StartSendInterval(1000)
        console.log("*************displayed ok")
    })
    Application.on("exit", (args: ApplicationEventData) => {
        console.log("*************exiting")
        CloseWorker()
        console.log("*************exit ok")
    })
    ...
    createApp(Home).use(createPinia()).use(router).start();
    ```

+ 修改`views/Home.vue`,增加展示时间的位置

    ```vue
    <template>
    <Page>
        <ActionBar :title="nowLocalTime" />
        ...
    </Page>
    </template>

    <script lang="ts" setup>
    ...
    import { storeToRefs } from 'pinia'
    import { useTimeStore } from '../store/time'

    const time_store = useTimeStore()
    const { nowLocalTime } = storeToRefs(time_store)
    ...
    </script>
    ```