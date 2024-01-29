<template>
    <frame id="main-frame">
        <Page actionBarHidden="true">
            <GridLayout rows="*,30" margin="10" height="100%" borderWidth="5" borderColor="red">
                <VideoPlayer ref="player" src="~/assets/BigBuckBunny.mp4" autoplay="false" controls="true" row="0" />
                <StackLayout orientation="horizontal" row="1">
                    <fab :text="fontFullScreen" class="mdi-ab" @onTap="fullscreen" />
                    <fab :text="fontRepeat" class="mdi-ab" @onTap="repeatseitch" />
                    <fab :text="fontVolumeMute" class="mdi-ab" @onTap="volumemuteswtich" />
                    <Slider v-model="Volume" minValue="0" maxValue="100" width="200" />
                </StackLayout>
            </GridLayout>
        </Page>
    </frame>
</template>
<script lang="ts" setup>
import { ref, watch } from "nativescript-vue"
import { EventData, EventDataValue } from "@nativescript/core/data/observable";
import { Video } from 'nativescript-videoplayer'
const fontRepeatOn = "\uf3ae"
const fontRepeatOff = "\uf3ab"

const fontVolumeOff = "\uf3bb"
const fontVolumeOn = "\uf3ba"

const fontFullScreen = "\uf16d"

const fontVolumeMute = ref(fontVolumeOn)
const Volume = ref(50)
const fontRepeat = ref(fontRepeatOff)
const player = ref()
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
</script>