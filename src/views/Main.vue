
<template>
    <Frame>
        <Page actionBarHidden="true">
            <GridLayout rows="*, auto">
                <RouterView defaultRoute="/" id="main-frame"></RouterView>
                <NavMDBottom row="1" />
            </GridLayout>
        </Page>
    </Frame>
</template>

  
<script lang="ts" setup>
// import { ref } from 'nativescript-vue'
import NavMDBottom from "../components/NavMDBottom.vue"

</script>