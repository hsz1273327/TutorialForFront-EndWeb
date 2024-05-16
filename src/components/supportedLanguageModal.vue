<template>
    <Stacklayout backgroundColor="white" padding="25">
        <ListView ref="collection" height="500" separatorColor="transparent" :items="members" colWidth="80%"
            rowHeight="100" @itemTap="chooseOne">
            <template #default="{ item }">
                <StackLayout height="100">
                    <Label :text="item.name" />
                </StackLayout>
            </template>
        </ListView>
    </Stacklayout>
</template>

<script lang="ts" setup>
import { ref } from "nativescript-vue";
import { ItemEventData, ListView } from '@nativescript/core'

const members = ref([
    { "name": "简体中文(中国大陆)", "symbol": "zh-CN" },
    { "name": "简体中文(新加坡)", "symbol": "zh-SG" },
    { "name": "United States English", "symbol": "en-US" },
    { "name": "United Kingdom English", "symbol": "en-GB" },
    { "name": "Australia English", "symbol": "en-AU" },
    { "name": "Canada English", "symbol": "en-CA" },
    { "name": "New Zealand English", "symbol": "en-NZ" },
    { "name": "Ireland English", "symbol": "en-IE" },
    { "name": "South Africa English", "symbol": "en-ZA" }
])

function chooseOne(evt: ItemEventData) {
    let item = members.value[evt.index]
    console.log(`choose : ${item.name}`)
    const lv = evt.object as ListView
    lv.closeModal(item.symbol)
}
</script>