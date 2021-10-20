
# TypeScript编译器

TypeScript是微软创建的一门Javascript方言,它有专门的编译器来将TypeScript源码转换成javascript代码.要使用它,需要安装编译器

```bash
npm install -g typescript
```

官方建议的是全局安装,那如何确定一个项目是typescript的项目呢?如果一个项目根目录下有`tsconfig.json`,那么它就是一个TypeScript项目.而`tsconfig.json`则是这个项目的ts编译器配置.

通常我们的依赖都是走npm安装的,typescript除了要安装模块外,还需要安装模块对应的类型声明包,比如要用node的标准库或者其他原生类型,我们需要安装`@types/node`

## typescript编译器配置

一个`tsconfig.json`一般型如

```json
{
    "compilerOptions": {
        "module": "system",
        "noImplicitAny": true,
        "removeComments": true,
        "preserveConstEnums": true,
        "outFile": "../../built/local/tsc.js",
        "sourceMap": true
    },
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules",
        "**/*.spec.ts"
    ]
}
```

它的jsonschema在[这里](http://json.schemastore.org/tsconfig)

+ `compilerOptions`用于设置编译器选项,可以被忽略,全部字段含义可以看[官方文档](https://www.tslang.cn/docs/handbook/compiler-options.html)

+ `include/exclude/files`用于指定要编译的源码范围,他们可以指定一个文件glob匹配模式列表.支持的glob通配符有:

    + `*` 匹配0或多个字符（不包括目录分隔符）
    + `?` 匹配一个任意字符（不包括目录分隔符）
    + `**/` 递归匹配任意子目录
    
    需要注意编译器如果不做额外设置默认只会编译后缀为`.ts/.tsx/.d.ts`的源码,如果在`compilerOptions`中设置了字段`allowJs`为true,则还可以包含`.js和.jsx`.
    
    

## typescript执行环境


[ts-node](https://github.com/TypeStrong/ts-node)是typescript的一个解释器,同时其子模块`ts-node/register`类似`@babel/register`也提供运行时支持.使用ts-node我们就可以直接执行ts源码不用编译了.但和`@babel/node`的问题一样,我们不应该在生产环境使用它.

## 编译操作

而我们通常将编译和执行操作写到`package.json`中方便调用:

```json
{...
    "scripts":{
        "start":"./node_modules/.bin/ts-node src/index.js",
        "build": "./node_modules/.bin/tsc"
     },
 ...
}
```

只有使用命令`npm start`即可执行项目,`npm run build`即可编译项目

## helloworld

我们在分支[node执行环境和工具链-typescript编译器](https://github.com/hsz1273327/TutorialForJavascript/tree/node%E6%89%A7%E8%A1%8C%E7%8E%AF%E5%A2%83%E5%92%8C%E5%B7%A5%E5%85%B7%E9%93%BE-typescript%E7%BC%96%E8%AF%91%E5%99%A8)上演示这个helloworld.这个简单项目的执行环境时node.

我们init项目,然后再安装环境:

```bash
npm install --save-dev typescript ts-node

npm install --save @types/node
```

接着配置我们的babel,这样得到`package.json`为:

```json
{
    "name": "js-toolchain-exp",
    "version": "1.0.0",
    "description": "js演示工具集",
    "main": "bin/index.js",
    "scripts": {
        "start": "./node_modules/.bin/ts-node src/index.ts",
        "build": "./node_modules/.bin/tsc"
    },
    "repository": {
        "type": "git",
        "url": "git+https://github.com/hszofficial/js-toolchain-exp.git"
    },
    "keywords": [
        "演示"
    ],
    "author": "hsz",
    "license": "MIT",
    "bugs": {
        "url": "https://github.com/hszofficial/js-toolchain-exp/issues"
    },
    "homepage": "https://github.com/hszofficial/js-toolchain-exp#readme",
    "devDependencies": {
        "ts-node": "^8.6.2",
        "typescript": "^3.7.5"
    },
    "dependencies": {
        "@types/node": "^13.7.1"
    }
}
```

然后再配置我们的`ts-config.json`

```json
{
    "compilerOptions": {
        "module": "CommonJS",
        "lib": ["DOM","ES2018"],
        "target": "ES5",
        "noImplicitAny": true,
        "removeComments": true,
        "preserveConstEnums": true,
        "outDir": "dist",
        "sourceMap": true
    },
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules",
        "**/*.spec.ts"
    ]
}
```

我们的程序是要能在node环境下执行的,因此我们选择模块方式为`CommonJS`,target为`ES5`,同时引入`lib`为`DOM`和`ES2018`以支持各种接口.

这样我们就可以开始写我们的程序了,我们的演示程序如下:

+ `src/index.js`

```js
const promises:Array<Promise<number>> = [
    new Promise<number>((resolve:(value:number)=>void,reject) => resolve(1)),
    new Promise<number>((resolve:(value:number)=>void,reject) => resolve(2)),
    new Promise<number>((resolve:(value:number)=>void,reject) => resolve(3))
]

async function test(hello: string):Promise<void> {
    for await (const p of promises) {
        console.log(`${hello},${p}`)
    }
}
test("hello")
```

这个程序使用了es9的异步迭代器,同时使用了typescript的标注类型.执行`npm start`我们的程序可以正常运行,执行`npm run build`,我们的程序也可以正常编译.执行`node bin/index.js`我们也可以正常执行项目.
