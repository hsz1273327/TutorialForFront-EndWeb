# ServiceWorker

[ServiceWorker](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers)是一个为解决通信中断而生的技术,它本质上是一个单独的代理线程,通过缓存可以将特定的远程资源拦截保存,以提供离线状态下的可用性.

这个特性是为离线模式准备的,使用它就意味着你的前端项目的缓存是可控的,更进一步的如果你的前端项目并不是内容驱动而是功能驱动的,那处理好缓存甚至可以将它当做本地应用使用.

本文的例子在[]()

## 开发环境

ServiceWorker特性依赖于https或本地域名localhost,毕竟本地要缓存的东西安全性要是要在意的.