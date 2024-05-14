
# TTS

所谓TTS即Text to speech,文本转语音,社区提供了包[@nativescript-community/texttospeech](https://github.com/nativescript-community/texttospeech)用于支持该功能.

注意这是一个包不是插件,我们只能用npm安装.

本文例子在[nsv-TTS分支](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/nsv-TTS)

## 用法

用法很简单,调用接口`TTS.speak(options: SpeakOptions): Promise<void>`,其中`SpeakOptions`满足接口

```ts
interface SpeakOptions {
    text: string; //要说出的文本信息
    queue?: boolean; //是否进入队列
    pitch?: number; //音高
    speakRate?: number; //语速
    volume?: number; // 音量
    locale?: string; // 语言,一般中文就是zh_CN
    finishedCallback?: Function; //结束时触发的回调
    audioMixing?: boolean; //是否混合音轨
}
```

## 例子

这个例子会在我们输入完文本后开始阅读我们输入的文本

```vue
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
```
