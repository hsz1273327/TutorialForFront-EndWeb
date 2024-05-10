<template>
    <Stacklayout backgroundColor="white" padding="25">
        <ListView ref="collection" height="500" separatorColor="transparent" :items="members" colWidth="80%"
                    rowHeight="100" @itemTap="chooseOne">
            <template #default="{ item }">
                <StackLayout height="100">
                    <Label :text="item.name" />
                    <Label :text="item.UUID" />
                    <Label :text="item.state" />
                </StackLayout>
            </template>
        </ListView>
    </Stacklayout>
</template>

<script lang="ts" setup>
import { ref, defineProps,onMounted } from "nativescript-vue";
import { ItemEventData, ListView } from '@nativescript/core'
import { Peripheral } from '@nativescript-community/ble'

const props = defineProps({
    members: {
        type: Array<Peripheral>,
        required: true
    },
})

function chooseOne(evt: ItemEventData) {
    let item = props.members[evt.index]
    console.log(`choose ${item.UUID}`)
    const lv = evt.object as ListView
    lv.closeModal(item)
}
onMounted(()=>{
    console.log(`Blue Tooth List Modal get members size${props.members.length}`)
})
</script>