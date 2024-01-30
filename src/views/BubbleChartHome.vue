<template>
    <frame id="main-frame">
        <Page actionBarHidden="true">
            <StackLayout>
                <BubbleChart ref="Elechart" @loaded="onChartLoaded" />
            </StackLayout>
        </Page>
    </frame>
</template>
<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import { BubbleChart } from '@nativescript-community/ui-chart/charts/BubbleChart';
import { BubbleData } from '@nativescript-community/ui-chart/data/BubbleData';
import { BubbleDataSet } from '@nativescript-community/ui-chart/data/BubbleDataSet';
import { XAxisPosition } from "@nativescript-community/ui-chart/components/XAxis";
import { LegendForm, LegendOrientation, LegendVerticalAlignment, LegendHorizontalAlignment } from '@nativescript-community/ui-chart/components/Legend';

const Elechart = ref()

function onChartLoaded() {
    const chart = Elechart.value._nativeView as BubbleChart;
    chart.setDrawGridBackground(false);
    chart.setTouchEnabled(true);
    // enable scaling and dragging
    chart.setDragEnabled(true);
    chart.setScaleEnabled(true);
    chart.setMaxVisibleValueCount(200);
    chart.setPinchZoom(true);


    const l = chart.getLegend();
    l.setEnabled(true)
    l.setVerticalAlignment(LegendVerticalAlignment.TOP);
    l.setHorizontalAlignment(LegendHorizontalAlignment.RIGHT);
    l.setOrientation(LegendOrientation.VERTICAL);
    l.setDrawInside(false);
    
    const yl = chart.getAxisLeft();
    yl.setSpaceTop(30);
    yl.setSpaceBottom(30);
    yl.setDrawZeroLine(false);
    chart.getAxisRight().setEnabled(false);
    const xl = chart.getXAxis();
    xl.setPosition(XAxisPosition.BOTTOM);
    // 设置待渲染的设置对象,构造函数参数为待渲染的数据, 图例标签,待渲染数据中代表x轴的属性名,待渲染数据中代表y轴的属性名
    const values1 = [];
    const values2 = [];
    const values3 = [];
    for (let i = 0; i < 20; i++) {
        values1.push({
            y: Math.random() * 100,
            x: Math.random() * 10,
            size: Math.random() * 100,
        });
        values2.push({
            y: Math.random() * 100,
            x: Math.random() * 10,
            size: Math.random() * 100,
        });
        values3.push({
            y: Math.random() * 100,
            x: Math.random() * 10,
            size: Math.random() * 100
        });
    }
    // create a dataset and give it a type
    const set1 = new BubbleDataSet(values1, 'DS 1');
    set1.setForm(LegendForm.SQUARE);
    set1.setDrawValues(true);
    set1.setColor('red');
    const set2 = new BubbleDataSet(values2, 'DS 2');
    set2.setForm(LegendForm.SQUARE);
    set2.setDrawValues(true);
    set2.setColor('green');
    const set3 = new BubbleDataSet(values3, 'DS 3');
    set3.setForm(LegendForm.SQUARE);
    set3.setDrawValues(true);
    set3.setColor('blue');
    // create a data object with the data sets
    const data = new BubbleData([set1, set2, set3]);
    data.setDrawValues(false);
    data.setValueTextSize(8);
    data.setValueTextColor('white');
    data.setHighlightCircleWidth(1.5);
    chart.setData(data);
    chart.invalidate();
}
</script>
