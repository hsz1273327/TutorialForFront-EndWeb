<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <ListPicker :items="listOfItems" selectedIndex="0" @selectedIndexChange="pickChange" />
                <Button text="impact-LIGHT" @tap="impact(1)" />
                <Button text="impact-MEDIUM" @tap="impact(2)" />
                <Button text="impact-HEAVY" @tap="impact(3)" />
                <Button text="notification-ERROR" @tap="notification_error" />
                <Button text="notification-WARNING" @tap="notification_warning" />
                <Button text="notification-SUCCESS" @tap="notification_success" />
                <Button text="vibrate 3s" @tap="vibrate(3000)" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'nativescript-vue'
import { EventData, EventDataValue } from '@nativescript/core/data/observable'
import { Feedback, FeedbackPosition } from "nativescript-feedback"
import { Haptics,HapticNotificationType } from '@nativescript/haptics'
import { Vibrate } from 'nativescript-vibrate'

let vibrator = new Vibrate();

const feedback = new Feedback();
const isSupported = ref(false)
const listOfItems = ref(["a", "b", "c"])

function pickChange(evt: EventDataValue) {
    console.log(`pick index ${evt.value}`)
    if (isSupported.value) {
        Haptics.selection()
    }
}

function impact(level: number) {
    if (isSupported.value) {
        if ((level > 3) || (level < 1)) {
            Haptics.impact()
        } else {
            Haptics.impact(level)
        }
    }
}

function notification_error(evt: EventData) {
    feedback.error({
        message: "a error",
        position: FeedbackPosition.Top
    })
    if (isSupported.value) {
        Haptics.notification(HapticNotificationType.ERROR)
    }
    console.log("notification_error ok")
}
function notification_warning(evt: EventData) {
    feedback.warning({
        message: "a warning",
        position: FeedbackPosition.Top
    })
    if (isSupported.value) {
        Haptics.notification(HapticNotificationType.WARNING)
    }
    console.log("notification_warning ok")
}
function notification_success(evt: EventData) {
    feedback.success({
        message: "a success",
        position: FeedbackPosition.Top
    })
    if (isSupported.value) {
        Haptics.notification(HapticNotificationType.SUCCESS)
    }
    console.log("notification_success ok")
}
function vibrate(ms:number){
    vibrator.vibrate(ms)
}

onMounted(() => {
    if (Haptics.isSupported()) {
        feedback.info({
            message: "Haptics is Supported",
            position: FeedbackPosition.Top
        })
        isSupported.value = true
        console.log("Haptics is Supported")
    } else {
        feedback.warning({
            message: "Haptics is not Supported",
            position: FeedbackPosition.Top
        })
        console.log("Haptics is not Supported")
    }
})
</script>
