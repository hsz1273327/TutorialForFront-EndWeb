<template>
  <Frame>
    <Page actionBarHidden="true">
      <TabView selectedIndex="0" selectedTabTextColor="#e57373" @selectedIndexChange="tabChangeHandler">
        <TabViewItem title="Tab 1">
          <Frame id="home-frame">
            <HomePage />
          </Frame>
        </TabViewItem>
        <TabViewItem title="Tab 2">
          <Frame id="page-frame-1">
            <Page1 />
          </Frame>
        </TabViewItem>
        <TabViewItem title="Tab 3">
          <Frame id="page-frame-2">
            <Page2 />
          </Frame>
        </TabViewItem>
      </TabView>
    </Page>
  </Frame>
</template>
    
<script lang="ts" setup>
import { EventData } from "@nativescript/core/data/observable";
import HomePage from "./HomePage.vue";
import Page1 from "./Page1.vue";
import Page2 from "./Page2.vue";


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