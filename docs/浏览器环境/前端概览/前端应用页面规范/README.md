# 前端应用页面规范

本部分介绍浏览器用于展示和交互的接口边界.

网页浏览器恐怕是现在最成熟的客户端技术了,因此诞生了不少基于前端技术的客户端实现如`electron`.
这个部分熟练的话完全可以在这些客户端上复用这部分的技术.

前端页面使用html文件作为创建页面的资源,使用这些资源构造文档对象即DOM用于展示和提供交互.

## HTML和DOM

html即超文本标记语言是web技术中相当重要的一个部分,是前端技术的基础,他的语法接近xml,其作用就是让所有浏览器可以以统一的方法解析网站请求得来的网页数据.另一方面也可以说它规定了http服务中功能的范围.

html协议也定义了浏览器中处理html文本的统一方法,通过使用javascript调用相应的方法接口,可以对特定类型的元素渲染过程进行动态定义.

HTML语法基本是XML的子集,它本身就是一个描述树状结构的纯文本,而这个被描述的树状结构就是DOM(Document Object Model),树的每个分支的终点都是一个节点(node),每个节点都包含着对象(objects).这个树状结构中的任意一个分叉(包括根)可以被称作元素(element).节点是元素但元素不一定是节点.

元素由3部分组成:

+ 标签

    用于表示元素开始位置和结束位置的符号,形如`<div>...</div>`,标签有两种,一种用于申明,通常没有结束符,它也不构成元素.另一种带结束符,总是成对出现
+ 属性
    在起始标签中定义的东西,通常是描述这个元素的一些基础信息用,形如`<div class="test">...</div>`

+ 内容
    被标签包裹的部分被称为内容,内容可以是注释,文本,或者子元素


同时不同标签元素在html规范中都规定好了其合法的属性,子元素和可以用js调用的方法.这部分知识可以查看[mozilla上的html文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML)和[DOM及API文档](https://developer.mozilla.org/zh-CN/docs/Web/API)查看.

## html的基本结构

html在语法上接近xml(是xml的子集),一个常见的html文本如下:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>测试</title>
        <link href="style.css" rel="stylesheet" type="text/css" />
        <script src="index.js" async="async"></script>
    </head>
    <body>
    <main id="root">
        <header>
            <h1>我的第一个标题</h1>
            <p>我的第一个段落。</p>
        </header>
        <!-- 注释 -->
    </main>
    
    </body>
</html>
```

一个典型的html文件有如下部分:
+ 最开始使用标签`<!DOCTYPE html>`申明文件为html格式
+ `html`标签作为所有内容的根
+ `head`标签中定义这个DOM的元信息,包括使用什么编码,DOM标题是什么,使用的css,js文件位置等
+ `body`标签中定义这个DOM的主体

注意,有的地方会认为`script`应该放在`body`元素的末尾,这在html5中不是必须的,只要申明`script`属性为`async="async"`效果就是一样.个人倾向于将其放在`head`中,因为脚本文件位置本来就是元信息.

本文没有考虑一些过时浏览器的支持问题,在我看来也没有必要考虑,因为过时的东西就该淘汰.如果一直迁就向下兼容,用户是没有动力更新的.这不利于技术的发展.
本文也只使用了mac下的`chrome 71.0.3578.98`版本进行代码测试.并不保证所有浏览器都效果一致

## 全局元素属性

全局属性可用于任何HTML元素(有些有适用范围),下表是到html5为止所有的全局属性

| 属性              | 描述                                                                        | 语法                                     | 限制                                                                                                                  | 说明                                                                                                                       |
| ----------------- | --------------------------------------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `id`              | 规定元素的唯一id                                                            | `<element id="value">`                   | 同一个DOM中id必须唯一                                                                                                 | 常见的用法是通过css或者js定位到指定id的元素后进行进一步的处理                                                              |
| `class`           | 规定元素的一个或多个类名(引用样式表中的类).                                 | `<element class="value">`                | 在`base`,`head`,`html`,`meta`,`param`,`script`,`style`以及`title`中无效;同一元素可以有多个class;class值不能以数字开头 | 常见的用法是css或者js通过过滤器定位到相同的class后进行统一处理                                                             |
| `title`           | 规定有关元素的额外信息,这些信息通常会在鼠标移到元素上时显示一段工具提示文本 | `<element title="value">`                | ---                                                                                                                   | `title`属性常与`form`以及`a`元素一同使用,以提供关于输入格式和链接目标的信息.同时它也是`abbr`和 `acronym`元素的必需属性     |
| `dir`             | 规定元素中内容的文本方向                                                    | `<element dir="ltr|rtl">`                | 在`base`, `br`, `frame`, `frameset`, `hr`, `iframe`, `param` 以及`script`中无效                                       | `ltr`为默认值,即从左向右的文本方向;rtl为从右向左的文本方向                                                                 |
| `data-*`          | 用于存储页面或应用程序的私有定制数据                                        | `<element data-*="somevalue">`           | ---                                                                                                                   | `*`可以使是用户自己定义的任何内容,[常用于让js获取后创建动态效果](http://www.w3school.com.cn/tiy/t.asp?f=html5_global_data) |
| `style`           | 规定元素的行内CSS样式                                                       | `<element style="value">`                | ---                                                                                                                   | 不建议使用这种方式定义样式,样式还是用css文件定义(外部样式)更加靠谱                                                         |
| `hidden`          | 规定元素仍未或不再相关                                                      | `<element hidden>`                       | ---                                                                                                                   | `hidden`属性是布尔属性,如果设置该属性,则有这个属性的元素不会被渲染出来                                                     |
| `tabindex`        | 规定元素的tab键次序                                                         | `<element tabindex="number">`            | safari浏览器不支持该属性,同时只有`a`,`area`,`button`,`input`,`object`,`select`以及`textarea`支持`tabindex`属性        | 这个属性通常用于导航栏                                                                                                     |
| `accesskey`       | 规定激活元素的快捷键                                                        | `<element accesskey="character">`        | Opera浏览器不支持该属性,同时只有`a`,`area`,`button`,`input`,`label`,`legend`和`textarea`                              |
| `lang`            | 规定元素内容的语言                                                          | `<element lang="language_code">`         | 在`base`,`br`,`frame`,`frameset`,`hr`,`iframe`,`param`以及`script`中无效                                              | 这个标签并没有什么特殊效果,只是利于seo.                                                                                    |
| `translate`       | 规定是否应该翻译元素内容                                                    | `<element translate="yes|no">`           | 目前没有浏览器支持                                                                                                    | ---                                                                                                                        |
| `spellcheck`      | 规定是否对元素进行拼写和语法检查                                            | `<element spellcheck="true|false">`      | 支持的该功能的元素包括:`input`元素中的文本值(非密码);`textarea`元素中的文本,有`contenteditable`属性的元素中的文本     | ---                                                                                                                        |
| `contenteditable` | 规定元素内容是否可编辑                                                      | `<element contenteditable="true|false">` | ---                                                                                                                   | 如果元素未设置`contenteditable`属性,那么元素会从其父元素继承该属性                                                         |
| `contextmenu`     | 规定元素的上下文菜单.上下文菜单在用户点击元素时显示                         | `<element contextmenu="menu_id">`        | 目前只有firefox支持                                                                                                   | ---                                                                                                                        |
| `draggable`       | 规定元素是否可拖动.                                                         | `<element draggable="true|false|auto">`  | ---                                                                                                                   | 链接和图像默认是可拖动的,`draggable`属性常用在拖放操作中,值为`auto`意味使用浏览器默认行为                                  |
| `dropzone`        | 规定在拖动被拖动数据时是否进行复制,移动或链接.                              | `<element draggable="true|false|auto">`  | ---                                                                                                                   | 可以看[w3c上的例子](http://www.w3school.com.cn/tags/att_global_draggable.asp)                                              |

## 元素样式与css

虽然浏览器会给每个元素一个默认的样式,但显然默认样式并不能满足我们的需求,我们需要告诉浏览器如何渲染我们前端项目中的各个元素,这就是css的作用了.
[目前支持的css属性可以在mozilla上找到](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)我们并不需要记这些,会查表找到要用的即可.

### 样式引入

css有3种样式引入方式:

+ 在html中在要渲染的元素的`style`属性中定义(内联样式 Inline Style)
+ 在html中在`style`元素中定义(内部样式 Internal style sheet)
+ 在css文件中定义,使用`link`元素引入该css文件.(外部样式 External style sheet)


### 样式加载顺序

css的加载顺序如下:

`(外部样式)External style sheet<(内部样式)Internal style sheet<(内联样式)Inline style `
有种特殊情况,就是如果外部样式放在内部样式的后面,则外部样式将覆盖内部样式.

### 选择器优先级

选择器可以使用id,标签,或者类来进行选择,因此也会出现一个元素被多个选择器选中的情况,那么浏览器会以什么顺序来加载css呢?

浏览器中的渲染优先级通常是这样:

`内联样式表的权值>ID 选择器的权值>Class 类选择器的权值> HTML 标签选择器的权值`

另外可以在属性最后添加!important，申明最大优先级

### css基本语法

css是声明式语法,其的基本语法结构如下:

```css
selector {
    declaration1; 
    declaration2; 
    ... 
    declarationN 
}
```
可以看到其基本组成是选择器和声明语句,一个选择器下的申明语句使用大括号包裹,各自使用`;`分隔

### 选择器

选择器可以有如下几种:
+ 特定标签的元素,使用标签名直接选择,如`p`
+ 特定属性的元素,如果希望找到特定标签有特定属性的元素,可以使用`标签名`+`[`+`属性名`+`]`的形式,如`p[title]`,如果不关心标签是什么,可以使用通配符`*`代替`标签名`或者直接不写通配符,如`[title]`;除了可以查找属性,还可以查找带特定值得属性,如`[title=hello]`表示查找title属性为hello的元素,具体的语法如下:

| 选择器             | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| `attribute`        | 用于选取带有指定属性的元素                                   |
| `attribute=value`  | 用于选取带有指定属性和值的元素。                             |
| `attribute~=value` | 用于选取属性值中包含指定词汇的元素。                         |
| `attribute I= value` | 用于选取带有以指定值开头的属性值的元素，该值必须是整个单词。 |
| `attribute^=value` | 匹配属性值以指定值开头的每个元素。                           |
| `attribute$=value` | 匹配属性值以指定值结尾的每个元素。                           |
| `attribute*=value` | 匹配属性值中包含指定值的每个元素。                           |
+ 特定`id`的元素,使用`#`+`id的值`直接选择,如`#id1`
+ 特定`class`属性的元素,使用`.`+`class的值`直接选择,如`.class1`,如果要选择特定标签下相同的类,可以使用`标签名.class值`的形式,如`p.class1`;类选择可以串联,我们知道一个元素可以有多个类,如果要筛选满足特定类组合的元素,可以如`.class1.class2`
+ 伪类伪元素,使用`:`这是固定的几种特殊类或者元素,属于特殊用法,可以看w3c上的[伪类](http://www.w3school.com.cn/css/css_pseudo_classes.asp)和[伪元素](http://www.w3school.com.cn/css/css_pseudo_elements.asp)介绍


除了这种特定的选择器外,还可以指定`子元素`,`相邻元素`,`后代元素`用于筛选,其语法是:
+ 相邻元素指--紧接在另一元素后的元素,且二者有相同父元素.使用`+`号,如`h1 + p`
+ 子元素指--指在父元素下一级的元素,使用`>`号,如`h1 > strong`
+ 后代元素指--父元素下任意一级的元素,使用空格` `,如`h1 em`

这些选择器的规则可以自由组合,比如`h1 .class1`

同时选择器可以分组以合并重复的申明,比如
```css
h1 {color:blue;}
h2 {color:blue;}
h3 {color:blue;}
h4 {color:blue;}
h5 {color:blue;}
h6 {color:blue;}
```
可以写作
```css
h1, h2, h3, h4, h5, h6 {color:blue;}
```
在选择器组中不同的选择器使用`,`隔开

### 声明语句

每条声明由一个属性和一个值组成
属性(property)是我们希望设置的样式属性(style attribute),每个属性有一个值.属性和值被冒号分开.

```css
selector {property: value}
```

## 使用javascript操作dom元素

前文说过js是浏览器端通用的脚本语言,用于浏览器的js和node.js中的虽然语法是一致的,但环境并不一致,js要操作的是DOM对象,因此需要调用浏览器提供的相关接口,明显这在node中是不存在的.全部的接口可以在[这里看到](https://developer.mozilla.org/zh-CN/docs/Web/API).一个更通用的版本是[w3c的文档](http://www.w3school.com.cn/jsref/index.asp)也可以作为参考

比较常用的是如下4个全局对象:

+ [`Window`](http://www.w3school.com.cn/jsref/dom_obj_window.asp)

    一个包含DOM文档的窗口,其`document`属性指向窗口中载入的DOM文档.使用`document.defaultView`或者`Window.window`属性可以获取指定文档所在窗口.
  
    全局变量`window`为当前文档所在窗口,这个对象通常包含着一些浏览器操作,比如计时这些.

+ [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)
    
    表示任何在浏览器中已经加载好的网页,并作为一个入口去操作网页内容(也就是DOM tree).DOM tree包括像`body`,`table`这样的还有其他的元素.它提供了全局操作document的功能,像获取网页的URL和在document里创建一个新的元素.

    全局变量`document`则表示当前的网页DOM,它通常用于构造/改造当前的DOM结构或者元素属性.常见的操作包括:

| 方法接口                                           | 说明                                                            |
| -------------------------------------------------- | --------------------------------------------------------------- |
| `createElement()`                                  | 创建元素节点。                                                  |
| `createTextNode()`                                 | 创建文本节点。                                                  |
| `document.importNode(node:Node object, deep:bool)` | 在dom中克隆一个外部元素进去                                     |
| `appendChild()`                                    | 把新的子节点添加到指定节点。                                    |
| `insertBefore(newItem,existingItem)`               | 在指定的子节点前面插入新的子节点。                              |
| `getElementById()`                                 | 返回带有指定 ID 的元素。                                        |
| `getElementsByTagName()`                           | 返回包含带有指定标签名称的所有元素的节点列表（集合/节点数组）。 |
| `getElementsByClassName()`                         | 返回包含带有指定类名的所有元素的节点列表。                      |
| `removeChild()`                                    | 删除子节点。                                                    |
| `replaceChild()`                                   | 替换子节点。                                                    |
| `createAttribute()`                                | 创建属性。                                                      |
| `getAttribute()`                                   | 返回指定的属性值。                                              |
| `setAttribute()`                                   | 把指定属性设置或修改为指定的值                                  |

常见的属性包括:

| 属性          | 说明                     |
| ------------- | ------------------------ |
| `innerHTML`   | 节点（元素）的html文本值 |
| `parentNode`  | 节点（元素）的父节点     |
| `childNodes`  | 节点（元素）的子节点     |
| `attributes`  | 节点（元素）的属性节点   |
| `textContent` | 节点的 (元素)的文本内容  |

除了方法接口和属性,还有就是元素的事件,常见的有:
    
| 事件          | 说明                                 |
| ------------- | ------------------------------------ |
| `onchange`    | 域的内容被改变。                     |
| `onclick`     | 当用户点击某个对象时调用的事件句柄。 |
| `ondblclick`  | 当用户双击某个对象时调用的事件句柄。 |
| `onerror`     | 在加载文档或图像时发生错误。         |
| `onfocus`     | 元素获得焦点。                       |
| `onkeydown`   | 某个键盘按键被按下。                 |
| `onkeypress`  | 某个键盘按键被按下并松开。           |
| `onkeyup`     | 某个键盘按键被松开。                 |
| `onload`      | 一张页面或一幅图像完成加载。         |
| `onmousedown` | 鼠标按钮被按下。                     |
| `onmousemove` | 鼠标被移动。                         |
| `onmouseout`  | 鼠标从某元素移开。                   |
| `onmouseover` | 鼠标移到某元素之上。                 |
| `onmouseup`   | 鼠标按键被松开。                     |
| `onselect`    | 文本被选中。                         |
| `onsubmit`    | 确认按钮被点击。                     |
| `onunload`    | 用户退出页面。                       |

其余的事件可以在[w3c的相关文档中找到](http://www.w3school.com.cn/jsref/dom_obj_event.asp)



本部分包括:

1. 元数据获取
2. 语义化标签与页面布局
3. 模板标签
4. 交互事件
<!-- 5. 影音接口
6. 作图接口
7. 浏览器history -->