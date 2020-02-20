# `@`字符与特殊用法

## 关键帧(`@keyframes`)

Stylus支持`@keyframes`规则，当编译的时候转换成`@-webkit-keyframes`：

```
@keyframes pulse
0%
  background-color red
  opacity 1.0
  -webkit-transform scale(1.0) rotate(0deg)
33%
  background-color blue
  opacity 0.75
  -webkit-transform scale(1.1) rotate(-5deg)
67%
  background-color green
  opacity 0.5
  -webkit-transform scale(1.1) rotate(5deg)
100%
  background-color red
  opacity 1.0
  -webkit-transform scale(1.0) rotate(0deg)
```

生成为：

```
@-webkit-keyframes pulse {
  0% {
  background-color: red;
  opacity: 1;
    -webkit-transform: scale(1) rotate(0deg);
  }

  33% {
    background-color: blue;
    opacity: 0.75;
    -webkit-transform: scale(1.1) rotate(-5deg);
  }

  67% {
    background-color: green;
    opacity: 0.5;
    -webkit-transform: scale(1.1) rotate(5deg);
  }

  100% {
    background-color: red;
    opacity: 1;
    -webkit-transform: scale(1) rotate(0deg);
  }

}
```
### 扩展

使用@keyframes，通过vendors变量，会自动添加私有前缀(webkit moz official)。这意味着你可以子啊任意时候立即高效地做修改。
考虑下面的例子：
```
@keyframes foo {
  from {
    color: black
  }
  to {
    color: white
  }
}
```
扩增两个默认前缀，官方解析：
```
@-moz-keyframes foo {
  0% {
    color: #000;
  }

  100% {
    color: #fff;
  }
}
@-webkit-keyframes foo {
  0% {
    color: #000;
  }

  100% {
    color: #fff;
  }
}
@keyframes foo {
  0% {
    color: #000;
  }

  100% {
    color: #fff;
  }
}
```
如果我们只想有标准解析，很简单，修改vendors：
```
vendors = official

@keyframes foo {
  from {
    color: black
  }
  to {
    color: white
  }
}
```
生成为：
```
@keyframes foo {
  0% {
    color: #000;
  }

  100% {
    color: #fff;
  }
}
```
## 自定义字体(`@font-face`)

`@font-face`跟其在CSS中作用表现一样，在后面简单地添加个块状属性即可，类似下面：
```
@font-face
  font-family Geo
  font-style normal
  src url(fonts/geo_sans_light/GensansLight.ttf)

.ingeo
  font-family Geo

```

生成为：

```
@font-face {
  font-family: Geo;
  font-style: normal;
  src: url("fonts/geo_sans_light/GensansLight.ttf");
}
.ingeo {
  font-family: Geo;
}
```

## 媒体(`@media`)
`@media`工作原理和在常规CSS中一样，但是，要使用Stylus的块状符号。

```
@media print
  #header
  #footer
    display none
```
生成为：
```
@media print {
  #header,
  #footer {
    display: none;
  }
}
```

## CSS字面量(`@css`)

不管什么原因，如果遇到Stylus搞不定的特殊需求，你可以使用@css使其作为CSS字面量解决之。
```
@css {
  body {
    font: 14px;
  }
}
编译为：
body {
  font: 14px;
}
```
