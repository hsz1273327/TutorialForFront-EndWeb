# nfc

nfc是一种近场通信协议,有效距离一般在10cm内,有着广泛的应用,像小区门禁卡,公交卡,掌机的触碰加好友等都广泛应用这一技术.不过该技术由于在使用场景上和二维码有很大重合,而且成本相对高,就显得很低调.

NFC工作模式分为被动模式和主动模式.

被动模式中NFC发起设备(也称为主设备)需要供电,主设备利用供电设备的能量来提供射频场并将数据发送到NFC目标设备(也称作从设备);从设备不产生射频场所以可以不需要供电设备,而是利用主设备产生的射频场转换为电能为从设备的电路供电.从设备接收主设备发送的数据并且利用负载调制(load modulation)技术以相同的速度将从设备数据传回主设备.因为此工作模式下从设备不产生射频场而是被动接收主设备产生的射频场所以被称作被动模式.在此模式下NFC主设备可以检测非接触式卡或NFC目标设备并与之建立连接,门禁公交卡这类都是工作在这种模式下.

主动模式中发起设备和目标设备在向对方发送数据时都必须主动产生射频场所以称为主动模式.它们都需要供电设备来提供产生射频场的能量.这种通信模式是对等网络通信的标准模式可以获得非常快速的连接速率.

NFC在移动端有三种应用形式

+ `点对点模式`,这种模式下两个NFC设备可以交换数据.例如多个具有NFC功能的数字相机,手机之间可以利用NFC技术进行无线互联实现虚拟名片或数字相片等数据交换

+ `读卡器模式`,又称`读/写模式`,这种模式下NFC设备作为非接触读写器使用,例如支持NFC的手机在与标签交互时扮演读写器的角色.开启NFC功能的手机可以读写支持NFC数据格式标准的标签

+ `卡模拟模式`,这种模式就是将具有NFC功能的设备模拟成一张标签或非接触卡,例如支持NFC的手机可以作为门禁卡,银行卡等而被读取

本文例子在[nsv-nfc分支]()

## nfc的兼容性问题

实际上nfc并不是一个统一的标准协议,而是好几个协议的统称,因此一些nfc卡会有兼容性问题.

nfc常用的数据格式有如下几种:

+ `MifareClassic`: 就是`NfcA`
+ `IsoDep`: 各种交通卡常用
+ `NfcB`: 二代身份证使用的标准
+ `NfcF`: `Felica`用的标准
+ `NfcV`: 德州仪器的`VicinityCard`卡用的标准
+ `Ndef`: ios和安卓主推的传输数据格式

这些之中只有`Ndef`是ios和android都支持的,而android也能识别其他几种(称为`tag`)

## nativescript的nfc支持

nativescript中通过插件[nativescript-nfc](https://github.com/EddyVerbruggen/nativescript-nfc)来实现.不过这个库目前android下有bug,需要在安装好后修改`nfc.android.js`中第369行

```js
this.pendingIntent = android.app.PendingIntent.getActivity(activity, 0, this.intent, 33554432);//最后一位由0改为33554432
```

感谢[vincentharrius/nativescript-nfc](https://github.com/vincentharrius/nativescript-nfc)项目的修正,但看起来这个bug原作者并不打算修复.

该插件支持`读卡器模式`,ios仅支持读取`Ndef`格式的nfc卡,android则可以支持读取大部分其他格式.

## 权限申请

在android中我们需要在`App_Resources/Android/src/main/AndroidManifest.xml`设置

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="__PACKAGE__">
    ...

    <uses-permission android:name="android.permission.NFC" />
    <uses-permission android:name="android.permission.NFC_PREFERRED_PAYMENT_INFO" />  <!-- nfc支付 -->
    <uses-permission android:name="android.permission.NFC_TRANSACTION_EVENT" />  <!-- nfc支付 -->
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
        <key>NFCReaderUsageDescription</key>
        <string>enter your nfc permission request text here</string>
        ...
    </dict>
    ...
</plist>
```

同时要在`App_Resources/iOS/app.entitlements`(没有就创建)中添加

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
...
    <key>com.apple.developer.nfc.readersession.formats</key>
    <array>
        <string>NDEF</string>
    </array>
...
</dict>
</plist>
```

需要注意在ios中要实机调试nfc个人账户不行,必须注册开发者账户并先申请一个应用id,然后给它绑定nfc功能才能调试

## 授权

nfc仅需要权限申请,不需要运行时授权

## 打开nfc

一些设备确实是不支持nfc的,这可以通过`nfc.available()=>Promise<boolean>`来检测设备是否支持nfc.

而nfc要使用只能去设置中打开,我们也只能用接口`nfc.enabled()=>Promise<boolean>`检查是否打开

## 读取nfc卡

ios仅能扫描读取ndef格式的nfc卡

```ts
await nfc.setOnNdefDiscoveredListener((data: NfcNdefData) => {
    // data.message is an array of records, so:
    if (data.message) {
        for (let m in data.message) {
            let record = data.message[m];
            console.log(
                "Ndef discovered! Message record: " + record.payloadAsString
            )
            feedback.success({ message: `Discovered a Message ${record.payloadAsString}` })
        }
    }
}, { stopAfterFirstRead: true })
```

而android可以读取尽可能多格式的nfc卡

```ts
await nfc.setOnTagDiscoveredListener((data: NfcTagData) => {
    console.log("Discovered a tag with ID " + data.id);
    if (data.techList) {
        console.log(`tag discovered! techList record: ${JSON.stringify(data.techList)}`)
        feedback.success({ message: `tag discovered! techList record: ${JSON.stringify(data.techList)}` })
    }
})
```

当然如果你只想读ndef格式的nfc卡像ios中那么写就行了.

如果要关闭监听,把回调参数设为`null`再调用一次就行.

```ts

```

因此我们通常像下面这样写

+ 监听读nfc

    ```ts
    async function startWaitNFC() {
        
        if (isAndroid) {
            await nfc.setOnTagDiscoveredListener((data: NfcTagData) => {
                // data.message is an array of records, so:
                console.log("Discovered a tag with ID " + data.id);
                if (data.techList) {
                    console.log(`tag discovered! techList record: ${JSON.stringify(data.techList)}`)
                    feedback.success({ message: `tag discovered! techList record: ${JSON.stringify(data.techList)}` })
                }
            })
            console.log("OnDiscovered listener added")
        } else {
            await nfc.setOnNdefDiscoveredListener((data: NfcNdefData) => {
                // data.message is an array of records, so:
                if (data.message) {
                    for (let m in data.message) {
                        let record = data.message[m];
                        console.log(
                            "Ndef discovered! Message record: " + record.payloadAsString
                        )
                        feedback.success({ message: `Discovered a Message ${record.payloadAsString}` })
                    }
                }
            }, { stopAfterFirstRead: true })
            console.log("OnDiscovered listener added")
        }
    }
    ```

+ 取消监听nfc

    ```ts
    async function stopWaitNFC() {
        if (isAndroid) {
            await nfc.setOnTagDiscoveredListener(null)
            console.log("OnTagDiscovered listener removed")
        } else {
            await nfc.setOnNdefDiscoveredListener(null)
            console.log("OnNdefDiscovered listener removed")
        }
    }
    ```

## 擦写nfc卡

android还支持往卡里写数据或擦除数据.注意这个库仅android支持擦写nfc卡

针对空白卡

```ts
```

针对有内容的卡

```ts
```



