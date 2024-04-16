<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Button ref="anchor" text="Simple Toast" @tap="onActionTapToast" />
                <Button text="Special Place Toast" @tap="onActionTapSpecialPlaceToast" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref } from "nativescript-vue"
import { EventData, Button } from "@nativescript/core"
import { Toasty, ToastDuration } from '@triniwiz/nativescript-toasty'

const anchor = ref()

function onActionTapToast(evt: EventData) {
    const toast = new Toasty({ text: 'Toast message', duration: ToastDuration.SHORT })
    toast.show()
}
function onActionTapSpecialPlaceToast(evt: EventData) {
    const ele = anchor.value._nativeView as Button
    const toast = new Toasty({ text: 'Toast message', duration: ToastDuration.LONG, tapToDismiss: true })
    toast.show()
}
</script>