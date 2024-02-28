<template>
    <Page actionBarHidden="true" id="Page1">
        <StackLayout>
            <Label text="Page 1"></Label>
        </StackLayout>
    </Page>
</template>

<script lang="ts" setup>
import { onMounted, defineProps } from "nativescript-vue";

const props = defineProps(["x"])

onMounted(() => console.log(`&&&&mounted page1 with props ${props.x}`))
</script>