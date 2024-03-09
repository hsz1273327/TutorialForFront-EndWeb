<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Button :text="play_btn_msg" @tap="play" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, computed } from 'nativescript-vue'
import { TNSPlayer, AudioPlayerOptions } from '@nativescript-community/audio';

const playing = ref(false)
const stoped = ref(false)

const play_btn_msg = computed(() => {
    if (playing.value) {
        if (stoped.value) {
            return "继续播放"
        } else {
            return "暂停播放"
        }
    } else {
        return "开始播放"
    }
})

const player = new TNSPlayer()

const filepath = "~/assets/蔡志展-战斗音乐.mp3"


async function start() {
    try {
        const playerOptions: AudioPlayerOptions = {
            audioFile: filepath,
            loop: false,
            completeCallback: async () => {
                await player.dispose();
                playing.value = false;
                console.log('player disposed');
            },
            errorCallback: (errorObject) => {
                console.log(JSON.stringify(errorObject));
                playing.value = false;
            },
            infoCallback: (args) => {
                console.log(JSON.stringify(args));
            }
        }
        console.log("***********playFromFile")
        await player.playFromFile(playerOptions)
        playing.value = true;
    } catch (error) {
        console.log(`***********playFromFile get error ${error.message}`)
        playing.value = false;
    }
}

async function play() {
    console.log("&&&&&&&&&&&&&&&play")
    try {
        if (playing.value) {
            if (stoped.value) {
                console.log("&&&&&&&&&&&&&&&resume")
                player.resume()
                stoped.value = false
            } else {
                console.log("&&&&&&&&&&&&&&&pause")
                await player.pause()
                stoped.value = true
            }
        } else {
            console.log("&&&&&&&&&&&&&&&start")
            await start()
        }
    } catch (error) {
        console.log(`&&&&&&&&&&&&&&&play get error ${error.message}`)
    }

}
</script>
