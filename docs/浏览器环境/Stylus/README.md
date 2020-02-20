# Stylus

Stylus是一种富有表现力的、动态的、健壮的CSS描述语言,他由node写成,只要使用npm安装stylus即可(推荐全局安装).
使用也非常方便,只要简单的使用stylus命令即可

```shell
stylus -w style.styl -o style.css
```
上面的意思是监控style.styl,并将其编译到style.css


它采用缩进语法,喜欢python的一定喜欢它.

css描述非常繁琐,又是花括号又是分号,但他只是做了定义标签样式这样一个简单的事儿,
这让很多程序员无法忍受,他们希望用简洁直接的语言描述这种样式,并且可以引入逻辑使写css也像写程序一样,Stylus解决的正是这一个问题.

我们来看看他的特性:

+ 冒号可选
+ 分号可选
+ 逗号可选
+ 括号可选
+ 变量
+ 插值
+ 混合书写
+ 算术
+ 强制类型转换
+ 动态导入
+ 条件
+ 迭代
+ 嵌套选择
+ 父级参考
+ 变量函数调用
+ 词法作用域
+ 内置函数(>25)
+ 内部语言函数
+ 压缩可选
+ 图像内联可选
+ 可执行Stylus
+ 健壮的错误报告
+ 单行和多行注释
+ CSS字面量
+ 字符转义
+ TextMate捆绑
以及其他更多

让我们从一个最简单的对比开始吧:

css:

```css
body {
  font: 12px Helvetica, Arial, sans-serif;
}
a.button {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
```

stylus--缩进语法的css:

```stylus
body
    font 12px Helvetica, Arial, sans-serif

a.button
    -webkit-border-radius 5px
    -moz-border-radius 5px
    border-radius 5px

 ```

 stylus--灵活的css:

```stylus
border-radius(x)
    -webkit-border-radius x
    -moz-border-radius x
    border-radius x

body
    font 12px Helvetica, Arial, sans-serif
a.button
    border-radius(5px)

```

这三个是等价的

接下来的部分我们会详细讨论以下部分:

+ 注释
+ 选择器
+ 变量与插值
+ 运算符
+ 控制语句
+ 内置方法
+ 混入模式与函数
+ 复用
+ `@`字符与特殊用法
+ jsApi


这篇文章主要是参考官方文档,大量使用了文档中的例子,稍加总结提炼,主要是为了让用python的也能比较好的理解.
