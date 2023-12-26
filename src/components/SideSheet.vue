<template>
    <Stacklayout backgroundColor="white" padding="25">
        <Button id="to-homepage-btn" @tap="toHomePage" text="Home Page"></Button>
        <Button id="to-page1-btn" @tap="toPage1" text="Page 1"></Button>
        <Button id="to-page2-btn" @tap="toPage2" text="Page 2"></Button>
    </Stacklayout>
</template>
  
<script lang="ts" setup>
import { $navigateTo } from "nativescript-vue";
import { TapGestureEventData } from "@nativescript/core/ui/gestures";
import HomePage from "../views/HomePage.vue";
import Page1 from "../views/Page1.vue";
import Page2 from "../views/Page2.vue";

function toHomePage(evt: TapGestureEventData) {
    $navigateTo(HomePage, {
        transition: { name: "fade" },
        frame: "main-frame",
    });
}
function toPage1(evt: TapGestureEventData) {
    $navigateTo(Page1, {
        transition: { name: "fade" },
        frame: "main-frame",
    });
}
function toPage2(evt: TapGestureEventData) {
    $navigateTo(Page2, {
        transition: { name: "fade" },
        frame: "main-frame",
    });
}
</script>