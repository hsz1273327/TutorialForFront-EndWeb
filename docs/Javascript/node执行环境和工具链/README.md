# node执行环境和工具链

[node.js](https://nodejs.org/zh-cn/)是js的标准执行环境.在现代js编程上是js编程的基石.几乎所有与js相关的工具都必须在node环境下使用.同时它也默认给出了一些基本的通用工具和使用规范.

在安装好后,我们应该设置环境变量`NODE_HOME=/你的安装目录`和`NODE_PATH="/你的全局模块安装位置:$NODE_PATH"`.

## npm

npm是node.js的官方项目管理工具,它集包管理,虚拟环境,包发布,入口定义于一体.

它可以用于全局环境的搭建,也可以用于单独项目的环境搭建,全局环境可以理解为python中的pip工具的功能,而单独项目管理可以理解为python中的虚拟环境类似概念,只是一个虚拟环境对应一个项目

npm的工具的操作有:

+ `npm search <package>` |查找包
+ `npm view <package> dependencies`|查看包的依赖关系
+ `npm view <package> repository.url`|查看包的源文件地址
+ `npm view <package> engines`|查看包所依赖的Node的版本
+ `npm root`| 查看项目路径,可以加`-g`表示全局的package存储位置
+ `npm install <package>`|安装包,可以加`-g`表示全局,`--save`表示计入配置文件的`Dependencies`,`--save-dev`表示计入配置文件的`devDependencies`
+ `npm uninstall <package>`|卸载包,可以加`-g`表示全局
+ `npm update <package>` |更新包,可以加`-g`表示全局
+ `npm outdated` |检查过时的包,可以加`-g`表示全局
+ `npm list`| 查看当前目录下已安装的node包,注意事项：Node模块搜索是从代码执行的当前目录开始的，搜索结果取决于当前使用的目录中,node_modules下的内容。`npm list parseable=true`可以目录的形式来展现当前安装的所有node包,可以加`-g`表示全局
+ `npm publish/unpublish`发布,下架包

### 全局环境设置专用操作

操作|说明
---|---
npm adduser|创建npm的用户
npm config ls|查看npm在机器上的设置

### 单独项目专用操作

操作|说明
---|---
npm init|初始化一个项目,会生成一个`package.json`作为配置文件来管理该项目

### `package.json`配置文件

package.json是一个node.js项目的配置文件,它大约是这样的:

```json
{
  "name": "ex3",    //项目名
  "version": "1.0.0", //版本
  "description": "", //描述
  "main": "index.js", //入口文件
  "scripts": {  //可运行的脚本
    "docs": "esdoc -c esdoc.json",
    "start": "gulp",
    "lint": "gulp lint",
    "test":"./node_modules/.bin/babel-node ./node_modules/.bin/isparta cover --report html ./node_modules/.bin/_mocha "
  },
  "author": "hsz",//作者
  "license": "ISC",//版权声明
  "devDependencies": {//开发用的依赖
    "babel-cli": "^6.6.5",
    "babel-core": "^6.7.4",
    "babel-eslint": "^6.0.2",
    "babel-loader": "^6.2.4",
    "babel-polyfill": "^6.7.4",
    "babel-preset-es2015": "^6.6.0",
    "babel-register": "^6.7.2",
    "chai": "^3.5.0",
    "esdoc": "^0.4.6",
    "eslint": "^2.7.0",
    "gulp": "^3.9.1",
    "gulp-clean": "^0.3.2",
    "gulp-eslint": "^2.0.0",
    "gulp-minify-html": "^1.0.6",
    "gulp-notify": "^2.2.0",
    "gulp-rename": "^1.2.2",
    "gulp-uglify": "^1.5.3",
    "gulp-util": "^3.0.7",
    "isparta": "^4.0.0",
    "mocha": "^2.4.5",
    "mochawesome": "^1.3.2",
    "webpack": "^1.12.14"
  }
}
```

可以看到`devDependencies`字段会将开发依赖的包包括版本号都记录下来,同理`Dependencies`字段则是会记录下执行依赖的包.
有些工具他们可以使用`package.json`设置自己,有些不行.

### 依赖的版本声明

使用NPM下载和发布代码时都会接触到版本号。NPM使用语义版本号来管理代码，这里简单介绍一下。
语义版本号分为X.Y.Z三位，分别代表主版本号、次版本号和补丁版本号。当代码变更时，版本号按以下原则更新。
如果只是修复bug，需要更新Z位。
如果是新增了功能，但是向下兼容，需要更新Y位。
如果有大变动，向下不兼容，需要更新X位。
版本号有了这个保证后，在申明第三方包依赖时，除了可依赖于一个固定版本号外，还可依赖于某个范围的版本号。例如"argv": "0.0.x"表示依赖于0.0.x系列的最新版argv。

版本控制同样支持通配符

+ \*: 任意版本
+ 1.1.0: 指定版本
+ ~1.1.0: >=1.1.0 && < 1.2.0
+ ^1.1.0: >=1.1.0 && < 2.0.0
+ 其中 ~ 和 ^ 两个前缀让人比较迷惑，简单的来说：
+ ~ 前缀表示，安装大于指定的这个版本，并且匹配到 x.y.z 中 z 最新的版本。
+ ^ 前缀在 ^0.y.z 时的表现和 ~0.y.z 是一样的，然而 ^1.y.z 的时候，就会 匹配到 y 和 z 都是最新的版本。

特殊的是，当版本号为 ^0.0.z 或者 ~0.0.z 的时候，考虑到 0.0.z 是一个不稳定版本， 所以它们都相当于 =0.0.z。

### 墙内换源

npm虽好,但无奈天朝有墙,我们只能用国内镜像作为源了

在你的home目录下,编辑`~/.npmrc `,

```shell
registry =https://registry.npm.taobao.org
```

## index.js

习惯上一个项目的入口文件会被命名为`index.js`.这个没有强制但基本大家都这么干.
而如果使用es6开始的import语法导入模块,如果导入的路径是一个文件夹,那么也会使用其中的`index.js`文件作为模块的入口.

## 程序入口

在一个js项目中,我们可以在`package.json`中定义预设的执行脚本.使用`scripts`字段定义,其形式为:

```json
{
    ...,
    "scripts":{
        "start": "./node_modules/.bin/live-server --port=3000 frontend/public",
        "build": "./node_modules/.bin/babel frontend/es -d frontend/public",
        ...
    }
}
```

其中`start`是一个特殊字段,其他的定义好了执行脚本后使用`npm run xxx`来执行,`start`则可以直接使用`npm start`来执行

## 项目发布

类似pipy,我们也需要去[npm的包仓库](https://www.npmjs.com/)中注册一个账号才可以发布项目.注册好后使用`npm adduser`将自己注册时填写的账号密码,邮箱都按提示填上.
在确认好自己的包的`name`和`version`字段没有重复后,就可以在项目目录下执行`npm publish`就可以将包提交到npm包仓库上去了.

如果要取消发布,则可以在项目下执行`npm unpublish --force`.注意:根据规范,只有在发包的24小时内才允许撤销发布的包.