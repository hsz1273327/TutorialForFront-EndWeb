<template>
    <Frame>
        <Page actionBarHidden="true">
            <ScrollView>
                <PreviousNextView>
                    <StackLayout>
                        <Label text="placehold" />
                        <Label text="placehold" />
                        <Label text="placehold" />
                        <Label text="placehold" />
                        <Label text="placehold" />
                        <Label text="placehold" />
                        <Label text="placehold" />
                        <Label text="placehold" />
                        <Label text="placehold" />
                        <Label text="placehold" />
                        <Label text="placehold" />
                        <Label text="placehold" />
                        <Label text="placehold" />
                        <Label text="placehold" />
                        <Label text="placehold" />
                        <Label text="placehold" />
                        <TextView hint="Not working TextView hint" />
                        <TextViewWithHint hint="Working TextView hint 🤪" />
                        <MDTextField hint="md Enter text..." v-model="MDtextFieldValue" />
                        <MDTextField hint="md outline Enter text..." v-model="MDtextFieldValueoutline" variant="outline" />
                        <MDTextField hint="md filled Enter text..." v-model="MDtextFieldValuefilled" variant="filled" />
                        <TextView v-model="textViewValue" />
                        <TextView id="oneTimeCodeField" hint="code" />
                    </StackLayout>
                </PreviousNextView>
            </ScrollView>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref } from "nativescript-vue";
import { Frame, Label,getCurrentPage,TextField } from "@nativescript/core";


if (global.isIOS) {
    const iqKeyboard = IQKeyboardManager.sharedManager();
    iqKeyboard.overrideKeyboardAppearance = true;
    // iqKeyboard.keyboardAppearance = UIKeyboardAppearance.Dark;
    iqKeyboard.toolbarBarTintColor = new UIColor( { red: 255, green: 0, blue: 255, alpha: 0.5 })
    iqKeyboard.shouldShowToolbarPlaceholder = true
    // iqKeyboard.toolbarDoneBarButtonItemImage = new UIImage({ data: new NSData({base64Encoding: "string"}) })
    iqKeyboard.toolbarManageBehaviour = 2
    
    const mfaCodeField = getCurrentPage().getViewById('oneTimeCodeField') as TextField
    if (mfaCodeField !== null && mfaCodeField.ios) {
        mfaCodeField.ios.textContentType = UITextContentTypeOneTimeCode;
    }
}



const textFieldValue = ref("")
const MDtextFieldValue = ref("")
const MDtextFieldValueoutline = ref("")
const MDtextFieldValuefilled = ref("")

const textViewValue = ref("")

</script>