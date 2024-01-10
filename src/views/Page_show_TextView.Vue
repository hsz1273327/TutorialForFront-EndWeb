<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
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
                <TextView v-model="textViewValue" />
            </StackLayout>
        </Page>
    </Frame>
</template>
  
<script lang="ts" setup>
import { ref } from "nativescript-vue";
const textViewValue = ref("use v-mode")

</script>