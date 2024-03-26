<template>
    <StackLayout height="50" orientation="horizontal">
        <Button :text="icon_dial" padding="10" height="48" width=50% borderTopLeftRadius="30" class="mdi"
            @tap="callPhone" />
        <Button :text="icon_sms" padding="10" height="48" width=50% borderTopRightRadius="30" class="mdi"
            @tap="sendSMS" />
    </StackLayout>
</template>

<script lang="ts" setup>
import { defineProps, ref } from "nativescript-vue"
import { EventData } from "@nativescript/core"
import { useBottomSheet } from "@nativescript-community/ui-material-bottomsheet/vue3"
import { dial, sms } from 'nativescript-phone'

const { closeBottomSheet } = useBottomSheet()
const icon_dial = ref("\uf2b5")
const icon_sms = ref("\uf194")
const props = defineProps({
    phoneNumber: {
        type: String,
        required: true
    },
    canCloseBottomSheet: {
        type: Boolean,
        default: false,
    },
})

function callPhone(evt: EventData) {
    console.log(`callPhone get phoneNumber ${props.phoneNumber}`)
    try {
        let res = dial(props.phoneNumber, true)
        console.log(`to dial page ok: ${res}`)
    } catch (error) {
        console.log(`dial get error: ${error}`)
    }
    if (props.canCloseBottomSheet) {
        try {
            closeBottomSheet();
        } catch (e) {
            console.log(`try to closeBottomSheet get error: ${e}`)
        }
    }
}

function sendSMS(evt: EventData) {
    console.log(`sendSMS get phoneNumber ${props.phoneNumber}`)
    try {
        sms([props.phoneNumber], "this is a test")
        console.log(`to sendSMS page ok`)
    } catch (error) {
        console.log(`sendSMS get error: ${error}`)
    }
    if (props.canCloseBottomSheet) {
        try {
            closeBottomSheet();
        } catch (e) {
            console.log(`try to closeBottomSheet get error: ${e}`)
        }
    }
}
</script>