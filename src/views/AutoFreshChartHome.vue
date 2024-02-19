<template>
    <frame id="main-frame">
        <Page actionBarHidden="true">
            <GridLayout rows="*,auto,auto">
                <LineChart ref="Elechart" @loaded="onChartLoaded" :hardwareAccelerated="hardwareAccelerated" />
                <Switch row="1" v-model="hardwareAccelerated" />
                <Button row="2" text="stop" @tap="stop" />
            </GridLayout>
        </Page>
    </frame>
</template>
  
<script lang="ts" setup>
import { ref,onMounted } from 'nativescript-vue';
import { Color, Frame, Font } from "@nativescript/core";
import { setInterval } from "@nativescript/core/timer";
import { LineChart } from "@nativescript-community/ui-chart/charts/LineChart";
import { LegendForm } from "@nativescript-community/ui-chart/components/Legend";
import { AxisDependency } from "@nativescript-community/ui-chart/components/YAxis";
import { XAxisPosition } from "@nativescript-community/ui-chart/components/XAxis";
import { LineDataSet } from "@nativescript-community/ui-chart/data/LineDataSet";
import { LineData } from "@nativescript-community/ui-chart/data/LineData";
import { ColorTemplate } from "@nativescript-community/ui-chart/utils/ColorTemplate";
import { AxisBase } from "@nativescript-community/ui-chart/components/AxisBase";
import { ViewPortHandler } from "@nativescript-community/ui-chart/utils/ViewPortHandler";
import Denque from "denque";


const Elechart = ref()


const hardwareAccelerated = false
const timer = ref(null)
const indexVal = ref(new Denque([], { capacity: 20 }))
function onChartLoaded() {
    const chart = Elechart.value._nativeView as LineChart;
    chart.setTouchEnabled(true);
    chart.setDragEnabled(true);
    chart.setScaleEnabled(true);
    chart.setDrawGridBackground(false);
    chart.setPinchZoom(true);
    chart.backgroundColor = "lightgray";
    // 绑定一个空的数据对象
    const data = new LineData();
    data.setValueTextColor("white");
    chart.setData(data);
    // 设置图例
    const l = chart.getLegend();
    l.setForm(LegendForm.LINE);
    l.setTypeface(Font.default.withFontFamily("OpenSans-Light"));
    l.setTextColor("white");
    // 设置x轴
    const xl = chart.getXAxis();
    xl.setTextColor("red");
    xl.setDrawGridLines(false);
    xl.setAvoidFirstLastClipping(true);
    xl.setEnabled(true);
    xl.setPosition(XAxisPosition.BOTTOM);
    xl.setValueFormatter({
        getAxisLabel: (
            value: any,
            axis: AxisBase,
            viewPortHandler: ViewPortHandler
        ): string => {
            //在保存的dequeue中找到value对应的时间信息
            let indexarray = indexVal.value.toArray();
            let res = indexarray.filter((e) => e.index == Math.floor(value))
            if (res.length != 1) {
                return `${value}`
            }
            let now = res[0].datetime
            return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        },
    });

    // 设置左轴
    const leftAxis = chart.getAxisLeft();
    leftAxis.setTypeface(Font.default.withFontFamily("OpenSans-Light"));
    leftAxis.setTextColor("white");
    leftAxis.setAxisMaximum(100);
    leftAxis.setAxisMinimum(0);
    leftAxis.setDrawGridLines(true);
    //设置右轴
    const rightAxis = chart.getAxisRight();
    rightAxis.setEnabled(false);
}
function start() {
    if (!timer.value) {
        timer.value = setInterval(addEntry, 1000);
    }
}
function stop() {
    if (timer.value) {
        clearInterval(timer.value);
        timer.value = null;
    }
}
function addEntry() {
    if (!Elechart.value) {
        stop();
        return;
    }
    const chart = Elechart.value._nativeView as LineChart;
    const data = chart.getData();
    if (data != null) {
        let set = data.getDataSetByIndex(0);
        // set.addEntry(...); // can be called as well
        if (set == null) {
            set = createSet();
            data.addDataSet(set);
        }
        // 构造数据
        let datetime = new Date();
        let y = Math.random() * 40 + 30;
        let e = { y };
        // 将数据推入dataset
        data.addEntry(e, 0);
        // 获取数据在dataset中的index
        let dset = data.getDataSetByIndex(0);
        let eindex = dset.getEntryIndex(e);
        //将横轴输入存入dequeue
        let labelindex = { datetime, index: eindex };
        indexVal.value.push(labelindex);

        // 通知data对象dataset已经改变
        data.notifyDataChanged();
        // 通知chart对象data已经改变
        chart.notifyDataSetChanged();
        // 设置可见数据条目最大数量
        chart.setVisibleXRangeMaximum(120);
        // x轴调到最后
        chart.moveViewToX(data.getEntryCount());
    }
}
function createSet() {
    const set = new LineDataSet(null, "Dynamic Data");
    set.setAxisDependency(AxisDependency.LEFT);
    set.setColor(ColorTemplate.getHoloBlue());
    set.setCircleColor("white");
    set.setLineWidth(2);
    set.setCircleRadius(4);
    set.setFillAlpha(65);
    set.setFillColor(ColorTemplate.getHoloBlue());
    set.setHighLightColor(new Color(255, 244, 117, 117));
    set.setValueTextColor("white");
    set.setValueTextSize(9);
    set.setDrawValues(false);
    return set;
}
function redraw() {
    const chart = Elechart.value._nativeView as LineChart;
    chart.invalidate();
}
function onNavigationButtonTap() {
    Frame.topmost().goBack();
}

onMounted(()=>{
    start()
})

</script>