# JavaScript API

stylus本身是一个js模块,可以在node和浏览器环境下被导入执行.
require模块,用给定的Stylus代码字符串调用`render()`,以及(可选的)optional对象.
传递`filename`参数可以利用Stylus框架提供更好的错误报告,

```js
import stylus from 'stylus'

stylus.render(str, { filename: 'nesting.css' }, function(err, css){
  if (err) throw err;
  console.log(css);
});
```

我们可以用更渐进的方式实现做一样的事:

```js
import stylus from 'stylus'

stylus(str)
  .set('filename', 'nesting.css')
  .render(function(err, css){
    // logic
  });

```

## `.set(setting, value)`

应用诸如filename的设置或导入paths:

```js
stylus(str).set('filename', __dirname + '/test.styl')
 .set('paths', [__dirname, __dirname + '/mixins'])

```

## `.include(path)`

渐进替换`.set('paths',...)`的就是`.include()`.当其他Stylus库(已暴露路径)暴露的时候,这个是理想的选择.

```js
stylus(str)
  .include(require('nib').path)
  .include(process.env.HOME + '/mixins')
  .render(...)
```

## `.import(path)`

推迟给定path导入直到计算被执行.下面这个例子基本上跟在Stylus片段中执行`@import 'mixins/vendor'`一样:

```js
import stylus from 'stylus'
import fs from 'fs'

let str = fs.readFileSync(__dirname + '/test.styl', 'utf8')

stylus(str)
  .set('filename', __dirname + '/test.styl')
  .import('mixins/vendor')
  .render(function(err, css){
  if (err) throw err;
  console.log(css);
});
```

## `.define(name, node)`

通过传递一个Node,我们可以定义一个全局变量.当库(该库依赖于其它库可用性)里面暴露某些条件特征的时候,这个就很有用.例如Nib扩展库条件支持`node-canvas`,提供图片生成.
但这并不是一直可用的，因此Nib可以定义：

```js
stylus(str).define('has-canvas', stylus.nodes.false);
 .define('some-setting', new stylus.nodes.String('some value'));

```

如果可能,Stylus也会转换JavaScript值为Stylus值.

```js
stylus(str).define('string', 'some string')
 .define('number', 15.5)
 .define('some-bool', true)
 .define('list', [1,2,3])
 .define('list', [1,2,[3,4,[5,6]]])
 .define('list', { foo: 'bar', bar: 'baz' })
 .define('families', ['Helvetica Neue', 'Helvetica', 'sans-serif'])

```

下面是一些规则应用在js函数返回值上:

```js
stylus(str).define('get-list', function(){
  return ['foo', 'bar', 'baz'];
})
```

`.define(name, fn)`该方法允许你为Stylus提供JavaScript定义的函数.当有一些事情无法用Stylus完成的时候就在JavaScript中定义它.
下面这个例子我们定义了4个函数:`add()`, `sub()`, `image-width()`,`image-height()`. 这些函数必须返回一个Node.通过`stylus.nodes`该构造以及其它nodes都可以.

```js
import stylus from 'stylus'
import fs from 'fs'
let nodes = stylus.nodes
let utils = stylus.utils


function add(a, b) {
  return a.operate('+', b);
}

function sub(a, b) {
  return a.operate('-', b);
}

function imageDimensions(img) {
  // 宣告 node (img) 是一个 String 节点,
  // 为错误报告传递参数名
  utils.assertType(img, 'string', 'img');
  let path = img.val;

  // 得到尺寸有必要取得字节数
  // 如果这是真的，你会每种格式都处理下，
  // 而不是读取整个图片 :)
  let data = fs.readFileSync(__dirname + '/' + path);

  // GIF
  // 当然，你可以支持更多 :)
  if ('GIF' == data.slice(0, 3).toString()) {
    let w = data.slice(6, 8)
      , h = data.slice(8, 10);
    w = w[1] << 8 | w[0];
    h = h[1] << 8 | h[0];
  }

  return [w, h];
}

function imageWidth(img) {
  return new nodes.Unit(imageDimensions(img)[0]);
}

function imageHeight(img) {
  return new nodes.Unit(imageDimensions(img)[1]);
}

stylus(str)
  .set('filename', 'js-functions.styl')
  .define('add', add)
  .define('sub', sub)
  .define('image-width', imageWidth)
  .define('image-height', imageHeight)
  .render(function(err, css){
    if (err) throw err;
    console.log(css);
  });
```
