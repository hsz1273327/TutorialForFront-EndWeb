<template>
    <MDCardView margin="10" width="300" height="200" rippleColor="blue" elevation="6">
        <GridLayout rows="40,*,40" backgroundColor="#2ecc71">
            <!-- title部分 -->
            <Label :text="title" class="title" col="0"></Label>
            <!--简介部分 -->
            <Label :text="description" row="1" />
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
    // iconImgURL: string,
    // mediaImgURL: string,
    description: string
}>()
</script>
