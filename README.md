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

interface NfcNdefData {
    id?: Array<number>;
    techList?: Array<string>;
    message: Array<NfcNdefRecord>;
}
interface NfcNdefRecord {
    id: Array<number>;
    tnf: number;
    type: number;
    payload: string;
    payloadAsHexString: string;
    payloadAsStringWithPrefix: string;
    payloadAsString: string;
}
```

而android可以识别尽可能多格式的nfc卡

```ts
await nfc.setOnTagDiscoveredListener((data: NfcTagData) => {
    console.log("Discovered a tag with ID " + data.id);
    if (data.techList) {
        console.log(`tag discovered! techList record: ${JSON.stringify(data.techList)}`)
        feedback.success({ message: `tag discovered! techList record: ${JSON.stringify(data.techList)}` })
    }
})

interface NfcTagData {
    id?: Array<number>;
    techList?: Array<string>;
}
```

回调函数的参数中会有个字段`techList`,它是描述nfc卡支持数据格式等技术的列表.而在移动端有用的信息其实只能通过`setOnNdefDiscoveredListener`接口来读取.即`setOnTagDiscoveredListener`的作用是识别nfc卡;而`setOnNdefDiscoveredListener`的作用是读取nfc卡中的信息

如果要关闭监听,把回调参数设为`null`再调用一次就行.

```ts
await nfc.setOnTagDiscoveredListener(null)
await nfc.setOnNdefDiscoveredListener(null)
```

因此我们通常像下面这样写读卡的逻辑

+ 监听读nfc

    ```ts
    async function startWaitNFC() {
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
    ```

+ 取消监听nfc

    ```ts
    async function stopWaitNFC() {
        await nfc.setOnNdefDiscoveredListener(null)
        console.log("OnNdefDiscovered listener removed")
    }
    ```

## 擦写nfc卡

android还支持往卡里写数据或擦除数据.注意这个库仅android支持擦写nfc卡

### 写入信息

这个库写入信息使用接口`nfc.writeTag(opt:WriteTagOptions)=>Promise<void>`

```ts
interface WriteTagOptions {
    textRecords?: Array<TextRecord>;
    uriRecords?: Array<UriRecord>;
}
interface TextRecord {
    /**
     * String of text to encode.
     */
    text: string;
    /**
     * ISO/IANA language code. Examples: 'fi', 'en-US'.
     * Default 'en'.
     */
    languageCode?: string;
    /**
     * Default [].
     */
    id?: Array<number>;
}
interface UriRecord {
    /**
     * String representing the uri to encode.
     */
    uri: string;
    /**
     * Default [].
     */
    id?: Array<number>;
}
```

它支持文本和uri两种形式,即接口`WriteTagOptions`中的两个字段.因此`textRecords`和`uriRecords`这两个字段互斥,不要同时写.其中的`id`字段是可选字段,是负载的元数据,一般没啥用,但还是建议填下

由于写入的数据是`ndef`格式,因此写入以后就只能用`setOnNdefDiscoveredListener`接口监听.

> 针对空白卡

当你的nfc卡中没有信息时你应该使用`setOnTagDiscoveredListener`接口监听(识别nfc卡),在手机震动后表名识别到了nfc卡,这时不要远离,调用写入接口`writeTag(opt:WriteTagOptions)=>Promise<void>`

```ts
await nfc.setOnTagDiscoveredListener((data: NfcTagData) => {
    console.log("Discovered a tag with ID " + data.id);
    nfc.writeTag(opt).then(()=>{
        console.log(`write ok`)
    })
})
```

> 针对有内容的卡

当你的卡中有信息时也就是说可以用`setOnNdefDiscoveredListener`读取到数据时,你就应该使用`setOnNdefDiscoveredListener`接口先读到数据,然后再调用`writeTag(opt:WriteTagOptions)=>Promise<void>`接口写入.注意针对有内容的卡,写入是覆盖不是添加.

```ts
await nfc.setOnNdefDiscoveredListener((data: NfcNdefData) => {
    console.log("Discovered a tag with ID " + data.id);
    nfc.writeTag(opt).then(()=>{
        console.log(`write ok`)
    })
})
```

### 擦除信息

擦除信息通常使用`setOnTagDiscoveredListener`接口监听,在手机震动后表名识别到了nfc卡.这时不要远离,调用擦除接口`nfc.eraseTag()=>Promise<void>`即可擦除nfc卡中信息

```ts
await nfc.setOnTagDiscoveredListener((data: NfcTagData) => {
    console.log("Discovered a tag with ID " + data.id);
    nfc.eraseTag().then(()=>{
        console.log(`erase ok`)
    })
        
})
```

## 例子

这个例子需要一张没用的nfc卡,淘宝NFC213/NFC215的卡片贴纸基本在1元一个的价格.我建议你在android中测试,ios试一次沉默成本太高了

第一个按钮用来检查设备是否支持读取nfc,第二个按钮则用来启动或关闭扫描nfc卡,后面的按钮会在ios中隐藏,分别是用来识别nfc卡,写文本,写url和擦除数据用的按钮.

如果测试写入和擦除,记得先点击开始扫描,操作完成后再点击结束扫描.

```vue
<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Button text="check Available" @tap="checkAvailable" />
                <Button :text="startOrStopWaitNdef_btn" @tap="startOrStopWaitNdef" />
                <Button v-show="isAndroid" :text="startOrStopWaitTag_btn" @tap="startOrStopWaitNFC" />
                <Button v-show="isAndroid" text="写入文本" @tap="writeTxt" />
                <Button v-show="isAndroid" text="写入url" @tap="writeURL" />
                <Button v-show="isAndroid" text="擦除数据" @tap="erase" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, computed } from 'nativescript-vue'
import { isAndroid } from "@nativescript/core"
import { Feedback } from "nativescript-feedback"
import { Nfc, NfcNdefData, NfcTagData } from "nativescript-nfc"

const feedback = new Feedback()
const nfc = new Nfc()

const waiting_nfc = ref(false)
const waiting_ndef = ref(false)

const startOrStopWaitTag_btn = computed(() => {
    if (waiting_nfc.value) {
        return "结束识别nfc卡"
    } else {
        return "开始识别nfc卡"
    }
})
const startOrStopWaitNdef_btn = computed(() => {
    if (waiting_ndef.value) {
        return "结束读取nfc卡"
    } else {
        return "开始读取nfc卡"
    }
})

async function checkAvailable() {
    let nfc_avail_msg
    let avail = await nfc.available()
    if (avail) {
        let enabled = await nfc.enabled()
        if (enabled) {
            nfc_avail_msg = "NFC is available"
            feedback.success({ message: nfc_avail_msg })
        } else {
            nfc_avail_msg = "NFC is not enabled"
            feedback.warning({ message: nfc_avail_msg })
        }
    } else {
        nfc_avail_msg = "NFC is not available"
        feedback.error({ message: nfc_avail_msg })
    }
}
async function startWaitNdef() {
    await nfc.setOnNdefDiscoveredListener((data: NfcNdefData) => {
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
    waiting_ndef.value = true
    console.log("OnDiscovered listener added")
}

async function startWaitNFC() {

    await nfc.setOnTagDiscoveredListener((data: NfcTagData) => {
        console.log("Discovered a tag with ID " + data.id);
        if (data.techList) {
            console.log(`tag discovered! techList record: ${JSON.stringify(data.techList)}`)
            feedback.success({ message: `tag discovered! techList record: ${JSON.stringify(data.techList)}` })
        }
    })
    waiting_nfc.value = true
    console.log("OnDiscovered listener added")
}
async function stopWaitNFC() {
    await nfc.setOnTagDiscoveredListener(null)
    waiting_nfc.value = false
    console.log("OnTagDiscovered listener removed")
}

async function stopWaitNdef() {
    await nfc.setOnNdefDiscoveredListener(null)
    waiting_ndef.value = false
    console.log("OnNdefDiscovered listener removed")
}
async function startOrStopWaitNdef() {
    if (waiting_ndef.value) {
        await stopWaitNdef()
    } else {
        await startWaitNdef()
    }
}
async function startOrStopWaitNFC() {
    if (waiting_nfc.value) {
        await stopWaitNFC()
    } else {
        await startWaitNFC()
    }
}
async function writeTxt() {
    try {
        const msg = "Hello!"
        await nfc.writeTag({
            textRecords: [
                {
                    id: [1],
                    text: msg
                }
            ]
        })
        console.log(`writeTxt ${msg} ok`)
        feedback.success({ message: `writeTxt ${msg} ok` })
    } catch (error) {
        console.log(`writeTxt get error ${error}`);
    }
}
async function writeURL() {
    try {
        const url = "https://www.baidu.com"
        await nfc.writeTag({
            uriRecords: [
                {
                    id: [2, 5],
                    uri: url
                }
            ]
        })
        console.log(`writeURL ${url} ok`)
        feedback.success({ message: `writeURL ${url} ok` })
    } catch (error) {
        console.log(`writeURL get error ${error}`);
    }
}

async function erase(){
    try { 
        await nfc.eraseTag()
        console.log(`erase ok`)
        feedback.success({ message: `erase ok` })
    } catch (error) {
        console.log(`writeURL get error ${error}`);
    }
}
</script>
```