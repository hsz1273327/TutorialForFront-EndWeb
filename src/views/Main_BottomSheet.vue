<template>
    <Frame>
        <Page>
            <ActionBar title="My App">
                <GridLayout columns="auto, *" width="100%">
                    <MDButton rippleColor="blue" @tap="onButtonTap" text="change"  row="0" id="change-btn"/>
                </GridLayout>
            </ActionBar>
            <GridLayout rows="auto,*">
                <Frame id="main-frame" row="1">
                    <HomePage />
                </Frame>
            </GridLayout>
        </Page>
    </Frame>
</template>
  
<script lang="ts" setup>
import { ref } from "nativescript-vue";
import { TapGestureEventData } from "@nativescript/core/ui/gestures";
import HomePage from "./HomePage.vue";
import NavSegmentedBar from "../components/NavSegmentedBar.vue";
import { useBottomSheet } from "@nativescript-community/ui-material-bottomsheet/vue3";

const { showBottomSheet } = useBottomSheet()

const defaultIndex = ref(0)
function onButtonTap(evt: TapGestureEventData) {
    showBottomSheet(NavSegmentedBar, {
        dismissOnBackgroundTap: true,
        props: {
            canCloseBottomSheet: true,
            defaultIndex: defaultIndex.value,
        },
        closeCallback: (...args: any[]) => {
            console.log("bottom sheet closed", args);
            try{
                defaultIndex.value = args[0][0][1];
            }catch (e){
                defaultIndex.value = 0
            }
        },
    });
}
</script>