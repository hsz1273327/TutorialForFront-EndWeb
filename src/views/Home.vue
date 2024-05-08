<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Button :text="WatchAccelerometerbtn" @tap="startOrStopWatchAccelerometer" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref } from 'nativescript-vue'
import { isAndroid } from '@nativescript/core'
import { Feedback, FeedbackPosition } from "nativescript-feedback"
import { request } from '@nativescript-community/perms'
import { startAccelerometerUpdates, stopAccelerometerUpdates, AccelerometerData, isListening } from '@triniwiz/nativescript-accelerometer'

const feedback = new Feedback();
const WatchAccelerometerbtn = ref("start Watching Accelerometer")

function onActivityEvent(eventData: AccelerometerData) {
    console.log(`onActivityEvent ${JSON.stringify(eventData)}`)
}

async function startWatchAccelerometer() {
    if (isAndroid && android.os.Build.VERSION.SDK_INT >= 29) {
        // on android >= 29 you need to request permission at runtime
        const result = await request('android.permission.ACTIVITY_RECOGNITION')
        if (result[0] !== 'authorized') {
            feedback.error({
                message: `missing ACTIVITY_RECOGNITION permission: ${result[0]}`,
                position: FeedbackPosition.Top
            })
            return
        }
    }
    try {
        console.log('start Watch Motion');
        startAccelerometerUpdates(onActivityEvent, { sensorDelay: "normal" })
        WatchAccelerometerbtn.value = "stop Watching Accelerometer"
    } catch (error) {
        console.error(error);
    }
}

function stopWatchAccelerometer() {
    try {
        stopAccelerometerUpdates()
        WatchAccelerometerbtn.value = "start Watching Accelerometer"
        console.log('stop Watch Motion')
    } catch (error) {
        console.error(error);
    }
}

async function startOrStopWatchAccelerometer() {
    if (isListening()) {
        await stopWatchAccelerometer()
    } else {
        await startWatchAccelerometer()
    }
}
</script>
