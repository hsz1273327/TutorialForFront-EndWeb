<template>
    <SegmentedBar selectedBackgroundColor="#e57373" :selectedIndex="defaultIndex"
        @selectedIndexChanged="onIndexSelected" id="nav-segbar">
        <SegmentedBarItem title="Home" />
        <SegmentedBarItem title="Search" />
        <SegmentedBarItem title="Message" />
    </SegmentedBar>
</template>

<script lang="ts" setup>
import { defineProps, $navigateTo } from "nativescript-vue";
import { SelectedIndexChangedEventData } from "@nativescript/core/ui/segmented-bar";

import HomePage from "../pages/HomePage.vue";
import SearchPage from "../pages/SearchPage.vue";
import MessagePage from "../pages/MessagePage.vue";

const props = defineProps({
    defaultIndex: {
        type: Number,
        default: 0,
    },
})

function onIndexSelected(evt: SelectedIndexChangedEventData) {
    switch (evt.newIndex) {
        case 0:
            {
                $navigateTo(HomePage, {
                    transition: { name: "fade" },
                    frame: "main-frame",
                });
            }
            break;
        case 1:
            {
                $navigateTo(SearchPage, {
                    transition: { name: "fade" },
                    frame: "main-frame",
                });
            }
            break;
        case 2:
            {
                $navigateTo(MessagePage, {
                    transition: { name: "fade" },
                    frame: "main-frame",
                });
            }
            break;
        default:
            console.log(`unknown index ${evt.newIndex}`);
    }
}
</script>