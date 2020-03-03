# Javascript攻略

Javascript是当今最流行的编程语言之一,它诞生于网络技术,也几乎局限于网络技术.这是一门比较有争议的脚本语言.
一方面它相当简陋,在es6之前身为一个脚本语言其编程体验极差,
另一方面由于google的v8引擎和基于v8的node.js解释器的出现.js从只能做前端开发的浏览器脚本语言蜕变为全平台脚本语言.这让大量的前端开发者招到了新玩具从而迅速获得了一个极为庞大的社区.

在社区扩大后也涌现了一大批优秀的框架工具.事实上JS恐怕拥有着最打的编程社区,技术的更新换代恐怕也是所有语言中最快的.喜欢新鲜事物的人自然很喜欢这种状态,但这也让JS社区成了最碎片化的社区.
甚至于js也成了我见过唯一需要"编译"的脚本语言.

## Javascript的定位

JS的定位在历史上也是起起落落.最开始单纯作为浏览器脚本语言,到后来node.js出现一度有了JS成为前后端通用语言,拳打Java脚踢C,甚至因为其解释器很小资源消耗很低的特点还有了在嵌入式系统中应用的尝试,再到近年回归理性,基本确定了其应用范围就在前端和与前端最接近的一层后端--Web Gateway层以及一些脚本小工具上.

结合JS这门语言的特点这个定位相对还是比较理性客观的,首先浏览器前端脚本是js的自留地,其他语言基本完全没有插足的余地,其次,在虚拟机和语言特性层面,得力于google给力的v8以及天生没有多线程这一特点,js代码全部都是基于回调或者协程的,因此在io并发性能高的同时内存消耗很小,这一点也是它比python更适合开发服务端的原因.但和python一样,v8无法应用多核(比python更极端,永远单线程).因此在高负载情况下只能通过起多个进程的方式.因此js天生不适合做核心组件的开发语言.像什么Queue,数据库这种就基本没有js的事儿了.

如果要开发这种核心组件,还是要老老实实使用go,或者C靠谱.

## Javascript的现状

实际上Js是一个非常分裂的语言.它的主干[ECMAScript](https://baike.baidu.com/item/ECMAScript/1889420?fr=aladdin)是一个不断发展更新也非常有活力的语言,同时也是浏览器唯一默认支持的脚本语言,因此一般也称它为`javascript`.但由于其早期设计过于坑爹,加上node环境的崛起,就诞生了许多方言,他们的源码无法直接在js的执行环境中使用,需要通过编译器将源码转成js代码,最知名的就是[coffeescript](http://coffee-script.org/)和[TypeScript](https://www.tslang.cn/docs/home.html),这两者都有很大的用户群体.但由于ECMAScript的更新(目前已经到了es8)慢慢coffeescript变得不再流行,而由于typescript有类型标注等有益于工程化的特性,typescript越来越被大厂和各大前端框架青睐,似乎有取代ECMAScript的趋势.同时由于ECMAScript的标准发展太快,其运行平台在特性实现上并没有跟上,就造成了高版本的ECMAScript也需要通过编译器将源码转为低版本的ECMAScript代码,就诞生了[babel项目](https://www.babeljs.cn/)(ps:babel意为巴别塔,可想而知ECMAScript内部有多乱).所以与其说js是一种编程语言不如说是一个语系.

而在应用方面,也是非常分裂.但大体可以分为两个环境:浏览器和[node.js](https://nodejs.org/en/)其内部虚拟机(也叫引擎)具体实现又各用个的,下面是比较常见的js虚拟机:

+ `V8`开源,由Google开发,用C++编写,目前chrome和node.js使用

+ `Rhin`由Mozilla基金会开源,完全用Java开发

+ `SpiderMonkey`第一个JavaScript引擎,Netscape Navigator,Firefox

+ `JavaScriptCore`苹果公司为Safari开发

+ `KJS`最初由Harri Porten为KDE项目的Konqueror网络浏览器开发

+ `Chakra** (JScript9)`微软为Edge开发

+ `Chakra** (JavaScript)`微软为IE9到11开发

+ `Nashorn`作为OpenJDK的一部分,由Oracle Java语言和工具组编写

+ `JerryScript`一个物联网的轻量级引擎

虚拟机的实现不同问题倒不算大,问题大的部分主要是执行环境,由于不同执行环境下默认导入的模块不一样,标准库也不一样,因此可能都是js的包,但有的包只能node环境用,有的只能浏览器用.因此js在方方面面看都是相当割裂的一种编程语言.

## 本文针对人群

本文主要是为已经学过python的人而写的攻略文.一方面做数据科学的需要一定前端技术做可视化,也需要一定的网络技术用于项目落地.另一方面Javascript是一个很好的参照,让我们可以更好的理解编程技术.写这篇文章的一个很大的原因是JS是很好的函数式编程的学习语言.

+ 一方面它足够流行,这样不至于学了一点用没有,成为屠龙技(比如各种lisp方言)
+ 另一方面他有足够的部件实现和验证函数式编程.

因此本文也针对对函数式编程有兴趣的同学.

## 使用的编程语言

本文将使用两种编程语言:

+ ES6+
+ TypeScript

这两者在很大程度上语法相当接近,TypeScript可以看做是ES6+带类型约束的超集,本文直接从ES6标准开始,绕开语法晦涩的低级标准,可以更好的服务于快速原型开发和结论验证.
es6非常适合快速原型开发,而typescript非常适合工程化.

在应用部分我们会将两种语言的代码都附上

+ 语法糖丰富

低版本的Js语法简单而且坑多,使用起来各种不方便,会给习惯python的数据科学研究人员造成学习困难, ES6新增了大量语法糖.在使用上可以给被python惯坏了的人一定程度上减少学习成本.

+ 接近Python的开发习惯

Python是模块化编程的语言,而Js在设计初期就没考虑模块化的问题,低版本的js在编写时模块化方面 会让被python惯坏了的人非常不喜欢,ES6使用类似python的import语句,相对容易接受.

## 文章结构

单说JavaScript的话是一个很简单的语言,本文大致分为几个部分

1. node执行环境和工具链

    工欲善其事必先利其器,js作为后起之秀有着相当优秀和完善的工具链,但前面也讲过了社区非常碎片化因此不少工具功能相同,这对选择困难症非常不友好.
    这部分讲比较推荐的工具链,这些工具都是ecmascript和Typescript都可以使用的.

    1. babel编译器
    2. typescript编译器
    3. log工具
    4. 代码风格规范
    5. 测试工具
    6. 注释文档


2. ecmascript
    介绍以es6为基础的js语法,主要是从实用角度出发,并不是语言手册

3. typescript
    通过对ecmascript语法的补充介绍TypeScript.

4. 浏览器环境

    主要是介绍一些前端编程的基本概念和工具,这部分使用ecmascript,并且以chrome为例

5. 函数式编程

    之所以讲JS一个很大的原因是它既热门又比python更加适合使用函数式编程.

6. 后端服务
    JS并不是最佳的后端服务语言,但它并不是不能做,node.js依靠异步可以在性能上达到相当高的程度,足以应付10k问题,而在同时其内存消耗也相当小,应付一般的网站绰绰有余.
    其主要缺陷在于没有足够的生态,不适合做更加复杂的后端服务.
    
7.  基于vue.js构建前端

    主流的前端框架中vue.js是最好上手也是文档最清晰,生态最不碎片化的.因此本文只介绍它.

8.  基于web技术的客户端技术

    实际上现在的web技术远不止浏览器可以使用,桌面端,移动端,chrome插件都可以基于它构造客户端.

9.  使用js构造原生移动端软件

    这个部分目前不算成熟,算扩展阅读.

本文使用[jupyter notebook](https://jupyter.org/)结合[jp-babel](https://www.npmjs.com/package/jp-babel)和[itypescript](https://github.com/nearbydelta/itypescript)编写,[docsify](https://docsify.js.org/#/?id=docsify)解析生成网页.

同时本文的示例代码都在项目的各个分支中,大家可以按`${章}-{节}-{内容}`的方式查找到对应的示例代码.文章中也会给出链接方便查看.

本文主要参考自阮一峰大大的书<ECMAScript 6 入门>和SICP,加上一些个人理解,本人才疏学浅如有错误望各位读者指正.
