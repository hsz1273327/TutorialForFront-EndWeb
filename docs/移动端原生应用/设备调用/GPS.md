# GPS

GPS即全球定位系统,是美国搞出来的地理位置服务,当然了国内也有北斗,不过一般我们还是当它是GPS.
一般手机都会自带GPS的接收器,这也就让那些打车应用成了现实.

对GPS的调用我们可以使用官方插件[@nativescript/geolocation](https://docs.nativescript.org/plugins/geolocation).需要注意该插件在android下需要设置`kotlinVersion`>`1.9.0`否则会引起版本冲突报错.

本文的例子在[nsv-gps](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/nsv-gps)

## 权限申请

位置信息一样是需要权限的

+ `android`: `App_Resources/Android/src/main/AndroidManifest.xml`

    ```xml
    <manifest xmlns:android="http://schemas.android.com/apk/res/android" package="__PACKAGE__">
        ...
        <!-- Always include this permission -->
        <!-- This permission is for "approximate" location data -->
        <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

        <!-- Include only if your app benefits from precise location access. -->
        <!-- This permission is for "precise" location data -->
        <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

        <!-- Required only when requesting background location access on
            Android 10 (API level 29) and higher. -->
        <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
        ...
    </manifest>
    ```

+ `ios`: `App_Resources/iOS/Info.plist`

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
        ...
        <key>UIBackgroundModes</key>
        <array>
        <string>location</string>
        </array>
        ...
    </dict>
    </plist>
    ```

## 授权

在声明有权限需求外,我们还需要征得用户同意才可以获取位置信息,毕竟这其实算隐私

`enableLocationRequest(always?: boolean, openSettingsIfLocationHasBeenDenied?: boolean)=>Promise<void>`接口可以用于弹出一个弹窗向用户询问是否允许获取位置信息.

其中`always`设置为`true`会让弹出框中带有选项的系统对话框`allow all the time`,它会让权限请求通过的效果一直生效,这需要前一步中设置的权限

+ android下则是
    + `android.permission.ACCESS_BACKGROUND_LOCATION`
+ ios下则是

    + `NSLocationAlwaysAndWhenInUseUsageDescription (iOS 11.0+)`或`NSLocationAlwaysUsageDescription (iOS 8.0-10.0)`
    + `NSLocationWhenInUseUsageDescription`

其中`openSettingsIfLocationHasBeenDenied`为`true`并且`该权限之前已被拒绝`,则`设置`应用程序将打开以便用户可以更改位置服务权限.

我们可以使用`isEnabled(options?: Options)=>boolean`接口获得当前是否有地理位置信息权限.

## 用法

地理位置信息满足接口

```ts
interface Location {

    latitude: number; //纬度
    longitude: number; //经度
    altitude: number; //高度
    horizontalAccuracy: number; //水平精度
    verticalAccuracy: number; //垂直精度
    speed: number; //速度
    direction: number; //方向
    timestamp: Date; //返回位置的时候的时间
}
```

通常我们要么单次的获取位置信息,要么监听位置变更.

### 获取位置信息

接口`getCurrentLocation(options: Options)=>Promise<Location>`,其中的`Options`满足接口

```ts
interface Options {
    /**
     * 通常用`CoreTypes.Accuracy`设置,指定精度.默认`CoreTypes.Accuracy.high`即高精度.如果要省电可以设置为`CoreTypes.Accuracy.any`(精度约为100米)
     */
    desiredAccuracy?: number;
    /**
     * 位置数据的最长存在时间,单位ms.
     */
    maximumAge?: number;
    /**
     * 表示等待结果的最大时长,默认为5minutes,单位ms
     */
    timeout?: number;
}
```

```ts
geolocation.getCurrentLocation({
    desiredAccuracy: CoreTypes.Accuracy.high,
    maximumAge: 5000,
    timeout: 20000,
}).then((currentLocation:Location) => {
    console.log('My current latitude: ', currentLocation.latitude)
    console.log('My current longitude: ', currentLocation.longitude)
    geoInfo.value = `My current latitude: ${currentLocation.latitude} and current longitude: ${currentLocation.longitude}`
})
```

### 监听位置信息变更

接口`watchLocation(successCallback: successCallbackType, errorCallback: errorCallbackType, options?: Options)`,其中的`Options`满足接口

```ts
interface Options {
    /**
     * 通常用`CoreTypes.Accuracy`设置,指定精度.默认`CoreTypes.Accuracy.high`即高精度.如果要省电可以设置为`CoreTypes.Accuracy.any`(精度约为100米)
     */
    desiredAccuracy?: number;

    /**
     * 指定更新位置的频率,更新距离过滤器(以米为单位)
     */
    updateDistance?: number;

    /**
     * 位置更新之间的时间间隔,以毫秒为单位(在 iOS 上忽略)
     */
    updateTime?: number;

    /**
     * 位置更新之间的最小时间间隔,以毫秒为单位(在 iOS 上忽略)
     */
    minimumUpdateTime?: number;

    /**
     * 位置数据的最长存在时间,单位ms.
     */
    maximumAge?: number;

    /**
     * 表示等待结果的最大时长,默认为5minutes,单位ms
     */
    timeout?: number;

    /**
     * 设置是否允许应用程序在后台接收位置更新(在 Android 上忽略).默认为`false`. 如果启用需要ios上设置权限`UIBackgroundModes`
     */
    iosAllowsBackgroundLocationUpdates?: boolean;

    /**
     * 设置是否允许停用位置更新的自动暂停(在 Android 上被忽略)
     */
    iosPausesLocationUpdatesAutomatically?: boolean;
}
```

`successCallback`的参数就是上面的`Location`,其签名为

```ts
declare type successCallbackType = (location: Location) => void;
```

而`errorCallback`的签名为

```ts
declare type errorCallbackType = (error: Error) => void;
```

### `*`获取位置编码信息

所谓位置编码信息指的是一个经纬度坐标点对应的地址信息(国家地区,省市街道门牌号,小区等).其形式满足如下接口:

```ts
interface Location {
    latitude: number; //纬度
    longitude: number; //经度
    name: string; // 位置名
    isoCountryCode: string; //缩写的国家名称
    country: string; //国家名
    postalCode: string; //邮政编码
    administrativeArea: string; //省级行政单位
    subAdministrativeArea: string; // 省级行政单位的下级行政单位
    locality: string; //市级行政单位
    subLocality: string; // 市级行政单位的下级行政单位
    thoroughfare: string; //街道
    subThoroughfare: string; //街道的下级行政单位
}
```

社区提供了插件[@nativescript-community/geocoding](https://github.com/nativescript-community/geocoding)用于调用系统sdk(android:`android.location.Geocoder`;ios:`CLGeocoder`)

它通常有两种用法:

+ `getLocationFromName(searchString: string): Promise<Location>`或`getLocationListFromName(searchString: string, maxResCount?: number)`给地址来反推它的经纬度坐标
+ `getFromLocation(latitude: number, longitude: number, maxResCount?: number): Promise<Location[]>`给一个经纬度坐标来推断它对应的地址(常用)

不过很遗憾,android上在国内时无法使用的因为它需要google框架.因此跨平台应用通常会更加倾向于使用第三方应用或远端地图服务来获取反推的位置信息,这个后面在调用外部应用服务部分我们再详细介绍.

### 例子

我们来获取当前的经纬度

+ `views/Home.vue`

```vue
<template>
    <Frame>
        <Page actionBarHidden="true">
            <ScrollView>
                <StackLayout>
                    <Button text="获取当前位置信息" @tap="onActionTap" />
                    <TextView :text="geoInfo" editable="false" />
                </StackLayout>
            </ScrollView>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref } from "nativescript-vue";
import { isEnabled, enableLocationRequest, getCurrentLocation, Location } from '@nativescript/geolocation'
import { getFromLocation, Location as geocodeLocation } from '@nativescript-community/geocoding';
import { CoreTypes, isAndroid } from '@nativescript/core' // used to describe at what accuracy the location should get


const geoInfo = ref("未获得地理位置信息")
async function getLocalInfo(): Promise<Location> {
    try {
        if (!isEnabled()) {
            console.log('enableLocationRequest')
            await enableLocationRequest()
        }
        console.log('getCurrentLocation')
        let currentLocation = await getCurrentLocation({
            desiredAccuracy: CoreTypes.Accuracy.high,
            maximumAge: 5000,
            timeout: 20000,
        })
        console.log('My current latitude: ', currentLocation.latitude)
        console.log('My current longitude: ', currentLocation.longitude)
        return currentLocation

    } catch (error) {
        console.log(`getLocalInfo get error: ${error}`)
    }
}
async function getGeoCodeLocation(local: Location): Promise<geocodeLocation[]> {
    if (isAndroid) {
        // android下需要谷歌框架,国内就放弃吧
        return []
    } else {
        try {
            let locations = await getFromLocation(local.latitude, local.longitude, 5)
            console.log(`getGeoCodeLocation Found ${locations.length} place`)
            return locations
        } catch (error) {
            console.log(`getGeoCodeLocation get error: ${error}`)
            return []
        }
    }
}
async function onActionTap() {
    let currentLocation = await getLocalInfo()
    let foundplaces = await getGeoCodeLocation(currentLocation)
    let msg = `My current latitude: ${currentLocation.latitude}\n
    current longitude: ${currentLocation.longitude}\n`
    if (foundplaces.length >0){
        msg += "found place: \n"
        for (let place of foundplaces){
            msg += `${place.name} in ${place.country} ${place.administrativeArea} ${place.locality}\n`
        }
    }
    geoInfo.value = msg
}
</script>

```