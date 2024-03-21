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
                <StackLayout>
                    <Button text="Pick Dir" @tap="pickDir" />
                    <Label v-show="showDirInfo" :text="chosenDirPath" />
                </StackLayout>
                <StackLayout>
                    <TextField :text="textFieldValue" hint="save as test.txt ..." @returnPress="save" />
                </StackLayout>
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, Ref, computed } from 'nativescript-vue'
import { File, TextField, EventData } from '@nativescript/core';
import { openFilePicker, pickFolder, saveFile } from '@nativescript-community/ui-document-picker';
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
    } catch (error) {
        console.error(error)
    }
}

const showDirInfo = ref(false)
const chosenDirPath = ref("")
async function pickDir() {
    try {
        const dirs = await pickFolder({
        });
        console.log("chosenImage changed")
        showDirInfo.value = true
        chosenDirPath.value = dirs.folders[0]
    } catch (error) {
        console.error(error)
    }
}
const textFieldValue = ref("")
async function save(evt: EventData) {
    let target = evt.object as TextField
    let result = await saveFile({
        "name": 'test.txt',
        "data": target.text,
        "mimeType": "text/plain"
    })
    console.log(`save ok ${result}`)
}
</script>
