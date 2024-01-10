import { createApp,registerElement } from 'nativescript-vue';
import { themer } from '@nativescript-community/ui-material-core';
import { enableIOSDTCoreText,Label as HTMLLabel } from '@nativescript-community/ui-label';
import CanvasLabel from '@nativescript-community/ui-canvaslabel/vue';

registerElement('HTMLLabel', () => HTMLLabel);

//import Home from './views/Page_show_label.vue'
import Home from './views/Page_show_TextView.vue'


if (global.isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
    enableIOSDTCoreText();
}

createApp(Home).use(CanvasLabel).start();