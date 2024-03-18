<template>
  <Frame id="root">
    <Page actionBarHidden="true" id="PageRoot">
      <TabView selectedIndex="0" selectedTabTextColor="#e57373" @selectedIndexChange="tabChangeHandler">
        <TabViewItem title="Home">
          <Frame id="home-frame">
            <HomePage />
          </Frame>
        </TabViewItem>
        <TabViewItem title="Search">
          <Frame id="page-frame-1">
            <SearchPage />
          </Frame>
        </TabViewItem>
        <TabViewItem title="Message">
          <Frame id="page-frame-2">
            <MessagePage />
          </Frame>
        </TabViewItem>
      </TabView>
    </Page>
  </Frame>
</template>

<script lang="ts" setup>
import { EventData } from "@nativescript/core/data/observable";
import HomePage from "../pages/HomePage.vue";
import SearchPage from "../pages/SearchPage.vue";
import MessagePage from "../pages/MessagePage.vue";

interface SelectedIndexChangedEventData extends EventData {
  oldValue: number;
  /**
   * The new selected index.
  */
  value: number;
}

function tabChangeHandler(evt: SelectedIndexChangedEventData) {
  console.log("!!!!");
  console.log(evt.eventName);
  console.log(Object.keys(evt));
  console.log(evt.oldValue);
  console.log(evt.value);
}
</script>