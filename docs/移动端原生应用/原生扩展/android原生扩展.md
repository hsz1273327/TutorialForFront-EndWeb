# android原生扩展

我们知道android是使用Kotlin/Java开发的,要使用原生方式扩展应用也就是让nativescript可以识别出Kotlin/Java的源码或二进制包.本人既不会Java又不会Kotlin,但天然对java比较抗拒,所以就用Kotlin来演示了.

在android中原生资源包括:

+ 源码
+ 二进制包

从原理上讲Kotlin/Java中包都是以`xxx.yyy.zzz.www`的形式标识的(`package name`),我们在js中调用他们也是用它.

本文的例子在[nsv-extend](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/nsv-extend)的android部分

## 类型转换

在android原生扩展的编码过程中我们不可避免的会需要在js的类型和java/kotlin中的类型之间进行转换--我们调用原生接口需要从js类型转换为java/kotlin中的类型;取得到原生接口的返回值后又需要将java/kotlin中的类型转换为js类型进行业务层处理.

在nativescript中,对于用户自定义类型,在nativescript中则是会被统一转成js的类型,我们只要像js中一样用`new`关键字实例化,用`.`符号取字段掉用方法即可.

而对于基础类型的转换是多数时候是隐式的,我们可以直接将js类型的数据传递给原生接口,原生接口的返回也会被js自动转换为js类型.我们通常只要记住它们的转换规则即可

| js类型             | java类型             | kotlin类型           |
| ------------------ | -------------------- | -------------------- |
| `String`           | `java.lang.String`   | `kotlin.String`      |
| `Boolean`          | `java.lang.Boolean`  | `kotlin.Boolean`     |
| `Number`           | `java.lang.Double`   | `kotlin.Double`      |
| `Undefined`&`Null` | `null`               | `null`               |

其中`Number`比较特殊,js中的`Numer`类型的数据会根据原生接口的声明进行转换,比如原生接口中声明这个参数是`int`型,传入`1`就会被转换为`int`型.返回值也是一样,在原生接口中被标注为`int`型的返回值也会被自动转为js中的`Number`类型

### 数值类型的显示转化

对于数值类型`Number`,隐式转换是有风险的,很多时候我们还是需要明确类型,下面列出数值类型`Number`支持的显示转化的类型和对应的构造和解包方法

| 类型名 | java类型构造                               | js类型解包                                 | 说明                                                                                                           |
| ------ | ------------------------------------------ | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| byte   | `let byte = new java.lang.Byte('1')`       | `let jsByteValue = byte.byteValue()`       | ---                                                                                                            |
| short  | `let short = new java.lang.Short('1')`     | `let jsShortValue = short.shortValue()`    | ---                                                                                                            |
| int    | `let int = new java.lang.Integer('1')`     | `let jsIntValue = int.intValue()`          | ---                                                                                                            |
| float  | `let float = new java.lang.Float('1.5')`   | `let jsFloatValue = float.floatValue()`    | ---                                                                                                            |
| double | `let double = new java.lang.Double('1.5')` | `let jsDoubleValue = double.doubleValue()` | ---                                                                                                            |
| long   | `let long = new java.lang.Long('1.5')`     | `let jsLongValue = long`                   | 如果long的取值范围在(-2^53, 2^53)<\br>则返回值是Number对象<\br>否则需要使用`.toString()`获取这个值的字符串形式 |

### 数组类型处理

隐式转换的数组类型自然很难满足需求,我们可以使用`Array.create(elementClassName, length)`的方式构造定长数组,其中`elementClassName`就是类型和形状声明,`length`则指定长度

```ts
// byte[] byteArr = new byte[10] 
//字符串声明类型,支持`char`,`boolean`,`byte`,`short`,`int`,`long`,`float`,`double`
let byteArr = Array.create('byte', 10) 
// String[] stringArr = new String[10] 
// 构造函数声明类型
let stringArr = Array.create(java.lang.String, 10) 
// int[][] jaggedIntArray2 = new int[10][]
//申明二维数组,用`[`表示增加1维
let jaggedIntArray2 = Array.create('[int', 10) 

//赋值
stringArr[0]="a"
stringArr[1]="b"
...
```

而为了性能的考虑,Java/Kotlin数组有意不转换为JavaScript数组,尤其是对于大型数组.Java/Kotlin数组对象都会有`length`字段用于标明数组长度,我们一般用下标安位取值,如果可以转换则自动转换,不能则返回代理对象.

```ts
let kotlinClass = new com.example.KotlinClassWithStringArrayProperty()
let kotlinArray = kotlinClass.getStringArrayProperty() // kotlinArray is a special object as described above
let firstStringElement = kotlinArray[0] 
```

## 用源码扩展

扩展的源码我们大致遵循如下几个步骤

1. 设置kotlin编译(java不需要)
    + `App_Resources/Android/gradle.properties`中增加

        ```properties
        useKotlin=true
        ```

    + `App_Resources/Android/before-plugins.gradle`中增加

        ```gradle
        project.ext {
            ...
            kotlinVersion = "1.9.10"
        }
        ```

2. 写源码,要求写在`App_Resources/Android/src/main/java/<你的/packagename/目录/源文件名>`中

    ```kt
    package <你的.packagename.目录>
    ...
    ```

    如果源码中有外部依赖,我们还需要在`App_Resources/Android/app.gradle`中声明依赖

    ```gradle
    dependencies {
        ...
        implementation 'net.jimblackler.jsonschemafriend:core:0.12.3'
    }
    ```

3. [非必须]声明类型接口.将你的原生代码的接口描述引入到typescript可以识别的位置,通常是放到`typings`目录然后在`types/references.d.ts`中进行注册.需要注意packagename需要用`module`一层一层声明.

    ```ts
    declare module net {
        export module jimblackler {
            export module jsonschemafriend {
                export class HelloKotlin {
                    public hello: string;
                    public add(a: number, b: number): number
                }
            }
        }
    }
    ```

    如果你不想要声明类型接口,可以在包装层的头部声明`declare const packagename的第一段: any`.这样typescript也不会报错

4. 写包装层,直接写在业务层在功能上没什么区别,但抽出这个包装层可以方便管理这种原生扩展.注意android的原生扩展包装文件应该取名为`xxxx.android.ts`,

5. 调用,在调用时应该将平台信息隐去,即`import {xxx} from 'xxxx'`.

### 例子

这个例子我们构造一个类`HelloKotlin`让nativescript中的js代码可以调用

+ `App_Resources/Android/src/main/java/my/example/HelloKotlin.kt`,源码

    ```kt
    package my.example

    class HelloKotlin {
        val hello = "Hello from Kotlin!"
        fun add(a: Double, b: Double):Double { 
            return a + b 
        } 
    }
    ```

+ `typings/hellokotlin.d.ts`,类型声明

    ```ts
        declare module net {
            export module jimblackler {
                export module jsonschemafriend {
                    export class HelloKotlin {
                        public hello: string;
                        public add(a: number, b: number): number
                    }
                }
            }
        }
    ```

+ `src/wrapper/hello.android.ts`,包装层

    ```ts
    export class MyHelloKotlin {
        private helloKotlin: any
        constructor() {
            this.helloKotlin = new my.example.HelloKotlin()
        }
        get hello() {
            return this.helloKotlin.hello
        }
        add(x: number, y: number) {
            return this.helloKotlin.add(x,y)
        }
    }
    ```

+ `src/views/Home.vue`,应用层

    ```vue
    <template>
        <Frame>
            <Page actionBarHidden="true">
                <StackLayout>
                    <Button text="测试android" @tap="onActionTap" />
                </StackLayout>
            </Page>
        </Frame>
    </template>

    <script lang="ts" setup>
    import { MyHelloKotlin } from '../wrapper/hello'


    function onActionTap(evt) {
        const my = new MyHelloKotlin()
        console.log(`my.hello is ${my.hello}`)
        console.log(`my.add(12.5,13.9) is ${my.add(12.5, 13.9)}`)
    }
    </script>
    ```

## 二进制包扩展

无论是Java编写的二进制包还是Kotlin编写的二进制包,android里面都可以用.用的二进制包如果包在本地,就放在`App_Resources/Android/libs/`文件夹下;如果是在Maven仓库里的,我们可以直接添加进`App_Resources/Android/app.gradle`

```gradle
dependencies {
    ...
  implementation 'net.jimblackler.jsonschemafriend:core:0.12.3'
}
```

当然了,一些包可能不在默认的以来仓库中保存,这种时候就要额外指定仓库

```gradle
repositories {
    maven { url 'https://repo1.maven.org/maven2' }
    maven { url 'https://jitpack.io' }
}
```

如果也希望有类型声明,可以先去[mvnrepository](https://mvnrepository.com/)下载依赖包到本地,然后根据后缀是jar还是aar执行`ns typings android --jar 依赖包的路径.jar | --aar 依赖包的路径.aar`或`ns typings android "net.jimblackler.jsonschemafriend:core:0.12.3"`这样的形式直接指定包然后从给出的选择中去选来生成包的接口声明.声明文件会被命名为`android.d.ts`,我们将它为依赖名然后注册进`types/references.d.ts`即可.目前`ns typings android`命令有bug无法使用,我们可以用它底层的`java -jar platforms/android/build-tools/dts-generator.jar -input 依赖包的路径 -output typings`命令来达到同样的效果

之后一样的写包装层写应用层即可.

### 例子

这个例子我们包装[jsonschemafriend](https://github.com/jimblackler/jsonschemafriend)让nativescript中的js代码可以调用它做json校验.

+ `App_Resources/Android/app.gradle`,声明依赖

    ```gradle
    repositories {
        maven { url 'https://repo1.maven.org/maven2' }
        maven { url 'https://jitpack.io' }
    }

    dependencies {
        ...
        implementation 'net.jimblackler.jsonschemafriend:core:0.12.3'
    }
    ```

+ `src/wrapper/jsonschemafriend.android.ts`,包装层

    ```ts
    export class JSONSchemaValidator {
        private schemaStore: any
        private schema: any
        private validator: any
        constructor(schemaString: string) {
            this.schemaStore = new net.jimblackler.jsonschemafriend.SchemaStore()
            this.schema = this.schemaStore.loadSchemaJson(schemaString)
            this.validator = new net.jimblackler.jsonschemafriend.Validator()
        }
        validateJson(x: string): boolean {
            try {
                this.validator.validateJson(this.schema, x)
                return true
            } catch (error) {
                console.log(`validator get error ${error}`)
                return false
            }

        }
    }
    ```

+ `src/views/Home.vue`,应用层

```vue
<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Button text="测试lib扩展" @tap="onActionTap2" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { MyHelloKotlin } from '../wrapper/hello'
import { JSONSchemaValidator } from '../wrapper/jsonschemafriend'

function onActionTap2(evt) {
    const schema = `{\"$schema\": \"http://json-schema.org/draft-07/schema#\", \"type\": \"integer\"}`
    const validator = new JSONSchemaValidator(schema)
    validator.validateJson("1")
    console.log(`validator.validateJson("1") is ${validator.validateJson("1")}`)
    console.log(`validator.validateJson("true") is ${validator.validateJson("true")}`)
}
</script>
```
