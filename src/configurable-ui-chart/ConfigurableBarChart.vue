<template>
    <BarChart ref="Elechart" @loaded="onChartLoaded" :hardwareAccelerated="hardwareAccelerated" />
</template>
<script lang="ts" setup>
import { ref, defineProps, withDefaults } from 'nativescript-vue';
import { BarChart } from "@nativescript-community/ui-chart/charts/BarChart";
import { BarData } from "@nativescript-community/ui-chart/data/BarData";
import { BarDataSet } from "@nativescript-community/ui-chart/data/BarDataSet";
import { LimitLine } from '@nativescript-community/ui-chart/components/LimitLine';
import { ChartSetting, DefaultChartSetting, LegendSetting, DefaultLegendSetting, LegendSettingToConfig, AxisYSetting, AxisYSettingToConfig, DefaultAxisYSetting, AxisXSetting, DefaultAxisXSetting, AxisXSettingToConfig, LimitLinesSetting, LimitLinesSettingToConfig, LimitLineConfig, BarDataSetting, BarDataSettingToConfig } from './configurablechartdata';


interface Setting {
    dataSetting: BarDataSetting;
    hardwareAccelerated?: boolean;
    chartSetting?: ChartSetting;
    legendSetting?: LegendSetting;
    axisYSetting?: AxisYSetting;
    axisXSetting?: AxisXSetting;
    limitLinesSetting?: LimitLinesSetting;
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
const genll = (conf: LimitLineConfig): LimitLine => {
    let ll = new LimitLine(conf.limit, conf.label)
    if (typeof (conf.dashedLine) != "undefined") {
        ll.enableDashedLine(conf.dashedLine.lineLength, conf.dashedLine.spaceLength, conf.dashedLine.phase)
    }
    if (typeof (conf.width) != "undefined") {
        ll.setLineWidth(conf.width)
    }
    if (typeof (conf.labelPosition) != "undefined") {
        ll.setLabelPosition(conf.labelPosition)
    }
    if (typeof (conf.textSize) != "undefined") {
        ll.setTextSize(conf.textSize)
    }
    if (typeof (conf.lineColor) != "undefined") {
        ll.setLineColor(conf.lineColor)
    }
    return ll
}
function onChartLoaded() {
    // 设置图表界面
    const chart = Elechart.value._nativeView as BarChart
    let chartConfig = { ...DefaultChartSetting }
    if (typeof (props.chartSetting) != "undefined") {
        Object.assign(chartConfig, props.chartSetting)
    }
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
    if (typeof (props.legendSetting) != "undefined") {
        Object.assign(legendSetting, props.legendSetting)
    }
    const legendConfig = LegendSettingToConfig(legendSetting)
    const l = chart.getLegend()
    l.setEnabled(legendConfig.enabled)
    l.setVerticalAlignment(legendConfig.verticalAlignment)
    l.setHorizontalAlignment(legendConfig.horizontalAlignment)
    l.setOrientation(legendConfig.orientation)
    l.setDrawInside(legendConfig.drawInside)
    l.setXOffset(legendConfig.xOffset)
    if (typeof (legendConfig.font) !== "undefined") {
        l.setFont(legendConfig.font)
    }
    // 设置坐标轴
    // // y轴
    let axisYSetting = { ...DefaultAxisYSetting }
    if (typeof (props.axisYSetting) != "undefined") {
        Object.assign(axisYSetting, props.axisYSetting)
    }
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
    if (typeof (axisYConfig.labelCount) !== "undefined") {
        yl.setLabelCount(axisYConfig.labelCount.count, axisYConfig.labelCount.force);
    }
    chart.getAxisRight().setEnabled(axisYConfig.axisRightEnable)

    //x轴
    let axisXSetting = { ...DefaultAxisXSetting }
    if (typeof (props.axisXSetting) != "undefined") {
        Object.assign(axisXSetting, props.axisXSetting)
    }
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
    // 设置辅助线
    let limitLinesSetting = {}
    if (typeof (props.limitLinesSetting) != "undefined") {
        Object.assign(limitLinesSetting, props.limitLinesSetting)
    }
    const limitLinesConfig = LimitLinesSettingToConfig(limitLinesSetting)

    if (typeof (limitLinesConfig.axisX) != "undefined") {
        if (typeof (limitLinesConfig.axisX.linesBehindData) != "undefined") {
            xl.setDrawLimitLinesBehindData(limitLinesConfig.axisX.linesBehindData)
        }
        for (const lineconf of limitLinesConfig.axisX.lines) {
            let ll = genll(lineconf)
            xl.addLimitLine(ll);
        }
    }
    if (typeof (limitLinesConfig.axisY) != "undefined") {
        if (typeof (limitLinesConfig.axisY.linesBehindData) != "undefined") {
            yl.setDrawLimitLinesBehindData(limitLinesConfig.axisY.linesBehindData)
        }
        for (const lineconf of limitLinesConfig.axisY.lines) {
            let ll = genll(lineconf)
            yl.addLimitLine(ll);
        }
    }
    // 设置待渲染的设置对象,构造函数参数为待渲染的数据, 图例标签,待渲染数据中代表x轴的属性名,待渲染数据中代表y轴的属性名
    let init_data = []
    const datasetting = BarDataSettingToConfig(props.dataSetting)
    for (const d of datasetting.data) {
        let set = new BarDataSet(d.values, d.label, "x", "y")
        set.setForm(d.form)
        set.setDrawIcons(false)
        if (typeof (d.color) !== "undefined") {
            set.setColor(d.color)
        }
        if (typeof (d.formLineWidth) !== "undefined") {
            set.setFormLineWidth(d.formLineWidth);
        }
        if (typeof (d.formSize) !== "undefined") {
            set.setFormSize(d.formSize);
        }
        if (typeof (d.valueTextSize) !== "undefined") {
            set.setValueTextSize(d.valueTextSize)
        }
        if (typeof (d.stackLabels) !== "undefined") {
            set.setStackLabels(d.stackLabels);
        }
        if (typeof (d.barShadowColor) !== "undefined") {
            set.setBarShadowColor(d.barShadowColor)
        }
        if (typeof (d.barBorderWidth) !== "undefined") {
            set.setBarBorderWidth(d.barBorderWidth)
        }
        if (typeof (d.barBorderColor) !== "undefined") {
            set.setBarBorderColor(d.barBorderColor)
        }
        if (typeof (d.highLightAlpha) !== "undefined") {
            set.setHighLightAlpha(d.highLightAlpha)
        }
        if (typeof (d.axisDependency) !== "undefined") {
            set.setAxisDependency(d.axisDependency)
        }
        init_data.push(set)
    }
    // create a data object with the data sets
    const data = new BarData(init_data)
    if (typeof (datasetting.valueTextSize) !== "undefined") {
        data.setValueTextSize(datasetting.valueTextSize);
    }
    if (typeof (datasetting.valueTextColor) !== "undefined") {
        data.setValueTextColor(datasetting.valueTextColor);
    }
    if (typeof (datasetting.highlight) !== "undefined") {
        data.setHighlightEnabled(datasetting.highlight);
    }
    if (typeof (datasetting.barWidth) !== "undefined") {
        data.setBarWidth(datasetting.barWidth);
    }
    if (typeof (datasetting.groupBars) !== "undefined") {
        data.groupBars(datasetting.groupBars.fromX, datasetting.groupBars.groupSpace, datasetting.groupBars.barSpace);
    }
    chart.setData(data)
    // chart.invalidate()
}
</script>