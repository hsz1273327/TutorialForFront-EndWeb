<template>
    <Label :text="info"></Label>
</template>
    
<script lang="ts" setup>
import { defineProps,ref } from "nativescript-vue";
const props = defineProps({
    member: {
        type: String,
        required: true
    },
})

const info = `这是 ${props.member}`
</script>