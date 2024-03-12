<template>
    <Frame>
        <Page actionBarHidden="true">
            <ScrollView>
                <StackLayout>
                    <Label text="Home" id="banner" ref="banner"></Label>
                    <Button :text="mood_snackbar" @tap="onActionTap" @doubleTap="onActionDoubleTap"
                        @longPress="onActionLongPress" class="mdi" />
                    <MDButton :text="mood_snackbar" @tap="onActionTap" @doubleTap="onActionDoubleTap"
                        @longPress="onActionLongPress" class="mdi" />
                    <MDButton :text="mood_snackbar" @tap="onActionTap" @doubleTap="onActionDoubleTap"
                        @longPress="onActionLongPress" variant="flat" class="mdi" />
                    <MDButton :text="mood_snackbar" @tap="onActionTap" @doubleTap="onActionDoubleTap"
                        @longPress="onActionLongPress" variant="text" class="mdi" />
                    <MDFloatingActionButton rippleColor="blue" src="res://logo" @tap="onActionTap"
                        @doubleTap="onActionDoubleTap" @longPress="onActionLongPress" />
                    <fab rippleColor="blue" :text="iconUnicode('\uf214')" class="mdi" @tap="onActionTap"></fab>
                </StackLayout>
            </ScrollView>
        </Page>
    </Frame>
</template>
    
<script lang="ts" setup>
import { EventData } from "@nativescript/core/data/observable";

const mood_unicode = "\uf214"
const mood_snackbar = `${mood_unicode} snackbar`
function iconUnicode(icon: string): string {
    return `${icon}`;
}
function onActionTap(evt: EventData) {
    console.log("tap ok");
}
function onActionDoubleTap(evt: EventData) {
    console.log("double tap ok");
}
function onActionLongPress(evt: EventData) {
    console.log("long press ok");
}
</script>
  