# node环境构建应用

node环境是js在浏览器外的唯一执行环境,其作用类似python执行环境之于python.

node和python在很大程度上非常相似,是动态语言,依赖解释器执行.因此他们作用也相当接近.但也确实各有特点:

+ 纯python相当慢,同时内存消耗也大,纯node比纯python性能优越也省内存,因此node很适合替代python用来写运维工具.
+ python极易扩展,使用cython/c/cpp/fortan/rust等静态语言进行扩展后性能基本就是这些静态语言编译出的动态链接库的性能.同时拥有科学计算的全套生态工具,更有pytorch,tenserflow等工具可以方便的使用gpu资源.因此适合写计算密集型的程序.js在这方面不成熟这块基本无法涉足.
+ node天生异步非阻塞,没有历史包袱,因此比python更加适合做服务端这类io密集型任务.
