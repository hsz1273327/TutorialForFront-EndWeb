<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Button ref="b1" text="test modal view should work" borderColor="red" @tap="openModal" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { $showModal } from 'nativescript-vue'
import { EventData } from '@nativescript/core'
import ModalView from '../components/ModalView.vue'


async function openModal(evt: EventData) {
    console.log('openModal')
    let msg_back = await $showModal(ModalView, {
        fullscreen: false,
        props: {
            member: 'test modal'
        }
    })
    console.log(`get msg ${JSON.stringify(msg_back)}`)
}
</script>