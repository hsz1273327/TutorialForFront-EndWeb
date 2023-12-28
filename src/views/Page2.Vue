<template>
    <Page actionBarHidden="true" id="Page2">
        <StackLayout>
            <Label text="Page 2"></Label>
        </StackLayout>
    </Page>
</template>

<script lang="ts" setup>
import { onMounted } from "nativescript-vue";

onMounted(() => console.log("&&&&mounted page2 frame"))
</script>