<template>
    <Frame>
        <Page actionBarHidden="true">
            <TextView :text="deviceInfo" editable="false" />
        </Page>
    </Frame>
</template>
  
<script lang="ts" setup>
import { ref } from "nativescript-vue";
import { Utils } from "@nativescript/core"
import { Device } from "@nativescript/core"

console.log(`is Real Device: ${Utils.isRealDevice()}`)

const deviceType: string = Device.deviceType // Phone
const os: string = Device.os // 系统
const osVersion: string = Device.osVersion // 版本
const region: string = Device.region // ES
const language: string = Device.language // 语言,"en"
const manufacturer: string = Device.manufacturer // 制造商
const model: string = Device.model //型号
const uuid: string = Device.uuid

const deviceInfo = ref(`本设备为${deviceType},型号${model},系统为${os}-${osVersion},制造商为${manufacturer},设备ID为${uuid},当前地区为${region},语言为${language}`)
</script>

