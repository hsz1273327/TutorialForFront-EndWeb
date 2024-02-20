<template>
    <Frame>
        <Page actionBarHidden="true">
            <ScrollView>
                <StackLayout>
                    <DatePicker v-model="selectedDate" />
                    <TimePicker v-model="selectedTime" />
                    <DateTimePickerFields hintDate="select date" hintTime="select time"
                        @dateChange="selectedDatetime = $event.value" :date="selectedDatetime" locale="zh_cn"
                        dateFormat="yyyy-MM-dd" timeFormat="HH:mm:ss" pickerTitleDate="choose date"
                        pickerTitleTime="choose time" />
                </StackLayout>
            </ScrollView>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref } from "nativescript-vue";

let now = new Date()
const selectedDate = ref(now)
const selectedTime = ref(now)
const selectedDatetime = ref(now)
</script>