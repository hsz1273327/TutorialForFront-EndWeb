<template>
    <Frame>
        <Page actionBarHidden="true">
            <ScrollView>
                <StackLayout>
                    <TextView :text="deviceInfo" editable="false" />
                    <TextView :text="screenInfo" editable="false" />
                </StackLayout>
            </ScrollView>
        </Page>
    </Frame>
</template>
  
<script lang="ts" setup>
import { ref, onMounted, onUnmounted, Ref } from "nativescript-vue";
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

onMounted(() => {
    closeFPSMeter.value = startFPSMeter()
})

onUnmounted(() => closeFPSMeter.value())

</script>