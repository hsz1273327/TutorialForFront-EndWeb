<template>
    <Frame>
        <Page actionBarHidden="true">
            <Button :text="statusFont" @tap="changeStatus" :backgroundColor="backgroundColor" class="mdi" fontSize="60" color="white"/>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, computed } from "nativescript-vue";
import { keepAwake, allowSleepAgain } from "@nativescript-community/insomnia"

const canSleep = ref(true)
const canSleepFont = "\uf15c"
const canNotSleepFont = '\uf15b'
const backgroundColor = computed(() => {
    return canSleep.value ? "orange" : "blue"
})
const statusFont = computed(() => {
    return canSleep.value ? canSleepFont : canNotSleepFont
})

async function changeStatus() {
    if (canSleep.value){
        await keepAwake()
        canSleep.value = false
    }else{
        await allowSleepAgain()
        canSleep.value = true
    }
}
</script>
