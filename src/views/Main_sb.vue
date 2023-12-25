<template>
    <Frame>
        <Page actionBarHidden="true">
            <!--底部导航-->
            <GridLayout rows="*, auto">
                <Frame id="main-frame" row="0">
                    <HomePage />
                </Frame>
                <NavSegmentedBar row="1" />
            </GridLayout>
            <!--顶部导航-->
            <!-- <GridLayout rows="auto,*">
        <NavSegmentedBar row="0"/>
        <Frame id="main-frame" row="1">
          <Home />
        </Frame>
      </GridLayout> -->
        </Page>
    </Frame>
</template>
  
<script lang="ts" setup>
import NavSegmentedBar from "../components/NavSegmentedBar.vue";
import HomePage from "./HomePage.vue";
</script>