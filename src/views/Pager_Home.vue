<template>
    <frame>
        <Page>
            <ActionBar title="My App">
                <template v-if="isIOS">
                    <ActionItem :icon="fonttoHead" ios.position="left" class="mdi-ab" @tap="toHead" />
                    <ActionItem :icon="fontplay" ios.position="left" class="mdi-ab" @tap="play" />
                    <ActionItem :icon="fonttoTail" ios.position="left" class="mdi-ab" @tap="toTail" />
                </template>
                <template v-else>
                    <ActionItem :icon="fonttoHead" android.position="actionBar" class="mdi-ab" @tap="toHead" />
                    <ActionItem :icon="fonttoHead" android.position="actionBar" class="mdi-ab" @tap="toHead" />
                    <ActionItem :icon="fonttoTail" android.position="actionBar" class="mdi-ab" @tap="toTail" />
                </template>
            </ActionBar>
            <GridLayout class="page" rows="*,auto">
                <Pager ref="pager" :items="itemList">
                    <PagerItem backgroundColor="#e67e22"><Label text="First" /></PagerItem>
                    <PagerItem backgroundColor="#3498db"><Label text="Second" /></PagerItem>
                    <PagerItem backgroundColor="#e74c3c"><Label text="Third" /></PagerItem>
                    <PagerItem backgroundColor="#9b59b6"><Label text="Fourth" /></PagerItem>
                    <!-- <GridLayout v-for="item in itemList" :backgroundColor="item.color">
                            <Label :text="item.name" />
                    </GridLayout> -->
                </Pager>
            </GridLayout>

        </Page>
    </frame>
</template>
<script lang="ts" setup>
import { ref } from "nativescript-vue";
import { EventData } from '@nativescript/core';
// import { Pager } from '@nativescript-community/ui-pager';
const isIOS = ref(global.isIOS)
const pager = ref()


const fonttoHead = "font://\uf3b5"
const fontplay = "font://\uf3aa"
const fonttoTail = "font://\uf3b4"

const autoPlay = ref(true)
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
function toHead(evt: EventData) {
    pager.value.$el.nativeView.scrollToIndexAnimated(0, true)
}

function play(evt: EventData) {

}

function toTail(evt: EventData) {
    pager.value.$el.nativeView.scrollToIndexAnimated(itemList.value.length, true)
}


</script>