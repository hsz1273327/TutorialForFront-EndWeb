<template>
    <RadarChart ref="Elechart" @loaded="onChartLoaded" :hardwareAccelerated="hardwareAccelerated" />
</template>
<script lang="ts" setup>
import { ref, defineProps, withDefaults, onMounted } from 'nativescript-vue';
import { RadarChart } from "@nativescript-community/ui-chart/charts/RadarChart";
import { RadarData } from "@nativescript-community/ui-chart/data/RadarData";
import { RadarDataSet } from "@nativescript-community/ui-chart/data/RadarDataSet";
import { LimitLine } from '@nativescript-community/ui-chart/components/LimitLine';
import { Color } from '@nativescript/core';
import {
    LegendSetting, DefaultLegendSetting, LegendSettingToConfig, AxisYSetting, AxisYSettingToConfig, AxisXSetting, DefaultAxisXSetting, AxisXSettingToConfig, LimitLinesSetting, LimitLinesSettingToConfig, LimitLineConfig,
    RadarChartSetting, DefaultRadarChartSetting, RadarDataSetSetting, RadarDataSetSettingToConfig, RadarDataSetting
} from './configurablechartdata';


interface Setting {
    datasetSetting: RadarDataSetSetting[];
    datasetGen?: AsyncGenerator<RadarDataSetSetting[]>;
    dataSetting?: RadarDataSetting;
    hardwareAccelerated?: boolean;
    chartSetting?: RadarChartSetting;
    legendSetting?: LegendSetting;
    axisYSetting?: AxisYSetting;
    axisXSetting?: AxisXSetting;
    limitLinesSetting?: LimitLinesSetting;
}

const props = withDefaults(
    defineProps<Setting>(),
    {
        hardwareAccelerated: false,
        chartSetting: () => DefaultRadarChartSetting,
        legendSetting: () => DefaultLegendSetting,
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

function CreateDataSet(datasetsetting: RadarDataSetSetting): RadarDataSet {
    let d = RadarDataSetSettingToConfig(datasetsetting)
    let set = new RadarDataSet(d.values, d.label, "x")
    set.setForm(d.form)
    set.setDrawIcons(false)
    if (typeof (d.color) !== "undefined") {
        set.setColor(d.color)
    }
    if (typeof (d.lineWidth) !== "undefined") {
        set.setLineWidth(d.lineWidth)
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
    if (typeof (d.drawValues) !== "undefined") {
        set.setDrawValues(d.drawValues);
    }
    if (typeof (d.axisDependency) !== "undefined") {
        set.setAxisDependency(d.axisDependency)
    }
    if (typeof (d.drawHighlightCircleEnabled) !== "undefined") {
        set.setDrawHighlightCircleEnabled(d.drawHighlightCircleEnabled)
    }
    if (typeof (d.highlightCircleFillColor) !== "undefined") {
        set.setHighlightCircleFillColor(new Color(d.highlightCircleFillColor))
    }
    if (typeof (d.highlightCircleStrokeColor) !== "undefined") {
        set.setHighlightCircleStrokeColor(new Color(d.highlightCircleStrokeColor))
    }
    if (typeof (d.highlightCircleStrokeAlpha) !== "undefined") {
        set.setHighlightCircleStrokeAlpha(d.highlightCircleStrokeAlpha)
    }
    if (typeof (d.highlightCircleInnerRadius) !== "undefined") {
        set.setHighlightCircleInnerRadius(d.highlightCircleInnerRadius)
    }
    if (typeof (d.highlightCircleOuterRadius) !== "undefined") {
        set.setHighlightCircleOuterRadius(d.highlightCircleOuterRadius)
    }
    if (typeof (d.highlightCircleStrokeWidth) !== "undefined") {
        set.setHighlightCircleStrokeWidth(d.highlightCircleStrokeWidth)
    }
    return set
}
function onChartLoaded() {
    // 设置图表界面
    const chart = Elechart.value._nativeView as RadarChart
    let chartConfig = { ...DefaultRadarChartSetting }
    if (typeof (props.chartSetting) != "undefined") {
        Object.assign(chartConfig, props.chartSetting)
    }
    chart.getDescription().setEnabled(false)
    chart.drawFrameRate = chartConfig.drawFrameRate
    chart.setTouchEnabled(chartConfig.touchEnabled)
    if (typeof (chartConfig.maxHighlightDistance) != "undefined") {
        chart.setMaxHighlightDistance(chartConfig.maxHighlightDistance)
    }
    if (typeof (chartConfig.backgroundColor) != "undefined") {
        chart.backgroundColor = chartConfig.backgroundColor
    }
    if (typeof (chartConfig.extraOffsets) != "undefined") {
        chart.setExtraOffsets(...chartConfig.extraOffsets)
    }
    if (typeof (chartConfig.dragDecelerationFrictionCoef) != "undefined") {
        chart.setDragDecelerationFrictionCoef(chartConfig.dragDecelerationFrictionCoef)
    }
    if (typeof (chartConfig.rotationEnabled) != "undefined") {
        chart.setRotationEnabled(chartConfig.rotationEnabled);
    }
    if (typeof (chartConfig.rotationAngle) != "undefined") {
        chart.setRotationAngle(chartConfig.rotationAngle);
    }
    if (typeof (chartConfig.highlightPerTapEnabled) != "undefined") {
        chart.setHighlightPerTapEnabled(chartConfig.highlightPerTapEnabled);
    }
    if (typeof (chartConfig.webLineWidth) != "undefined") {
        chart.setWebLineWidth(chartConfig.webLineWidth);
    }
    if (typeof (chartConfig.webLineWidthInner) != "undefined") {
        chart.setWebLineWidthInner(chartConfig.webLineWidthInner);
    }
    if (typeof (chartConfig.webAlpha) != "undefined") {
        chart.setWebAlpha(chartConfig.webAlpha);
    }
    if (typeof (chartConfig.webColor) != "undefined") {
        chart.setWebColor(chartConfig.webColor);
    }
    if (typeof (chartConfig.webColorInner) != "undefined") {
        chart.setWebColorInner(chartConfig.webColorInner);
    }
    if (typeof (chartConfig.drawWeb) != "undefined") {
        chart.setDrawWeb(chartConfig.drawWeb);
    }
    if (typeof (chartConfig.skipWebLineCount) != "undefined") {
        chart.setSkipWebLineCount(chartConfig.skipWebLineCount);
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
    let axisYSetting = {}
    if (typeof (props.axisYSetting) != "undefined") {
        Object.assign(axisYSetting, props.axisYSetting)
    }
    const axisYConfig = AxisYSettingToConfig(axisYSetting)
    const yl = chart.getYAxis()
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

    //x轴
    let axisXSetting = {}
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
    let data: RadarData
    if (typeof (props.datasetSetting) !== "undefined") {
        let init_data = []
        for (const _d of props.datasetSetting) {
            let set = CreateDataSet(_d)
            init_data.push(set)
        }
        data = new RadarData(init_data)
    } else {
        data = new RadarData([])
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
        if (typeof (props.dataSetting.labels) !== "undefined") {
            data.setLabels(props.dataSetting.labels);
        }
    }
    chart.setData(data)
    // chart.invalidate()
}

if (typeof (props.datasetGen) !== "undefined") {
    onMounted(
        async () => {
            for await (const val of props.datasetGen) {
                const chart = Elechart.value._nativeView as RadarChart
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