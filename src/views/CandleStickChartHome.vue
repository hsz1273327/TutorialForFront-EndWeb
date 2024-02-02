<template>
    <Page actionBarHidden="true">
        <StackLayout>
            <CandleStickChart ref="Elechart" @loaded="onChartLoaded" />
        </StackLayout>
    </Page>
</template>
    
  
<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import { Color } from "@nativescript/core";
import { CandleStickChart } from "@nativescript-community/ui-chart/charts/CandleStickChart";
import { CandleData } from "@nativescript-community/ui-chart/data/CandleData";
import { CandleDataSet } from "@nativescript-community/ui-chart/data/CandleDataSet";
import { XAxisPosition } from "@nativescript-community/ui-chart/components/XAxis";
import { AxisDependency } from "@nativescript-community/ui-chart/components/YAxis";
import { Style } from "@nativescript-community/ui-canvas";

const Elechart = ref()
function onChartLoaded() {
    const chart = Elechart.value._nativeView as CandleStickChart;
    // 设置最大可以看见的
    chart.setMaxVisibleValueCount(60);
    // scaling can now only be done on x- and y-axis separately
    chart.setPinchZoom(false);
    chart.getLegend().setEnabled(false);
    chart.setDrawGridBackground(false);
    const xAxis = chart.getXAxis();
    xAxis.setPosition(XAxisPosition.BOTTOM);
    xAxis.setDrawGridLines(false);
    const leftAxis = chart.getAxisLeft();
    //        leftAxis.setEnabled(false);
    leftAxis.setLabelCount(7, false);
    leftAxis.setDrawGridLines(false);
    leftAxis.setDrawAxisLine(false);
    const rightAxis = chart.getAxisRight();
    rightAxis.setEnabled(false);

    // 构造要渲染的数据,index为横轴,value为纵轴

    const values1 = [];
    chart.resetTracking();
    const values = [];
    for (let i = 0; i < 30; i++) {
        const multi = 100 + 1;
        const val = Math.random() * 40 + multi;
        const high = Math.random() * 9 + 8;
        const low = Math.random() * 9 + 8;
        const open = Math.random() * 6 + 1;
        const close = Math.random() * 6 + 1;
        const even = i % 2 == 0;
        values.push({
            high: val + high,
            low: val - low,
            open: even ? val + open : val - open,
            close: even ? val - close : val + close,
        });
    }
    const set1 = new CandleDataSet(values, "Data Set");
    set1.setDrawIcons(false);
    set1.setAxisDependency(AxisDependency.LEFT);
    //设置open<close
    set1.setDecreasingColor("green");
    set1.setDecreasingPaintStyle(Style.FILL);
    //设置open>close
    set1.setIncreasingColor("red");
    set1.setIncreasingPaintStyle(Style.STROKE);
    //设置当open==close的情况
    // set1.setNeutralColor("blue");
    //设置影线
    // set1.setShadowColor("darkgray");
    set1.setShadowColorSameAsCandle(true);
    set1.setShadowWidth(0.7);

    const data = new CandleData([set1]);
    chart.setData(data);
}
</script>