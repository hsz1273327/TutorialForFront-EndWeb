<template>
    <frame>
        <Page actionBarHidden="true">
            <!-- <GridLayout rows="*,auto"> -->
            <ScrollView>
                <StackLayout>
                    <SimpleCard v-bind="simplecardprops" />
                    <MediaCard v-bind="simplecardprops" />
                    <ComplexCard v-bind="simplecardprops" />
                    <SwipeCard v-bind="simplecardprops" />
                </StackLayout>
            </ScrollView>

            <!-- </GridLayout> -->
        </Page>
    </frame>
</template>
<script lang="ts" setup>
import { ref } from "nativescript-vue";
import SimpleCard from "../components/SimpleCard.vue"
import MediaCard from "../components/MediaCard.vue"
import ComplexCard from "../components/ComplexCard.vue"
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