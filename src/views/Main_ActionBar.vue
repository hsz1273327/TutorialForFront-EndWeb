<template>
    <Frame>
        <Page>
            <ActionBar title="My App">
                <template v-if="isIOS">
                    <!-- <NavigationButton :text="iconback" /> -->
                    <ActionItem :icon="fontback" ios.position="left" class="mdi-ab" @Tap="goBack" />
                    <!-- <SearchBar hint="Search..." /> -->
                    <ActionItem :icon="fonthome" ios.position="right" class="mdi-ab" @Tap="toHome" />
                    <ActionItem :icon="fontsearch" ios.position="left" class="mdi-ab" @Tap="toSearch" />
                    <ActionItem :icon="fontmessage" ios.position="right" class="mdi-ab" @Tap="toMessage" />
                    <ActionItem ios.position="right">
                        <NSImg :src="src_account_login" roundAsCircle="true" stretch=fitCenter class="avatar"></NSImg>
                    </ActionItem>
                    <!-- <ActionItem :icon="fontaccount" ios.position="right" class="mdi" /> -->
                </template>
                <template v-else>
                    <NavigationButton android.systemIcon="ic_menu_back" @Tap="goBack" />
                    <!-- <ActionItem :icon="fontback" android.position="actionBar" class="mdi" /> -->
                    <!-- <SearchBar hint="Search..." /> -->
                    <ActionItem :icon="fonthome" android.position="actionBar" class="mdi-ab" @Tap="toHome" />
                    <ActionItem :icon="fontsearch" android.position="actionBar" class="mdi-ab" @Tap="toSearch" />
                    <ActionItem :icon="fontmessage" android.position="actionBar" class="mdi-ab" @Tap="toMessage" />
                    <ActionItem android.position="actionBar">
                        <NSImg :src="src_account_login" roundAsCircle="true" stretch=fitCenter></NSImg>
                    </ActionItem>
                    <!-- <ActionItem :icon="fontaccount" android.position="actionBar" class="mdi" /> -->
                </template>
            </ActionBar>
            <Frame id="main-frame" row="0">
                <HomePage />
            </Frame>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, computed } from "nativescript-vue";
import { TapGestureEventData } from "@nativescript/core/ui/gestures";
import { $navigateTo, $navigateBack } from "nativescript-vue";
import HomePage from "./HomePage.vue";
import Page1 from "./Page1.vue";
import Page2 from "./Page2.vue";

const isIOS = ref(global.isIOS)

const fontback = "font://\uf2fa"
const fontsearch = "font://\uf1c3"
const fonthome = "font://\uf175"

const fontmessage_nonew = "font://\uf15a"
const fontmessage_withnew = "font://\uf159"
const withnewmessage = ref(false)
const fontmessage = computed(()=>{
    if (withnewmessage.value){
        return fontmessage_withnew
    }
    return fontmessage_nonew
})
const fontaccount = "font://\uf207"
const src_account_login = "https://img.duoziwang.com/2021/04/08101559830055.jpg"

function goBack(evt: TapGestureEventData) {
    console.log("tap goBack!")
    $navigateBack({
        frame: "main-frame",
    })
}
function toHome(evt: TapGestureEventData) {
    console.log("tap toHome!")
    $navigateTo(HomePage, {
        transition: { name: "fade" },
        frame: "main-frame",
    });
}
function toSearch(evt: TapGestureEventData) {
    console.log("tap toSearch!")
    $navigateTo(Page1, {
        transition: { name: "fade" },
        frame: "main-frame",
    });
}
function toMessage(evt: TapGestureEventData) {
    console.log("tap toMessage!")
    $navigateTo(Page2, {
        transition: { name: "fade" },
        frame: "main-frame",
    });
}
</script>