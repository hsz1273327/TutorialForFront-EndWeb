<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Label text="Home" id="banner" ref="banner"></Label>
                <Button :text="`${iconUnicode('\uf067')} snackbar`" @tap="onActionTap" @doubleTap="onActionDoubleTap"
                    @longPress="onActionLongPress" class="fas" />
                <MDButton :text="`${iconUnicode('\uf067')} snackbar`" @tap="onActionTap" @doubleTap="onActionDoubleTap"
                    @longPress="onActionLongPress" class="fas" />
                <MDButton :text="`${iconUnicode('\uf067')} snackbar`" @tap="onActionTap" @doubleTap="onActionDoubleTap"
                    @longPress="onActionLongPress" variant="flat" class="fas" />
                <MDButton :text="`${iconUnicode('\uf067')} snackbar`" @tap="onActionTap" @doubleTap="onActionDoubleTap"
                    @longPress="onActionLongPress" variant="text" class="fas" />
                <!-- <MDFloatingActionButton rippleColor="blue" src="res://ic_input_add"/> -->
                <MDFloatingActionButton rippleColor="blue" src="res://fa_plus" @tap="onActionTap"
                    @doubleTap="onActionDoubleTap" @longPress="onActionLongPress" />

                <fab rippleColor="blue" :text="iconUnicode('\uf067')" @tap="onActionTap" class="fas fab-button"></fab>

                <MDSpeedDial :text="iconUnicode('\uf067')" buttonClass="fas" horizontalAlignment="right">
                    <MDSpeedDialItem :text="iconUnicode('\uf1eb')" title="test1" buttonClass="fas" @tap="onActionTap" />
                    <MDSpeedDialItem :text="iconUnicode('\uf7d9')" title="test2" buttonClass="fas" @tap="onActionTap" />
                    <MDSpeedDialItem :text="iconUnicode('\uf027')" title="test3" buttonClass="fas" @tap="onActionTap" />
                    <MDSpeedDialItem :text="iconUnicode('\uf492')" title="test4" buttonClass="fas" backgroundColor="orange"
                        @tap="onActionTap" />
                </MDSpeedDial>
            </StackLayout>
        </Page>
    </Frame>
</template>
    
<script lang="ts" setup>
import { EventData } from "@nativescript/core/data/observable";


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
  