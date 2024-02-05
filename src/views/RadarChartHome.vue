<template>
    <Page actionBarHidden="true">
        <StackLayout>
            <RadarChart ref="Elechart" @loaded="onChartLoaded" />
        </StackLayout>
    </Page>
</template>
    
  
<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import { RadarChart } from "@nativescript-community/ui-chart/charts/RadarChart";
import { RadarData } from "@nativescript-community/ui-chart/data/RadarData";
import { RadarDataSet } from "@nativescript-community/ui-chart/data/RadarDataSet";
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
    const chart = Elechart.value._nativeView as RadarChart;

    // 设置点击高亮
    chart.setHighlightPerTapEnabled(true);
    chart.setWebColor("red");
    chart.setWebColorInner("blue");

    //y轴
    let yl = chart.getYAxis()
    yl.setSuggestedAxisMinimum(0)
    yl.setSpaceMax(2)
    let xl = chart.getXAxis()
    xl.setTextColor("green");

    // 构造要渲染的数据,index为横轴,value为纵轴
    let entries = [];
    const parties = ["Party A", "Party B", "Party C", "Party D", "Party E"];
    for (let i = 0; i < 5; i++) {
        entries.push({
            y: Math.random() * 10,
        });
    }
    const dataSet = new RadarDataSet(entries, "性能指标", "y");
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
            return "";
        },
        getRadarLabel(value: any, entry: RadarEntry): string {
            return `${value}`;
        },
        getBubbleLabel(value: any, entry: BubbleEntry): string {
            return "";
        },
        getCandleLabel(value: any, entry: CandleEntry): string {
            return "";
        },
    });
    dataSet.setDrawValues(true);
    const data = new RadarData([dataSet]);
    data.setLabels(parties);
    chart.setData(data);
}
</script>