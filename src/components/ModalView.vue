<template>
    <Stacklayout backgroundColor="white" padding="25">
        <Button :text="info" fontSize="40"  borderColor="green" @tap="closeModal" />
    </Stacklayout>
</template>

<script lang="ts" setup>
import { defineProps } from "nativescript-vue";
import { EventData,Button } from '@nativescript/core'
const props = defineProps({
    member: {
        type: String,
        required: true
    },
})

const info = `这是 ${props.member}`

function closeModal(evt: EventData) {
    const button = evt.object as Button
    button.closeModal({
        name: 'a message',
    })
}
</script>