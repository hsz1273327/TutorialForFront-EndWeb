# Promise

promise翻译成中文就是保证,是ES6时提出的一种异步编程解决方案,用于解决回调地狱问题,同时也为`async/await`语法提供基础设施.

所谓Promise简单说也是一个容器,只是里面不是存的值,而是保存着某个未来才会结束的事件(通常是一个异步操作)的结果.从语法上说Promise是一个对象,用它可以获取异步操作的消息.Promise提供统一的API,各种异步操作都可以用同样的方法进行处理.

Promise对象有以下两个特点:

1. 对象的状态不受外界影响.Promise对象代表一个异步操作,有三种状态:`Pending`(进行中),`Resolved`(已完成,又称Fulfilled)和`Rejected`(已失败).只有异步操作的结果可以决定当前是哪一种状态,任何其他操作都无法改变这个状态.这也是Promise这个名字的由来.它的英语意思就是"承诺",表示其他手段无法改变.

2. 一旦状态改变就不会再变,任何时候都可以得到这个结果.Promise对象的状态改变只有两种可能:从`Pending`变为`Resolved`和从`Pending变为Rejected`.只要这两种情况发生状态就不会再变了.就算改变已经发生了,你再对Promise对象添加回调函数也会立即得到这个结果.这与事件(Event)完全不同,事件的特点是如果你错过了它再去监听是得不到结果的.

有了Promise对象就可以将异步操作以同步操作的流程表达出来,避免了层层嵌套的回调函数.此外Promise对象提供统一的接口,使得控制异步操作更加容易.

Promise也有一些缺点:

+ 无法取消Promise,一旦新建它就会立即执行,无法中途取消.
+ 如果不设置回调函数,Promise内部抛出的错误不会反应到外部.
+ 当处于Pending状态时,无法得知目前进展到哪一个阶段(刚刚开始还是即将完成).

如果某些事件不断地反复发生,一般来说使用stream模式(生成器)是比部署Promise更好的选择.

Promise在js中的作用类似python中的Future对象,但具体功能却完全不同.Future对象只是占位符,它不关心这个占位符是什么操作在管理.通常Future对象的状态和结果是被操作设置的而不是绑定固定的操作的.而Promise是一旦定义就会立即执行,绑定好了执行的操作的.因此python中的Future对象更加灵活,但Promise更加安全.这也是历史原因造成的.js本来就没有多线程,在早期大量的异步操作都是靠回调实现的,因此Promise这样的实现顺理成章.但python不同,python是有多线程的,因此一直以来回调都不是主流,python默认的io接口都是同步的.这也就造成了技术选择上的差别.

## 构造方法

Promise对象是一个构造函数,参数是一个函数对象用来生成Promise实例.

```js
let promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value)
  } else {
    reject(error)
  }
})

```

Promise构造函数接受一个函数作为参数,该函数的两个参数分别是`resolve`和`reject`.它们是两个函数,由JavaScript引擎提供不用自己部署.

+ `resolve`函数

    将`Promise`对象的状态从"未完成"变为"成功"(即从Pending变为Resolved),在异步操作成功时调用,并将异步操作的结果,作为参数传递出去

+ `reject`函数

    将Promise对象的状态从"未完成"变为"失败"(即从Pending变为Rejected),在异步操作失败时调用,并将异步操作报出的错误,作为参数传递出去.

## 实例方法

每个Promise的实例都可以通过下面的实例方法来控制处理流程,其最终的效果类似同步操作中的`try/catch/finally`.

### `then`

Promise实例具有`then`方法,也就是说`then`方法是定义在原型对象`Promise.prototype`上的.它的作用是为Promise实例添加状态改变时的回调函数.前面说过`then`方法的第一个参数是Resolved状态的回调函数,第二个参数(可选)是Rejected状态的回调函数.

```js
promise.then(function(value) {
  // success
}, function(value) {
  // failure
});
```

then方法可以接受两个回调函数作为参数.

+ 第一个回调函数是Promise对象的状态变为Resolved时调用
+ 第二个回调函数是Promise对象的状态变为Reject时调用

其中第二个函数是可选的不一定要提供.这两个函数都接受Promise对象传出的值作为参数.

> 一个简单的例子

```javascript
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done')
  })
}

timeout(100).then((value) => {
  console.log(value)
})
```

结果:

```javascript
done
```

上面代码中timeout方法返回一个Promise实例.表示一段时间以后才会发生的结果.过了指定的时间(ms参数)以后,Promise实例的状态变为Resolved,就会触发then方法绑定的回调函数.

Promise新建后就会立即执行.

> 异步实现

```javascript
let promise = new Promise(function(resolve, reject) {
  console.log('1')
  resolve()
})

promise.then(function() {
  console.log('2.')
})

console.log('3')

```

结果:

```javascript
1
3
2.
```

可以看到实际上异步主要就是在then上实现了

> 读取本地文件(node限定)

```javascript
import fs from "fs"

function getText(path){
    let promise = new Promise(
        function(resolve, reject){
            fs.readFile(
                path,
                'utf-8',
                function (err, data) {
                  if (err) {
                      reject(err) 
                  } else {
                      resolve(data.slice(0,20))
                  }
                }
            )
        }
    )
    return promise
}

getText("./README.md").then(
    function(data) {
      console.log('Contents: ' + data)
    }, 
    function(error) {
      console.error('出错了', error)
    }
)
```

结果:

```javascript
Contents: # Javascript基础语法

ES
```

`getText`是对`fs.readFile`的封装,用于读取文本文件,需要注意的是在`getText`内部,resolve函数和reject函数调用时都带有参数.

如果调用`resolve`函数和`reject`函数时带有参数,那么它们的参数会被传递给回调函数.

+ `reject`函数的参数通常是`Error`对象的实例,表示抛出的错误.

+ `resolve`函数的参数除了正常的值以外还可能是另一个Promise实例,表示异步操作的结果有可能是一个值,也有可能是另一个异步操作.

例子:

```javascript
let p1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
      reject(new Error('fail'))
  }, 3000)
})
let p2 = new Promise(function (resolve, reject) {
  setTimeout(() => {
      resolve(p1)
  }, 1000)
})
p2.then(result => console.log(result))
p2.catch(error => console.log(error))
```

结果:

```javascript
Error: fail
    at Timeout._onTimeout (evalmachine.<anonymous>:3:12)
    at listOnTimeout (internal/timers.js:549:17)
    at processTimers (internal/timers.js:492:7)


(node:58497) UnhandledPromiseRejectionWarning: Error: fail
    at Timeout._onTimeout (evalmachine.<anonymous>:3:12)
    at listOnTimeout (internal/timers.js:549:17)
    at processTimers (internal/timers.js:492:7)
(node:58497) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:58497) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

上面代码中p1是一个Promise,3秒之后变为rejected.p2的状态由p1决定,1秒之后p2调用resolve方法,但是此时p1的状态还没有改变,因此p2的状态也不会变.又过了2秒p1变为rejected,p2也跟着变为rejected.

then方法返回的是一个**新的Promise实例**(注意,不是原来那个Promise实例).因此可以采用链式写法,即`then`方法后面再调用另一个`then`方法.

例子:

```javascript
getText("./README.md").then(
    function(data) {
        console.log('Contents: ' + data)
        return "ok"
    }
).then(
    function(data) {
      console.log('get: ' + data)
    }
)
```

结果:

```javascript
Contents: # Javascript基础语法

ES
get: ok
```

上面的代码使用`then`方法,依次指定了两个回调函数.第一个回调函数完成以后会将返回结果作为参数传入第二个回调函数.

采用链式的`then`,可以指定一组按照次序调用的回调函数.这时前一个回调函数有可能返回的还是一个Promise对象(即有异步操作),这时后一个回调函数,就会等待该Promise对象的状态发生变化才会被调用.

通常我们在`then`中会使用箭头函数.

例子:

```javascript
getText("./README.md").then(
    data=>{
        console.log(`Contents: ${data}`)
        return "ok"
    }
).then(
    data=>{
      console.log(`get: ${data}`)
    }
)
```

结果:

```javascript
Contents: # Javascript基础语法

ES
get: ok
```

### `catch`

`catch`方法是`then(null, rejection)`的别名,用于指定发生错误时的回调函数.

例子:

```javascript
getText("./NotExist.md").then(
    data=>{
        console.log(`Contents: ${data}`)
        return "ok"
    }
).catch(
    error=>{
      console.error(`get error: ${error}`)
    }
)
```

结果:

```javascript
get error: Error: ENOENT: no such file or directory, open './NotExist.md'
```

上面代码中`getText`方法返回一个Promise对象,如果该对象状态变为Resolved,则会调用`then`方法指定的回调函数;如果异步操作抛出错误,状态就会变为Rejected,就会调用`catch`方法指定的回调函数处理这个错误.另外`then`方法指定的回调函数如果运行中抛出错误也会被catch方法捕获.

```js
p.then((val) => console.log("fulfilled:", val))
  .catch((err) => console.log("rejected:", err));

// 等同于

p.then((val) => console.log(fulfilled:", val))
  .then(null, (err) => console.log("rejected:", err))
```

下面是一个例子:

```javascript
let promise1 = new Promise(function(resolve, reject) {
  throw new Error('test')
})
promise1.catch(error => {
  console.error(error)
})
```

结果:

```javascript
Error: test
    at evalmachine.<anonymous>:2:9
    at new Promise (<anonymous>)
    at evalmachine.<anonymous>:1:16
    at Script.runInThisContext (vm.js:120:20)
    at Object.runInThisContext (vm.js:311:38)
    at run ([eval]:1054:15)
    at onRunRequest ([eval]:888:18)
    at onMessage ([eval]:848:13)
    at process.emit (events.js:321:20)
    at emit (internal/child_process.js:881:12)
```

上面代码中,promise抛出一个错误就被catch方法指定的回调函数捕获.reject方法的作用等同于抛出错误.如果Promise状态已经变成Resolved再抛出错误是无效的

例子:

```javascript
let promise2 = new Promise(function(resolve, reject) {
  resolve('ok')
  throw new Error('test')
})
promise2.then(value => { console.log(value) }).catch(error => { console.log(error) })
```

结果:

```javascript
ok
```

上面代码中Promise在resolve语句后面再抛出错误不会被捕获等于没有抛出.

Promise对象的错误具有"冒泡"性质,会一直向后传递直到被捕获为止.也就是说错误总是会被下一个catch语句捕获.

测试:

```javascript
getText("./README.md").then((post)=> {
  return getText("./NotExist.md")
}).then(function(comments) {
  return getText("./README.md")
}).catch(function(error) {
  console.error(error)
})
```

结果:

```javascript
[Error: ENOENT: no such file or directory, open './NotExist.md'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: './NotExist.md'
}
```

上面代码中一共有三个Promise对象--一个由getText产生,两个由then产生.它们之中任何一个抛出的错误都会被最后一个catch捕获.

一般来说不要在`then`方法里面定义Reject状态的回调函数(即then的第二个参数),总是使用`catch`方法.这种写法可以捕获前面`then`方法执行中的错误,也更接近同步的写法(try/catch).因此建议总是使用`catch`方法而不使用`then`方法的第二个参数.

跟传统的`try/catch`代码块不同的是,如果没有使用`catch`方法指定错误处理的回调函数,Promise对象抛出的错误不会传递到外层代码,即不会有任何反应.

测试:

```javascript
function someAsyncThing() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2)
  })
}

someAsyncThing().then(function() {
  console.log('everything is great')
})
```

结果:

```javascript
ReferenceError: x is not defined

    at evalmachine.<anonymous>:4:13

    at new Promise (<anonymous>)

    at someAsyncThing (evalmachine.<anonymous>:2:10)

    at evalmachine.<anonymous>:8:1

    at Script.runInThisContext (vm.js:120:20)

    at Object.runInThisContext (vm.js:311:38)

    at run ([eval]:1054:15)

    at onRunRequest ([eval]:888:18)

    at onMessage ([eval]:848:13)

    at process.emit (events.js:321:20)
```

上面代码中`someAsyncThing`函数产生的Promise对象会报错,但是由于没有指定`catch`方法,这个错误不会被捕获也不会传递到外层代码,导致运行后没有任何输出.

测试:

```javascript
let promise3 = new Promise(function(resolve, reject) {
  resolve("ok")
  setTimeout(function() { throw new Error('test') }, 0)
})
promise3.then(function(value) { console.log(value) })
```

结果:

```javascript
ok


Error: test
    at Timeout._onTimeout (evalmachine.<anonymous>:4:11)
    at listOnTimeout (internal/timers.js:549:17)
    at processTimers (internal/timers.js:492:7)
```

上面代码中,Promise指定在下一轮"事件循环"再抛出错误,结果由于没有指定使用`try/catch`语句就冒泡到最外层成了未捕获的错误.因为此时Promise的函数体已经运行结束了,所以这个错误是在Promise函数体外抛出的.

Node.js有一个`unhandledRejection`事件专门监听未捕获的reject错误.

测试:

```javascript
let someAsyncThing1 = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2)
  })
}

someAsyncThing1()
.catch(function(error) {
  console.log('oh no', error)
})
.then(function() {
  console.log('carry on')
});
```

结果:

```javascript
oh no ReferenceError: x is not defined
    at evalmachine.<anonymous>:4:13
    at new Promise (<anonymous>)
    at someAsyncThing1 (evalmachine.<anonymous>:2:10)
    at evalmachine.<anonymous>:8:1
    at Script.runInThisContext (vm.js:120:20)
    at Object.runInThisContext (vm.js:311:38)
    at run ([eval]:1054:15)
    at onRunRequest ([eval]:888:18)
    at onMessage ([eval]:848:13)
    at process.emit (events.js:321:20)
carry on
```

上面代码运行完catch方法指定的回调函数,会接着运行后面那个then方法指定的回调函数.如果没有报错则会跳过catch方法.

测试:

```javascript
Promise.resolve()
.catch(function(error) {
  console.log('oh no', error);
})
.then(function() {
  console.log('carry on');
})
```

结果:

```javascript
carry on
```

上面的代码因为没有报错跳过了`catch`方法,直接执行后面的`then`方法.此时要是`then`方法里面报错就与前面的`catch`无关了.

`catch`方法之中还能再抛出错误.

测试:

```javascript
let someAsyncThing2 = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2)
  })
}

someAsyncThing2().then(function() {
  return someOtherAsyncThing()
}).catch(function(error) {
  console.log('oh no', error)
  // 下面一行会报错，因为y没有声明
  y + 2;
}).then(function() {
  console.log('carry on')
})
```

结果:

```javascript
oh no ReferenceError: x is not defined
    at evalmachine.<anonymous>:4:13
    at new Promise (<anonymous>)
    at someAsyncThing2 (evalmachine.<anonymous>:2:10)
    at evalmachine.<anonymous>:8:1
    at Script.runInThisContext (vm.js:120:20)
    at Object.runInThisContext (vm.js:311:38)
    at run ([eval]:1054:15)
    at onRunRequest ([eval]:888:18)
    at onMessage ([eval]:848:13)
    at process.emit (events.js:321:20)



ReferenceError: y is not defined

    at evalmachine.<anonymous>:13:3

    at processTicksAndRejections (internal/process/task_queues.js:97:5)
```

上面代码中`catch`方法抛出一个错误,因为后面没有别的`catch`方法了导致这个错误不会被捕获也不会传递到外层.如果改写一下结果就不一样了.

测试:

```javascript
someAsyncThing2().then(function() {
  return someOtherAsyncThing();
}).catch(function(error) {
  console.log('oh no', error);
  // 下面一行会报错，因为y没有声明
  y + 2;
}).catch(function(error) {
  console.log('carry on', error);
});

```

结果:

```javascript
oh no ReferenceError: x is not defined
    at evalmachine.<anonymous>:4:13
    at new Promise (<anonymous>)
    at someAsyncThing2 (evalmachine.<anonymous>:2:10)
    at evalmachine.<anonymous>:1:1
    at Script.runInThisContext (vm.js:120:20)
    at Object.runInThisContext (vm.js:311:38)
    at run ([eval]:1054:15)
    at onRunRequest ([eval]:888:18)
    at onMessage ([eval]:848:13)
    at process.emit (events.js:321:20)
carry on ReferenceError: y is not defined
    at evalmachine.<anonymous>:6:3
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
```

上面代码中第二个`catch`方法用来捕获,前一个`catch`方法抛出的错误.

### finally[ES9]

`finally`方法用于指定不管Promise对象最后状态如何都会执行的操作.通常用于清理操作.该函数不管怎样都必须执行.
`finally`方法的回调函数没有参数.

一个常见的应用是服务器使用Promise处理请求,然后使用finally方法关掉服务器.

```js
server.listen(0)
  .then(function () {
    // run test
  })
  .finally(server.stop)
```

测试:

```javascript
getText("./README.md").then(
    data=>{
        console.log(`Contents: ${data}`)
    }
).catch(
    error=>{
      console.log(`get error: ${error}`)
    }
).finally(()=>{
    console.log("finally")
    }
)
```

结果:

```javascript
Contents: # Javascript基础语法

ES
finally
```

测试:

```javascript
getText("./NOTEXIST.md").then(
    data=>{
        console.log(`Contents: ${data}`)
    }
).catch(
    error=>{
      console.log(`get error: ${error}`)
    }
).finally(()=>{
    console.log("finally")
    }
)
```

结果:

```javascript
get error: Error: ENOENT: no such file or directory, open './NOTEXIST.md'
finally
```

## Promise对象的方法

Promise对象也提供方法用于构造新的Promise实例.

### Promise.resolve()

有时需要将现有对象转为Promise对象,`Promise.resolve`方法就起到这个作用.

这个方法支持3中参数传入:

1. 值,
    比如`let jsPromise = Promise.resolve('foo')`,这相当于执行了`new Promise(resolve => resolve('foo'))`

2. Promise

    如果参数是Promise实例,那么`Promise.resolve`将不做任何修改,原封不动地返回这个实例.

3. 参数是一个`thenable`对象

    `thenable`对象指的是具有`then`方法的对象,比如下面这个对象.

例子:

```javascript
let thenable = {
  then: function(resolve, reject) {
    resolve(42)
  }
}
let pthen = Promise.resolve(thenable)
pthen.then(function(value) {
  console.log(value)  // 42
})
```

结果:

```javascript
42
```

`Promise.resolve`方法会将这个对象转为Promise对象,然后就立即执行`thenable`对象的`then`方法.

`Promise.resolve`也支持调用时不带任何参数,这会直接返回一个Resolved状态的Promise对象.所以如果希望得到一个Promise对象,比较方便的方法就是直接调用`Promise.resolve`方法.

例子:

```javascript
let pvoid = Promise.resolve()

pvoid.then(function () {
  console.log(42)
})
```

结果:

```javascript
42
```

### Promise.reject()

`Promise.reject(reason)`方法也会返回一个新的Promise实例,该实例的状态为rejected.它的参数用法与`Promise.resolve`方法完全一致.

```js
let p = Promise.reject('出错了');
// 等同于
let p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s){
  console.log(s)
});
// 出错了
```

上面代码生成一个Promise对象的实例p,状态为rejected,回调函数会立即执行.

### Promise.allSettled()[ES11]

`Promise.allSettled()`用于获取一组Promise实例的最终状态.它的参数是一个由Promise实例组成的数组.返回的则是一个新的Promise实例,这个实例的结果是要检查的Promise实例的最终状态列表

例子:

```javascript
let p_noexist = getText("./NOTEXIST.md")
let p_readme = getText("./README.md")

Promise.allSettled([p_noexist,p_readme]).then(data=>console.log(data))
```

结果:

```javascript
[
  {
    status: 'rejected',
    reason: [Error: ENOENT: no such file or directory, open './NOTEXIST.md'] {
      errno: -2,
      code: 'ENOENT',
      syscall: 'open',
      path: './NOTEXIST.md'
    }
  },
  { status: 'fulfilled', value: '# Javascript基础语法\n\nES' }
]
```

### Promise.all()

Promise.all方法用于将多个Promise实例包装成一个新的Promise实例.参数是具有Iterator接口且返回的每个成员都是Promise实例,当然了最常见的还是多个Promise实例组成的数组.

新生成的Promise实例状态满足如下规则:

+ 只有所有被包装的Promise实例的状态都变成`fulfilled`,新生成的Promise实例的状态才会变成`fulfilled`,此时新生成的Promise实例的的值就是所有被包装的Promise实例的值组成的序列

+ 只要所有被包装的Promise实例之中有一个被`rejected`,p的状态就变成`rejected`,此时第一个被`reject`的实例的返回值会传递给新生成的Promise实例作为其抛出的错误.

例子:

```javascript
let promises_fulfilled = ["./README.md","./README.md","./README.md"].map(function (path) {
  return getText(path)
})

Promise.all(promises_fulfilled).then(
    data=>console.log(data)
).catch(
    error=>console.error(error)
)
```

结果:

```javascript
[
  '# Javascript基础语法\n\nES',
  '# Javascript基础语法\n\nES',
  '# Javascript基础语法\n\nES'
]
```

例子:

```javascript
let promises_rejected = ["./README.md","./NOEXIST.md","./README.md"].map(function (path) {
  return getText(path)
})
```

结果:

```javascript
(node:58497) UnhandledPromiseRejectionWarning: Error: ENOENT: no such file or directory, open './NOEXIST.md'
(node:58497) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 7)
```

例子:

```javascript
Promise.all(promises_rejected).then(
    data=>console.log(data)
).catch(
    error=>console.error(error)
)
```

结果:

```javascript
[Error: ENOENT: no such file or directory, open './NOEXIST.md'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: './NOEXIST.md'
}
(node:58497) PromiseRejectionHandledWarning: Promise rejection was handled asynchronously (rejection id: 7)
```

### Promise.race()

`Promise.race`方法同样是将多个Promise实例包装成一个新的Promise实例.其参数与`Promise.all()`一致,不同点在于新生成的Promise实例状态变化的规则:只要被包装的Promise实例之中有一个实例率先改变状态,新的Promise实例的状态就跟着改变.那个率先改变的Promise实例的返回值就传递给新的Promise实例的回调函数,就像几个实例赛跑一样,先到先得.
