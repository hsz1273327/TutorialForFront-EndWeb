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
        </Page>
    </Frame>
</template>
  
<script lang="ts" setup>
import NavSegmentedBar from "../components/NavSegmentedBar.vue";
import HomePage from "../pages/HomePage.vue";
</script>