<template>
    <Page actionBarHidden="true">
        <StackLayout>
            <SearchBar :hint="searchhint" :text="search" @submit="onSubmit" />
            <ListView height="100%" separatorColor="transparent" :items="itemList" colWidth="50%" rowHeight="100"
                @itemTap="tapItem">
                <template #default="{ item }">
                    <StackLayout :backgroundColor="item.color" height="100">
                        <Label :text="item.name" />
                    </StackLayout>
                </template>
            </ListView>
        </StackLayout>
    </Page>
</template>
<script lang="ts" setup>
import { ref, defineProps } from "nativescript-vue";
import { EventData, ItemEventData } from '@nativescript/core';


const candidates = [
    { name: 'PETER RIVER', color: '#3498db' },
    { name: 'AMETHYST', color: '#9b59b6' },
    { name: 'WET ASPHALT', color: '#34495e' },
    { name: 'BELIZE HOLE', color: '#2980b9' },
    { name: 'WISTERIA', color: '#8e44ad' },
    { name: 'MIDNIGHT BLUE', color: '#2c3e50' },
    { name: 'SUN FLOWER', color: '#f1c40f' },
    { name: 'CARROT', color: '#e67e22' },
    { name: 'ALIZARIN', color: '#e74c3c' },
    { name: 'CLOUDS', color: '#ecf0f1' },
    { name: 'CONCRETE', color: '#95a5a6' },
    { name: 'ORANGE', color: '#f39c12' },
    { name: 'PUMPKIN', color: '#d35400' },
    { name: 'POMEGRANATE', color: '#c0392b' },
    { name: 'SILVER', color: '#bdc3c7' },
    { name: 'ASBESTOS', color: '#7f8c8d' }
]

const advs = [
    { name: 'advertisement1', color: '#4abc4c' },
    { name: 'advertisement2', color: '#21cf71' },
    { name: 'advertisement3', color: '#3ad8db' },
    { name: 'advertisement4', color: '#97e9b6' },
]

const props = defineProps(["searchPhrase"])

const random_choise = (arr: any[]) => arr.filter((x) => Math.random() > 0.5)
let items = []
let _searchhint = "Search..."
let _search = ""
if (props.searchPhrase) {
    items = random_choise(candidates)
    _searchhint = props.searchPhrase
} else {
    items = advs
}
const itemList = ref(items);
const searchhint = ref(_searchhint);
const search = ref(_search);

function tapItem(evt: ItemEventData) {
    console.log(`tap item with index ${evt.index}`)
}
function onSubmit(evt: EventData) {
    console.log("submit")
}
</script>