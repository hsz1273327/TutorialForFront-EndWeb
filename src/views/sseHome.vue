<template>
    <Frame>
        <Page actionBarHidden="true">

            <StackLayout padding="12">
                <Label :text="welcomeword" />
                <label :text="nowtime" />
            </StackLayout>

        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, Ref } from "nativescript-vue";
import { EventData, TextField } from "@nativescript/core"
import { HttpsRequestOptions, request } from '@nativescript-community/https'
import { isIOS } from '@nativescript/core/platform';
import { SSE, MessageData, MessageError, MessageConnected } from '@duicorn/nativescript-sse';



const welcomeword = ref("not connected yet")

const host = isIOS ? "localhost" : "10.0.2.2"

const nowtime = ref((new Date()).toLocaleTimeString())

const sse = new SSE(`http://${host}:5000/sse`, { 'X-Token': 'Test1234' });

sse.events.on('onConnect', (data: MessageConnected) => {
    console.log(`get connected data: ${data.object.connected}`);
    welcomeword.value = "connected!!"
})

sse.events.on('onMessage', (data: MessageData) => {
    nowtime.value = (data.object.message.data);
    console.log(`onMessage:  ${data.object.message.data}`);
})
sse.events.on('onError', (data: MessageError) => {
    console.log(`get error: ${data.object.error}`);
})

</script>
