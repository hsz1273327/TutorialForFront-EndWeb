<template>
    <Page actionBarHidden="true">
        <StackLayout>
            <PieChart ref="Elechart" @loaded="onChartLoaded" />
        </StackLayout>
    </Page>
</template>
    
  
<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import {
    LegendHorizontalAlignment,
    LegendOrientation,
    LegendVerticalAlignment,
} from "@nativescript-community/ui-chart/components/Legend";
import { ColorTemplate } from "@nativescript-community/ui-chart/utils/ColorTemplate";
import { PieChart } from "@nativescript-community/ui-chart/charts/PieChart";
import { PieData } from "@nativescript-community/ui-chart/data/PieData";
import { PieDataSet } from "@nativescript-community/ui-chart/data/PieDataSet";

import { PieEntry } from "@nativescript-community/ui-chart/data/PieEntry";
import { BaseEntry } from "@nativescript-community/ui-chart/data/BaseEntry";
import { AxisBase } from "@nativescript-community/ui-chart/components/AxisBase";
import { BarEntry } from "@nativescript-community/ui-chart/data/BarEntry";
import { Entry } from "@nativescript-community/ui-chart/data/Entry";
import { RadarEntry } from "@nativescript-community/ui-chart/data/RadarEntry";
import { BubbleEntry } from "@nativescript-community/ui-chart/data/BubbleEntry";
import { CandleEntry } from "@nativescript-community/ui-chart/data/CandleEntry";
const Elechart = ref()
function onChartLoaded() {
    const chart = Elechart.value._nativeView as PieChart;

    // 设置使用百分比数值
    chart.setUsePercentValues(true);
    chart.getDescription().setEnabled(false);
    chart.setExtraOffsets(5, 10, 5, 5);
    chart.setDragDecelerationFrictionCoef(0.95);
    // 设置中心文本
    chart.setDrawCenterText(true);
    chart.setCenterText("中心文本");
    // 中间留出空洞和空洞样式
    chart.setDrawHoleEnabled(true);
    chart.setHoleColor("white");
    chart.setHoleRadius(58);
    //透明环样式
    chart.setTransparentCircleColor("white");
    chart.setTransparentCircleAlpha(110);
    chart.setTransparentCircleRadius(61);
    //触摸旋转样式设置
    chart.setRotationEnabled(true);
    chart.setRotationAngle(0);
    // 设置点击高亮
    chart.setHighlightPerTapEnabled(true);
    //设置图例
    const l = chart.getLegend();
    l.setEnabled(true);
    l.setVerticalAlignment(LegendVerticalAlignment.TOP);
    l.setHorizontalAlignment(LegendHorizontalAlignment.RIGHT);
    l.setOrientation(LegendOrientation.VERTICAL);
    l.setDrawInside(false);
    l.setXEntrySpace(7);
    l.setYEntrySpace(0);
    l.setYOffset(0);
    //设置实体label的样式
    chart.setEntryLabelColor("white");
    chart.setEntryLabelTextSize(12);
    chart.setDrawEntryLabels(true);


    // 构造要渲染的数据,index为横轴,value为纵轴
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
    const dataSet = new PieDataSet(entries, "Pie test labels", "y");
    dataSet.setSliceSpace(3);
    dataSet.setIconsOffset({ x: 0, y: 40 });
    dataSet.setSelectionShift(5);

    //设置颜色,颜色从ColorTemplate中获取,渲染时按位置获取颜色
    const colors = [];
    colors.push(...ColorTemplate.VORDIPLOM_COLORS);
    colors.push(...ColorTemplate.JOYFUL_COLORS);
    colors.push(...ColorTemplate.COLORFUL_COLORS);
    colors.push(...ColorTemplate.LIBERTY_COLORS);
    colors.push(...ColorTemplate.PASTEL_COLORS);
    colors.push(ColorTemplate.getHoloBlue());
    dataSet.setColors(colors);
    //设置渲染每一块时展示的对应文本,只有`getPieLabel`有用其他都只是为了满足接口
    dataSet.setValueFormatter({
        getFormattedValue(value: number, entry?: BaseEntry): string {
            return "";
        },
        getAxisLabel(value: number, axis: AxisBase): string {
            return "";
        },
        getBarLabel(value: any, entry: BarEntry): string {
            return "";
        },
        getBarStackedLabel(value: any, entry: BarEntry): string {
            return "";
        },
        getPointLabel(value: any, entry: Entry): string {
            return "";
        },
        getPieLabel(value: any, entry: PieEntry): string {
            return `${entry.label}:${value}`;
        },
        getRadarLabel(value: any, entry: RadarEntry): string {
            return "";
        },
        getBubbleLabel(value: any, entry: BubbleEntry): string {
            return "";
        },
        getCandleLabel(value: any, entry: CandleEntry): string {
            return "";
        },
    });
    //启用渲染每一块上的文本标识
    dataSet.setDrawValues(true);
    const data = new PieData([dataSet]);

    data.setValueTextSize(11);
    data.setValueTextColor("white");
    chart.setData(data);
}

</script>