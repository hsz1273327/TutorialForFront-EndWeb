<template>
    <MDBottomNavigationBar activeColor="#e57373" badgeColor="#1976d2" selectedTabIndex="0"
        @tabSelected="onBottomNavigationTabSelected">
        <MDBottomNavigationTab title="Home" />
        <MDBottomNavigationTab title="Page1" />
        <MDBottomNavigationTab title="Page2" />
    </MDBottomNavigationBar>
</template>
    
<script lang="ts" setup>
import { $navigateTo } from "nativescript-vue";
import { TabSelectedEventData } from "@nativescript-community/ui-material-bottomnavigationbar";
import HomePage from "../views/HomePage.vue";
import Page1 from "../views/Page1.vue";
import Page2 from "../views/Page2.vue";

function onBottomNavigationTabSelected(args: TabSelectedEventData) {
    console.log("!!!!!");
    console.log(args.oldIndex);
    console.log(args.newIndex);
    switch (args.newIndex) {
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
            console.log(`unknown index ${args.newIndex}`);
    }
}
</script>