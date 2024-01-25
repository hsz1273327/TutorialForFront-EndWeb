<template>
    <SwipeMenu width="300" height="300" leftSwipeDistance="300" :translationFunction="drawerTranslationFunction">
        <GridLayout rows="40,*,auto" margin="10" height="300" rippleColor="blue" elevation="6" ~mainContent width="100%"
            backgroundColor="#2ecc71" borderRadius="10">
            <!--title部分-->
            <StackLayout orientation="horizontal" row="0">
                <GridLayout columns="40,*">
                    <NSImg :src="iconImgURL" stretch="fitCenter" roundAsCircle="true" col="0" />
                    <Label :text="title" class="title" col="1"></Label>
                </GridLayout>
            </StackLayout>
            <!--多媒体部分 -->
            <NSImg :src="mediaImgURL" row="1" />
            <!--文本部分 -->
            <Label :text="description" row="2" />
        </GridLayout>
        <!-- </MDCardView> -->
        <Stacklayout ~leftDrawer orientation="horizontal" width="200">
            <Label text="a" width="100" height="100%" backgroundColor="red" textAlignment="center" borderTopLeftRadius="10" borderBottomLeftRadius="10" />
            <Label text="b" width="100" height="100%" backgroundColor="blue" textAlignment="center" />
        </Stacklayout>
    </SwipeMenu>
</template>
    
<script lang="ts" setup>
import { defineProps, ref } from "nativescript-vue";

const props = defineProps<{
    title: string,
    iconImgURL: string,
    mediaImgURL: string,
    description: string
}>()

const menuOpened = ref(false)
function drawerTranslationFunction(side, width, value, delta, progress) {
    const result = {
        mainContent: {
            translateX: side === 'right' ? -delta : delta
        }
    } as any;

    return result;
}
</script>
