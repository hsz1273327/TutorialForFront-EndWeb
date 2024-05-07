<template>
    <StackLayout class="page">
        <GestureRootView>
            <Button  ref="b2" text="GestureRootView should work"  borderColor="green" @tap="buttonTest" />
        </GestureRootView>
    </StackLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'nativescript-vue'
import { EventData,Button } from '@nativescript/core'
import { GestureHandlerTouchEvent, GestureHandlerStateEvent, GestureStateEventData, GestureTouchEventData, HandlerType, Manager } from '@nativescript-community/gesturehandler'

const b2 = ref()

function onGestureTouch(args: GestureTouchEventData) {
    const { state, extraData, view } = args.data;
    view.translateX = extraData.translationX;
    view.translateY = extraData.translationY;
    console.log('b2 onGestureTouch', state, view, extraData);
}
function onGestureState(args: GestureStateEventData) {
    const { state, prevState, extraData, view } = args.data;
    console.log('b2 onGestureState', state, prevState, view, extraData);
}
const manager = Manager.getInstance();
const gestureHandler = manager.createGestureHandler(HandlerType.PAN, 10, {
    shouldCancelWhenOutside: false
})

function buttonTest(evt: EventData) {
    const button = evt.object as Button
    button.closeModal({
        name: 'a message',
    })
    // console.log(`buttonTest get Gesture ${evt.eventName} : ${ evt.eventData.state },${evt.eventData.prevState },${ JSON.stringify(evt.eventData.extraData) } `)
}

onMounted(() => {
    gestureHandler.on(GestureHandlerTouchEvent, onGestureTouch,b2.value._nativeView)
    gestureHandler.on(GestureHandlerStateEvent, onGestureState,b2.value._nativeView)
    gestureHandler.attachToView(b2.value._nativeView)
})
</script>

<style lang="scss" scoped>
.page Label {
    font-size: 35;
    text-align: center;
    width: 100%;
    vertical-alignment: center;
    color: #ffffff;
    text-transform: uppercase;
}
</style>