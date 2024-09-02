import { use } from "echarts/core"

// 手动引入 ECharts 各模块来减小打包体积
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  RadarChart
} from 'echarts/charts'

import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  RadarComponent,
} from "echarts/components"
import VChart, { THEME_KEY } from "vue-echarts"

use([
  CanvasRenderer,
  RadarChart,
  RadarComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
])


export default (app: any) => {
  app.component('v-chart', VChart)
  app.provide(THEME_KEY, "light")
}