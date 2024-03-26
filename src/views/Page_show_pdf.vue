<template>
    <Frame>
        <Page actionBarHidden="true">
            <ListView height="100%" separatorColor="transparent" :items="types">
                <template #default="{ item }">
                    <GridLayout height="280" borderRadius="10" class="bg-secondary" rows="*, auto, auto" columns="*"
                        margin="5 10" padding="0">
                        <!-- <NSImg v-if="item === 'NSImg'" src="~/assets/bookofmormon.png" stretch="fitCenter" height="270"
                            roundAsCircle="true" />
                        <SVGView v-else-if="item === 'SVG'" src="~/assets/tsunami_black_24dp.svg" height="270" stretch="fitCenter" />
                        <Gif v-else-if="item === 'GIF'" src="~/assets/meatwad.gif" height="270" ></Gif> -->
                        <image row="0" margin="0" src="~/assets/bookofmormon.png" :stretch="item" height="270"/>
                        <BlurView blurRadius="10" height="100"></BlurView>
                    </GridLayout>
                </template>
            </ListView>
        </Page>
    </Frame>
</template>
  
<script lang="ts" setup>
import { ref } from "nativescript-vue";
// const types = ref([ "NSImg", "SVG","GIF"])
const types = ref([ "none", "aspectFill", "aspectFit", "fill"])
</script>