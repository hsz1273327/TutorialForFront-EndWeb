
# Babel编译器

[Babel](https://www.babeljs.cn/)是ECMAScript的语法编译器,它可以把高级语法的js代码编译为低级语法的js代码以适应各种环境.babel高度模块化,因此如果要使用完全的特性就需要安装对应的模块,这都有点让人觉得有点过度设计.

它大致分为如下几个模块:

+ `@babel/core`编译器核心模块.

+ `@babel/cli`编译器的命令行工具

+ `@babel/plugin*`babel的插件,babel可以通过插件提供特性,比如希望js有python类似的类型注解,可以安装插件`@babel/plugin-transform-flow-strip-types`

+ `@babel/preset-env`提供最近最常见的语法特性包组合,可以理解为`@babel/plugin*`的一些整合包,主要的有:
    + [@babel/preset-env](https://babel.docschina.org/docs/en/babel-preset-env)用于支持最常用的高版本ECMAScript语法
    + [@babel/preset-flow](https://babel.docschina.org/docs/en/babel-preset-flow)用于支持flow相关语法
    + [@babel/preset-react](https://babel.docschina.org/docs/en/babel-preset-react)用于支持react相关语法比如jsx
    + [@babel/preset-typescript](https://babel.docschina.org/docs/en/babel-preset-typescript)用于支持typescript语法

+ `@babel/polyfill`提供运行时特性,主要是用来实现对generator、async函数等的支持.`@babel/polyfill`由`core-js2`和`regenerator-runtime`组成.**这个项目已经废弃,不建议使用**

+ `@babel/runtime`提供运行时特性,替代`@babel/polyfill`功能的模块之一,需要结合`core-js3`才能完全替代`@babel/polyfill`

+ `@babel/register`经过babel的编译后,我们的源代码与运行在生产下的代码是不一样的.`@babel/register`则提供了动态编译.换句话说,我们的源代码能够真正运行在生产环境下.不需要babel编译这一环节.当然,坏处是动态编译导致程序在速度,性能上有所损耗.其使用时先导入这个模块,然后再导入有高级语法的其他模块,这样其他模块就可以正常使用了.

+ `@babel/node`一个执行`@babel/preset-env`指定语法特性的node包装.它可以直接执行高版本的js源码,当然,坏处是动态编译导致程序在速度,性能上有所损耗.

## babel配置

在安装好babel后要使用我们还得对它进行配置.最简单的方法是在`package.json`中通过`babel`字段定义配置.

```json
{...
    "babel": {
        "presets": [
                    ["@babel/preset-env"]
        ],
        "plugins": [
            "@babel/plugin-transform-flow-strip-types"
        ]
    },
 ...
}
```

通常要配置的就是`presets`部分,我们一般就用`@babel/preset-env`,它可以默认的引入,如上面例子一样,也可以在其中加入配置,比如:

```json
{
    ...,
    "presets": [
         [
             "@babel/preset-env",
             {
                 "targets": "> 0.25%, not dead"
             }
         ]
    ],
}
```

上面的配置将针对使用率大于0.25%的浏览器进行编译.我们也可以直接指定不同平台为目标:

```json

{
    ...,
    "presets": [
         [
             "@babel/preset-env",
             {
                 "targets": {
                    "chrome": "> 0.25%, not dead"
             }
         ]
    ],
}
```
targets支持的平台有:chrome, opera, edge, firefox, safari, ie, ios, android, node, electron.



## 编译操作

而我们通常将编译和执行操作写到package.json中方便调用:

```json
{...
    "scripts":{
        "start":"./node_modules/.bin/babel-node src/index.js",
        "build": "./node_modules/.bin/babel src -d bin"
     },
 ...
}
```

只有使用命令`npm start` 即可执行项目,`npm run build`即可编译项目

## helloworld

我们在分支[node执行环境和工具链-babel编译器](https://github.com/hsz1273327/TutorialForJavascript/tree/node%E6%89%A7%E8%A1%8C%E7%8E%AF%E5%A2%83%E5%92%8C%E5%B7%A5%E5%85%B7%E9%93%BE-babel%E7%BC%96)上演示这个helloworld.这个简单项目的执行环境时node.

我们init项目,然后再安装环境:

```bash
npm install --save-dev @babel/core @babel/cli @babel/plugin-transform-flow-strip-types @babel/preset-env @babel/runtime 

npm install --save-dev @babel/register @babel/node
```

接着配置我们的babel,这样得到`package.json`为:

```json
{
  "name": "js-toolchain-exp",
  "version": "1.0.0",
  "description": "js演示工具集",
  "main": "bin/index.js",
  "scripts": {
    "start": "./node_modules/.bin/babel-node src/index.js",
    "build": "./node_modules/.bin/babel src -d bin"
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
    "@babel/cli": "^7.8.4",
    "@babel/core": "^7.8.4",
    "@babel/node": "^7.8.4",
    "@babel/plugin-transform-flow-strip-types": "^7.8.3",
    "@babel/preset-env": "^7.8.4",
    "@babel/register": "^7.8.3",
    "@babel/runtime": "^7.8.4"
  },
  "babel":{
    "presets": [
      ["@babel/preset-env",{
        "targets":{
          "node": "current"
        }
      }]
    ],
    "plugins": [
    "@babel/plugin-transform-flow-strip-types"
    ]
  }
}
```

这样我们就可以开始写我们的程序了,我们的演示程序如下:

+ `src/index.js`

```js
const promises = [
    new Promise(resolve => resolve(1)),
    new Promise(resolve => resolve(2)),
    new Promise(resolve => resolve(3)),
]

async function test(hello: string) {
    for await (const p of promises) {
        console.log(`${hello},${p}`);
    }
}
test("hello")
```

这个程序使用了es9的异步迭代器,同时使用了flow标注类型.执行`npm start`我们的程序可以正常运行,执行`npm run build`,我们的程序也可以正常编译.执行`node bin/index.js`我们也可以正常执行项目.
