# chrome提供的功能接口

chrome提供了插件专用接口--全局的`chrome`对象.它主要就是在`service worker`,`popup页面`和`option页面`中使用,主要的功能包括

+ 访问和控制插件自身的组件
+ 访问和操作浏览器组件
+ 消息传递
+ 调用专用存储
+ 访问调用本地硬件

这个对象我们可以通过安装`@types/chrome`来获得它的类型信息.

```bash
npm install --save-dev @types/chrome
```

## 声明service worker

要时候`service worker`首先需要在`manifest`中做对应的声明.主要是要声明脚本位置和加载方式

```json
{
    "background": {
        "service_worker": "js/background.js", //后台脚本位置
        "type": "module" //加载方式,通常固定是module
    },
}
```

## 权限

chrome的浏览器的接口很丰富,但和移动平台类似,很多接口需要声明权限才可以使用.我们在`manifest`中声明`permissions`字段就可以声明权限.

```json
{
    ...
    "permissions": [
        "notifications"
    ]
}
```

插件一般是发布在谷歌的插件市场中,而插件市场是需要做监管的,因此我们可以理解为声明权限是为了让谷歌方便监管.

## 访问和控制插件自身的组件

访问和控制插件自身的组件并不需要申明权限.前面我们总结过,插件自身的组件主要都在`chrome.action`对象中

+ 插件图标,设置图标对应接口为`chrome.action.setIcon({ path: { '19': 'images/icon19_' + index + '.png' } })`

+ 插件标题,设置标题对应接口为`chrome.action.setTitle({title: 'This is a new title'})`

+ 图标badge,设置badge的底色对应接口为`chrome.action.setBadgeBackgroundColor({color: '#0000FF'}): Promise<void>`;设置badge的文字内容对应接口为`chrome.browserAction.setBadgeText({text: 'Dog'}): Promise<void>`

要使用这个接口需要在manifest中设置`action`字段,注意图标等是单独设置的不与外部的对应字段有关

```json
{
    "icons": {
        "16": "images/icon16.png"
    },
    ...
    "action": {
        "default_icon": {
            "16": "images/icon16.png"
        },
        "default_title": "Click Me",   // optional, shown in tooltip
    },
    ...
}
```

这部分我们在上一个例子[chrome-ext-stock_trace](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/chrome-ext-stock_trace)中已经有演示

这个例子中我们会将记录监控的股票个数放在插件底部

```ts
async function gotoSinaFinance(symbol: string): Promise<void> {
    ...
    const historySymbolsCount = historySymbols.length
    await chrome.action.setBadgeText({ text: `${historySymbolsCount}` })
}
```

## 访问和操作浏览器组件

访问和操作浏览器组件多数都需要申明权限,主要包括

### Omnibox

即搜索栏关键字,是chrome插件3种无界面交互方式之一,

Omnibox不需要额外权限声明,但需要用设置字段`omnibox`,用法是

1. 在`manifest`的`omnibox`中设置好`keyword`

    ```json
    {
        ...
        "omnibox": {
            "keyword": "usd"
        },
        ...
    }
    ```

2. 在`service worker`中使用接口`chrome.omnibox`设置`omnibox`

    ```ts
    chrome.omnibox.setDefaultSuggestion({ 'description': 'Find current USD price.' }); //设置默认推荐文案
    chrome.omnibox.onInputChanged.addListener(updateAmount); //输入变化的回调
    chrome.omnibox.onInputEntered.addListener(gotoYahoo); //回车的回调
    ```

这部分我们在例子[chrome-ext-stock_trace](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/chrome-ext-stock_trace)中已经有演示.在这个例子中我们定义了监控的关键字为`stock`,并定义了默认推荐文案和监听回车事件

```ts
async function gotoSinaFinance(symbol: string): Promise<void> {
    ...
}
...
chrome.omnibox.setDefaultSuggestion(
    {
        description: 'Find current stock information.'
    }
)
chrome.omnibox.onInputEntered.addListener(gotoSinaFinance)
```

### 右键菜单

右键菜单是chrome插件3种无界面交互方式中的第二种,我们可以定义右键菜单来完成交互,允许我们利用页面内容作为输入实现特定功能.我们的例子在[chrome-ext-tts分支](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/chrome-ext-tts)中就有相关应用

需要权限`contextMenus`,接口为`chrome.contextMenus`

```json
{
    ...
    "permissions": [
        "contextMenus"
    ]
}
```

通常用`chrome.contextMenus.create(createProperties: CreateProperties)`函数构造右键菜单选项以扩展右键菜单,其中`CreateProperties`接口满足

```ts
//点击后捕获的内容,可选的有"all"(全部),"page"(页面),"frame"(帧),"selection"(选中的内容),"link"(链接),
// "editable"(可编辑内容),"image"(图片),"video"(视频),"audio"(音频),"launcher"(启动器),"browser_action"(浏览器行为),
// "page_action"(页面行为),"action"(所有行为)
type ContextType = "all" | "page" | "frame" | "selection" | "link" | "editable" | "image" | "video" | "audio" | "launcher" | "browser_action" | "page_action" | "action"

interface CreateProperties{
    type ?: "normal" | "checkbox" | "radio" | "separator"; //枚举`ItemType`, 选单的样式类型.有"normal"(按钮),"checkbox"(复选框),"radio"(单选框),"separator"(分割线)
    checked ?:boolean; // 在type为"checkbox"(复选框),"radio"(单选框)时生效,指定是否被选中
    contexts ?: [ContextType, ...ContextType[]]; //指定点击事件捕获的内容,默认为'page'
    documentUrlPatterns ?: string[]; //选项限制为仅适用于URL与给定模式之一匹配的文档或框架
    enabled ?: boolean; // 选项是否可用,默认为`true`
    id ?: string;// 选项的唯一id
    parentId ?: string | number;//父级选项的id
    targetUrlPatterns ?: string[]; //与documentUrlPatterns类似，过滤器基于img、音频和视频标签的src属性以及标签的href属性
    title ?:string; //选项展示的文案
    visible ?:boolean; //选项是否可见
}
```

然后我们需要对右键菜单的点击事件进行监听.

```ts
chrome.contextMenus.onClicked.addListener(callback)
```

在例子中我们定义了一个叫`读出来`的右键菜单,它会将选中的部分作为内容分发给点击事件以供监听

```ts
chrome.contextMenus.create({
    'type': 'normal',
    'title': "读出来",// 菜单栏中的标题,type为`separator`时不要填
    //点击后捕获的内容,可选的有"all"(全部),"page"(页面),"frame"(帧),"selection"(选中的内容),"link"(链接),
    // "editable"(可编辑内容),"image"(图片),"video"(视频),"audio"(音频),"launcher"(启动器),"browser_action"(浏览器行为),
    // "page_action"(页面行为),"action"(所有行为)
    'contexts': ['selection'], 
    'id': "speak", // 唯一id
})
```

然后监听右键菜单的点击事件来执行回调

```ts
// Open a new search tab when the user clicks a context menu
chrome.contextMenus.onClicked.addListener(async (item: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) => {
    const tld = item.menuItemId
    if (tld == "speak") {
        // 获取默认声音
        const DefaultVoiceInStorage = await chrome.storage.local.get(DEFAULT_VOICE_KEY)
        let voice_name: string | undefined = DefaultVoiceInStorage[DEFAULT_VOICE_KEY]
        await speak(item.selectionText, voice_name)
    }
})
```

在这个回调中我们可以从参数`item.menuItemId`中对触发的右键菜单进行行为筛选,然后通过`item.selectionText`获取选中部分的文本

### commands

不需要额外权限声明,但需要用设置字段`commands`,我们的例子[chrome-ext-tts分支](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/chrome-ext-tts)中就有相关应用,它接收命令`ALT+T`来让chrome读出页面上选中的文字.

1. 在`manifest`的`command`中设置好命名和组合键设置

    ```json
    {
        ...
        "commands": {
            "run-speak": {
                "suggested_key": {
                    "default": "Alt+T",
                    "mac": "Alt+T"
                },
                "description": "Run \"speak\" on the current page."
            }
        },
        ...
    }
    ```

2. 在`service worker`中使用接口`chrome.commands`设置`触发后的回调`

    ```ts
    ...
    chrome.commands.onCommand.addListener(async (command) => {
        console.log(`Command: ${command}`)
        if (command == "run-speak") {
            ...
        }
    })
    ```

`command`支持的按键包括:

+ 字母键即`A`至`Z`
+ 数字键`0`至`9`
+ 标准键字符串,包括:
    + 常规:`Comma`,`Period`,`Home`,`End`,`PageUp`,`PageDown`,`Space`,`Insert`,`Delete`
    + 箭头键:`Up`,`Down`,`Left`,`Right`
    + 媒体键:`MediaNextTrack`,`MediaPlayPause`,`MediaPrevTrack`,`MediaStop`
+ 辅助键字符串,即`Ctrl`,`Alt`(macOS上为`Option`),`Shift`,`MacCtrl`(仅限macOS),`Command`(仅限macOS),`Search`(仅限ChromeOS)

`command`组合键组合的要求包括:

+ 扩展程序命令快捷方式必须包含`Ctrl`或`Alt`
+ 修饰符不能与媒体键结合使用:在macOS上
    + `Ctrl`会自动转换为`Command`,如需在macOS上使用`Ctrl`键,请在定义"mac"时将`Ctrl`替换为`MacCtrl`.
    + 将`MacCtrl`与其他平台组合使用会导致验证错误并阻止安装扩展程序
+ `Shift`是所有平台上的可选修饰符
+ `Search`是ChromeOS专用的可选修饰符
+ 某些操作系统和`Chrome`快捷方式始终优先于扩展程序命令快捷键且无法替换

### 标签

标签也就是浏览器中存放网页的容器.我们在`manifest`中声明`tabs`就可以声明权限.

```json
{
    ...
    "permissions": [
        "tabs"
    ]
}
```

之后就可以在`service worker`中通过[chrome.tabs](https://developer.chrome.com/docs/extensions/reference/api/tabs)和[chrome.windows](https://developer.chrome.com/docs/extensions/reference/api/windows)对象操作标签和窗口了.

如果我们要创建一个tab来访问一个外网url,我们还需要在`manifest`中额外声明`host_permissions`字段列出要访问的url

```json
{
    ...
    "host_permissions": [
        "http://*/*",
        "https://*/*"
    ],
}
```

如果要操作当前激活状态的tab,则我们还需要在`manifest`中额外声明`activeTab`就可以声明权限.

```json
{
    ...
    "permissions": [
        "activeTab"
    ],
    ...
}

```

chrome中的标签结构对象如下:

```ts
interface Tab {
    active: boolean; //是否是当前窗口中的活动页
    audible ?:boolean; //标签在过去几秒钟内是否发出声音（但如果也静音，可能听不见）
    autoDiscardable : boolean; //资源不足时浏览器是否可以自动丢弃该tab
    discarded : boolean; //tab是否被丢弃。丢弃的tab是指其内容已从内存中卸载，但仍在tab条中可见的tab。其内容将在下次激活时重新加载
    favIconUrl ?: string; //favicon的url
    groupId : number; //tab组的id
    height ?: number; //tab高度
    highlighted : boolean; //tab是否被高亮
    id ?: number; //tab的id
    incognito: boolean; //tab是否位于隐身窗口中
    index: number; //tab在window中的顺序
    lastAccessed: number; //上次被访问的毫秒级时间戳
    mutedInfo ?: { //interface为`MutedInfo`
        extensionId ?: string;// 更改静音状态的扩展的ID.如果上次更改静音状态的原因不是扩展名则没有值
        muted: boolean; //tab是否静音(阻止播放声音).即使tab尚未播放或当前未播放声音,也可能会将其静音
        reason: "user" | "capture" | "extension"; //枚举`MutedInfoReason` 静音的原因
    }; //tab的静音状态和上次状态更改的原因。
    openerTabId ?:number; // 打开这个tab的tab的id
    pendingUrl ?: string; // tab导航到的url
    pinned: boolean; // tab是否被固定
    sessionId ?: string; // 用于唯一标识从会话API获取的tab的会话ID
    status ?: "unloaded" | "loading" | "complete"; // 枚举`TabStatus`, tab的加载状态
    title ?:string; // tab的标题
    url ?: string;// tab主框架的最后一个提交的URL.
    width ?: number; // tab宽度
    windowId : number; // tab所属window的id
}
```

#### 获取标签

获取已经打开的标签有3种方式:

+ `chrome.tabs.get(tabId)=>Promise<Tab>`通过id获取tab对象

+ `chrome.tabs.getCurrent()=>Promise<Tab>`获取当前使用的tab(注意,操作当前活动tab需要`activeTab`权限)

+ `chrome.tabs.query(option)=>Promise<Tab[]>`通过option对象中的内容找到匹配的tab

    query方法可以指定option如下:

    ```ts
    interface queryInfo{
        active ?:boolean; //查找的tab是否是激活状态
        audible ?:boolean; //查找的tab是否可以发出声音（但如果也静音，可能听不见）
        autoDiscardable ?: boolean; //查找的tab是否在资源不足时浏览器可以自动丢弃
        currentWindow ?: boolean;// 查找的tab是否在当前的window中
        discarded ?: boolean;// 查找的tab是否被丢弃
        groupId ?: number; //查找的tab有指定的groupId
        highlighted ?:boolean;//查找的tab是否是高亮的
        index ?: number; //查找的tab在window中的顺序
        lastFocusedWindow ?:boolean; //查找的tab是否在最后关注的window中
        muted ?: boolean;// 查找的tab是否被静音
        pinned ?: boolean; // 查找的tab是否被固定
        status ?: "unloaded" | "loading" | "complete"; // 枚举`TabStatus`, 查找的tab的加载状态
        title ?:string; // 查找的tab的标题
        url ?: string | string[];// 查找的tab指向的URL匹配对应的URL
        windowId ?: number; // 查找的tab所属window的id
        windowType ?: "normal" | "popup" | "panel" | "app" | "devtools"// 枚举`WindowType`,查找的tab所属window的类型
    }
    ```

#### 创建标签

创建标签有2种方式:

+ `chrome.tabs.create(opt:createProperties)=>Promise<Tab>`创建标签,接收的参数满足接口

    ```ts
    interface createProperties{
        active ?: boolean; // 创建出来的tab是否处于激活状态,默认为true
        index ?: number; // 指定创建出来的tab在window中的位置,
        openerTabId ?: number; // 指定打开这个新建tab的tab的id
        pinned ?: boolean; // 指定打开的tab是否要固定
        url ?: string;// 指定开发tab要访问的url
        windowId ?: number;//指定创建tab的window
    }
    ```

+ `chrome.tabs.duplicate(tabId:number)=>Promise<Tab>`复制标签

#### 更新标签

更新标签有2个相关的操作

+ `chrome.tabs.update(tabId?:number, opt:updateProperties)=>Promise<Tab>`更新标签,更新标签时也可以不指定`tabId`,此时会更改当前窗口的活动标签.接收的opt参数满足接口

    ```ts
    interface updateProperties{
        active ?: boolean; // 更新出来的tab是否处于激活状态,默认为true
        autoDiscardable ?: boolean;// 更新出来的tab是否在资源不足时浏览器可以自动丢弃
        highlighted ?: boolean;//更新出来的tab是否高亮
        muted ?: boolean;// 指定更新出来的tab是否被静音
        openerTabId ?: number; // 指定更新出来的tab的tab的id
        pinned ?: boolean; // 更新出来的tab是否要固定
        url ?: string;// 更新出来的tab要访问的url
    }
    ```

+ `chrome.tabs.reload(tabId?:number, opt?:updateProperties)=>Promise<Tab>`重载标签,和update一样可以不指定`tabId`,此时会更改当前窗口的活动标签.接收的opt参数满足接口

    ```ts
    interface reloadProperties{
        bypassCache ?: boolean; // 更新出来的tab是否处于激活状态,默认为false
    }
    ```

    浏览器通常会对一些静态资源进行缓存,JavaScript中的location.reload()方法通常无法实现强制刷新,此时上面的方法就会很好地解决这个问题.这都靠`bypassCache: true`这一设置

#### 移动标签

将标签移动到特定位置(在浏览器窗口中的顺序)

+ `chrome.tabs.move(tabIds: number | number[], opt:moveProperties)=>Promise< Tab | Tab[] >`

其中tabIds可以是一个数字型的标签id也可以是一个包含多个标签id的数组.返回的tabs可能是标签对象也可能是包含多个标签对象的数组.如果指定的`index`为`-1`会将标签移动到指定窗口的最后面.

#### 移除标签

+ `chrome.tabs.remove( tabIds: number | number[])=>Promise< void >`

其中tabIds可以是一个数字型的标签id,也可以是一个包含多个标签id的数组.

#### 获取页面语言信息

+ `chrome.tabs.detectLanguage(tabId?: number)=>Promise< string >`

如果不指定tabId则返回当前窗口当前标签的语言.当await它时获得返回值是[ISO language code](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes)

#### 页面截取

+ `chrome.tabs.captureVisibleTab(windowId?: number,options?: ImageDetails)=>Promise<string>`获取指定窗口活动标签可见部分的截图.(注意,操作当前活动tab需要`activeTab`权限).其中`windowId`可以不填,则会从当前window获取截图.选项参数`options`满足接口`ImageDetails`

    ```ts
    interface ImageDetails {
        format ?: "jpeg" | "png" ; // 默认"jpeg",指定保存的图像编码格式
        quality ?: number; //图片质量,仅在`format`为`jpeg`时有效,取值范围为`0~100`数值越高图片质量越好,体积也越大
    }
    ```

### 书签

Chrome为开发者提供了添加,分类(书签文件夹)和排序等方法来操作书签,同时也提供了读取书签的方法.

要操作书签需要权限`bookmarks`,之后就可以在`service worker`中通过[chrome.bookmarks](https://developer.chrome.com/docs/extensions/reference/api/bookmarks)对象操作标签了.

### 历史

与书签类似,历史记录也需要声明权限`history`,之后就可以在`service worker`中通过[chrome.history](https://developer.chrome.com/docs/extensions/reference/api/history)对象操作历史记录了

相对而言,历史因为没有树状结构,所以接口简单得多

### 桌面提醒

需要权限`notifications`,接口为`chrome.notifications`,用法非常类似html5的`notifications`,通常用下面的方式呼出提醒

```ts
const notification = {
    "type":'basic' as chrome.notifications.TemplateType,,
    "iconUrl":'../images/xkfy.png',
    "title":"音乐播放",
    "message":"战斗曲",
    "contextMessage":'蔡志展'
}

const notificationId = await chrome.notifications.create(notification)
```

注意`create`方法中`type`,`iconUrl`,`title`和`message`是必填的.

+ `iconUrl`用插件分辨率为的图标即可
+ `type`用于确定提醒的形式,可以是
    + `basic`:包含图标,标题,消息,展开消息和最多两个按钮
    + `image`:包含图标,标题,消息,展开消息,图像和最多两个按钮
    + `list`:包含图标,标题,消息,项目和最多两个按钮.Mac OS X上的用户只能看到第一个项目
    + `progress`:包含图标、标题、消息、进度和最多两个按钮

需要注意,在macosx中chrome的通知功能除了要chrome权限,还需要系统允许,我们可以在`系统设置->通知`中找到chrome,并打开它的通知

### 闹钟

chrome插件允许设置[闹钟](https://developer.chrome.com/docs/extensions/reference/api/alarms)以实现定时运行特定逻辑或在指定时间运行特定逻辑.要在`service worker`中调用`chrome.alarms`接口需要在`Manifest`的`permissions`中声明`alarms`权限.

```json
{
    ...
    "permissions": [
        "alarms"
    ],
    ...
}
```

我们的例子在[chrome-ext-alarms分支](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/chrome-ext-alarms).这个例子中,我们通过`Omnibox`,在地址栏输入`alarm 消息@delay 延迟的分钟数[#重复提醒间隔]`或者`alarm 消息@when 毫秒级时间戳[#重复提醒间隔]`的形式设置闹钟.我们设置的没有处理的闹钟会在点击图标后展示,点击选中后则会删除这个闹钟.触发闹钟后我们弹出一个桌面提醒,并将写入的消息作为提醒的message弹出.

#### 闹钟的行为方式

在介绍用法前我们先看下闹钟接口的行为方式

> 设备休眠

当设备处于休眠状态时闹钟会继续运行.但闹钟不会唤醒设备.当设备唤醒时将触发任何错过的闹钟.重复闹钟最多触发一次,然后使用从设备唤醒时开始计算的指定时间段,不考虑自闹钟最初设置为运行后已过去的任何时间.

> 持久性

闹钟通常持续到扩展程序更新为止,不过我们无法保证这一点.在浏览器重新启动时闹钟可能会被清除,我们通产通过一个存储中的值来确保闹钟可用.例如:

```ts
const ALARMS_STORAGE_KEY = "my-alarms"
...
// 检查已经保存的闹钟并根据现在的时间情况进行恢复
async function checkAlarmState() {
    console.log("checkAlarmState start")
    const historyAlarmsInStorage = await chrome.storage.local.get(ALARMS_STORAGE_KEY);
    const alarms: Array<AlarmInfo> = historyAlarmsInStorage[ALARMS_STORAGE_KEY]
    // let alarmsLeft: Array<AlarmInfo> = []
    if (alarms && alarms.length > 0) {
        for (let alarminfo of alarms) {
            const alarm = await chrome.alarms.get(alarminfo.message);
            let when: number
            if (!alarm) {
                if ("when" in alarminfo.alarminfo) {
                    when = alarminfo.alarminfo.when
                } else {
                    when = alarminfo.create_time + 60 * 1000 * alarminfo.alarminfo.delayInMinutes
                }
                if (when > Date.now()) {
                    await chrome.alarms.create(alarminfo.message, { when: when, periodInMinutes: alarminfo.alarminfo.periodInMinutes })
                } else {
                    // 过期的闹钟过30s后发出提醒
                    await chrome.alarms.create(alarminfo.message, { delayInMinutes: 0.5, periodInMinutes: alarminfo.alarminfo.periodInMinutes })
                }
            }
        }
    }
    console.log("checkAlarmState done")
}
...
checkAlarmState()
```

#### 闹钟的使用

闹钟接口的使用分为注册和监听两部分,我们结合例子来介绍.

> 注册部分

负责将闹钟的触发时间重复周期等信息以及可选的闹钟名字,触发后的回调注册到浏览器中.使用接口`chrome.alarms.create(name?: string, alarmInfo: AlarmCreateInfo)=>Promise<void>`,其中`alarmInfo`不分可以通过`when`或者`delayInMinutes`来设置触发时间,但这两者不能同时存在.如果这两个都不存在,则会将`periodInMinutes`作为`delayInMinutes`处理.在例子中我们直接将闹钟的消息作为`name`注册

通常为了持久性,我们需要将注册的闹钟信息也放一份到本地存储,这样设备休眠唤醒后也可以被正常拉出.在我们的例子中我们是通过解析字符串来获取设置闹钟的信息的,而被解析的字符串也是通过`omnibox`方式获取的,这种外部输入的方式必然会有解析和校验的部分,因此设置过程中的错误也会被作为消息弹出提示用户.

```ts
...
interface AlarmInfo {
    message: string
    alarminfo: chrome.alarms.AlarmCreateInfo
    create_time: number
}
// 判断字符串内容是否为整数
function isInteger(str: string): boolean {
    return /^\d+$/.test(str);
}
// 解析定时字符串
function alarmstrParser(alarmstr: string): AlarmInfo {
    if (!alarmstr.includes("@")) {
        throw "语法错误:必须使用@when或@delay指定闹钟时间"
    }
    const create_time = Date.now()
    let [message, alarminfostr] = alarmstr.split("@")
    let attimestr: string
    let periodInMinutes: number = 1
    if (alarminfostr.includes("#")) {
        const timelist = alarminfostr.split("#")
        attimestr = timelist[0]
        const periodInMinutesstr = timelist[1]
        if (!isInteger(periodInMinutesstr)) {
            throw "语法错误:重复间隔部分不为整数"
        }
        periodInMinutes = Number(periodInMinutesstr)
    } else {
        attimestr = alarminfostr
    }
    if (attimestr.startsWith("when ")) {
        const whenstr = attimestr.replace("when ", "")
        if (!isInteger(whenstr)) {
            throw "语法错误:定时部分不为整数"
        }
        const when = Number(whenstr)
        if (Date.now() <= when) {
            throw "语法错误:定时部分早于当前时间"
        }
        const alarminfo = {
            periodInMinutes,
            when,
        }
        return {
            message,
            alarminfo,
            create_time
        }
    } else if (attimestr.startsWith("delay ")) {
        const delaystr = attimestr.replace("delay ", "")
        if (!isInteger(delaystr)) {
            throw "语法错误:延迟分钟部分不为整数"
        }
        const delayInMinutes = Number(delaystr)
        const alarminfo = {
            periodInMinutes,
            delayInMinutes
        }
        return {
            message,
            alarminfo,
            create_time
        }
    } else {
        throw `语法错误:无法解析定时字符串${attimestr}`
    }
}
...
// 设置新的闹钟
async function setAlarm(alarmstr: string): Promise<void> {
    console.log("setAlarm start")
    let notification: chrome.notifications.NotificationOptions<true>
    try {
        const alarminfo = alarmstrParser(alarmstr)
        console.log("setAlarm get alarminfo")
        const historyAlarmsInStorage = await chrome.storage.local.get(ALARMS_STORAGE_KEY);
        let alarms: Array<AlarmInfo> = historyAlarmsInStorage[ALARMS_STORAGE_KEY]
        if (alarms) {
            alarms.push(alarminfo)
        } else {
            alarms = [alarminfo]
        }
        await chrome.storage.local.set({
            [ALARMS_STORAGE_KEY]: alarms
        })
        console.log("setAlarm set alarm in storage ok")
        await chrome.alarms.create(alarminfo.message, alarminfo.alarminfo)
        console.log("setAlarm set alarm ok")
        notification = {
            "iconUrl": '../images/icon128.png',
            "type": "basic" as chrome.notifications.TemplateType,
            "title": "设置闹钟成功",
            "message": alarmstr,
            "contextMessage": "ok"
        }
        console.log("setAlarm set ok")
    } catch (error) {
        if (typeof error === "string") {
            notification = {
                "iconUrl": '../images/icon128.png',
                "type": "basic" as chrome.notifications.TemplateType,
                "title": "设置闹钟失败",
                "message": error,
                "contextMessage": "error"
            }
        } else if (error instanceof Error) {
            notification = {
                "iconUrl": '../images/icon128.png',
                "type": "basic" as chrome.notifications.TemplateType,
                "title": "设置闹钟失败",
                "message": error.message,
                "contextMessage": "error"
            }
        } else {
            notification = {
                "iconUrl": '../images/icon128.png',
                "type": "basic" as chrome.notifications.TemplateType,
                "title": "设置闹钟失败",
                "message": "未知类型错误",
                "contextMessage": "error"
            }
        }
        console.log("setAlarm set get error")
    }
    const notificationId = await chrome.notifications.create(notification)
    console.log(`setAlarm throw notification with id ${notificationId}`)
}
...
chrome.omnibox.setDefaultSuggestion(
    {
        description: 'set a alarm with Special syntax.'
    }
)
chrome.omnibox.onInputEntered.addListener(setAlarm)
...
```

> 监听部分

负责监听闹钟事件,根据回调函数中传入的内容做进一步处理,使用接口`chrome.alarms.onAlarm.addListener(callback: (alarm: Alarm) => void)`.

通常我们监听到有闹钟后是需要进一步处理的,至少也要给个取消闹钟的操作.在例子中我们在收到闹钟事件后会发出一个消息并将这个消息的id和这个触发的闹钟进行映射,用户手动关闭消息则会触发回调将这个闹钟给取消

```ts
...
let NotifyAlarmMap = new Map<string, string>()
...
// 当闹钟触发时弹出消息
function alarmNotify(alarm: chrome.alarms.Alarm) {
    console.log(`alarmNotify get alarm ${alarm.name}`)
    // notification的另一种写法
    chrome.notifications.create(
        {
            "iconUrl": '../images/icon128.png',
            "type": "basic" as chrome.notifications.TemplateType,
            "title": "闹钟提醒",
            "message": alarm.name,
            "contextMessage": "ok"
        },
        (notificationId: string) => {
            NotifyAlarmMap.set(notificationId, alarm.name)
            console.log(`alarmNotify set alarm ${alarm.name} map to notification ${notificationId} ok`)
        }
    )
}
//当用户手动关闭提醒时清除闹钟
async function clearAlarms(notificationId: string, byUser: boolean) {
    console.log(`clearAlarms start`)
    if (byUser && NotifyAlarmMap.has(notificationId)) {
        const alarmname = NotifyAlarmMap.get(notificationId)
        await deleteAlarmInStorage(alarmname)
        const ok = await chrome.alarms.clear(alarmname)
        console.log(`clear alarm ${alarmname} ${ok}`)
    }
}
...
chrome.alarms.onAlarm.addListener(alarmNotify)
chrome.notifications.onClosed.addListener(clearAlarms)
```

### 语音接口

使用tts接口可以将文字转换为语音,tts接口可以使用不同语速,音调阅读文字.文字转语音对视力不佳的用户来说非常重要.

我们的例子在[chrome-ext-tts分支](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/chrome-ext-tts).在这个例子中我们依然借助`Omnibox`,通过关键字`speak 消息[@@声音名]`让chrome将我们输入的文字读出来,也可以通过选中页面中的文本后右键菜单输出对应语音.而声音名列表则放在`popup`中展示,我们可以选中其中的特定语音作为默认语音.

要在`service worker`中使用tts接口需要在`Manifest`的`permissions`中声明`tts`权限.

```json
{
    ...
    "permissions": [
        "tts"
    ],
    ...
}
```

#### 文字转语音

使用speak方法来朗读文字:

```js
await chrome.tts.speak('Hello, world.');
```

+ `chrome.tts.speak(utterance:string, options?: TtsOptions)=>Promis<void>`

    在不做任何设置的情况下chrome会使用默认的tts引擎设置阅读你写的文本.`options`则可以指定了朗读时所采用的语调,语速,音量等等信息.options完整的结构如下所示:

    ```js
    {
        enqueue: 是否将朗读任务放入队列,如果为true此朗读任务将在之前的任务结束后才开始
        voiceName: 朗读所使用的声音名称
        extensionId: 为朗读提供声音引擎扩展的id
        lang: 所朗读文字的语言
        gender: 朗读声音所使用的性别,male或female
        rate: 朗读语速,默认值为1.0,允许的值为0.1到10.0,但具体范围还要结合具体使用的声音,值越大速度越快,
        pitch: 朗读语调,默认值为1.0,允许的值为0到2.0,
        volume: 朗读音量,默认值为1.0,允许的值为0到1.0,
        requiredEventTypes: 声音必须支持的事件,
        desiredEventTypes: 需要监听的事件,如未指定则监听全部事件,
        onEvent: 用于监听事件的函数
    }
    ```

+ `chrome.tts.stop()`使用stop方法可以随时停止正在进行的朗读任务

+ `chrome.tts.pause()`使用pause方法可以随时暂停正在进行的朗读任务

+ `chrome.tts.resume()`使用resume方法可以随时恢复被暂停的朗读任务

#### 状态监测

如果当前应用正在朗读文本,执行一个新的朗读任务会立即停止之前的朗读任务。为了避免打断正在进行的朗读任务,可以通过`chrome.ttsisSpeaking()=>Promise<boolean>`方法获取当前的朗读状态

```js
const isSpeaking = await chrome.tts.isSpeaking()
```

在设置speak参数时可以设置`onEvent`属性用来监听朗读事件,它接收一个参数为`TtsEvent`类型的回调函数

```js
await chrome.tts.speak(utterance,{
    onEvent: function(event) {
        console.log('Event ' + event.type ' at position ' + event.charIndex);
        if (event.type == 'error') {
            console.log('Error: ' + event.errorMessage);
        }
    }
})
```

其中`event`对象(`TtsEvent`)包含三个属性,

+ `type`,事件类型,可能的值包括`start`,`end`,`word`,`sentence`,`marker`,`interrupted`,`cancelled`,`error`,`pause`和`resume`.
+ `length`,话语下一部分的长度.例如在`word`类型的事件中这是接下来要说的单词的长度.如果语音引擎没有设置它将被设置为-1
+ `charIndex`,语音当前读到的字符的索引.仅在`type`为`word`事件会在一个字结束且下一个字开始之前触发.`charIndex`表示文本中下一个要说出的字词开头的点
+ `errorMessage`,即错误消息

朗读任务一开始就会监听到`start`类型事件;当朗读到一个新的词语时会监听到`word`类型事件;朗读完一个句子时会监听到`sentence`类型事件;当朗读任务被中断会监听到`interrupted`类型事件;而如果朗读任务尚未开始即被移除会监听到`cancelled`类型事件;`error`,`pause`和`resume`类型事件分别会在朗读过程中遇到错误,被暂停和被恢复时接收到;对于`marker`类型事件,它是在朗读任务到达`SSML标记`时触发的,有关SSML的详细介绍请读者自行参考<http://www.w3.org/TR/speech-synthesis/>.

不过实际能接收到的类型事件需要根据具体选择的声音的支持情况.

#### 设置音源

通过`getVoices()=>Promise<TtsVoice[]>`方法可以获取到目前计算机中提供的声音

```js
const voices = await chrome.tts.getVoices()
```

返回的结果voices(`TtsVoice[]`)是一个包含多个声音对象的数组.声音对象包含6个属性,分别是

+ `voiceName`,语音的名字
+ `lang`,语音的语言,使用字符串'en', 'en-US', 'en-GB', 'zh-CN'这样的形式指定
+ `remote`,boolean类型,说明是否是网络资源,如果是false则说明是本地资源,一般效果会更好些
+ `extensionId`,提供此语音的扩展的ID
+ `eventTypes`,此语音能够发送的所有回调事件类型

其中remote属性表示此声音是否为网络资源,eventTypes为此声音支持的全部事件。

如下面为一个声音对象的实例:

```js
{
    "eventTypes": [
        "start",
        "end",
        "interrupted",
        "cancelled",
        "error"
    ],
    "extensionId": "neajdppkdcdipfabeoofebfddakdcjhd",
    "lang": "en-GB",
    "remote": true,
    "voiceName": "Google UK English Female"
}
```

获取到声音对象后,通过指定speak方法中的相应参数来应用声音,如:

```js
await chrome.tts.speak(utterance, {
    voiceName: 'Google UK English Female',
    lang: 'en-GB'
})
```

#### 自定义tts引擎

如果你希望定制tts引擎,可以在`permissions`中声明`ttsEngine`权限,并在`Manifest`中声明`ttsEngine`字段注册引擎

```json
{
    "permissions": ["ttsEngine",...],
    "tts_engine": {
        "voices": [
            {
                "voice_name": "Alice",
                "lang": "en-US",
                "event_types": ["start", "marker", "end"]
            },
            ...
        ]
    },
}
```

`ttsEngine`字段是声明自定义tts引擎用的,其中`voice_name`为必需参数,需要名称应具有充分的描述性以便于识别所使用的语音名称和引擎的名称;`lang`参数是可选的但强烈建议注册.语音几乎总是只能用一种语言进行的语音对话,当引擎支持多种语言时为每种语言注册单独的语音引擎是更加合理的方案;最后如果引擎可以发送事件来更新客户端,则必须使用`event_types`参数申明支持的事件,范围和上面`TtsEvent`的`type`取值范围除了不支持`interrupted`和`cancelled`外都是一致的.通常至少支持`end`.否则Chrome无法调度加入队列的语音.

在自定义tts引擎的插件加载好后,我们在要调用这个自定义tts引擎的插件就可以在其`service worker`中执行`chrome.ttsEngine.updateVoices(voices: TtsVoice[])`来声明更新插件可以用的tts引擎.

在自定义tts引擎的插件中,我们则需要监听事件的回调以处理

```js
const speakListener = (utterance, options, sendTtsEvent) => {
  sendTtsEvent({type: 'start', charIndex: 0})

  // (start speaking)

  sendTtsEvent({type: 'end', charIndex: utterance.length})
};

const stopListener = () => {
  // (stop all speech)
};

chrome.ttsEngine.onSpeak.addListener(speakListener);
chrome.ttsEngine.onStop.addListener(stopListener);
```

通过将回调函数挂到`chrome.ttsEngine.onXXX`上监听事件,支持监听的事件包括

+ `onSpeak`,监听读事件,回调函数签名为`(utterance: string, options: SpeakOptions, sendTtsEvent: function) => void`在其中我们要发送事件调用`sendTtsEvent(obj)`即可
+ `onSpeakWithAudioStream`,其回调函数签名为`(utterance: string, options: SpeakOptions, audioStreamOptions: AudioStreamOptions, sendTtsAudio: function, sendError: function) => void`,
+ `onPause`,监听暂停事件,回调函数签名为`() => void`
+ `onResume`,监听重置事件,回调函数签名为`() => void`
+ `onStop`,监听停止时间,回调函数签名为`() => void`

<!-- todo ### 嵌入脚本 -->

## 更加底层的网络工具

作为浏览器端的插件,service worker自然是支持浏览器支持的所有应用层通信协议的,这些协议包括:

+ http
+ sse
+ websocket
+ webRtc

以及国内用不了的`web messaging`

除此之外,chrome的api中还支持一些其他特性

### 专用的下载接口

chrome支持使用`chrome.downloads.download`直接下载文件到本地

```js
chrome.downloads.download({
  url: url,
  conflictAction: 'uniquify',
  saveAs: false
})
```

## 消息传递

扩展内部通信可以使用`chrome.runtime`对象相关的接口来实现

+ `chrome.runtime.sendMessage(extensionId:string, message:any, options:object, callback:( response:any)=>void)`

    向扩展全局发送消息,默认extensionId为发送者的id

+ `chrome.runtime.onMessage.addListener(callback:(message,sender,sendResponse)=>void)`

    当收到消息时监听触发回调函数

+ `chrome.runtime.connect(extensionId:string, connectInfo:object)`

    尝试连接扩展,默认id为发送者自己的扩展id

+ `chrome.runtime.onConnect.addListener(callback:(port:Port)=>void )`

    当被连接是触发监听

消息分为三种:

+ 一次性消息(`one-time requests`)
+ 长效消息(`long-lived connections`)
+ 扩展间消息(`cross-extension messages`)

前两种是插件内部通信用的,后一种则是插件间交互用的,这里不做介绍.

### 一次性消息

> 发送

一次性消息的发送方根据位置不同会有些不同

+ 在非service worker中向service worker中发送消息使用`chrome.runtime.sendMessage(msg)=>Promise<any>;`

+ 在service worker中向popup页面发送消息也使用`chrome.runtime.sendMessage(msg)=>Promise<any>`

+ 在service worker中向tab内的`content_scripts`发送消息使用`chrome.tabs.sendMessage(tabid,msg)=>Promise<any>`来实现发送.一般我们只会向当前已经激活状态的tab中发送消息,因此我们需要先获得这个tab的id,也就是如下的代码结构

    ```js
    const tabs = await chrome.tabs.query({active: true, currentWindow: true})
    const resp = await chrome.tabs.sendMessage(tabs[0].id, {cmd: "mycmd"})
    console.log(response)
    ```

> 接收

接收到是统一的使用`chrome.runtime.onMessage`对象,在其中添加回调函数即可

```js
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
        console.log(sender.tab ?  `from a content script: ${sender.tab.url}` : "from the extension")
        if (request.cmd== "mycmd"){
            sendResponse( "ok")
        }
    }
)
```

### 长效消息

长效消息是现在消息的收发双方建立通道,然后通过这个通道收发消息.这个过程比较像socket通信

> 连接主动方

```js
const port = chrome.runtime.connect({name: "con1"}) //建立连接

port.onMessage.addListener(function(msg) {  
    // 设置监听器
    if (msg.recmd== "remycmd"){
        port.postMessage({cmd: "mycmd2"})
    }else if (msg.recmd== "remycmd2"){
        port.postMessage({cmd: "mycmd3"})
    }...
})

port.postMessage({cmd: "mycmd"}) // 发送消息

```

和一次性消息一样,如果是在service worker中向tab内的`content_scripts`发送消息使用则需要使用`chrome.tabs.connect(tabId,{name: "con1"})`.

> 连接被动方

```js
chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name == "con1")  
    port.onMessage.addListener(function(msg) {
        if (msg.cmd== "mycmd"){
            port.postMessage({recmd: "remycmd"})
        }else if (msg.cmd == "mycmd2"){
            port.postMessage({recmd: "remycmd2"})
        }...
    })
})
```

通常来说连接的主动方是tab中的页面或popup页面,而service worker一般都是被动方,毕竟service worker没法知道什么时候要建立连接

## 例子

这部分我们可以看例子[chrome-ext-tts分支](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/chrome-ext-tts).这个例子中command方式读出页面上选中的文本就用到了第一种消息传递方式.

在这个例子中,我们收到command后还需要获取页面上被选中的文本,这就需要借助`content_script`为所有页面嵌入一个获取当前选中文本的脚本让它监听由serviceworker传来的消息.

+ `manifest.json`,设置为所有

    ```json
    {
        ...,
        "permissions": [
            ...
            "tabs",
            "activeTab",
            "scripting"
        ],
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
        ]
    }
    ```

+ `content.ts`

    ```ts
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log(`get cmd ${request}`)
        if (request === "speak") {
            let selection = window.getSelection();
            console.log(`get message ${selection.toString()}`)
            console.log(`get message ${selection.toString()}`)
            sendResponse(selection.toString())
        }
    })
    ```

然后service worker会在收到command后发送一个`speak`消息通知页面进行捕获.

+ `background.ts`

    ```ts
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

## 调用专用存储

扩展作为web轻应用,当然很可能会用到本地存储,除了html中现成的存储方案如

+ localStorage
+ Web SQL Database
+ indexedDB

外Chrome也有自己的存储API--Chrome存储API`chrome.storage`.

`chrome.storage`需要权限`storage`.

```json
{
    ...
    "permissions": [
        "storage"
    ]
}
```

本地存储我们在例子[chrome-ext-tts分支](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/chrome-ext-tts)和例子[chrome-ext-stock_trace](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/chrome-ext-stock_trace)中也有大量应用.

它可以说是对localStorage的改进.它与`localStorage`相比有以下区别:

+ 提供了多种储存区域.
+ `content_scripts`可以直接读取数据而不必通过`service worker`
+ 在隐身模式下仍然可以读出之前存储的数据
+ 读写速度更快
+ 用户数据可以以对象的类型保存

对于第二点要进一步说明一下。首先`localStorage`是基于域名的,这在前面的小节中已经提到过了.而`content_scripts`是注入到用户当前浏览页面中的,如果`content_scripts`直接读取`localStorage`,所读取到的数据是用户当前浏览页面所在域中的.所以通常的解决办法是`content_scripts`通过`runtime.sendMessage`和`service worker`通信,由`service worker`读写扩展所在域(通常是`chrome-extension://extension-id/`）的`localStorage`然后再传递给`content_scripts`.显然这样的操作非常繁琐

`chrome.storage`提供了4种类型的存储空间类型:

+ `storage.local`,本地存储.数据会存储在本地,并会在扩展程序被移除时清除.存储空间上限为`10MB`(在Chrome 113及更低版本中为`5MB`),但可以通过请求 `unlimitedStorage`权限提高上限.
+ `storage.managed`,自管式存储.空间是供政策安装的扩展程序使用的只读存储空间,由系统管理员使用开发者定义的架构和企业政策进行管理.政策与选项类似,但由系统管理员(而不是用户)配置从而能够为组织中的所有用户预先配置扩展程序.通常这个类型个人开发者用不着.
+ `storage.session`,会话存储.在浏览器会话期间将数据保存在内存中.默认情况下它不会向内容脚本公开,但可以通过设置`chrome.storage.session.setAccessLevel()`来更改此行为.存储空间上限为`10 MB`(在Chrome 111及更低版本中为`1MB`).
+ `storage.sync`,云同步存储(依赖谷歌服务和谷歌用户).如果启用了云同步功能,数据会同步到用户登录的任何Chrome浏览器.如果停用,它的行为类似于`storage.local`.Chrome会在浏览器离线时将数据存储在本地,并在浏览器恢复在线状态时继续同步.配额限制约为`100 KB`,每项内容`8 KB`.

对于每种储存区域`chrome.storage`提供了5个方法,分别是`get`,`getBytesInUse`,`set`,`remove`和`clear`

> get

`get`方法即为读取数据,完整的方法为:

```js
const result = await chrome.storage.[StorageArea].get(keys),
console.log(result)
```

`keys`可以是字符串,包含多个字符串的数组或对象,不同情况会有不同的行为:

+ 如果`keys`是字符串则和`localStorage`的用法类似;
+ 如果`keys`是数组则相当于一次读取了多个数据;
+ 如果`keys`是对象则会先读取以这个对象属性名为键值的数据,如果这个数据不存在则返回keys对象的属性值(比如keys为`{'name':'Billy'}`,如果`name`这个值存在就返回`name`原有的值,如果不存在就返回`Billy`);
+ 如果`keys`为一个空数组(`[]`)或空对象(`{}`)则返回一个空列表;
+ 如果`keys`为`null`则返回所有存储的数据.

> getBytesInUse

`getBytesInUse`方法为获取一个数据或多个数据所占用的总空间,返回结果的单位是字节,完整方法为:

```js
const bytes = chrome.storage.[StorageArea].getBytesInUse(keys)
console.log(bytes)
```

此处的`keys`只能为`null`,`字符串`或`包含多个字符串的数组`

> set

`set`方法为写入数据,完整方法为:

```js
await chrome.storage.[StorageArea].set(items)
```

items为对象类型,形式为键/值对.items的属性值如果是字符型,数字型和数组型,则储存的格式不会改变;但如果是对象型和函数型的会被储存为`"{}"`,如果是日期型和正则型的则会被储存为它们的字符串形式.

> remove
    remove方法为删除数据,完整方法为：

```js
await chrome.storage.[StorageArea].remove(keys)
```

其中`keys`可以是字符串也可以是包含多个字符串的数组.

> clear

`clear`方法为删除所有数据,完整方法为:

```js
await chrome.storage.[StorageArea].clear()
```

请注意上述五种完整方法中`[StorageArea]`必须指定为四种存储空间类型之一.

Chrome同时还为存储API提供了一个`onChanged`事件,当存储区的数据发生改变时这个事件会被触发.

```js
chrome.storage.onChanged.addListener(function(changes, areaName){
    console.log('Value in '+areaName+' has been changed:');
    console.log(changes);
})
```

callback会接收到两个参数.

+ 第一个为`changes`一个字典对象,键为更改的属性名称,值包含两个属性,分别为`oldValue`和`newValue`;
+ 第二个是`StorageArea`即为存储空间类型

## 访问调用本地硬件

浏览器是运行在计算机上的,chrome插件允许我们有限的访问本地硬件和一些chrome服务

### 系统信息

chrome插件允许查看系统的[cpu](https://developer.chrome.com/docs/extensions/reference/api/system/cpu?hl=zh-cn),[内存](https://developer.chrome.com/docs/extensions/reference/api/system/memory?hl=zh-cn),[显示器](https://developer.chrome.com/docs/extensions/reference/api/system/display?hl=zh-cn)和[存储设备信息](https://developer.chrome.com/docs/extensions/reference/api/system/storage?hl=zh-cn),这需要先声明权限

```json
{
    ...,
    "permissions": [
        "system.cpu", //cpu
        "system.memory", //内存
        "system.storage" //存储设备
        "system.display" //显示器
    ],
    ...
}
```

系统信息都在`chrome.system`命名空间下,在`service worker`中调它就可以了

#### 获取CPU信息

`chrome.system.cpu.getInfo()=> Promise<CpuInfo>`用于获取cpu信息

CPU的信息`CpuInfo`包括

+ `numOfProcessors`
+ `archName`
+ `modelName`
+ `features`
+ `processors`
其中`processors`为一个记录所有逻辑处理器信息的数组

#### 获取内存信息

`chrome.system.memory.getInfo()=> Promise<MemoryInfo>`获取内存信息

内存信息`MemoryInfo`包括`capacity`和`availableCapacity`,即总容量和可用容量

#### 获取存储设备信息

`chrome.system.storage.getInfo()=>Promise<StorageUnitInfo[]>` 获取硬盘信息

存储空间信息`StorageUnitInfo`为一个包含多个存储设备信息的数组,每个存储设备的信息包括

+ `id`
+ `name`
+ `type`,枚举范围为
    + `fixed`(本地磁盘)
    + `removable`(可移动磁盘)
    + `unknown`(未知设备)
+ `capacity`

我们也可以利用下面这些接口控制硬盘

+ `chrome.system.storage.getAvailableCapacity(deviceId, callback)` 获取可用空间
+ `chrome.system.storage.ejectDevice(deviceId, callback)` 移除设备
+ `chrome.system.storage.onAttached` 监听可移动设备的插入
+ `chrome.system.storage.onDetached` 监听可移动设备的移除。

#### 获取显示器信息

+ `chrome.system.display.getInfo(flags?: GetInfoFlags)=>Promise<DisplayUnitInfo[]>`获取显示器信息

##### 电源唤醒

一些插件需要在后台常驻执行一些操作,这可能会和操作系统的电源策略冲突,chrome提供了[power](https://developer.chrome.com/docs/extensions/reference/api/power?hl=zh-cn)接口用于控制修改电源的唤醒级别.

电源唤醒的权限名为`power`,我们在`manifest`中声明`power`就可以声明权限.

```json
{
    ...,
    "permissions": [
        "power",
        ...
    ],
    ...
}
```

电源的唤醒策略控制都在`chrome.power`命名空间下.就3个接口

+ `chrome.power.requestKeepAwake(level: "system" | "display")`申请电源保持唤醒状态,有两个等级
    + `system`,防止系统因用户无活动而休眠
    + `display`,防止显示屏关闭或变暗或者防止系统因用户无活动而休眠

+ `chrome.power.reportActivity(callback?: function)`,报告用户活动以便将屏幕从调暗/关闭状态或屏保中唤醒.如果当前处于活动状态,则退出屏保.

+ `chrome.power.releaseKeepAwake()`,释放之前通过`chrome.power.requestKeepAwake(level)`发出的请求

### 网络代理设置

chrome插件的一个大类就是代理设置工具.他们其实干的就是给浏览器代理对象的设置做个网页界面方便人填写和配置

网络代理设置的权限名为`proxy`,我们在`manifest`中声明`proxy`就可以声明权限.

```json
{
    ...,
    "permissions": [
        "proxy",
        ...
    ],
    ...
}
```

用法很简单,给对象`chrome.proxy.settings`赋值即可

```js

const config = {
  mode: "fixed_servers",
  rules: {
    proxyForHttp: {
      scheme: "socks5",
      host: "1.2.3.4"
    },
    bypassList: ["foobar.com"]
  }
};
chrome.proxy.settings.set(
  {value: config, scope: 'regular'},
  function() {}
);
```

主要麻烦的是理解其中的概念.这个讲起来就太长了,建议直接去[官网查看](https://developer.chrome.com/docs/extensions/reference/api/proxy?hl=zh-cn)