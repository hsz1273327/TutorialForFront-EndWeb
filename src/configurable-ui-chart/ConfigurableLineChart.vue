<template>
    <LineChart ref="Elechart" @loaded="onChartLoaded" :hardwareAccelerated="hardwareAccelerated" />
</template>
<script lang="ts" setup>
import { ref, defineProps, withDefaults, onMounted } from 'nativescript-vue';
import { LineChart } from "@nativescript-community/ui-chart/charts/LineChart";
import { LineDataSet } from "@nativescript-community/ui-chart/data/LineDataSet";
import { LineData } from "@nativescript-community/ui-chart/data/LineData";
import { LimitLine } from '@nativescript-community/ui-chart/components/LimitLine';
import { ChartSetting, DefaultChartSetting, LegendSetting, DefaultLegendSetting, LegendSettingToConfig, AxisYWithRightAxisSetting, AxisYWithRightAxisSettingToConfig, DefaultAxisYWithRightAxisSetting, AxisXSetting, DefaultAxisXSetting, AxisXSettingToConfig, LimitLinesSetting, LimitLinesSettingToConfig, LimitLineConfig, DataSetting, LineDataSetSetting, LineDataSetSettingToConfig } from './configurablechartdata';


interface Setting {
    datasetSetting?: LineDataSetSetting[];
    datasetGen?: AsyncGenerator<LineDataSetSetting[]>;
    dataSetting?: DataSetting;
    hardwareAccelerated?: boolean;
    chartSetting?: ChartSetting;
    legendSetting?: LegendSetting;
    axisYSetting?: AxisYWithRightAxisSetting;
    axisXSetting?: AxisXSetting;
    limitLinesSetting?: LimitLinesSetting;
}

const props = withDefaults(
    defineProps<Setting>(),
    {
        hardwareAccelerated: false,
        chartSetting: () => DefaultChartSetting,
        legendSetting: () => DefaultLegendSetting,
        axisYSetting: () => DefaultAxisYWithRightAxisSetting,
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

function CreateDataSet(datasetsetting: LineDataSetSetting): LineDataSet {
    let d = LineDataSetSettingToConfig(datasetsetting)
    let set = new LineDataSet(d.values, d.label, "x", "y")
    set.setForm(d.form)
    set.setDrawIcons(false)
    if (typeof (d.color) !== "undefined") {
        set.setColor(d.color)
    }
    if (typeof (d.lineWidth) !== "undefined") {
        set.setLineWidth(d.lineWidth)
    }
    if (typeof (d.dashedLine) !== "undefined") {
        set.enableDashedLine(d.dashedLine.lineLength, d.dashedLine.spaceLength, d.dashedLine.phase);
    }
    if (typeof (d.circleColor) !== "undefined") {
        set.setCircleColor(d.circleColor);
    }
    if (typeof (d.circleRadius) !== "undefined") {
        set.setCircleRadius(d.circleRadius)
    }
    if (typeof (d.drawCircleHole) !== "undefined") {
        set.setDrawCircleHole(d.drawCircleHole);
    }
    if (typeof (d.formLineWidth) !== "undefined") {
        set.setFormLineWidth(d.formLineWidth);
    }
    if (typeof (d.formSize) !== "undefined") {
        set.setFormSize(d.formSize)
    }
    if (typeof (d.valueTextSize) !== "undefined") {
        set.setValueTextSize(d.valueTextSize)
    }
    if (typeof (d.dashedHighlightLine) !== "undefined") {
        set.enableDashedHighlightLine(d.dashedHighlightLine.lineLength, d.dashedHighlightLine.spaceLength, d.dashedHighlightLine.phase)
    }
    if (typeof (d.drawFilled) !== "undefined") {
        set.setDrawFilled(d.drawFilled)
    }
    if (typeof (d.fillColor) !== "undefined") {
        set.setFillColor(d.fillColor)
    }
    if (typeof (d.fillAlpha) !== "undefined") {
        set.setFillAlpha(d.fillAlpha)
    }
    if (typeof (d.axisDependency) !== "undefined") {
        set.setAxisDependency(d.axisDependency)
    }
    return set
}

function onChartLoaded() {
    // 设置图表界面
    const chart = Elechart.value._nativeView as LineChart
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
    if (typeof (legendConfig.xEntrySpace) !== "undefined") {
        l.setXEntrySpace(legendConfig.xEntrySpace)
    }
    if (typeof (legendConfig.yEntrySpace) !== "undefined") {
        l.setYEntrySpace(legendConfig.yEntrySpace)
    }
    // 设置坐标轴
    // // y轴
    let axisYSetting = { ...DefaultAxisYWithRightAxisSetting }
    if (typeof (props.axisYSetting) != "undefined") {
        Object.assign(axisYSetting, props.axisYSetting)
    }
    const axisYConfig = AxisYWithRightAxisSettingToConfig(axisYSetting)
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
    if (typeof (axisYConfig.suggestedAxisMinimum) !== "undefined") {
        yl.setSuggestedAxisMinimum(axisYConfig.suggestedAxisMinimum)
    }
    if (typeof (axisYConfig.suggestedAxisMaximum) !== "undefined") {
        yl.setSuggestedAxisMaximum(axisYConfig.suggestedAxisMaximum)
    }
    if (typeof (axisYConfig.spaceMin) !== "undefined") {
        yl.setSpaceMin(axisYConfig.spaceMin)
    }
    if (typeof (axisYConfig.spaceMax) !== "undefined") {
        yl.setSpaceMax(axisYConfig.spaceMax)
    }
    if (typeof (axisYConfig.textSize) !== "undefined") {
        yl.setTextSize(axisYConfig.textSize)
    }
    if (typeof (axisYConfig.textColor) !== "undefined") {
        yl.setTextColor(axisYConfig.textColor)
    }
    chart.getAxisRight().setEnabled(axisYConfig.axisRightEnable)

    //x轴
    let axisXSetting = { ...DefaultAxisXSetting }
    if (typeof (props.axisXSetting) != "undefined") {
        Object.assign(axisXSetting, props.axisXSetting)
    }
    const axisXConfig = AxisXSettingToConfig(axisXSetting)
    const xl = chart.getXAxis()
    if (typeof (axisXConfig.position) !== "undefined") {
        xl.setPosition(axisXConfig.position)
    }
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
    if (typeof (axisXConfig.suggestedAxisMinimum) !== "undefined") {
        xl.setSuggestedAxisMinimum(axisXConfig.suggestedAxisMinimum)
    }
    if (typeof (axisXConfig.suggestedAxisMaximum) !== "undefined") {
        xl.setSuggestedAxisMaximum(axisXConfig.suggestedAxisMaximum)
    }
    if (typeof (axisXConfig.spaceMin) !== "undefined") {
        xl.setSpaceMin(axisXConfig.spaceMin)
    }
    if (typeof (axisXConfig.spaceMax) !== "undefined") {
        xl.setSpaceMax(axisXConfig.spaceMax)
    }
    if (typeof (axisXConfig.textSize) !== "undefined") {
        xl.setTextSize(axisXConfig.textSize)
    }
    if (typeof (axisXConfig.textColor) !== "undefined") {
        xl.setTextColor(axisXConfig.textColor)
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

    //设置默认渲染数据集
    let data: LineData
    if (typeof (props.datasetSetting) !== "undefined") {
        let init_data = []
        for (const _d of props.datasetSetting) {
            let set = CreateDataSet(_d)
            init_data.push(set)
        }
        data = new LineData(init_data)
    } else {
        data = new LineData()
    }
    // 设置待渲染的对象
    if (typeof (props.dataSetting) !== "undefined") {
        if (typeof (props.dataSetting.valueTextSize) !== "undefined") {
            data.setValueTextSize(props.dataSetting.valueTextSize);
        }
        if (typeof (props.dataSetting.valueTextColor) !== "undefined") {
            data.setValueTextColor(props.dataSetting.valueTextColor);
        }
        if (typeof (props.dataSetting.highlight) !== "undefined") {
            data.setHighlightEnabled(props.dataSetting.highlight);
        }
    }
    chart.setData(data)
    // chart.invalidate()
}

if (typeof (props.datasetGen) !== "undefined") {
    onMounted(
        async () => {
            for await (const val of props.datasetGen) {
                const chart = Elechart.value._nativeView as LineChart
                const data = chart.getData();
                //清空数据集
                let totalcount = data.getDataSetCount()
                for (let i = 0; i < totalcount; i++) {
                    data.removeDataSetAtIndex(i)
                }
                //重新注入数据集
                for (const [index, setting] of val.entries()) {
                    let set = CreateDataSet(setting)
                    data.addDataSet(set)
                }
                // 通知data对象dataset已经改变
                data.notifyDataChanged();
                // 通知chart对象data已经改变
                chart.notifyDataSetChanged();
            }
        }
    )
}
</script>