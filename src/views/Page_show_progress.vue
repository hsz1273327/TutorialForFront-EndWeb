<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Label text="Home--进度状态"></Label>
                <Label text="Progress:"></Label>
                <Progress :value="currentProgress" />
                <Label text="MDProgress:"></Label>
                <MDProgress :value="currentProgress" maxValue="100" />
                <Label text="MDProgress-busy:"></Label>
                <MDProgress busy="true" indeterminate="true" />
            </StackLayout>

        </Page>
    </Frame>
</template>
  
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "nativescript-vue";
import { setInterval, clearInterval } from "@nativescript/core/timer";

const currentProgress = ref(50)
const interval = ref<number | null>(null)

onMounted(() => {
    interval.value = setInterval(() => {
        const newValue = (currentProgress.value + 1) % 100;
        currentProgress.value = newValue;
    }, 100)
})
onBeforeUnmount(() => {
    if (interval.value !== null) {
        clearInterval(interval.value);
    }
})
</script>