<template>
    <Page actionBarHidden="true">
        <SearchBar hint="Search..." :text="searchPhrase" @submit="onSubmit" />

        <ListView ref="collection" height="100%" separatorColor="transparent" :items="itemList" colWidth="50%"
            rowHeight="100" @itemTap="tapItem" @loadMoreItems="moreItems">
            <template #default="{ item }">
                <StackLayout :backgroundColor="item.color" height="100">
                    <Label :text="item.name" />
                </StackLayout>
            </template>
        </ListView>

    </Page>
</template>
<script lang="ts" setup>
import { ref, defineProps } from "nativescript-vue";
import { EventData } from '@nativescript/core';
import { CollectionViewItemEventData, CollectionView } from "@nativescript-community/ui-collectionview"
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh'

const collection = ref()
const isIOS = ref(global.isIOS)

const fontSearch = "font://\uf1c3"

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
if (props.searchPhrase) {
    items = random_choise(candidates)
} else {
    items = advs
}
const itemList = ref(items);


function tapItem(evt: CollectionViewItemEventData) {
    console.log(`tap item with index ${evt.index}`)
}
function moreItems(evt: EventData) {
    console.log(`load more items ${evt.eventName}`)
}

function onSubmit(evt: EventData) {
    itemList.value = random_choise(candidates)
}

</script>