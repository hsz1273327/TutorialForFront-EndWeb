<template>
    <frame id="main-frame">
        <Page actionBarHidden="true">
            <StackLayout>
                <BarChart ref="Elechart" width="300" height="400" @loaded="onChartLoaded" hardwareAccelerated="true">
                </BarChart>
            </StackLayout>
        </Page>
    </frame>
</template>
    
<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import { BarChart } from "@nativescript-community/ui-chart/charts/BarChart";
import { BarData } from "@nativescript-community/ui-chart/data/BarData";
import { BarDataSet } from "@nativescript-community/ui-chart/data/BarDataSet";
import { LegendForm } from "@nativescript-community/ui-chart/components/Legend";
import { XAxisPosition } from "@nativescript-community/ui-chart/components/XAxis";
import {
    LimitLine,
    LimitLabelPosition,
} from "@nativescript-community/ui-chart/components/LimitLine";
import { DashPathEffect } from "@nativescript-community/ui-canvas";
import { Font } from "@nativescript/core";
import { FontStyle, FontWeight } from "@nativescript/core/ui/styling/font";

const Elechart = ref()

function onChartLoaded() {
    const chart = Elechart.value._nativeView as BarChart;
    // 设置图表的背景色
    chart.backgroundColor = "white";
    // 设置为非只读可操作
    chart.setTouchEnabled(true);
    // 设置不画出网格
    chart.setDrawGridBackground(false);

    // 设置为可拖拽
    chart.setDragEnabled(true);
    // 设置为可伸缩
    chart.setScaleEnabled(true);

    // 设置强制捏合手势用于聚焦
    chart.setPinchZoom(true);

    //设置启用每次点击突出显示
    chart.setHighlightPerTapEnabled(true);
    //设置启用每次拖拽突出显示
    chart.setHighlightPerDragEnabled(true);

    // 设置图例标签
    const legend = chart.getLegend();
    /// 启用图例
    legend.setEnabled(true);
    /// 设置图例上的字体
    legend.setFont(
        new Font("serif", 10, FontStyle.ITALIC, FontWeight.EXTRA_LIGHT)
    );

    // 设置坐标轴
    /// 设置x轴
    const xAxis = chart.getXAxis();
    //// 设置x轴的粗度
    xAxis.setAxisLineWidth(3);
    //// 设置x轴所在的位置,默认在顶部
    xAxis.setPosition(XAxisPosition.BOTTOM);
    //// 设置隐藏y轴的网格
    xAxis.setDrawGridLines(false);
    // xAxis.setValueFormatter({
    //   getAxisLabel(value: number): string {
    //     let v: string | number = value;
    //     if (value == 0) {
    //       v = "日";
    //     }
    //     return `周${v}`;
    //   },
    // });
    //设置x轴为红色
    // xAxis.setAxisLineColor('red');
    //// x轴网格使用虚线
    // xAxis.enableGridDashedLine(10, 10, 0);

    /// 设置y轴
    const yAxis = chart.getAxisLeft();
    //// 设置y轴宽度
    yAxis.setAxisLineWidth(3);
    //// 设置y轴的取值范围
    yAxis.setAxisMaximum(100);
    yAxis.setAxisMinimum(0);
    //// 设置y轴颜色
    // yAxis.setAxisLineColor('blue');
    //// y轴使用虚线
    // yAxis.enableGridDashedLine(10, 30, 0);
    //// 设置隐藏x轴的网格
    yAxis.setDrawGridLines(false)

    /// 设置右轴
    const rightAxis = chart.getAxisRight();
    rightAxis.setEnabled(false);
    // //// 启用右轴
    // rightAxis.setEnabled(true);
    // //// 设置右轴颜色
    // rightAxis.setAxisLineColor('red');
    // //// 设置右轴宽度
    // rightAxis.setAxisLineWidth(2);
    // //// 设置右轴是否画网格线
    // rightAxis.setDrawGridLines(false)


    //xAxis.addLimitLine(llXAxis);

    // 设置待渲染的设置对象,构造函数参数为待渲染的数据, 图例标签,待渲染数据中代表x轴的属性名,待渲染数据中代表y轴的属性名
    const sets = [];

    for (let x of ["red", "yellow", "blue"]) {
        // 构造要渲染的数据,index为横轴,value为纵轴
        const myData = new Array(7).fill(0).map((v, i) => ({
            x: i,
            y: Math.random() * 100,
        }));
        const set = new BarDataSet(myData, `test bar ${x}`, "x", "y");
        /// 设置线条颜色
        set.setColor(x);
        /// 设置是否开启y轴图标
        set.setDrawIcons(false);
        /// 设置使用虚线,参数为线条长度,空白长度,阶段

        /// 自定义图例
        //// 设置图标样式
        set.setForm(LegendForm.SQUARE);
        // set.setFormLineWidth(1);
        // set.setFormLineDashEffect(new DashPathEffect([10, 5], 0));
        // set.setFormSize(15);
        //设置值的文本字体大小
        set.setValueTextSize(9);
        set.setStackLabels(["a", "b", "c", "d", "e", "f", "g"]);
        // 将选择线画为虚线
        // set.enableDashedHighlightLine(10, 5, 0);

        sets.push(set);
    }

    const bd = new BarData(sets);
    bd.setBarWidth(0.1)
    bd.groupBars(0, 0.3, 0.1);
    //将数据设置进组件中渲染
    chart.setData(bd);
}
</script>