<template>
    <frame>
        <Page actionBarHidden="true">
            <GridLayout rows="*,auto">
                <SimpleCard v-bind="simplecardprops" />
                <Button row="1" text="outside" />
            </GridLayout>
        </Page>
    </frame>
</template>
<script lang="ts" setup>
import { ref } from "nativescript-vue";
import SimpleCard from "../components/SimpleCard.vue"

const simplecardprops = ref({
    title: "test1",
    iconImgURL: "~/assets/anastasia.png",
    mediaImgURL: "~/assets/beetlejuicemusical.png",
    description: "this is test's description"
})

</script>