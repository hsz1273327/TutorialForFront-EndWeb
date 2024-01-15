<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Switch v-model="itemEnabled" />
                <Switch checked="true" @checkedChange="switch_callback" />
                <ListPicker :items="listOfItems" v-model="listpicker_selectedItem" />
                <ListPicker :items="listOfItems" selectedIndex="0" @selectedIndexChange="ListPicker_callback" />

                <Label text="checkbox" />
                <template v-for="(item, index)  in  listOfItems " :key="index">
                    <check-box :text="item" :checked="isChecked[index]" @checkedChange="isChecked[index] = $event.value" />
                </template>
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, watch } from "nativescript-vue";
import { PropertyChangeData } from "@nativescript/core/data/observable";

const itemEnabled = ref(false)
function switch_callback(evt: PropertyChangeData): void {
    console.log(`switchcallback get args`)
}

const listOfItems = ref(["test1", "test2", "test3", "test4"])
const listpicker_selectedItem = ref("test1")
function ListPicker_callback(evt: PropertyChangeData): void {
    console.log(`ListPickercallback get args`)
}

const isChecked = ref([false, false, false, false])
watch(isChecked, (newValue) => {
    console.log(`isChecked changed to ${newValue}`)
}, { deep: true, immediate: true })

</script>