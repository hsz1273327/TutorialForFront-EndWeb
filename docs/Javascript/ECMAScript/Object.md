# Object

`Object`即对象,是js中的自定义数据类型也是最特殊的类型,它既是所有对象的原型,其实现结构是`hashmap`,同时默认不支持迭代器,key是字符串或Symbol.

不同于多数编程语言,js在构造对象时不需要借助类,而是可以直接定义.在js中Object被广泛应用,一般当做容器,而且可以给他直接定义方法.

其他编程语言都是"面向类型编程",只有js是真正的"面向对象编程"

例子:

```javascript
let hao = {
    name: "Tom",
    age: 18,
    eat(){
        console.log(this.name+"在吃cuscus")
    }
}
hao.eat()
```

结果:

```javascript
Tom在吃cuscus
```

## Object的元素

javascript与其他语言相比不同之处在于对象的元素可以是:

+ 字符串,这种方式是最常规的
+ Symbol,需要注意Symbol需要使用`[]`表示
+ 表达式,使用`[]`表示

例子:

```javascript
let name = "Tom"
let type = Symbol()
let Tom = {
    name: name,
    ["type"]:"human",
    [type === "human"?"age":"year"]:18,
    eat(){
        console.log(this.name+"在吃cuscus")
    }    
}
Tom
```

结果:

```javascript
{ name: 'Tom', type: 'human', year: 18, eat: [Function: eat] }
```

### Object的元素Spread[ES9]

上面得例子中有一段是`name: name`,这种重复命名在业务代码中非常常见,Js中提供了一个语法糖可以做这样一个简写:比如一个对象`字段名为a`,我们要将`a变量`的值放入对象`字段a`,就可以简写成`{a}`

例子:

```javascript
let name = "Tom"
let type = Symbol()
let Tom = {
    name,
    ["type"]:"human",
    [type === "human"?"age":"year"]:18,
    eat(){
        console.log(this.name+"在吃cuscus")
    }    
}
Tom
```

结果:

```javascript
{ name: 'Tom', type: 'human', year: 18, eat: [Function: eat] }
```

对象的每个元素都有一个描述对象(Descriptor)用来控制该元素的行为.`Object.getOwnPropertyDescriptor`方法可以获取该元素的描述对象.

例子:

```javascript
let obj = { foo: 123 }
Object.getOwnPropertyDescriptor(obj, 'foo')
```

结果:

```javascript
{ value: 123,
    writable: true,
    enumerable: true,
    configurable: true 
}
```

enumerable就是他的可枚举性,如果该元素为false，就表示某些操作会忽略当前元素。其中有:

+ `for...in`循环: 只遍历对象自身的和继承的可枚举的元素
+ `Object.keys()`: 返回对象自身的所有可枚举的元素的键名
+ `JSON.stringify()`: 只串行化对象自身的可枚举的元素
+ `Object.assign()`: 只拷贝对象自身的可枚举的元素
+ `Reflect.enumerate()`: 返回所有`for...in`循环会遍历的元素

### Object的元素Rest[ES9]

在ES9中我们可以通过扩展运算符`...`将对象中的内容拆解出来,一个常见的应用就是利用原有对象构造新对象,这也是最简单的复制写法.

测试:

```javascript
let obo = {a:1}
let obc = {...obo,b:2}
obc
```

结果

```javascript
{ a: 1, b: 2 }
```

## 给对象绑定方法

给对象绑定方法本质上就是定义一个类型为`Fuction`的元素,有两种写法:

1. 传统风格

    ```javascript
    var o = {
        ...
        func: function ([parameters]) {},
    };
    ```

2. ES6风格

    ```javascript
    var o = {
        ...
        func([parameters]) {},
    }
    ```

### `this`指针

在对象中`this`指针指代当前的对象.利用这一特性我们就可以很容易的调用对象中其他元素.从而让对象有封装的作用

### 定义`getters`与`setters`

js支持在对象定义时指名其元素的可访问性,这有点类似python中的装饰器`@property`
一个`getter`是一个获取某个特定元素的值的方法,一个`setter`是一个设定某个元素的值的方法.你可以为预定义的或用户定义的对象定义`getter`和`setter`以支持新增的元素.定义`getter`和`setter`的语法采用对象字面量语法.

例子:

```javascript
let o = {
  a: 7,
  get b() { 
    return this.a + 1;
  },
  set c(x) {
    this.a = x / 2
  }
}

console.log(o.a); // 7
console.log(o.b); // 8
o.c = 50;
console.log(o.a); // 25
```

结果:

```javascript
7
8
25
```

## 元素访问

访问对象的元素有两种形式--使用`[]`操作符(`obj[attr]`)和使用`.`链式操作符(`obj.attr`).他们是等价的,当元素不存在时都会返回`undefined`.

### 可选链操作符[ES11]

可选链操作符(`?.`)允许读取位于连接对象链深处的元素的值而不必明确验证链中的每个引用是否有效.其语法是`obj?.attr`,它本质上也是个语法糖.

`?.`操作符的功能类似于`.`链式操作符,不同之处在于在引用为空(`null`或者`undefined`)的情况下不会引起错误.该表达式短路返回值是`undefined`,即只要链中一个节点不存在就会返回`undefine`.与函数调用一起使用时如果给定的函数不存在也会返回`undefined`

当尝试访问可能不存在的对象元素时可选链操作符将会使表达式更短,更简明.在探索一个对象的内容时如果不能确定哪些元素必定存在可选链操作符也是很有帮助的.

除了获取不知道是否存在的元素,同样可以用于调用不知道是否存在的方法,不过不同之处在于语法变为`obj.method?.()`

更进一步的,节点名可以使用表达式计算得到,其语法是`obj?.[exp]`,我们可以在`[]`内通过表达式来指定元素名的字面量

测试:

```javascript
let customer = {
  name: "Carl",
  details: {
    age: 82,
    location: "Paradise Falls", // details 的 address 元素未有定义
    ok(){
        console.log("ok")
    }
  }
}

console.log(customer.details?.age)
console.log(customer.details?.Location)
customer.details.ok?.()
customer.details.notok?.()
```

## Object对象的方法

+ `Object.is(x,y)`

    该方法用来代替`==`和`===`,来判断两个对象严格相等,其中主要与`===`不同之处在于:

    + +0不等于-o
    + NaN等于NaN

+ `Object.assign(target,...source)`

    用于对象的合并,将源对象(source)的所有可枚举元素复制到目标对象(target).如果目标对象与源对象有同名元素或多个源对象有同名元素,则后面的元素会覆盖前面的元素.Object.assign只拷贝自身元素,不可枚举的元素(enumerable为false)和继承的元素不会被拷贝.`Object.assign`方法实行的是浅拷贝而不是深拷贝.也就是说如果source对象某个元素的值是对象,那么目标对象拷贝得到的是这个对象的引用.我们基本上可以把它当成python中dict的update方法.

    用处:

    + 为对象添加元素和方法
    + 克隆对象
    + 合并多个对象
    + 为元素指定默认值

+ `Object.values(target)`[ES8]

    `Object.values`,类似python中dict的`values()`方法,会将所有的值放入一个array

+ `Object.entries(target)`[ES8]

    `Object.entries(target)`类似python中dict的`items()`方法,会生成键值对构成的的一个array

+ `Object.getOwnPropertyDescriptors(target)`[ES8]
    用来获取一个对象的所有自身元素的描述符

+ `Object.fromEntries(pairs)`[ES10]

    返回一个给定对象自身可枚举元素的键值对数组

    测试:

    ```javascript
    const entries = new Map([
        ['foo', 'bar'],
        ['baz', 42]
    ]);

    const obj = Object.fromEntries(entries);

    console.log(obj);
    ```

    结果:

    ```javascript
    Object { foo: "bar", baz: 42 }
    ```

    参数可以是两种种:

    + `Array[Array[ any,any]]`形式的数组
    + Map[any,any]

### 对象元素遍历

有6种方式可以用来遍历对象的元素:

| 方法                                | 是否遍历父原型 | 是否遍历symbol | 是否遍历不可枚举 |
| ----------------------------------- | -------------- | -------------- | ---------------- |
| `for...in`                          | 是             | 否             | 否               |
| `Object.keys(obj)`                  | 否             | 否             | 否               |
| `Object.getOwnPropertyNames(obj)`   | 否             | 否             | 是               |
| `Object.getOwnPropertySymbols(obj)` | 否             | 是             | 否               |
| `Reflect.ownKeys(obj)`              | 否             | 是             | 是               |
| `Reflect.enumerate(obj)`            | 是             | 否             | 否               |
