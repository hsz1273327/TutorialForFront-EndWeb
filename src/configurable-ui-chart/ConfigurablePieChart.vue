<template>
    <BarChart ref="Elechart" @loaded="onChartLoaded" :hardwareAccelerated="hardwareAccelerated" />
</template>
<script lang="ts" setup>
import { ref, defineProps, withDefaults, onMounted } from 'nativescript-vue';
import { PieChart } from "@nativescript-community/ui-chart/charts/PieChart";
import { PieData } from "@nativescript-community/ui-chart/data/PieData";
import { PieDataSet } from "@nativescript-community/ui-chart/data/PieDataSet";

import { PieEntry } from "@nativescript-community/ui-chart/data/PieEntry";
import { ChartSetting, DefaultChartSetting, LegendSetting, DefaultLegendSetting, LegendSettingToConfig, PieDataSetting, PieDataSetSetting, PieDataSetSettingToConfig } from './configurablechartdata';


interface Setting {
    datasetSetting?: PieDataSetSetting[];
    datasetGen?: AsyncGenerator<PieDataSetSetting[]>;
    dataSetting?: PieDataSetting;
    hardwareAccelerated?: boolean;
    chartSetting?: ChartSetting;
    legendSetting?: LegendSetting;
}

const props = withDefaults(
    defineProps<Setting>(),
    {
        hardwareAccelerated: false,
        chartSetting: () => DefaultChartSetting,
        legendSetting: () => DefaultLegendSetting
    })
const Elechart = ref()

function CreateDataSet(datasetsetting: PieDataSetSetting): PieDataSet {
    let d = PieDataSetSettingToConfig(datasetsetting)
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
    return set
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
    
    //设置默认渲染数据集
    let data: BarData
    if (typeof (props.datasetSetting) !== "undefined") {
        let init_data = []
        for (const _d of props.datasetSetting) {
            let set = CreateDataSet(_d)
            init_data.push(set)
        }
        data = new BarData(init_data)
    } else {
        data = new BarData()
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
        if (typeof (props.dataSetting.barWidth) !== "undefined") {
            data.setBarWidth(props.dataSetting.barWidth);
        }
        if (typeof (props.dataSetting.groupBars) !== "undefined") {
            data.groupBars(props.dataSetting.groupBars.fromX, props.dataSetting.groupBars.groupSpace, props.dataSetting.groupBars.barSpace);
        }
    }
    chart.setData(data)
}

if (typeof (props.datasetGen) !== "undefined") {
    onMounted(
        async () => {
            for await (const val of props.datasetGen) {
                const chart = Elechart.value._nativeView as BarChart
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