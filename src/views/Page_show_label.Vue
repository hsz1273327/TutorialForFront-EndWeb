<template>
    <Page actionBarHidden="true">
        <StackLayout>
            <Label text="this is label"></Label>
            <Label textWrap="true">
                <FormattedString>
                    <Span text="This text has a " />
                    <Span text="red " style="color: red" />
                    <Span text="piece of text. " />
                    <Span text="Also, this bit is italic, " fontStyle="italic" />
                    <Span text="and this bit is bold." fontWeight="bold" />
                </FormattedString>
            </Label>
            <HTMLLabel fontSize="50" fontFamily="Cabin Sketch,res/cabinsketch" width="100%" paddingTop="5" color="#336699"
                textWrap="true" :html="htmlText" verticalAlignment="top" />

            <!-- Clickable Link Usage -->
            <HTMLLabel html="<a href='https://www.baidu.com'>Open Baidu.com</a>" linkColor="pink" linkUnderline="false"
                fontFamily="OpenSans" fontSize="16" margin="2 5 5 5" textWrap="true" @linkTap="onLinkTap($event)">
            </HTMLLabel>
        </StackLayout>
    </Page>
</template>

<script lang="ts" setup>
import { ref } from "nativescript-vue";

const htmlText = ref("this is a <br>html<br> label")
function onLinkTap(args) {
    console.log(args.link)
}
</script>