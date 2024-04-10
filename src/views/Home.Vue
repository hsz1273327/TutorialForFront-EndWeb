<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <TextField v-model="url" hint="Enter url..." @returnPress="openUrl" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref } from "nativescript-vue"
import { Utils, isAndroid } from '@nativescript/core'
let defaultUrl
if (isAndroid) {
    defaultUrl = "https://maps.google.com/maps?q=31.207149,121.593086(%E9%87%91%E7%A7%91%E8%B7%AF)&z=17&hl=en"
} else {
    defaultUrl = "http://maps.apple.com/?daddr=San+Francisco,+CA&saddr=cupertino"
}
const url = ref(defaultUrl)
async function openUrl(evt) {
    try {
        console.log(`get url ${url.value}`)
        Utils.openUrl(url.value)
    } catch (error) {
        console.error(error)
    }
}

</script>