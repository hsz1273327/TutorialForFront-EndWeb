<template>
  <Frame>
    <Page actionBarHidden="true">
      <TabView selectedIndex="1" selectedTabTextColor="#e57373" @selectedIndexChange="tabChangeHandler">
        <TabViewItem title="妈妈">
          <MemberInfo member="妈妈" />
        </TabViewItem>
        <TabViewItem title="爸爸">
          <MemberInfo member="爸爸" />
        </TabViewItem>
        <TabViewItem title="宝宝">
          <MemberInfo member="宝宝" />
        </TabViewItem>
      </TabView>
    </Page>
  </Frame>
</template>

<script lang="ts" setup>
import { EventData } from "@nativescript/core/data/observable";
import MemberInfo from "../components/MemberInfo.vue"

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