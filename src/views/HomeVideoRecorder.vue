<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Label :text="cam_available_msg" />
                <Button v-show="!cam_available" text="申请摄像头授权" @tap="queryCamPerm" />
                <Button v-show="cam_available" text="拍张照片" @tap="takePhoto" />
                <!-- <VideoPlayer v-show="has_record" ref="video_player" autoplay="false" controls="true" width="100" height="100" /> -->
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, computed } from 'nativescript-vue'
import { VideoRecorder, Options as VideoRecorderOptions } from '@triniwiz/nativescript-videorecorder'
// import { Video as VideoPlayer} from 'nativescript-videoplayer'
const cam_available = ref(false)
const video_player = ref()

const cam_available_msg = computed(() => {
    return cam_available.value ? '有可用摄像头' : '没有可用摄像头'
})

const has_record = ref(false)

const videorecorder = new VideoRecorder()

function check_cam_status() {
    let status = VideoRecorder.isAvailable()
    cam_available.value = status
}

async function queryCamPerm() {
    await videorecorder.requestPermissions()
    check_cam_status()
}

async function takePhoto() {
    try {
        // const image = video_player.value._nativeView as VideoPlayer
        const options: VideoRecorderOptions = {
            hd: true,
            saveToGallery: false
        }
        const result = await videorecorder.record(options)
        console.log("Result is an video record")
        // image.src = result.file
        // has_record.value = true
    } catch (error) {
        console.log(`Error -> ${error.message["android.permission.WRITE_EXTERNAL_STORAGE"]}`)
    }
}
</script>
