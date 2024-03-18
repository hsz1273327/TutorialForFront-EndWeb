<template>
    <Frame>
        <Page actionBarHidden="true">
            <MDTabs selectedIndex="0" tabsPosition="bottom" swipeEnabled="true"
                @selectedIndexChanged="tabChangeHandler">
                <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
                <MDTabStrip>
                    <MDTabStripItem>
                        <Label text="Home"></Label>
                    </MDTabStripItem>
                    <MDTabStripItem class="special">
                        <Label text="SearchPage"></Label>
                    </MDTabStripItem>
                    <MDTabStripItem class="special">
                        <Label text="MessagePage"></Label>
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
                        <SearchPage />
                    </Frame>
                </MDTabContentItem>
                <MDTabContentItem>
                    <Frame id="page-frame-2">
                        <MessagePage />
                    </Frame>
                </MDTabContentItem>
            </MDTabs>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { SelectedIndexChangedEventData } from "@nativescript-community/ui-material-core-tabs/tab-navigation-base";
import HomePage from "../pages/HomePage.vue";
import SearchPage from "../pages/SearchPage.vue";
import MessagePage from "../pages/MessagePage.vue";

function tabChangeHandler(evt: SelectedIndexChangedEventData) {
    console.log("!!!!");
    console.log(evt.eventName);
    console.log(Object.keys(evt));
    console.log(evt.oldIndex);
    console.log(evt.newIndex);
}
</script>