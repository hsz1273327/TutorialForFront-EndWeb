<template>
    <Frame>
        <Page actionBarHidden="true">
            <ScrollView>
                <GridLayout>
                    <PreviousNextView>
                        <StackLayout>
                            <TextField id="tv2" v-model="textFieldValue" hint="Enter text..." text="Say it with emoji!" />
                            <MDTextField hint="md Enter text..." v-model="MDtextFieldValue" />
                            <MDTextField hint="md outline Enter text..." v-model="MDtextFieldValueoutline"
                                variant="outline" />
                            <MDTextField hint="md filled Enter text..." v-model="MDtextFieldValuefilled" variant="filled" />
                            <TextView v-model="textViewValue" />
                        </StackLayout>
                    </PreviousNextView>
                    <KeyboardToolbar forId="tv2" height="44">
                        <GridLayout columns="*, *, *" class="toolbar">
                            <Label col="0" text="👍" @tap="appendToTextView2" />
                            <Label col="1" text="👎" @tap="appendToTextView2" />
                            <Label col="2" text="😄" @tap="appendToTextView2" />
                        </GridLayout>
                    </KeyboardToolbar>
                </GridLayout>
            </ScrollView>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref } from "nativescript-vue";
import { Frame } from "@nativescript/core";
const textFieldValue = ref("")
const MDtextFieldValue = ref("")
const MDtextFieldValueoutline = ref("")
const MDtextFieldValuefilled = ref("")

const textViewValue = ref("")

function appendToTextView2(args) {
    const textView = Frame.topmost().currentPage.getViewById("tv2");
    textView.text += args.object.text;
}
</script>