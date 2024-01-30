<template>
    <ScatterChart ref="Elechart" @loaded="onChartLoaded" />
</template>
<script lang="ts" setup>
import { ref, defineProps, withDefaults } from 'nativescript-vue';
import { ScatterChart, ScatterShape } from '@nativescript-community/ui-chart/charts/ScatterChart';
import { ScatterData } from '@nativescript-community/ui-chart/data/ScatterData';
import { ScatterDataSet } from '@nativescript-community/ui-chart/data/ScatterDataSet';
import { XAxisPosition } from "@nativescript-community/ui-chart/components/XAxis";
import { ChartSetting, DefaultChartSetting, LegendSetting, DefaultLegendSetting, LegendSettingToConfig, ScatterDataSetting, ScatterDataSettingToConfig } from './simplechartdata'

interface Setting {
    dataSetting: ScatterDataSetting[];
    chartSetting?: ChartSetting;
    legendSetting?: LegendSetting;
}

const props = withDefaults(defineProps<Setting>(), { chartSetting: () => DefaultChartSetting, legendSetting: () => DefaultLegendSetting })
const Elechart = ref()

function onChartLoaded() {
    const chart = Elechart.value._nativeView as ScatterChart
    let chartConfig = { ...DefaultChartSetting }
    Object.assign(chartConfig, props.chartSetting)
    // 设置图表界面
    chart.drawFrameRate = chartConfig.drawFrameRate
    chart.setDrawGridBackground(chartConfig.setDrawGridBackground)
    chart.setTouchEnabled(chartConfig.setTouchEnabled)
    chart.setMaxHighlightDistance(chartConfig.setMaxHighlightDistance)
    chart.setDragEnabled(chartConfig.setDragEnabled)
    chart.setScaleEnabled(chartConfig.setScaleEnabled)
    chart.setMaxVisibleValueCount(chartConfig.setMaxVisibleValueCount)
    chart.setPinchZoom(chartConfig.setPinchZoom)
    // 设置图例
    let legendSetting = { ...DefaultLegendSetting }
    Object.assign(legendSetting, props.legendSetting)
    let legendConfig = LegendSettingToConfig(legendSetting)
    const l = chart.getLegend()
    l.setEnabled(legendConfig.setEnabled)
    l.setVerticalAlignment(legendConfig.setVerticalAlignment)
    l.setHorizontalAlignment(legendConfig.setHorizontalAlignment)
    l.setOrientation(legendConfig.setOrientation)
    l.setDrawInside(legendConfig.setDrawInside)
    l.setXOffset(legendConfig.setXOffset)

    // 设置坐标轴
    // y轴
    const yl = chart.getAxisLeft()
    yl.setAxisMinimum(0) // this replaces setStartAtZero(true) setAxisMaximum setAxisLineWidth setAxisLineColor setDrawLabels setDrawLabelsBehindData
    // yl.setStartAtZero(true)
    chart.getAxisRight().setEnabled(false)
    const xl = chart.getXAxis()
    //// 设置x轴的粗度
    xl.setAxisLineWidth(3)
    //// 设置x轴所在的位置,默认在顶部
    xl.setPosition(XAxisPosition.BOTTOM)
    //// 设置隐藏y轴的网格
    xl.setDrawGridLines(false)
    // 设置待渲染的设置对象,构造函数参数为待渲染的数据, 图例标签,待渲染数据中代表x轴的属性名,待渲染数据中代表y轴的属性名
    let init_data = []
    for (const datasetting of props.dataSetting) {
        const dataconfig = ScatterDataSettingToConfig(datasetting)
        let set = new ScatterDataSet(dataconfig.values, dataconfig.label, "x", "y")
        set.setForm(dataconfig.form)
        set.setScatterShape(dataconfig.shape)
        set.setScatterShapeSize(dataconfig.shapesize)
        if (dataconfig.color) {
            set.setColor(dataconfig.color);
        }
        if (dataconfig.shapeholeColor) {
            set.setScatterShapeHoleColor(dataconfig.shapeholeColor);
        }
        if (dataconfig.shapeholeRadius) {
            set.setScatterShapeHoleRadius(dataconfig.shapeholeRadius);
        }
        init_data.push(set)
    }

    // create a data object with the data sets
    const data = new ScatterData(init_data)
    // data.setValueTypeface(tfLight);
    chart.setData(data)
    chart.invalidate()
}
</script>
