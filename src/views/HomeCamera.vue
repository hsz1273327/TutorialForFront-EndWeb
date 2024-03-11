<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Label :text="cam_available_msg" />
                <Button v-show="!cam_available" text="申请摄像头授权" @tap="queryCamPerm" />
                <Button v-show="cam_available" text="拍张照片" @tap="takePhoto" />
                <!-- <Button text="拍张照片" @tap="takePhoto" /> -->
                <Image v-show="has_photo" ref="photoimg" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, computed } from 'nativescript-vue'
import { Image } from "@nativescript/core"
import { isAvailable, takePicture } from '@nativescript/camera'
import { request } from '@nativescript-community/perms';

const cam_available = ref(false)
const photoimg = ref()

const cam_available_msg = computed(() => {
    return cam_available.value ? '有可用摄像头' : '没有可用摄像头'
})

const has_photo = ref(false)

function check_cam_status() {
    let status = isAvailable()
    cam_available.value = status.valueOf()
    console.log(`cam_available is ${cam_available.value}`)
}

async function queryCamPerm() {
    try {
        // let result = await requestPermissions()
        const result = await request('camera', { type: 'always' })
        console.log(`requestPermissions ok ${JSON.stringify(result)}`)
        check_cam_status()
    } catch (error) {
        console.log(`requestPermissions get error: android.permission.CAMERA : ${error["android.permission.CAMERA;"]} android.permission.WRITE_EXTERNAL_STORAGE: ${error["android.permission.WRITE_EXTERNAL_STORAGE"]}`)
    }

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
</script>
