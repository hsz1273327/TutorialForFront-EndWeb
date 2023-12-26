<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Label text="Home--等待状态"></Label>
                <Switch v-model="isBusy" />
                <Label :visibility="isBusy ? 'visible' : 'collapsed'" text="ActivityIndicator:"></Label>
                <ActivityIndicator :busy="isBusy" @busyChange="onBusyChanged" />
                <Label :visibility="isBusy ? 'visible' : 'collapsed'" text="MDActivityIndicator:"></Label>
                <MDActivityIndicator :busy="isBusy" @busyChange="onBusyChanged" />
            </StackLayout>
        </Page>
    </Frame>
</template>
  
<script lang="ts" setup>
import { onMounted, ref } from "nativescript-vue";
import { EventData } from "@nativescript/core/data/observable";
import { ActivityIndicator } from "@nativescript/core/ui/activity-indicator";

onMounted(() => console.log("&&&&mounted home frame"))
const isBusy = ref(true)
function onBusyChanged(evt: EventData) {
    let obj = evt.object as ActivityIndicator;
    console.log(`is busy ${obj.busy}`);
}
</script>