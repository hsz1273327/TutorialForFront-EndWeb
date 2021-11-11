# Vue.js攻略

[Vue.js](https://v3.cn.vuejs.org/)是一个专注于网页前端的框架项目,其支持渐进式的开发模式,也就是由少到多的使用它.不过本文的目标读者是非前端开发人员但需要使用前端技术的人,因此历史包袱小,我们没有必要从jquery开始按前端架构演变的路线一路下来,只需要直接全盘使用vue.js即可.

Vue.js的大版本是v3,但v2也十分流行并且有大量遗留项目.v3版本在性能和对ts的支持方面都大幅优于v2版本,但好在v3基本兼容v2,因此本文以v3版本为基准.

## vue生态的基本特点

vue.js本体专职页面渲染,大致有如下特点:

1. 声明式模板
2. 组件化
3. 数据双向绑定

配合生态中的状态管理插件[Vuex](https://vuex.vuejs.org/zh/guide/)和路由插件[Vue Router](https://router.vuejs.org/zh/guide/)就可以完整的构建前端项目了.而且还有脚手架工具是[vue cli](https://cli.vuejs.org/zh/guide/)可以非常方便的构建和管理项目.

vue支持es也支持ts,作为一个前端"项目",从可维护性角度看我们应该首选ts.

vue生态的最大特点就是统一.它非常的不像个js项目而是很像python项目.生态统一,基础功能都是官方维护.前端项目的最恶心之处就在于碎片化,有一堆工具声称可以实现这个那个,但要找到合适自己的那个实现甚至只是希望完成一个helloworld都其费事.而vue生态的最大优势就是它在给你选择的同时会给你一个通用的实现对应你的需求.你不需要去额外挑选非常省心.这也是本文以vue为基础写作的原因.

本文会分为如下几个部分

1. vue核心概念介绍

2. 利用vue生态构造一个复杂的前端项目"英雄指南"

3. 将"英雄指南"改造为一个pwa项目

但在所有之前我们先来个helloworld直观的了解下vue项目

## helloworld

我们先创建一个简单完整的vue项目用于演示.这个项目的代码在[浏览器环境-vue-hello分支](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%8E%AF%E5%A2%83-vue-hello).

我们先`npm install -g @vue/cli`全局安装`vue-cli`.安装好后我们在目标文件夹下执行`vue create helloworld -n`

根据提示我们选择需要的插件,选择`babel+typescript+stylus+eslint only error`即可.注意:

1. 不要使用typescript的class模式.
2. 多选时使用空格选择,回车确定结果进入下一步

等全部安装完成我们进入项目文件夹下执行`npm run serve`即可执行,我们可以看到一个最简单的页面介绍vue项目;使用`npm run build`就可以将项目编译为前端项目的最终成果(在目录`dist`中).

### vue项目基本结构

一个vue项目的基本结构如下:

```bash
helloworld--|
            |--dist //编译完成后的项目
            |--node_modules //依赖的模块
            |--public--|
            |          |--index.html //入口html文件,必须包含`<div id="app"></div>`
            |          |--favicon.ico //前端页的窗口图标
            |
            |--src--|
                    |--main.js/main.ts //vue项目的入口
                    |--App.vue //vue项目的跟组件
                    |--assets //存放图片资源
                    |--router //定义路由,内部是js/ts文件
                    |--store //定义状态,内部是js/ts文件
                    |--views //展示视图组件
                    |--components //其他组件
                    |--apis //管理所有的远程数据获取
```

vue.js是完全组件化的,通常每个文件就是一个组件,管理页面中的一个元素,组件之间可以嵌套,构造成一个组件树,这个组件树就是我们要表现的页面了.我们要表现的完整页面通常被称为视图(view)会放在单独的文件加下管理,通常组件树的根节点并不直接包含视图节点,而是通过路由来串联.

在这个例子中这个组件树如下:

```bash
App.vue(+router)--|
                  |--components/HelloWorld.vue
```
