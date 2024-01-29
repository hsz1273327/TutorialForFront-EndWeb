<template>
    <frame id="main-frame">
        <Page actionBarHidden="true">
            <StackLayout>
                <ScatterChart ref="Elechart" @loaded="onChartLoaded" />
            </StackLayout>
        </Page>
    </frame>
</template>
<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import { ScatterChart, ScatterShape } from '@nativescript-community/ui-chart/charts/ScatterChart';
import { ScatterData } from '@nativescript-community/ui-chart/data/ScatterData';
import { ScatterDataSet } from '@nativescript-community/ui-chart/data/ScatterDataSet';
import { XAxisPosition } from "@nativescript-community/ui-chart/components/XAxis";
import { LegendForm, LegendOrientation, LegendVerticalAlignment, LegendHorizontalAlignment } from '@nativescript-community/ui-chart/components/Legend';

const Elechart = ref()

function onChartLoaded() {
    const chart = Elechart.value._nativeView as ScatterChart;
    // //显示fps
    // chart.drawFrameRate = true;
    chart.setDrawGridBackground(false);
    chart.setTouchEnabled(true);
    chart.setMaxHighlightDistance(50);
    chart.setDragEnabled(true);
    chart.setScaleEnabled(true);
    chart.setMaxVisibleValueCount(200);
    chart.setPinchZoom(true);
    // 设置图例
    const l = chart.getLegend();
    l.setEnabled(true);
    l.setVerticalAlignment(LegendVerticalAlignment.TOP);
    l.setHorizontalAlignment(LegendHorizontalAlignment.RIGHT);
    l.setOrientation(LegendOrientation.VERTICAL);
    l.setDrawInside(false);
    l.setXOffset(5);
    const yl = chart.getAxisLeft();
    yl.setAxisMinimum(0); // this replaces setStartAtZero(true)
    chart.getAxisRight().setEnabled(false);
    const xl = chart.getXAxis();
    //// 设置x轴的粗度
    xl.setAxisLineWidth(3);
    //// 设置x轴所在的位置,默认在顶部
    xl.setPosition(XAxisPosition.BOTTOM);
    //// 设置隐藏y轴的网格
    xl.setDrawGridLines(false);
    // 设置待渲染的设置对象,构造函数参数为待渲染的数据, 图例标签,待渲染数据中代表x轴的属性名,待渲染数据中代表y轴的属性名
    const values1 = [];
    const values2 = [];
    const values3 = [];
    const range = 100;
    for (let i = 0; i < 20; i++) {
        values1.push({ y: Math.random() * range + 3, x: Math.random() * 5 });
        values2.push({ y: Math.random() * range + 3 + 0.33, x: Math.random() * 5 });
        values3.push({ y: Math.random() * range + 3 + 0.66, x: Math.random() * 5 });
    }
    // create a dataset and give it a type
    const set1 = new ScatterDataSet(values1, 'DS 1', "x", "y");
    set1.setForm(LegendForm.SQUARE);
    set1.setScatterShape(ScatterShape.SQUARE);
    set1.setColor('red');
    const set2 = new ScatterDataSet(values2, 'DS 2', "x", "y");
    set2.setForm(LegendForm.SQUARE);
    set2.setScatterShape(ScatterShape.CIRCLE);
    set2.setScatterShapeHoleColor('green');
    set2.setScatterShapeHoleRadius(3);
    set2.setColor('blue');
    const set3 = new ScatterDataSet(values3, 'DS 3', "x", "y");
    set3.setForm(LegendForm.SQUARE);
    set3.setScatterShape(ScatterShape.X);
    set3.setColor('green');
    set1.setScatterShapeSize(8);
    set2.setScatterShapeSize(8);
    set3.setScatterShapeSize(8);
    // create a data object with the data sets
    const data = new ScatterData([set1, set2, set3]);
    // data.setValueTypeface(tfLight);
    chart.setData(data);
    chart.invalidate();
}
</script>
