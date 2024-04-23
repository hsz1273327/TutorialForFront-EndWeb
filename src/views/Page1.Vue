<template>
    <Page actionBarHidden="true" id="Page1">
        <GridLayout rows="*, auto">
            <StackLayout row="0">
                <Label text="Page 1"></Label>
            </StackLayout>
            <NavMDBottom row="1" selectedTabIndex="1"/>
        </GridLayout>
    </Page>
</template>

<script lang="ts" setup>
import NavMDBottom from "../components/NavMDBottom.vue"

</script>