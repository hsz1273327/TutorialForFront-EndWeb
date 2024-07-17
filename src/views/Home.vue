<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Label :text="current_color_code" :backgroundColor="current_color" />
                <ColorWheel width="200" height="200" margin="20" @colorSelect="selectColor" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref } from 'nativescript-vue'
import { EventData } from '@nativescript/core'
import { ColorWheel } from '@sergeymell/nativescript-color-wheel'

const current_color_code = ref("请选择颜色")
const current_color = ref("white")

function selectColor(evt: EventData) {
    let obj = evt.object as ColorWheel
    current_color_code.value = obj.color.hex
    current_color.value = obj.color.hex
}
</script>