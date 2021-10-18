
# Typescript与面向对象编程

使用TypeScript我们允许开发者直接使用ES6中给出的面向对象编程的语法,同时TypeScript提供了更加完备的封装和访问控制的关键字.

## 类

与ES6中定义类类似,TS中定义类的主体是一样的,不同之处只是TS中可以声明字段类型


```typescript
class Greeter {
    greeting: string
    constructor(message: string) {
        this.greeting = message
    }
    greet() {
        return "Hello, " + this.greeting
    }
}

let greeter = new Greeter("world")
```


```typescript
greeter.greet()
```

    Hello, world


### 类型断言

我们常用typeof来在js中查看类型,但面对ts,typeof显得力不从心,我们可以用`as`关键字来做类型断言


```typescript
let a = greeter as Greeter
a
```

    Greeter { greeting: [32m'world'[39m }


### 继承

在TypeScript里我们可以使用常用的面向对象模式.当然基于类的程序设计中最基本的模式是允许使用继承来扩展现有的类.

继承与ES6中一样使用`extends`关键字

### 封装

与C++中类似,类的成员有`public`,`private`,`protected`关键字用来申明成员的可见性和一些封装特性.

+ `public`

    `public`是默认的成员可见性,它表示成员是公开的
    
+ `private`

    `private`表明成员是私有的,这样它就不能在声明它的类的外部被访问.
    
+ `protected`

    `protected`被保护的成员,`protected`修饰符与`private`修饰符的行为很相似,但有一点不同--`protected`成员在派生类中仍然可以访问.构造函数也可以被标记成`protected`.这意味着这个类不能在包含它的类外被实例化但是能被继承.

#### 参数属性

在构造函数中,我们可以声明其参数为私有,这样就可以不用再在类中声明了


```typescript
class Animal {
    constructor(private name: string) { }
    move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
```


```typescript
let a = new Animal("monkey")
```


```typescript
a
```

    Animal { name: [32m'monkey'[39m }


### 访问控制

+ `readonly`修饰符

    可以使用`readonly`关键字将属性设置为只读的.只读属性必须在声明时或构造函数里被初始化.



```typescript
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
```

+ `getters/setters`

    来截取对对象成员的访问.它能帮助你有效的控制对对象成员的访问,这是ES6中已经有了的语法.


```typescript
let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
```

    Bob Smith


### 静态成员

`static`关键字可以用来声明成员为静态,ES6中并不允许有静态方法以外的成员,ts中则可以.


```typescript
class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
```

    [33m14.142135623730951[39m
    [33m2.8284271247461903[39m


### 抽象类

`abstract`关键字可以用于定义抽象类和在抽象类内部定义抽象方法


```typescript
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log('roaming the earch...');
    }
}
```

抽象类中的抽象方法不包含具体实现并且必须在派生类中实现.抽象方法的语法与接口方法相似,两者都是定义方法签名但不包含方法体.然而抽象方法必须包含 `abstract`关键字并且可以包含访问修饰符.

## 接口

TypeScript的核心原则之一是对值所具有的`shape`进行类型检查.它有时被称做"鸭式辨型法"(鸭子类型)或"结构性子类型化".在TypeScript里,接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约.这种方式我们已经很熟悉了,python和go都使用这种面相接口的类型检查系统.
看下面的例子:


```typescript
interface LabelledValue {
  label: string
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label)
}

let myObj = {size: 10, label: "Size 10 Object"}
printLabel(myObj)
```

    Size 10 Object


`LabelledValue`接口就好比一个名字用来描述上面例子里的要求.它代表了有一个`label`属性且类型为`string`的对象.需要注意的是我们在这里并不能像在其它语言里一样说传给`printLabel`的对象实现了这个接口.我们只会去关注值的外形.只要传入的对象满足上面提到的必要条件,那么它就是被允许的.

还有一点值得提的是类型检查器不会去检查属性的顺序,只要相应的属性存在并且类型也是对的就可以.

### 可选属性

接口里的属性不全都是必需的.有些是只在某些条件下存在或者根本不存在.可选属性在应用`option bags`模式时很常用,即给函数传入的参数对象中只有部分属性赋值了


```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}
```


```typescript
let mySquare = createSquare({color: "black"});
```


```typescript
mySquare
```

    { color: [32m'black'[39m, area: [33m100[39m }


带有可选属性的接口与普通的接口定义差不多,只是在可选属性名字定义的后面加一个`?`符号.

可选属性的好处之一是可以对可能存在的属性进行预定义,好处之二是可以捕获引用了不存在的属性时的错误.比如我们故意将`createSquare`里的`color`属性名拼错就会得到一个错误提示

有时我们并不清楚会不会有其他属性加入,这时就可以使用**字符串索引签名**,
如果`SquareConfig`带有上面定义的类型的`color`和`width`属性,并且还会带有任意数量的其它属性,那么我们可以这样定义它


```typescript
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}

```

这样定义的话`SquareConfig`可以有任意数量的属性,并且只要它们不是`color`和`width`,那么就无所谓它们的类型是什么.

## 可索引的类型

上面使用的`[propName: string]: any;`就是可索引类型,它描述了对象索引的类型,还有相应的索引返回值类型.

字符串索引签名能够很好的描述`dictionary`模式,并且它们也会确保所有属性与其返回值类型相匹配.因为字符串索引声明了`obj.property`和`obj["property"]`两种形式都可以.下面的例子里`name`的类型与字符串索引类型不匹配,所以类型检查器给出一个错误提示:


```typescript
interface NumberDictionary {
  [index: string]: number;
  length: number;    // 可以，length是number类型
  name: string       // 错误，`name`的类型不是索引类型的子类型
}
```

    4:3 - Property 'name' of type 'string' is not assignable to string index type 'number'.


### 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值.你可以在属性名前用`readonly`来指定只读属性,用法和类中一样.

TypeScript具有`ReadonlyArray<T>`类型,它与`Array<T>`相似,只是把所有可变方法去掉了.因此可以确保数组创建后再也不能被修改.


```typescript
let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a
```

### 接口描述函数类型


接口能够描述JavaScript中对象拥有的各种各样的外形.除了描述带有属性的普通对象外,接口也可以描述函数类型.

为了使用接口表示函数类型,我们需要给接口定义一个调用签名.它就像是一个只有参数列表和返回值类型的函数定义.参数列表里的每个参数都需要名字和类型.


```typescript
interface SearchFunc {
  (source: string, subString: string): boolean
}
```

这样定义后我们可以像使用其它接口一样使用这个函数类型的接口,对于函数类型的类型检查来说,函数的参数名不需要与接口里定义的名字相匹配,只要参数类型和返回值类型匹配即可

### 继承接口

和类一样,接口也可以继承.这让我们能够从一个接口里复制成员到另一个接口里,可以更灵活地将接口分割到可重用的模块里.


```typescript
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
```

    [33m10[39m


## 实现接口

与C#或Java里接口的基本作用一样,TypeScript也能够用它来明确的强制一个类去符合某种契约.


```typescript
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
```
