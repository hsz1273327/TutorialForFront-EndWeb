<template>
    <Frame>
        <Page actionBarHidden="true">
            <ScrollView>
                <StackLayout>
                    <TextView :text="deviceInfo" editable="false" />
                    <TextView :text="screenInfo" editable="false" />
                    <TextView :text="connectInfo" editable="false" />
                </StackLayout>
            </ScrollView>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "nativescript-vue";
import { Utils } from "@nativescript/core"
import { Device } from "@nativescript/core"
import { Screen } from '@nativescript/core'
import {
    removeCallback,
    start,
    stop,
    addCallback,
    running,
} from '@nativescript/core/fps-meter'
import { Connectivity } from '@nativescript/core'
import * as geolocation from '@nativescript/geolocation'
import { CoreTypes } from '@nativescript/core' // used to describe at what accuracy the location should get


const isRealDevice = Utils.isRealDevice() ? "是" : "不是"

const deviceType: string = Device.deviceType // Phone
const os: string = Device.os // 系统
const osVersion: string = Device.osVersion // 版本
const region: string = Device.region // ES
const language: string = Device.language // 语言,"en"
const manufacturer: string = Device.manufacturer // 制造商
const model: string = Device.model //型号
const uuid: string = Device.uuid

const deviceInfo = ref(`本设备${isRealDevice}真实设备,本设备为${deviceType},型号${model},系统为${os}-${osVersion},制造商为${manufacturer},设备ID为${uuid},当前地区为${region},语言为${language}`)

const heightPixels: number = Screen.mainScreen.heightPixels
const widthPixels: number = Screen.mainScreen.widthPixels
const scale: number = Screen.mainScreen.scale
const heightDIPs: number = Screen.mainScreen.heightDIPs
const widthDIPs: number = Screen.mainScreen.widthDIPs
const screenInfo = ref(`本设备屏幕像素${heightPixels}x${widthPixels},屏幕密度${scale},屏幕dip尺寸${heightDIPs}x${widthDIPs}`)


const closeFPSMeter = ref(() => { })
function startFPSMeter(): () => void {
    const callbackId = addCallback((fps: number, minFps: number | undefined) => {
        console.log(`Frames per seconds: ${fps.toFixed(2)}`)
        console.log(minFps?.toFixed(2))
    })

    start()
    console.log('Is running: ', running())

    return () => {
        removeCallback(callbackId)
        stop()
    }
}



const connectionType: number = Connectivity.getConnectionType()
let con_type = "none"
switch (connectionType) {
    case Connectivity.connectionType.none:
        {//0,未连接
            con_type = "none"
        }
        break;
    case Connectivity.connectionType.wifi:
        {//1,连接了wifi
            con_type = "wifi"
        }
        break;
    case Connectivity.connectionType.mobile:
        {//2,连接了移动流量
            con_type = "mobile"
        }
        break;
    case Connectivity.connectionType.ethernet:
        {//3,连接了以太网
            con_type = "ethernet"
        }
        break;
    case Connectivity.connectionType.bluetooth:
        {//4,连接了蓝牙
            con_type = "bluetooth"
        }
        break;
    case Connectivity.connectionType.vpn:
        {//5,连接了vpn
            con_type = "vpn"
        }
        break;
}

const connectInfo = ref(`当前设备网络连接类型为${con_type}`)

const connectChangeMonitor = (change: number) => {
    switch (change) {
        case Connectivity.connectionType.wifi:
            {
                connectInfo.value = `当前设备网络连接类型为wifi`
            }
            break
        case Connectivity.connectionType.ethernet:
            {
                connectInfo.value = `当前设备网络连接类型为ethernet`
            }
            break
        case Connectivity.connectionType.mobile:
            {
                connectInfo.value = `当前设备网络连接类型为mobile`
            }
            break
        case Connectivity.connectionType.bluetooth:
            {
                connectInfo.value = `当前设备网络连接类型为bluetooth`
            }
            break
        case Connectivity.connectionType.vpn:
            {
                connectInfo.value = `当前设备网络连接类型为vpn`
            }
            break
        default:
            {
                connectInfo.value = `当前设备网络连接类型为none`
            }
            break
    }
}
geolocation.enableLocationRequest().then(() => {
        geolocation
            .getCurrentLocation({
                desiredAccuracy: CoreTypes.Accuracy.high,
                maximumAge: 5000,
                timeout: 20000,
            })
            .then((currentLocation) => {
                console.log('My current latitude: ', currentLocation.latitude)
                console.log('My current longitude: ', currentLocation.longitude)
            })
    })

onMounted(() => {
    closeFPSMeter.value = startFPSMeter()
    Connectivity.startMonitoring(connectChangeMonitor)
    
})

onUnmounted(() => {
    closeFPSMeter.value()
    Connectivity.stopMonitoring()
})
</script>
