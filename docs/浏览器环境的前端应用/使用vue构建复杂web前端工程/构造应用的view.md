# 构造应用的view

在构造出一个可用的前端应用前,我们应该先设计好项目的大体交互框架,这个大体交互框架中每个可交互的页面就是视图view,通常来说前端或客户端项目最主要的工作就是构造交互层,而交互层一般来说都是通过设计view以及view间的交互逻辑来构造的.

在vue中view就是组件的堆叠,在web前端场景下组件自然就是html标签.但是html标签过于底层,因此就有不少第三方项目将html标签构根据不同的场景组合搭配后包装成了组件库.

## 使用第三方组件库element-plus

使用组件库主要是为了快速开发,可以将组件库理解为html标签的高级接口.使用组件库最大的好处就是可以省去自己写css,组件逻辑这些事情的麻烦,我们要做的基本只是写个view层就可以了.

vue生态下最知名的组件库应该是饿了么的[element](https://element.eleme.cn/),而针对vue3版本的element组件度是单独的[element-plus](https://element-plus.gitee.io/zh-CN/component/border.html)本文也会使用这个组件库作为例子,其他比较流行的组件库还有[iview](https://github.com/iview/iview)
等.基本上使用也是一个套路.

要安装它我们直接`npm install element-plus --save`即可

由于element-plus是一个组件库,组件必然相当多,所以就会存在3种加载模式

+ 全量加载,优点是配置简单,方便调试,缺点是编译后项目大,适合不在乎编译后项目大小的项目
+ 按需加载,官方推荐的加载方式,缺点是隐式导入,且有需要有额外的设置,优点是自动导入按需编译,项目大小更加合理
+ 手动加载,缺点是也要做额外设置,而且导入模块是侵入式的,优点是按需显式导入更加可控,项目大小更加合理

个人也更加推荐按需加载方案.

### 全量加载

全量加载需要在入口导入整个插件和对应的css

+ main.ts

    ```ts
    import { createApp } from 'vue'
    import App from './App.vue'
    import ElementPlus from 'element-plus'
    ...
    const app = createApp(App)
    app.use(ElementPlus)
    ...
    ```

使用的时候直接在组件的模版部分使用标签即可

+ xxx.vue

    ```vue
    <template>
      <el-button>我是 ElButton</el-button>
    </template>
    ```

### 按需加载

按需加载不需要额外导入,但需要额外安装`unplugin-vue-components`和`unplugin-auto-import`两个插件

```bash
npm install -D unplugin-vue-components unplugin-auto-import
```

然后仅需要修改`vite`的配置即可

+ vite.config.ts

    ```ts
    ...
    import { defineConfig } from 'vite'
    ...
    import AutoImport from 'unplugin-auto-import/vite'
    import Components from 'unplugin-vue-components/vite'
    import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
    ...

    // https://vitejs.dev/config/
    export default defineConfig({
      ...
      plugins: [
        ...
        AutoImport({
          resolvers: [ElementPlusResolver()],
        }),
        Components({
          resolvers: [ElementPlusResolver()],
        }),
        ...
      ],
      ...
    })
    ```

使用的时候和全局导入一样,直接在组件的模版部分使用标签即可

+ xxx.vue

    ```vue
    <template>
      <el-button>我是 ElButton</el-button>
    </template>
    ```

#### 手动加载

手动加载则是用户在编写组件时要手动导入标签,在导入后就可以正常使用

+ xxx.vue

    ```vue
    <template>
      <el-button>我是 ElButton</el-button>
    </template>
    <script lang="ts" setup>
      import { ElButton } from 'element-plus'

    </script>
    ```

要这样使用我们还需要额外安装插件`unplugin-element-plus`

```bash
npm install -D unplugin-element-plus
```

然后修改`vite`的配置即可

+ vite.config.ts

    ```ts
    ...
    import { defineConfig } from 'vite'
    ...
    import ElementPlus from 'unplugin-element-plus/vite'
    ...

    // https://vitejs.dev/config/
    export default defineConfig({
      ...
      plugins: [
        ...
        ElementPlus(),
        ...
      ],
      ...
    })
    ```

#### 导入样式

需要注意上面仅仅是导入组件的介绍,并不包含导入样式,如果要导入样式我们还得在入口中显示的导入

+ main.ts

    ```ts
    ...
    import 'element-plus/es/components/message/style/css'
    ...
    ```

## 本文例子

这边只是先给出第一版--视图部分,因此本文对应这个项目的分支[hero-tutorial-web-view-only](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/hero-tutorial-web-view-only).


## 视图构建

上面说过我们有4个视图

+ 首页仪表盘

+ 英雄列表

+ 英雄详情

+ 创建英雄

我们分别来构造这4个视图的页面,但在这之前我们先来给整个页面排个版.在考虑路由和数据之前我们先使视图组件内各自有自己的数据,同时在根节点上直接依次展示这4个view组件以方便调试.

至于要展示的内容我们直接使用一个`const.ts`文件维护一个英雄列表.在后面接入后端后再将其替换.

可以看到这个最终版本app头部实际上是一直不变的,永远是app名字和两个主要视图的路由;而下面会变的部分才是这些路由渲染的页面.我们可以在App.vue组件上声明好这个根视图.

+ App.vue

    ```vue
    <template>
      <div id="app">
        <el-container>
          <el-header height="120">
            <header>
              <el-row :gutter="10" type="flex" justify="center">
                <h1>英雄指南</h1>
              </el-row>
              <el-row :gutter="10" type="flex" justify="center">
                <el-menu
                  :default-active="activeIndex"
                  class="el-menu-demo"
                  mode="horizontal"
                >
                  <el-menu-item index="1">仪表盘</el-menu-item>
                  <el-menu-item index="2">英雄列表</el-menu-item>
                </el-menu>
              </el-row>
              <el-divider></el-divider>
            </header>
          </el-header>
          <el-main>
            <DashBoard></DashBoard>
            <HeroList></HeroList>
            <HeroDetail></HeroDetail>
            <NewHero></NewHero>
          </el-main>
        </el-container>
      </div>
    </template>

    <script setup lang="ts">
    import DashBoard from "./views/DashBoard.vue";
    import HeroDetail from "./views/HeroDetail.vue";
    import HeroList from "./views/HeroList.vue";
    import NewHero from "./views/NewHero.vue";
    import { ref } from "vue";
    const activeIndex = ref("1");
    </script>

    <style>
    #app {
      font-family: "Avenir", Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
    }
    </style>
    ```

这个根视图除了我们的view组件外使用了如下element组件库中的组件: 

+ [布局容器相关](https://element-plus.org/zh-CN/component/container.html)

    这部分是容器相关的组件,用于对app整体布局.作用类似html中的[语义化布局的语义化标签](https://blog.hszofficial.site/TutorialForFront-EndWeb/#/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%8E%AF%E5%A2%83%E7%9A%84%E5%89%8D%E7%AB%AF%E5%BA%94%E7%94%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%8E%E9%A1%B5%E9%9D%A2%E6%B8%B2%E6%9F%93/html%E6%A0%87%E8%AF%86%E9%A1%B5%E9%9D%A2%E5%85%83%E7%B4%A0/%E8%AF%AD%E4%B9%89%E5%8C%96%E6%A0%87%E7%AD%BE%E4%B8%8E%E9%A1%B5%E9%9D%A2%E5%B8%83%E5%B1%80?id=%e8%af%ad%e4%b9%89%e5%8c%96%e5%b8%83%e5%b1%80%e7%9a%84%e8%af%ad%e4%b9%89%e5%8c%96%e6%a0%87%e7%ad%be)

    | 组件模块对象 | 组件名       | 功能           |
    | ------------ | ------------ | -------------- |
    | ElContainer  | el-container | 声明容器       |
    | ElMain       | el-main      | 声明是主体部分 |
    | ElHeader     | el-header    | 声明是头部     |

    容器相关的组件会根据配置自动按规则排版,具体的可以去看官方文档

+ [布局相关](https://element-plus.org/zh-CN/component/layout.html)

    这部分布局相关的组件通常需要配合容器相关组件,通常容器相关的是整体布局,而布局相关的则是局部布局,element类似以前的bootstrap使用行作为单位,每一行被分成24份,通过设置一些参数进行排列其中的单元,

    | 组件模块对象 | 组件名 | 功能             |
    | ------------ | ------ | ---------------- |
    | ElRow        | el-row | 声明这是一行组件 |

+ [导航菜单](https://element-plus.org/zh-CN/component/menu.html)

    导航菜单组件作用就是构造导航栏,除了可以构造这种传统的顶部导航栏,也可以构造侧边导航.具体的可以看文档中的样例.

    | 组件模块对象 | 组件名       | 功能               |
    | ------------ | ------------ | ------------------ |
    | ElMenu       | el-menu      | 声明导航栏         |
    | ElMenuItem   | el-menu-item | 声明导航栏中的项目 |

    需要注意顶部导航有一个非常常见的需求就是左边一堆选项,但右侧会有一个少数几个栏目需要靠右侧放置,这个时候我们只能直接使用css:

    ```css
    .el-menu--horizontal>.el-menu-item.dock-right {
      float: right;
    }

    .el-menu--horizontal>.el-submenu.dock-right {
      float: right;
    }
    ```

    然后在`el-menu-item`上指定`class="dock-right"`

+ [分割线](https://element-plus.org/zh-CN/component/divider.html)

    分割线组件模块可以以特定格式画出一条分割线

    | 组件模块对象 | 组件名     | 功能           |
    | ------------ | ---------- | -------------- |
    | ElDivider    | el-divider | 声明一条分割线 |

### 首页仪表盘

仪表盘我们可以看到其实就两行

+ 标题行

+ 一个卡片的横向排列行,卡片上是我们的英雄名字

我们的组件可以这样定义:

+ DashBoard.vue

    ```vue
    <template>
      <div class="dashboard">
        <el-row type="flex" justify="center">
          <h2>Top Heros</h2>
        </el-row>
        <el-row :gutter="1" type="flex" justify="space-around">
          <template v-for="item in heros" :key="item.id">
            <el-col span="4">
              <el-card shadow="hover">{{ item.name }}</el-card>
            </el-col>
          </template>
        </el-row>
      </div>
    </template>

    <script setup lang="ts">
    import { ref } from "vue";
    import { DefaultHeros } from "../const";
    const heros = ref(Object.assign([], DefaultHeros));
    </script>
    ```

我们现在只是展示用,数据都是写死的.这不重要,后续我们再来整理这些数据.

这个组件使用到的element组件有:

+ [布局相关](https://element-plus.org/zh-CN/component/layout.html)

    此处出现布局中的列,列是布局中的最小单元,行上,可以决定列的间隔,对其方式等属性,列自己则可以决定自己占据行中的长度.

    | 组件模块对象 | 组件名 | 功能                 |
    | ------------ | ------ | -------------------- |
    | ElCol        | el-col | 声明这是一行中的一列 |
    | ElRow        | el-row | 声明这是一行         |

+ [卡片组件](https://element-plus.org/zh-CN/component/card.html)

    卡片组件一般用于展示图片或者介绍信息,其主要的配置项是

    + `header`这是一个slot,可以插入内容,通常用于些标题或者操作按钮什么的
    + `body-style`这个属性可以传入css描述,借此可以插入图片,填充背景色等等
    + `shadow`卡片阴影,通常用于交互,提示用户的鼠标覆盖情况

    | 组件模块对象 | 组件名  | 功能                 |
    | ------------ | ------- | -------------------- |
    | ElCard       | el-card | 声明这是一个卡片组件 |

### 英雄列表

英雄列表也是很简单的结构

+ 一个标题
+ 一个英雄的表格

我们的组件可以这样定义:

+ HeroList.vue

    ```vue
    <template>
      <div class="hero-list">
        <el-row type="flex" justify="center">
          <h2>Hero List</h2>
        </el-row>
        <el-row type="flex" justify="center">
          <el-table :data="heros" style="width: 100%">
            <el-table-column label="id" width="180" align="center">
              <template #default="scope">
                <span style="margin-left: 10px">{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="name" width="180" align="center">
              <template #default="scope">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
    </template>
    <script setup lang="ts">
    import { ref } from "vue";
    import { DefaultHeros } from "../const";
    const heros = ref(Object.assign([], DefaultHeros));
    const handleEdit = (index: any, row: any) => {
      console.log(index, row);
    };
    const handleDelete = (index: any, row: any) => {
      console.log(index, row);
    };
    </script>
    ```

这个组件使用到的element组件有:

+ [表格组件](https://element-plus.org/zh-CN/component/table.html)

    表格是展示结构化数据的最佳方式,element提供了足够优秀的表格组件,可以满足大部分需求,具体的样式可以看文档.
    element的表格导入数据使用`data`字段,只要绑定这个字段到我们的父组件上想展示的列表数据上就可以了,因此表格的配置主要是配置列.列除了可以使用`data`字段中的值外,也可以插入其他元素或者自定义样式,只要使用作用域slot即可.

    | 组件模块对象  | 组件名          | 功能                             |
    | ------------- | --------------- | -------------------------------- |
    | ElTable       | el-table        | 声明这是一个表格,必须绑定data    |
    | ElTableColumn | el-table-column | 声明这是一列,可以设置标题,宽度等 |

+ [标签组件](https://element-plus.org/zh-CN/component/tag.html)

    标签组件一般用于标记和选择,预定义了几种type类型`success/info/warning/danger`用颜色区分等级,如果不填则使用默认配色.

    | 组件模块对象 | 组件名 | 功能             |
    | ------------ | ------ | ---------------- |
    | ElTag        | el-tag | 声明这是一个标签 |

+ [按钮组件](https://element-plus.org/zh-CN/component/button.html)

    按钮组件就是定义一个按钮,可以通过`size`字段设置`medium / small / mini`定义按钮大小,通过`plain/round/circle`这些属性的布尔值来设定形状,也可以使用`icon`添加图标.

    | 组件模块对象 | 组件名    | 功能             |
    | ------------ | --------- | ---------------- |
    | ElButton     | el-button | 申明这是一个按钮 |

### 英雄详情

英雄的详情需要知道它需要展示的是哪个英雄的详情,这就需要父组件给子组件传递一个参数.这种场景比较常用的方式就是用`Prop`.

+ HeroDetail.vue

    ```vue
    <template>
      <div class="hero-detail">
        <el-row type="flex" justify="center">
          <h1>英雄详情</h1>
        </el-row>
        <el-row type="flex" justify="center">
          <el-card shadow="hover">
            <template v-slot:header>
              <div class="clearfix" v-if="hero">
                <span>{{ hero.id }}</span>
              </div>
            </template>
            <div>
              名字：
              <el-input v-model="hero.name" :placeholder="hero.name"></el-input>
              <el-button type="primary" round @click="submitHero">提交</el-button>
            </div>
          </el-card>
        </el-row>
      </div>
    </template>

    <script setup lang="ts">
    import { ref } from "vue";
    import { DefaultHeros } from "../const";
    interface Props {
      id: number;
    }
    const props = withDefaults(defineProps<Props>(), {
      id: 1,
    });
    const _hero = DefaultHeros.filter((ele) => ele.id == props.id);
    if (_hero.length != 1) {
      alert(`id ${props.id} not found`);
      throw `id ${props.id} not found`;
    }
    const hero = ref(_hero[0]);
    const submitHero = () => {
      console.log(hero.value);
    };
    </script>
    ```

由于有传入参数,我们会需要有一个逻辑在组件初始化时获取到英雄的详细信息,这也是有可能失败的,我们这里暂且不考虑失败的情况,先给出页面

详情页我们用的组件有:

+ [输入框](https://element-plus.org/zh-CN/component/input.html)

    这个组件可以使用v-mode做数据的双向绑定.input的类型可以时html中规定的类型

    | 组件模块对象 | 组件名   | 功能               |
    | ------------ | -------- | ------------------ |
    | ElInput      | el-input | 申明这是一个输入框 |

### 创建英雄

创建英雄说白了就是提交一个表单.我们的创建英雄页面也就是展示和实现这个逻辑.

+ NewHero.vue

    ```vue
    <template>
      <div class="new-hero">
        <el-row type="flex" justify="center">
          <h1>创建英雄</h1>
        </el-row>
        <el-row type="flex" justify="center">
          <el-card shadow="hover">
            <el-form label-position="top" label-width="100px" :model="hero">
              <el-form-item label="Name">
                <el-input v-model="hero.name"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitHero">Create</el-button>
                <el-button @click="resetForm">Reset</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-row>
      </div>
    </template>

    <script setup lang="ts">
    import { ref } from "vue";
    const _defaultHeroInfo = {
      name: "",
    };
    const hero = ref(Object.assign({}, _defaultHeroInfo));
    const submitHero = () => {
      console.log(hero.value);
    };
    const resetForm = () => {
      hero.value = Object.assign({}, _defaultHeroInfo);
    };
    </script>
    ```

这个组件使用到的element组件有:

+ [表单组件](https://element-plus.org/zh-CN/component/form.html)

    表单组件使用`v-mode`双向绑定数据,`label-position`可以使用值`top`,`left`,`right`来控制输入提示文本的位置,也可以使用`inline`来设置表单为行内表单,这对在复杂结构中嵌入的表单比较有用.

    | 组件模块对象 | 组件名       | 功能                 |
    | ------------ | ------------ | -------------------- |
    | ElForm       | el-form      | 声明这是一个表单     |
    | ElFormItem   | el-form-item | 声明这是表单中的一项 |

至此,我们的4个页面就都写好了,虽然只是初版,还很不成熟,但基本的样式已经有了,后续的就是数据通信和路由设置了.
在后续的介绍中我们还会修改现有的方案使用的组件以满足更多的需求.

## 其他第三方组件库

element系列组件库固然知名用的多,其他开源的第三方组件库中也不乏更好的选择.这里推荐两个库:

+ [native ui](https://www.naiveui.com/zh-CN/light/docs/introduction),一个只支持vue3的组件库,它的特色是
    + 仅支持vue3,仅对桌面端有良好支持
    + typescript支持比较好
    + 偏门组件多
    + 单组件引入支持好,全部组件都支持摇树优化(treeshaking)
    + 不需要额外导入样式文件
    + 字体库[vfonts](https://github.com/07akioni/vfonts)以及图标库[xicons](https://www.xicons.org/#/zh-CN)配合良好

    这个库就很适合配合electron使用

+ [OpenTiny](https://opentiny.design/opentiny-design/guide/introduce),一个支持面很宽的库,它的特色是
    + 一个库支持vue2和vue3,支持桌面端和移动端
    + 自带图表组件
