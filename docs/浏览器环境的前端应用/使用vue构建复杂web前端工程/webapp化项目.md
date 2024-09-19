# webapp化项目

更进一步的,我们可以将这个应用构造为webapp.利用pwa相关的技术让它可以被常驻,交互迅速,离线可用,充分利用本地资源.

## 什么是webapp

web app指的是在浏览器中执行的应用,相比起普通的网页,网站它更加接近原生应用的体验.具体来说,在表现形式上

+ Web App可以被添加到桌面并有它自己的应用图标

+ 同时,从桌面开启时,会和原生app一样有它自己的"开屏图"

+ 更进一步的,这个Web App在的样子几乎和原生应用一样——没有浏览器的地址栏,工具条,似乎和Native App一样运行在一个独立的容器中.

而本质上来说,web app依然依托于浏览器,它只是网站前端的一个特殊封装,而且封装过程实际是浏览器执行的.当你打开一个webapp时实际上是启动了浏览器在执行.

那么浏览器如何确认某个网站的前端项目是个web app呢?有如下3个条件

+ 网站的域内注册有`service worker`
+ 网站资源中有清单文件(通常是`manifest.json`)
+ 入口的html中有引入清单文件

### webapp的安装

webapp在没安装前就是个有`service worker`的普通网页,但当满足如下条件时,这个网页上就会弹出安装横条,此时如果确认,浏览器就会为我们安装这个网页为一个webapp了.

+ 网站提供`HTTPS`服务
+ 网站注册了`service worker`
+ 网站拥有一份清单文件,且其中至少包含了四个必填字段--`name`与/或`short_name`,`start_url`,`icon`,`display`
+ 浏览器认为用户对于这款应用有持久的兴趣,也就是用户进入的频次比较高
+ 这款应用的安装横条在过去没有被显示和拒绝过

## 清单文件

`manifest.json`或`manifest.webmanifest`是清单文件的标准命名,它是一个标准的`json`文件如下:

```json
{
  "name": "HackerWeb",
  "short_name": "HackerWeb",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#fff",
  "description": "A readable Hacker News app.",
  "icons": [
    {
      "src": "images/touch/homescreen48.png",
      "sizes": "48x48",
      "type": "image/png"
    },
    {
      "src": "images/touch/homescreen72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "images/touch/homescreen96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "images/touch/homescreen144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "images/touch/homescreen168.png",
      "sizes": "168x168",
      "type": "image/png"
    },
    {
      "src": "images/touch/homescreen192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ],
  "related_applications": [
    {
      "platform": "play",
      "url": "https://play.google.com/store/apps/details?id=cheeaun.hackerweb"
    }
  ]
}
```

各个字段的含义以及不同浏览器的兼容性我们可以看[这个页面](https://developer.mozilla.org/zh-CN/docs/Web/Manifest#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7),

我们需要重点介绍如下几个字段

### name和short_name

`name`是应用的全名,当空间足够长时就会使用这个字段作为显示名称.但如果应用名称特别长,那么在没有足够空间显示全名的情况下`short_name`可以作为短名的备选方案.短名会用在应用图标的旁边,任务管理器中,以及任何不适合显示全名的地方.请确保`short_name`**不超过15个字符**,这样它才不会在主屏上被截断.

### dir

显示`name`,`short_name`和`description`参数文本的方向.默认情况下适配浏览器的语言设置,但是也可以设置为以下值之一:

+ `ltr`,从左到右的语言
+ `rtl`,从右到左的语言
+ `auto`,使用浏览器的语言设置

### lang

指定`name`,`short_name`和`description`参数文本的主要语言.可以和`dir`参数一起用来保证任何语言的文本正确显示,包括从右到左的语言.

### start_url

当用户点击图标时打开的`URL`.可以是根域名,也可以是内部页面.通常我们设置为`.`即可

### icon

应用图标.包含了一个或多个对象的数组,每个对象描述了一个Web应用可以使用的图标.其中每个对象都会包含以下属性:

+ `src`,图标的绝对路径或者相对路径
+ `type`,文件类型
+ `sizes`,图片的像素尺寸

要触发Web应用安装横条,清单中至少要包含一个图标,且尺寸至少是`144像素 ×144像素`

由于每个设备都会根据设备分辨率,从这个数组中选择最佳的图标尺寸,因此建议至少包含`192×192`的图标和`512×512`的图标以覆盖大多数的设备和用途

### display

控制应用启动时的显示模式.可能的值如下:

+ `browser`,在浏览器中打开应用
+ `standalone`,打开应用时不显示浏览器栏
+ `fullscreen`,打开应用时不显示浏览器栏和设备栏

要显示Web应用安装横条,`display`属性必须设置为`fullscreen`或者`standalone`

### theme_color

主题颜色可以让浏览器和设备调整UI以匹配你的网站,这个颜色的选择会影响浏览器地址栏颜色,任务切换器中的应用颜色,甚至是设备状态栏的颜色.
主题颜色也可以通过页面的`meta`标签进行设置(例如:`<meta name="theme-color" content="#2196F3">`).如果页面带有`theme-color`的`meta`标签则该设置会覆盖清单文件中的`theme_color`设置.请注意,虽然`meta`标签可以让你设置或者覆盖单个页面的主题颜色,但清单文件中的`theme_color`设置是会影响整个应用的。

### background_color

设置应用启动画面的颜色以及应用加载时的背景色.一旦加载后页面中定义的任何背景色(通过样式表或者内联HTML标签设置)都会覆盖这一设置.通过将其设置为与页面背景色相同的颜色就可以实现从页面启动的瞬间到完全渲染之间的平滑过渡.如果不设置这一颜色,页面就会从白色背景启动,随后被页面的背景色替换.

### scope

定义了应用的作用域.当用户处于一个`full-screen/standalone`模式的应用中并跳转到这个作用域下的另一个URL时,这个URL也会在`full-screen/standalone`模式下打开.然而如果用户点击的链接将他带出了作用域范围外,链接就会在常规浏览器窗口中打开.

在某些浏览器中,`scope`还会用来设置安卓系统的`Intent Filter`.当一个Web应用被安装并且设置了`scope`时,任何指向应用作用域内页面的链接都会启动这款应用而不是直接在浏览器中打开.

### orientation

允许你强制指定某个屏幕方向.这个字段主要是给移动端适配用的.如果你的应用布局在竖屏或者横屏时表现更佳,那么这会非常有用.以下是`orientation`最常见的可能取值:

+ `landscape`,横屏 
+ `portrait`,竖屏
+ `auto`,自动,也就是由系统决定

### prefer_related_applications

这一设置通常也是针对移动端的,如果你还有一款原生应用并且你更喜欢浏览器提供原生应用,而不是这个web应用,那么可以把`prefer_related_applications`设置为`true`.
当设置为`true`并且把当前平台下的原生应用列举在`related_applications`中时,网页会显示原生应用的安装横条而不是 Web 应用的安装横条.除了不依赖于`service worker`之外,显示原生应用安装横条的要求和显示 Web应用安装横条的要求是一致的.

### related_applications

这个参数接收一个"应用对象"的数组.每个对象中包含了一个`platform`平台参数(例如`play`,`itunes`),一个`url`参数表明应用可以在哪里获取,还有`id`参数,用来表示特定平台中的标识
下面的示例定义了关联的 Android 和 iPhone 应用,并告诉浏览器优先显示原生应用安装横条而不是Web应用安装横条:

```json
{
    ...
    "related_applications": [
        {
            "platform": "play",
            "url": "https://play.google.com/store/apps/details?id=com.goth.app",
            "id": "com.goth.app"
        }, {
            "platform": "itunes",
            "url": "https://itunes.apple.com/app/gotham-imperial/id1234"
        }
    ],
    "prefer_related_applications": true,
    ...
}

```

## 在vue项目中构建webapp

有了上面的前置知识我们就知道了要把我们的英雄列表做成一个web app我们还缺

+ service worker
+ 清单文件

但构造web app我们会面临如下几个问题:

+ 我们的vue项目打包后并不是源码发给用户的,也就是说源码中我们无法知道编译好后有哪些资源可以缓存.
+ 我们的要生成一堆图标资源仅给清单文件使用
  
为了解决这些问题我们就需要引入插件[vite-plugin-pwa](https://vite-pwa-org-zh.netlify.app/guide/),这个插件可以让我们相对轻松的解决上面的问题.

### 安装vite-plugin-pwa

安装就是很简单的`npm install -D vite-plugin-pwa`,安装完成后,我们需要

+ 在`vite.config.ts`中配置它

```ts
...
import { VitePWA } from 'vite-plugin-pwa';
...
const pwaOptions: Partial<VitePWAOptions> = {
    ...
}
...
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ...
    VitePWA(pwaOptions),
    ...
  ],
  ...
})

```

+ 在`env.d.ts`中配置

```ts
...
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/vue" />
```

## 使用VitePWA插件

VitePWA插件的使用几乎和应用本体无关,我们仅需要配置上面`VitePWA()`的参数即可.

### 开发模式

VitePWA插件的正常工作流是在vue执行完编译(比如`npm run build-only`)后再根据配置生成`清单文件`和`sw.js`.但这个过程并不会在`npm run dev`时触发.
如果我们要调试也只需要设置其中的`devOptions`字段,只是在调试模式下无论怎么配置都仅会生成`sw.js`执行.

为了方便起见我们可以考虑使用环境变量开关开发模式,然后修改`package.json`中的编译相关`scripts`

+ `vite.config.ts`

    ```ts
    const pwaOptions: Partial<VitePWAOptions> = {
        ...
        devOptions: {
            enabled: process.env.NODE_ENV !== 'production', // 在环境变量启动开发模式
            // enabled: true, //启动开发模式
            /* when using generateSW the PWA plugin will switch to classic */
            type: 'module',
            navigateFallback: 'index.html',
            suppressWarnings: true,
        },
        ...
    }
    ```

+ `package.json`

    ```json
    {
        ...
        "scripts": {
        "dev": "vite --port 8080",
        "build": "run-p type-check \"build-only {@}\" --",
        "preview": "vite preview",
        "build-only": "NODE_ENV=production && vite build",
        "type-check": "vue-tsc --build --force",
        "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
        "format": "prettier --write src/"
    },
    ...
    }
    ```

### 设置清单文件

管清单文件的设置字段是`manifest`,由于清单文件的内容本来就是个json,我们直接将清单文件的内容放进来即可.生成的清单文件名默认为`manifest.webmanifest`,如果要更改则需要在配置项中修改`manifestFilename`这个字段.

+ `vite.config.ts`

    ```ts
    const pwaOptions: Partial<VitePWAOptions> = {
        ...
        manifestFilename: 'manifest.webmanifest',
        manifest: {
            name: 'Hero List',
            short_name: 'Hero List',
            start_url: '.',
            display: 'standalone',
            background_color: '#fff',
            theme_color: '#ffffff',
            icons: [
                {
                    src: 'pwa-192x192.png', // <== don't add slash, for testing
                    sizes: '192x192',
                    type: 'image/png',
                },
                {
                    src: '/pwa-512x512.png', // <== don't remove slash, for testing
                    sizes: '512x512',
                    type: 'image/png',
                },
                {
                    src: 'pwa-512x512.png', // <== don't add slash, for testing
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: ['any', 'maskable'], // testing new type declaration
                },
            ],
        },
        ...
    }
    ```

当然如果你只是想用service worker增加缓存优化体验并不打算构造webapp,那也可以直接将其设置为`false`关闭清单文件的生成.

+ `vite.config.ts`

    ```ts
    const pwaOptions: Partial<VitePWAOptions> = {
        ...
        manifest: false,
        ...
    }
    ```

#### 静态资产

设置的`manifest`清单中指定的图片我们默认需要放在`public`文件夹下如果我们想指定位置,可以设置`srcDir`字段修改资源位置

+ `vite.config.ts`

    ```ts
    const pwaOptions: Partial<VitePWAOptions> = {
        ...
        srcDir: "public2"
        ...
    }
    ```

需要注意这个字段也会影响插件编译的行为,后面介绍的其他比如`injectManifest模式`下的service worker源文件查找路径也会受影响

### 设置service worker的注册和更新

VitePWA其实可以看做是为service worker服务的插件.清单文件可以没有,但service worker必须设置.其中

+ `filename`字段可以用于设置service worker脚本的脚本名,默认为`sw.js`
+ `scope`字段可以用于设置service worker的作用域,默认就是vue项目的作用域
+ `injectRegister`字段可以用于设置service worker的注册方式,有如下几种可选,默认为`auto`,我们一般不需要特意指定.
    + `inline`,内联注册,将一个如下面例子一样的html段插入生成的入口html文件中
        + `index.html`

            ```html
            ...
            <script>
                if ('serviceWorker' in navigator) {
                    window.addEventListener('load', () => {
                        navigator.serviceWorker.register('/sw.js', { scope: '/' });
                    });
                }
            </script>
            ...
            ```

    + `script`/`script-defer`,脚本注册,插件将会生成一个`registerSW.js`脚本添加到入口html头部,这两个选项不同点仅仅是`<script>`标签是否带`defer`参数
        + `index.html`

            ```html
            <head>
                ...
                <script src="/registerSW.js"></script>
            </head>
            ```

        + `registerSW.js`

            ```js
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js', { scope: '/' })
                })
            }
            ```

    + `false`,手动注册,插件不做任何处理,你得自己改写html或入口文件
    + `auto`,自动注册,如果你的应用代码库没有导入任何由插件公开的`虚拟模块`,那么插件将回退到脚本注册;否则导入的虚拟模块将为你注册`service worker`

+ `registerType`用于控制脚本更新逻辑,仅在`injectRegister`为`auto`且设置了`虚拟模块`时会生效.可选的有如下两个值,默认`prompt`.
    + `prompt`,更新逻辑会弹出选框让用户自行触发
    + `autoUpdate`,自动更新,注意这个选择可能造成用户数据丢失

这一部分个人认为没有特殊情况默认就很好,不用额外设置

#### 设置更新提示

我们可以在项目源文件根目录下设置一个`ReloadPrompt.vue`文件用于检查是否有新版本的service worker脚本并提示更新

+ `ReloadPrompt.vue`

    ```vue
    <template>
    <div v-if="offlineReady || needRefresh" class="pwa-toast" role="alert">
        <div class="message">
        <span v-if="offlineReady"> App ready to work offline </span>
        <span v-else>
            New content available, click on reload button to update.
        </span>
        </div>
        <button v-if="needRefresh" @click="updateServiceWorker()">Reload</button>
        <button @click="close">Close</button>
    </div>
    </template>

    <script setup lang="ts">
    import { useRegisterSW } from 'virtual:pwa-register/vue';

    const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();

    async function close() {
    offlineReady.value = false;
    needRefresh.value = false;
    }
    </script>

    <style>
    .pwa-toast {
    position: fixed;
    right: 0;
    bottom: 0;
    margin: 16px;
    padding: 12px;
    border: 1px solid #8885;
    border-radius: 4px;
    z-index: 1;
    text-align: left;
    box-shadow: 3px 4px 5px 0 #8885;
    background-color: white;
    }
    .pwa-toast .message {
    margin-bottom: 8px;
    }
    .pwa-toast button {
    border: 1px solid #8885;
    outline: none;
    margin-right: 5px;
    border-radius: 2px;
    padding: 3px 10px;
    }
    </style>
    ```

当然了,这个组件也得被vue加载

+ `App.vue`

    ```vue
    <template>
    ...
    <ReloadPrompt />
    </template>

    <script lang="ts" setup>
    import ReloadPrompt from './ReloadPrompt.vue'
    ....
    </script>

    <style>
    ...
    </style>
    ```

#### 定期更新

如果我们设置了定期更新(`registerType`为`autoUpdate`),那么,我们就得在`main.ts`中设置更新的逻辑

+ `main.ts`

    ```ts
    ...
    import { useRegisterSW } from 'virtual:pwa-register/vue';

    const intervalMS = 60 * 60 * 1000;

    const updateServiceWorker = useRegisterSW({
        onRegistered(r) {
            r &&
            setInterval(() => {
                r.update()
            }, intervalMS)
        },
    })
    ...
    ```

### 设置service worker的具体行为

设置service worker的具体行为就相对复杂的多.插件提供了2种模式从简单到复杂的让我们可以选择

分别是`generateSW模式`,`injectManifest模式`

#### generateSW模式下设置service worker脚本

generateSW模式可以理解为自动挡,它可以通过纯配置的方式指定service worker脚本的缓存行为,但注意,它除了设置缓存行为外什么也干不了.

我们需要设置`strategies`字段为`generateSW`(或者不设置这个字段)来申明使用的是`generateSW`模式.

它的具体设置内容在`workbox`字段中定义.定义好的配置在编译后会生成使用[workbox](https://developer.chrome.com/docs/workbox?hl=zh-cn)构造的service worker脚本.没错,这个插件重度依赖谷歌的`workbox`库

如果你什么都不设置,默认情况下它会生成一个有如下逻辑的`service worker`脚本

+ `sw.js`

    ```js
    ...
    self.addEventListener('message', event => {
        if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
        }
    });

    /**
     * The precacheAndRoute() method efficiently caches and responds to
    * requests for URLs in the manifest.
    * See https://goo.gl/S9QRab
    */
    workbox.precacheAndRoute([{
        "url": "assets/index-C1waw0od.css",
        "revision": null
    }, {
        "url": "assets/index-CuapLBUW.js",
        "revision": null
    }, {
        "url": "index.html",
        "revision": "d15ba2d49a749eebc0c5856c013da4ad"
    }, {
        "url": "registerSW.js",
        "revision": "1872c500de691dce40960bb85481de07"
    }, {
        "url": "favicon.svg",
        "revision": "71dcfd191507c31dc79efe3341dfa3b9"
    }, {
        "url": "pwa-192x192.png",
        "revision": "f24c9384006bbc8de95ed69990459dca"
    }, {
        "url": "pwa-512x512.png",
        "revision": "4db5b8fe442a8f8fdc6e35cd40138057"
    }, {
        "url": "manifest.webmanifest",
        "revision": "cba64a48c5ac664da5eed0b6324c1c0a"
    }], {});
    workbox.cleanupOutdatedCaches();
    workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
    ...
    ```

可以看出它默认只会设置对静态资源的预加载.

如果要设置对特定fetch的代理,我们就得设置`workbox`字段.其基本的逻辑就是用`re`和HTTP方法来匹配路由,命中后再执行特定策略

##### 排除路由

我们可以通过字段`navigateFallbackDenylist`字段指定哪些路由不会被service worker拦截,sse和websocket连接的地址应该设置排除路由

+ `vite.config.ts`

    ```ts
    const pwaOptions: Partial<VitePWAOptions> = {
        ...
        workbox: {
            navigateFallbackDenylist: [/^\/stream/],
            ...
        },
        ...
    }
    ```

##### 缓存静态资源

如果有额外的静态资源希望一并缓存,我们可以设置字段`globPatterns`.这个字段的作用是将`srcDir`目录下匹配到文件都包括进静态缓存,在初始化时就缓存到位

+ `vite.config.ts`

    ```ts
    const pwaOptions: Partial<VitePWAOptions> = {
        ...
        workbox: {
            globPatterns: ['**/*.{js,css,html}']
        },
    }
    ```

##### 设置请求拦截

拦截的设置在`runtimeCaching`字段,它接受一个了拦截设置列表,其中的元素就是拦截的设置

+ `vite.config.ts`

    ```ts
    const pwaOptions: Partial<VitePWAOptions> = {
        ...
        workbox: {
            runtimeCaching: [
                {
                    urlPattern: /^http:\/\/localhost:5000\/api\/hero\/.*/i,
                    method: "GET",
                    handler: 'NetworkFirst',
                    options: {
                        expiration: {
                            maxEntries: 10,
                            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
                        },
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                },
                ...
            ],
        },
    }
    ```

    其中
    + `urlPattern`是用于匹配的url,它的值是一个re的匹配
    + `method`用于指定匹配的http方法
    + `handler`用于指定处理方式,我们在[service worker相关部分](https://blog.hszofficial.site/TutorialForFront-EndWeb/#/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%8E%AF%E5%A2%83%E7%9A%84%E5%89%8D%E7%AB%AF%E5%BA%94%E7%94%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%8E%E9%80%9A%E4%BF%A1/ServiceWorker?id=%e6%8b%a6%e6%88%aafetch)有介绍过,这里我们就不用自己实现了,填策略对应的字符串即可,可选的策略有`CacheFirst`(缓存优先),`CacheOnly`(仅缓存),`NetworkFirst`(网络优先),`NetworkOnly`(仅网络),`StaleWhileRevalidate`(根据超时情况选择是否使用缓存)
    + `options`,用于设置额外配置项,比如常用的
        + `cacheName`,设置缓存名
        + `precacheFallback`,设置缓存不存在时回退到的url
        + `fetchOptions`,设置请求时的fetch设置,
        + `networkTimeoutSeconds`,设置网络连接的最大过期时长
        + `matchOptions`设置匹配的额外规则,也就是`ignoreSearch`,`ignoreMethod`,`ignoreVary`的设置
        + `backgroundSync`设置网络请求应失败则将请求放入后台队列的逻辑,对应插件[BackgroundSyncPlugin](https://developer.chrome.google.cn/docs/workbox/modules/workbox-background-sync?hl=zh-cn#type-BackgroundSyncPlugin)
        + `broadcastUpdate`设置缓存更新后的通知行为,对应插件[BroadcastUpdatePlugin](https://developer.chrome.google.cn/docs/workbox/modules/workbox-broadcast-update?hl=zh-cn#type-BroadcastUpdatePlugin),当有缓存更新后,插件会通过`message`事件广播消息,广播的内容形式如下

            ```json
            {
                "type": "CACHE_UPDATED",
                "meta": "workbox-broadcast-update",
                // The two payload values vary depending on the actual update:
                "payload": {
                    "cacheName": "the-cache-name",
                    "updatedURL": "https://example.com/"
                }
            }
            ```

        + `cacheableResponse`设置仅缓存符合特定条件的请求,对应插件[CacheableResponsePlugin](https://developer.chrome.google.cn/docs/workbox/modules/workbox-cacheable-response?hl=zh-cn#type-CacheableResponsePlugin)
        + `expiration`,设置缓存的过期行为,对应插件[ExpirationPlugin](https://developer.chrome.google.cn/docs/workbox/modules/workbox-expiration?hl=zh-cn#type-ExpirationPlugin)
        + `rangeRequests`,设置响应是否包含`Range HTTP`请求标头的请求,对应插件[RangeRequestsPlugin](https://developer.chrome.google.cn/docs/workbox/modules/workbox-range-requests?hl=zh-cn#type-RangeRequestsPlugin)

##### 跨域请求的处理

service worker对跨域请求的缓存支持是比较复杂的,基本上可以认为能不要跨域就不要跨域是最稳妥的方案.但基本要求就是要显式的声明这个处理的是一个跨域的请求.具体来说有2个方面

1. 主线程的请求部分要显式的声明跨域的请求.也就是如下几个方面
    + 第三方静态资源需要设置`crossorigin`属性为`anonymous`

        ```html
        <link crossorigin="anonymous" rel="stylesheet" href="https://example.com/path/to/style.css">
        <img crossorigin="anonymous" src="https://example.com/path/to/image.png">
        ``
    
    + fetch要设置跨域

        ```ts
        const res = await fetch(url,
            {
                ...
                mode: 'cors'
            }
        )
        ```

2. service worker中要设置匹配的url为完整url,且参数要有`cacheableResponse`

```ts
const pwaOptions: Partial<VitePWAOptions> = {
    ...
    runtimeCaching: [
        {
            urlPattern: /^http:\/\/localhost:5000\/api\/hero\/.*/i,
            method: "GET",
            handler: 'CacheFirst',
            options: {
                expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
                },
                cacheableResponse: {
                    statuses: [0, 200],
                },
            },
        },
        ...
    ],
    ...
}
```

#### injectManifest模式下设置service worker脚本

如果我们对service worker有更高的要求,比如希望接入推送,希望参与一些业务逻辑,那我们就需要使用`injectManifest`模式.

`injectManifest`模式的启动方式是将`strategies`字段设置为`injectManifest`.此时默认情况下插件会从项目的`public`文件夹下查找名为`sw.js`的文件做为源文件.如果要更改位置或service worker源文件的名称则需要更改以下插件选项:

+ `srcDir`: 必须是相对于项目根目录的
+ `filename`: 包括文件扩展名,必须相对于`srcDir`文件夹的路径

```ts
const pwaOptions: Partial<VitePWAOptions> = {
    ...
    strategies: 'injectManifest',
    srcDir: 'src',
    filename: 'my-sw.js',
    ...
}
```

官方推荐使用[Workbox](https://developer.chrome.com/docs/workbox/modules/workbox-build?hl=zh-cn#which-mode-to-use)作为自定义`sw.js`的开发框架.我们即便不想用也必须安装它并给出一个最基本的框架,否则插件无法将要缓存的静态资源插入其中

##### typescript支持

要让我们的service worker可以用ts来开发,我们需要做如下设置

+ `ts.config.json`中添加`WebWorker`到`lib`

    ```json
    {
        ...
        "include": [..., "public/*.ts"], //将源文件加入编译的目标
        "compilerOptions": {
            ...
            "lib": ["ESNext", "DOM", "WebWorker"],
            ...
        }
    }

    ```

+ `vite.config.ts`vite配置中设置源文件路径,注意我们为了方便起见,我们就将源文件命名为`sw.ts`

##### 设置静态资源预缓存

我们可以在service worker源文件中像这样定义静态资源预缓存

+ sw.ts

    ```ts
    // import { clientsClaim } from 'workbox-core'; //自动更新需要
    import { precacheAndRoute } from 'workbox-precaching';

    declare let self: ServiceWorkerGlobalScope;

    precacheAndRoute(self.__WB_MANIFEST) // 预缓存静态文件
    ```

插件识别出来的所有静态资源会被放到`self.__WB_MANIFEST`中. 调用`workbox`的`precacheAndRoute`接口就可以实现静态资源的预缓存了

如果你有额外的静态资源需要预缓存,和`generateSW模式`中一样,在插件配置中使用`globPatterns`字段指定即可

+ `vite.config.ts`

    ```ts
    const pwaOptions: Partial<VitePWAOptions> = {
        ...
        injectManifest: {
            globPatterns: ['**/*.{js,css,html}']
        },
    }
    ```

##### 设置过期缓存清理

每次重新加载安装service worker我们一般都会清理过期的缓存.可以在预缓存前先调用`workbox`的`cleanupOutdatedCaches`接口

+ sw.ts

    ```ts

    import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';

    declare let self: ServiceWorkerGlobalScope;

    cleanupOutdatedCaches() //清除过期缓存

    precacheAndRoute(self.__WB_MANIFEST) // 预缓存静态文件
    ```

##### 自动更新设置

个人并不推荐自动更新,但如果你设置了自动更新(即`registerType`设置为`autoUpdate`),我们要让它生效可以这样写

+ sw.ts

    ```ts
    import { clientsClaim } from 'workbox-core'; //自动更新需要
    ...

    // 自动更新设置
    self.skipWaiting()
    clientsClaim()
    ```

##### 更新提示

如果你设置了提示更新(即`registerType`设置为`prompt`),我们要让它生效需要加上如下代码

+ sw.ts

    ```ts
    self.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SKIP_WAITING') {
            self.skipWaiting()
        }
    })
    ```

##### 设置请求拦截

请求拦截的设置相对复杂些,但总体是

+ 使用`workbox-routin`的`registerRoute`接口注册路由回调,
+ 在其中使用`workbox-strategies`的各种缓存策略类,
+ 如果需要设置请求失败后丢进队列等网络恢复后执行,则通过[workbox-background-sync](https://developer.chrome.com/docs/workbox/modules/workbox-background-sync?hl=zh-cn)的`BackgroundSyncPlugin`来实现
+ 如果希望缓存更新后有通知行为,则通过[workbox-broadcast-update](https://developer.chrome.google.cn/docs/workbox/modules/workbox-broadcast-update?hl=zh-cn#type-BroadcastUpdatePlugin)的`BroadcastUpdatePlugin`来实现
+ 如果希望设置仅缓存符合条件的响应,则通过[workbox-cacheable-response](https://developer.chrome.google.cn/docs/workbox/modules/workbox-cacheable-response?hl=zh-cn#type-CacheableResponsePlugin)的`CacheableResponsePlugin`来实现
+ 如果要设置缓存过期则通过[workbox-expiration](https://developer.chrome.com/docs/workbox/modules/workbox-expiration?hl=zh-cn)的`ExpirationPlugin`来实现,
+ 如果希望设置响应是否包含`Range HTTP`请求标头的请求,则通过[workbox-range-requests](https://developer.chrome.google.cn/docs/workbox/modules/workbox-range-requests?hl=zh-cn#type-RangeRequestsPlugin)的`RangeRequestsPlugin`来实现

总体来说这些行为和`generateSW`模式下的配置项是一致的,只是我们要写成代码,比如

+ sw.ts

    ```ts
    import {registerRoute} from 'workbox-routing'
    import {CacheFirst} from 'workbox-strategies'
    import {ExpirationPlugin} from 'workbox-expiration'
    import {BroadcastUpdatePlugin} from 'workbox-broadcast-update'
    ...

    registerRoute(
        ({ request }) => request.destination === 'image',// 也可以和`generateSW`模式下一样用re
        new CacheFirst({
            cacheName: 'image-cache',
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 20,
                }), 
                new BroadcastUpdatePlugin()
            ], // 使用插件实现特定功能
        }), // 指定操作策略
        "GET", //指定匹配的http方法
    )
    ```

使用上面这些我们就已经可以完成原本`generateSW`模式下通过配置实现的部分了,剩下的你就得自己发挥了.