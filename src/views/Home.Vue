<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Button text="Pick Document" @tap="pickDocument" />
                <Label v-show="showInfo" :text="chosenImageName" />
                <Label v-show="showInfo" :text="chosenImagePath" />
                <Image v-show="showInfo" :src="chosenImageSrc" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, Ref, computed } from 'nativescript-vue'
import { File } from '@nativescript/core';
import { openFilePicker } from '@nativescript-community/ui-document-picker';
interface ImageInfo {
    name: string;
    path: string;
}
const chosenImage: Ref<ImageInfo> = ref(null)
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
        const files = await openFilePicker({
            extensions: ['jpg', 'png']
        });
        let _item = File.fromPath(files.files[0])
        chosenImage.value = {
            "name": _item._name,
            "path": _item._path
        }
        console.log("chosenImage changed")
        showInfo.value = true
        // listView.value._nativescriptView.refresh()
        // console.log('files', files, knownFolders.currentApp())
        // console.log('test', File.fromPath(files.files[0]))
        // console.log('test2',readTextFromUri(files.files[0]))
        // console.log('test2', File.fromPath(files.files[0]).readTextSync())

    } catch (error) {
        console.error(error)
    }
}
</script>
