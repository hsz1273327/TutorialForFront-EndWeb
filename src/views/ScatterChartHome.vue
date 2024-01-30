<template>
    <frame id="main-frame">
        <Page actionBarHidden="true">
            <StackLayout>
                <SimpleScatterChart :dataSetting="data" />
            </StackLayout>
        </Page>
    </frame>
</template>
<script lang="ts" setup>
import SimpleScatterChart from '../components/SimpleScatterChart.vue'
import { ScatterDataSetting } from '../components/simplechartdata'
function gen_data(): ScatterDataSetting[] {
    const values1 = [];
    const values2 = [];
    const values3 = [];
    const range = 100;
    for (let i = 0; i < 20; i++) {
        values1.push({ y: Math.random() * range + 3, x: Math.random() * 5 });
        values2.push({ y: Math.random() * range + 3 + 0.33, x: Math.random() * 5 });
        values3.push({ y: Math.random() * range + 3 + 0.66, x: Math.random() * 5 });
    }
    let datasetting = [
        {
            values: values1,
            label: 'DS 1',
            form: "SQUARE",
            shape: "SQUARE",
            color: "red",
            shapesize: 8
        },
        {
            values: values2,
            label: 'DS 2',
            form: "SQUARE",
            shape: "CIRCLE",
            color: "blue",
            shapeholeColor: "green",
            shapeholeRadius: 3,
            shapesize: 8
        },
        {
            values: values3,
            label: 'DS 3',
            form: "SQUARE",
            shape: "X",
            color: "green",
            shapesize: 8
        },
    ]
    return datasetting
}
const data = gen_data()
</script>
