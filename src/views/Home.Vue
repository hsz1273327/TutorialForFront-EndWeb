<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>

                <Button text="share image" @tap="shareOpen" />

            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ShareFile } from '@nativescript-community/ui-share-file';
import { File } from '@nativescript/core'
const shareFile = new ShareFile();

const path = File.fromPath("./assets/meatwad.gif").path
async function shareOpen() {
    try {
        shareFile.open({
            path: path,
            title: 'Open file with:', // optional Android
            rect: { // optional iPad
                x: 110,
                y: 110,
                width: 0,
                height: 0
            },
            options: true, // optional iOS
            animated: true // optional iOS
        });
    } catch (error) {
        console.error(error)
    }
}

</script>
