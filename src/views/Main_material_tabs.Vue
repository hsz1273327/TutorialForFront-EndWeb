<template>
    <Frame>
        <Page actionBarHidden="true">
            <MDTabs selectedIndex="0" tabsPosition="bottom" swipeEnabled="true" @selectedIndexChanged="tabChangeHandler">
                <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
                <MDTabStrip>
                    <MDTabStripItem>
                        <Label text="Home"></Label>
                    </MDTabStripItem>
                    <MDTabStripItem class="special">
                        <Label text="Page1"></Label>
                    </MDTabStripItem>
                    <MDTabStripItem class="special">
                        <Label text="Page2"></Label>
                    </MDTabStripItem>
                </MDTabStrip>

                <!-- The number of TabContentItem components should corespond to the number of TabStripItem components -->
                <MDTabContentItem>
                    <Frame id="home-frame">
                        <HomePage />
                    </Frame>
                </MDTabContentItem>
                <MDTabContentItem>
                    <Frame id="page-frame-1">
                        <Page1 />
                    </Frame>
                </MDTabContentItem>
                <MDTabContentItem>
                    <Frame id="page-frame-2">
                        <Page2 />
                    </Frame>
                </MDTabContentItem>
            </MDTabs>
        </Page>
    </Frame>
</template>
  
<script lang="ts" setup>
// import NavMDBottom from "../components/NavMDBottom.vue";
import { SelectedIndexChangedEventData } from "@nativescript-community/ui-material-core-tabs/tab-navigation-base";
import HomePage from "./HomePage.vue";
import Page1 from "./Page1.vue";
import Page2 from "./Page2.vue";

function tabChangeHandler(evt: SelectedIndexChangedEventData) {
    console.log("!!!!");
    console.log(evt.eventName);
    console.log(Object.keys(evt));
    console.log(evt.oldIndex);
    console.log(evt.newIndex);
}
</script>