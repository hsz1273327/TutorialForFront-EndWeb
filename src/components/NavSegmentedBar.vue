<template>
    <SegmentedBar selectedBackgroundColor="#e57373" selectedIndex="0" @selectedIndexChanged="onIndexSelected"
        id="nav-segbar">
        <SegmentedBarItem title="Home" />
        <SegmentedBarItem title="Page1" />
        <SegmentedBarItem title="Page2" />
    </SegmentedBar>
</template>
    
<script lang="ts" setup>
import { $navigateTo } from "nativescript-vue";
import { SelectedIndexChangedEventData } from "@nativescript/core/ui/segmented-bar";
import HomePage from "../views/HomePage.vue";
import Page1 from "../views/Page1.vue";
import Page2 from "../views/Page2.vue";

function onIndexSelected(evt: SelectedIndexChangedEventData) {
    console.log("!!!!!");
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
                $navigateTo(Page1, {
                    transition: { name: "fade" },
                    frame: "main-frame",
                });
            }
            break;
        case 2:
            {
                $navigateTo(Page2, {
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