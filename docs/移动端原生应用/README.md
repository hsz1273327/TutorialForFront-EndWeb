# 移动端原生应用

我们都知道ios原生使用object-c或者swift开发,android原生使用java或者kotlin开发,他们官方都没有使用统一编程语言跨端开发的意愿(当然也没有义务).但作为开发者来说这非常割裂非常不方便.有没有使用一种统一的编程语言就可以为两个平台同时开发移动端原生应用的方法呢?有.

使用统一编程语言开发跨平台开发移动原生应用目前可选的技术有:

+ [flutter](https://flutter.dev/),使用dart作为编程语言,我们的目标是使用尽量少的学习成本达到基本可用的满足大部分需求的程度,因此第一个排除.
+ [react-native](https://reactnative.cn/docs),使用js,但绑定react技术栈,可选项
+ [native-script](https://nativescript.org/),使用js,可以绑定react,vue2,或者原生js,ts.这是本文的主角.

平心而论如果是为了找工作还是建议学react-native,它更流行,企业用的更多.但本文并不以找工作为导向,而是主要为业余开发人员,主要是做数据做算法的人提供快速易学又够用的解决方案.native-script目前看是最适合的(虽然市场占有率很低,社区缺乏维护,号称dead game,但起码还有人在维护,跨端开发和复杂的业务本就矛盾,真正复杂的应用不该使用跨端技术,业余要有业余的觉悟).

当然要是想稍微专业些,上面的两种解决方案也已经给出了链接,读者可以自己去看官方文档,而原生应用最专业的开发工具自然是各自对应的标准工具集这毫无疑问.

## 原生应用的构成

原生应用直接和操作系统交互,它的构成相比浏览器环境就要复杂的多,同样的也就灵活的多,主要可以包括:

1. 应用本体,即点击应用图标后进入的程序
2. 开屏页,在点击到进入应用加载完成这一段时间屏幕上显示的内容,一般纯展示没有交互或者交互为点击后跳转到另一软件比如浏览器
3. 本地信息提示,即由操作系统管理的消息推送体系,典型的比如微信不关闭但退出到后台后依然可以有消息提示
4. 后台任务,比如音乐软件退到后台后依然可以放歌,且可以在息屏页执行一些最基本操作.

## 移动端原生应用的特点

移动端原生应用有如下特点:

1. 屏幕小,展示位少.这是和网页以及桌面端最大的区别,移动端不得不做好内容的筛选和归类工作以避免内容过于密集影响体验.同时又要做好交互设计防止内容埋的太深用户难以触达
2. 没有鼠标键盘,但多了触控屏.智能手机上没有鼠标键盘,其操作全部由触控屏代替.触控屏并不是鼠标的简单代替,它除了有对应的单击双击,触碰操作外多出了长按,捏合,手指移动(平移手势),旋转(双指点按屏幕后旋转),滑动操作,但少了拖拽操作

需要注意并不是什么时候上原生应用都是个好主意,如果你有为一个需求开发一个原生应用的想法,最好回头看下是否符合如下几点:

1. 大量数据需要保存在客户端(只能原生)
2. 需要使用移动设备上的专用设备,比如摄像头,gps,相册等(可以选择原生或者小程序)
3. 几乎不需要服务端
4. 有后台常驻任务
5. 业务复杂

多数情况下更加轻量化的小程序是更好的应用形式.

需要注意的是**这部分我们应该全程挂代理**,许多资源我们需要通过代理才能下载下来.

## 结构和例子说明

移动端项目通常都是mvc结构,即`数据层<=>控制层<=>展示层`这样的结构,这部分我也打算按这个分层来介绍,只是控制层通常会和数据层有较多耦合,因此结合在一起介绍.

展示层可以简单理解为应用的UI部分,有哪些UI可用,怎样组合使用UI,怎样设置UI的样式布局可以有更好的表现力,什么情况下使用什么UI什么设置可以减少卡顿提高交互效率,这些是展示层需要考虑的问题,这部分除了编程外更多的是设计问题.

控制层和数据层决定了展示层的内容获取和行为,更多的是工程化问题,如何组织代码可以更方便维护,如何获取外部数据,如何保存信息,缓存信息,如何让应用充分利用机能,如何在性能,开发难度和可维护性上进行平衡.这些是控制层和数据层要考虑的问题.

除此之外,本文还会有针对手机的一些特化项目,毕竟是一个便携式终端:

+ 传感器,现在的手机保守点都至少有触摸屏,gps,摄像机,麦克风这些传感器,一些还会有陀螺仪
+ 短距无限通信,通常手机都有蓝牙,有的还有nfc
+ 算法集成,手机现在的芯片性能堪比一些低端pc,本地就可以集成一些算法用来实现很多能力
+ 信息分享,我们的手机中一般也不会只有一个应用,很多时候我们需要可以将数据发送给其他应用处理
+ 付款,毕竟手机应用是很好的收费入口.
+ 编译和发布,毕竟手机应用是要发布的

当然,本篇使用`nativescript-vue`,也就需要大致介绍下它.

例子方面,这边遵循两条线

+ 组件线:即单独介绍各种组件的独立项目,这些项目之间通常没有连贯性,通常用来展示比较相同相近组件间的联系和区别,以及展示功能,会用在UI组件相关的文章和传感器支付等单独功能的文章中
+ 项目线:即由最开始的helloworld项目各种扩展得来的项目,主要用在数据与控制层,编译发布等文章的例子中