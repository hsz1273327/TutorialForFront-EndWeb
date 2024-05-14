<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <TextField v-model="textFieldValue" hint="输入要读出的文字" @returnPress="startTTS"/>
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref } from 'nativescript-vue'
import { EventDataValue } from "@nativescript/core/data/observable"
import { TNSTextToSpeech, SpeakOptions } from '@nativescript-community/texttospeech';

const TTS = new TNSTextToSpeech();

const textFieldValue = ref("测试tts")
async function startTTS(evt:EventDataValue){
    const speakOptions: SpeakOptions = {
        text: textFieldValue.value, /// *** required ***
        speakRate: 0.5, // optional - default is 1.0
        pitch: 1.0, // optional - default is 1.0
        volume: 1.0, // optional - default is 1.0
        locale: 'zh-CN'
    }
    try {
        await TTS.speak(speakOptions)
        console.log("tts ok")
    } catch (error) {
        console.log(`tts get error ${error}`)
    }
}
</script>
