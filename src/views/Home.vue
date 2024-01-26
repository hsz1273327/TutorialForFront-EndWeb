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
                <DrawingPad ref="drawingpad" height="400" id="drawingPad" penColor="#ff4081" penWidth="3">
                </DrawingPad>
                <Image v-show="show" ref="img"></Image>
            </StackLayout>

            <!-- <ListView ref="collection" height="100%" separatorColor="transparent" :items="itemList" colWidth="50%"
                rowHeight="100" @itemTap="tapItem" @loadMoreItems="moreItems">
                <template #default="{ item }">
                    <StackLayout :backgroundColor="item.color" height="100">
                        <Label :text="item.name" />
                    </StackLayout>
                </template>
            </ListView> -->
        </Page>
    </frame>
</template>
<script lang="ts" setup>
import { ref } from "nativescript-vue";
import { EventData, ImageSource } from '@nativescript/core';

const isIOS = ref(global.isIOS)

const fontDownload = "font://\uf1c3"
const fontClean = "font://\uf1c3"

const drawingpad = ref()
const img = ref()
const show = ref(false)

function getMyDrawing(evt: EventData) {
    // get reference to the drawing pad
    const pad = drawingpad.value.$el.nativeView

    // then get the drawing (Bitmap on Android) of the drawingpad
    // let drawingImage;
    pad.getDrawing().then((data) => {
        console.log(data);
        // At this point you have a native image (Bitmap on Android or UIImage on iOS)
        // so lets convert to a NS Image using the ImageSource
        const image = new ImageSource(data); // this can be set as the `src` of an `Image` inside your NS
        // drawingImage = image; // to set the src of an Image if needed.
        img.value.src = image
        show.value = true
        // // now you might want a base64 version of the image
        // const base64imageString = image.toBase64String('jpg'); // if you need it as base64
        // console.log('::IMG_BASE64::', base64imageString);
    }).catch((err) => {
        console.log(err);
    })
}

function clearMyDrawing(evt: EventData) {
    drawingpad.value.$el.nativeView.clearDrawing();
}
</script>