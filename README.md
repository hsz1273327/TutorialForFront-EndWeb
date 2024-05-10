# 蓝牙

蓝牙是一种广泛使用的短距离通信技术,移动设备都自带蓝牙.nativescript的蓝牙支持通常是通过社区提供的插件[@nativescript-community/ble](https://github.com/nativescript-community/ble)实现的

本文的例子在[nsv-ble分支]()

## 权限申请

在android中我们需要在`App_Resources/Android/src/main/AndroidManifest.xml`设置.不过注意,以`api 31`为界,设置的方法[会有很大区别](https://developer.android.com/develop/connectivity/bluetooth/bt-permissions).

低于`api 31`的则需要设置这几个权限

+ `BLUETOOTH`,请求连接,接受连接和传输数据
+ `ACCESS_FINE_LOCATION`,用于让别的蓝牙设备扫描时收集到用户的物理位置信息,当你是放出来让别人连时就需要
+ `BLUETOOTH_ADMIN`,用于让应用可以搜索蓝牙设备,修改蓝牙设置,当你是要去连别的蓝牙设备时就需要
+ `ACCESS_BACKGROUND_LOCATION`,用于允许发现附近的蓝牙设备,当你是要去连别的蓝牙设备时就需要

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="__PACKAGE__">
    ...
    <uses-permission android:name="android.permission.BLUETOOTH" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
    <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
    ...
</manifest>
```

而等于高于它的我们需要设置这几个权限:

+ `BLUETOOTH_SCAN`用于搜索蓝牙设备
+ `BLUETOOTH_ADVERTISE`用于让别的设备可以搜索到
+ `BLUETOOTH_CONNECT`用于与别的设备连接通信,即请求连接,接受连接和传输数据
+ `ACCESS_FINE_LOCATION`用于让别的蓝牙设备扫描时收集到用户的物理位置信息
+ 再加上需要向下兼容老设备,我们还需要为低于`api 31`的设备进行额外设置

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="__PACKAGE__">
    ...
    <uses-permission android:name="android.permission.BLUETOOTH"
                     android:maxSdkVersion="30" />
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN"
                     android:maxSdkVersion="30" />

    <uses-permission android:name="android.permission.BLUETOOTH_SCAN" />
    <uses-permission android:name="android.permission.BLUETOOTH_ADVERTISE" />
    <uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

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
        <key>NSBluetoothAlwaysUsageDescription</key>
        <string>enter your bluetooth permission request text here</string>
        ...
    </dict>
    ...
</plist>
```

## 授权

`@nativescript-community/ble`提供了运行时检查是否有授权的接口`bluetooth.hasLocationPermission()=>Promise<boolean>`和申请授权的接口`bluetooth.requestLocationPermission()=>Promise<boolean>`,和其他工具一样,这两个通常搭配使用

```ts
try {
    //先检查是否已经有授权
    const hasPermission = await bluetooth.hasLocationPermission()
    if (!hasPermission) {
        //没有授权就申请授权
        const granted = await bluetooth.requestLocationPermission()
        console.log(`Location permission requested, user granted? ${granted}`)
    } else {
        console.log(`Has Location Permission? ${hasPermission}`)
    }
} catch (error) {
    console.log(`checkPermission get error ${error}`)
}
```

## 打开关闭蓝牙

`@nativescript-community/ble`提供了检查蓝牙是否开启的接口`luetooth.isBluetoothEnabled()=>Promise<boolean>`.

但开启蓝牙的接口`bluetooth.enable()=>Promise<boolean>`仅在android中可用,在ios中我们还是只能给个提示让用户手工打开

```ts

try {
    //先检查是否已经打开
    let enabled = await bluetooth.isBluetoothEnabled()
    if (!enabled) {
        
        if (isAndroid) {
            //android中没打开就打开
            let enabled = await bluetooth.enable()
            console.log(`bluetooth opened`)
        } else {
            //ios中没打开只能提心用户手动打开
            feedback.info({
                message: "please open bluetooth manually"
            })
        }
    } else {
        console.log(`Has enabled? ${enabled}`)
    }
} catch (error) {
    console.log(` get error ${error}`)
}
```

## 蓝牙的使用模式

蓝牙有两种使用模式

1. 调用蓝牙服务,即作为客户端连接调用外部提供服务的蓝牙设备
2. 提供蓝牙服务,即作为服务端提供服务给外部设备特定功能

比如我们用电脑连接蓝牙耳机,电脑的角色就是第一种,鼠标的角色就是第二种

在这个过程中我们需要先了解几个蓝牙服务的概念

1. 设备(`peripheral`),也就是提供蓝牙服务的设备,类似http服务的`hostname`,一般用`UUID`唯一标识.通常有可用服务的设备都会提供一个非`null`的`name`字段用于描述自己,其他元数据包括
    + `localName`字段,和`name`字段含义一样,一些讲究的设备供应商会填
    + `RSSI`字段描述与搜索设备间的信号强弱(单位`dBm`,取值范围为`0~-255`,越大信号越强).
    + `mtu`用于描述可以接受的最大传输单元大小.
    + `manufacturerId`用于描述设备商id,一般没什么用.
    + `services`,用于描述设备上包含的服务列表
    这些元数据信息一般是设备自己提供的,即便是我们自己构造服务也不需要设置.
    在我们搜索设备时还会有字段`state`用于描述设备的连接状态

2. 服务(`service`),真正用于处理请求的逻辑的集合,类似http服务中的服务应用,http中一般同一台机器上不同的服务用端口区分,而蓝牙中使用`UUID`,当然也有个`name`字段用于简单描述用途.最重要的字段`characteristics`提供了服务可用的特征列表

3. 特征(`characteristic`),真正用于处理特定请求的逻辑,类似http服务中的path端点,但和上面一样也是使用`UUID`作为唯一标识,也有个`name`字段用于简单描述用途.特征除了作为端点还会在字段`properties`声明自己支持的操作,主要操作包括
    + `read`: 读消息
    + `write`: 写消息
    + `writeWithoutResponse`: 无响应写消息
    + `notify`: 监听消息
  
设备,服务,特征之间的关系是:

1. 一个设备可以提供多个服务
2. 一个服务可以提供多个特征

nativescript上目前只能通过`@nativescript-community/ble`这个包支持调用蓝牙服务的操作

调用蓝牙服务分为两个步骤

1. 扫描周围的蓝牙设备
2. 连接特定蓝牙设备
3. 与之通信

### 扫描发现附近的蓝牙设备

接口`bluetooth.startScanning(opts:StartScanningOptions)=>Promise<void>`可以用于扫描发现附近的蓝牙设备,其中`StartScanningOptions`满足接口

```ts
interface StartScanningOptions {
    /**
     * 设置过滤器
     */
    filters?: {
        serviceUUID?: string;
        deviceName?: string;
        deviceAddress?: string;
        manufacturerData?: ArrayBuffer;
    }[];
    /**
     * 搜索时长,通常我们不会让设备一直搜索,这样很耗电.
     */
    seconds?: number;
    /**
     * 是否避免重复,如果是则返回找到的第一个,否则返回全部
     */
    avoidDuplicates?: boolean;
    /**
     * 注册一个在找到蓝牙设备时执行的回调
     */
    onDiscovered?: (data: Peripheral) => void;
}

interface Peripheral {
    /**
     * 设备的UUID
     */
    UUID: string;
    /**
     * 设备名
     */
    name: string;
    /**
     * 设备本地名
     */
    localName?: string;
    /**
     * 信号强度
     */
    RSSI?: number;
    /**
     * 可以接受的最大传输单元大小
     */
    mtu?: number;
}

```

我们通常通过钩子`onDiscovered`借助回调函数收集可用设备的蓝牙列表

```ts
const peripheralList: Ref<Peripheral[]> = ref([])
...
await bluetooth.startScanning({
    seconds: 4,
    avoidDuplicates:true,
    onDiscovered: function (peripheral: Peripheral) {
        if (peripheral.name) {
            console.log(`Periperhal found ${JSON.stringify(peripheral)}`)
            peripheralList.value.push(peripheral)
        }
    }
})
```

通常无效设备的`name`字段都是`null`.

如果我们不设置搜索时长`seconds`,我们也可以用接口`bluetooth.stopScanning()=>Promise<void>`来手动关闭搜索

### 连接特定蓝牙设备

我们选好扫描到的设备列表中的设备后就可以使用接口`connect(options: ConnectOptions): Promise<any>`来连接这个蓝牙设备,需要注意只有连接到设备后才能获取这个设备的`service`信息.其中`ConnectOptions`满足接口

```ts

interface ConnectOptions {
    /**
     * 设备的uuid
     */
    UUID: string;
    /**
     * 连接建立好后执行的钩子
     */
    onConnected?: (data: PeripheralConnInfo) => void;
    /**
     * 连接断开后执行的钩子
     */
    onDisconnected?: (data: PeripheralDisConnInfo) => void;
    /**
     * 是否查找全部service,默认false以加快查找
     */
    autoDiscoverAll?: boolean;
    /**
     * 指定查找特定的service
     */
    serviceUUIDs?: string[];
}

// 插件中未定义
interface PeripheralConnInfo {
    UUID: string;
    name: string;
    state: ConnectionState;
    services?: Service[];
    advertismentData: AdvertismentData;

}

// 插件中未定义
interface PeripheralDisConnInfo {
    UUID: string;
    name: string;
}
type ConnectionState = 'connected' | 'connecting' | 'disconnected'
interface Characteristic {
    /**
     * 特性uuid
     */
    UUID: string;
    /**
     * 特性名
     */
    name: string;
    /**
     * 支持的操作.
     */
    properties?: {
        read: boolean;
        write: boolean;
        writeWithoutResponse: boolean;
        notify: boolean;
    };
}
interface Service {
    /**
     * 服务uuid
     */
    UUID: string;
    /**
     * 服务名
     */
    name?: string;
    /**
     * 服务的特征列表
     */
    characteristics?: Characteristic[];
}

interface AdvertismentData {
    localName?: string;
    manufacturerData?: ArrayBuffer;
    manufacturerId?: number;
    serviceUUIDs?: string[];
    serviceData?: {
        [k: string]: ArrayBuffer;
    };
    txPowerLevel?: number;
    flags?: number;
}

```

通常我们使用钩子`onConnected`获取其中的service列表用于指定了进行通信.

建立连接后我们**必须记得**调用接口`bluetooth.disconnect(opt: {UUID: string})=>Promise<void>`关闭连接回收资源,否则一直连着空耗电力

### 与蓝牙设备进行通信进行通信

### 例子

本文参考[这篇文章](https://blog.csdn.net/ncgg123/article/details/134785748)来做一个监听获取米家温度计2数据的应用

