<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Label text="Home" id="banner" ref="banner"></Label>
                <Button text="alert" @tap="onActionTapAlert" />
            </StackLayout>
        </Page>
    </Frame>
</template>
    
<script lang="ts" setup>
import { EventData } from "@nativescript/core/data/observable";
import { alert } from "@nativescript-community/ui-material-dialogs";


function onActionTapAlert(evt: EventData) {
    alert("this is a alert")
}
</script>