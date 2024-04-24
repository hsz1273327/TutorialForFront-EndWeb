<template>
    <Frame>
        <Page actionBarHidden="true">
            <ScrollView>
                <StackLayout>
                    <Button text="parse googlemap url" @tap="onParseURL" />
                </StackLayout>
            </ScrollView>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>

import { EventData } from "@nativescript/core";
import { alert } from "@nativescript/core/ui/dialogs";
import * as urlparse from 'url-parse';


function onParseURL(evt: EventData): void {
    const ul = "https://maps.google.com/maps?q=31.207149,121.593086(%E9%87%91%E7%A7%91%E8%B7%AF)&z=17&hl=en"
    const url = urlparse(ul, true)
    const msg = `url parsed as ${JSON.stringify(url,null,2)}`
    console.log(msg)
    alert({
        cancelable: true,
        message: msg,
        title: "parse url ok"
    })
}
</script>