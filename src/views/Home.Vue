<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <StackLayout>
                    <Button text="Pick Document" @tap="pickDocument" />
                    <Label v-show="showInfo" :text="chosenImageName" />
                    <Label v-show="showInfo" :text="chosenImagePath" />
                    <Image v-show="showInfo" :src="chosenImageSrc" />
                </StackLayout>
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, Ref, computed } from 'nativescript-vue'
import { ImagePicker, ImagePickerMediaType } from '@nativescript/imagepicker';
import { Feedback, FeedbackPosition } from "nativescript-feedback"
interface ImageInfo {
    name: string;
    path: string;
}

const picker = new ImagePicker({ mode: 'single', mediaType: ImagePickerMediaType.Image })
const feedback = new Feedback()
const chosenImage: Ref<any> = ref(null)
const showInfo = ref(false)
const chosenImageName = computed(() => {
    if (chosenImage.value) {
        return `chosen image ${chosenImage.value.name}`
    }
    return "not chosen"

})
const chosenImagePath = computed(() => {
    if (chosenImage.value) {
        return `in path ${chosenImage.value.path}`
    }
    return "not chosen"

})
const chosenImageSrc = computed(() => {
    if (chosenImage.value) {
        return chosenImage.value.path
    }
    return ""

})
async function pickDocument() {
    try {
        let p = await picker.authorize()
        console.log(JSON.stringify(p))
        if (!p.authorized) {
            feedback.warning({
                message: "没有权限!",
                position: FeedbackPosition.Top
            })
        } else {
            const picked = await picker.present()
            console.log("chosenImage picked")
            chosenImage.value = {
                "name": picked[0].filename,
                "path": picked[0].path
            }
        }
        console.log("chosenImage changed")
        showInfo.value = true
    } catch (error) {
        console.error(error)
    }
}
</script>
