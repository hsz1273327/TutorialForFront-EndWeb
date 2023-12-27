<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Label text="Home" id="banner" ref="banner"></Label>
                <Button text="snackbar" @tap="onActionTapSnackbar" />
            </StackLayout>
        </Page>
    </Frame>
</template>
    
<script lang="ts" setup>
import { EventData } from "@nativescript/core/data/observable";
import { showSnack, SnackBarAction, DismissReasons } from "@nativescript-community/ui-material-snackbar";
interface showSnackResult {
    command: SnackBarAction;
    reason: DismissReasons;
    event: number;
}


function onActionTapSnackbar(evt: EventData) {
    showSnack({
        message: "this is test snack with action!",
        actionText: "done",
    }).then((r: showSnackResult) => {
        console.log("showSnack result", r);
    });
}
</script>