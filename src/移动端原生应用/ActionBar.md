# ActionBar

actionbar指的是手机屏幕上部窄窄的一条空间,这个位置在人正常竖屏使用手机时属于在最显眼的位置但手指按起来需要够,因此注定是给高曝光但操作低频的功能使用的.因此这块空间通常是作为功能区使用的,比如bilibili首页上ActionBar提供了提醒页,游戏页面的入口以及一个搜索栏,贴吧则提供了直播,关注,推荐,热榜以及搜索页的入口.而在表现形式上actionbar毕竟地方小,因此多用图标而非文本进行展示,交互上也以点击为主,一般除非放了个搜索栏不会要输入.因此这块的核心基本可以认为就是找到一个好图标.

我们也可以在`<Page>`组件中通过设置`actionBarHidden=true`关闭ActionBar的展示

## 相关组件

Nativescript-Vue中这块有专门的控件控制.分别是

+ [ActionBar](https://nativescript-vue.org/en/docs/elements/action-bar/action-bar/),这个组件是ActionBar部分的根组件,其中包含的子节点都会放在ActionBar中.它比较重要的属性有:
    + 提供了一个`title`属性,会在屏幕的左上角`NavigationButton`后面展示
+ [ActionItem](https://nativescript-vue.org/en/docs/elements/action-bar/action-item/),这个组件用来提供按钮.它比较重要的属性有:
    + 提供了`android.position`(enum: actionBar,popup,actionBarIfRoom)和`ios.position`(enum: left,right)属性用于设置展示位置,
    + 提供了`text`属性用于设置展示的文本,注意这个属性无法设置图标
    + 提供了`icon`属性用于设置图标.
+ [NavigationButton](https://nativescript-vue.org/en/docs/elements/action-bar/navigation-button/),这个组件是iOS后退按钮和Android导航按钮的通用抽象,位置固定在最左上角,基本没啥可扩展的,用法也基本固定为`<NavigationButton text="Go back" android.systemIcon="ic_menu_back" />`一般用的比较少,毕竟后退操作实现的方法太多了而这个位置是人第一个会注意到的位置,不好好利用过于可惜.

除了上面的专用组件.我们还可以单独使用如下组件,他们会覆盖`ActionBar`的`title`的位置:

+ [SearchBar](https://nativescript-vue.org/en/docs/elements/components/search-bar/),搜索框,挺常用
+ [Label](https://nativescript-vue.org/en/docs/elements/components/label/),标签,用来展示一些信息,有时候会用
+ [Button](https://nativescript-vue.org/en/docs/elements/components/button/),按钮,用来控制一些点击行为
+ [Image](https://nativescript-vue.org/en/docs/elements/components/image/),图片,地方小一般不会用,但确实可以放
我们也可以使用[StackLayout](https://nativescript-vue.org/en/docs/elements/layouts/stack-layout/)来组合上面几种组件替代单个组件.

## 总结

ActionBar一般用在**高曝光但操作低频的功能上**,以**点击操作为主**,主要**靠图标辨识功能**.设计的时候只要记住把重要但不高频的功能进入按钮放在这里并给他们找个合适的图标就行.