<template>
    <Frame>
        <Page actionBarHidden="true">
            <GridLayout rows="auto, *">
            <StackLayout row="0">
            <Label text="Home--等待状态"></Label>
            <Switch v-model="isBusy" />
            </StackLayout>
            <StackLayout
            row="0"
            rowSpan="2"
            :visibility="isBusy ? 'visible' : 'collapsed'"
            backgroundColor="#ECEFF1"
            opacity="0.5"
            >
            <ActivityIndicator
                row="1"
                width="100"
                height="100"
                busy="true"
                @busyChange="onBusyChanged"
            />
            </StackLayout>
        </GridLayout>
        </Page>
    </Frame>
</template>
  
<script lang="ts" setup>
import { onMounted, ref } from "nativescript-vue";
import { EventData } from "@nativescript/core/data/observable";
import { ActivityIndicator } from "@nativescript/core/ui/activity-indicator";

onMounted(() => console.log("&&&&mounted home frame"))
const isBusy = ref(false)
function onBusyChanged(evt: EventData) {
    let obj = evt.object as ActivityIndicator;
    console.log(`is busy ${obj.busy}`);
}
</script>