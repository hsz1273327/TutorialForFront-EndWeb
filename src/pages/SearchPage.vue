<template>
    <Page actionBarHidden="true" id="Page1">
        <StackLayout>
            <Label text="Search Page"></Label>
        </StackLayout>
    </Page>
</template>

<script lang="ts" setup>
import { onMounted } from "nativescript-vue";

onMounted(() => console.log("&&&&mounted page1 frame"))
</script>