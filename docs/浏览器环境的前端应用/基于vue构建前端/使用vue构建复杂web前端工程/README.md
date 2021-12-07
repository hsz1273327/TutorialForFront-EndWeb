# 使用vue构建复杂web前端工程

我们学习vue是为了解决web前端工程化的问题.既然如此我们就用一个例子来展示如何利用所学知识和社区生态构造一个复杂的web前端.这个项目将会是本系列文章的真正起点,后续在各个平台上的技术应用都将是由这个例子修改而来

## 英雄指南项目

这是个非常经典的样例项目,是[angular教程](https://angular.cn/tutorial)使用的例子.它包含如下功能:

1. 仪表盘
2. 英雄列表
3. 英雄录入
4. 英雄详情

当然这个例子还不够复杂,我们会在本章节中逐渐增加它的复杂度,从而让他可以:

1. 与后端交互获取和提交数据
2. 使用数据可视化技术展示英雄属性
3. 通过动画过渡提高交互体验

这个项目原始有3个页面

+ 首页仪表盘

![首页仪表盘](source/heroes-dashboard-1.png)

+ 英雄列表

![英雄列表](source/heroes-list-2.png)

+ 英雄详情

![英雄详情](source/hero-details-1.png)

我们会增加一个页面`创建英雄`以让这个项目更加丰富

但在开始之前我们先来介绍下用到的其他库:

1. [element-plus](https://element-plus.gitee.io/zh-CN/component/border.html),应该是vue生态下最知名的综合性组件库,可以满足90%的web开发需求,通过`vue-cli`的插件`vue-cli-plugin-element-plus`安装
2. [Vue Router](https://next.router.vuejs.org/zh/index.html),vue官方的路由插件,通过`vue-cli`的插件`@vue/cli-plugin-router`安装
3. [vuex](https://next.vuex.vuejs.org/zh/index.html),vue官方的状态管理插件,通过`vue-cli`的插件`@vue/cli-plugin-vuex`安装
4. [vue-echarts](https://github.com/ecomfe/vue-echarts/blob/main/README.zh-Hans.md),[echarts](https://echarts.apache.org/zh/index.html)项目的vue组件封装,直接`npm install echarts vue-echarts`安装

另外补充两个约定:

1. 我们的服务端在[hero-tutorial-api分支](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/hero-tutorial-api)
2. 我们使用`script setup`风格创建组件.
