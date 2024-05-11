<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Button text="check Available" @tap="checkAvailable" />
                <Button :text="startOrStopWaitNFC_btn" @tap="startOrStopWaitNFC" />
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

const waiting = ref(false)

const startOrStopWaitNFC_btn = computed(() => {
    if (waiting.value) {
        return "结束等待扫卡"
    } else {
        return "开始等待扫卡"
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

async function startWaitNFC() {
    
    if (isAndroid) {
        await nfc.setOnTagDiscoveredListener((data: NfcTagData) => {
            // data.message is an array of records, so:
            console.log("Discovered a tag with ID " + data.id);
            if (data.techList) {
                console.log(`tag discovered! techList record: ${JSON.stringify(data.techList)}`)
                feedback.success({ message: `tag discovered! techList record: ${JSON.stringify(data.techList)}` })
            }
        })
        console.log("OnDiscovered listener added")
    } else {
        await nfc.setOnNdefDiscoveredListener((data: NfcNdefData) => {
            // data.message is an array of records, so:
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
        console.log("OnDiscovered listener added")
    }
}
async function stopWaitNFC() {
    if (isAndroid) {
        await nfc.setOnTagDiscoveredListener(null)
        console.log("OnTagDiscovered listener removed")
    } else {
        await nfc.setOnNdefDiscoveredListener(null)
        console.log("OnNdefDiscovered listener removed")
    }
}

async function startOrStopWaitNFC() {
    if (waiting.value) {
        await stopWaitNFC()
    } else {
        await startWaitNFC()
    }
}
</script>
