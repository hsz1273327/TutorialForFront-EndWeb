# 层叠样式表CSS

css是专门用于描述页面展示元素样式的一种声明文件格式.各个平台几乎都会提供完整的或者部分的css支持.当然最完善的肯定是浏览器平台了.

## 语法

css的语法简单到没什么可讲的:

```css
/* 这是一条单行注释 */
选择器 {
    属性: 属性的值;
}
```

### 选择器

选择器是基础选择器以及他们间组合的合称.基础选择器有如下几种

+ `标签选择器`,直接是标签名,表示这种标签都设置成指定的样式

    ```CSS
    p {
        color: red;
    }
    ```

+ `id选择器`,用`#`符号直接指定一个id,设置这个指定id的元素有特定样式.

    ```CSS
    #para1 {
        color: red;
    }
    ```

+ `类选择器`,用`.`符号直接指定一个类`class`,设置这个指定class的元素有特定样式.

    ```CSS
    .c1 {
        color: red;
    }
    ```

+ `全选选择器`,直接`*`,表示所有元素都有指定样式

    ```css
    * {
        text-align: center;
        color: blue;
    }
    ```

这些基础选择器之间可以有如下组合:

+ `多类选择器`如果将几个类选择器串接在一起,则表示选中目标要同时满足所有这几个类选择器,也就是与关系

    ```css
    .important.urgent {
        color: red;
    }
    ```

+ `标签类筛选选择器`,指定特定标签中属于指定类的元素为特定样式

    ```css
    h.c1 {
        color: red;
    }
    ```

+ `相邻兄弟选择器`,选中紧接在另一指定元素后的指定元素,且二者有相同父元素,其表示方式为`同一父元素中先出现的元素 + 同一父元素中要选中的元素`.注意并不是选中两个,而是选中后一个

    ```css
    h1 + p {
        margin-top:50px;
    }
    ```

    这个例子中被选中的是`p`

+ `子元素选择器`,选中指定元素中的指定下一级子元素.其表示方式为`父元素 > 下一级子元素`.需要注意

    ```css
    h1 > strong {
        color:red;
    }
    ```

+ `后代选择器`,指定标签元素中特定子元素的样式,顺序从左到右表示父级到子级,其表示方式为`父元素 任意一级子元素`分隔

    ```css
    h1 em {color:red;}
    ```

+ `并列选择器`,多个选择器间使用`,`分隔,表示这些选择器选中的元素都使用指定的样式.这种又叫选择器分组

    ```css
    h1, h2, p, .c1  {
        text-align: center;
        color: red;
    }
    ```

利用这些组合我们可以构造出非常复杂的搜索条件.

### 命名规范

css是没有命名空间的,因此为了避免重复,通常css中命名遵循[BEM命名法](https://bemcss.com/).BEM的命名规矩很容易记:`block-name__element-name--modifier-name`,也就是`模块名 + 元素名 + 修饰器名`.

### 属性的值类型

属性的值根据属性不同一般有如下几种情况:

+ 数值,通常用来定量描述,长度,距离,粗度,角度,直径等.这些值可能带有单位,也可能不带任何单位.比较常见的单位包括:

    + `px`即css像素.
    + `em`一般仅用在`font-size`上
    + `deg`一般用在旋转上,表示*顺时针*旋转的角度(0~360)
    + `rad`一般也用在旋转上,表示*顺时针*旋转的弧度
    + `s`/`ms`,即秒和毫秒,一般用在渐变,动画相关的属性上比如`transition-duration`,`transition-delay`,`animation-duration`,`animation-delay`属性
    + `Hz`/`kHz`,即赫兹,千赫,一般用在音频语音相关的属性上,比如`pitch`

+ 百分比,一般也用在长度,距离等场景,但百分比是个相对概念,它的核心是确定参照物.常见的参照物是
    + 如果元素为静态(static)或相对定位(relative),参照物一般是其父容器
    + 如果元素为绝对定位(absolute),参照物应该是离它最近的position为`absolute`,`relative`或`fixed`的祖先元素
    + 如果元素为固定定位(fixed),参照物就是视窗(viewport)
    + 文本中的百分比
        + `font-size`是基于父元素中`font-size`进行计算.
        + `text-align`和`padding`有点类似,和书写模式有一定的关系
            + 如果书写模式是水平的,则相对于`width`进行计算
            + 如果是垂直的，则相对于`height`进行计算
        + `line-height`则基于`font-size`进行计算
        + `vertical-algin`则基于`line-height`计算
    + 边框和圆角中的百分比
        + `border-radius`中使用百分比单位
            + 水平方向的半径是相对于元素width计算
            + 垂直方向的半径是相对于元素高度进行计算
        + 对于`border-image-width`来说参照物是图像边框区域的大小(包含`border`和`padding`)
    + 背景属性中的百分比
        + `background-size`是基于`background-origin`区域的大小进行计算,可以对背景图像进行缩放处理.
        + `background-position`中的百分比使用`(容器尺寸-背景图像尺寸)* 百分比值`公式计算
    + 变换中的百分比
        + `translate`根据轴来确定参照物
            + `translateX()`的百分比相对于容器的`width`计算
            + `translateY()`的百分比相对于容器的`height`计算
        + `transform-origin`中横坐标(x)相对于容器的`width`计算;纵坐标(y)相对于容器的`height`计算

+ 坐标位置,通常是枚举值,比如`top`,`right`,`bottom`和`left`

+ 颜色,通常就是rgba颜色了,一般是`#ffffff`的形式

+ 内置函数,一般用于指定背景图片或背景图片的渐变,比如`linear-gradient()`,`image-set()`

## 属性范围

css的属性有着非常高的通用性,一般平台都会遵循其标准做实现.一些不能完全支持的也是搞它的子集.目前css的最新标准为css3,具体有哪些属性可以查看[css3](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_animations/Using_CSS_animations)
