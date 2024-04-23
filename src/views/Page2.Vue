<template>
    <Page actionBarHidden="true" id="Page2">
        <GridLayout rows="*, auto">
            <StackLayout row="0">
                <Label text="Page 2"></Label>
            </StackLayout>
            <NavMDBottom row="1" selectedTabIndex="2" />
        </GridLayout>
    </Page>
</template>

<script lang="ts" setup>
import NavMDBottom from "../components/NavMDBottom.vue"
</script>