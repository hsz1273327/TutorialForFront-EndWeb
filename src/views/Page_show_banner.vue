<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Label text="Home" id="banner" ref="banner"></Label>
                <Button text="Banner" @tap="onActionTapbaner" />
            </StackLayout>
        </Page>
    </Frame>
</template>
    
<script lang="ts" setup>
import { EventData } from "@nativescript/core/data/observable";
import {Feedback, FeedbackPosition} from "nativescript-feedback";

const feedback = new Feedback();

function onActionTapbaner(evt: EventData) {
    feedback.warning({
        message: "a warning right?",
        position: FeedbackPosition.Top,
        onTap: () => console.log("showFeedbackMax tapped"),
        onHide: () => console.log("showFeedbackMax hidden")
    });
}
</script>