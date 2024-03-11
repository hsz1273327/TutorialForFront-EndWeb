<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Label :text="cam_available_msg" />
                <Button v-show="!cam_available" text="申请摄像头授权" @tap="queryCamPerm" />
                <Button v-show="cam_available" text="录段视频" @tap="takePhoto" />
                
                <GridLayout rows="*,30" margin="10" height="100%" borderWidth="5" borderColor="red">
                <VideoPlayer ref="player" src="~/assets/BigBuckBunny.mp4" autoplay="false" controls="true" row="0" />
                <StackLayout orientation="horizontal" row="1">
                    <fab :text="fontFullScreen" class="mdi-ab" @onTap="fullscreen" />
                    <fab :text="fontRepeat" class="mdi-ab" @onTap="repeatseitch" />
                    <fab :text="fontVolumeMute" class="mdi-ab" @onTap="volumemuteswtich" />
                    <Slider v-model="Volume" minValue="0" maxValue="100" width="200" />
                </StackLayout>
            </GridLayout>
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, computed,watch } from 'nativescript-vue'
import {EventData} from '@nativescript/core'
import { VideoRecorder, Options as VideoRecorderOptions } from '@triniwiz/nativescript-videorecorder'
import { Video } from 'nativescript-videoplayer'
const cam_available = ref(false)
const player = ref()

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
const fontRepeatOn = "\uf3ae"
const fontRepeatOff = "\uf3ab"

const fontVolumeOff = "\uf3bb"
const fontVolumeOn = "\uf3ba"

const fontFullScreen = "\uf16d"
const fontVolumeMute = ref(fontVolumeOn)
const Volume = ref(50)
const fontRepeat = ref(fontRepeatOff)
let latest_volume = Volume.value
watch(Volume, (newVolume) => {
    console.log(`volumechange to ${newVolume}`)
    if (fontVolumeMute.value != fontVolumeOff && Volume.value == 0) {
        fontVolumeMute.value = fontVolumeOff
    }
    let video = player.value._nativeView as Video
    video.setVolume(newVolume / 100)
})

function volumemuteswtich(evt: EventData) {
    console.log("volumemuteswtich")
    fontVolumeMute.value = fontVolumeMute.value == fontVolumeOn ? fontVolumeOff : fontVolumeOn

    if (fontVolumeMute.value == fontVolumeOff && Volume.value != 0) {
        latest_volume = Volume.value
        Volume.value = 0
    }
    if (fontVolumeMute.value == fontVolumeOn && latest_volume != 0) {
        Volume.value = latest_volume
    }
    let video = player.value._nativeView as Video
    if (fontVolumeMute.value == fontVolumeOn) {
        video.mute(true)
    } else {
        video.mute(false)
    }
}
function repeatseitch(evt: EventData) {
    console.log("repeatseitch")
    fontRepeat.value = fontRepeat.value == fontRepeatOn ? fontRepeatOff : fontRepeatOn
    let video = player.value._nativeView as Video
    if (fontRepeat.value == fontRepeatOn) {
        video.loop = true
    } else {
        video.loop = false
    }

}
let LANDSCAPE = false
function fullscreen(evt: EventData) {
    console.log("fullscreen")
    let video = player.value._nativeView as Video
    if (LANDSCAPE) {
        video.setMode("PORTRAIT", false)
        LANDSCAPE = false
    } else {
        video.setMode("LANDSCAPE", true)
        LANDSCAPE = true
    }
}

async function takePhoto() {
    try {
        const video = player.value._nativeView as Video
        const options: VideoRecorderOptions = {
            hd: true,
            saveToGallery: false
        }
        const result = await videorecorder.record(options)
        console.log(`Result is an video record in file ${result.file}`)
        video.src = result.file
        // set loop
        video.loop = false
        has_record.value = true
        console.log(`set video ok`)
    } catch (error) {
        console.log(`Error -> ${error.message["android.permission.WRITE_EXTERNAL_STORAGE"]}`)
    }
}
</script>
