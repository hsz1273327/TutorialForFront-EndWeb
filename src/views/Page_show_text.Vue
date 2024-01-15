<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <TextField v-model="textFieldValue" hint="Enter text..." />
                <MDTextField hint="md Enter text..." v-model="MDtextFieldValue" />
                <MDTextField hint="md outline Enter text..." v-model="MDtextFieldValueoutline" variant="outline" />
                <MDTextField hint="md filled Enter text..." v-model="MDtextFieldValuefilled" variant="filled" />
                <TextView v-model="textViewValue" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref } from "nativescript-vue";

const textFieldValue = ref("")
const MDtextFieldValue = ref("")
const MDtextFieldValueoutline = ref("")
const MDtextFieldValuefilled = ref("")

const textViewValue = ref("")
</script>