<template>
    <Frame>
        <Page actionBarHidden="true">
            <PullToRefresh @refresh="onRefresh">
                <ListView :items="users">
                    <template #default="{ item }">
                        <Label :text="item" />
                    </template>
                </ListView>
            </PullToRefresh>
        </Page>
    </Frame>
</template>
  
<script lang="ts" setup>
import { ref, onMounted, Ref } from "nativescript-vue";
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh'
import { Http, EventData } from "@nativescript/core"

const url = 'https://api.github.com/users'

// const ws = new WebSocket("wss://socketsbay.com/wss/v2/1/demo/")
const ws = new WebSocket("ws://10.0.2.2:3000")
ws.onclose = (ev) => {
    console.log(`disconnected type: ${ev.type} message: ${ev.message}`);
}
ws.onmessage = (message_event) => console.log(`get message ${message_event.data} with type ${message_event.type}`)
ws.onopen = (ev) => { console.log(`*****************************ws opened`) }
console.log("**********************************812342315")

interface UserInfo {
    login: string
}
const users: Ref<string[]> = ref([])
async function getUsers() {
    try {
        let resp: UserInfo[] = await Http.getJSON(url)
        users.value = resp.map((x) => x.login)
    } catch (e) {
        console.log(`getUsers get error ${e}`)
    }
}

async function onRefresh(evt: EventData) {
    await getUsers()
    let pullRefresh = evt.object as PullToRefresh
    pullRefresh.refreshing = false
}
function delay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
onMounted(async () => {
    while (ws.readyState !== WebSocket.OPEN) {
        await delay(1000)
    }
    console.log("******************************can send")
    ws.send('helloworld')
    console.log("******************************send ok")
    getUsers()
})
</script>
