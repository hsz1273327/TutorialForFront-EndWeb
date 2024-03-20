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
import HomePage from "../pages/HomePage.vue";
import SearchPage from "../pages/SearchPage.vue";
import MessagePage from "../pages/MessagePage.vue";

let selected = false
function onBottomNavigationTabSelected(args: TabSelectedEventData) {
    if (selected) {
        selected = false
    } else {
        selected = true
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
}
</script>