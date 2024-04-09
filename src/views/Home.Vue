<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Button text="share image" @tap="shareImageOpen" />
                <Button text="share pdf" @tap="sharePDFOpen" />
                <Button text="share words" @tap="shareWordsOpen" />
                <Button text="share url" @tap="shareURLOpen" />
                <Button text="share file" @tap="shareFileOpen" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { knownFolders, File, path, ImageSource } from '@nativescript/core'
import { ShareFile } from '@nativescript-community/ui-share-file'
const shareFile = new ShareFile()
import { shareImage, sharePdf, shareText, shareUrl } from '@nativescript/social-share'

async function shareImageOpen() {
    let appfolder = knownFolders.currentApp()
    const filepath = path.join(appfolder.path, "assets/bookofmormon.png")
    const imageSource = await ImageSource.fromFile(filepath)
    try {
        shareImage(imageSource, {
            caption: 'a sample png',
            subject: 'Some subject',
            fileFormat: 'png',
        })
    } catch (error) {
        console.error(error)
    }
}
async function sharePDFOpen() {
    try {

        let appfolder = knownFolders.currentApp()
        const filepath = path.join(appfolder.path, "assets/1706.03762.pdf")
        let pdf = File.fromPath(filepath)
        sharePdf(pdf, 'How would you like to share this text?', 'all you need is attention')
    } catch (error) {
        console.error(error)
    }
}
async function shareWordsOpen() {
    try {
        shareText("a example text", "test")
    } catch (error) {
        console.error(error)
    }
}
async function shareURLOpen() {
    try {
        shareUrl(
            'https://www.nativescript.org/',
            'Home of NativeScript',
            'How would you like to share this url?'
        )
    } catch (error) {
        console.error(error)
    }
}

async function shareFileOpen() {
    try {
        let appfolder = knownFolders.currentApp()
        const filepath = path.join(appfolder.path, "assets/meatwad.gif")
        console.log(`get file path ${filepath}`)
        await shareFile.open({
            path: filepath,
            title: `Open file meatwad.gif with:`, // optional Android
            rect: { // optional iPad
                x: 110,
                y: 110,
                width: 0,
                height: 0
            },
            options: true, // optional iOS
            animated: true // optional iOS
        })
    } catch (error) {
        console.error(error)
    }
}

</script>
