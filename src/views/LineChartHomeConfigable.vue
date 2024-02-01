<template>
    <frame id="main-frame">
        <Page actionBarHidden="true">
            <StackLayout>
                <ConfigurableLineChart ref="Elechart" @loaded="onChartLoaded" />
            </StackLayout>
        </Page>
    </frame>
</template>
<script lang="ts" setup>
import ConfigurableLineChart from '../configurable-ui-chart/ConfigurableLineChart.vue'
import { LineDataSetting, AxisXSetting, AxisYSetting } from '../configurable-ui-chart/configurablechartdata'
const axisXSetting: AxisXSetting = {
    position: "bottom",
    lineWidth: 3,
    minimum: 0,
    withGridLine: false
}
const axisYSetting: AxisYSetting = {
    axisRightEnable: false,
    minimum: 0,
    withGridLine: false
}
function gen_data(): LineDataSetting {
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
    let datasetting = [
        {
            values: values1,
            label: 'DS 1',
            form: "SQUARE",
            color: "red",
            drawValues: true,
        },
        {
            values: values2,
            label: 'DS 2',
            form: "SQUARE",
            color: "green",
            drawValues: true,

        },
        {
            values: values3,
            label: 'DS 3',
            form: "SQUARE",
            color: "blue",
            drawValues: false,
        }
    ]

    return {
        data: datasetting,
        valueTextSize: 8,
        valueTextColor: 'white',
        highlightCircleWidth: 1.5
    }
}
const data = gen_data()
</script>



<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import { LineChart } from "@nativescript-community/ui-chart/charts/LineChart";
import { LineDataSet } from "@nativescript-community/ui-chart/data/LineDataSet";
import { LineData } from "@nativescript-community/ui-chart/data/LineData";
import { LegendForm } from "@nativescript-community/ui-chart/components/Legend";
import { XAxisPosition } from "@nativescript-community/ui-chart/components/XAxis"
import { LimitLine, LimitLabelPosition } from '@nativescript-community/ui-chart/components/LimitLine';
import { DashPathEffect } from "@nativescript-community/ui-canvas";
import { Font } from '@nativescript/core';
import { FontStyle, FontWeight } from '@nativescript/core/ui/styling/font';

const Elechart = ref()
function onChartLoaded() {
    const chart = Elechart.value._nativeView as LineChart;
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
    legend.setFont(new Font("serif", 10, FontStyle.ITALIC, FontWeight.EXTRA_LIGHT));

    // 设置坐标轴
    /// 设置x轴
    const xAxis = chart.getXAxis();
    //// 设置x轴的粗度
    xAxis.setAxisLineWidth(3);
    //// 设置x轴所在的位置,默认在顶部
    xAxis.setPosition(XAxisPosition.BOTTOM)
    //// 设置隐藏y轴的网格
    xAxis.setDrawGridLines(false)
    //设置x轴为红色
    // xAxis.setAxisLineColor('red');
    //// x轴网格使用虚线
    // xAxis.enableGridDashedLine(10, 10, 0);
    //// 设置x轴的label展示的字符串
    // xAxis.setValueFormatter({
    //     getAxisLabel(value: number): string {
    //         let v: string | number = value;
    //         if (value == 0) {
    //             v = "日";
    //         }
    //         return `周${v}`;
    //     },
    // });
    xAxis.setValueFormatter({
        getAxisLabel: (value: number): string => {
            switch (value) {
                case 1:
                    {
                        return "Mon"
                    }
                    break;
                case 2:
                    {
                        return "Tue"
                    }
                    break;
                case 3:
                    {
                        return "Wed"
                    }
                    break;
                case 4:
                    {
                        return "Thu"
                    }
                    break;
                case 5:
                    {
                        return "Fri"
                    }
                    break;
                case 6:
                    {
                        return "Sat"
                    }
                    break;
                case 0:
                    {
                        return "Sun"
                    }
                    break;
                default:
                    {
                        return "Unknown"
                    }
                    break;
            }
        }
    })
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
    // yAxis.setDrawGridLines(false)

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

    /// 设置极值线
    const ll1 = new LimitLine(90, 'Upper Limit');
    ll1.setLineWidth(4);
    ll1.enableDashedLine(10, 10, 0);
    ll1.setLabelPosition(LimitLabelPosition.RIGHT_TOP);
    ll1.setTextSize(10);
    const ll2 = new LimitLine(10, 'Lower Limit');
    ll2.setLineWidth(4);
    ll2.enableDashedLine(10, 10, 0);
    ll2.setLabelPosition(LimitLabelPosition.RIGHT_BOTTOM);
    ll2.setTextSize(10);

    // 在数据后面而不是在上面画限制线
    yAxis.setDrawLimitLinesBehindData(true);
    xAxis.setDrawLimitLinesBehindData(true);
    // 添加极值线
    yAxis.addLimitLine(ll1);
    yAxis.addLimitLine(ll2);
    //xAxis.addLimitLine(llXAxis);


    // 构造要渲染的数据,index为横轴,value为纵轴
    const myData = new Array(7).fill(0).map((v, i) => ({
        x: i,
        y: Math.random() * 100,
    }));

    // 设置待渲染的设置对象,构造函数参数为待渲染的数据, 图例标签,待渲染数据中代表x轴的属性名,待渲染数据中代表y轴的属性名
    const sets = [];
    const set = new LineDataSet(myData, "test line", "x", "y");
    /// 设置线条颜色
    set.setColor("blue");
    /// 设置是否开启y轴图标
    set.setDrawIcons(false);
    /// 设置使用虚线,参数为线条长度,空白长度,阶段
    // set.enableDashedLine(10, 5, 0);
    /// 设置点颜色
    set.setCircleColor("black");
    /// 设置线条宽度
    set.setLineWidth(1);
    /// 设置点的直径
    set.setCircleRadius(3);
    /// 设置点为实心点
    set.setDrawCircleHole(false);
    /// 自定义图例
    //// 设置图标样式
    set.setForm(LegendForm.LINE);
    set.setFormLineWidth(1);
    set.setFormLineDashEffect(new DashPathEffect([10, 5], 0));
    set.setFormSize(15);
    //设置值的文本字体大小
    set.setValueTextSize(9);
    // 将选择线画为虚线
    set.enableDashedHighlightLine(10, 5, 0);
    // 设置填充区
    set.setDrawFilled(true);
    set.setFillFormatter({
        getFillLinePosition(dataSet: any, dataProvider: any) {
            return chart.getAxisLeft().getAxisMinimum();
        },
    });
    // 设置填充区颜色set color of filled area
    set.setFillColor("red");

    sets.push(set);
    const ld = new LineData(sets);

    //将数据设置进组件中渲染
    chart.setData(ld);
}
</script>
