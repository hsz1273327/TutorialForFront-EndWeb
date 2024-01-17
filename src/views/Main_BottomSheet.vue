<template>
    <Frame>
        <Page>
            <ActionBar title="My App">
                <template v-if="isIOS">
                    <!-- <NavigationButton :text="iconback" /> -->
                    <ActionItem :icon="fontback" ios.position="left" class="mdi-ab" />
                    <!-- <SearchBar hint="Search..." /> -->
                    <ActionItem :icon="fontsearch" ios.position="left" class="mdi-ab" />
                    <ActionItem :icon="fontshare" ios.position="right" class="mdi-ab" @Tap="onButtonTap"/>
                    <ActionItem :icon="fontmessage" ios.position="right" class="mdi-ab" />
                    <ActionItem ios.position="right" >
                        <NSImg :src="src_account_login" roundAsCircle="true" stretch=fitCenter class="avatar" ></NSImg>
                    </ActionItem>
                    <!-- <ActionItem :icon="fontaccount" ios.position="right" class="mdi" /> -->
                </template>
                <template v-else>
                    <NavigationButton android.systemIcon="ic_menu_back" />
                    <!-- <ActionItem :icon="fontback" android.position="actionBar" class="mdi" /> -->
                    <!-- <SearchBar hint="Search..." /> -->

                    <ActionItem :icon="fontsearch" android.position="actionBar" class="mdi-ab" />
                    <ActionItem :icon="fontshare" android.position="actionBar" class="mdi-ab" @Tap="onButtonTap"/>
                    <ActionItem :icon="fontmessage" android.position="actionBar" class="mdi-ab" />
                    <ActionItem android.position="actionBar">
                        <NSImg :src="src_account_login" roundAsCircle="true" stretch=fitCenter></NSImg>
                    </ActionItem>
                    <!-- <ActionItem :icon="fontaccount" android.position="actionBar" class="mdi" /> -->
                </template>
            </ActionBar>
            <GridLayout rows="auto,*">
                <Frame id="main-frame" row="1">
                    <HomePage />
                </Frame>
            </GridLayout>
        </Page>
    </Frame>
</template>
  
<script lang="ts" setup>
import { ref } from "nativescript-vue";
import { TapGestureEventData } from "@nativescript/core/ui/gestures";
import HomePage from "./HomePage.vue";
import ShareBottomBar from "../components/ShareBottomBar.vue";
import { useBottomSheet } from "@nativescript-community/ui-material-bottomsheet/vue3";

const isIOS = ref(global.isIOS)
const { showBottomSheet } = useBottomSheet()
const fontback = "font://\uf2fa"
const fontsearch = "font://\uf1c3"
const fontshare = "font://\uf35b"
const fontmessage = "font://\uf15a"
const fontaccount = "font://\uf207"
const src_account_login = "https://img.duoziwang.com/2021/04/08101559830055.jpg"

const defaultIndex = ref(0)
function onButtonTap(evt: TapGestureEventData) {
    showBottomSheet(ShareBottomBar, {
        dismissOnBackgroundTap: true,
        props: {
            canCloseBottomSheet: true,
            defaultIndex: defaultIndex.value,
        },
        closeCallback: (...args: any[]) => {
            console.log("bottom sheet closed", args);
            try {
                defaultIndex.value = args[0][0][1];
            } catch (e) {
                defaultIndex.value = 0
            }
        },
    });
}
</script>