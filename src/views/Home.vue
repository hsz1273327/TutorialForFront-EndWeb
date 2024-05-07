<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Button ref="b1" text="test modal view should work" borderColor="red" @tap="openModal" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, onMounted, $showModal } from 'nativescript-vue'
import { EventData } from '@nativescript/core'
import ModalView from './ModalView.vue';
import { GestureHandlerTouchEvent, GestureHandlerStateEvent, GestureStateEventData, GestureTouchEventData, HandlerType, Manager } from '@nativescript-community/gesturehandler'

const b1 = ref()

function onGestureTouch(args: GestureTouchEventData) {
    const { state, extraData, view } = args.data;
    view.translateX = extraData.translationX;
    view.translateY = extraData.translationY;
    console.log('b1 onGestureTouch', state, view, extraData);
}
function onGestureState(args: GestureStateEventData) {
    const { state, prevState, extraData, view } = args.data;
    console.log('b1 onGestureState', state, prevState, view, extraData);
}
const manager = Manager.getInstance();
const gestureHandler = manager.createGestureHandler(HandlerType.LONG_PRESS, 10, {
    shouldCancelWhenOutside: false
})

async function openModal(evt: EventData) {
    console.log('openModal');
    await $showModal(ModalView, {
        fullscreen: false
    });
}

onMounted(() => {
    gestureHandler.on(GestureHandlerTouchEvent, onGestureTouch, b1.value._nativeView)
    gestureHandler.on(GestureHandlerStateEvent, onGestureState, b1.value._nativeView)
    gestureHandler.attachToView(b1.value._nativeView)
})
</script>
