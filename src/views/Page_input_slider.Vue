<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Slider v-model="slider_value" minValue="0" maxValue="100" />
                <MDSlider v-model="md_slider_value" minValue="0" maxValue="100" />
                <RangeSeekBar col="1" :minValue="rangeSeekBarProp.minValue" :maxValue="rangeSeekBarProp.maxValue"
                    :valueMin="rangeSeekBarProp.valueMin" :valueMax="rangeSeekBarProp.valueMax"
                    :minRange="rangeSeekBarProp.minRange" :step="rangeSeekBarProp.step" @valueChanged="valueChanged($event)"
                    @finalValueChanged="finalValueChanged($event)" class="range-seek-bar" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref } from "nativescript-vue";
import { RangeSeekBarEventData } from '@nativescript-community/ui-range-seek-bar';

const slider_value = ref(0.5)
const md_slider_value = ref(0.5)
const rangeSeekBarProp = ref({
    minValue: 0,
    maxValue: 100,
    valueMin: 10,
    valueMax: 60,
    minRange: 10,
    step: 2.4,
})

function valueChanged(event: RangeSeekBarEventData) {
    Object.assign(this.rangeSeekBarProp, event.value);
}
function finalValueChanged(event: RangeSeekBarEventData) {
    Object.assign(this.rangeSeekBarProp, event.value);
}
</script>

<style scoped>
.range-seek-bar {
    bar-color: #8990c4;
    bar-highlight-color: #2434ad;
    thumb-color: #1a246d;
    bar-height: 10;
    corner-radius: 30;
}

/* MDSpeedDialButton {
  border-radius: 20;
}
MDSpeedDialItemButton {
  border-radius: 15;
} */
</style>