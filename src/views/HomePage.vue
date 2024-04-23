<template>
    <Page actionBarHidden="true" id="HomePage">
        <GridLayout rows="*, auto">
            <StackLayout row="0">
                <Label text="Home"></Label>
            </StackLayout>
            <NavMDBottom row="1" selectedTabIndex="0"/>
        </GridLayout>
    </Page>
</template>

<script lang="ts" setup>
import NavMDBottom from "../components/NavMDBottom.vue"

</script>