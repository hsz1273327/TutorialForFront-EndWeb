<template>
    <frame id="main-frame">
        <Page actionBarHidden="true">
            <StackLayout height="400">
                <ConfigurableCandleStickChart :dataSetting="data" :axisXSetting="axisXSetting" :axisYSetting="axisYSetting" />
            </StackLayout>
        </Page>
    </frame>
</template>
    
<script lang="ts" setup>
import ConfigurableCandleStickChart from '../configurable-ui-chart/ConfigurableCandleStickChart.vue'
import { CandleStickDataSetting, AxisXSetting, AxisYSetting } from '../configurable-ui-chart/configurablechartdata'
const axisXSetting: AxisXSetting = {
    position: "bottom",
    lineWidth: 3,
    withGridLine: false
}
const axisYSetting: AxisYSetting = {
    axisRightEnable: false,
    minimum: 0,
    maximum: 100,
    lineWidth: 3,
    withGridLine: false
}
function gen_data(): CandleStickDataSetting {
    const values1 = [];
    chart.resetTracking();
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
        });
    }
    const set1 = new CandleDataSet(values, "Data Set");
    set1.setDrawIcons(false);
    set1.setAxisDependency(AxisDependency.LEFT);
    //设置open<close
    set1.setDecreasingColor("green");
    set1.setDecreasingPaintStyle(Style.FILL);
    //设置open>close
    set1.setIncreasingColor("red");
    set1.setIncreasingPaintStyle(Style.STROKE);
    //设置当open==close的情况
    // set1.setNeutralColor("blue");
    //设置影线
    // set1.setShadowColor("darkgray");
    set1.setShadowColorSameAsCandle(true);
    set1.setShadowWidth(0.7);
}
const data = gen_data()
</script>