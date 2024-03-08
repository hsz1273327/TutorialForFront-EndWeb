<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Label :text="cam_available_msg" />
                <Button v-show="!cam_available" text="申请摄像头授权" @tap="queryCamPerm" />
                <Button v-show="cam_available" text="拍张照片" @tap="takePhoto" />
                <Image v-show="has_photo" ref="photoimg" />
                <Button class="btn btn-primary btn-rounded-sm" text="点击扫码" @tap="showQRScaner"></Button>
                <Button class="btn btn-primary btn-rounded-sm" text="生成二维码" @tap="generateBarcode"></Button>
                <Image v-show="generatedBarcodeText" ref="generatedBarcode" width="140" height="140"
                    horizontalAlignment="center" verticalAlignment="center" backgroundColor="red" />
                <Label v-show="generatedBarcodeText" class="body" textAlignment="center" textWrap="true">
                    <Span text="read/generated barcode: " />
                    <Span fontWeight="bold" :text="generatedBarcodeText" />
                </Label>
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, computed } from 'nativescript-vue'
import { Image } from "@nativescript/core"
import { isAvailable, requestPermissions, takePicture } from '@nativescript/camera'
import { useBottomSheet } from "@nativescript-community/ui-material-bottomsheet/vue3";
import { generateBarCode, BarcodeFormat } from '@nativescript-community/ui-barcodeview';
import QRScaner from "../components/QRScaner.vue";

const cam_available = ref(false)
const photoimg = ref()

const cam_available_msg = computed(() => {
    return cam_available.value ? '有可用摄像头' : '没有可用摄像头'
})

const has_photo = ref(false)

function check_cam_status() {
    let status = isAvailable()
    cam_available.value = status.valueOf()
}

async function queryCamPerm() {
    await requestPermissions()
    check_cam_status()
}

async function takePhoto() {
    try {
        const image = photoimg.value._nativeView as Image;
        const options = {
            width: 300,
            height: 300,
            keepAspectRatio: false,
            saveToGallery: true
        };
        const imageAsset = await takePicture(options)
        console.log("Result is an image asset instance")
        image.src = imageAsset
        has_photo.value = true
    } catch (error) {
        console.log("Error -> " + error.message)
    }
}

const generatedBarcodeText = ref()
const generatedBarcode = ref()

function generateBarcode() {
    let text = 'ecairn://transfer/443427876#44#Le Caméléon Nicolas'
    let type: BarcodeFormat = 'QR_CODE'
    let imgsource = generateBarCode({
        text: text,
        type: type,
        width: 400,
        height: 400,
        frontColor: 'green',
        backColor: 'yellow'
    })
    console.log('************generated barcode image')
    let img = generatedBarcode.value._nativeView as Image
    img.src = imgsource
    generatedBarcodeText.value = text
    console.log('****************set qrcode img')
}
const { showBottomSheet } = useBottomSheet()
function showQRScaner() {
    showBottomSheet(QRScaner, {
        closeCallback: (...args) => {
            if (args.length === 2 && typeof (args[0]) == "string") {
                console.log(`bottom sheet closed with scan result ${args[0]} ,${args[1]}`)
                let img = generatedBarcode.value._nativeView as Image
                let imgsource = generateBarCode({
                    text: args[0],
                    type: args[1],
                    width: 400,
                    height: 400,
                    frontColor: 'green',
                    backColor: 'yellow'
                });
                img.src = imgsource
                generatedBarcodeText.value = args[0]
                console.log('generated barcode image')

            }
        }
    });
}
</script>
