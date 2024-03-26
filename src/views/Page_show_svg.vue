<template>
    <Frame>
        <Page actionBarHidden="true">

                    <GridLayout height="280" borderRadius="10" class="bg-secondary" rows="*, auto, auto" columns="*"
                        margin="5 10" padding="0">
                       
                        <SVGView v-else-if="item === 'SVG'" src="~/assets/tsunami_black_24dp.svg" height="270" stretch="fitCenter" />
                        
                    </GridLayout>

        </Page>
    </Frame>
</template>
  
<script lang="ts" setup>
import { ref } from "nativescript-vue";
// const types = ref([ "NSImg", "SVG","GIF"])
const types = ref([ "none", "aspectFill", "aspectFit", "fill"])
</script>