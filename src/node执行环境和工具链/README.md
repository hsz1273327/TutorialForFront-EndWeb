# ECMAScript的工具链

ECMAScript作为一个语言规范并不管实现,而要让它可以顺利的在各个平台上执行需要依赖编译器`babel`的帮助.
而光让代码跑起来当然是不够的,我们希望我们的代码正确,规范优雅有可维护性.这就需要一整套的工具链来实现了.

本章内容:

+ babel执行环境
+ 代码风格
+ api文档自动生成
+ 代码测试工具
+ log工具
+ 性能基准测试

为了更加直观,会有一个[配套项目](https://github.com/hszofficial/js-toolchain-exp)用于演示.