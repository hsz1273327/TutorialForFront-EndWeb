# 一个最简单的chrome插件

这个例子是最简单的chrome插件,我们可以通过这个例子看看chrome插件的本质和结构

## 结构

chrome插件必须包含一个`manifest.json`文件用来声明和定义一些相关的内容.相关的api可以查看:

+ [扩展](https://developer.chrome.com/extensions/manifest)
+ [app](https://developer.chrome.com/apps/manifest)

这俩都要翻墙

其中必然要有的有:

```
"manifest_version": 2,
"name": "My Extension",
"version": "versionString",
```

## 本质

其实chrome插件就是泡在chrome的v8虚拟机上的js应用而已,它可以用html文件作为界面,而js定义行为
