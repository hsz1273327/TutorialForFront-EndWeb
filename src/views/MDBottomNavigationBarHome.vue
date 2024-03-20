<template>
    <Frame>
        <Page actionBarHidden="true">
            <Drawer ref="drawer">
                <NavMDBottom ~bottomDrawer @drawerClose="closeDrawer('bottom')" />
                <Frame ~mainContent id="main-frame">
                    <HomePage />
                </Frame>
            </Drawer>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref } from 'nativescript-vue'
import NavMDBottom from "../components/NavMDBottom.vue";
import HomePage from "../pages/HomePage.vue";

const drawer = ref()

function closeDrawer(side:string) {
    drawer.value._nativeView.close(side)
}
</script>
