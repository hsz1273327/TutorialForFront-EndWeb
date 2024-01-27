<template>
    <frame id="main-frame">
        <Page>
            <ActionBar title="My App">
                <template v-if="isIOS">
                    <ActionItem :icon="fontDownload" ios.position="left" class="mdi-ab" @tap="getMyDrawing" />
                    <ActionItem :icon="fontClean" ios.position="left" class="mdi-ab" @tap="clearMyDrawing" />
                </template>
                <template v-else>
                    <ActionItem :icon="fontDownload" android.position="actionBar" class="mdi-ab" @tap="getMyDrawing" />
                    <ActionItem :icon="fontClean" android.position="actionBar" class="mdi-ab" @tap="clearMyDrawing" />
                </template>
            </ActionBar>
            <StackLayout>
                <DrawingPad ref="drawingpad" height="400" id="drawingPad" penColor="#ff4081" penWidth="3"
                    borderColor="black" borderWidth="5">
                </DrawingPad>
            </StackLayout>
        </Page>
    </frame>
</template>
<script lang="ts" setup>
import { ref } from "nativescript-vue";
import { EventData, ImageSource } from '@nativescript/core';
import { DrawingPad } from '@nativescript-community/drawingpad'
const isIOS = ref(global.isIOS)

const fontDownload = "font://\uf223"
const fontClean = "font://\uf307"

const drawingpad = ref()
const savedImageSource = ref<string | ImageSource>("https://img.duoziwang.com/2021/04/08101559830055.jpg")


function getMyDrawing(evt: EventData) {
    // get reference to the drawing pad
    const pad = drawingpad.value._nativeView as DrawingPad

    // then get the drawing (Bitmap on Android) of the drawingpad
    // let drawingImage;
    pad.getDrawing().then((data) => {
        const image = new ImageSource(data); // this can be set as the `src` of an `Image` inside your NS
        const base64imageString = image.toBase64String('jpg'); // if you need it as base64
        console.log(`::IMG_BASE64::${base64imageString}`);
    }).catch((err) => {
        console.log(err);
    })
}

function clearMyDrawing(evt: EventData) {
    const pad = drawingpad.value._nativeView as DrawingPad
    pad.clearDrawing()
}
</script>