<template>
    <Stacklayout backgroundColor="white" padding="25">
        <Label :text="info" fontSize="40" color="red"></Label>
    </Stacklayout>
</template>

<script lang="ts" setup>
import { defineProps } from "nativescript-vue";
const props = defineProps({
    member: {
        type: String,
        required: true
    },
})

const info = `这是 ${props.member}`
</script>