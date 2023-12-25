<template>
    <Frame>
        <Page actionBarHidden="true">
            <!--底部导航-->
            <GridLayout rows="*, auto">
                <Frame id="main-frame" row="0">
                    <HomePage />
                </Frame>
                <NavMDBottom row="1" />
            </GridLayout>
            <!--顶部导航-->
            <!-- <GridLayout rows="auto,*">
        <NavMDBottom row="0"/>
        <Frame id="main-frame" row="1">
          <Home />
        </Frame>
      </GridLayout> -->
        </Page>
    </Frame>
</template>
  
<script lang="ts" setup>
import NavMDBottom from "../components/NavMDBottom.vue";
import HomePage from "./HomePage.vue";

</script>
