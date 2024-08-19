<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Label :text="current_color_code" :backgroundColor="current_color" />
                <ColorWheel width="200" height="200" margin="20" @colorSelect="selectColor" />
                <Button text="pick a color" @tap="openModal" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, $showModal } from 'nativescript-vue'
import { EventData } from '@nativescript/core'
import { ColorWheel } from '@hsz1273327/nativescript-color-wheel'
import ColorPickerModal from '../components/ColorPickerModal.vue'


const current_color_code = ref("请选择颜色")
const current_color = ref("white")

function selectColor(evt: EventData) {
    let obj = evt.object as ColorWheel
    current_color_code.value = obj.color.hex
    current_color.value = obj.color.hex
}

async function openModal(evt: EventData){
    let msg_back = await $showModal(ColorPickerModal, {
        fullscreen: false,
    })
    console.log(`get msg ${JSON.stringify(msg_back)}`)
}
</script>