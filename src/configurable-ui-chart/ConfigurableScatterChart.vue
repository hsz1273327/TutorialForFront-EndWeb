<template>
    <ScatterChart ref="Elechart" @loaded="onChartLoaded" />
</template>
<script lang="ts" setup>
import { ref, defineProps, withDefaults } from 'nativescript-vue';
import { ScatterChart } from '@nativescript-community/ui-chart/charts/ScatterChart';
import { ScatterData } from '@nativescript-community/ui-chart/data/ScatterData';
import { ScatterDataSet } from '@nativescript-community/ui-chart/data/ScatterDataSet';
import { ChartSetting, DefaultChartSetting, LegendSetting, DefaultLegendSetting, LegendSettingToConfig, ScatterDataSetting, ScatterDataSettingToConfig, AxisYSetting, AxisYSettingToConfig, DefaultAxisYSetting, AxisXSetting, DefaultAxisXSetting, AxisXSettingToConfig } from './configurablechartdata';


interface Setting {
    dataSetting: ScatterDataSetting[];
    chartSetting?: ChartSetting;
    legendSetting?: LegendSetting;
    axisYSetting?: AxisYSetting;
    axisXSetting?: AxisXSetting;
}

const props = withDefaults(
    defineProps<Setting>(),
    {
        chartSetting: () => DefaultChartSetting,
        legendSetting: () => DefaultLegendSetting,
        axisYSetting: () => DefaultAxisYSetting,
        axisXSetting: () => DefaultAxisXSetting
    })
const Elechart = ref()

function onChartLoaded() {
    const chart = Elechart.value._nativeView as ScatterChart
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
    if (typeof (chartConfig.hardwareAccelerated) != "undefined") {
        chart.hardwareAccelerated = chartConfig.hardwareAccelerated
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
./configurablechartdata