<template>
    <Frame>
        <Page actionBarHidden="true">
            <ScrollView>
                <StackLayout>
                    <Label text="Home" id="banner" ref="banner"></Label>
                    <MDSpeedDial :text="iconUnicode('\uf207')" buttonClass="mdi" horizontalAlignment="right">
                        <MDSpeedDialItem :text="iconUnicode('\uf35b')" title="test1" buttonClass="mdi" @tap="onActionTap" />
                        <MDSpeedDialItem :text="iconUnicode('\uf35e')" title="test2" buttonClass="mdi" @tap="onActionTap" />
                        <MDSpeedDialItem :text="iconUnicode('\uf362')" title="test3" buttonClass="mdi" @tap="onActionTap" />
                        <MDSpeedDialItem :text="iconUnicode('\uf34e')" title="test4" buttonClass="mdi"
                            backgroundColor="orange" @tap="onActionTap" />
                    </MDSpeedDial>
                </StackLayout>
            </ScrollView>
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
</script>
  