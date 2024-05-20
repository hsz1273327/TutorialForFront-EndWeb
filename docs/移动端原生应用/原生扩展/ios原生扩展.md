# ios原生扩展

我们知道ios是使用Swift/ObjectC开发的,要使用原生方式扩展应用也就是让nativescript可以识别出Swift/ObjectC的源码或二进制包.本人既不会Swift又不会ObjectC,但听说Swift语法比较简单,所以就用Swift来演示了.

在ios中原生资源包括:

+ 源码
+ 二进制包

本文的例子在[nsv-extend](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/nsv-extend)的ios部分

## 类型转换

在ios原生扩展的编码过程中我们不可避免的会需要在js的类型和`ObjectC`/`Swift`中的类型之间进行转换--我们调用原生接口需要从js类型转换为`ObjectC`/`Swift`中的类型;取得到原生接口的返回值后又需要将`ObjectC`/`Swift`中的类型转换为js类型进行业务层处理.

在nativescript中,对于用户自定义类型,在nativescript中则是会被统一转成js的类型,我们只要像js中一样用`new`关键字实例化,用`.`符号取字段掉用方法即可.

而对于基础类型的转换是多数时候是隐式的,我们可以直接将js类型的数据传递给原生接口,原生接口的返回也会被js自动转换为js类型.我们通常只要记住它们的转换规则即可

| js类型             | Swift类型 |
| ------------------ | --------- |
| `String`           | `String`  |
| `Boolean`          | `Bool`    |
| `Number`           | `Double`  |
| `Undefined`&`Null` | `nil`     |

其中`Number`比较特殊,js中的`Numer`类型的数据会根据原生接口的声明进行转换,比如原生接口中声明这个参数是`Int`型,传入`1`就会被转换为`Int`型.返回值也是一样,在原生接口中被标注为`Int`型的返回值也会被自动转为js中的`Number`类型

### NSObject处理

但很多接口中我们使用的是`NSString`这样继承自`NSObject`的ios上专用的类型.因此很多时候我们需要的是转换为这类对象的方法

| 对象           | 构造                                                                                           | 解包                       |
| -------------- | ---------------------------------------------------------------------------------------------- | -------------------------- |
| `NSString`     | `const content= NSString.stringWithString(String)`                                             | `content.UTF8String`       |
| `NSDictionary` | `const dict = NSDictionary.dictionaryWithObjectsForKeys(["a","b","c"],["key1","key2","key3"])` | `dict.valueForKey("key1")` |
| `NSArray`      | `const arr = NSArray.arrayWithArray([1,2,4,5])`                                                | `arr.objectAtIndex(0)`     |

而更加特殊的`NSData`类型的对象,它是由文本类的数据类型转化得来的.最常见的就是由`NSString`转换得来.

```ts
const nsData: NSData = content.dataUsingEncoding(NSUTF8StringEncoding)
```

## 用源码扩展

扩展的源码我们大致遵循如下几个步骤

1. 写源码,要求写在`App_Resources/iOS/src/<你的源文件名>`中

    ```swift
    import UIKit

    // @objcMembers
    public class HelloSwift: NSObject {
        @objc public var hello: String = "Hello from Swift!"

        @objc public func addWith(a: Double, b: Double) -> Double {
            return a + b;
        }
    }
    ```

    方法字段装饰器`@objc`可以用于声明哪些方法或字段可以被nativescript通过js调用,如果整个类中的所有字段都可以被调用则可以使用`@objcMembers`装饰器简化代码

    如果源码中有外部依赖,我们还需要在`App_Resources/iOS/Podfile`中声明依赖

    ```Podfile
    pod 'DTCoreText'
    pod xxxxx //这里添加
    post_install do |pi|
        pi.pods_project.targets.each do |t|
            t.build_configurations.each do |config|
                config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '12.0'
            end
        end
    end
    ```

2. 声明接口,使用命令`ns typings ios`生成接口声明文件,这个文件会放在`typings/ios/x86_64(x86机器)`或`typings/ios/arm(arm芯片的机器)`目录下.你定义的代码对应的接口声明会在`objc!nsswiftsupport.d.ts`文件中.你可以将其加入`types/refernces.d.ts`中这样在tyepscript中就不会提示类型找不到了

    ```ts
    /// <reference path="../typings/ios/x86_64/objc!nsswiftsupport.d.ts" />
    ```

    需要注意swift的命名习惯是动词介词加对象,而nativescript的转译也会将接口转成这样,这会和你在源码中定义的不同,比如源码中的`add(a: Double, b: Double) -> Double`会被转成`addWithAB(a: number, b: number): number`.我们需要以声明文件中的接口命名为准

3. 写包装层,直接写在业务层在功能上没什么区别,但抽出这个包装层可以方便管理这种原生扩展.注意ios的原生扩展包装文件应该取名为`xxxx.ios.ts`.我们自定义的swift源码中的对象都可以直接在js代码中使用,类就用`new`方式实例化,函数就直接调用.具体接口如何我们就需要参考上一步中给出的接口类型描述了.

4. 调用,在调用时应该将平台信息隐去,即`import {xxx} from 'xxxx'`.

### 例子

这个例子我们构造一个类`HelloSwift`让nativescript中的js代码可以调用.这个例子功能上和android中的完全一样

+ `App_Resources/iOS/src/HelloSwift.kt`,源码

    ```swift
    import UIKit

    @objcMembers
    public class HelloSwift: NSObject {
        public var hello: String = "Hello from Swift!"

        public func addWith(a: Double, b: Double) -> Double {
            return a + b;
        }
    }
    ```

+ `src/wrapper/hello.ios.ts`,包装层

    ```ts
    export class MyHello {
        private helloSwift: any
        constructor() {
            this.helloSwift = new HelloSwift()
        }
        get hello() {
            return this.helloSwift.hello
        }
        add(x: number, y: number) {
            return this.helloSwift.addWithAB(x,y)
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

ios中的二进制包都是使用[cocoapods](https://cocoapods.org/)维护分发的.我们找到需要的包后在`App_Resources/iOS/Podfile`中声明依赖

```Podfile
pod 'DTCoreText'
pod xxxxx //这里添加
post_install do |pi|
    pi.pods_project.targets.each do |t|
        t.build_configurations.each do |config|
            config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '12.0'
        end
    end
end
```

然后执行`ns typings ios`以获得其中的接口声明.需要注意

1. 修改好`App_Resources/iOS/Podfile`中的依赖声明后最好别写代码直接执行`ns typings ios`,因为`ns typings ios`实际会执行编译,如果编译不通过声明文件就出不来
2. 依赖的接口声明文件会放在`typings/ios/x86_64(x86机器)`或`typings/ios/arm(arm芯片的机器)`目录下.依赖的接口声明会在`objc!xxxx.d.ts`文件中.比如包名叫`DSJSONSchemaValidation`,声明文件就会叫`objc!DSJSONSchemaValidation.d.js`
3. 你可以将依赖色声明文件其加入`types/refernces.d.ts`中这样在tyepscript中就不会提示类型找不到了

    ```ts
    /// <reference path="../typings/ios/x86_64/objc!xxx.d.ts" />
    ```

之后一样的写包装层写应用层即可.

需要注意很多接口都会相比原有接口的命名额外带上`OptionsError`,而且也会额外增加最后一位参数`options`,这个是用来处理异常的,通常我们填`null`即可

### 例子

这个例子我们包装[JSONSchemaValidation](https://github.com/dashpay/JSONSchemaValidation)让nativescript中的js代码可以调用它做json校验.

+ `App_Resources/iOS/Podfile`,声明依赖

    ```Podfile
    pod 'DTCoreText'
    pod 'DSJSONSchemaValidation'
    post_install do |pi|
        pi.pods_project.targets.each do |t|
            t.build_configurations.each do |config|
                config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '12.0'
            end
        end
    end
    ```

+ `src/wrapper/jsonschemafriend.ios.ts`,包装层

    ```ts
    export class JSONSchemaValidator {
        private schema: DSJSONSchema
        constructor(schemaString: string) {
            const content: NSString = NSString.stringWithString(schemaString)
            console.log("content#1: " + content)
            const nsData: NSData = content.dataUsingEncoding(NSUTF8StringEncoding)
            const schemaJSON = NSJSONSerialization.JSONObjectWithDataOptionsError(nsData, null)
            this.schema = DSJSONSchema.schemaWithObjectBaseURIReferenceStorageSpecificationOptionsError(schemaJSON, null, null, DSJSONSchemaSpecification.draft7(), null)
        }

        validateJson(x: string): boolean {
            try {
            const content: NSString = NSString.stringWithString(x)
            const nsData: NSData = content.dataUsingEncoding(NSUTF8StringEncoding)
            const res = this.schema.validateObjectWithDataError(nsData)
            console.log("validateJson res: " + res)
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
