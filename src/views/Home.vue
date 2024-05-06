<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <GestureRootView>
                    <Button text="should work" @fling="buttonTest" />
                </GestureRootView>
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { EventData } from '@nativescript/core'
import { GestureState } from '@nativescript-community/gesturehandler';
interface StateEventData{
    state: GestureState;
    prevState: GestureState;
    extraData: {
        [k: string]: number;
    };
}

interface GestureEventData extends EventData{
    eventData: StateEventData
}
function buttonTest(evt: GestureEventData) {
    // console.log(`buttonTest get Gesture ${JSON.stringify(evt)}`)
    console.log(`buttonTest get Gesture ${evt.eventName} : ${ evt.eventData.state },${evt.eventData.prevState },${ JSON.stringify(evt.eventData.extraData) } `)
}
</script>
