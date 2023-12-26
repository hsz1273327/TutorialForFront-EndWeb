<template>
    <Frame>
        <Page>
            <Drawer ref="drawer">
                <SideSheet ~leftDrawer />
                <SideSheet ~rightDrawer />
                <NavMDBottom ~topDrawer />
                <NavMDBottom ~bottomDrawer />
                <Frame ~mainContent id="main-frame">
                    <HomePage />
                </Frame>
            </Drawer>
        </Page>
    </Frame>
</template>
  
<script lang="ts" setup>
import HomePage from "./HomePage.vue";
import SideSheet from "../components/SideSheet.vue"
import NavMDBottom from "../components/NavMDBottom.vue";
</script>