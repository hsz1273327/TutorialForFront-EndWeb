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
            <GridLayout class="page" rows="*,auto">
                <Pager ref="pager" :items="items" height="100%" peaking="30" spacing="10" pagesCount="3">
                    <v-template>
                        <GridLayout :backgroundColor="item.color">
                            <Label :text="item.title" />
                        </GridLayout>
                    </v-template>
                </Pager>
            </GridLayout>

        </Page>
    </frame>
</template>
<script lang="ts" setup>
import { ref } from "nativescript-vue";
import { EventData, ItemEventData, ListView } from '@nativescript/core';
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh'
const collection = ref<ListView>()
const isIOS = ref(global.isIOS)

const fontRefresh = "font://\uf1b9"
const fonttoTop = "font://\uf252"
interface Card {
    name: string
    color: string
}
const itemList = ref<Card[]>([
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
]);

const shuffle = (array: any[]) => {
    return array.slice().sort(() => Math.random() - 0.5);
}
function refresh(evt: EventData) {
    let pullRefresh: PullToRefresh = evt.object
    itemList.value = shuffle(itemList.value)
    console.log("refresh ok")
    pullRefresh.refreshing = false
}

function toTop(evt: EventData) {
    collection.value.$el.nativeView.scrollToIndex(0)
}

function tapItem(evt: ItemEventData) {
    console.log(`tap item with index ${evt.index}`)
}
function moreItems(evt: EventData) {
    console.log(`load more items ${evt.eventName}`)
}
</script>