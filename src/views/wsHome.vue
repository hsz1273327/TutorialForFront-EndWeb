<template>
    <Frame>
        <Page actionBarHidden="true">

            <ScrollView>
                <StackLayout padding="12">
                    <Label :text="welcomeword" />
                    <template v-for="(item, key) in messages" :key="key">
                        <StackLayout margin-top="10" :backgroundColor="item.position == 'Self' ? 'pink' : 'green'">
                            <Label :text="item.message" />
                        </StackLayout>
                    </template>
                    <TextField :text="messageToSend" hint="Enter text to send" @returnPress="sendMessage"
                        :editable="editable" :visibility="editable?'visible':'collapsed'" />
                </StackLayout>
            </ScrollView>
        </Page>
    </Frame>
</template>
  
<script lang="ts" setup>
import { ref, Ref } from "nativescript-vue";
import { EventData, TextField } from "@nativescript/core"

const welcomeword = ref("not connected yet")

const editable = ref(false)
const messageToSend = ref("")
interface message {
    message: string;
    position: string;
}

const messages: Ref<message[]> = ref([])
// const ws = new WebSocket("wss://socketsbay.com/wss/v2/1/demo/")
const ws = new WebSocket("ws://10.0.2.2:3000")
ws.onclose = (ev) => {
    welcomeword.value = `connection closed`
    editable.value = false
    console.log(`disconnected type: ${ev.type} message: ${ev.message}`);
}
ws.onopen = (ev) => {
    welcomeword.value = `connection ready`
    editable.value = true
    console.log(`ws opened`)
}

ws.onerror = (ev) => {
    welcomeword.value = `connection error`
    console.log(`connection get error ${ev.type}`);
    editable.value = false
}
ws.onmessage = (message_event) => {
    messages.value.push({ message: message_event.data, position: "Remote" })
    console.log(`get message ${message_event.data} with type ${message_event.type}`)
}

function sendMessage(evt: EventData) {
    const textField = evt.object as TextField
    ws.send(textField.text)
    messages.value.push({ message: textField.text, position: "Self" })
    textField.text=""
    console.log(`send message ${textField.text} ok`)
}

</script>
