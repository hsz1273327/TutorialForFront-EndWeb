<template>
  <Frame>
    <Page actionBarHidden="true">
      <TabView selectedIndex="1" selectedTabTextColor="#e57373" @selectedIndexChange="tabChangeHandler">
        <TabViewItem title="Tab 1">
          <Label text="Content for Tab 1" />
        </TabViewItem>
        <TabViewItem title="Tab 2">
          <Label text="Content for Tab 2" />
        </TabViewItem>
        <TabViewItem title="Tab 3">
          <Label text="Content for Tab 3" />
        </TabViewItem>
      </TabView>
    </Page>
  </Frame>
</template>
    
<script lang="ts" setup>
import { EventData } from "@nativescript/core/data/observable";

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