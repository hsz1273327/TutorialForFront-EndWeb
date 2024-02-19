import { createApp, registerElement } from 'nativescript-vue';
import { themer } from '@nativescript-community/ui-material-core';
import { install as installGestures } from '@nativescript-community/gesturehandler';

// import Home from './views/ScatterChartHome.vue'
// import Home from './views/ScatterChartHomeConfigable.vue'
// import Home from './views/BubbleChartHome.vue'
// import Home from './views/BubbleChartHomeConfigable.vue'
// import Home from './views/LineChartHome.vue'
import Home from './views/LineChartHomeConfigable.vue'
// import Home from './views/BarChartHome.vue'
// import Home from './views/BarChartHomeConfigable.vue'
// import Home from './views/HorizontalBarChartHome.vue'
// import Home from './views/HorizontalBarChartHomeConfigable.vue'
// import Home from './views/CandleStickChartHome.vue'
// import Home from './views/CandleStickChartHomeConfigable.vue'
// import Home from './views/PieChartHome.vue'
// import Home from './views/PieChartHomeConfigable.vue'
// import Home from './views/RadarChartHome.vue'
// import Home from './views/RadarChartHomeConfigable.vue'
// import Home from './views/AutoFreshChartHome.vue'


if (global.isIOS) {
  themer.setPrimaryColor('#bff937');
  themer.setAccentColor('#ff8a39');
  themer.setSecondaryColor('#a830d7');
}
installGestures()
registerElement('ScatterChart', () => require("@nativescript-community/ui-chart/charts").ScatterChart);
registerElement('BubbleChart', () => require("@nativescript-community/ui-chart/charts").BubbleChart);
registerElement('LineChart', () => require("@nativescript-community/ui-chart/charts").LineChart);
registerElement('BarChart', () => require("@nativescript-community/ui-chart/charts").BarChart);
registerElement('HorizontalBarChart', () => require("@nativescript-community/ui-chart/charts").HorizontalBarChart);
registerElement('CandleStickChart', () => require("@nativescript-community/ui-chart/charts").CandleStickChart);
registerElement('PieChart', () => require("@nativescript-community/ui-chart/charts").PieChart);
registerElement('RadarChart', () => require("@nativescript-community/ui-chart/charts").RadarChart);

createApp(Home).start();