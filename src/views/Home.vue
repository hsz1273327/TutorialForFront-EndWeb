<template>
    <frame>
        <Page actionBarHidden="true">
            <!-- <GridLayout rows="*,auto"> -->
            <StackLayout>
                <SimpleCard v-bind="simplecardprops" />
                <SwipeCard v-bind="simplecardprops" />
                <Button row="1" text="outside" />
            </StackLayout>
            <!-- </GridLayout> -->
        </Page>
    </frame>
</template>
<script lang="ts" setup>
import { ref } from "nativescript-vue";
import SimpleCard from "../components/SimpleCard.vue"
import SwipeCard from "../components/SwipeCard.vue"

const simplecardprops = ref({
    title: "test1",
    iconImgURL: "~/assets/anastasia.png",
    mediaImgURL: "~/assets/beetlejuicemusical.png",
    description: "this is test's description"
})

const item = ref(
    { name: 'WET ASPHALT', color: '#34495e', menuOpened: false }
)
</script>