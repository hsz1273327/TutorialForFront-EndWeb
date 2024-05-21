# native-helloworld

本项目使用nativescript-vue构造.

## 使用方法

`ns run ios`或`ns run android`

# 插件开发

前面已经介绍过如何分别开发android和ios的原生扩展了.我们将这两部分按特定的规范合并起来,就可以构造插件了.本文将介绍如何构造插件.

本文例子就是将上面两节的内容做成一个插件,这个例子插件在[nsv-plugin分支](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/nsv-plugin).这个分支的插件可以用``的方式安装.使用该插件的例子在[分支]()

## 插件的文件结构

随便安装一个插件我们可以总结出插件的文件结构通常如下所示

```bash
项目名---\
        |---package.json //作为js项目的包元数据描述文件
        |---index.d.ts //插件的接口描述
        |---index.ios.js //插件的ios实现
        |---index.android.js //插件的android实现
        |---common.d.ts // 平台公用接口的申明
        |---common.js // 平台公用接口的实现部分
        |---platforms---\
                        |---ios---\
                        |         |---Info.plist // 声明插件在ios下需要的权限
                        |         |---Podfile // 声明插件在ios下需要的外部依赖
                        |         |---src\ // 存放ios下的原生代码
                        | 
                        |---android---\
                                      |---AndroidManifest.xml //声明插件在android下需要的权限
                                      |---include.gradle //声明插件在android下的依赖
                                      |---xxxx.aar //下载下来的android本地依赖lib
                                      |---java/你的packagename路径 // 存放android下的原生代码
                        
```

上面这些当然并不是全都需要,下面是几个要点:

+ `package.json`.nativescript插件的`package.json`和一般的js包不同之处在于它多一个`nativescript`字段

    ```json
    {
        ...
        "nativescript": {
            "platforms": {
                "ios": "8.7.0",
                "android": "8.7.0"
            }
        },
        ...
    }
    ```

+ `platforms/ios/Info.plist`.和在应用项目中声明权限一样,插件中声明权限也是用`Info.plist`文件,和在项目中一样,它也是放在一个`<dict>`中,项目用到什么权限就声明什么权限就好,比如我们要用到摄像头照相机,就写

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
        <key>NSPhotoLibraryUsageDescription</key>
        <string>Requires access to photo library.</string>
        <key>NSCameraUsageDescription</key>
        <string>Requires access to camera.</string>
        <key>NSMicrophoneUsageDescription</key>
        <string>Requires access to microphone.</string>
    </dict>
    </plist>
    ```

+ `platforms/ios/Podfile`.插件的`Podfile`只需要写上依赖即可,其他都不用写,比如

    ```Podfile
    pod 'WalletConnect', git: 'https://github.com/triniwiz/wallet-connect-swift', branch: 'master'
    pod 'TrustWalletCore', '~> 3.0.4'
    ```

+ `platforms/android/AndroidManifest.xml`.和在应用项目中声明权限一样,插件中声明权限也是用`AndroidManifest.xml`文件,除了权限外还可以声明`intent`,只是如果申明`intent`需要在`<manifest>`的属性上加上插件android部分的packagename

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <manifest xmlns:android="http://schemas.android.com/apk/res/android" xmlns:tools="http://schemas.android.com/tools"
        package="插件的packagename">
        <application>
            <provider
                android:name="androidx.core.content.FileProvider"
                android:authorities="${applicationId}.provider"
                android:exported="false"
                android:grantUriPermissions="true">
                <meta-data
                    android:name="android.support.FILE_PROVIDER_PATHS"
                    tools:replace="android:resource"
                    android:resource="@xml/provider_paths"/>
            </provider>
        </application>
        <!-- 权限声明 -->
        <uses-permission android:name="android.permission.CAMERA" />

        <!-- intent声明 -->
        <queries>
            <intent>
                <action android:name="android.intent.action.VIEW" />
                <data android:scheme="wc"/>
            </intent>
        </queries>
    </manifest>
    ```

+ `platforms/android/include.gradle`.和在应用项目中不同,android插件的依赖使用`include.gradle`声明,而且它只用声明依赖

    ```gradle
    repositories {
        maven { url 'https://jitpack.io' }
        mavenCentral()
    }

    dependencies {
        implementation "com.github.TrustWallet:wallet-connect-kotlin:1.5.6"
        implementation "com.squareup.okhttp3:okhttp:4.9.3"
        implementation "com.google.code.gson:gson:2.9.0"
    }
    ```

## ts开发插件

如果我们要用ts写插件,那需要对ts进行额外设置以支持插件开发.项目结构会变为

```bash
项目名---\
        |---package.json // 作为js项目的包元数据描述文件 [有变动]
        |---index.d.ts // 插件的接口声明
        |---index.ios.ts //插件的ios实现 [新增]
        |---index.android.ts //插件的android实现 [新增]
        |---common.ts // 平台公用接口的实现部分 [新增]
        |---tsconfig.json // ts编译设置 [新增]
        |---references.d.ts // ts类型引用申明 [新增]
        |---typings\  //原生代码和包的接口类型声明文件 [新增]
        |---.npmignore //npm安装时隐去的文件 [新增]
        |---platforms---\
                        |---ios---\
                        |         |---Info.plist // 声明插件在ios下需要的权限
                        |         |---Podfile // 声明插件在ios下需要的外部依赖
                        |         |---src\ // 存放ios下的原生代码
                        | 
                        |---android---\
                                      |---AndroidManifest.xml //声明插件在android下需要的权限
                                      |---include.gradle //声明插件在android下的依赖
                                      |---xxxx.aar //下载下来的android本地依赖lib
                                      |---java/你的packagename路径 // 存放android下的原生代码
```

其中

+ `package.json`,在其中我们需要安装依赖`typescript`和`ts-patch`,并增加编译用的脚本

```json
{
    ...
    "scripts": {
        "ts-patch": "node_modules/.bin/ts-patch",
        "build": "npm i && node_modules/.bin/tsc -skipLibCheck",
        "publish": "npm login && npm publish"
    },
    ...
    "devDependencies": {
        "@nativescript/android": "~8.7.0",
        "@nativescript/core": "~8.7.1",
        "@nativescript/ios": "~8.7.0",
        "@nativescript/tailwind": "~2.0.1",
        "@nativescript/types": "~8.7.0",
        "@nativescript/webpack": "~5.0.0",
        "@types/node": "~17.0.21",
        "tailwindcss": "^3.1.8",
        "typescript": "^5.2.2",
        "ts-patch": "^3.1.2"
    },
    ...
}
```

+ `tsconfig.json`用于设置编译行为,一般像如下这样设置

    ```json
    {
    "compilerOptions": {
        "target": "ES2017",
        "module": "esnext",
        "moduleResolution": "node",
        "declaration": true,
        "removeComments": true,
        "noLib": false,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "lib": [
        "ES2017",
        "es6",
        "dom"
        ],
        "skipLibCheck": true,
        "skipDefaultLibCheck": true,
        "sourceMap": true,
        "pretty": true,
        "allowUnreachableCode": false,
        "allowUnusedLabels": false,
        "noEmitHelpers": true,
        "noEmitOnError": false,
        "noImplicitAny": false,
        "noImplicitReturns": true,
        "noImplicitUseStrict": false,
        "noFallthroughCasesInSwitch": true,
        "typeRoots": [
        "./node_modules/@types",
        "./node_modules"
        ],
        "types": [],
        "plugins": [
        {
            "transform": "@nativescript/webpack/dist/transformers/NativeClass", //如果代码中有用到装饰器`NativeClass`就需要设置
            "type": "raw"
        }
        ]
    },
    "exclude": [
        "demo",
        "node_modules"
    ],
    "compileOnSave": false
    }
    ```

+ `typings`文件夹和`references.d.ts`.这两个都是用来辅助声明原生代码类型信息的.`typings`文件夹中放使用`ns typings`命令生成的类型注解,`references.d.ts`中将他们注册进来

    ```ts
    /// <reference path="./typings/xxxx" />
    ```

+ `.npmignore`.无论项目是js写的还是ts写的,最终我们安装插件时要的还是只有js代码和ts的类型注释,因此需要这个文件吧ts文件屏蔽

    ```txt
    *.map
    *.ts
    !*.d.ts
    tsconfig.json
    references.d.ts
    ```

要编译时,需要先执行`npm run ts-patch`执行ts的打补丁操作,再执行`npm run build`编译,之后项目中就会有`.d.ts`和`.js`的对应代码了.

之后我们可以使用`npm run publish`将项目发布到npm,如果不想发布到npm,直接发个release打个tag或者拉个分支也可以用`npm install git+项目地址#tag或分支名`的方式安装


其实官方有提供一个种子项目[NativeScript/plugin-seed](https://github.com/NativeScript/plugin-seed)用于快速构建nativescript插件,但个人并不推荐用它,因为这种方式构建的项目,代码仓库仅能作为ts源码的仓库,并不能直接用npm从仓库安装.这种方式构造的插件项目依赖中心化的npm包中心,而很多时候我们又需要分布式或者私有化的包管理仓库,像我上面这样写插件其实反而省事.


