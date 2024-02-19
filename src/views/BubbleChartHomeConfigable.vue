<template>
    <frame id="main-frame">
        <Page actionBarHidden="true">
            <StackLayout height="400">
                <ConfigurableBubbleChart :datasetSetting="data" :dataSetting="dataSetting" :axisXSetting="axisXSetting"
                    :axisYSetting="axisYSetting" :hardwareAccelerated="true" />
            </StackLayout>
        </Page>
    </frame>
</template>
<script lang="ts" setup>
import ConfigurableBubbleChart from '../configurable-ui-chart/ConfigurableBubbleChart.vue'
import { BubbleDataSetSetting, BubbleDataSetting, AxisXSetting, AxisYWithRightAxisSetting } from '../configurable-ui-chart/configurablechartdata'
const axisXSetting: AxisXSetting = {
    position: "bottom",
    lineWidth: 3,
    minimum: 0,
    withGridLine: false
}
const axisYSetting: AxisYWithRightAxisSetting = {
    axisRightEnable: false,
    minimum: 0,
    withGridLine: false
}

const dataSetting: BubbleDataSetting = {
    valueTextSize: 8,
    valueTextColor: 'white',
    highlightCircleWidth: 1.5
}
function gen_data(): BubbleDataSetSetting[] {
    const values1 = [];
    const values2 = [];
    const values3 = [];
    for (let i = 0; i < 20; i++) {
        values1.push({
            y: Math.random() * 100,
            x: Math.random() * 10,
            size: Math.random() * 100,
        });
        values2.push({
            y: Math.random() * 100,
            x: Math.random() * 10,
            size: Math.random() * 100,
        });
        values3.push({
            y: Math.random() * 100,
            x: Math.random() * 10,
            size: Math.random() * 100
        });
    }
    let datasetting = [
        {
            values: values1,
            label: 'DS 1',
            form: "SQUARE",
            color: "red",
            drawValues: true,
        },
        {
            values: values2,
            label: 'DS 2',
            form: "SQUARE",
            color: "green",
            drawValues: true,

        },
        {
            values: values3,
            label: 'DS 3',
            form: "SQUARE",
            color: "blue",
            drawValues: false,
        }
    ]

    return datasetting
}
const data = gen_data()
</script>
