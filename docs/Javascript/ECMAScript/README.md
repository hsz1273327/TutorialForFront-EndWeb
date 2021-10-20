# ECMAScript基础语法

ECMAScript是Javascript的正式名(简称ES).到2021年为止有如下版本:

+ `ES5`(`ECMAScript 2009`): 主要是增加了严格模式,数组的函数式方法,Object的一些方法等,这个版本一般被认为是现代Javascript语言的开端
+ `ES6`(`ECMAScript 2015`): 一个激进的大版本的升级,增加了大量特性,可以认为是Javascript跨时代的一个版本,让Javascript成了一门真正的现代编程语言,包括如下特性:
    + 块级作用域和`let/const`关键字
    + 类(`class`)关键字
    + 模块化(`ES Module`)及`import/export`语法
    + 箭头函数
    + 函数参数默认值
    + 模板字符串
    + 解构赋值
    + 延展操作符`...`
    + 对象属性简写
    + Promise类型和对应的异步操作接口
    + Symbol类型
    + Proxy类型
    + Set/Map类型

+ `ES7`(`ECMAScript 2016`): 一个小版本更新包括如下特性:
    + 增加了`Array.prototype.includes()`方法用于简餐包含关系
    + 增加了指数操作符`**`.
+ `ES8`(`ECMAScript 2017`): 一个不大不小的版本更新包括如下特性:
    + 在ES6的Promise基础上增加了关键字`async,await`关键字和对应的异步操作编程范式
    + `Object.values(o)`获取对象的字段值的列表
    + `Object.entries(o)`获取对象的键值对构造的列表
    + String padding,字符串增加`padStart(n)`和`padEnd(n)`用于在其头部或者尾部增加对应个数的空格
    + 函数参数列表结尾允许逗号
    + `Object.getOwnPropertyDescriptors()`获取一个对象的所有自身属性的描述符,如果没有任何自身属性,则返回空对象.
    + `SharedArrayBuffer`类型用来表示一个通用的,固定长度的原始二进制数据缓冲区.以及对应的`Atomics`类型可以对`SharedArrayBuffer`对象进行原子操作
+ `ES9`(`ECMAScript 2018`): ES8基础上的一次更新,增加了如下特性:
    + 异步迭代器以及对应的调用语法`for await (let i of x)`
    + `Promise.finally()`方法
    + Object的Rest/Spread属性
    + 正则表达式命名捕获组和反向断言
    + 正则表达式dotAll模式
+ `ES10`(`ECMAScript 2019`):依然是小更新,增加了如下特性:
    + `Array.flat()`和`Array.flatMap()`
    + `String.trimStart()`和`String.trimEnd()`用于去除字符串首尾空白字符
    + `String.prototype.matchAll`为所有匹配的匹配对象返回一个迭代器
    + `Symbol.prototype.description`获取Symbol对象的可选描述字符串
    + `Object.fromEntries()`返回一个给定对象自身可枚举属性的键值对数组,常用于将Map转化为Object
    + 可选Catch
+ `ES11`(`ECMAScript 2020`):一个较大的更新版本,主要是针对空值的处理做出了优化,增加了如下特性:
    + 空值处理运算符(Nullish coalescing Operator)`?? t // f`用法类似条件运算符`? t : f`
    + 可选链运算符(Optional chaining)`obj?.attr`用于检测不确定的中间节点
    + `Promise.allSettled`返回一个在所有给定的promise已被决议或被拒绝后决议的promise,并带有一个对象数组,每个对象表示对应的promise结果
    + 模块动态导入全局方法`import()`
    + 新基本数据类型`BigInt`表示任意精度的整数
    + 函数外的this扩展,在不同执行环境中有不同含义
        + 浏览器: window
        + worker: self
        + node: global

可以看到从ES6开始js才获得了真正意义上的表现力,之后的所有更新基本都是在其基础上的调整,而ES6已经在稍微现代点的浏览器比如chrome和node.js中实装,本文所讲的语法内容基本以ES6为基准,包括:

+ 基本语法和代码结构
+ 变量,值与运算
+ 从运算符到函数
+ 迭代器和生成器
+ 基本容器
+ 异步编程
+ 面向对象编程
+ 模块化编程
+ 特殊对象和特殊接口

当涉及到ES6以上版本的语言特性时这边也会标出

如果想要更加细节的js语法知识,可以看[MDN上的文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide)
