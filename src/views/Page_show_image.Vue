<template>
    <Frame>
        <Page actionBarHidden="true">
            <ListView height="100%" separatorColor="transparent" :items="types">
                <template #default="{ item }">
                    <GridLayout height="280" borderRadius="10" class="bg-secondary" rows="*, auto, auto" columns="*"
                        margin="5 10" padding="0">
                        <NSImg v-if="item === 'NSImg'" src="~/assets/bookofmormon.png" stretch="fitCenter"
                            roundAsCircle="true" />
                        <SVGView v-if="item === 'SVG'" src="~/assets/tsunami_black_24dp.svg" stretch="fitCenter" />
                        <Gif v-if="item === 'GIF'" src="~/assets/meatwad.gif" height="100" ></Gif>
                        <image v-else row="0" margin="0" src="~/assets/bookofmormon.png" :stretch="item" />
                    </GridLayout>
                </template>
            </ListView>
        </Page>
    </Frame>
</template>
  
<script lang="ts" setup>
import { ref } from "nativescript-vue";
const types = ref(["none", "aspectFill", "aspectFit", "fill", "NSImg", "SVG","GIF"])
</script>