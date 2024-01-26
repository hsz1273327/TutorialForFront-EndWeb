<template>
    <MDCardView margin="10" width="300" height="200" rippleColor="blue" elevation="6">
        <GridLayout rows="40,auto,*,40" backgroundColor="#2ecc71">
            <!--title部分-->
            <StackLayout orientation="horizontal" row="0">
                <GridLayout columns="40,*,40">
                    <NSImg :src="iconImgURL" stretch="fitCenter" roundAsCircle="true" col="0" />
                    <Label :text="title" class="title" col="1"></Label>
                    <MDFloatingActionButton rippleColor="blue" :src="fontsrc_more" class="mdi-ab" col="2"
                        @tap="onActionTap" />
                </GridLayout>
            </StackLayout>
            <!--文本部分 -->
            <Label :text="description" row="1" />
            <!--多媒体部分 -->
            <NSImg :src="mediaImgURL" row="2" />
            <!--按钮部分 -->
            <StackLayout orientation="horizontal" row="3">
                <Button text="b1" />
                <Button text="b2" />
            </StackLayout>
        </GridLayout>
    </MDCardView>
</template>
    
<script lang="ts" setup>
import { defineProps, ref } from "nativescript-vue";
import { EventData } from "@nativescript/core/data/observable";
import { useBottomSheet } from "@nativescript-community/ui-material-bottomsheet/vue3";
import CardBottomBar from "./CardBottomBar.vue";
const { showBottomSheet } = useBottomSheet()

const props = defineProps<{
    title: string,
    iconImgURL: string,
    mediaImgURL: string,
    description: string
}>()

const fontsrc_more = "res://\uf19b"

const defaultIndex = ref(0)
function onActionTap(evt: EventData) {
    showBottomSheet(CardBottomBar, {
        dismissOnBackgroundTap: true,
        props: {
            canCloseBottomSheet: true,
            defaultIndex: defaultIndex.value,
            profile: {
                title: props.title,
                iconImgURL: props.iconImgURL,
                mediaImgURL: props.mediaImgURL,
                description: props.description
            }
        },
        closeCallback: (...args: any[]) => {
            console.log("bottom sheet closed", args);
            try {
                defaultIndex.value = args[0][0][1];
            } catch (e) {
                defaultIndex.value = 0
            }
        },
    });
}
</script>
