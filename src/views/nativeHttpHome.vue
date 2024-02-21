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
