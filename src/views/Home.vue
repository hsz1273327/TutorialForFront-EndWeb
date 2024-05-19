<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Label :text="speechRecognition_available_msg" />
                <Label :text="speechRecognition_hasperm_msg" />
                <Button v-show="!speechRecognition_hasperm" text="申请授权" @tap="queryPerm" />
                <Button v-show="speechRecognition_sys_available" :text="startOrStopRecognition_msg"
                    @tap="startOrStopRecognition" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { Feedback } from "nativescript-feedback"
import { ref, onMounted, computed } from 'nativescript-vue'
import { SpeechRecognition, SpeechRecognitionTranscription } from "nativescript-speech-recognition";
const speechRecognition = new SpeechRecognition()

const feedback = new Feedback()

const speechRecognition_sys_available = ref(false)
const speechRecognition_available_msg = computed(() => {
    if (speechRecognition_sys_available.value) {
        return "使用系统语音识别"
    }
    return "无法使用语音识别"
})
const speechRecognition_hasperm = ref(false)
const speechRecognition_hasperm_msg = computed(() => {
    return speechRecognition_hasperm.value ? '有授权' : '没有授权'
})

const listening = ref(false)
const startOrStopRecognition_msg = computed(() => {
    return listening.value ? '停止识别' : '开始识别'
})


async function queryPerm() {
    try {
        const granted = await speechRecognition.requestPermission()
        speechRecognition_hasperm.value = true
        console.log("Granted? " + granted)
    } catch (error) {
        console.log(`***********queryPerm get error ${error.message}`)
    }
}

async function startRecognition() {
    if (speechRecognition_sys_available.value) {
        try {
            await speechRecognition.startListening({
                // optional, uses the device locale by default
                locale: "zh-CN",
                // set to true to get results back continuously
                // returnPartialResults: true,
                // this callback will be invoked repeatedly during recognition
                onResult: async (transcription: SpeechRecognitionTranscription) => {
                    console.log(`User said: ${transcription.text}`);
                    console.log(`User finished?: ${transcription.finished}`);
                    await feedback.info({
                        message: `User said: ${transcription.text}`
                    })
                    if (transcription.finished) {
                        listening.value= false
                    }
                },
                onError: async (error: string | number) => {
                    // because of the way iOS and Android differ, this is either:
                    // - iOS: A 'string', describing the issue. 
                    // - Android: A 'number', referencing an 'ERROR_*' constant from https://developer.android.com/reference/android/speech/SpeechRecognizer.
                    //            If that code is either 6 or 7 you may want to restart listening.
                    console.log(`speechRecognition get error ${error}`);
                    await feedback.error({
                        message: `speechRecognition get error ${error}`
                    })
                }
            })
            listening.value = true
        } catch (error) {
            console.log(`speechRecognition.startListening get error ${error}`);
            await feedback.error({
                message: `speechRecognition.startListening get error ${error}`
            })
        }
    } else {
        console.log(`speechRecognition.startListening not available`);
    }
}
async function stopRecognition() {
    if (listening.value) {
        try {
            await speechRecognition.stopListening()
            console.log(`stopped listening`)
            listening.value = false
        } catch (error) {
            console.log(`Stop error: ${error}`)
            await feedback.error({
                message: `Stop error: ${error}`
            })
        }
    }
}

async function startOrStopRecognition() {
    if (listening.value) {
        await stopRecognition()
    } else {
        await startRecognition()
    }
}


onMounted(async () => {
    try {
        const sys_available = await speechRecognition.available()
        console.log(`speechRecognition.available ${sys_available}`)
        speechRecognition_sys_available.value = sys_available
    } catch (error) {
        console.log("speechRecognition.available get error ${error}")
    }
})
</script>
