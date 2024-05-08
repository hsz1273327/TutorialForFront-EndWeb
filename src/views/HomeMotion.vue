<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Button :text="WatchMotionbtn" @tap="startOrStopWatchMotion" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'nativescript-vue'
import { isAndroid } from '@nativescript/core'
import { Feedback, FeedbackPosition } from "nativescript-feedback"
import { activityRecognition, activityEvent, ACTIVITY_TYPE, ActivityRecognitionEvent } from '@nativescript-community/motion-activity'
import { request } from '@nativescript-community/perms'
const feedback = new Feedback();

const isWatchingMotion = ref(false)

const WatchMotionbtn = computed(() => {
    return isWatchingMotion.value ? "stop Watching Motion" : "start Watching Motion"
})

function onActivityEvent(eventData: ActivityRecognitionEvent) {
    const activityType = eventData.activity.type;
    const activityConfidence = eventData.activity.confidence;
    console.log(`onActivityEvent ${activityType} ${ACTIVITY_TYPE[activityType]} ${activityConfidence}`)
}

async function startWatchMotion() {
    if (isAndroid && android.os.Build.VERSION.SDK_INT >= 29) {
        // on android >= 29 you need to request permission at runtime
        const result = await request('android.permission.ACTIVITY_RECOGNITION');
        if (result[0] !== 'authorized') {
            feedback.error({
                message: `missing ACTIVITY_RECOGNITION permission: ${result[0]}`,
                position: FeedbackPosition.Top
            })
            return
        }
    }
    try {
        isWatchingMotion.value = true
        await activityRecognition.start()
        console.log('start Watch Motion');
    } catch (error) {
        isWatchingMotion.value = false
        console.error(error);
    }
}

async function stopWatchMotion() {
    try {
        isWatchingMotion.value = false
        await activityRecognition.stop();
        console.log('stop Watch Motion');
    } catch (error) {
        isWatchingMotion.value = true
        console.error(error);
    }
}

async function startOrStopWatchMotion() {
    if (isWatchingMotion.value) {
        await stopWatchMotion()
    } else {
        await startWatchMotion()
    }
}

onMounted(() => {
    activityRecognition.on(activityEvent, onActivityEvent);
})
</script>
