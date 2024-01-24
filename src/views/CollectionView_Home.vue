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
                <!-- <CollectionView ref="collection" :items="itemList" colWidth="50%" rowHeight="100" orientation="vertical" @itemTap="tapItem" -->
                <CollectionView ref="collection" :items="itemList" colWidth="50%" rowHeight="100" orientation="horizontal"
                    @itemTap="tapItem" @loadMoreItems="moreItems">
                    <template #default="{ item }">
                        <StackLayout :backgroundColor="item.color" height="100">
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
import { EventData } from '@nativescript/core';
import { CollectionViewItemEventData, CollectionView } from "@nativescript-community/ui-collectionview"
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh'

const collection = ref()
const isIOS = ref(global.isIOS)

const fontRefresh = "font://\uf1b9"
const fonttoTop = "font://\uf252"
const itemList = ref([
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
    let pullRefresh = evt.object as PullToRefresh
    itemList.value = shuffle(itemList.value)
    console.log("refresh ok")
    pullRefresh.refreshing = false
}

function toTop(evt: EventData) {
    (collection.value.$el.nativeView as CollectionView).scrollToIndex(0, true)
}

function tapItem(evt: CollectionViewItemEventData) {
    console.log(`tap item with index ${evt.index}`)
}
function moreItems(evt: EventData) {
    console.log(`load more items ${evt.eventName}`)
}
</script>