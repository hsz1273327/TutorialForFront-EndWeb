# speaker

展示chrome的无界面交互和消息传递的例子,使用tts功能.

用法:

1. 执行`npm run build`
2. 在chrome中进入路径`chrome://extensions/`,点击`加载已解压的扩展程序`后选择本项目下的app文件夹

效果:

+ 点击插件图标展示目前支持的音频和默认音频,选中可以设置默认音频(背景色为黄色)
+ 在搜索栏输入`speaker 消息[@@声音名]`让chrome念出来
+ 在页面上选中一段文本,右键点`读出来`让chrome念出来
+ 页面上选中一段文字后按`Alt+T`(mac下用`Alt+T`)让chrome念出来.