<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Button text="check Available" @tap="checkAvailable" />
                <Button :text="startOrStopWaitNdef_btn" @tap="startOrStopWaitNdef" />
                <Button v-show="isAndroid" :text="startOrStopWaitTag_btn" @tap="startOrStopWaitNFC" />
                <Button v-show="isAndroid" text="写入文本" @tap="writeTxt" />
                <Button v-show="isAndroid" text="写入url" @tap="writeURL" />
                <Button v-show="isAndroid" text="擦除数据" @tap="erase" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, computed } from 'nativescript-vue'
import { isAndroid } from "@nativescript/core"
import { Feedback } from "nativescript-feedback"
import { Nfc, NfcNdefData, NfcTagData } from "nativescript-nfc"

const feedback = new Feedback()
const nfc = new Nfc()

const waiting_nfc = ref(false)
const waiting_ndef = ref(false)

const startOrStopWaitTag_btn = computed(() => {
    if (waiting_nfc.value) {
        return "结束识别nfc卡"
    } else {
        return "开始识别nfc卡"
    }
})
const startOrStopWaitNdef_btn = computed(() => {
    if (waiting_ndef.value) {
        return "结束读取nfc卡"
    } else {
        return "开始读取nfc卡"
    }
})

async function checkAvailable() {
    let nfc_avail_msg
    let avail = await nfc.available()
    if (avail) {
        let enabled = await nfc.enabled()
        if (enabled) {
            nfc_avail_msg = "NFC is available"
            feedback.success({ message: nfc_avail_msg })
        } else {
            nfc_avail_msg = "NFC is not enabled"
            feedback.warning({ message: nfc_avail_msg })
        }
    } else {
        nfc_avail_msg = "NFC is not available"
        feedback.error({ message: nfc_avail_msg })
    }
}
async function startWaitNdef() {
    await nfc.setOnNdefDiscoveredListener((data: NfcNdefData) => {
        if (data.message) {
            for (let m in data.message) {
                let record = data.message[m];
                console.log(
                    "Ndef discovered! Message record: " + record.payloadAsString
                )
                feedback.success({ message: `Discovered a Message ${record.payloadAsString}` })
            }
        }
    }, { stopAfterFirstRead: true })
    waiting_ndef.value = true
    console.log("OnDiscovered listener added")
}

async function startWaitNFC() {

    await nfc.setOnTagDiscoveredListener((data: NfcTagData) => {
        console.log("Discovered a tag with ID " + data.id);
        if (data.techList) {
            console.log(`tag discovered! techList record: ${JSON.stringify(data.techList)}`)
            feedback.success({ message: `tag discovered! techList record: ${JSON.stringify(data.techList)}` })
        }
    })
    waiting_nfc.value = true
    console.log("OnDiscovered listener added")
}
async function stopWaitNFC() {
    await nfc.setOnTagDiscoveredListener(null)
    waiting_nfc.value = false
    console.log("OnTagDiscovered listener removed")
}

async function stopWaitNdef() {
    await nfc.setOnNdefDiscoveredListener(null)
    waiting_ndef.value = false
    console.log("OnNdefDiscovered listener removed")
}
async function startOrStopWaitNdef() {
    if (waiting_ndef.value) {
        await stopWaitNdef()
    } else {
        await startWaitNdef()
    }
}
async function startOrStopWaitNFC() {
    if (waiting_nfc.value) {
        await stopWaitNFC()
    } else {
        await startWaitNFC()
    }
}
async function writeTxt() {
    try {
        const msg = "Hello!"
        await nfc.writeTag({
            textRecords: [
                {
                    id: [1],
                    text: msg
                }
            ]
        })
        console.log(`writeTxt ${msg} ok`)
        feedback.success({ message: `writeTxt ${msg} ok` })
    } catch (error) {
        console.log(`writeTxt get error ${error}`);
    }
}
async function writeURL() {
    try {
        const url = "https://www.baidu.com"
        await nfc.writeTag({
            uriRecords: [
                {
                    id: [2, 5],
                    uri: url
                }
            ]
        })
        console.log(`writeURL ${url} ok`)
        feedback.success({ message: `writeURL ${url} ok` })
    } catch (error) {
        console.log(`writeURL get error ${error}`);
    }
}

async function erase(){
    try { 
        await nfc.eraseTag()
        console.log(`erase ok`)
        feedback.success({ message: `erase ok` })
    } catch (error) {
        console.log(`writeURL get error ${error}`);
    }
}
</script>
