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
import { isAndroid } from '@nativescript/core/platform';
import { SSE } from 'nativescript-sse';
const url = 'https://api.github.com/users'

const sse = new SSE(isAndroid ? 'http://10.0.2.2:5000/stream' : 'http://localhost:5000/stream', {'X-Token': 'Test1234'});

sse.events.on('onConnect', data => {
            console.log("get connected");
        });

sse.events.on('onMessage', data => {
    this.list.push(data.object.message.data);
    console.log(data.object.message.data);
});
sse.events.on('onError', data => {
            console.log("get error");
        });


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

onMounted(() => getUsers())
</script>
