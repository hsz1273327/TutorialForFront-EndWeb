<template>
    <frame id="main-frame">
        <Page actionBarHidden="true">
            <StackLayout>
                <ConfigurablePieChart :datasetSetting="data" :chartSetting="chartSetting" :legendSetting="legendSetting"
                    :hardwareAccelerated="true" />
            </StackLayout>
        </Page>
    </frame>
</template>
<script lang="ts" setup>
import ConfigurablePieChart from '../configurable-ui-chart/ConfigurablePieChart.vue'
import { PieChartSetting, PieDataSetSetting, LegendSetting } from '../configurable-ui-chart/configurablechartdata'

const chartSetting: PieChartSetting = {
    drawFrameRate: false,
    usePercentValues: true,
    extraOffsets: [5, 10, 5, 5],
    dragDecelerationFrictionCoef: 0.95,
    centerText: "中心文本",
    // 中间留出空洞和空洞样式
    drawHoleEnabled: true,
    holeColor: "white",
    holeRadius: 58,
    //透明环样式
    transparentCircleColor: "white",
    transparentCircleAlpha: 110,
    transparentCircleRadius: 61,
    //触摸旋转样式设置
    rotationEnabled: true,
    rotationAngle: 0,
    // 设置点击高亮
    highlightPerTapEnabled: true,

    entryLabelColor: "white",
    entryLabelTextSize: 12,
    drawEntryLabels: true
}

const legendSetting: LegendSetting = {
    enabled: true,
    verticalAlignment: "top",
    horizontalAlignment: "right",
    orientation: "verical",
    drawInside: false,
    xOffset: 0,
    xEntrySpace: 7,
    yEntrySpace: 0,
}

function gen_data(): PieDataSetSetting[] {
    let entries = [];
    const parties = [
        "Party A",
        "Party B",
        "Party C",
        "Party D",
        "Party E",
        "Party F",
        "Party G",
        "Party H",
        "Party I",
        "Party J",
        "Party K",
        "Party L",
        "Party M",
        "Party N",
        "Party O",
        "Party P",
        "Party Q",
        "Party R",
        "Party S",
        "Party T",
        "Party U",
        "Party V",
        "Party W",
        "Party X",
        "Party Y",
        "Party Z",
    ];
    for (let i = 0; i < 10; i++) {
        entries.push({
            y: Math.random() * 50 + 50 / 5,
            label: parties[i % parties.length],
        });
    }

    return [{
        values: entries,
        label: "Pie test labels",
        sliceSpace: 3,
        iconsOffset: { x: 0, y: 40 },
        selectionShift: 5,
        colorTemplates: ["VORDIPLOM_COLORS", "JOYFUL_COLORS", "COLORFUL_COLORS", "LIBERTY_COLORS", "PASTEL_COLORS", "HoloBlue"],
        drawValues: true,
        valueFormatter: "label-percent"
    }]
}
const data = gen_data()
</script>


    //启用渲染每一块上的文本标识
    dataSet.setDrawValues(true);