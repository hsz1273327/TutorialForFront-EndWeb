# Chrome扩展

Chrome扩展本质上就是在v8虚拟机上运行的js程序.它可以用js定义业务逻辑,html制作界面,与其说chrome是一种新技术,不如说它是web前端技术的衍生.它只是提供了更丰富的交互方式,并不是什么技术革新.

Chrome将其平台上的程序分为扩展与应用,并且使用了同样的文件结构,那么两者的区别是什么呢?
在早期的Chrome版本中两者的区别非常模糊,而且有些扩展也可以用应用实现,反之亦然.
但今天看来Google正在努力使两者的界限变得清晰.现如今新应用已经不再允许进入官方市场,只能专供`chromeOs`.
这极大地限制了应用的使用范围.

本文将只介绍Chrome扩展,毕竟通常没啥人会用`ChromeOS`.

## Chrome扩展的开发模式

chrome扩展的基本开发模式是一个包含`manifest.json`的文件夹.而这个`manifest.json`就是这个扩展的配置文件,其基本形式如下:

```json
{
  // Required
  "manifest_version": 3,
  "name": "My Extension",
  "version": "versionString",

  // Recommended
  "action": {...},
  "default_locale": "en",
  "description": "A plain text description",
  "icons": {...},

  // Optional
  "author": ...,
  "automation": ...,
  "background": {
    // Required
    "service_worker": "background.js",
    // Optional
    "type": ...
  },
  "chrome_settings_overrides": {...},
  "chrome_url_overrides": {...},
  "commands": {...},
  "content_capabilities": ...,
  "content_scripts": [{...}],
  "content_security_policy": {...},
  "converted_from_user_script": ...,
  "cross_origin_embedder_policy": {"value": "require-corp"},
  "cross_origin_opener_policy": {"value": "same-origin"},
  "current_locale": ...,
  "declarative_net_request": ...,
  "devtools_page": "devtools.html",
  "differential_fingerprint": ...,
  "event_rules": [{...}],
  "externally_connectable": {
    "matches": ["*://*.example.com/*"]
  },
  "file_browser_handlers": [...],
  "file_system_provider_capabilities": {
    "configurable": true,
    "multiple_mounts": true,
    "source": "network"
  },
  "homepage_url": "https://path/to/homepage",
  "host_permissions": [...],
  "import": [{"id": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}],
  "incognito": "spanning, split, or not_allowed",
  "input_components": ...,
  "key": "publicKey",
  "minimum_chrome_version": "versionString",
  "nacl_modules": [...],
  "natively_connectable": ...,
  "oauth2": ...,
  "offline_enabled": true,
  "omnibox": {
    "keyword": "aString"
  },
  "optional_permissions": ["tabs"],
  "options_page": "options.html",
  "options_ui": {
    "chrome_style": true,
    "page": "options.html"
  },
  "permissions": ["tabs"],
  "platforms": ...,
  "replacement_web_app": ...,
  "requirements": {...},
  "sandbox": [...],
  "short_name": "Short Name",
  "storage": {
    "managed_schema": "schema.json"
  },
  "system_indicator": ...,
  "tts_engine": {...},
  "update_url": "https://path/to/updateInfo.xml",
  "version_name": "aString",
  "web_accessible_resources": [...]
}
```

其中比较常用的有

+ `manifest_version`定义使用的配置协议版本
+ `icons`定义插件使用的图标
+ `action`定义在浏览器右上角扩展列中点击扩展图标后的行为.
+ `background`定义后台执行的脚本位置
+ `permissions`定义应用要申请的执行权限
+ `storage`定义本地存储声明

其他全部的配置项说明可以查看官方的[插件api文档](https://developer.chrome.com/docs/extensions/mv3/manifest/),其中比较常用的配置我们会用到时进行介绍.

## 一个helloworld

依然是一个惯例的helloworld开始我们的介绍.这个项目在[chrome-ext-my_clock分支](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/chrome-ext-my_clock)上.这个扩展的功能是在点击右上角扩展图标后会展示当前时间并实时刷新.

其中的内容包括如下:

+ `manifest.json`,配置文件,配置了这个插件的基本信息和使用的页面,其中`action->default_popup`指定了点击扩展图标后弹出的页面

    ```json
    {
        "manifest_version": 3,
        "name": "我的时钟",
        "version": "1.0",
        "description": "我的第一个Chrome扩展",
        "icons": {
            "16": "images/icon16.png",
            "19": "images/icon19.png",
            "38": "images/icon38.png",
            "48": "images/icon48.png",
            "128": "images/icon128.png"
        },
        "action": {
            "default_icon": {
                "19": "images/icon19.png",
                "38": "images/icon38.png"
            },
            "default_title": "我的时钟",
            "default_popup": "popup.html"
        }
    }
    ```

+ `popup.html`定义了弹出页面的内容

    ```html
    <html>
    <head>
    <link rel="stylesheet" href="style.css" type="text/css"></link>
    </head>
    <body>
    <div id="clock_div"></div>
    <script src="js/my_clock.js"></script>
    </body>
    </html>
    ```

+ `style.css`定义了弹出页面的基本样式

    ```css
    * {
        margin: 0;
        padding: 0;
    }

    body {
        width: 200px;
        height: 100px;
    }

    div {
        line-height: 100px;
        font-size: 42px;
        text-align: center;
    }
    ```

+ `js->my_clock.js`定义了页面的执行逻辑,其源码的ts内容为

    ```ts
    let my_clock = (el:HTMLElement)=>{
        let today=new Date()
        let h=today.getHours()
        let m=today.getMinutes()
        let s=today.getSeconds()

        let hours = h.toString()
        let minutes = m>=10?m.toString():('0'+m.toString())
        let secondes = s>=10?s.toString():('0'+s.toString())
        el.innerHTML = h+":"+m+":"+s
        setTimeout(()=>my_clock(el), 1000)
    }

    let clock_div = document.getElementById('clock_div')
    my_clock(clock_div)
    ```

## 调试方法

要调试可以按如下步骤操作:

1. 在chrome中选择`更多工具=>扩展程序`(或者直接输入url<chrome://extensions/>)来进入插件管理界面.

2. 勾选`开发者模式`
3. 使用`加载已解压扩展程序`,选择项目根目录下有`manifest.json`的文件夹即可

![调试和打包](../source/调试和打包.png)

要重载只要在要调试的插件位置点击`重新加载`就可以,要调试页面也只要点击其中的`背景页`就可以当一般的前端调试了.

## 发布项目

要发布项目有几个前提

1. 首先你得拥有谷歌开发者账号,这个账号可以直接用谷歌邮箱申请.
2. 你的账号需要开通两步认证

当然了上面两步的前提都是你得能先翻墙出去.在完成了上面的前提设置后我们可以登录自己的[Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/),在`内容->上传新内容`中上传zip压缩好的项目文件就可以创建一个应用的发布草稿.

![上传应用](../source/上传应用.png)

我们在这个草稿中填写好相关的信息就可以提交审核申请了

![提交审核](../source/提交审核.png)

一旦审核通过我们的应用就可以在chrome应用商店中被找到了

## 单独打包分发

并不是所有的开发者都能直接在chrome商店更新扩展的.如果没有条件使用chrome应用商店分发或者只是希望小范围内分发可以通过在chrome扩展页点击`打包扩展程序`,然后选中你的项目(根目录下有`manifest.json`的文件夹)然后点击`打包应用程序`就可以获得到一个以`.crx`结尾的文件和一个以`.pem`的文件.其中`.crx`就是扩展,`.pem`则是应用程序的签名.

***需要注意这样的扩展如果没有在应用商店中注册也是无法使用的***,因此这种方式更加适合一些已经注册过的扩展项目做小范围版本测试.

如果我们的这个插件没有注册也要进行分发,那就基本只能直接分发源码文件了.

## 扩展的基本类型

chrome扩展当然不会只有这么简单的能力,通常我们按交互和运行的方式基本可以分为以下几种:

1. 点击运行型,我们的helloworld就属于这一类型.这也是多数插件的用法,通过点击扩展图标来激活页面或者脚本.

2. 后台型,只有后台脚本或者后台页面,在安装后就会自动运行,后台运行可以有2种:
    1. chrome启动后就会运行
    2. 不启动chrome也会运行

    区别在于权限申明`"permissions"`中是否申明了`background`

3. 页面修改型,这种最好别乱用,一般来说篡改别人的页面是很不好的不安全的一个行为.一般也是专门针对特定网站进行修改

4. 行为触发型,将触发行为从点击插件图标扩展到其他位置,比如允许在地址栏或者右键菜单进行操作

Chrome扩展只是扩展,它的展示层一般也就是点击图标后下弹出来的那个小小的展示框.这一特性也限制了它的作用多是小工具.
