<template>
    <Stacklayout backgroundColor="white" padding="25">
        <ListView ref="collection" height="500" separatorColor="transparent" :items="members" colWidth="80%"
                    rowHeight="100" @itemTap="chooseOne">
            <template #default="{ item }">
                <StackLayout height="100">
                    <Label :text="item.servicUUID" />
                    <Label :text="item.serviceName" />
                    <Label :text="item.characteristicUUID" />
                    <Label :text="item.characteristicName" />
                    <Label :text="item.characteristicProperties" />
                </StackLayout>
            </template>
        </ListView>
    </Stacklayout>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "nativescript-vue";
import { ItemEventData, ListView } from '@nativescript/core'
import { Service } from '@nativescript-community/ble'

const props = defineProps({
    services: {
        type: Array<Service>,
        required: true
    },
})
let _members = []
for (let serv of props.services){
    for (let characteristic of serv.characteristics){
        let properties = []
        for (let [key,value] of Object.entries(characteristic.properties)){
            if (value){
                properties.push(key)
            }
        }
        _members.push({
            servicUUID: serv.UUID,
            serviceName:serv.name,
            characteristicUUID: characteristic.UUID,
            characteristicName: characteristic.name,
            characteristicProperties: JSON.stringify(properties)
        })
    }
}
const members=ref(_members)

function chooseOne(evt: ItemEventData) {
    let item = members.value[evt.index]
    console.log(`choose servicUUID: ${item.servicUUID} characteristicUUID: ${item.characteristicUUID}`)
    const lv = evt.object as ListView
    lv.closeModal(item)
}
</script>