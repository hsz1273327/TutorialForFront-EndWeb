<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Slider v-model="value" @valueChange="onValueChanged" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref } from 'nativescript-vue'
import { PropertyChangeData } from '@nativescript/core/data/observable'
import { Brightness } from '@nativescript/brightness'
const brightness = new Brightness()
const defaultValue = brightness.get()
const value = ref(defaultValue)

function onValueChanged(evt: PropertyChangeData) {
    console.log(`old brightness is ${ evt.oldValue}`)
    brightness.set({ intensity: evt.value })
    console.log(`now brightness is ${ evt.value}`)
}
</script>
