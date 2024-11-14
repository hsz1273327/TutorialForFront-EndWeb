# my_alarms

斩首chrome闹钟功能的例子

用法:

1. 执行`npm run build`
2. 在chrome中进入路径`chrome://extensions/`,点击`加载已解压的扩展程序`后选择本项目下的app文件夹

效果:

在搜索栏输入`alarm 消息@delay 延迟的分钟数[#重复提醒间隔]`或者`alarm 消息@when 毫秒级时间戳[#重复提醒间隔]`创建闹钟,闹钟触发后会弹出消息,手动关闭消息闹钟取消.

