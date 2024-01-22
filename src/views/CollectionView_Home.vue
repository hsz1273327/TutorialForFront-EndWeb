<template>
    <frame>
        <Page>
            <ActionBar title="My App">
                <template v-if="isIOS">
                    <ActionItem :icon="fontRefresh" ios.position="left" class="mdi-ab" @tap="refresh" />
                    <ActionItem :icon="fonttoTop" ios.position="left" class="mdi-ab" @tap="toTop" />
                </template>
                <template v-else>
                    <ActionItem :icon="fontRefresh" android.position="actionBar" class="mdi-ab" @tap="refresh" />
                    <ActionItem :icon="fonttoTop" android.position="actionBar" class="mdi-ab" @tap="toTop" />
                </template>
            </ActionBar>
            <PullToRefresh @refresh="refresh">
                <CollectionView ref="collection" :items="itemList" colWidth="50%" rowHeight="100" @itemTap="tapItem"
                    @loadMoreItems="moreItems" @dataPopulated="dataPopulated" @itemReorderStarting="itemReorderStarting"
                    @scroll="scroll">
                    <template #default="{ item }">
                        <StackLayout :backgroundColor="item.color">
                            <Label :text="item.name" />
                        </StackLayout>
                    </template>
                </CollectionView>
            </PullToRefresh>

        </Page>
    </frame>
</template>
<script lang="ts" setup>
import { ref } from "nativescript-vue";
import { ObservableArray, EventData } from '@nativescript/core';
import { CollectionViewItemEventData } from "@nativescript-community/ui-collectionview"

const collection = ref()
const isIOS = ref(global.isIOS)

const fontRefresh = "font://\uf1b9"
const fonttoTop = "font://\uf252"

const itemList = ref(new ObservableArray([
    { name: 'TURQUOISE', color: '#1abc9c' },
    { name: 'EMERALD', color: '#2ecc71' },
    { name: 'PETER RIVER', color: '#3498db' },
    { name: 'AMETHYST', color: '#9b59b6' },
    { name: 'WET ASPHALT', color: '#34495e' },
    { name: 'GREEN SEA', color: '#16a085' },
    { name: 'NEPHRITIS', color: '#27ae60' },
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
]));

function refresh(evt: EventData) {
    // collection.value.refresh()
    console.log(Object.keys(collection.value))
    console.log("refresh ok")
}

function toTop(evt: EventData) {
    collection.value.scrollToIndex(0, true)
}

function tapItem(evt: CollectionViewItemEventData) {
    console.log(`tap item with index ${evt.index}`)
}
function moreItems(evt: EventData) {
    console.log(`load more items ${evt.eventName}`)
}
function itemReorderStarting(evt: EventData) {
    console.log(`itemReorderStarting ${evt.eventName}`)
}
function dataPopulated(evt: EventData) {
    console.log(`dataPopulated ${evt.eventName}`)
}
function scroll(evt: EventData) {
    console.log(`scroll ${evt.eventName}, ${Object.keys(evt)}`)
}
</script>