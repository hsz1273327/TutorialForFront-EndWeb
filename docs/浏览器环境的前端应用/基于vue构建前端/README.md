# Vue.js攻略

[Vue.js](https://cn.vuejs.org/v2/guide/)是一个专注于网页前端的框架项目,其支持渐进式的开发模式,也就是由少到多的使用它.不过本文的目标读者是非前端开发人员但需要使用前端技术的人,因此历史包袱小,我们没有必要从jquery开始按前端架构演变的路线一路下来,只需要直接全盘使用vue.js即可.

## vue.js的基本特点

vue.js本体专职页面渲染,大致有如下特点:

1. 声明式模板
2. 数据双向绑定
3. 组件化

配合生态中的状态管理插件`Vuex`和路由插件`Vue Router`就可以完整的构建前端项目了.

## helloworld

我们先创建一个简单完整的vue项目用于演示.这个项目的代码在[github上](https://github.com/TutorialForJavascript/js-vue/tree/master/codes/helloworld).通常为了快速开始我们会使用脚手架.vue.js的脚手架工具是[vue cli](https://cli.vuejs.org/zh/)使用`npm install -g @vue/cli`全局安装.

安装好后我们在目标文件夹下执行`vue create helloworld`

根据提示我们选择需要的插件,选择babel+vuex+Router即可.等全部安装完成我们进入项目文件夹下执行`npm run serve`即可执行,我们可以看到一个最简单的页面介绍vue项目;使用`npm run build`就可以将项目编译为前端项目的最终成果(在目录`dist`中).

### vue项目基本结构

我们可以看到基本结构如下:
```bash
helloworld--|
            |--dist //编译完成后的项目
            |--node_modules //依赖的模块
            |--public--|
            |          |--index.html //入口html文件,必须包含`<div id="app"></div>`
            |          |--favicon.ico //前端页的窗口图标
            |
            |--src--|
                    |--main.js //vue项目的入口
                    |--App.vue //vue项目的跟组件
                    |--assets //存放图片资源
                    |--router //定义路由,内部是js文件
                    |--store //定义状态,内部是js文件
                    |--views //展示视图组件
                    |--components //其他组件
```

vue.js是完全组件化的,通常每个文件就是一个组件,管理页面中的一个元素,组件之间可以嵌套,构造成一个组件树,这个组件树就是我们要表现的页面了.我们要表现的完整页面通常被称为视图(view)会放在单独的文件加下管理,通常组件树的根节点并不直接包含视图节点,而是通过路由来串联.

在这个例子中这个组件树如下:

```bash
App.vue(+router)--|
                  |--views/About.vue
                  |--views/Home.vue--|
                               |--components/HelloWorld.vue
```





