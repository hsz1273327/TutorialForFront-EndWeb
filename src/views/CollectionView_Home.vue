<template>
    <frame>
        <Page actionBarHidden="true">
            <CollectionView :items="itemList" colWidth="50%" rowHeight="100" @itemTap="tapItem">
                <template #default="{ item }">
                    <StackLayout :backgroundColor="item.color">
                        <Label :text="item.name" />
                    </StackLayout>
                </template>
            </CollectionView>
        </Page>
    </frame>
</template>
<script lang="ts" setup>
import { ref } from "nativescript-vue";
import { ObservableArray } from '@nativescript/core';
import { CollectionViewItemEventData } from "@nativescript-community/ui-collectionview"


const itemList = ref(new ObservableArray([
    { name: 'TURQUOISE', color: '#1abc9c' },
    { name: 'EMERALD', color: '#2ecc71' },
    { name: 'PETER RIVER', color: '#3498db' },
    { name: 'AMETHYST', color: '#9b59b6' },
    { name: 'WET ASPHALT', color: '#34495e' }
]));

function tapItem(evt: CollectionViewItemEventData) {
    console.log(`tap item with index ${evt.index}`)
}
</script>