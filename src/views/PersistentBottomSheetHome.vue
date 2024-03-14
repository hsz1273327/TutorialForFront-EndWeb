<template>
    <Frame>
        <Page actionBarHidden="true">

            <BottomSheet v-model="stepIndex" :steps="[56, 156, 456]" scrollViewId="scrollView" backdropColor="#00000088" backgroundColor="purple">
                <StackLayout backgroundColor="red">
                    <Label text="This is the main content" />
                </StackLayout>
                <gridlayout ~bottomSheet backgroundColor="yellow" rows="56, 100, 300" width="100%">
                    <stacklayout row="0" orientation="horizontal">
                        <button text="My Profile" class="button" @tap="stepIndex = 0" />
                        <button text="Settings" class="button" @tap="stepIndex = 1" />
                        <button text="Rate Us" class="button" @tap="stepIndex = 2" />
                        <button text="Support" class="button" />
                        <button text="Contact" class="button" />
                    </stacklayout>
                    <stacklayout row="1" orientation="horizontal">
                        <button text="My Profile" class="button" />
                        <button text="Settings" class="button" />
                        <button text="Rate Us" class="button" />
                        <button text="Support" class="button" />
                        <button text="Contact" class="button" />
                    </stacklayout>
                    <ListView row="2" ref="collection" height="100%" width="100%" separatorColor="transparent" id="scrollView" :items="itemList"
                        colWidth="50%" rowHeight="100">
                        <template #default="{ item }">
                            <StackLayout :backgroundColor="item.color" height="100" @longPress="onLongPress">
                                <Label :text="item.name" />
                            </StackLayout>
                        </template>
                    </ListView>
                </gridlayout>
            </BottomSheet>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref } from "nativescript-vue";
import { EventData } from "@nativescript/core"
import ShareBottomBar from "../components/ShareBottomBar.vue";
import { useBottomSheet } from "@nativescript-community/ui-material-bottomsheet/vue3";

const stepIndex = ref(0)
const { showBottomSheet } = useBottomSheet()
const defaultIndex = ref(0)

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

async function onLongPress(evt: EventData) {
    showBottomSheet(ShareBottomBar, {
        dismissOnBackgroundTap: true,
        props: {
            canCloseBottomSheet: true,
            defaultIndex: defaultIndex.value,
        },
        closeCallback: (...args: any[]) => {
            try {
                defaultIndex.value = args[0][0][1];
            } catch (e) {
                defaultIndex.value = 0
            }
        },
    });
}
</script>