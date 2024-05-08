<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Button text="checkPermission" @tap="checkPermission" />
                <Button :text="ble_opened_msg" @tap="checkOpen" />
                <Button text="scan" @tap="openScan" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, onMounted, $showModal } from 'nativescript-vue'
import { isAndroid } from '@nativescript/core'
import { Feedback, FeedbackPosition } from "nativescript-feedback"
import { Bluetooth } from '@nativescript-community/ble'

const feedback = new Feedback()
const bluetooth = new Bluetooth()

const ble_opened_msg = ref("bluetooth is not open")

async function checkPermission() {
    try {
        const hasPermission = await bluetooth.hasLocationPermission()
        if (!hasPermission) {
            const granted = await bluetooth.requestLocationPermission()
            console.log(`Location permission requested, user granted? ${granted}`)
            await feedback.success({ message: `Location permission requested, user granted? ${granted}` })
        } else {
            console.log(`Has Location Permission? ${hasPermission}`)
            await feedback.success({ message: `Has Location Permission? ${hasPermission}` })
        }
    } catch (error) {
        console.log(`checkPermission get error ${error}`)
        await feedback.error({ message: `checkPermission get error ${error}` })
    }
}

async function checkOpen() {
    if (ble_opened_msg.value == "blue tooth is opened") {
        feedback.info({
            message: "bluetooth already opened"
        })
    } else {
        if (isAndroid) {
            let enabled = await bluetooth.enable()
            feedback.success({
                message: "bluetooth opened"
            })
        } else {
            feedback.info({
                message: "please open bluetooth manually"
            })
        }
    }
}

async function openScan() {
    try {
        await bluetooth.startScanning({
            filters: [{ serviceUUID: '180d' }],
            seconds: 4,
            onDiscovered: function (peripheral) {
                console.log("Periperhal found with UUID: " + peripheral.UUID);
            }
        })
        console.log("scanning complete")
    } catch (err) {
        console.log(`error while scanning: ${err}`);
    }
}

onMounted(async () => {
    let enabled = await bluetooth.isBluetoothEnabled()
    ble_opened_msg.value = enabled ? "bluetooth is opened" : "bluetooth is not open"
})
</script>
