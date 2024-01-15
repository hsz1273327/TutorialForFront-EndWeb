<template>
    <Frame>
        <Page actionBarHidden="true">
            <HtmlView html="{{ htmlString }}" />
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref } from "nativescript-vue";
const htmlString = ref(`
<h1 style="color: black; font-family: ui-sans-serif, system-ui;">
  <span style="color: #65adf1;">Html</span>View
</h1>
`)
</script>