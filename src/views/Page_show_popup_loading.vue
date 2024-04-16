<template>
    <Frame>
        <Page actionBarHidden="true">
            <ScrollView>
                <StackLayout>
                    <Button text="Indeterminate" @tap="onActionTapIndeterminate" />
                    <Button text="Determinate" @tap="onActionTapDeterminate" />
                    <Button text="DeterminateHorizontalBar" @tap="onActionTapDeterminateHorizontalBar" />
                    <Button text="AnnularDeterminate" @tap="onActionTapAnnularDeterminate" />
                    <!-- <Button text="CustomView" @tap="onActionTapCustomView"/> -->
                    <Button text="Text" @tap="onActionTapText" />
                </StackLayout>
            </ScrollView>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { EventData } from '@nativescript/core'
import { LoadingIndicator, Mode, OptionsCommon } from '@nstudio/nativescript-loading-indicator'

const sleep = (time: number) => new Promise((res, rej) => setTimeout(res, time));

const loader = new LoadingIndicator()

async function onActionTapIndeterminate(evt: EventData) {
    const options: OptionsCommon = {
        message: 'Loading...',
        details: 'onActionTapIndeterminate!',
        margin: 10,
        dimBackground: true,
        color: '#4B9ED6', // color of indicator and labels
        // background box around indicator
        // hideBezel will override this if true
        backgroundColor: 'yellow',
        userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
        hideBezel: true, // default false, can hide the surrounding bezel
        mode: Mode.Indeterminate,
    };
    loader.show(options)
    await sleep(4000)
    loader.hide()
}

async function onActionTapDeterminate(evt: EventData) {
    for (let i of [0, 0.25, 0.5, 0.75]) {
        let options: OptionsCommon = {
            message: 'Loading...',
            details: 'onActionTapDeterminate!',
            progress: i,
            margin: 10,
            dimBackground: true,
            color: '#4B9ED6', // color of indicator and labels
            // background box around indicator
            // hideBezel will override this if true
            backgroundColor: 'yellow',
            userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
            hideBezel: true, // default false, can hide the surrounding bezel
            mode: Mode.Determinate,
        };
        loader.show(options)
        await sleep(1000)
    }
    let options = {
        message: 'Loading Completed',
        details: 'onActionTapDeterminate!',
        progress: 1,
        margin: 10,
        dimBackground: true,
        color: '#4B9ED6', // color of indicator and labels
        // background box around indicator
        // hideBezel will override this if true
        backgroundColor: 'yellow',
        userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
        hideBezel: true, // default false, can hide the surrounding bezel
        mode: Mode.Determinate,
    };
    loader.show(options)
    await sleep(500)
    loader.hide()
}
async function onActionTapDeterminateHorizontalBar(evt: EventData) {
    for (let i of [0, 0.25, 0.5, 0.75]) {
        let options: OptionsCommon = {
            message: 'Loading...',
            details: 'onActionTapDeterminateHorizontalBar!',
            progress: i,
            margin: 10,
            dimBackground: true,
            color: '#4B9ED6', // color of indicator and labels
            // background box around indicator
            // hideBezel will override this if true
            backgroundColor: 'yellow',
            userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
            hideBezel: true, // default false, can hide the surrounding bezel
            mode: Mode.DeterminateHorizontalBar,
        };
        loader.show(options)
        await sleep(1000)
    }
    let options = {
        message: 'Loading Completed',
        details: 'onActionTapDeterminateHorizontalBar!',
        progress: 1,
        margin: 10,
        dimBackground: true,
        color: '#4B9ED6', // color of indicator and labels
        // background box around indicator
        // hideBezel will override this if true
        backgroundColor: 'yellow',
        userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
        hideBezel: true, // default false, can hide the surrounding bezel
        mode: Mode.DeterminateHorizontalBar,
    };
    loader.show(options)
    await sleep(500)
    loader.hide()
}

async function onActionTapAnnularDeterminate(evt: EventData) {
    for (let i of [0, 0.25, 0.5, 0.75]) {
        let options: OptionsCommon = {
            message: 'Loading...',
            details: 'onActionTapAnnularDeterminate!',
            progress: i,
            margin: 10,
            dimBackground: true,
            color: '#4B9ED6', // color of indicator and labels
            // background box around indicator
            // hideBezel will override this if true
            backgroundColor: 'yellow',
            userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
            hideBezel: true, // default false, can hide the surrounding bezel
            mode: Mode.AnnularDeterminate,
        };
        loader.show(options)
        await sleep(1000)
    }
    let options = {
        message: 'Loading Completed',
        details: 'onActionTapAnnularDeterminate!',
        progress: 1,
        margin: 10,
        dimBackground: true,
        color: '#4B9ED6', // color of indicator and labels
        // background box around indicator
        // hideBezel will override this if true
        backgroundColor: 'yellow',
        userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
        hideBezel: true, // default false, can hide the surrounding bezel
        mode: Mode.AnnularDeterminate,
    };
    loader.show(options)
    await sleep(500)
    loader.hide()
}

async function onActionTapText(evt: EventData) {
    let options: OptionsCommon = {
        message: 'Loading...',
        details: 'onActionTapText!',
        margin: 10,
        dimBackground: true,
        color: '#4B9ED6', // color of indicator and labels
        // background box around indicator
        // hideBezel will override this if true
        backgroundColor: 'yellow',
        userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
        hideBezel: true, // default false, can hide the surrounding bezel
        mode: Mode.Text,
    };
    loader.show(options)
    await sleep(4000)
    options = {
        message: 'Completed!',
        details: 'onActionTapText!',
        margin: 10,
        dimBackground: true,
        color: '#4B9ED6', // color of indicator and labels
        // background box around indicator
        // hideBezel will override this if true
        backgroundColor: 'yellow',
        userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
        hideBezel: true, // default false, can hide the surrounding bezel
        mode: Mode.Text,
    };
    loader.show(options)
    await sleep(500)
    loader.hide()
}

</script>