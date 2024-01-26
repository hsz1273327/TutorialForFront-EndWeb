<template>
    <frame id="main-frame">
        <Page>
            <ActionBar title="My App">
                <template v-if="isIOS">
                    <SearchBar hint="Search..." :text="searchPhrase" @submit="onSubmit" />
                    <ActionItem :icon="fontSearch" ios.position="left" class="mdi-ab" @tap="toSearch" />
                </template>
                <template v-else>
                    <SearchBar hint="Search..." :text="searchPhrase" @submit="onSubmit" />
                    <ActionItem :icon="fontSearch" android.position="actionBar" class="mdi-ab" @tap="toSearch" />
                </template>
            </ActionBar>
            <PickerField hint="Click here" items="itemList">
                <template #default="{ item }">
                    <StackLayout :backgroundColor="item.color" height="100">
                        <Label :text="item.name" />
                    </StackLayout>
                </template>
            </PickerField>
            <!-- <ListView ref="collection" height="100%" separatorColor="transparent" :items="itemList" colWidth="50%"
                rowHeight="100" @itemTap="tapItem" @loadMoreItems="moreItems">
                <template #default="{ item }">
                    <StackLayout :backgroundColor="item.color" height="100">
                        <Label :text="item.name" />
                    </StackLayout>
                </template>
            </ListView> -->
        </Page>
    </frame>
</template>
<script lang="ts" setup>
import { ref, $navigateTo } from "nativescript-vue";
import { EventData, ItemEventData, SearchBar } from '@nativescript/core';
import Searchpage from "./Searchpage.vue";

const collection = ref()
const isIOS = ref(global.isIOS)

const fontSearch = "font://\uf1c3"

const itemList = ref([
    // const itemList = ref([
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
])

function toSearch(evt: EventData) {
    $navigateTo(
        Searchpage,
        {
            transition: {
                name: "fade"
            },
            frame: "main-frame"
        })
}

function tapItem(evt: ItemEventData) {
    console.log(`tap item with index ${evt.index}`)
}
function moreItems(evt: EventData) {
    console.log(`load more items ${evt.eventName}`)
}

// 搜索相关
const searchPhrase = ref("")
function onSubmit(evt: EventData) {
    const searchBar = evt.object as SearchBar
    console.log('Search for:', searchBar.text)
    if (searchBar.text != "") {
        $navigateTo(
            Searchpage,
            {
                transition: {
                    name: "fade"
                },
                frame: "main-frame",
                props: {
                    searchPhrase: searchBar.text
                }
            })
    } else {
        $navigateTo(
            Searchpage,
            {
                transition: {
                    name: "fade"
                },
                frame: "main-frame"
            })
    }
}
</script>