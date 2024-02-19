<template>
    <frame id="main-frame">
        <Page actionBarHidden="true">
            <StackLayout>
                <ConfigurableRadarChart :datasetSetting="data" :axisXSetting="axisXSetting" :axisYSetting="axisYSetting"
                    :dataSetting="dataSetting" :chartSetting="chartSetting" :hardwareAccelerated="true" />
            </StackLayout>
        </Page>
    </frame>
</template>
<script lang="ts" setup>
import ConfigurableRadarChart from '../configurable-ui-chart/ConfigurableRadarChart.vue'
import { RadarDataSetSetting, AxisXSetting, AxisYSetting, RadarChartSetting, RadarDataSetting, RadarValue } from '../configurable-ui-chart/configurablechartdata'
const axisXSetting: AxisXSetting = {
    textColor: "green",
}

const axisYSetting: AxisYSetting = {
    spaceMax: 2,
    suggestedAxisMinimum: 0,
}

const chartSetting: RadarChartSetting = {
    highlightPerTapEnabled: true,
    webColor: "red",
    webColorInner: "blue"
}
const parties = ["Party A", "Party B", "Party C", "Party D", "Party E"];
const dataSetting: RadarDataSetting = {
    labels: parties
}

function gen_data(): RadarDataSetSetting[] {
    let entries: RadarValue[] = [];

    for (let i = 0; i < 5; i++) {
        entries.push({
            y: Math.random() * 10,
        });
    }
    return [{
        values: entries,
        label: "性能指标",
        drawValues: true,
        valueFormatter: "value"
    }]
}
const data = gen_data()
</script>