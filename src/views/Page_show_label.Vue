<template>
    <Frame>
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
                <TextView text="Multi\nLine\nText" editable="false" />

                <TextView editable="false">
                    <FormattedString>
                        <Span text="You can use text attributes such as " />
                        <Span text="bold, " fontWeight="Bold" />
                        <Span text="italic " fontStyle="Italic" />
                        <Span text="and " />
                        <Span text="underline." textDecoration="Underline" />
                    </FormattedString>
                </TextView>

                <HtmlView :html="htmlString" />

                <HTMLLabel fontSize="50" fontFamily="Cabin Sketch,res/cabinsketch" width="100%" paddingTop="5"
                    color="#336699" textWrap="true" :html="htmlText" verticalAlignment="top" />
                <CanvasLabel id="canvaslabel" fontSize="10" color="white" backgroundColor="darkgray">
                    <CGroup fontSize="18" verticalAlignment="middle" paddingLeft="20">
                        <CSpan :text="line('canvaslabel')" fontWeight="bold" />
                        <CSpan :text="line('next line')" color="#ccc" fontSize="16" />
                    </CGroup>
                    <CSpan text="end" color="lightgray" fontSize="14" textAlignment="right" paddingRight="20"
                        paddingTop="4" />
                </CanvasLabel>
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref } from "nativescript-vue";
const htmlString = ref(`
<h1 style="color: black; font-family: ui-sans-serif, system-ui;">
  <span style="color: #65adf1;">Html</span>View
</h1>
`)
const htmlText = ref("this is a <br>html<br> label")

function line(row: string): string {
    return `${row}\n`
}
</script>