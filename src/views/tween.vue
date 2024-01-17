<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Button text="Start Animation" @tap="startTween" />
                <AbsoluteLayout ref="box" width="30" height="30" backgroundColor="red" horizontalAlignment="center"
                    verticalAlignment="center"></AbsoluteLayout>
            </StackLayout>
        </Page>
    </Frame>
</template>
  
<script lang="ts" setup>
import { computed, ref } from 'nativescript-vue';
import { TWEEN } from '@nativescript-community/tween';

const box = ref()
const boxRef = computed(() => box.value.nativeView)


function startTween() {
    new TWEEN.Tween({ value: 30 })
        .easing(TWEEN.Easing.Quadratic.In)
        .to({ value: 300 }, 1000)
        .onStart(() => {
            console.log("The tween has stated...");
        })
        .onComplete(() => {
            console.log("The tween has completed...");
        })
        .onUpdate(obj => {
            boxRef.value.width = obj.value;
        })
        .start(0)
}
</script>
  