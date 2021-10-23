# 录制mp4格式

## 项目主旨

使用`ffmpeg.js`在webworker中进行解码编码,让保存的`webm`格式的文件转成MP4
格式用于下载

## 用法

`ffmpeg-worker-mp4.js`太大了这里就不放项目里了.

去<https://cdn.jsdelivr.net/npm/ffmpeg.js@4.2.9003/ffmpeg-worker-mp4.js>下载到public文件夹

使用`npm start`后在`localhost:3000`打开.可以选择你要的输入设备和输出设备,如果视频输入中选择了`Local Display`则会调用浏览器的屏幕共享接口,跳出对话框让选择捕获哪个屏幕.之后下方的video标签中会播放捕获的视频流.音频流则会通过你选择的输出设备输出.

下方会有一个表单可以选择录制使用的格式,选好后点击右侧录像图标按钮开始录制,再点一下同一位置的按钮停止录制.
录制过程中点击截图的图标按钮可以对视频截图,录制完成后会交给webworker编码成MP4格式,在编码完成后才会再次出现录制按钮和下载按钮,点击下载按钮下载录完的视频.

注意录制的格式只能是`webm`,下载得到的是`mp4`格式的视频

## 使用范围

本项目只在`mac osx`下用`chrome 72.0.3626.119`测试打开过,其他浏览器情况未知.
