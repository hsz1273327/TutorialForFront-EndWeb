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
                        :editable="editable" :visibility="editable ? 'visible' : 'collapsed'" />
                </StackLayout>
            </ScrollView>
        </Page>
    </Frame>
</template>
  
<script lang="ts" setup>
import { ref, Ref, onMounted } from "nativescript-vue";
import { EventData, TextField,isIOS } from "@nativescript/core"

import { MQTTClient, ClientOptions, ConnectionOptions, SubscribeOptions, Message } from "@edusperoni/nativescript-mqtt";
// import {Message} from "@edusperoni/nativescript-mqtt/common";


const welcomeword = ref("not connected yet")

const editable = ref(false)
const messageToSend = ref("")
interface message {
    message: string;
    position: string;
}

const messages: Ref<message[]> = ref([])

const host = isIOS? "localhost": "10.0.2.2"

const mqtt_clientOptions: ClientOptions = {
    host: host,
    /** the port number to connect to */
    port: 15675,
    path: "/ws"
}
const mqtt_client = new MQTTClient(mqtt_clientOptions)

mqtt_client.onConnectionFailure.on((err) => {
    welcomeword.value = `connection error`
    console.log(`connection get error ${err.errorMessage} with code ${err.errorCode}`);
    editable.value = false
})

mqtt_client.onConnectionLost.on((err) => {
    welcomeword.value = `connection lost`
    editable.value = false
    console.log(`Connection lost: ${Object.keys(err)}`);
})
const mqtt_topic = "chat_room"
function subscribe() {
    try {
        const opts: SubscribeOptions = {
            qos: 0
        };

        mqtt_client.subscribe(mqtt_topic, opts);
    }
    catch (e) {
        console.log(`Caught error: ${Object.keys(e)}`);
    }
}
mqtt_client.onConnectionSuccess.on(() => {
    console.log("Connected successfully!");
    subscribe();
    welcomeword.value = `connection ready`
    editable.value = true
});

mqtt_client.onMessageArrived.on((message: Message) => {
    console.log("Message received: " + message.payloadString);
    messages.value.push({ message: message.payloadString, position: "Remote" })
});

mqtt_client.onMessageDelivered.on((message: Message) => {
    console.log("Message delivered: " + message.payloadString);
});

async function connect() {
    const connOptions: ConnectionOptions = {
        cleanSession: true,
        useSSL: false,
        userName: "guest",
        password: "guest",
        mqttVersion: 4
    }
    try {
        await mqtt_client.connect(connOptions)
        console.log("connected")
    } catch (err) {
        console.log(`connection error: ${err.errorMessage} with code ${err.errorCode}`)
    }
}

function sendMessage(evt: EventData) {
    const textField = evt.object as TextField
    const m = new Message(textField.text);
    m.destinationName = mqtt_topic;
    m.qos = 1;
    m.retained = false;
    mqtt_client.publish(m);
    messages.value.push({ message: textField.text, position: "Self" })
    textField.text = ""
    console.log(`send message ${textField.text} ok`)
}
onMounted(() => connect())
</script>
