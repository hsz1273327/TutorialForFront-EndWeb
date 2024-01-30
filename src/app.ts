import { createApp, registerElement } from 'nativescript-vue';
import { themer } from '@nativescript-community/ui-material-core';
import { install as installGestures } from '@nativescript-community/gesturehandler';

import Home from './views/ScatterChartHome.vue'
// import Home from './views/BubbleChartHome.vue'


if (global.isIOS) {
  themer.setPrimaryColor('#bff937');
  themer.setAccentColor('#ff8a39');
  themer.setSecondaryColor('#a830d7');
}
installGestures()
registerElement('ScatterChart', () => require("@nativescript-community/ui-chart/charts").ScatterChart);
registerElement('BubbleChart', () => require("@nativescript-community/ui-chart/charts").BubbleChart);
createApp(Home).start();