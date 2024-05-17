# ios原生扩展

我们知道ios是使用Swift/ObjectC开发的,要使用原生方式扩展应用也就是让nativescript可以识别出Swift/ObjectC的源码或二进制包.本人既不会Swift又不会ObjectC,但听说Swift语法比较简单,所以就用Swift来演示了.

在ios中原生资源包括:

+ 源码
+ 二进制包

从原理上讲Kotlin/Java中包都是以`xxx.yyy.zzz.www`的形式标识的(`package name`),我们在js中调用他们也是用它.

本文的例子在[nsv-extend](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/nsv-extend)的android部分

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

3. 写包装层,直接写在业务层在功能上没什么区别,但抽出这个包装层可以方便管理这种原生扩展.注意android的原生扩展包装文件应该取名为`xxxx.android.ts`,

4. 调用,在调用时应该将平台信息隐去,即`import {xxx} from 'xxxx'`.

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

+ `src/wrapper/hello.android.ts`,包装层

    ```ts
    declare const my: any

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
    declare const net: any

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