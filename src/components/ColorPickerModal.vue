<template>
    <Stacklayout backgroundColor="white" padding="25">
        <MDSlider v-model="Rvalue" minValue="0" maxValue="255" thumbColor="red" />
        <MDSlider v-model="Gvalue" minValue="0" maxValue="255" thumbColor="green" />
        <MDSlider v-model="Bvalue" minValue="0" maxValue="255" thumbColor="blue" />
        <Button text="ok" fontSize="40" :backgroundColor="RGBValue" @tap="closeModal" />
    </Stacklayout>
</template>

<script lang="ts" setup>
import { ref, computed } from "nativescript-vue";
import { EventData, Button } from '@nativescript/core'

const Rvalue = ref(0)
const Gvalue = ref(0)
const Bvalue = ref(0)
const RGBValue = computed(() => {
    try {
        const rresult = intto16(Rvalue.value)
        const gresult = intto16(Gvalue.value)
        const bresult = intto16(Bvalue.value)
        return `#${rresult}${gresult}${bresult}`
    } catch (error) {
        console.log(`rgb get error ${error}`)
        return "#000000"
    }
})
function intto16(decimal: number): string {
    if (decimal > 255) {
        decimal = 255
    }
    if (decimal < 0) {
        decimal = 0
    }
    const hexadecimal = Math.round(decimal).toString(16)
    if (hexadecimal.length != 2) {
        const result = `0${hexadecimal}`
        console.log(`intto16 get value ${result} from ${decimal}`)
        return result
    } else {
        console.log(`intto16 get value ${hexadecimal} from ${decimal}`)
        return hexadecimal
    }
}
function closeModal(evt: EventData) {
    const button = evt.object as Button
    button.closeModal({
        color: RGBValue.value,
    })
}
</script>