# webpack

前端项目的资源无非就是:

+ html文件
+ css文件
+ 图片文件
+ js文件
+ 其他文件

webpack将所有这些不同类型的文件视作平等的资源--js模块,通过加载器将他们组合到统一的前端项目中.本文将创建一个简单的示例页面,一步一步的将webpack的基本用法引出来.

webpack是一个前端项目的打包工具,它会把你的项目当做一个整体,我们使用它的时候并不需要开始就定义好html中的内容,而是通过js直接构造DOM.通过一个给定的主文件(如:index.js),Webpack将从这个文件开始找到你的项目的所有依赖文件,使用loaders处理它们,最后打包为一个(或多个)浏览器可识别的JavaScript文件.

本文介绍webpack的最基本安装,顺便引出webpack的几个基本概念:

1. 加载器`loader`
2. 插件`Plugins`

本文的例子代码在<https://github.com/TutorialForJavascript/frontend-Webpack/tree/master/code>,实现一个最简单的仅仅只是显示文字的html页面.但也分为几个步骤

## 本体安装

webpack本体安装很简单:

```shell
npm install --save-dev webpack webpack-cli
```

这个最简单的前端项目(C1)源码上看包括:

+ 一个用于渲染的html文件(`public/index.html`)

    ```html
    <!-- index.html -->
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="utf-8">
        <title>Webpack Sample</title>
    </head>

    <body>
        <div id='root'>
        </div>
        <script src="bundle.js"></script>
    </body>

    </html>
    ```

+ 一个入口文件(`src/index.js`)

    ```js
    const greeter = require('./greeting.js');
    document.querySelector("#root").appendChild(greeter());
    ```

+ 若干模块文件(`src/greeting.js`)

    ```js
    module.exports = function() {
        var greet = document.createElement('div');
        greet.textContent = "greetings!";
        return greet;
    };
    ```

为了可以让webpack正确的打包项目,同时还要为webpack写一个配置文件`webpack.config.js`:
```js
const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    }
}
```
这个配置指明了入口函数和编译后项目的输出位置以及输出的文件.
之后我们只要执行命令`./node_modules/.bin/webpack --config webpack.config.js`即可,为方便起见我们将这条命令放到`package.json`的`scripts`中.

## babel支持

本系列文章使用babel来实现js的高级语法,因此ts,或者coffeescript等不再本文讨论范围内.

babel使用`babel-loader`实现加载,但个人测试最新的`babel-loader`必须搭配`@babel/core`和`@babel/preset-env`使用,但似乎目前还有一些bug,我使用这个搭配的时候并不成功.作为替代可以使用`babel-loader@7`来强制安装支持`babel-core`和`babel-preset-env`的版本.

```shell
npm install --save-dev babel-core babel-preset-env babel-loader@7
```

同时不要忘记在package.json中和node环境下一样加上babel的配置:

```json
{
    "babel": {
        "presets": [
            [
                "env"
            ]
        ]
    },
}
```

`babel-loader`是一个加载器.

Loaders是webpack提供的核心功能之一了.通过使用不同的loader,webpack有能力调用外部的脚本或工具实现对不同格式的文件的处理.比如说分析转换scss为css或者把下一代的JS文件（ES6，ES7)转换为现代浏览器兼容的JS文件.

Loaders需要单独安装并且需要在webpack.config.js中的`modules`字段下的`rules`字段中进行配置.这是一个由对象组成的array.每个对象描述一组加载规则,包括以下几方面:

+ `test`一个用以匹配loaders所处理文件的拓展名的正则表达式(必须)
+ `use`配置使用的loader,loader描述对象可以有如下字段配置:
    + `loader`loader的名称(必须)
    + `options`对应loader项的配置项
+ `include/exclude`手动添加必须处理的文件(文件夹)或屏蔽不需要处理的文件(文件夹)(可选)
+ `query`为loaders提供额外的设置选项(可选)


修改后的webpack配置文件`webpack.config.js`如下:
```js
const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use:{
                    loader: 'babel-loader'
                },
                exclude: path.resolve(__dirname, 'node_modules'),
                include: path.resolve(__dirname, 'src')
            }
        ]
    }
}
```

在代码C2中我们修改C1中的js代码为es6写法

+ 入口文件(`src/index.js`)
    ```js
    import greeter from './greeting.js'
    document.querySelector("#root").appendChild(greeter())
    ```

+ 模块文件(`src/greeting.js`)
    
    ```js
    export default function(){
        let greet = document.createElement('div')
        greet.textContent = "greetings!"
        return greet
    }
    ```

## 为导入css

另一种资源就是css文件.我们来为项目设置下样式,新的代码在`C3-E1`中.


要加载css文件需要使用`css-loader`和`style-loader`,二者处理的任务不同.
+ `css-loader`使你能够使用类似`@import` 和`url(...)`的方法实现`require()`的功能;
+ `style-loader`将所有的计算后的样式加入页面中.

二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中.

安装加载器:

```shell
npm install --save-dev style-loader css-loader
```

修改配置文件:

```js
const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use:{
                    loader: 'babel-loader'
                },
                exclude: path.resolve(__dirname, 'node_modules'),
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    }
}
```

可以看到对同一个种文件引入多个loader,这在webpack中也是可以的

新增一个css文件`main.css`放在`src`文件夹下:

```css
html {
  box-sizing: border-box;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

h1, h2, h3, h4, h5, h6, p, ul {
  margin: 0;
  padding: 0;
}
```

我们要用这个css可以在入口js文件中使用import导入:

```js
import greeter from './greeting.js'
import './main.css'

document.querySelector("#root").appendChild(greeter())
```

### 使用stylus定义css

本节代码在C3-E2中.

就像babel之于js,我更愿意使用stylus来定义样式,这还需要安装如下依赖:

```shell
npm install --save-dev stylus stylus-loader
```

之后修改配置文件:

```js
const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use:{
                    loader: 'babel-loader'
                },
                exclude: path.resolve(__dirname, 'node_modules'),
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    },{
                         loader: "stylus-loader"
                    }
                ]
            }
        ]
    }
}
```

我们删掉`src/main.css`后新增一个stylus源码文件`main.styl`
```
html 
    box-sizing border-box
    -ms-text-size-adjust 100%
    -webkit-text-size-adjust 100%

  
*, *:before, *:after 
    box-sizing: inherit

  
body 
    margin 0
    font-family 'Helvetica Neue', Helvetica, Arial, sans-serif

  
h1, h2, h3, h4, h5, h6, p, ul 
    margin 0
    padding 0
```

然后修改入口js文件`index.js`为:

```js
import greeter from './greeting.js'
import './main.styl'
document.querySelector("#root").appendChild(greeter())
```

## 导入图片

在html中引入图片实际上就是引入一个图片的url
```html
<img src="/eg_tulip.jpg"  alt="上海鲜花港 - 郁金香" />
```
我们使用webpack将图片作为模块打包,实际上就是把这个图片的位置指出来,即

```js
import eg_tulip from "./eg_tulip.jpg"
```

要将图片作为模块加载依赖于`url-loader`和`file-loader`:

```shell
npm install --save-dev url-loader file-loader
```

+ `url-loader`用于导入图片,如果图片小与限制就会转化为base64码
+ `file-loader`用于在图片过大时从文件系统中找到文件


修改配置文件:

```js
const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: path.resolve(__dirname, 'node_modules'),
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }]
            },
            {
                test: /\.styl$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "stylus-loader"
                }]
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }]
            }
        ]
    }
}
```
上面的配置中url-loader我们设置了limit,只要图片大小小于1000字节限制时图片会自动转成`base64`码引用


我们在`greeting`模块中引入这张图片:

```js
import eg_tulip from "./eg_tulip.jpg"

export default function(){
    let greet = document.createElement('div')
    greet.textContent = "greetings!"
    let img = document.createElement("img")
    img.src = eg_tulip
    greet.appendChild(img)
    return greet
}
```

由于我们的图片有36k大,执行完成后会生成一个文件名由16进制字符串组成的jpg文件.如果我们希望图片更有可读性,可以修改配置文件中`url-loader`的部分:
```js
{
    loader: 'url-loader',
    options: {
        limit: 10000,
        name: '[path][name].[ext]?[hash:6]!./dir/file.png'
    }
}
```

### 对图片进行压缩

本节的代码在C4-E2.

我们往往希望加快前端项目的加载速度,压缩图片是最常见最简单暴力的方式,可以使用`image-webpack-loader`来压缩图片

```shell
npm install --save-dev image-webpack-loader
```

修改配置文件:

```js
const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: path.resolve(__dirname, 'node_modules'),
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }]
            },
            {
                test: /\.styl$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "stylus-loader"
                }]
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: '[path][name].[ext]?[hash:6]!./dir/file.png'
                    }
                },
                {//对图片进行压缩
                    loader: 'image-webpack-loader',
                    query: {
                        progressive: true,
                        optimizationLevel: 7,
                        interlaced: false,
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        }
                    }
                }]
            }
        ]
    }
}
```

需要注意的是`image-webpack-loader`需要放在`url-loader`之后
压缩的配置项都在`query`字段里.可以看到经过loader压缩后图片从36k压缩到了19k

## 将html模板作为组件

本节的例子为C5

上面的所有例子中我们都需要有一个html文件来加载js.那我们可以不可以将这个html文件也作为组件呢,这样我们就不再需要预先定义public文件夹了

我们可以使用`HtmlWebpackPlugin`,这是一个webpack插件,其作用是依据一个简单的`index.html`模板，生成一个自动引用你打包后的JS文件的新index.html.这在每次生成的js文件名称不同时非常有用(比如添加了hash值).

安装:
```shell
npm install --save-dev html-webpack-plugin
```

修改配置文件:

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    ...
    plugins:[
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数
        })
    ]
}
```

现在我们重新构建项目的代码结构:

+ 删除`public`文件夹
+ 在`src`文件夹下新建一个`index.tmpl.html`

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Webpack Sample Project</title>
</head>

<body>
    <div id='root'>
    </div>
</body>

</html>
```

插件(Plugins)是webpack中另一个很关键的功能,它用于拓展Webpack.插件会在整个构建过程中生效,执行相关的任务.
Loaders和Plugins常常被弄混,但是他们其实是完全不同的东西.可以这么来说,loaders是在打包构建过程中用来处理源文件的(JSX，Scss，Less..),一次处理一个,插件并不直接操作单个文件,它直接对整个构建过程其作用.

Webpack有很多内置插件,同时也有很多第三方插件,可以让我们完成更加丰富的功能.

使用插件的方法如上面的例子,我们需要通过npm安装它,然后要做的就是在webpack配置中的`plugins`关键字部分添加该插件的一个实例(plugins是一个数组)


## 为前端项目配置调试工具

本部分代码在C6.

上面的内容其实已经可以直接使用了,但以上的配置并不方便调试.为了方便开发时进行调试,我们可以再多做下面几件事

### 启动调试用的静态服务器和热加载

调试用静态服务器依赖`webpack-dev-server`这个node模块

安装:
```shell
npm install --save-dev webpack-dev-server
```
热加载模块其实是webpack自带的功能,我们只需要修改配置文件即可,下面是修改好后的配置文件:

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    ...
    devtool: 'eval-source-map',
    devServer: {
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true,
        hot: true
    },
    ...
    plugins: [
        ...,
        new webpack.HotModuleReplacementPlugin() //热加载插件
    ]
}
```

这边我们可以看到新增了两个一级字段

+ `devtool`,这个用于产生`sourcemap`,什么是`sourcemap`可以看[阮一峰的科普文章](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html).

    在webpack的配置文件中配置`sourcemap`,需要配置`devtool`字段,它有以下四种不同的配置选项,各具优缺点.描述如下:

devtool选项                  | 配置结果
-----------------------------|-------------------------------------------------------------------------------------------------------------------------------------
source-map                   | 在一个单独的文件中产生一个完整且功能完全的文件.这个文件具有最好的sourcemap,但是它会减慢打包速度;
cheap-module-source-map      | 在一个单独的文件中生成一个不带列映射的map,不带列映射提高了打包速度,但是也使得浏览器开发者工具只能对应到具体的行,不能对应到具体的列(符号),会对调试造成不便;
eval-source-map              | 使用eval打包源文件模块,在同一个文件中生成干净的完整的sourcemap.这个选项可以在不影响构建速度的前提下生成完整的sourcemap,但是对打包后输出的JS文件的执行具有性能和安全的隐患.在开发阶段这是一个非常好的选项,在生产阶段则一定不要启用这个选项;
cheap-module-eval-source-map | 这是在打包文件时最快的生成sourcemap的方法,生成的sourcemap会和打包后的JavaScript文件同行显示,没有列映射,和eval-source-map选项具有相似的缺点


    
+ `devServer`,这个字段可以用于配置开发服务器包括:
  + `contentBase`默认webpack-dev-server会为根文件夹提供本地服务器,如果想为另外一个目录下的文件提供本地服务器,应该在这里设置其所在目录
  + `port`设置默认监听端口,如果省略默认为`8080`
  + `inline`设置为true时,当服务器指定文件夹中文件改变时会自动刷新页面
  + `historyApiFallback`如果设置为true时所有的跳转将指向`index.html`,这个选项在开发单页应用时非常有用,它依赖于HTML5 history API.
  + `hot`,当设置为true时启动热更新,即当源文件有修改时,就会自动编译自动刷新页面
  + `open`,是否启动默认浏览器

要使用这个服务器,我们可以使用命令`./node_modules/.bin/webpack-dev-server --open`

为了方便起见,我们在`package.json`的scripts中将其配置为命令`"start": "./node_modules/.bin/webpack-dev-server --open"`,这种方式可以使用命令`npm start`启动这个服务器

### 缓存

缓存无处不在,使用缓存的最好方法是保证你的文件名和文件内容是匹配的(内容改变,名称相应改变)

webpack可以把一个哈希值添加到打包的文件名中,使用方法如下添加特殊的字符串混合体([name],[id] and [hash])到输出文件名前(实际上我们已经在图片部分使用过了).

```js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
..
    output: {
        path: __dirname + "/build",
        filename: "bundle-[hash].js"
    },
   ...
};
```

### 清除上次编译后的残余文件

调试阶段不可避免的会反反复复的编译,如果使用了缓存,那必然会有越来越多的无用文件残留下来,可以使用插件`clean-webpack-plugin`进行清除操作.

安装:
```shell
npm install --save-dev clean-webpack-plugin
```

修改配置文件:

```js
...
const CleanWebpackPlugin = require("clean-webpack-plugin")

module.exports = {
  ...
  plugins: [
    ...// 这里是之前配置的其它各种插件
    new CleanWebpackPlugin('build/*.*', {
      root: __dirname,
      verbose: true,
      dry: false
  })
  ]
}
```

## 正式环境使用

本部分代码在C7.


上面的代码已经可以满足大部分简单的前端任务了,但现实是复杂的往往我们需要在不同的部署环境中使用不同的配置,并且也要考虑代码的安全性问题和性能问题.


### 优化代码

本部分代码在C7-E1 

webpack提供了一些在发布阶段非常有用的优化插件,它们大多来自于webpack社区,可以通过npm安装,通过以下插件可以完成产品发布阶段所需的功能

+ `OccurenceOrderPlugin`:为组件分配ID,通过这个插件webpack可以分析和优先考虑使用最多的模块,并为它们分配最小的ID
+ `uglifyjs-webpack-plugin`压缩JS代码
+ `ExtractTextPlugin`分离CSS和JS文件.

    不用这个插件的话我们会发现css描述的样式实际上是在js文件中包含的,这个插件的作用是讲包含在js文件中的样式抽取出来放到一个css文件中.
    这个作用听起来是脱裤子放屁,但实际是有用的,实际开发中css源文件未必只有一个,这个插件可以将分散在各个模块中的样式抽取到一起,同时由于css被抽出了,js文件变小了,
    这样可以避免因为js过大影响前端性能的问题.

    注意目前这个插件对webpack4支持不好,可以使用`extract-text-webpack-plugin@next`


`OccurenceOrder`是内置插件,你需要做的只是安装其它非内置插件.


```shell
npm install --save-dev extract-text-webpack-plugin@next uglifyjs-webpack-plugin
```

修改配置文件:

```js
...
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    ...
    module: {
        rules: [
            ...
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader"]
                })
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "stylus-loader"]
                })
            }
            ...
        ]
    },
    plugins: [
        ...
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin("style.css")
    ],
    optimization: {
        minimizer: [
            new UglifyJSPlugin(),
        ]
    }
}
```

需要注意的是:

+ `UglifyJSPlugin`插件不放在`plugins`字段中,而在`optimization->minimizer`字段中
+ `ExtractTextPlugin`除了要在`plugins`字段中创建外,还需要在定义css规则的loader部分做处理,其形式是:
```js
{
    test: /\.styl$/,
    use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", "stylus-loader"]
    })
}
```

### 区分环境

环境其实可以分为两块:

+ 编译环境

    比如说我们在生产环境下需要压缩图片,但开发环境不用,这样更好调试,这样就区分出了两个环境的编译环境.
+ 源码环境

    比如我们的测试环境下前端接的后端api的host在localhost下,而生产环境下api是的host是一串ip地址,这种时候在源码中我们就需要区分不同的环境.

要区分环境我们需要使用工具`webpack-merge`,他可以用于merge两个Object以实现类似继承的功能.


这个部分的例子我们的目标是让不同环境的源码编译出来后`greeting`后面接的字不同,比如dev环境的源码编译出来后就是`greeting dev!`


#### 编译环境隔离

本部分的代码在C7-E2.
  
在最开始的时候我们就看到webpack需要指定一个config因此针对不同环境我们可以配置不同配置文件.

要实现不同配置文件间的聚合我们需要安装`webpack-merge`.

安装:
```shell
npm install --save-dev webpack-merge
```

我们新建一个文件夹`env`在其中写上三个环境的webpack配置文件,为了代码不重复,我们定义一个基对象

+ `webpack.config.base.js`

```js
const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require("clean-webpack-plugin")

module.exports = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'bundle-[hash].js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../build'), //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true,
        hot: true
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: path.resolve(__dirname, '../node_modules'),
                include: path.resolve(__dirname, '../src')
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)$/i,
                use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: '[path][name].[ext]?[hash:6]!./dir/file.png'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            progressive: true,
                            optimizationLevel: 7,
                            interlaced: false,
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.tmpl.html') //new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(), //热加载插件
        new CleanWebpackPlugin('build/*.*', {
            root: path.resolve(__dirname, ".."),
            verbose: true,
            dry: false
        })
    ]
}
```

这个对象是各个环境编译环境的基础,各个环境就是在其基础上进行添加修改,注意由于配置文件位置变了,需要修改所有与位置相关的部分.

+ `webpack.config.dev.js`

开发环境的配置文件
```js
const merge = require('webpack-merge')
const base = require('./webpack.config.base.js')

module.exports = merge(base,{
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }]
            },
            {
                test: /\.styl$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "stylus-loader"
                }]
            }
        ]
    }
})
```
开发环境我们并不需要将js和css分离,因此只用使用最简单的配置方式.

+ `webpack.config.test.js`

测试环境,通常编译设置和生产环境的大部分是一样的,这样才好做基准测试嘛.但也要便于调试

```js
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const base = require('./webpack.config.base.js')

module.exports = merge(base,{
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader"]
                })
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "stylus-loader"]
                })
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin("style.css")
    ],
    optimization: {
        minimizer: [
            new UglifyJSPlugin(),
        ]
    }
})
```

+ `webpack.config.prod.js`

生产环境下我们不需要`sourcemap`,因此就不设置devtool了

```js
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const base = require('./webpack.config.base.js')

module.exports = merge(base,{
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader"]
                })
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "stylus-loader"]
                })
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin("style.css")
    ],
    optimization: {
        minimizer: [
            new UglifyJSPlugin(),
        ]
    }
})
```

注意merge并不会覆盖操作,一旦base中定义的在后面一个对象中也有定义,那就会引起冲突报错.

#### 源码环境隔离

本部分的代码在C7-E3.

在`env/conf`文件夹下我们创建3个json文件来设置不同环境下源码中使用的配置量

+ `env/conf/dev.json`

```json
{
    "env":"dev"
}
```

+ `env/conf/test.json`

```json
{
    "env":"test"
}
```

+ `env/conf/prod.json`

```json
{
    "env":"prod"
}
```

为了可以使用这些配置项中的参数,我们需要修改我们的源码:

+ `src/conf.js`

```js
const NODE_ENV = process.env.NODE_ENV

export default NODE_ENV
```
这个模块用于给上面定义的配置对象一个统一的导入入口.

+ `src/greeting.js`

```js
import eg_tulip from "./eg_tulip.jpg"
import conf from "./conf.js"

export default function () {
    let greet = document.createElement('div')
    greet.textContent = `greeting ${conf.env}!`
    let img = document.createElement("img")
    img.src = eg_tulip
    greet.appendChild(img)
    return greet
}
```
我们将这个模块的文字内容配置化.使用上面定义的`conf.js`定义的对象中的字段来构造输出的内容


如何将这两边联系起来呢?我们需要修改配置文件,引入插件`webpack.DefinePlugin`:

+ `webpack.config.dev.js`

开发环境的配置文件
```js
...
const env = require("./conf/dev.json")

module.exports = merge(base,{
    ...
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(env)
            }
        })
    ]
})
```


+ `webpack.config.test.js`

测试环境,通常编译设置和生产环境的大部分是一样的,这样才好做基准测试嘛.但也要便于调试

```js
...
const env = require("./conf/test.json")

module.exports = merge(base,{
    ...
    plugins: [
        ...
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(env)
            }
        })
    ]
})
```

+ `webpack.config.prod.js`

生产环境下我们不需要`sourcemap`,因此就不设置devtool了

```js
...
const env = require("./conf/prod.json")

module.exports = merge(base,{
    ...
    plugins: [
        ...
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(env)
            }
        })
    ]
})
```

### 收尾工作

最后我们修改下`package.json`中的`scripts`字段,为不同的执行命令区分环境:

```json
"scripts": {
    "serv:dev": "./node_modules/.bin/webpack-dev-server --open --config env/webpack.config.dev.js",
    "serv:test": "./node_modules/.bin/webpack-dev-server --open --config env/webpack.config.test.js",
    "serv:prod": "./node_modules/.bin/webpack-dev-server --open --config env/webpack.config.prod.js",
    "build:dev": "./node_modules/.bin/webpack --config env/webpack.config.dev.js",
    "build:test": "./node_modules/.bin/webpack --config env/webpack.config.test.js",
    "build:prod": "./node_modules/.bin/webpack --config env/webpack.config.prod.js"
}
```
以上就是一个相对完整的webpack环境