<template>
    <SegmentedBar selectedBackgroundColor="#e57373" :selectedIndex="defaultIndex" @selectedIndexChanged="onIndexSelected"
        id="share-segbar" height="50" class="mdi">
        <SegmentedBarItem :title="icon_google" class="mdi" height="50"/>
        <SegmentedBarItem :title="icon_github" class="mdi-ab" height="50" />
        <SegmentedBarItem :title="icon_twitter" class="mdi-ab" height="50"/>
    </SegmentedBar>
</template>
    
<script lang="ts" setup>
import { defineProps, ref } from "nativescript-vue";
import { View } from "@nativescript/core";
import { SelectedIndexChangedEventData } from "@nativescript/core/ui/segmented-bar";
import { useBottomSheet } from "@nativescript-community/ui-material-bottomsheet/vue3";

const { closeBottomSheet } = useBottomSheet()
// const icon_google = ref("font://\uf34e")
// const icon_github = ref("font://\uf345")
// const icon_twitter = ref("font://\uf360")
const icon_google = ref("\uf34e")
const icon_github = ref("\uf345")
const icon_twitter = ref("\uf360")
const props = defineProps({
    canCloseBottomSheet: {
        type: Boolean,
        default: false,
    },
    defaultIndex: {
        type: Number,
        default: 0,
    },
})

function onIndexSelected(evt: SelectedIndexChangedEventData) {
    console.log("!!!!!");
    switch (evt.newIndex) {
        case 0:
            {
                console.log("google")
            }
            break;
        case 1:
            {
                console.log("twitter")
            }
            break;
        case 2:
            {
                console.log("github")
            }
            break;
        default:
            console.log(`unknown index ${evt.newIndex}`);
    }
    if (props.canCloseBottomSheet) {
        let obj = evt.object as View;
        try {
            closeBottomSheet(obj.id, evt.newIndex);
        } catch (e) {
            console.log(`try to closeBottomSheet get error: ${e}`)
        }
    }
}
</script>