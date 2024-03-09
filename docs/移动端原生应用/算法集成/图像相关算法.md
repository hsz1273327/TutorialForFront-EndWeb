# 图像相关算法

移动端图像相关算法一般是做识别做分类,识别的输入一般是摄像头扫描或静态图片.输出一般是一段文本.nativescript官方提供了[mlkit]()插件套件用于做相关工作,它是google提供的移动端工具[Google ML Kit(需翻墙)](https://developers.google.com/ml-kit)的封装.其中`@nativescript/mlkit-core`是核心,我们再根据需要安装其他对应的功能库.

## 权限申请

通常图像相关算法需要开启相册或摄像头权限.

在android中我们需要在`App_Resources/Android/src/main/AndroidManifest.xml`设置

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="__PACKAGE__">
    ...

    <uses-permission android:name="android.permission.CAMERA" />
    ...
</manifest>
```

而在ios中,app stroe要求我们写明摄像机和对应照片库的用途,我们需要在`App_Resources/iOS/Info.plist`中进行设置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    ...
    <dict>
        ...
        <key>NSCameraUsageDescription</key>
        <string>enter your camera permission request text here</string>
        <key>NSPhotoLibraryUsageDescription</key>
        <string>enter your photo library permission request text here</string>
        ...
    </dict>
    ...
</plist>
```

## 授权

通常我们还是用`@nativescript-community/perms`进行授权




### 二维码条形码处理

摄像头的一大用途是扫码,一般扫的是二维码或者条形码,社区提供了插件[@nativescript-community/ui-barcodeview](https://github.com/nativescript-community/ui-barcodeview)专门用于构造二维码条形码扫描页面.除了这个之外还提供了一个用于生成二维码的接口.

这个插件可以识别的码包括

| 类型                       | android支持                                             | ios支持 |
| -------------------------- | ------------------------------------------------------- | ------- |
| `CODE_39`                  | ✔                                                       | ✔       |
| `CODE_93`                  | ✔                                                       | ✔       |
| `CODE_128`                 | ✔                                                       | ✔       |
| `DATA_MATRIX`              | ✔                                                       | ✔       |
| `EAN_8`                    | ✔                                                       | ✔       |
| `EAN_13`                   | ✔                                                       | ✔       |
| `ITF(also known as ITF14)` | ✔                                                       | ✔       |
| `PDF_417`                  | ✔(on Android only when passed in explicity via formats) | ✔       |
| `QR_CODE`                  | ✔                                                       | ✔       |
| `UPC_A`                    | ✔                                                       | ✔       |
| `UPC_E`                    | ✔                                                       | ✔       |
| `CODABAR`                  | ✔                                                       | ❌       |
| `MAXICODE`                 | ✔                                                       | ❌       |
| `RSS_14`                   | ✔                                                       | ❌       |
| `AZTEC`                    | ❌                                                       | ✔       |
| `CODE_39_MOD_43`           | ❌                                                       | ✔       |
| `INTERLEAVED_2_OF_5`       | ❌                                                       | ✔       |

要使用它,需要安装好后在入口文件`app.ts`中进行注册

```ts
...
registerElement('BarcodeView', () => require('@nativescript-community/ui-barcodeview').BarcodeView)
...
```

之后只要渲染这个vue就可以开启摄像头进行扫码了.

由于它不是按键触发出来的,因此我们一般拿他来构造专用的扫码页或扫码组件来使用的,通常是下面这个样子

```vue
<GridLayout height="300" @shownInBottomSheet="onShownInBottomSheet">
    <BarcodeView ref="cameraView" class="scanner-round" pause beepOnScan="true" reportDuplicates="false"
        @scanResult="onScanResult" />
    <Image src="~/assets/crosshair.png" width="140" height="140" style="margin-top: 14; opacity: 0.3"
        horizontalAlignment="center" verticalAlignment="center" />
    <Button verticalAlignment="bottom" horizontalAlignment="left" text="torch" @tap="toggleTorch" />
</GridLayout>
```

一般`BarcodeView`标签会覆盖整个容器空间,然后我们放一张透明的中间有框的图在中间作为扫码识别区,最后再在底层位置放上几个按钮实现一些特殊功能.

![用于放在中心的图片](../imgs/crosshair.png)

`BarcodeView`组件可以设置的属性包括

| 属性                | 类型    | 默认值                        | 说明                |
| ------------------- | ------- | ----------------------------- | ------------------- |
| `formats`           | string  | ---                           | 识别的格式列表      |
| `preferFrontCamera` | boolean | `false`是否使用前置摄像头扫描 |
| `beepOnScan`        | boolean | `true`                        | 是否扫描时发出声音  |
| `reportDuplicates`  | boolean | `false`                       | 是否重复报告        |
| `pause`             | boolean | `false`暂停照相机             |
| `torchOn`           | boolean | `false`                       | 是否使用torchOn效果 |

当这个view被渲染时,扫描就会按设置的属性启动,一般我们监听事件`canResult`来获取扫描结果并退出扫描

### 例子

这个例子中我们用一个按钮来触发生成二维码,用一个[底部弹出导航](https://blog.hszofficial.site/TutorialForFront-EndWeb/#/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E5%8E%9F%E7%94%9F%E5%BA%94%E7%94%A8/UI%E7%BB%84%E4%BB%B6/%E7%BB%84%E5%90%88%E7%BB%84%E4%BB%B6/%E9%A1%B5%E9%9D%A2%E5%AF%BC%E8%88%AA?id=%e5%ba%95%e9%83%a8%e5%bc%b9%e5%87%ba%e5%af%bc%e8%88%aa)弹出一个扫描框来进行扫描.

+ `app.ts`

    ```ts
    import { createApp, registerElement } from 'nativescript-vue';
    import { BottomSheetPlugin } from '@nativescript-community/ui-material-bottomsheet/vue3';
    import { install as installBottomsheet } from "@nativescript-community/ui-material-bottomsheet";
    installBottomsheet();
    ...
    import Home from './views/HomeCamera.vue'
    ...
    registerElement('BarcodeView', () => require('@nativescript-community/ui-barcodeview').BarcodeView)
    createApp(Home).use(BottomSheetPlugin).start();
    ```

+ `views/HomeCamera.vue`

    ```vue
    <template>
        <Frame>
            <Page actionBarHidden="true">
                <StackLayout>
                    ...
                    <Button class="btn btn-primary btn-rounded-sm" text="点击扫码" @tap="QRScaner"></Button>
                    <Button class="btn btn-primary btn-rounded-sm" text="生成二维码"
                        @tap="generateBarcode"></Button>

                    <Image v-show="generatedBarcodeText" ref="generatedBarcode" width="140" height="140" horizontalAlignment="center"
                        verticalAlignment="center" backgroundColor="red" />

                    <Label v-show="generatedBarcodeText" class="body" textAlignment="center" textWrap="true">
                        <Span text="read/generated barcode: " />
                        <Span fontWeight="bold" :text="generatedBarcodeText" />
                    </Label>
                </StackLayout>
            </Page>
        </Frame>
    </template>

    <script lang="ts" setup>
    import { ref, computed } from 'nativescript-vue'
    import { Image } from "@nativescript/core"

    import { useBottomSheet } from "@nativescript-community/ui-material-bottomsheet/vue3";
    import { generateBarCode } from '@nativescript-community/ui-barcodeview';
    import QRScaner from "../components/QRScaner.vue";

    ...
    const generatedBarcodeText = ref()
    const generatedBarcode = ref()

    function generateBarcode() {
        let text = 'ecairn://transfer/443427876#44#Le Caméléon Nicolas'
        let type = 'QR_CODE'
        let imgsource = generateBarCode({
            text: text,
            type: type,
            width: 400,
            height: 400,
            frontColor: 'green',
            backColor: 'yellow'
        })
        console.log('************generated barcode image')
        let img = generatedBarcode.value._nativeView as Image
        img.src=imgsource 
        generatedBarcodeText.value=text
        console.log('****************set qrcode img')
    }
    const { showBottomSheet } = useBottomSheet()
    function showQRScaner() {
        showBottomSheet(QRScaner, {
            closeCallback: (...args) => {
                if (args.length === 2 && typeof(args[0])=="string") {
                    console.log(`bottom sheet closed with scan result ${args[0]} ,${args[1]}`)
                    let img = generatedBarcode.value._nativeView as Image
                    let imgsource = generateBarCode({
                        text: args[0],
                        type: args[1],
                        width: 400,
                        height: 400,
                        frontColor: 'green',
                        backColor: 'yellow'
                    });
                    img.src=imgsource
                    generatedBarcodeText.value = args[0]
                    console.log('generated barcode image')

                }
            }
        });
    }
    </script>
    ```

<!-- ### 文档扫描


https://github.com/nativescript-community/document-scanner -->
