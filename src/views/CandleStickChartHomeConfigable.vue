<template>
    <frame id="main-frame">
        <Page actionBarHidden="true">
            <StackLayout height="400">
                <ConfigurableCandleStickChart :datasetSetting="data" :axisXSetting="axisXSetting"
                    :axisYSetting="axisYSetting" :datasetGen="autogendata()" :hardwareAccelerated="true"/>
            </StackLayout>
        </Page>
    </frame>
</template>
    
<script lang="ts" setup>
import ConfigurableCandleStickChart from '../configurable-ui-chart/ConfigurableCandleStickChart.vue'
import { CandleStickDataSetSetting, AxisXSetting, AxisYWithRightAxisSetting } from '../configurable-ui-chart/configurablechartdata'
const axisXSetting: AxisXSetting = {
    position: "bottom",
    lineWidth: 3,
    withGridLine: false,

}
const axisYSetting: AxisYWithRightAxisSetting = {
    axisRightEnable: false,
    lineWidth: 3,
    withGridLine: false,
    labelCount: {
        count: 7
    }
}
function gen_data(): CandleStickDataSetSetting[] {
    const values = [];
    for (let i = 0; i < 30; i++) {
        const multi = 100 + 1;
        const val = Math.random() * 40 + multi;
        const high = Math.random() * 9 + 8;
        const low = Math.random() * 9 + 8;
        const open = Math.random() * 6 + 1;
        const close = Math.random() * 6 + 1;
        const even = i % 2 == 0;
        values.push({
            high: val + high,
            low: val - low,
            open: even ? val + open : val - open,
            close: even ? val - close : val + close,
            x: i,
        });
    }
    return [{
        values: values,
        label: "Data Set",
        decreasingColor: "green",
        decreasingPaintStyle: "fill",
        increasingColor: "red",
        increasingPaintStyle: "stroke",
        shadowColorSameAsCandle: true,
        shadowWidth: 0.7,
        axisDependency: "left"
    }]
}
const data = gen_data()
function delay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
async function waitforgen(): Promise<CandleStickDataSetSetting[]> {
    await delay(1000)
    return gen_data()
}
async function* autogendata(): AsyncGenerator<CandleStickDataSetSetting[]> {
    while (true) {
        yield await waitforgen()
    }
}
</script>