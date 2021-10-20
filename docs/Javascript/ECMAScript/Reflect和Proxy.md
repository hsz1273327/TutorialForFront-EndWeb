# Reflect和Proxy

ES6开始js提供了Reflect和Proxy对象用于获得一定程度的动态编程能力,这看起来似乎是多此一举的行为,毕竟js本身就是脚本语言,其动态特性早已广泛应用,更加上还有`eval`这样的方法可以说动态特性早已拉满,因此这两个对象一般也很少人用.但其实他们还是有一定的存在意义的.

1. `Reflect`提供了更加通用的对对象内部进行观测和修改的方法
2. `Proxy`提供了对特定对象操作拦截的能力.

他们主要的意义在于标准化.

## Reflect

`Reflect`对象不能实例化,我们只能当它是一个全局的单例对象来操作.它提供了如下静态方法:

+ `Reflect.apply(target, thisArgument, argumentsList)`对一个函数进行调用操作,同时可以传入一个数组作为调用参数,和`Function.prototype.apply()`功能类似
+ `Reflect.construct(target, argumentsList[, newTarget])`对构造函数进行new操作,相当于执行`new target(...args)`
+ `Reflect.defineProperty(target, propertyKey, attributes)`和`Object.defineProperty()`类似,用于为对象设置新元素或者重置旧元素.如果设置成功就会返回`true`
+ `Reflect.deleteProperty(target, propertyKey)`作为对象的delete操作符,相当于执行`delete target[name]`
+ `Reflect.get(target, propertyKey[, receiver])`获取对象身上某个属性的值,类似于`target[name]`
+ `Reflect.getOwnPropertyDescriptor(target, propertyKey)`类似于`Object.getOwnPropertyDescriptor()`用于获取特定元素的描述.如果对象中存在该元素则返回对应的元素的描述符,否则返回`undefined`
+ `Reflect.getPrototypeOf(target)`类似于`Object.getPrototypeOf()`
+ `Reflect.has(target, propertyKey)`判断一个对象是否存在某个属性,和`in`运算符的功能完全相同
+ `Reflect.isExtensible(target)`类似于`Object.isExtensible()`,用于判断对象是否可以在其上添加元素
+ `Reflect.ownKeys(target)`返回一个包含所有自身属性(不包含继承属性)的数组.类似于`Object.keys()`,但不会受enumerable影响.
+ `Reflect.preventExtensions(target)`类似于`Object.preventExtensions()`,将对象设为不能扩展返回一个Boolean。
+ `Reflect.set(target, propertyKey, value[, receiver])`将值分配给对象的指定元素.返回一个Boolean,如果更新成功则返回true
+ `Reflect.setPrototypeOf(target, prototype)`设置对象原型的函数.返回一个Boolean.如果更新成功则返回true

比较常见的用法类似python中的`getattr`和`setattr`,主要用在运行时改变对象

## Proxy

`Proxy`对象的实例化语法为`new Proxy(target, handler)`,target为被代理对象,而handdler则可以是一个对象,这个对象如果满足下面的某个接口则可以获得特定的能力,这些方法被称为捕捉器

所有的捕捉器是可选的.如果没有定义某个捕捉器那么就会保留源对象的默认行为

+ `handler.getPrototypeOf(target)`:`Object.getPrototypeOf`方法的捕捉器
+ `handler.setPrototypeOf(target)`:`Object.setPrototypeOf`方法的捕捉器
+ `handler.isExtensible(target)`:`Object.isExtensible`方法的捕捉器
+ `handler.preventExtensions(target)`: `Object.preventExtensions`方法的捕捉器
+ `handler.getOwnPropertyDescriptor(target, propertyKey)`: `Object.getOwnPropertyDescriptor`方法的捕捉器
+ `handler.defineProperty(target, propertyKey, attributes)`: `Object.defineProperty`方法的捕捉器
+ `handler.has(target, propertyKey)`: in 操作符的捕捉器
+ `handler.get(target, propertyKey[, receiver])`: 属性读取操作的捕捉器
+ `handler.set(target, propertyKey, value[, receiver])`: 属性设置操作的捕捉器
+ `handler.deleteProperty(target, propertyKey)`: `delete`操作符的捕捉器
+ `handler.ownKeys(target)`: `Object.getOwnPropertyNames`方法和`Object.getOwnPropertySymbols`方法的捕捉器。
+ `handler.apply(target, thisArgument, argumentsList)`: 函数调用操作的捕捉器
+ `handler.construct(target, argumentsList[, newTarget])`: new 操作符的捕捉器

可以看出Proxy的handler的捕捉器接口和Reflect完全一致.

> 一个Proxy的使用例子--一个黑心代理

```javascript
let seller = {
    bookprice:10,
    fishprice:20
}

let blackheart = new Proxy(seller,{
    ninja: 0,
    get(target, propertyKey){
        if (propertyKey =="ninja"){
            return this.nijia
        }else{
            let value = Reflect.get(target, propertyKey)
            if (value){
                this.nijia+=0.5*value
                return value*1.5
            }else{
                return value
            }
        }
    }
})
console.log(blackheart.bookprice)
console.log(blackheart.fishprice)
console.log(blackheart.ninja)
```

结果:

```javascript
15
30
15
```