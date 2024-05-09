<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Label :text="audiorecorder_available_msg" />
                <Button v-show="!audiorecorder_available" text="申请麦克风授权" @tap="queryPerm" />
                <Button v-show="audiorecorder_available" :text="recordbtntxt" @tap="recordOrPlay" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, computed } from 'nativescript-vue'
import { knownFolders, isAndroid, path } from '@nativescript/core'
import { TNSRecorder, TNSPlayer, AudioRecorderOptions, AudioPlayerOptions } from '@nativescript-community/audio';
// import { Video as VideoPlayer} from 'nativescript-videoplayer'
const audiorecorder_available = ref(false)
const audiorecorder_isRecording = ref(false)
const audiorecorder_hasRecorder = ref(false)
const audiorecorder_isPlaying = ref(false)
const audiorecorder_stoped = ref(false)
const recorder = new TNSRecorder()
const player = new TNSPlayer()
const audiorecorder_available_msg = computed(() => {
    return audiorecorder_available.value ? '有麦克风授权' : '没有麦克风授权'
})

const recordbtntxt = computed(() => {
    if (audiorecorder_hasRecorder.value) {
        if (audiorecorder_isPlaying.value) {
            if (audiorecorder_stoped.value) {
                return "继续播放"
            } else {
                return "暂停播放"
            }
        } else {
            return "开始播放"
        }
    } else {
        return audiorecorder_isRecording.value ? '停止录音' : '开始录音'
    }
})

function check_recorder_status() {
    try {
    let status = recorder.hasRecordPermission()
    console.log(`***********check_recorder_status get status ${status}`)
    audiorecorder_available.value = status
    } catch (error) {
        console.log(`***********check_recorder_status get error ${error.message}`)
    }
}

async function queryPerm() {
    try {
        let p = await recorder.requestRecordPermission()
        console.log(`***********queryPerm get p ${JSON.stringify(p)}`)
        // check_recorder_status()
        audiorecorder_available.value = true
    } catch (error) {
        console.log(`***********queryPerm get error ${error.message}`)
    }

}
const platformExtension = isAndroid ? 'm4a' : 'caf' //mp3
const audioFolder = knownFolders.externalDocuments().getFolder('audio')
const recordingPath = path.join(audioFolder.path, `recording.${platformExtension}`)

async function record() {
    if (audiorecorder_isRecording.value) {
        console.log('audiorecorder_isRecordin is true, stop')
        try {
            await recorder.stop()
            console.log(`ecorder.stop ok`)
        } catch (error) {
            console.log(`ecorder.stop get error ${error.message}`)
        }
        
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
                console.log(`record info get ${JSON.stringify(infoObject)}`)
                audiorecorder_hasRecorder.value=true
            },
            errorCallback: (errorObject) => {
                console.log(`errorCallback get ${JSON.stringify(errorObject)}`);
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
        try {
            await recorder.start(recorderOptions)
            console.log(`recorder.start ok`)
        } catch (error) {
            console.log(`recorder.start get error ${error.message}`)
        }
       
    }
}

async function start_play() {
    try {
        const playerOptions: AudioPlayerOptions = {
            audioFile: recordingPath,
            loop: false,
            completeCallback: async () => {
                await player.dispose();
                audiorecorder_isPlaying.value = false;
                audiorecorder_hasRecorder.value = false;
                console.log('player disposed');
            },
            errorCallback: (errorObject) => {
                console.log(JSON.stringify(errorObject));
                audiorecorder_isPlaying.value = false;
            },
            infoCallback: (args) => {
                console.log(JSON.stringify(args));
            }
        }
        console.log("***********playFromFile")
        await player.playFromFile(playerOptions)
        audiorecorder_isPlaying.value = true;
    } catch (error) {
        console.log(`***********playFromFile get error ${error.message}`)
        audiorecorder_isPlaying.value = false;
    }
}
async function play() {
    console.log("&&&&&&&&&&&&&&&play")
    try {
        if (audiorecorder_isPlaying.value) {
            if (audiorecorder_stoped.value) {
                console.log("&&&&&&&&&&&&&&&resume")
                player.resume()
                audiorecorder_stoped.value = false
            } else {
                console.log("&&&&&&&&&&&&&&&pause")
                await player.pause()
                audiorecorder_stoped.value = true
            }
        } else {
            console.log("&&&&&&&&&&&&&&&start")
            await start_play()
        }
    } catch (error) {
        console.log(`&&&&&&&&&&&&&&&play get error ${error.message}`)
    }
}

async function recordOrPlay() {
    if (audiorecorder_hasRecorder.value) {
        await play()
    } else {
        await record()
    }
}
</script>
