# popup插件

更多的插件是一popup位核心构建的浏览器常驻应用--点击插件图标呼出界面,操作界面实现功能.你可以将这种插件看做是一个带交互的完整前端应用.既然是前端应用,那我们不禁要问是不是可以用vue来做?回答是可以.

## 使用vite搭配vue构造popup界面

要使用vite搭配vue构造popup界面乃至整个chrome插件项目,我们可以使用插件[crxjs/chrome-extension-tools](https://github.com/crxjs/chrome-extension-tools).

这个插件会为我们自动创建`service worker`脚本.编译vue源码为页面,可以省不少事儿.

### 构造项目

要构造一个项目,执行如下命令

1. 使用模版构造vite项目

    ```bash
    npm init vite@latest
    ```

    之后填上项目名,选`vue`,`typescript`即可,会自动创建填上的项目名对应的文件夹作为项目文件夹,`cd`进去做下一步配置

2. 确认`package.json`中`"type"`为`"module"`

3. 修改`vite.config.js`

    ```js
    import { defineConfig } from 'vite'
    import vue from '@vitejs/plugin-vue'
    import { crx } from '@crxjs/vite-plugin'  // <=新增
    import manifest from './manifest.json' with { type: 'json' } // <=新增,旧node不支持

    export default defineConfig({
    plugins: [
        vue(),
        crx({ manifest }),  // <=新增
    ],
    })
    ```

4. 在`vite.config.js`同级创建`manifest.json`文件,填上你的项目清单

    ```json
    {
        "manifest_version": 3,
        "name": "CRXJS Vue Vite Example",
        "version": "1.0.0",
        "action": { "default_popup": "index.html" },
        "host_permissions": ["http://localhost:5173/*"]
        ...
    }
    ```

5. 安装依赖

    ```bash
    npm i
    npm i -D @crxjs/vite-plugin@beta # 注意目前的vite 6还只有beta版本支持
    ```

这样项目就配置好了,我们可以执行`npm run dev`在浏览器中调试页面

### 调试

执行`npm run dev`后我们会在项目根目录得到`dist`文件夹,这就是插件文件夹了.我们就可以拿这个文件夹在chrome中加载为插件.调试模式中命令行并不会关闭,它会与我们的插件以`http://localhost:5173`相连,根据操作打印日志,如果关闭这个命令行,插件也会失效.我们需要让插件可以访问到这个地址所以`manifest`中需要声明`host_permissions": ["http://localhost:5173/*"]`

在调试模式中调试的差不多了我们可以使用`npm run build`生产出最终的插件代码,之后像正常的插件一样打包即可

## 例子--改造myclock项目

这个例子在[chrome-ext-my_clock_vue分支](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/chrome-ext-my_clock_vue).

之前我们的上一版例子非常简陋,就是纯文本形式,现在我们用vue生态就可以非常轻易的利用vue生态直接拿个时钟组件来做了.

+ `components/Clock.vue`

    ```vue
    <template>
        <div class="clock-container">
        <svg class="clock" :width="size" :height="size">
            <!-- 表盘 -->
            <circle class="clock-face" cx="50%" cy="50%" :r="radius" />
            
            <!-- 小时刻度 -->
            <line
            v-for="hour in 12"
            :key="hour"
            class="hour-mark"
            :x1="centerX"
            y1="5%"
            :x2="centerX"
            y2="10%"
            :transform="`rotate(${hour * 30} ${centerX} ${centerY})`"
            />

            <!-- 时针 -->
            <line
            class="hour-hand"
            :x1="centerX"
            :y1="centerY + 10"
            :x2="centerX"
            :y2="centerY - 60"
            :transform="`rotate(${hourRotation} ${centerX} ${centerY})`"
            />

            <!-- 分针 -->
            <line
            class="minute-hand"
            :x1="centerX"
            :y1="centerY + 10"
            :x2="centerX"
            :y2="centerY - 80"
            :transform="`rotate(${minuteRotation} ${centerX} ${centerY})`"
            />

            <!-- 秒针 -->
            <line
            class="second-hand"
            :x1="centerX"
            :y1="centerY + 20"
            :x2="centerX"
            :y2="centerY - 90"
            :transform="`rotate(${secondRotation} ${centerX} ${centerY})`"
            />

            <!-- 中心点 -->
            <circle class="center" cx="50%" cy="50%" r="3" />
        </svg>
        </div>
    </template>

    <script setup>
    import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

    const props = defineProps({
        size: {
        type: Number,
        default: 300
        }
    })

    const now = ref(new Date())
    const radius = computed(() => props.size / 2)
    const centerX = computed(() => props.size / 2)
    const centerY = computed(() => props.size / 2)

    // 计算指针角度
    const hourRotation = computed(() => {
        return (now.value.getHours() % 12) * 30 + now.value.getMinutes() * 0.5
    })

    const minuteRotation = computed(() => {
        return now.value.getMinutes() * 6 + now.value.getSeconds() * 0.1
    })

    const secondRotation = computed(() => {
        return now.value.getSeconds() * 6 + now.value.getMilliseconds() * 0.006
    })

    // 更新时间
    const updateTime = () => {
        now.value = new Date()
    }

    // 动画循环
    let animationFrame
    const animate = () => {
        updateTime()
        animationFrame = requestAnimationFrame(animate)
    }

    onMounted(() => {
        animate()
    })

    onBeforeUnmount(() => {
        cancelAnimationFrame(animationFrame)
    })
    </script>

    <style scoped>
    .clock-container {
        display: inline-block;
        padding: 20px;
        background: #f5f5f5;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .clock {
        background: #fff;
        border-radius: 50%;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .clock-face {
        fill: none;
        stroke: #333;
        stroke-width: 2;
    }

    .hour-mark {
        stroke: #666;
        stroke-width: 2;
        stroke-linecap: round;
    }

    .hour-hand {
        stroke: #333;
        stroke-width: 6;
        stroke-linecap: round;
        transition: transform 0.5s cubic-bezier(0.4, 2.3, 0.3, 1);
    }

    .minute-hand {
        stroke: #666;
        stroke-width: 4;
        stroke-linecap: round;
        transition: transform 0.5s cubic-bezier(0.4, 2.3, 0.3, 1);
    }

    .second-hand {
        stroke: #e74c3c;
        stroke-width: 2;
        stroke-linecap: round;
        transition: transform 0.2s cubic-bezier(0.4, 2.3, 0.3, 1);
    }

    .center {
        fill: #e74c3c;
    }
    </style>
    ```

+ `App.vue`

    ```vue
    <script setup lang="ts">
    import Clock from './components/Clock.vue'
    </script>

    <template>
    <Clock />
    </template>

    <style scoped>
    .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
    }

    .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
    }

    .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
    }
    </style>
    ```

## 本章的内容

在接下来的篇幅中我们用这套方法实地的构造一个简单的ollama调用插件用于做本地翻译,并在这个过程中介绍碰到的注意事项.这个项目并不是一个玩具项目,我们会单独放在仓库[hsz1273327/chrome-ollama-translate](https://github.com/hsz1273327/chrome-ollama-translate)中

在开始写这个插件之前,我们先来梳理下业务流程.用ollama做翻译说白了就如下几个步骤

1. 选个合适的大模型,这个模型需要是对话模型,而且最好多语言能力比较强,目前看qwen系列算比较好的选择,但具体用哪个模型我们应该留给用户自己做设置.
2. 和大模型对话,我们需要用`system`类型的prompt告诉大模型它的角色,用`user`类型的prompt告诉它要翻译的内容.

这里面就涉及到两个api

+ 获取当前系统中所有模型名的api
+ 聊天的api

我们需要的就是在popup页面中让用户选择模型,填入`system`类型的prompt和`user`类型的prompt的模板,然后保存下来,然后做一个右键菜单来捕获框选的文本内容执行翻译,最后将翻译的结果用`content_script`在原界面展示出来.

也就是说我们可以将这个插件拆解为3个部分

1. 配置页,我们放在popup里.
2. 后台定义右键行为,我们放在background里
3. 结果展示,我们放在content_script里

下面我们开始进入这个项目的构造