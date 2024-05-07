<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Label :text="audiorecorder_available_msg" />
                <Button v-show="!audiorecorder_available" text="申请麦克风授权" @tap="queryPerm" />
                <Button v-show="audiorecorder_available" :text="recordbtntxt" @tap="recordOrPlayer" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, computed } from 'nativescript-vue'
import { knownFolders, isAndroid,path } from '@nativescript/core'
import { TNSRecorder, AudioRecorderOptions } from '@nativescript-community/audio';
// import { Video as VideoPlayer} from 'nativescript-videoplayer'
const audiorecorder_available = ref(false)
const audiorecorder_isRecording = ref(false)
const audiorecorder_hasRecorder = ref(false)
const audiorecorder_isPlaying = ref(false)
const recorder = new TNSRecorder();
const audiorecorder_available_msg = computed(() => {
    return audiorecorder_available.value ? '有麦克风授权' : '没有麦克风授权'
})

const recordbtntxt = computed(() => {
    if (audiorecorder_hasRecorder.value){
        return audiorecorder_isPlaying.value? '停止播放':'开始播放'
    }else{
        return audiorecorder_isRecording.value ? '停止录音' : '开始录音'
    }
})

function check_recorder_status() {
    let status = recorder.hasRecordPermission()
    audiorecorder_available.value = status
}

async function queryPerm() {
    await recorder.requestRecordPermission()
    check_recorder_status()
}
const platformExtension = isAndroid?'m4a' : 'caf' //mp3
const audioFolder = knownFolders.externalDocuments().getFolder('audio')
const recordingPath = path.join(audioFolder.path,`recording.`)`${audioFolder.path}/recording.${platformExtension}`
async function record() {
    if (audiorecorder_isRecording.value) {
        await recorder.stop()
        audiorecorder_isRecording.value = false
    } else {
        if (!TNSRecorder.CAN_RECORD()) {
            console.log('This device cannot record audio.')
            return
        }
        
        const recorderOptions: AudioRecorderOptions = {
            filename: recordingPath,
            sampleRate: 48000,
            metering: true,
            infoCallback: (infoObject) => {
                console.log(JSON.stringify(infoObject));
            },

            errorCallback: (errorObject) => {
                console.log(JSON.stringify(errorObject));
            }
        }
        if (isAndroid) {
            // m4a
            // static constants are not available, using raw values here
            // androidFormat = android.media.MediaRecorder.OutputFormat.MPEG_4;
            let androidFormat = 2;
            // androidEncoder = android.media.MediaRecorder.AudioEncoder.AAC;
            let androidEncoder = 3;

            Object.assign(recorderOptions, {
                format: androidFormat,
                android: {
                    encoder: androidEncoder
                }
            })
        }
        audiorecorder_isRecording.value = true
        await recorder.start(recorderOptions)
    }
}

async function play()

</script>
