<template>
    <Frame>
        <Page actionBarHidden="true">
            <GridLayout>
                <ListView ref="collection" height="100%" width="100%" separatorColor="transparent" :items="itemList"
                    colWidth="50%" rowHeight="100">
                    <template #default="{ item }">
                        <StackLayout :backgroundColor="item.color" height="100">
                            <Label :text="item.name" />
                        </StackLayout>
                    </template>
                </ListView>
                <MDSpeedDial :text="iconUnicode('\uf19c')" buttonClass="mdi" horizontalAlignment="right">
                    <MDSpeedDialItem :text="iconUnicode('\uf250')" buttonClass="mdi" @tap="onActionTap" />
                    <MDSpeedDialItem :text="iconUnicode('\uf1b9')" buttonClass="mdi" @tap="onActionTap" />
                    <MDSpeedDialItem :text="iconUnicode('\uf278')" buttonClass="mdi" backgroundColor="orange"
                        @tap="onActionTap" />
                    <MDSpeedDialItem :text="iconUnicode('\uf252')" buttonClass="mdi" @tap="onActionTap" />
                </MDSpeedDial>
            </GridLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref } from 'nativescript-vue'
import { EventData } from "@nativescript/core/data/observable";
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


function iconUnicode(icon: string): string {
    return `${icon}`;
}
function onActionTap(evt: EventData) {
    console.log("tap ok");
}
</script>