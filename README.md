# webrtc演示

## 使用

### 启动服务器

1. cd进入server文件夹.
2. 执行`python -m venv env`创建虚拟环境
3. 执行`source env/bin/activate`进入虚拟环境
4. 执行`pip install -r require.txt`安装依赖
5. cd回项目根目录,执行`npm start`启动服务
6. 根目录下使用`npm run start-xxx`来执行前端js

### 使用前端

1. 双方点击`sendinfo`按钮进入聊天室
2. 一方点击`create room`按钮发送offer
3. 一会儿以后就会提示进入了online状态,之后再在文本框输入消息,点击`send message`就可以通信了,或者选择一个文件点击上传就可以两边传递文件了
