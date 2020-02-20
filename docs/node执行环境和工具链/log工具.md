
# log工具

由于js在设计之初是作为浏览器脚本的,因此还是预留了调试用的log模块`console`的.但它是不完备的,它无法为log设定显示等级,也无法将log输出至文件或者其他媒介.个人认为输出至其他媒介并不是log模块本身最关心的,但没法设置log的显示等级是非常不现代的.

还是得吐槽下js的简陋,连log工具功能都不齐.

## console对象

`console`是指的控制台,js是单线程的,因此它的log其实和python中的`print`差不多,就是将文本信息输出到特定位置而已,在浏览器中就是控制台,在node.js中就是terminal的标准输入输出.

如果使用typescript,console不会默认存在,需要`lib`中引入`DOM`才会可用.

### log分级

实际上标准的log是有分级的,标准是4个等级:


```typescript
console.log('文字信息')
```

    文字信息



```typescript
console.info('提示信息')
```

    提示信息



```typescript
console.warn('警告信息')
```

    警告信息



```typescript
console.error('错误信息')
```

    错误信息


#### log的格式化输出

占位符	|含义
---|---
`%s`|符串输出
`%d or %i`|整数输出
`%f`|浮点数输出
`%o`|打印javascript对象，可以是整数、字符串以及JSON数据


### 分组输出

所谓是分组其实就是缩进.分组可以多层嵌套

使用`console.group()`和`console.groupEnd()`包裹分组内容.

还可以使用`console.groupCollapsed()`来代替`console.group()`生成折叠的分组.

这种用法有点像python中上下文的感觉.



```typescript
console.group('第一个组')
console.log("1-1")
console.log("1-2")
console.log("1-3")
console.groupEnd()

console.groupCollapsed('第二个组')
console.log("2-1")
console.log("2-2")
console.log("2-3")
console.groupEnd()
```

    第一个组
      1-1
      1-2
      1-3
    第二个组
      2-1
      2-2
      2-3


### 表格输出

使用console.table()可以将传入的对象,Map或数组以表格形式输出,这个函数适合输出格式化数据


```typescript
console.table({
    a:1,
    b:2
})
```

    ┌─────────┬────────┐
    │ (index) │ Values │
    ├─────────┼────────┤
    │    a    │   [33m1[39m    │
    │    b    │   [33m2[39m    │
    └─────────┴────────┘



```typescript
console.table([1,2,3,4])
```

    ┌─────────┬────────┐
    │ (index) │ Values │
    ├─────────┼────────┤
    │    0    │   [33m1[39m    │
    │    1    │   [33m2[39m    │
    │    2    │   [33m3[39m    │
    │    3    │   [33m4[39m    │
    └─────────┴────────┘



```typescript
console.table(new Map([['one',1], ['two', 2], ['three', 3]]))
```

    ┌───────────────────┬─────────┬────────┐
    │ (iteration index) │   Key   │ Values │
    ├───────────────────┼─────────┼────────┤
    │         [33m0[39m         │  [32m'one'[39m  │   [33m1[39m    │
    │         [33m1[39m         │  [32m'two'[39m  │   [33m2[39m    │
    │         [33m2[39m         │ [32m'three'[39m │   [33m3[39m    │
    └───────────────────┴─────────┴────────┘



```typescript
console.table(new Set(["a","b","c"]))
```

    ┌───────────────────┬────────┐
    │ (iteration index) │ Values │
    ├───────────────────┼────────┤
    │         [33m0[39m         │  [32m'a'[39m   │
    │         [33m1[39m         │  [32m'b'[39m   │
    │         [33m2[39m         │  [32m'c'[39m   │
    └───────────────────┴────────┘


### 查看对象

使用Console.dir()显示一个对象的所有属性和方法,这个就有点像python中的dir(obj)


```typescript
console.dir({
    a:1,
    b:2,
    c:()=>1
})
```

    { a: [33m1[39m, b: [33m2[39m, c: [36m[Function: c][39m }


### *查看dom节点

`console.dirxml()`这个接口算是浏览器脚本时代遗留的特有接口,用于查看`html/xml`生成的dom节点


```typescript
console.dirxml(`<ul id="box">
  <li>蚂蚁部落一</li>
  <li>蚂蚁部落二</li>
  <li>蚂蚁部落三</li>
  <li>蚂蚁部落四</li>
</ul>`)
```

    <ul id="box">
      <li>蚂蚁部落一</li>
      <li>蚂蚁部落二</li>
      <li>蚂蚁部落三</li>
      <li>蚂蚁部落四</li>
    </ul>


### 条件输出

`console.assert(exp,msg)`这个接口在一定程度上式assert的替代


```typescript
console.assert(true, "你永远看不见我")
```


```typescript
console.assert(false, "你永远看不见我")
```

    Assertion failed: 你永远看不见我


### 计次输出

使用`console.count(tag)`输出内容和被调用的次数可以使用`console.countReset(tag)`重置被调用的次数


```typescript
(()=> {
    for(let i = 0; i < 3; i++){
        console.count("运行次数：")
    }
    console.count("运行次数1：")
})()
```

    运行次数：: 1
    运行次数：: 2
    运行次数：: 3
    运行次数1：: 1


### 追踪调用堆栈

使用Console.trace()来追踪函数被调用的过程,在复杂项目时调用过程非常多,用这个命令可以查看到栈上的信息


```typescript
const add=(a, b)=> {
    console.trace("Add function")
    return a + b
}

const add3=(a, b)=> {
    return add2(a, b)
}

const add2=(a, b)=> {
    return add1(a, b)
}

const add1=(a, b) =>{
    return add(a, b)
}

let x = add3(1, 1)
```

    Trace: Add function
        at add (evalmachine.<anonymous>:3:13)
        at add1 (evalmachine.<anonymous>:16:12)
        at add2 (evalmachine.<anonymous>:12:12)
        at add3 (evalmachine.<anonymous>:8:12)
        at evalmachine.<anonymous>:19:9
        at evalmachine.<anonymous>:22:3
        at sigintHandlersWrap (vm.js:274:15)
        at Script.runInContext (vm.js:128:14)
        at Object.runInContext (vm.js:295:6)
        at Object.execute (/usr/local/lib/node_modules/tslab/dist/executor.js:159:38)


### 计时功能

使用`console.time(tag)`和`console.timeEnd(tag)`包裹需要计时的代码片段,输出运行这段代码的运行时间(毫秒记).一组time上下文使用tag参数做标识,一个tag就是一个计时器,最多同时运行10000个计时器.在其中可以插入`console.timeLog(tag, value)`



```typescript
console.time("Chrome中循环1000次的时间")
for(var i = 0; i < 10; i++)
{
console.timeLog("Chrome中循环1000次的时间", i)
}
console.timeEnd("Chrome中循环1000次的时间")
```

    Chrome中循环1000次的时间: 8.58ms [33m0[39m
    Chrome中循环1000次的时间: 9.393ms [33m1[39m
    Chrome中循环1000次的时间: 9.985ms [33m2[39m
    Chrome中循环1000次的时间: 12.345ms [33m3[39m
    Chrome中循环1000次的时间: 13.694ms [33m4[39m
    Chrome中循环1000次的时间: 14.202ms [33m5[39m
    Chrome中循环1000次的时间: 14.646ms [33m6[39m
    Chrome中循环1000次的时间: 15.183ms [33m7[39m
    Chrome中循环1000次的时间: 15.648ms [33m8[39m
    Chrome中循环1000次的时间: 16.218ms [33m9[39m
    Chrome中循环1000次的时间: 16.904ms


### 性能分析

使用`console.profile()`和`console.profileEnd()`进行性能分析,查看代码各部分运行消耗的时间.这个方法在node中需要使用`--inspect`标签打开调试模式才可以使用

## 使用pino丰富服务端log

因此这边推荐全平台的log工具.不过本文还是只讲标准的log生成对象`console`
在浏览器环境下,默认的console模块就已经足够好用,但如果是服务端上,由于没有格式定义和level筛选,console模块就有点不够用了.我们可以使用[pino](https://www.npmjs.com/package/pino),这个是一个具备完整的log工具特性的log工具.


```typescript
import pino from 'pino'

const logger = pino({name:"myapp"})
logger.info('hi')
logger.warn({lang: 'fr'}, 'au revoir')
```

    {"level":30,"time":1581660580368,"pid":24419,"hostname":"huangsizhes-MacBook-Air.local","name":"myapp","msg":"hi","v":1}
    {"level":40,"time":1581660580370,"pid":24419,"hostname":"huangsizhes-MacBook-Air.local","name":"myapp","lang":"fr","msg":"au revoir","v":1}



```typescript
logger.level//查看当前的最低等级
```




    'info'




```typescript
logger.level="warn"//设置最低等级
```




    'warn'




```typescript
logger.level
```




    'warn'



### typescript使用pino

在typescript中我们需要额外安装pino的类型声明包`@types/pino`才能正常的使用pino.
typescript中我们必须使用`import * as Pino from 'pino'`才可以正常的导入pino,,这个例子可以看分支[ts-pino]()



```typescript

```
