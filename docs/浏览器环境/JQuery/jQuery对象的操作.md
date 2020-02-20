
# jQuery对象的操作

jQuery对象有固定的api用来操作里面的节点

+ **查找**

    + find()
    
        在对象节点内查找,里面的匹配规则和`$`一样,如:`$('ul.lang').find('#swift')`
        
    + parent()
    
        查找父节点,如:`$('#swift').parent('div.red')`
        
    + next()和prev()
        
        同级查找,如:`$('#swift').next()`
        
        
    + first(),last()和slice()
        
        如你所见的就是获取节点了,要求jQuery里面不止一个元素
    
+ **高阶函数**

    + filter()
        
        过滤,匹配规则还是一样,或者传入一个function定义过滤规则(this指代被绑定的DOM)
        如:`$('ul.lang li').filter(function () {return this.innerHTML.indexOf('S') === 0; // 返回S开头的节点})`
        
        
    + map()
    
        映射,高阶函数,用来为每个元素做操作,
        如:`$('ul.lang li').map(function () {return this.innerHTML})`




## 利用jQuery操作节点


+ **修改**

    + text()|无内容是获取文本内容,填入内容是修改文本内容
    + html()|无内容是获取html内容,填入内容是修改html内容
    
    
+ **样式表**

    + css()|无内容是获取css样式内容,填入指定样式(如color)可以返回对应值,填入内容是修改css内容,一次修改一项,可以无限次使用
    + hasClass('highlight')| 判断是否是某个class
    + div.addClass('highlight')| 添加一个class
    + div.removeClass('highlight')|移除一个class
    
    
+ **隐藏显示dom**

    + hide()| 隐藏
    + show()|显示
    
    
+ **获取DOM信息**|--

    + width()|宽度,一样空的是返回,填入数值是设置
    + height()|高度,一样空的是返回,填入数值是设置
    + attr()|填入一个值判断存在不存在这一属性,两个值将第一个值作为属性第二个作为属性的值进行设置
    + removeAttr()|移除属性
    + prop()|类似attr(),HTML5规定有一种属性在DOM节点中可以没有值，只有出现与不出现两种这种属性prop返回布尔值,attr()返回值或者undefined
    + is()|专门判断上面提到的那种属性是否存在
    
    
+ **表单操作**

    + val()|用于绑定在表单上,没有参数则返回现在的值,填入参数则填入或者更新值
    
+ **修改DOM结构**

    + append()|把一个dom,jQuery对象或者function作为参数,用来生成一个节点并添加到当前节点DOM的最后面
    + prepend()|把一个dom,jQuery对象或者function作为参数,用来生成一个节点并添加到当前节点DOM的最前面
    + remove()|移除该节点(或者一串节点)

HTML5规定有一种属性在DOM节点中可以没有值，只有出现与不出现两种这种属性,这种属性有:

属性|值
---|---
checked|"checked"
selected|"selected"
