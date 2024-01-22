<template>
    <MDCardView margin="10" width="300" height="300" rippleColor="blue" elevation="6">
        <GridLayout rows="40,*,auto,40">
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
            <!--按钮部分 -->
            <StackLayout orientation="horizontal" row="3">
                <Button text="b1" />
                <Button text="b2" />
            </StackLayout>
        </GridLayout>
    </MDCardView>
</template>
    
<script lang="ts" setup>
import { defineProps } from "nativescript-vue";

const props = defineProps<{
    title: string,
    iconImgURL: string,
    mediaImgURL: string,
    description: string
}>()

</script>
