<template>
    <frame id="main-frame">
        <Page actionBarHidden="true">
            <StackLayout>
                <ConfigurableLineChart :datasetSetting="data" :axisXSetting="axisXSetting" :axisYSetting="axisYSetting"
                    :hardwareAccelerated="true" :limitLinesSetting="limitLinesSetting" />
            </StackLayout>
        </Page>
    </frame>
</template>
<script lang="ts" setup>
import ConfigurableLineChart from '../configurable-ui-chart/ConfigurableLineChart.vue'
import { LineDataSetSetting, AxisXSetting, AxisYWithRightAxisSetting, LimitLinesSetting } from '../configurable-ui-chart/configurablechartdata'
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
const limitLinesSetting: LimitLinesSetting = {
    axisY: {
        linesBehindData: true,
        lines: [
            {
                limit: 90,
                label: "Upper Limit",
                width: 4,
                labelPosition: "right_top",
                dashedLine: {
                    lineLength: 10,
                    spaceLength: 10,
                    phase: 0
                },
                textSize: 10
            },
            {
                limit: 10,
                label: "Lower Limit",
                width: 4,
                labelPosition: "RIGHT_BOTTOM",
                dashedLine: {
                    lineLength: 10,
                    spaceLength: 10,
                    phase: 0
                },
                textSize: 10
            }
        ]
    }
}
function gen_data(): LineDataSetSetting[] {
    const myData = new Array(7).fill(0).map((v, i) => ({
        x: i,
        y: Math.random() * 100,
    }));
    return [{
        values: myData,
        label: "test line",
        form: "line",
        mode: "horizontal_bezier",
        color: "blue",
        circleColor: "black",
        lineWidth: 1,
        circleRadius: 3,
        drawCircleHole: false,
        formLineWidth: 1,
        formSize: 15,
        valueTextSize: 9,
        dashedHighlightLine: {
            lineLength: 10,
            spaceLength: 5,
            phase: 0
        },
        drawFilled: true,
        fillColor: "red"
    }]
}
const data = gen_data()
</script>