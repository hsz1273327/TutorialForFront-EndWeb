<template>
    <frame id="main-frame">
        <Page actionBarHidden="true">
            <StackLayout height="400">
                <ConfigurableBarChart :datasetSetting="data" :dataSetting="dataSetting" :axisXSetting="axisXSetting"
                    :axisYSetting="axisYSetting" :hardwareAccelerated="true" />
            </StackLayout>
        </Page>
    </frame>
</template>
    
<script lang="ts" setup>
import ConfigurableBarChart from '../configurable-ui-chart/ConfigurableBarChart.vue'
import { BarDataSetSetting, BarDataSetting, AxisXSetting, AxisYSetting } from '../configurable-ui-chart/configurablechartdata'
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
const dataSetting: BarDataSetting = {
    barWidth: 0.1,
    groupBars: {
        fromX: 0,
        groupSpace: 0.3,
        barSpace: 0.1
    }
}
function gen_data(): BarDataSetSetting[] {
    const sets = [];
    for (let x of ["red", "yellow", "blue"]) {
        // 构造要渲染的数据,index为横轴,value为纵轴
        const myData = new Array(7).fill(0).map((v, i) => ({
            x: i,
            y: Math.random() * 100,
        }));
        const set = {
            values: myData,
            label: `test bar ${x}`,
            form: "SQUARE",
            color: x,
            valueTextSize: 9,
            stackLabels: ["a", "b", "c", "d", "e", "f", "g"],
        }
        sets.push(set)
    }
    return sets
}
const data = gen_data()
</script>