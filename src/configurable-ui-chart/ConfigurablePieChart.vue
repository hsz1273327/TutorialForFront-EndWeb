<template>
    <PieChart ref="Elechart" @loaded="onChartLoaded" :hardwareAccelerated="hardwareAccelerated" />
</template>
<script lang="ts" setup>
import { ref, defineProps, withDefaults, onMounted } from 'nativescript-vue';
import { PieChart } from "@nativescript-community/ui-chart/charts/PieChart";
import { PieData } from "@nativescript-community/ui-chart/data/PieData";
import { PieDataSet } from "@nativescript-community/ui-chart/data/PieDataSet";

import { BaseEntry } from "@nativescript-community/ui-chart/data/BaseEntry";
import { AxisBase } from "@nativescript-community/ui-chart/components/AxisBase";
import { BarEntry } from "@nativescript-community/ui-chart/data/BarEntry";
import { Entry } from "@nativescript-community/ui-chart/data/Entry";
import { RadarEntry } from "@nativescript-community/ui-chart/data/RadarEntry";
import { BubbleEntry } from "@nativescript-community/ui-chart/data/BubbleEntry";
import { CandleEntry } from "@nativescript-community/ui-chart/data/CandleEntry";
import { LegendSetting, DefaultLegendSetting, LegendSettingToConfig, PieChartSetting, DefaultPieChartSetting, PieDataSetSetting, PieDataSetSettingToConfig, DataSetting } from './configurablechartdata';


interface Setting {
    datasetSetting?: PieDataSetSetting[];
    datasetGen?: AsyncGenerator<PieDataSetSetting[]>;
    dataSetting?: DataSetting;
    hardwareAccelerated?: boolean;
    chartSetting?: PieChartSetting;
    legendSetting?: LegendSetting;
}

const props = withDefaults(
    defineProps<Setting>(),
    {
        hardwareAccelerated: false,
        chartSetting: () => DefaultPieChartSetting,
        legendSetting: () => DefaultLegendSetting
    })
const Elechart = ref()

function CreateDataSet(datasetsetting: PieDataSetSetting): PieDataSet {
    let d = PieDataSetSettingToConfig(datasetsetting)
    let set = new PieDataSet(d.values, d.label, "y")
    if (typeof (d.form) !== "undefined") {
        set.setForm(d.form)
    }
    if (typeof (d.sliceSpace) !== "undefined") {
        set.setSliceSpace(d.sliceSpace)
    }
    if (typeof (d.iconsOffset) !== "undefined") {
        set.setSliceSpace(d.sliceSpace)
        set.setIconsOffset(d.iconsOffset);
    } else {
        set.setDrawIcons(false)
    }
    if (typeof (d.selectionShift) !== "undefined") {
        set.setSelectionShift(d.selectionShift)
    }
    if (typeof (d.colorTemplates) !== "undefined") {
        set.setColors(d.colorTemplates)
    }
    if (typeof (d.drawValues) !== "undefined") {
        set.setDrawValues(d.drawValues)
    }
    if (typeof (d.valueFormatter) !== "undefined") {
        set.setValueFormatter({
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
            getPieLabel: d.valueFormatter,
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
    }
    return set
}

function onChartLoaded() {
    // 设置图表界面
    const chart = Elechart.value._nativeView as PieChart
    let chartConfig = { ...DefaultPieChartSetting }
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
    if (typeof (chartConfig.usePercentValues) != "undefined") {
        chart.setUsePercentValues(chartConfig.usePercentValues)
    }
    if (typeof (chartConfig.extraOffsets) != "undefined") {
        chart.setExtraOffsets(...chartConfig.extraOffsets)
    }
    if (typeof (chartConfig.dragDecelerationFrictionCoef) != "undefined") {
        chart.setDragDecelerationFrictionCoef(chartConfig.dragDecelerationFrictionCoef)
    }
    if (typeof (chartConfig.centerText) != "undefined") {
        chart.setDrawCenterText(true);
        chart.setCenterText(chartConfig.centerText)
    } else {
        chart.setDrawCenterText(false);
    }
    if (typeof (chartConfig.drawHoleEnabled) != "undefined") {
        chart.setDrawHoleEnabled(chartConfig.drawHoleEnabled);
    }
    if (typeof (chartConfig.holeColor) != "undefined") {
        chart.setHoleColor(chartConfig.holeColor);
    }
    if (typeof (chartConfig.holeRadius) != "undefined") {
        chart.setHoleRadius(chartConfig.holeRadius);
    }
    if (typeof (chartConfig.transparentCircleColor) != "undefined") {
        chart.setTransparentCircleColor(chartConfig.transparentCircleColor);
    }
    if (typeof (chartConfig.transparentCircleAlpha) != "undefined") {
        chart.setTransparentCircleAlpha(chartConfig.transparentCircleAlpha);
    }
    if (typeof (chartConfig.transparentCircleRadius) != "undefined") {
        chart.setTransparentCircleRadius(chartConfig.transparentCircleRadius);
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
    if (typeof (chartConfig.entryLabelColor) != "undefined") {
        chart.setEntryLabelColor(chartConfig.entryLabelColor);
    }
    if (typeof (chartConfig.entryLabelTextSize) != "undefined") {
        chart.setEntryLabelTextSize(chartConfig.entryLabelTextSize);
    }
    if (typeof (chartConfig.drawEntryLabels) != "undefined") {
        chart.setDrawEntryLabels(chartConfig.drawEntryLabels);
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
    //设置默认渲染数据集
    let data: PieData
    if (typeof (props.datasetSetting) !== "undefined") {
        let init_data = []
        for (const _d of props.datasetSetting) {
            let set = CreateDataSet(_d)
            init_data.push(set)
        }
        data = new PieData(init_data)
    } else {
        data = new PieData()
    }
    // 设置待渲染的对象
    if (typeof (props.dataSetting) != "undefined") {
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
}

if (typeof (props.datasetGen) !== "undefined") {
    onMounted(
        async () => {
            for await (const val of props.datasetGen) {
                const chart = Elechart.value._nativeView as PieChart
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