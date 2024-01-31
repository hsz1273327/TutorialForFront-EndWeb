<template>
    <BubbleChart ref="Elechart" @loaded="onChartLoaded" :hardwareAccelerated="hardwareAccelerated" />
</template>

<script lang="ts" setup>
import { ref, defineProps, withDefaults } from 'nativescript-vue';
import { BubbleChart } from '@nativescript-community/ui-chart/charts/BubbleChart';
import { BubbleData } from '@nativescript-community/ui-chart/data/BubbleData';
import { BubbleDataSet } from '@nativescript-community/ui-chart/data/BubbleDataSet';

import { ChartSetting, DefaultChartSetting, LegendSetting, DefaultLegendSetting, LegendSettingToConfig, BubbleDataSetting, BubbleDataSettingToConfig, AxisYSetting, AxisYSettingToConfig, DefaultAxisYSetting, AxisXSetting, DefaultAxisXSetting, AxisXSettingToConfig } from './configurablechartdata';


interface Setting {
    dataSetting: BubbleDataSetting;
    hardwareAccelerated: boolean;
    chartSetting?: ChartSetting;
    legendSetting?: LegendSetting;
    axisYSetting?: AxisYSetting;
    axisXSetting?: AxisXSetting;
}

const props = withDefaults(
    defineProps<Setting>(),
    {
        hardwareAccelerated: false,
        chartSetting: () => DefaultChartSetting,
        legendSetting: () => DefaultLegendSetting,
        axisYSetting: () => DefaultAxisYSetting,
        axisXSetting: () => DefaultAxisXSetting
    })
const Elechart = ref()

function onChartLoaded() {
    const chart = Elechart.value._nativeView as BubbleChart
    let chartConfig = { ...DefaultChartSetting }
    Object.assign(chartConfig, props.chartSetting)
    // 设置图表界面
    chart.drawFrameRate = chartConfig.drawFrameRate
    chart.setDrawGridBackground(chartConfig.drawGridBackground)
    chart.setTouchEnabled(chartConfig.touchEnabled)
    chart.setMaxHighlightDistance(chartConfig.maxHighlightDistance)
    chart.setDragEnabled(chartConfig.dragEnabled)
    chart.setScaleEnabled(chartConfig.scaleEnabled)
    chart.setMaxVisibleValueCount(chartConfig.maxVisibleValueCount)
    chart.setPinchZoom(chartConfig.pinchZoom)
    if (typeof (chartConfig.backgroundColor) != "undefined") {
        chart.backgroundColor = chartConfig.backgroundColor
    }
    // 设置图例
    let legendSetting = { ...DefaultLegendSetting }
    Object.assign(legendSetting, props.legendSetting)
    const legendConfig = LegendSettingToConfig(legendSetting)
    const l = chart.getLegend()
    l.setEnabled(legendConfig.enabled)
    l.setVerticalAlignment(legendConfig.verticalAlignment)
    l.setHorizontalAlignment(legendConfig.horizontalAlignment)
    l.setOrientation(legendConfig.orientation)
    l.setDrawInside(legendConfig.drawInside)
    l.setXOffset(legendConfig.xOffset)
    if (typeof (legendConfig.font) !== "undefined"){
        l.setFont(legendConfig.font)
    }
    // 设置坐标轴
    // // y轴
    let axisYSetting = { ...DefaultAxisYSetting }
    Object.assign(axisYSetting, props.axisYSetting)
    const axisYConfig = AxisYSettingToConfig(axisYSetting)
    const yl = chart.getAxisLeft()
    if (typeof (axisYConfig.spaceTop) !== "undefined") {
        yl.setSpaceTop(axisYConfig.spaceTop)
    }
    if (typeof (axisYConfig.spaceBottom) !== "undefined") {
        yl.setSpaceBottom(axisYConfig.spaceBottom)
    }
    if (typeof (axisYConfig.drawZeroLine) !== "undefined") {
        yl.setDrawZeroLine(axisYConfig.drawZeroLine)
    }
    if (typeof (axisYConfig.minimum) !== "undefined") {
        yl.setAxisMinimum(axisYConfig.minimum)
    }
    if (typeof (axisYConfig.maximum) !== "undefined") {
        yl.setAxisMaximum(axisYConfig.maximum)
    }
    if (typeof (axisYConfig.lineWidth) !== "undefined") {
        yl.setAxisLineWidth(axisYConfig.lineWidth)
    }
    if (typeof (axisYConfig.lineColor) !== "undefined") {
        yl.setAxisLineColor(axisYConfig.lineColor)
    }
    if (typeof (axisYConfig.labelPosition) !== "undefined") {
        yl.setPosition(axisYConfig.labelPosition)
    }
    if (typeof (axisYConfig.withGridLine) !== "undefined") {
        yl.setDrawGridLines(axisYConfig.withGridLine)
    }
    chart.getAxisRight().setEnabled(axisYConfig.axisRightEnable)

    //x轴
    let axisXSetting = { ...DefaultAxisXSetting }
    Object.assign(axisXSetting, props.axisXSetting)
    const axisXConfig = AxisXSettingToConfig(axisXSetting)
    const xl = chart.getXAxis()
    xl.setPosition(axisXConfig.position)
    if (typeof (axisXConfig.minimum) !== "undefined") {
        xl.setAxisMinimum(axisXConfig.minimum)
    }
    if (typeof (axisXConfig.maximum) !== "undefined") {
        xl.setAxisMaximum(axisXConfig.maximum)
    }
    if (typeof (axisXConfig.lineWidth) !== "undefined") {
        xl.setAxisLineWidth(axisXConfig.lineWidth)
    }
    if (typeof (axisXConfig.lineColor) !== "undefined") {
        xl.setAxisLineColor(axisXConfig.lineColor)
    }
    if (typeof (axisXConfig.labelRotationAngle) !== "undefined") {
        xl.setLabelRotationAngle(axisXConfig.labelRotationAngle)
    }
    if (typeof (axisXConfig.avoidFirstLastClipping) !== "undefined") {
        xl.setAvoidFirstLastClipping(axisXConfig.avoidFirstLastClipping)
    }
    if (typeof (axisXConfig.withGridLine) !== "undefined") {
        xl.setDrawGridLines(axisXConfig.withGridLine)
    }
    if (typeof (axisXConfig.valueFormat) !== "undefined") {
        xl.setValueFormatter({
            getAxisLabel: axisXConfig.valueFormat
        });
    }
    // 设置待渲染的设置对象,构造函数参数为待渲染的数据, 图例标签,待渲染数据中代表x轴的属性名,待渲染数据中代表y轴的属性名
    let init_data = []
    const datasetting = BubbleDataSettingToConfig(props.dataSetting)
    for (const data of datasetting.data) {
        let set = new BubbleDataSet(data.values, data.label, "x", "y", "size")
        set.setForm(data.form)
        if (data.color) {
            set.setColor(data.color);
        }
        if (typeof (data.drawValues) !== "undefined") {
            set.setDrawValues(data.drawValues);
        }
        init_data.push(set)
    }

    // create a data object with the data sets
    const data = new BubbleData(init_data)
    chart.setData(data)
    if (typeof (datasetting.valueTextSize) !== "undefined") {
        data.setValueTextSize(datasetting.valueTextSize);
    }
    if (typeof (datasetting.valueTextColor) !== "undefined") {
        data.setValueTextColor(datasetting.valueTextColor);
    }
    if (typeof (datasetting.highlightCircleWidth) !== "undefined") {
        data.setHighlightCircleWidth(datasetting.highlightCircleWidth);
    }

    chart.invalidate()
}
</script>